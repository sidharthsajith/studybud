"use client"

import { useAuth } from "@/contexts/AuthProvider"
import { useRouter, usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/login" && pathname !== "/signup") {
        router.replace("/login")
      } else if (user && (pathname === "/login" || pathname === "/signup")) {
        router.replace("/")
      }
      setIsLoading(false)
    }
  }, [loading, user, router, pathname])

  if (loading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Allow access to auth pages when not logged in
  if (!user && (pathname === "/login" || pathname === "/signup")) {
    return <>{children}</>
  }

  // Protect other routes
  if (!user) {
    return null
  }

  return <>{children}</>
}
