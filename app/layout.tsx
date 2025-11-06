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

export default function RootLayout({
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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
