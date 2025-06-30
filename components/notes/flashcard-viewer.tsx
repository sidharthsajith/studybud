"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Flashcard {
  front: string
  back: string
}

interface FlashcardViewerProps {
  flashcards: Flashcard[]
}

export function FlashcardViewer({ flashcards }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  if (flashcards.length === 0) {
    return null
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex(prev => (prev + 1) % flashcards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex(prev => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const currentCard = flashcards[currentIndex]

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Generated Flashcards</h3>
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -180 : 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: isFlipped ? 0 : 180 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md h-64 perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card className="w-full h-full flex items-center justify-center text-center p-6 cursor-pointer transform-style-preserve-3d">
              <CardContent className="text-lg font-medium backface-hidden">
                {isFlipped ? currentCard.back : currentCard.front}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={handlePrev}>Previous</Button>
          <span>{currentIndex + 1} / {flashcards.length}</span>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  )
}
