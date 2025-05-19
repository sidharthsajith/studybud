"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Brain,
  FileText,
  Flame,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Settings,
  Users,
  ImageIcon,
  Languages,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

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
    title: "Language Learning",
    href: "/language",
    icon: <Languages className="w-5 h-5" />,
  },
  {
    title: "Image Analysis",
    href: "/image-analysis",
    icon: <ImageIcon className="w-5 h-5" />,
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
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-primary text-primary-foreground"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <MessageSquare className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </Button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                    <Brain className="w-6 h-6" />
                    <span className="text-xl font-bold">StudyBud</span>
                  </Link>
                </div>
                <ScrollArea className="flex-1 px-4 py-2">
                  <nav className="flex flex-col gap-1">
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
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </nav>

                  <Separator className="my-4" />

                  <nav className="flex flex-col gap-1">
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
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </ScrollArea>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                      <AvatarFallback>{user?.email?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user?.user_metadata?.full_name || user?.email || "User"}</span>
                      <span className="text-xs text-slate-500">View Profile</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
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
        <ScrollArea className="flex-1 px-4 py-2">
          <nav className="flex flex-col gap-1">
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

          <Separator className="my-4" />

          <nav className="flex flex-col gap-1">
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
        </ScrollArea>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
              <AvatarFallback>{user?.email?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{user?.user_metadata?.full_name || user?.email || "User"}</span>
              <span className="text-xs text-slate-500">View Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  )
}
