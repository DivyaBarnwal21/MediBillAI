"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  Camera, BarChart3, AlertTriangle, FileText, ArrowRight,
  ShieldCheck, Zap, Scale, Check, Star, Users, TrendingDown,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const features = [
    {
      title: "OCR Bill Scanning",
      description: "AI instantly extracts every line item, charges, and details from any PDF or image.",
      icon: Camera,
      color: "text-black dark:text-white",
      bg: "bg-neutral-200/50 dark:bg-neutral-800/50",
    },
    {
      title: "Benchmark Comparison",
      description: "Every charge is cross-referenced against official CGHS and NPPA benchmark rates.",
      icon: BarChart3,
      color: "text-black dark:text-white",
      bg: "bg-neutral-200/50 dark:bg-neutral-800/50",
    },
    {
      title: "Overcharge Detection",
      description: "Overpriced items, duplicate charges, and billing errors are flagged automatically.",
      icon: AlertTriangle,
      color: "text-black dark:text-white",
      bg: "bg-neutral-200/50 dark:bg-neutral-800/50",
    },
    {
      title: "Legal Notice Generator",
      description: "Auto-generate a formal legal complaint letter, ready to send to the hospital.",
      icon: Scale,
      color: "text-black dark:text-white",
      bg: "bg-neutral-200/50 dark:bg-neutral-800/50",
    },
  ]


  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 26 } }
  }

  const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-background">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-20 mix-blend-luminosity grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2564&auto=format&fit=crop')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md text-foreground text-sm font-semibold border border-black/10 dark:border-white/10 shadow-xl mb-6">
              <ShieldCheck className="w-4 h-4 text-black dark:text-white" />
              India's #1 Medical Bill Negotiator
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Was Your Hospital Bill{" "}
            <span className="text-gradient">Overcharged?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your bill. Our AI scans every line item, compares to official benchmarks, and prepares a legal complaint — in under 30 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/upload"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-16 px-12 rounded-full text-lg font-bold shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black transition-all duration-300 flex items-center gap-3 group w-full sm:w-auto border border-black/20 dark:border-white/20"
              )}
            >
              <Camera className="h-5 w-5" />
              Analyze My Bill — Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-500" /> No account needed · 100% private
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-50/60 dark:bg-card/30 -z-10 border-y border-border/40" />
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2 mb-3">
              <Zap className="h-4 w-4" /> How It Works
            </h2>
            <p className="text-3xl md:text-4xl font-bold tracking-tight">Four steps. Full protection.</p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feat, i) => (
              <motion.div key={i} variants={cardVariants}>
                <Card className="glass-card h-full border-none group overflow-hidden">
                  <CardContent className="p-7 flex flex-col items-start relative">
                    <div className="absolute top-4 right-4 text-5xl font-black text-muted/20 dark:text-muted-foreground/10 leading-none select-none">{i + 1}</div>
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm", feat.bg)}>
                      <feat.icon className={cn("h-7 w-7", feat.color)} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10"
          >
            <div className="absolute inset-0 bg-black dark:bg-[#0a0a0a]" />
            <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1538108149393-fbbd81817507?q=80&w=2000&auto=format&fit=crop')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white text-center md:text-left">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Don't let hospitals overcharge you.</h3>
                <p className="text-neutral-300 text-lg">Upload your bill right now and find out in 30 seconds — completely free.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
                  {["No login required", "100% private", "Legal letter included"].map(item => (
                    <span key={item} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      <Check className="h-3.5 w-3.5 text-white" /> {item}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/upload"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full h-16 px-10 bg-white text-black hover:bg-neutral-200 shadow-xl shadow-black/20 font-extrabold text-lg whitespace-nowrap border-none hover:scale-105 transition-all"
                )}
              >
                Analyze My Bill Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
