"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { AlertCircle, FileText, ArrowLeft, ArrowDownToLine, Receipt, FileSearch, TrendingDown, Scale } from "lucide-react"
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-5xl relative min-h-[calc(100vh-8rem)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 dark:bg-red-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <Link href="/upload" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full hover:bg-muted bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-border/50")}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-2 font-medium">
            <Receipt className="h-4 w-4" /> hospital_bill_fortis.pdf
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <Alert variant="destructive" className="mb-10 border-red-200/50 bg-red-50/80 text-red-900 shadow-lg shadow-red-900/5 dark:bg-red-950/40 dark:border-red-900/50 dark:text-red-200 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-red-400 to-red-600 dark:from-red-600 dark:to-red-800" />
          <AlertCircle className="h-6 w-6 !text-red-600 dark:!text-red-400" />
          <div className="ml-2">
            <AlertTitle className="text-lg font-bold tracking-tight">Critical Overcharge Detected</AlertTitle>
            <AlertDescription className="text-base mt-2 leading-relaxed">
              Our AI analysis indicates you were overcharged by <span className="font-extrabold underline decoration-red-400/50 underline-offset-4 text-xl tracking-tight">₹{totalOvercharge.toLocaleString("en-IN")}</span> ({overchargePercentage}% higher than standard rates) compared to fair market benchmarks (CGHS/NPPA).
            </AlertDescription>
          </div>
        </Alert>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow-md shadow-black/5 hover:shadow-lg transition-shadow border-t-4 border-t-slate-300 dark:border-t-slate-700 bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium uppercase tracking-wider">Total Billed</CardDescription>
              <CardTitle className="text-3xl font-bold tracking-tight">₹{totalCharged.toLocaleString("en-IN")}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-md shadow-black/5 hover:shadow-lg transition-shadow border-t-4 border-t-green-400 dark:border-t-green-600 bg-green-50/30 dark:bg-green-950/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium uppercase tracking-wider text-green-700 dark:text-green-400 flex items-center gap-1">
                <Scale className="h-3.5 w-3.5" /> Fair Market Price
              </CardDescription>
              <CardTitle className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-400">₹{(totalCharged - totalOvercharge).toLocaleString("en-IN")}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg shadow-red-900/10 hover:shadow-xl transition-all border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-card border-l-4 border-l-red-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-400/5 dark:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2 relative z-10">
              <CardDescription className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-1">
                <TrendingDown className="h-3.5 w-3.5" /> Overcharge Amount
              </CardDescription>
              <CardTitle className="text-4xl font-extrabold tracking-tight text-red-600 dark:text-red-400">₹{totalOvercharge.toLocaleString("en-IN")}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mb-10 shadow-lg shadow-black/5 border-border/50 bg-white/60 dark:bg-card/60 backdrop-blur-xl overflow-hidden rounded-2xl">
          <CardHeader className="bg-muted/50 dark:bg-muted/20 border-b border-border/50 py-5">
            <CardTitle className="text-xl flex items-center gap-2 tracking-tight">
              <FileSearch className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Line Item Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">Item / Description</th>
                    <th scope="col" className="px-6 py-4 text-right">Charged Price</th>
                    <th scope="col" className="px-6 py-4 text-right">Benchmark Price</th>
                    <th scope="col" className="px-6 py-4 text-right">Overcharge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {mockData.map((row, index) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      key={row.id} 
                      className={cn(
                        "transition-colors duration-200",
                        row.overcharge > 0 
                          ? "bg-red-50/30 dark:bg-red-950/10 hover:bg-red-50/80 dark:hover:bg-red-900/30" 
                          : "hover:bg-muted/50"
                      )}
                    >
                      <td className="px-6 py-4 font-semibold text-foreground">{row.item}</td>
                      <td className="px-6 py-4 text-right font-mono text-[15px]">₹{row.charged.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-mono text-[15px]">₹{row.benchmark.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 text-right">
                        {row.overcharge > 0 && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/30 shadow-sm">
                            +₹{row.overcharge.toLocaleString("en-IN")}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 mb-10"
      >
        <Button variant="outline" className="w-full sm:w-auto rounded-full h-12 px-6 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Report
        </Button>
        <Link 
          href="/letter" 
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1 font-bold rounded-full h-14 px-8 tracking-wide border-none"
          )}
        >
          Generate Legal Notice <FileText className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  )
}
