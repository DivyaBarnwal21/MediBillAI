"use client"

import Link from "next/link"
import { Camera, BarChart3, AlertTriangle, FileText, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const features = [
    {
      title: "OCR Scanning",
      description: "Instantly digitize and extract line items from your physical or digital medical bills.",
      icon: Camera,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Price Comparison",
      description: "Compare your hospital's charges against benchmark rates like CGHS and fair-market prices.",
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Overcharge Detection",
      description: "Automatically flag overpriced items, duplicate charges, and billing errors.",
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Legal Letter Generation",
      description: "Generate professionally formatted complaint letters for hospitals and authorities.",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-background pt-24 pb-32">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-green-400 opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-8 leading-tight">
              Detect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Overcharged</span> Medical Bills Instantly
            </h1>
            <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our advanced AI scans your hospital bills, detects overpricing against state and national benchmarks, and helps you fight back with automated legal complaints.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href="/upload"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 px-10 rounded-full text-lg font-medium shadow-xl shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-2 text-white"
                )}
              >
                Upload Bill <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-muted/10 relative">
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-transparent -z-10" />
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-widest">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Powerful tools to protect your rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group bg-white dark:bg-card">
                <CardContent className="p-8 flex flex-col items-start">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm", feature.bg)}>
                    <feature.icon className={cn("h-7 w-7", feature.color)} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Small Banner */}
      <section className="py-20 bg-white dark:bg-background border-t border-blue-100 dark:border-border">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to check your hospital bill?</h3>
          <Link
            href="/upload"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all hover:-translate-y-1"
            )}
          >
            Start Your Free Analysis
          </Link>
        </div>
      </section>
    </div>
  )
}
