/*
 * Simple list view for flashcards rendered as Question / Answer pairs.
 */
"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Flashcard {
  front: string
  back: string
}

interface FlashcardListProps {
  flashcards: Flashcard[]
}

export function FlashcardList({ flashcards }: FlashcardListProps) {
  if (!flashcards || flashcards.length === 0) return null

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto p-2">
      {flashcards.map((card, idx) => (
        <Card
          key={idx}
          className="p-4 border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-sm"
        >
          <CardContent className="space-y-2">
            <div>
              <span className="font-semibold text-blue-800 dark:text-blue-200">Question:&nbsp;</span>
              <span className="text-blue-800 dark:text-blue-200">{card.front}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-700 dark:text-blue-300">Answer:&nbsp;</span>
              <span className="text-blue-700 dark:text-blue-300">{card.back}</span>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
        {flashcards.length} card{flashcards.length !== 1 ? "s" : ""} generated
      </div>
    </div>
  )
}
