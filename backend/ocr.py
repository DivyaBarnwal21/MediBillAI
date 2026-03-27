import os
import base64
import json
import re
import pathlib
from dotenv import load_dotenv

# Load .env from the backend directory
load_dotenv(pathlib.Path(__file__).parent / ".env")


def _get_gemini_key():
    key = os.getenv("GEMINI_API_KEY", "").strip()
    if not key or key == "your_gemini_api_key_here":
        raise EnvironmentError("GEMINI_API_KEY is not set in backend/.env")
    return key


def extract_bill_data_with_gemini(file_bytes: bytes, mime_type: str) -> dict:
    """
    Sends the bill image/PDF to Gemini Vision and gets back a structured JSON
    containing patient info and all line items with prices.

    Returns a dict with keys:
        patient_name, hospital_name, bill_number, date, doctor_name, ward, items[]
    Each item: { name, charged_price, quantity }
    """
    import google.generativeai as genai

    api_key = _get_gemini_key()
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = """You are an expert medical billing data extractor.

Carefully analyze this hospital bill image and extract ALL information as a structured JSON object.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "patient_name": "Full patient name or 'Unknown'",
  "hospital_name": "Full hospital/clinic name",
  "bill_number": "Bill / invoice number or 'Unknown'",
  "date": "Date of bill in DD-MM-YYYY format or 'Unknown'",
  "doctor_name": "Attending doctor name or 'Unknown'",
  "ward": "Ward/room type (e.g. Semi-Private, ICU) or 'Unknown'",
  "items": [
    {
      "name": "Exact item/service name as written on bill",
      "charged_price": 1500.0,
      "quantity": 1,
      "category": "One of: Diagnostics, Pharmacy, Surgery, Consultation, Room, ICU, Nursing, Radiology, Consumables, Transport, Other"
    }
  ]
}

Rules:
- Extract EVERY line item from the bill, including drugs, tests, procedures, room rent, doctor fees, etc.
- charged_price must be a number (float), per-unit price
- quantity must be an integer (default 1 if not stated)
- Do NOT include totals/subtotals as items
- If a field is unclear or missing, use "Unknown" for strings or 0 for numbers
- Return ONLY the JSON object, nothing else"""

    # Encode file as base64 for inline upload
    b64_data = base64.b64encode(file_bytes).decode("utf-8")

    response = model.generate_content([
        prompt,
        {
            "inline_data": {
                "mime_type": mime_type,
                "data": b64_data,
            }
        }
    ])

    raw = response.text.strip()

    # Strip markdown code fences if Gemini wrapped in ```json
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    data = json.loads(raw)
    return data


def guess_mime_type(filename: str, content: bytes) -> str:
    """
    Determine mime type from extension or magic bytes.
    Gemini Vision supports: image/jpeg, image/png, image/webp, image/heic, application/pdf
    """
    name = filename.lower()
    if name.endswith(".pdf"):
        return "application/pdf"
    if name.endswith(".png"):
        return "image/png"
    if name.endswith((".jpg", ".jpeg")):
        return "image/jpeg"
    if name.endswith(".webp"):
        return "image/webp"
    if name.endswith(".heic"):
        return "image/heic"

    # Magic byte fallback
    if content[:4] == b"%PDF":
        return "application/pdf"
    if content[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if content[:2] in (b"\xff\xd8", b"\xff\xe0", b"\xff\xe1"):
        return "image/jpeg"

    return "image/jpeg"  # safe default for most phone photos
