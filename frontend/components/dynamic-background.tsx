"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function DynamicBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number
  }

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create particles
    const particleCount = Math.floor(dimensions.width * 0.05)
    const particles: Particle[] = []

    const isDark = theme === "dark"
    const baseColor = isDark ? "255, 255, 255" : "0, 0, 0"
    const accentColor = isDark ? "147, 51, 234" : "79, 70, 229" // Purple in RGB

    for (let i = 0; i < particleCount; i++) {
      const useAccent = Math.random() > 0.7
      const color = useAccent ? accentColor : baseColor

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(${color}, ${Math.random() * 0.2 + 0.1})`,
        alpha: Math.random() * 0.2 + 0.1,
      })
    }

    particlesRef.current = particles

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Draw connections
      ctx.lineWidth = 0.3
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${baseColor}, ${0.2 - distance / 500})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-70" style={{ pointerEvents: "none" }} />
}
