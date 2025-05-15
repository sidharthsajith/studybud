"use client"

import type React from "react"
import { useState } from "react"
import { FileText, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateFlashCards } from "@/lib/api-client"
import type { FlashCard } from "@/types/api"

export function FlashCards() {
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [flashCards, setFlashCards] = useState<FlashCard[]>([])
  const [currentCard, setCurrentCard] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await generateFlashCards(notes)
      setFlashCards(data)
      setCurrentCard(0)
      setShowAnswer(false)
    } catch (err) {
      console.error("Error generating flash cards:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const nextCard = () => {
    if (currentCard === null || currentCard >= flashCards.length - 1) {
      setCurrentCard(0)
    } else {
      setCurrentCard(currentCard + 1)
    }
    setShowAnswer(false)
  }

  const prevCard = () => {
    if (currentCard === null || currentCard <= 0) {
      setCurrentCard(flashCards.length - 1)
    } else {
      setCurrentCard(currentCard - 1)
    }
    setShowAnswer(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Flash Cards</h1>
        <p className="text-muted-foreground">Generate flash cards from your study notes to test your knowledge</p>
      </div>

      {flashCards.length === 0 ? (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
              <CardDescription>Enter your study notes to generate flash cards</CardDescription>
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
                {loading ? "Generating..." : "Generate Flash Cards"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setFlashCards([])
                setCurrentCard(null)
                setNotes("")
              }}
            >
              Create New Cards
            </Button>
            <div className="text-sm text-muted-foreground">
              Card {currentCard !== null ? currentCard + 1 : 0} of {flashCards.length}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {currentCard !== null && (
            <Card className="min-h-[300px]">
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex rounded-xl bg-green-100 p-2 dark:bg-green-900">
                  <FileText className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle>
                  {flashCards[currentCard].difficulty === 1 && "Easy"}
                  {flashCards[currentCard].difficulty === 2 && "Medium"}
                  {flashCards[currentCard].difficulty === 3 && "Hard"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="mb-6 text-center text-xl font-medium">
                  {showAnswer ? flashCards[currentCard].answer : flashCards[currentCard].question}
                </div>
                <Button onClick={toggleAnswer} variant="outline" className="mb-4">
                  {showAnswer ? "Show Question" : "Show Answer"}
                </Button>
                <div className="flex w-full justify-between">
                  <Button onClick={prevCard} variant="ghost">
                    Previous
                  </Button>
                  <Button onClick={nextCard}>Next</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
