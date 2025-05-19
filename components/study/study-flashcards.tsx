"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"

const flashcards = [
  {
    id: 1,
    front: "Maxwell's Equations",
    back: "A set of four partial differential equations that form the foundation of classical electromagnetism, describing how electric and magnetic fields are generated and interact.",
  },
  {
    id: 2,
    front: "Faraday's Law of Induction",
    back: "The induced electromotive force in a closed circuit is equal to the negative of the time rate of change of magnetic flux through the circuit.",
  },
  {
    id: 3,
    front: "Electromagnetic Induction",
    back: "The production of an electromotive force across an electrical conductor in a changing magnetic field.",
  },
  {
    id: 4,
    front: "Magnetic Flux",
    back: "A measure of the quantity of magnetism, taking into account the strength and extent of a magnetic field. The SI unit is the weber (Wb).",
  },
  {
    id: 5,
    front: "Lenz's Law",
    back: "The direction of the current induced in a conductor by a changing magnetic field is such that the magnetic field created by the induced current opposes the initial changing magnetic field.",
  },
]

export function StudyFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])
  const [reviewLater, setReviewLater] = useState<number[]>([])

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1)
      setFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setFlipped(false)
    }
  }

  const handleKnown = () => {
    if (!knownCards.includes(flashcards[currentCard].id)) {
      setKnownCards([...knownCards, flashcards[currentCard].id])
    }
    handleNext()
  }

  const handleReviewLater = () => {
    if (!reviewLater.includes(flashcards[currentCard].id)) {
      setReviewLater([...reviewLater, flashcards[currentCard].id])
    }
    handleNext()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Flashcards: Electromagnetism</CardTitle>
          <div className="text-sm text-slate-500">
            Card {currentCard + 1} of {flashcards.length}
          </div>
        </div>
        <Progress value={((currentCard + 1) / flashcards.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          className={`w-full max-w-md h-64 cursor-pointer perspective-1000 ${flipped ? "rotate-y-180" : ""}`}
          onClick={handleFlip}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}
          >
            <div
              className={`absolute w-full h-full flex items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 backface-hidden ${flipped ? "hidden" : ""}`}
            >
              <div className="text-xl font-medium text-center">{flashcards[currentCard].front}</div>
            </div>
            <div
              className={`absolute w-full h-full flex items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 backface-hidden rotate-y-180 ${flipped ? "" : "hidden"}`}
            >
              <div className="text-base text-center">{flashcards[currentCard].back}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrevious} disabled={currentCard === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <Button variant="outline" onClick={handleNext} disabled={currentCard === flashcards.length - 1}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReviewLater}
            className="border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950"
          >
            <X className="w-4 h-4 mr-2" /> Review Later
          </Button>
          <Button
            variant="outline"
            onClick={handleKnown}
            className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-950"
          >
            <Check className="w-4 h-4 mr-2" /> I Know This
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
