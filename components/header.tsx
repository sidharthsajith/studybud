"use client"

import { Search, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthProvider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const { user, signOut } = useAuth()
  const isMobile = useMobile()

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4">
        {isMobile && (
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <span className="text-xl font-bold">StudyBud</span>
          </Link>
        )}
        {!isMobile && (
          <div className="flex items-center flex-1 gap-4 md:gap-8">
            <h1 className="text-xl font-bold">StudyBud</h1>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
            {user ? (
              <Button size="sm" variant="secondary" onClick={signOut}>Log out</Button>
            ) : (
              <Link href="/login"><Button size="sm">Log in</Button></Link>
            )}
        </div>
      </div>
    </header>
  )
}
