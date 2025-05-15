"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ApiStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [apiUrl, setApiUrl] = useState<string>("")

  useEffect(() => {
    async function checkApiStatus() {
      try {
        const response = await fetch("/api/config")
        const data = await response.json()
        setApiUrl(data.apiBaseUrl)

        // Try to ping the API
        const pingResponse = await fetch(`${data.apiBaseUrl}`, {
          method: "HEAD",
          // Using AbortController to timeout after 5 seconds
          signal: AbortSignal.timeout(5000),
        }).catch(() => ({ ok: false }))

        if (pingResponse.ok) {
          setStatus("connected")
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("API status check failed:", error)
        setStatus("error")
      }
    }

    checkApiStatus()
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge
                variant={status === "connected" ? "default" : status === "loading" ? "outline" : "destructive"}
                className="cursor-help"
              >
                <motion.div
                  animate={status === "loading" ? { rotate: 360 } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
                  className="mr-1 h-2 w-2 rounded-full bg-current"
                ></motion.div>
                API: {status === "connected" ? "Connected" : status === "loading" ? "Checking..." : "Error"}
              </Badge>
            </motion.div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {status === "connected"
              ? `Connected to ${apiUrl}`
              : status === "loading"
                ? "Checking API connection..."
                : `Failed to connect to ${apiUrl}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
