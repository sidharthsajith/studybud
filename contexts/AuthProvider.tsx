"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"

interface AuthContextProps {
  user: User | null
  loading: boolean
  signIn: (options: { email: string; password: string }) => Promise<{ error?: string }>
  signUp: (options: { email: string; password: string }) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set initial loading state
    setLoading(true)

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn: AuthContextProps["signIn"] = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message }
  }

  const signUp: AuthContextProps["signUp"] = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return { error: error?.message }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
