"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Brain, Calendar, FileText, Home, Layers, Lightbulb, Settings } from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/organize-notes", label: "Organize Notes", icon: Layers },
    { href: "/extract-key-points", label: "Key Points", icon: Lightbulb },
    { href: "/flash-cards", label: "Flash Cards", icon: FileText },
    { href: "/study-plan", label: "Study Plan", icon: Calendar },
    { href: "/setup", label: "API Setup", icon: Settings },
  ]

  const sidebarVariants = {
    open: { width: "16rem", transition: { duration: 0.3, ease: "easeOut" } },
    closed: { width: "4rem", transition: { duration: 0.3, ease: "easeOut" } },
  }

  const textVariants = {
    open: { opacity: 1, x: 0, display: "block", transition: { duration: 0.3, delay: 0.1 } },
    closed: { opacity: 0, x: -10, display: "none", transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background/80 backdrop-blur-sm"
      initial={open ? "open" : "closed"}
      animate={open ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Brain className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.span className="text-xl font-semibold" variants={textVariants}>
            StudyBud
          </motion.span>
        </div>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="space-y-2">
          {links.map((link, index) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`flex items-center rounded-2xl px-3 py-2 transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <motion.span className="ml-3" variants={textVariants}>
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <motion.span className="text-sm text-muted-foreground" variants={textVariants}>
            v1.0.0
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
