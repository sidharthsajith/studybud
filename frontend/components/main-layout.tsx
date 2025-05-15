"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { ApiStatus } from "@/components/api-status"
import { staggerContainer } from "@/lib/motion"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const { scrollY: scrollYProgress } = useScroll()

  // Parallax effect values
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <motion.header
          className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6"
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur.get()}px)`,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex items-center gap-4">
            <ApiStatus />
            <ModeToggle />
          </div>
        </motion.header>
        <motion.main
          className="container mx-auto p-4 md:p-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
