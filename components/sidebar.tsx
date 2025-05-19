"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Brain, FileText, Flame, LayoutDashboard, Lightbulb, Mic, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Study Mode",
    href: "/study",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Research Mode",
    href: "/research",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: "Write Mode",
    href: "/write",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Voice Tools",
    href: "/voice",
    icon: <Mic className="w-5 h-5" />,
  },
  {
    title: "Community Hub",
    href: "/community",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Learning Paths",
    href: "/paths",
    icon: <Flame className="w-5 h-5" />,
  },
]

const bottomNavItems = [
  {
    title: "Help & Support",
    href: "/help",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()

  if (isMobile) {
    return null
  }

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <span className="text-xl font-bold">StudyBud</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
