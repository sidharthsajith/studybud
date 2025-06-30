// Pomodoro Timer component

"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export function PomodoroTimer() {
  const DEFAULT_WORK = 25 * 60
  const DEFAULT_BREAK = 5 * 60

  const [workDuration, setWorkDuration] = useState(DEFAULT_WORK)
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK)
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_WORK)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // progress percentage
  const progress = 100 - (secondsLeft / (isWorkSession ? workDuration : breakDuration)) * 100

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Switch session
          const nextIsWork = !isWorkSession
          setIsWorkSession(nextIsWork)
          return nextIsWork ? workDuration : breakDuration
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, isWorkSession, workDuration, breakDuration])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setIsWorkSession(true)
    setSecondsLeft(workDuration)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>
          {isWorkSession ? "Focus on your task" : "Take a short break"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-mono text-center">
          {formatTime(secondsLeft)}
        </div>
        <Progress value={progress} className="h-3" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="work">
              Work (min)
            </label>
            <Input
              id="work"
              type="number"
              min={1}
              className="text-center"
              value={Math.floor(workDuration / 60)}
              onChange={(e) => {
                const v = parseInt(e.target.value) || 1
                setWorkDuration(v * 60)
                if (isWorkSession) setSecondsLeft(v * 60)
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="break">
              Break (min)
            </label>
            <Input
              id="break"
              type="number"
              min={1}
              className="text-center"
              value={Math.floor(breakDuration / 60)}
              onChange={(e) => {
                const v = parseInt(e.target.value) || 1
                setBreakDuration(v * 60)
                if (!isWorkSession) setSecondsLeft(v * 60)
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {isRunning ? (
          <Button variant="outline" onClick={handlePause} size="icon">
            <Pause className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleStart} size="icon">
            <Play className="h-4 w-4" />
          </Button>
        )}
        <Button variant="secondary" onClick={handleReset} size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
