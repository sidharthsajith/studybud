"use client"

import { useState } from "react"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"
import { ModeToggle } from "./mode-toggle"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"

export function Header() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-5 h-5" />
        </Button>
      )}
      <div className="flex items-center flex-1 gap-4 md:gap-8">
        {!isMobile && <h1 className="text-xl font-bold">StudyBud</h1>}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                <AvatarFallback>{user?.email?.charAt(0) || <User className="w-5 h-5" />}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
