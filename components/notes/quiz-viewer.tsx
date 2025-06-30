"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizViewerProps {
  quiz: QuizQuestion[]
}

export function QuizViewer({ quiz }: QuizViewerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  if (quiz.length === 0) {
    return null
  }

  const handleAnswerSelect = (option: string) => {
    if (showAnswer) return
    setSelectedAnswer(option)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return
    setShowAnswer(true)
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowAnswer(false)
    setScore(0)
    setIsFinished(false)
  }

  if (isFinished) {
    return (
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl mb-4">Your score: {score} / {quiz.length}</p>
            <Button onClick={handleRestart}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = quiz[currentQuestionIndex]

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Generated Quiz</h3>
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}/{quiz.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer
              const isSelected = option === selectedAnswer
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "justify-start text-left h-auto whitespace-normal",
                    showAnswer && isCorrect && "bg-green-200 border-green-400 text-green-900",
                    showAnswer && isSelected && !isCorrect && "bg-red-200 border-red-400 text-red-900",
                    !showAnswer && isSelected && "bg-primary/20 border-primary"
                  )}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </Button>
              )
            })}
          </div>
          <div className="mt-6 flex justify-end">
            {showAnswer ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>Check Answer</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
