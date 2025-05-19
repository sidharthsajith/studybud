"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { ModeToggle } from "@/components/mode-toggle"
import { ApiStatus } from "@/components/api-status"
import { staggerContainer } from "@/lib/motion"
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  
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

  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-auto">
        <motion.header
          className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6"
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur.get()}px)`,
          }}
        >
          <div className="flex items-center gap-6">
              <span className="font-medium">StudyBud</span>
              <nav className="hidden md:flex items-center gap-4">
                <a href="/" className="text-sm hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Home</a>
                <a href="/enhance-assignment" className="text-sm hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Assignment Enhancement</a>
              </nav>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh] overflow-auto">
                  <DrawerHeader>
                    <DrawerTitle>Navigation Menu</DrawerTitle>
                  </DrawerHeader>
                  <nav className="flex flex-col gap-2 p-4">
                    <a href="/" className="p-2 hover:bg-accent rounded-md">Home</a>
                    <a href="/enhance-assignment" className="p-2 hover:bg-accent rounded-md">Assignment Enhancement</a>
                    <a href="/dashboard" className="p-2 hover:bg-accent rounded-md">Dashboard</a>
                    <a href="/courses" className="p-2 hover:bg-accent rounded-md">Courses</a>
                    <a href="/progress" className="p-2 hover:bg-accent rounded-md">Progress</a>
                    <a href="/profile" className="p-2 hover:bg-accent rounded-md">Profile</a>
                    <a href="/groups" className="p-2 hover:bg-accent rounded-md">Study Groups</a>
                    <a href="/settings" className="p-2 hover:bg-accent rounded-md">Settings</a>
                  </nav>
                </DrawerContent>
              </Drawer>
            </div>
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
