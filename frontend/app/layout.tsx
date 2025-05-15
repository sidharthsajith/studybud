import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DynamicBackground } from "@/components/dynamic-background"
import { AmbientAudio } from "@/components/ambient-audio"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StudyBud - AI-Powered Study Assistant",
  description: "Organize notes, generate flashcards, and create study plans with AI assistance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DynamicBackground />
          <AmbientAudio />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
