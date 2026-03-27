"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Building2, Stethoscope, MapPin, TrendingUp, AlertTriangle,
  CheckCircle, BarChart2, Info, Loader2, ChevronDown, Sparkles,
  ArrowRight, ShieldAlert, Activity, RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  HOSPITALS, PROCEDURES, CITIES, getPrediction, formatINR,
  RISK_CONFIG, type PredictionResult, type RiskLevel,
} from "@/lib/predictData"

// ─────────────────────────────────────────────────────────────────
// Small reusable select wrapper
// ─────────────────────────────────────────────────────────────────
function SelectField({
  label, icon, value, onChange, placeholder, options,
}: {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border border-border/70 bg-white/60 dark:bg-black/20 backdrop-blur-sm",
            "px-4 py-3 pr-10 text-sm font-medium text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "hover:border-blue-400 dark:hover:border-blue-600 transition-colors",
            "shadow-sm cursor-pointer",
            !value && "text-muted-foreground"
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Range Bar Visualization
// ─────────────────────────────────────────────────────────────────
function PriceRangeBar({ min, max, benchmark }: { min: number; max: number; benchmark: number }) {
  const total = max - min
  const benchmarkPct = Math.min(100, Math.max(0, ((benchmark - min) / total) * 100))

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
        <span>{formatINR(min)}</span>
        <span>{formatINR(max)}</span>
      </div>
      <div className="relative h-6 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400 dark:from-neutral-900/50 dark:via-neutral-800/40 dark:to-neutral-700/50 rounded-full overflow-visible shadow-inner">
        {/* Range fill */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-400/30 via-neutral-500/30 to-neutral-600/30" />
        </div>

        {/* CGHS Benchmark marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${benchmarkPct}%` }}
        >
          <div className="h-8 w-0.5 bg-black dark:bg-white absolute top-1/2 -translate-y-1/2" />
          <div className="h-4 w-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-card shadow-md z-10 mt-1" />
        </div>
      </div>
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900/50 px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">
          <div className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
          CGHS Benchmark: {formatINR(benchmark)}
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Risk Badge
// ─────────────────────────────────────────────────────────────────
function RiskBadge({ risk }: { risk: RiskLevel }) {
  const cfg = RISK_CONFIG[risk]
  const Icon = risk === "low" ? CheckCircle : risk === "moderate" ? AlertTriangle : ShieldAlert
  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold border shadow-sm",
      cfg.bg, cfg.text, cfg.border
    )}>
      <span className={cn("h-2.5 w-2.5 rounded-full animate-pulse", cfg.dot)} />
      <Icon className="h-4 w-4" />
      {cfg.label}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────
export default function PredictPage() {
  const [hospital, setHospital] = useState("")
  const [procedure, setProcedure] = useState("")
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loadingMsg, setLoadingMsg] = useState("")

  const loadingSteps = [
    "Querying CGHS benchmark database...",
    "Analyzing hospital pricing patterns...",
    "Running cost prediction model...",
    "Calculating risk assessment...",
    "Generating your estimate...",
  ]

  const handlePredict = async () => {
    if (!hospital || !procedure || !city) return
    setResult(null)
    setLoading(true)

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingMsg(loadingSteps[i])
      await new Promise(r => setTimeout(r, 450))
    }

    const pred = getPrediction(procedure, hospital, city)
    setResult(pred)
    setLoading(false)
  }

  const canPredict = hospital && procedure && city && !loading

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 26 } }
  }

  const riskConfig = result ? RISK_CONFIG[result.risk] : null

  return (
    <div className="min-h-screen selection:bg-primary/20">
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.25] dark:opacity-[0.1] mix-blend-luminosity grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop')" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-300 text-sm font-semibold border border-neutral-200 dark:border-neutral-800 shadow-sm mb-5">
            <Sparkles className="h-4 w-4 text-black dark:text-white" /> AI Predictive Edge
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Predict Your{" "}
            <span className="text-gradient">Medical Bill</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Estimate expected hospital costs <strong>before treatment</strong> using AI and government CGHS/NPPA benchmarks — so you&apos;re never caught off guard.
          </p>
        </motion.div>

        {/* ── Input Card ── */}
        <motion.div variants={cardVariants} initial="hidden" animate="show">
          <Card className="glass-card rounded-3xl overflow-hidden mb-8 shadow-lg">
            <CardHeader className="bg-neutral-50/50 dark:bg-neutral-900/20 border-b border-border/50 py-5 px-7">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-sm">
                  <Activity className="h-5 w-5 text-white dark:text-black" />
                </div>
                <div>
                  <CardTitle className="text-lg tracking-tight">Treatment Details</CardTitle>
                  <CardDescription className="text-xs">All fields required for an accurate prediction</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SelectField
                  label="Hospital"
                  icon={<Building2 className="h-3.5 w-3.5 text-black dark:text-white" />}
                  value={hospital}
                  onChange={setHospital}
                  placeholder="Select hospital..."
                  options={HOSPITALS.map(h => ({ value: h, label: h }))}
                />
                <SelectField
                  label="Procedure / Treatment"
                  icon={<Stethoscope className="h-3.5 w-3.5 text-black dark:text-white" />}
                  value={procedure}
                  onChange={setProcedure}
                  placeholder="Select procedure..."
                  options={PROCEDURES.map(p => ({ value: p.value, label: `${p.icon} ${p.label}` }))}
                />
                <SelectField
                  label="City / Location"
                  icon={<MapPin className="h-3.5 w-3.5 text-black dark:text-white" />}
                  value={city}
                  onChange={setCity}
                  placeholder="Select city..."
                  options={CITIES.map(c => ({ value: c, label: c }))}
                />
              </div>

              <Button
                size="lg"
                onClick={handlePredict}
                disabled={!canPredict}
                className={cn(
                  "w-full h-16 rounded-2xl text-lg font-bold transition-all duration-300 group shadow-lg",
                  canPredict
                    ? "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black hover:scale-[1.01] border border-black/20 dark:border-white/20"
                    : "bg-muted text-muted-foreground cursor-not-allowed border-none shadow-none"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 text-black dark:text-white animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5 mr-3 text-black dark:text-white group-hover:translate-y-[-2px] transition-transform" />
                    Predict Cost
                    <ArrowRight className="h-5 w-5 ml-3 text-black dark:text-white group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Loading State ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8"
            >
              <Card className="glass-card rounded-3xl overflow-hidden border-blue-200/50 dark:border-blue-800/30">
                <CardContent className="py-12 px-8 flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-900/30 flex items-center justify-center">
                      <BarChart2 className="h-10 w-10 text-black dark:text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-black dark:border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute inset-0 rounded-full border-4 border-b-neutral-400 border-t-transparent border-r-transparent border-l-transparent animate-spin" style={{ animationDuration: "1.3s" }} />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingMsg}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-lg font-semibold text-foreground"
                    >
                      {loadingMsg}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-sm text-muted-foreground mt-2">Analyzing data and predicting cost...</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result Card ── */}
        <AnimatePresence>
          {result && !loading && riskConfig && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              {/* Main result card */}
              <Card className={cn(
                "rounded-3xl overflow-hidden shadow-2xl mb-6 border-2",
                result.risk === "high" ? "border-red-200/60 dark:border-red-900/40" :
                  result.risk === "moderate" ? "border-yellow-200/60 dark:border-yellow-900/40" :
                    "border-green-200/60 dark:border-green-900/40"
              )}>
                {/* Card hero */}
                <div className={cn(
                  "relative overflow-hidden px-8 py-8 border-b border-border/50",
                  result.risk === "high"
                    ? "bg-gradient-to-br from-red-50/80 to-rose-50/50 dark:from-red-950/30 dark:to-rose-950/20"
                    : result.risk === "moderate"
                      ? "bg-gradient-to-br from-yellow-50/80 to-amber-50/50 dark:from-yellow-950/20 dark:to-amber-950/10"
                      : "bg-gradient-to-br from-green-50/80 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/10"
                )}>
                  <div className="absolute top-3 right-3 opacity-5 dark:opacity-[0.03]">
                    <BarChart2 className="h-40 w-40 text-black dark:text-white" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-black dark:text-white" /> Expected Cost Range
                      </p>
                      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                        {formatINR(result.minCost)} – {formatINR(result.maxCost)}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <RiskBadge risk={result.risk} />
                        <span className="text-xs bg-white/60 dark:bg-black/30 border border-border/50 text-muted-foreground px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                          ±{result.estimatedVariation}% variation
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 text-right shrink-0">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CGHS Benchmark</p>
                        <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">{formatINR(result.cghsBenchmark)}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs gap-1.5 self-end"
                        onClick={() => { setResult(null); setHospital(""); setProcedure(""); setCity("") }}
                      >
                        <RefreshCw className="h-3 w-3 text-black dark:text-white" /> New Prediction
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 space-y-8">
                  {/* Range Bar */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-black dark:text-white" />
                      Cost Range Visualization
                    </h3>
                    <PriceRangeBar
                      min={result.minCost}
                      max={result.maxCost}
                      benchmark={result.cghsBenchmark}
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Min Expected", value: formatINR(result.minCost), color: "text-green-700 dark:text-green-400" },
                      { label: "Max Expected", value: formatINR(result.maxCost), color: "text-red-600 dark:text-red-400" },
                      { label: "CGHS Standard", value: formatINR(result.cghsBenchmark), color: "text-blue-700 dark:text-blue-400" },
                      { label: "Overcharge Risk", value: `±${result.estimatedVariation}%`, color: result.risk === "high" ? "text-red-600" : result.risk === "moderate" ? "text-yellow-600" : "text-green-600" },
                    ].map((stat, i) => (
                      <div key={i} className="glass-card p-4 rounded-2xl text-center border">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{stat.label}</p>
                        <p className={cn("text-xl font-extrabold tracking-tight", stat.color)}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Cost Breakdown */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-black dark:text-white" />
                      Typical Cost Breakdown — {result.category}
                    </h3>
                    <div className="space-y-2.5">
                      {result.breakdown.map((item, i) => {
                        const total = result.breakdown.reduce((s, b) => s + b.amount, 0)
                        const pct = Math.round((item.amount / total) * 100)
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-4"
                          >
                            <span className="text-sm font-medium text-foreground w-44 shrink-0 truncate">{item.label}</span>
                            <div className="flex-1 bg-muted/40 rounded-full h-3 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
                              />
                            </div>
                            <span className="text-sm font-bold text-right w-20 shrink-0">{formatINR(item.amount)}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Procedure & Location context */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { icon: <Stethoscope className="h-4 w-4 text-blue-500" />, label: "Procedure", value: result.procedure },
                      { icon: <Building2 className="h-4 w-4 text-indigo-500" />, label: "Hospital", value: result.hospital },
                      { icon: <MapPin className="h-4 w-4 text-green-500" />, label: "City", value: result.city },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-muted/20 dark:bg-white/5 rounded-xl p-3.5 border border-border/50">
                        <div className="h-8 w-8 rounded-lg bg-white dark:bg-black/20 flex items-center justify-center shadow-sm border border-border/40 shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground">{item.label}</p>
                          <p className="text-sm font-bold truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips card for high risk */}
              {result.risk === "high" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="rounded-2xl border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10 mb-6">
                    <CardContent className="p-6 flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">High Overcharge Risk Detected</p>
                        <ul className="text-sm text-amber-700/80 dark:text-amber-400/80 space-y-1 list-disc list-inside">
                          <li>Always request an itemized bill before and after treatment</li>
                          <li>Ask the hospital to justify charges above CGHS rates</li>
                          <li>Compare with at least 2 other hospitals in your city</li>
                          <li>If overcharged, use our <strong>Bill Analyzer</strong> to generate a legal complaint</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3 bg-slate-50/60 dark:bg-slate-900/20 border border-border/40 rounded-2xl p-5"
              >
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Disclaimer</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Note:</strong> {result.note} This is an estimated range based on CGHS benchmarks and historical pricing data.
                    Actual hospital charges may vary based on doctor experience, implant brand, complications, and insurance status.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Empty state hint ── */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-10 text-muted-foreground text-sm"
          >
            <BarChart2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Select a hospital, procedure, and city above to get your instant cost prediction.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
