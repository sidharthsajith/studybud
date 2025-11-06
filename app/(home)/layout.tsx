import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "StudyBud - Your AI Study Companion",
  description: "Transform your study sessions with AI-powered tools for notes, PDFs, and more"
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-10" />
            
            <main className="relative flex-1">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="relative py-6 border-t border-slate-200 dark:border-slate-800">
              <div className="container mx-auto px-4">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  © {new Date().getFullYear()} StudyBud. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
          
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
