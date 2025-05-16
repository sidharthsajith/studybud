"use client"

import type React from "react"
import { useState } from "react"
import { Lightbulb, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { extractKeyPoints } from "@/lib/api-client"
import type { KeyPointsResponse } from "@/types/api"

interface KeyPoint {
  title: string
  points: Array<{ text: string }>
}

interface SupportingDetails {
  text: string[]
}

export function ExtractKeyPoints() {
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<KeyPointsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await extractKeyPoints(notes)
      setResult(data)
    } catch (err) {
      console.error("Error extracting key points:", err)
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
        <h1 className="text-3xl font-bold tracking-tight">Extract Key Points</h1>
        <p className="text-muted-foreground">
          Identify the most important concepts and supporting details from your notes
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Your Notes</CardTitle>
            <CardDescription>Enter your study notes in the text area below</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your notes here..."
              className="min-h-[200px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !notes.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Extracting..." : "Extract Key Points"}
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
            <CardTitle>Key Points</CardTitle>
            <CardDescription>The most important concepts from your notes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="key-points">
              <TabsList className="mb-4">
                <TabsTrigger value="key-points">Key Points</TabsTrigger>
                <TabsTrigger value="supporting-details">Supporting Details</TabsTrigger>
              </TabsList>
              <TabsContent value="key-points">
                <div className="grid gap-4 md:grid-cols-2">
                  {result.key_points.map((point, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="mb-2 inline-flex rounded-xl bg-blue-100 p-2 dark:bg-blue-900">
                          <Lightbulb className="h-5 w-5 text-blue-500" />
                        </div>
                        <CardTitle className="text-lg">{point.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-2">
  {point.points.map((p, i) => (
    <li key={i} className="text-foreground">{p.text}</li>
  ))}
</ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="supporting-details">
                <div className="space-y-4">
                  {result.supporting_details.text.map((detail, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Supporting Detail {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1">
                          <li className="text-sm text-muted-foreground">
                            {detail}
                          </li>
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
