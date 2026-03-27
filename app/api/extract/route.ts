import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

/**
 * POST /api/extract
 * 
 * Accepts multipart/form-data with a "file" field.
 * Proxies to the FastAPI /extract endpoint.
 * Returns structured bill data (patient info + line items with CGHS benchmarks).
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Forward to FastAPI backend
    const backendForm = new FormData()
    backendForm.append("file", file)

    const backendRes = await fetch(`${BACKEND_URL}/extract`, {
      method: "POST",
      body: backendForm,
      // no Content-Type header — let fetch set multipart boundary automatically
    })

    if (!backendRes.ok) {
      const err = await backendRes.json().catch(() => ({ detail: "Backend error" }))
      const status = backendRes.status
      
      if (status === 503) {
        return NextResponse.json(
          { error: "api_key_not_configured", detail: err.detail },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: "backend_error", detail: err.detail || `HTTP ${status}` },
        { status: status }
      )
    }

    const data = await backendRes.json()
    return NextResponse.json(data)

  } catch (error: unknown) {
    // Backend is not running
    const isConnectionError =
      error instanceof TypeError &&
      (error.message.includes("ECONNREFUSED") || error.message.includes("fetch"))

    if (isConnectionError) {
      return NextResponse.json(
        { error: "backend_offline", detail: "FastAPI backend is not running on port 8000" },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: "unexpected_error", detail: String(error) },
      { status: 500 }
    )
  }
}
