# MediBill AI – Medical Bill Negotiator

MediBill AI is a full-stack web application that helps users upload hospital bills, detect overcharging using government rate cards (CGHS & NPPA), and generate legal complaint reports.

---

## 🎤 Full Project Explanation (Perfect for Presentation)

### 🟣 Start (Big Picture)
**“MediBill AI ek end-to-end system hai jo hospital bill ko analyze karke overcharging detect karta hai aur automatically ek legal complaint letter generate karta hai.”**

### 🔁 Step-by-Step Flow

**🧾 Step 1: Bill Upload**
“Sabse pehle user apna hospital bill upload karta hai — image ya PDF format me.”
👉 **Technology used:** Frontend UI (upload interface)

**📷 Step 2: OCR (Text Extraction)**
“Phir system OCR use karke bill ke andar ka text extract karta hai — jaise medicine names, test names, aur prices.”
👉 **Output example:** Paracetamol – ₹85 | ICU Charges – ₹18000
👉 **Technology:** OCR engine (like Google Vision)

**🧠 Step 3: Data Cleaning & Structuring (AI/NLP)**
“Ab jo raw text aata hai wo messy hota hai, to AI usko clean karke structured format me convert karta hai.”
👉 **Example:** “PCM 500” → “Paracetamol 500mg”
👉 **Technology:** AI/NLP model

**📊 Step 4: Government Policy Matching**
“Ab system har item ko government datasets se compare karta hai: CGHS (treatments) & NPPA (medicines). Ye datasets batate hain ki actual ya reasonable price kya hona chahiye.”

**🧮 Step 5: Accurate Calculation (VERY IMPORTANT)**
“Ab system correct calculation karta hai:”
👉 **Formula:** `Overcharge = Charged Price – Benchmark Price` | `Percentage = (Overcharge / Benchmark) × 100`
👉 **Example:** Charged = ₹85 | Benchmark = ₹2 | Difference = ₹83 (4150% 🚨)
👉 Ye calculation backend me accurately hota hai using Python logic.

**🚨 Step 6: Overcharge Detection**
“Agar price threshold se zyada hai, to system usse flag karta hai.”
👉 **Output:** Red highlight & Total overcharge calculate.

**📄 Step 7: Legal Letter Generation**
“Finally, system ek professionally written legal complaint letter generate karta hai jisme patient details, overcharged items, govt rate comparison, aur Consumer Protection Act references hote hain.”
👉 **Technology:** AI writing / PDF generator

### 🔗 Complete Flow (One Line)
👉 **Upload → OCR → Clean Data → Compare with Govt Rates → Calculate → Detect → Generate Legal Letter**

---

## ⚙️ Technologies Used
- **Frontend** → UI for upload & results (Next.js, Tailwind)
- **Backend** → Handles logic (Python/FastAPI)
- **OCR** → Extract text from bill (Google Vision API)
- **AI/NLP** → Clean & understand data (Gemini Pro API)
- **Database** → Store rate cards (PostgreSQL)
- **Government datasets** → CGHS & NPPA guidelines
- **PDF generator** → Create legal document (ReportLab)

## 🧠 How We Ensure Accuracy
👉 3 levels pe accuracy maintain hoti hai:
1. **OCR Accuracy**: Good OCR tool → correct text extraction
2. **Data Matching**: Fuzzy matching → correct item identification
3. **Calculation Accuracy**: Exact formulas → no approximation

🔥 **“Our system ensures accuracy at every stage — from data extraction to policy matching to final legal documentation.”**

## 🏆 Final Conclusion
“MediBill AI ek complete pipeline hai jo raw hospital bill ko lekar usse actionable legal insight me convert karta hai.”

🎤 **Final One-Line:**
👉 **“We convert a hospital bill into a legally actionable report using AI and government data.”**
