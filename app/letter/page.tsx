"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Send, Scale, Printer, CheckCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function LetterPage() {
  // Simulated extracted and parsed dynamic data
  const dynamicData = {
    patient_name: "Rahul Sharma",
    hospital_name: "ABC Hospital",
    bill_number: "B12345",
    date: "12-03-2026",
    overcharged_items: [
      { item: "Paracetamol", charged: 85, benchmark: 2 },
      { item: "ICU Charges", charged: 18000, benchmark: 11000 }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl min-h-[calc(100vh-8rem)] relative">
      <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950/20 pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div className="flex items-center gap-4">
          <Link href="/results" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full shadow-sm bg-white/60 dark:bg-card/60 backdrop-blur-md")}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Legal Complaint Tracker</h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1 font-medium">
              <CheckCircle className="h-4 w-4 text-green-500" /> Auto-generated based on analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex rounded-full h-11 px-5 shadow-sm font-semibold hover:bg-muted/80 backdrop-blur-sm bg-white/60 dark:bg-card/60" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md rounded-full h-11 px-6 font-bold border-none">
            <Download className="mr-2 h-4 w-4" /> Save PDF
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", damping: 25 }}
      >
        <Card className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border-border/40 overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
          <CardHeader className="bg-slate-100/50 dark:bg-slate-800/20 border-b border-border/40 flex flex-row items-center justify-between py-5 px-6 sm:px-10">
            <CardTitle className="text-lg flex items-center gap-2.5 font-bold tracking-tight text-indigo-900 dark:text-indigo-300">
              <Scale className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Formal Notice to Hospital Administrator
            </CardTitle>
            <span className="text-sm font-medium text-muted-foreground bg-white dark:bg-black/50 px-3 py-1 rounded-full border border-border/50 shadow-sm hidden sm:inline-block">Ref: OVC-2026-9842</span>
          </CardHeader>
          
          {/* Document View - Styled like real paper */}
          <CardContent className="p-0 bg-slate-100 dark:bg-zinc-950 flex justify-center py-10 sm:py-16">
            <div className="w-[90%] max-w-[800px] bg-white dark:bg-[#1a1c23] shadow-2xl min-h-[600px] p-8 sm:p-16 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10 before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] before:opacity-30 before:pointer-events-none before:-z-0">
              <div className="relative z-10 font-serif text-[15px] sm:text-[16px] leading-8 space-y-6 text-slate-800 dark:text-slate-300 max-w-2xl mx-auto">
                
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">To,</p>
                    <p className="font-semibold text-slate-900 dark:text-white">The Medical Superintendent,</p>
                    <p className="font-bold text-lg text-slate-900 dark:text-white mt-1">{dynamicData.hospital_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 dark:text-slate-400">Date</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{dynamicData.date}</p>
                  </div>
                </div>

                <div className="py-4 border-y-2 border-slate-200 dark:border-slate-800 mt-8 mb-8 text-center bg-slate-50 dark:bg-slate-900/50">
                  <p className="font-bold uppercase tracking-widest text-sm text-slate-900 dark:text-white">
                    Subject: Formal Complaint Regarding Inflated Medical Bill
                  </p>
                </div>

                <p className="font-semibold">Dear Sir/Madam,</p>

                <p className="text-justify">
                  I, <strong>{dynamicData.patient_name}</strong>, am writing to formally raise a serious concern regarding the medical bill generated for my recent treatment (Bill No: <span className="font-semibold underline decoration-slate-300 decoration-2 underline-offset-4">{dynamicData.bill_number}</span>) dated <strong>{dynamicData.date}</strong>.
                </p>

                <p className="text-justify">
                  Upon careful review and comparative analysis of the final bill, I have discovered that the following specific line items have been charged at rates significantly higher than the government-approved and fair-market rates:
                </p>

                <div className="bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-md p-6 my-6 shadow-inner">
                  <ul className="list-none space-y-4">
                    {dynamicData.overcharged_items.map((item, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 inline-block"/>
                          {item.item}
                        </span>
                        <div className="mt-1 sm:mt-0 text-sm">
                          <span className="text-slate-500">Charged:</span> <span className="font-mono text-red-600 dark:text-red-400 font-bold">₹{item.charged}</span>
                          <span className="mx-2 text-slate-300">|</span>
                          <span className="text-slate-500">Benchmark:</span> <span className="font-mono text-green-600 dark:text-green-400 font-bold">₹{item.benchmark}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-justify">
                  These grossly inflated charges are in direct violation of the benchmarks defined under <strong>CGHS/NPPA guidelines</strong> and standard industry practices.
                </p>

                <p className="text-justify font-medium">
                  I urgently request a comprehensive review of this billing anomaly and an immediate refund/adjustment of the excess amount charged.
                </p>

                <p className="text-justify text-slate-600 dark:text-slate-400">
                  Please note that if no corrective action or satisfactory response is received within <strong>7 working days</strong>, I will be compelled to escalate this matter to the relevant state health authorities and consumer protection agencies.
                </p>

                <div className="mt-16 pt-8">
                  <p className="mb-8">Sincerely,</p>
                  <p className="font-bold text-lg text-slate-900 dark:text-white signature-font">{dynamicData.patient_name}</p>
                  <div className="h-px w-48 bg-slate-300 dark:bg-slate-700 mt-2 mb-2"></div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Patient / Authorized Signatory</p>
                </div>

              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 dark:bg-slate-950/50 border-t border-border/50 p-6 sm:px-10 flex flex-col sm:flex-row justify-end gap-4">
            <Button variant="outline" className="w-full sm:w-auto rounded-full h-12 font-semibold shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <Send className="mr-2 h-4 w-4" /> Email Directly to Hospital
            </Button>
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold rounded-full h-12 px-8 shadow-md shadow-green-600/20 transition-all hover:-translate-y-1">
              <Printer className="mr-2 h-4 w-4" /> Print Notice
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
