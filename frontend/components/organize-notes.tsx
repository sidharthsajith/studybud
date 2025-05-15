"use client"

import type React from "react"
import { useState } from "react"
import { Folder, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { api } from "@/lib/api"
import type { OrganizeNotesResponse } from "@/types/api"

interface Category {
  [key: string]: any
}

interface ConceptMap {
  [key: string]: string[]
}

export function OrganizeNotes() {
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OrganizeNotesResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) return

    setLoading(true);
    setError(null);
    setResult(null)
    try {
      const response = await api.organizeNotes(notes);
      if (typeof response === 'string') {
        // Handle HTML/error responses
        throw new Error('Invalid server response');
      }
      const { data, error: apiError } = response;
      if (apiError) throw new Error(apiError);
      if (!data?.categories || !data?.concept_map) {
        throw new Error('Invalid data format from server');
      }
      setResult(data);
    } catch (err) {
      console.error("Error organizing notes:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Organize Notes</h1>
        <p className="text-muted-foreground">
          Paste your study notes below to organize and categorize them by topic and concept
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
              {loading ? "Organizing..." : "Organize Notes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Organized Notes</CardTitle>
            <CardDescription>Your notes have been organized into categories and concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="categories">
              <TabsList className="mb-4">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="concept-map">Concept Map</TabsTrigger>
              </TabsList>
              <TabsContent value="categories">
                <div className="grid gap-4 md:grid-cols-2">
                  {result?.categories?.map((category, index) => {
                    const categoryName = Object.keys(category)[0]
                    return (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="mb-2 inline-flex rounded-xl bg-purple-100 p-2 dark:bg-purple-900">
                            <Folder className="h-5 w-5 text-purple-500" />
                          </div>
                          <CardTitle className="text-lg">{categoryName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{JSON.stringify(category[categoryName])}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
              <TabsContent value="concept-map">
                <div className="space-y-4">
                  {Object.entries(result.concept_map).map(([concept, related], index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{concept}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {related.map((item, i) => (
                            <div key={i} className="rounded-full bg-muted px-3 py-1 text-sm">
                              {item}
                            </div>
                          ))}
                        </div>
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
