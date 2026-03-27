"use client"

import Link from "next/link"
import { ArrowLeft, Download, Send, Scale, Printer } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function LetterPage() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/results" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Legal Complaint Letter</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-full px-6">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border-muted">
        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-4">
          <CardTitle className="text-lg flex items-center gap-2 font-medium">
            <Scale className="h-5 w-5 text-blue-600" />
            Formal Notice to Hospital Administrator
          </CardTitle>
          <span className="text-sm text-muted-foreground hidden sm:inline-block">Ref: OVC-2026-9842</span>
        </CardHeader>
        
        {/* Scrollable Document View */}
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-8 sm:p-12 bg-white dark:bg-card document-scroll">
            <div className="max-w-3xl mx-auto font-serif text-[15px] leading-relaxed space-y-6 text-slate-800 dark:text-slate-300">
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="font-bold">From:</p>
                  <p>John Doe</p>
                  <p>123 Patient Lane, Apt 4B</p>
                  <p>New Delhi, 110001</p>
                  <p>patient.email@example.com</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Date:</p>
                  <p>{currentDate}</p>
                </div>
              </div>

              <div>
                <p className="font-bold">To:</p>
                <p>The Grievance Redressal Officer / Billing Administrator</p>
                <p>Fortis Healthcare Limited</p>
                <p>Okhla Road, New Delhi 110025</p>
              </div>

              <div className="pt-4 pb-2 border-y border-dashed mt-6 mb-6">
                <p className="font-bold uppercase tracking-wide text-sm">
                  Subject: Notice regarding exorbitant and unjustified billing for patient admission (IPD No. 849201)
                </p>
              </div>

              <p>Dear Sir/Madam,</p>

              <p>
                This letter is to formally dispute the charges levied in the final medical bill dated [Date of Bill], generated for the treatment of [Patient Name], who was admitted to your facility from [Date of Admission] to [Date of Discharge] under IPD number 849201.
              </p>

              <p>
                Upon detailed scrutiny of the invoice alongside benchmark pricing standards mandated by the Central Government Health Scheme (CGHS) and the National Pharmaceutical Pricing Authority (NPPA), I have identified egregious overcharges totaling <strong>₹31,500</strong>. This represents a <strong>26% markup</strong> beyond the legally permissible or fair-market pricing for the procedures, consumables, and room rent documented.
              </p>

              <p className="font-bold mt-6">Specifically, the following anomalies have been identified:</p>

              <ul className="list-disc pl-8 space-y-2 my-4">
                <li><strong>Room Rent (Semi-Private):</strong> Billed at ₹6,000/day against standard caps of ₹3,500/day.</li>
                <li><strong>Doctor Consultation:</strong> Overcharged by ₹1,200 beyond established reasonable & customary limits.</li>
                <li><strong>Consumables/Medicines:</strong> Charged at non-MRP rates or inflated prices in violation of NPPA guidelines.</li>
                <li><strong>Diagnostics (CBC & X-Ray):</strong> Charged 300% above CGHS empanelled rates for identical services.</li>
              </ul>

              <p>
                Charging patients arbitrarily inflated prices for life-saving medical care is not only unethical but constitutes an "unfair trade practice" under Section 2(47) of the Consumer Protection Act, 2019. It severely undermines patient trust.
              </p>

              <p>
                I hereby request you to provide a revised and itemized bill reflecting fair constraints on the aforementioned overcharged items within <strong>seven (7) working days</strong> of receiving this notice. Furthermore, I request a detailed rationale for any variance from standard NPPA/CGHS thresholds.
              </p>

              <p>
                Failure to rectify this billing discrepancy will compel me to escalate this matter to the relevant authorities, including the District Consumer Disputes Redressal Commission and the State Medical Council, seeking a refund of the excess amount along with compensation for the mental agony caused.
              </p>

              <p>
                I look forward to a prompt and amicable resolution to this matter.
              </p>

              <div className="mt-12">
                <p>Yours sincerely,</p>
                <div className="h-16 w-48 border-b-2 border-slate-300 dark:border-slate-600 mt-4 mb-2"></div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm">Patient / Authorized Representative</p>
              </div>

            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t p-4 flex justify-end gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" /> Email to Hospital
          </Button>
          <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-6 shadow-md transition-all">
            <Download className="mr-2 h-4 w-4" /> Save as PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
