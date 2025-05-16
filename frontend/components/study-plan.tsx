"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateStudyPlan } from "@/lib/api-client"
import type { StudyPlanResponse } from "@/types/api"

interface Schedule {
  [key: string]: string[]
}

interface EstimatedTime {
  [key: string]: number
}

interface Resources {
  [key: string]: string[]
}

export function StudyPlan() {
  const [scheduleData, setScheduleData] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<StudyPlanResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scheduleData.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await generateStudyPlan(scheduleData)
      setResult(data)
    } catch (err) {
      console.error("Error generating study plan:", err)
      // Handle HTML response errors more gracefully
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Study Plan</h1>
        <p className="text-muted-foreground">Generate an optimized study plan based on your schedule and tasks</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
            <CardDescription>Enter your availability, subjects, and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: I have exams in 2 weeks for Biology, Chemistry, and Physics. I can study 3 hours on weekdays and 5 hours on weekends. Biology is my priority."
              className="min-h-[200px]"
              value={scheduleData}
              onChange={(e) => setScheduleData(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !scheduleData.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Generating..." : "Generate Study Plan"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Study Plan</CardTitle>
            <CardDescription>Optimized schedule based on your availability and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule">
              <TabsList className="mb-4">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="priorities">Priorities</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule">
                <div className="space-y-4">
                  {Object.entries(result.schedule).map(([day, activities], index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="mb-2 inline-flex rounded-xl bg-amber-100 p-2 dark:bg-amber-900">
                          <Calendar className="h-5 w-5 text-amber-500" />
                        </div>
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1">
                          {activities.map((activity, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="priorities">
                <Card>
                  <CardHeader>
                    <CardTitle>Priority Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.priority_topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Estimated Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(result.estimated_time).map(([subject, hours], index) => (
                        <div key={index}>
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{subject}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{hours} hours</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{
                                width: `${Math.min(
                                  (hours / Math.max(...Object.values(result.estimated_time))) * 100,
                                  100,
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <div className="space-y-4">
                  {Object.entries(result.resources).map(([subject, resources], index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{subject}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1">
                          {resources.map((resource, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
