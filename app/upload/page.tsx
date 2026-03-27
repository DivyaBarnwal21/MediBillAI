"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { UploadCloud, File, X, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function UploadPage() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = () => {
    if (!file) return
    setIsAnalyzing(true)
    // Simulate processing time
    setTimeout(() => {
      router.push("/results")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl min-h-[calc(100vh-8rem)]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Upload Medical Bill</h1>
        <p className="text-muted-foreground text-lg">
          Securely upload your hospital bill (PDF, JPG, PNG) for instant AI analysis against standard rates.
        </p>
      </div>

      <Card className="border-2 border-dashed border-blue-200 dark:border-blue-900 shadow-sm bg-blue-50/50 dark:bg-blue-950/10">
        <CardContent className="p-0">
          <div
            className={cn(
              "p-12 text-center transition-all duration-200 ease-in-out cursor-pointer flex flex-col items-center justify-center rounded-xl",
              isDragging ? "bg-blue-100/50 dark:bg-blue-900/30 scale-[0.98]" : "hover:bg-blue-50 dark:hover:bg-blue-950/20"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,image/*"
            />

            {!file ? (
              <>
                <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-6">
                  <UploadCloud className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drag & drop your bill here</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Supports PDF, PNG, JPG up to 10MB
                </p>
                <Button variant="outline" className="rounded-full pointer-events-none bg-white dark:bg-transparent">
                  Browse Files
                </Button>
              </>
            ) : (
              <div
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 bg-white dark:bg-card rounded-lg border shadow-sm">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="h-12 w-12 rounded bg-blue-100 dark:bg-blue-900/40 flex shrink-0 items-center justify-center">
                      <File className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={cn(
            "h-14 px-8 text-lg rounded-full font-semibold transition-all shadow-md",
            file && !isAnalyzing ? "bg-green-600 hover:bg-green-700 shadow-green-600/20 text-white" : ""
          )}
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Analyzing with AI...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Analyze Bill <ArrowRight className="h-5 w-5" />
            </span>
          )}
        </Button>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Your data is secure and encrypted. We do not store your medical bills.</span>
        </div>
      </div>
    </div>
  )
}
