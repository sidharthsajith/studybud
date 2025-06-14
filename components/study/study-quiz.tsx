"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, HelpCircle, RefreshCw } from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of Maxwell's equations describes how magnetic fields are generated by electric currents and changing electric fields?",
    options: [
      "Gauss's law",
      "Gauss's law for magnetism",
      "Ampère's circuital law with Maxwell's addition",
      "Faraday's law of induction",
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "What does Faraday's law of induction state?",
    options: [
      "Electric charge is conserved",
      "The induced electromotive force is proportional to the rate of change of magnetic flux",
      "Magnetic monopoles do not exist",
      "Electric fields are generated by charges",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "In electromagnetic induction, what causes the induced current in a conductor?",
    options: [
      "Static magnetic fields",
      "Static electric fields",
      "Changing magnetic fields",
      "Constant electric potential",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is the SI unit of magnetic flux?",
    options: ["Tesla", "Weber", "Henry", "Ampere"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which phenomenon demonstrates the principle of electromagnetic induction?",
    options: [
      "A stationary magnet creating a constant magnetic field",
      "A charged particle moving at constant velocity in a vacuum",
      "A conductor moving through a magnetic field generating current",
      "Two like charges repelling each other",
    ],
    correctAnswer: 2,
  },
]

export function StudyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleOptionSelect = (value: string) => {
    setSelectedOption(Number.parseInt(value))
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return

    setShowAnswer(true)
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowAnswer(false)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(null)
      setShowAnswer(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-4xl font-bold">
            {score} / {quizQuestions.length}
          </div>
          <Progress value={(score / quizQuestions.length) * 100} className="h-2 w-[200px] mx-auto" />
          <p className="text-slate-500">
            {score === quizQuestions.length
              ? "Perfect score! Excellent work!"
              : score >= quizQuestions.length * 0.7
                ? "Great job! You've mastered most of the material."
                : "Keep practicing! Review the topics you missed."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetQuiz}>
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Practice Quiz: Electromagnetism</CardTitle>
          <div className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-medium">{question.question}</div>
        <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={showAnswer}
                className={
                  showAnswer && index === question.correctAnswer
                    ? "text-green-500 border-green-500"
                    : showAnswer && index === selectedOption && index !== question.correctAnswer
                      ? "text-red-500 border-red-500"
                      : ""
                }
              />
              <Label
                htmlFor={`option-${index}`}
                className={
                  showAnswer && index === question.correctAnswer
                    ? "text-green-500"
                    : showAnswer && index === selectedOption && index !== question.correctAnswer
                      ? "text-red-500"
                      : ""
                }
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showAnswer && (
          <div className="p-4 rounded-md bg-slate-100 dark:bg-slate-800">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 mt-0.5 text-slate-500" />
              <div>
                <div className="font-medium">Explanation</div>
                <p className="text-sm text-slate-500">
                  {currentQuestion === 0 &&
                    "Ampère's circuital law with Maxwell's addition describes how magnetic fields are generated by electric currents and changing electric fields. This is one of Maxwell's four equations that form the foundation of classical electromagnetism."}
                  {currentQuestion === 1 &&
                    "Faraday's law of induction states that the induced electromotive force (EMF) in a closed circuit is equal to the negative of the time rate of change of magnetic flux through the circuit."}
                  {currentQuestion === 2 &&
                    "Changing magnetic fields induce an electromotive force (EMF) in a conductor, which can drive a current. This is the principle behind generators and transformers."}
                  {currentQuestion === 3 &&
                    "The weber (Wb) is the SI unit of magnetic flux. One weber equals one tesla-square meter (T⋅m²)."}
                  {currentQuestion === 4 &&
                    "A conductor moving through a magnetic field generates an induced current, demonstrating electromagnetic induction. This principle is used in electric generators."}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <div>
          {!showAnswer ? (
            <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
              <Check className="w-4 h-4 mr-2" /> Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Complete Quiz"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
