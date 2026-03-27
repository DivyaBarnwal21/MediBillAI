"use client"

import Link from "next/link"
import { AlertCircle, FileText, ArrowLeft, ArrowRight, ArrowDownToLine, Receipt, FileSearch } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const mockData = [
  { id: 1, item: "CBC Blood Test", charged: 1500, benchmark:  450, overcharge: 1050 },
  { id: 2, item: "X-Ray Chest PA View", charged: 1200, benchmark: 250, overcharge:  950 },
  { id: 3, item: "Paracetamol IV", charged:  800, benchmark: 120, overcharge:  680 },
  { id: 4, item: "Doctor Consultation", charged: 2000, benchmark: 800, overcharge: 1200 },
  { id: 5, item: "Room Rent (Semi-Private)", charged: 6000, benchmark: 3500, overcharge: 2500 }
]

export default function ResultsPage() {
  const totalCharged = mockData.reduce((acc, curr) => acc + curr.charged, 0)
  const totalOvercharge = mockData.reduce((acc, curr) => acc + curr.overcharge, 0)
  const overchargePercentage = Math.round((totalOvercharge / totalCharged) * 100)

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/upload" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
            <Receipt className="h-4 w-4" /> hospital_bill_fortis.pdf
          </p>
        </div>
      </div>

      <Alert variant="destructive" className="mb-8 border-red-200 bg-red-50 text-red-900 shadow-sm dark:bg-red-950/20 dark:border-red-900 dark:text-red-200">
        <AlertCircle className="h-5 w-5 !text-red-600 dark:!text-red-400" />
        <AlertTitle className="text-lg font-bold">⚠️ Overcharge Detected</AlertTitle>
        <AlertDescription className="text-base mt-2">
          You were overcharged <span className="font-bold underline decoration-red-400 underline-offset-4">₹{totalOvercharge.toLocaleString("en-IN")}</span> ({overchargePercentage}%) compared to standard benchmark rates (CGHS/NPPA).
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Billed Amount</CardDescription>
            <CardTitle className="text-2xl">₹{totalCharged.toLocaleString("en-IN")}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Fair Market Price</CardDescription>
            <CardTitle className="text-2xl text-green-600">₹{(totalCharged - totalOvercharge).toLocaleString("en-IN")}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/10">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-700 dark:text-red-300 font-medium">Overcharge Amount</CardDescription>
            <CardTitle className="text-2xl text-red-600 dark:text-red-400">₹{totalOvercharge.toLocaleString("en-IN")}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="mb-8 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-blue-600" /> Line Item Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Item / Description</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Charged Price</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Benchmark Price</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Overcharge</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockData.map((row) => (
                  <tr 
                    key={row.id} 
                    className={row.overcharge > 0 ? "bg-red-50/40 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors" : "hover:bg-muted/50 transition-colors"}
                  >
                    <td className="px-6 py-4 font-medium">{row.item}</td>
                    <td className="px-6 py-4 text-right">₹{row.charged.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-right text-green-600 dark:text-green-400">₹{row.benchmark.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-right">
                      {row.overcharge > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          +₹{row.overcharge.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-8">
        <Button variant="outline" className="w-full sm:w-auto">
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Report
        </Button>
        <Link 
          href="/letter" 
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all font-semibold rounded-full px-8"
          )}
        >
          Generate Legal Letter <FileText className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
