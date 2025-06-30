// Week Scheduler component

"use client"

import { useState, useEffect } from "react"
import { PlusCircle, CheckCircle, Circle, Trash2 } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

interface Task {
  id: string
  text: string
  done: boolean
}

type Tasks = Record<string, Task[]>

export function WeekScheduler() {
  // Persist tasks in sessionStorage so they survive page reloads within the same tab

  const [tasks, setTasks] = useState<Tasks>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("studybud-week-schedule")
        if (saved) return JSON.parse(saved) as Tasks
      } catch (e) {
        console.error("Failed to parse schedule from sessionStorage", e)
      }
    }
    return {}
  })
  const [newTask, setNewTask] = useState("")

  // Save tasks whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem("studybud-week-schedule", JSON.stringify(tasks))
    } catch (e) {
      console.error("Failed to save schedule to sessionStorage", e)
    }
  }, [tasks])
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0])

  const addTask = () => {
    const text = newTask.trim()
    if (!text) return
    const newTaskObj: Task = {
      id: Date.now().toString(),
      text,
      done: false,
    }
    setTasks((prev) => {
      const forDay = prev[selectedDay] ?? []
      return { ...prev, [selectedDay]: [...forDay, newTaskObj] }
    })
    setNewTask("")
  }

  const toggleTask = (day: string, id: string) => {
    setTasks((prev) => {
      const updated = (prev[day] ?? []).map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
      return { ...prev, [day]: updated }
    })
  }

  const deleteTask = (day: string, id: string) => {
    setTasks((prev) => {
      const updated = (prev[day] ?? []).filter((t) => t.id !== id)
      return { ...prev, [day]: updated }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Planner</CardTitle>
        <CardDescription>Plan your study tasks for the week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Task description"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addTask} variant="secondary">
            <PlusCircle className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day}>
              <h4 className="font-medium mb-1">{day}</h4>
              <ul className="space-y-1">
                {(tasks[day] ?? []).length === 0 && (
                  <li className="text-sm text-muted-foreground">No tasks</li>
                )}
                {(tasks[day] ?? []).map((task) => (
                  <li key={task.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleTask(day, task.id)}
                      >
                        {task.done ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </Button>
                      <span className={task.done ? "line-through text-muted-foreground" : ""}>{task.text}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => deleteTask(day, task.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
