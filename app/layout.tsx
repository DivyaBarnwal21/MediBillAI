import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediBill AI | Medical Bill Negotiator",
  description: "Detect hospital overcharges instantly using AI and generate legal complaint reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster richColors position="top-right" />
          <footer className="border-t border-border/50 bg-muted/20 dark:bg-card/20 py-10 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">AI</div>
                  MediBill <span className="text-blue-600">AI</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Benchmarks based on CGHS/NPPA standards. For patient use only. © {new Date().getFullYear()} MediBill AI.
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Privacy</span>
                  <span>Terms</span>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
