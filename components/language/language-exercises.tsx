"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, HelpCircle, RefreshCw } from "lucide-react"

// Sample exercises data
const exercises = [
  {
    id: "1",
    language: "spanish",
    title: "Spanish Grammar Practice",
    level: "Beginner",
    description: "Practice basic Spanish grammar concepts",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Which is the correct translation of 'I eat an apple'?",
        options: ["Yo come una manzana", "Yo comer una manzana", "Yo como una manzana", "Yo comiendo una manzana"],
        correctAnswer: 2,
        explanation: "The correct conjugation of 'comer' (to eat) in first person singular present tense is 'como'.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Which article is used with the feminine noun 'casa' (house)?",
        options: ["El", "La", "Los", "Las"],
        correctAnswer: 1,
        explanation: "'Casa' is a feminine noun, so it uses the feminine singular article 'la'.",
      },
      {
        id: "q3",
        type: "fill-in-blank",
        question: "Complete the sentence: 'Yo ____ a la escuela todos los días.' (I go to school every day)",
        correctAnswer: "voy",
        explanation: "The correct conjugation of 'ir' (to go) in first person singular present tense is 'voy'.",
      },
    ],
  },
  {
    id: "2",
    language: "japanese",
    title: "Japanese Particles",
    level: "Intermediate",
    description: "Practice using Japanese particles correctly",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Which particle is used to mark the direct object of a verb?",
        options: ["は (wa)", "が (ga)", "を (wo/o)", "に (ni)"],
        correctAnswer: 2,
        explanation: "The particle を (wo/o) is used to mark the direct object of a verb.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Which particle indicates the location where an action takes place?",
        options: ["で (de)", "に (ni)", "へ (e)", "から (kara)"],
        correctAnswer: 0,
        explanation: "The particle で (de) indicates the location where an action takes place.",
      },
      {
        id: "q3",
        type: "fill-in-blank",
        question: "Complete the sentence: '私は本＿＿読みます。' (I read a book.)",
        correctAnswer: "を",
        explanation: "The particle を (wo/o) marks '本' (book) as the direct object of the verb '読みます' (read).",
      },
    ],
  },
]

export function LanguageExercises() {
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [textAnswer, setTextAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [exerciseCompleted, setExerciseCompleted] = useState(false)

  const filteredExercises =
    selectedLanguage === "all" ? exercises : exercises.filter((ex) => ex.language === selectedLanguage)

  const startExercise = (exercise: any) => {
    setSelectedExercise(exercise)
    setCurrentQuestion(0)
    setSelectedOption(null)
    setTextAnswer("")
    setShowAnswer(false)
    setScore(0)
    setExerciseCompleted(false)
  }

  const handleOptionSelect = (value: string) => {
    setSelectedOption(Number.parseInt(value))
  }

  const handleCheckAnswer = () => {
    if (!selectedExercise) return

    const question = selectedExercise.questions[currentQuestion]

    if (question.type === "multiple-choice" && selectedOption !== null) {
      setShowAnswer(true)
      if (selectedOption === question.correctAnswer) {
        setScore(score + 1)
      }
    } else if (question.type === "fill-in-blank" && textAnswer.trim()) {
      setShowAnswer(true)
      if (textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (!selectedExercise) return

    setSelectedOption(null)
    setTextAnswer("")
    setShowAnswer(false)

    if (currentQuestion < selectedExercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setExerciseCompleted(true)
    }
  }

  const resetExercise = () => {
    setSelectedExercise(null)
    setCurrentQuestion(0)
    setSelectedOption(null)
    setTextAnswer("")
    setShowAnswer(false)
    setScore(0)
    setExerciseCompleted(false)
  }

  if (!selectedExercise) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Language Exercises</h2>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="mandarin">Mandarin Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id}>
              <CardHeader>
                <CardTitle>{exercise.title}</CardTitle>
                <CardDescription>{exercise.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge>{exercise.language}</Badge>
                  <Badge variant="outline">{exercise.level}</Badge>
                </div>
                <div className="text-sm text-slate-500">{exercise.questions.length} questions</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => startExercise(exercise)}>
                  Start Exercise
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (exerciseCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Exercise Completed!</CardTitle>
          <CardDescription className="text-center">{selectedExercise.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-4xl font-bold">
            {score} / {selectedExercise.questions.length}
          </div>
          <Progress value={(score / selectedExercise.questions.length) * 100} className="h-2 w-[200px] mx-auto" />
          <p className="text-slate-500">
            {score === selectedExercise.questions.length
              ? "Perfect score! Excellent work!"
              : score >= selectedExercise.questions.length * 0.7
                ? "Great job! You've mastered most of the concepts."
                : "Keep practicing! Review the concepts you missed."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={resetExercise}>
            <RefreshCw className="w-4 h-4 mr-2" /> Try Another Exercise
          </Button>
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setSelectedOption(null)
              setTextAnswer("")
              setShowAnswer(false)
              setScore(0)
              setExerciseCompleted(false)
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Retry This Exercise
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = selectedExercise.questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{selectedExercise.title}</CardTitle>
          <div className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {selectedExercise.questions.length}
          </div>
        </div>
        <Progress value={((currentQuestion + 1) / selectedExercise.questions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge>{selectedExercise.language}</Badge>
          <Badge variant="outline">{selectedExercise.level}</Badge>
        </div>

        <div className="text-lg font-medium">{question.question}</div>

        {question.type === "multiple-choice" ? (
          <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
            {question.options.map((option: string, index: number) => (
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
        ) : (
          <div className="space-y-2">
            <Input
              placeholder="Type your answer here..."
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={showAnswer}
              className={
                showAnswer
                  ? textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
                    ? "border-green-500 focus-visible:ring-green-500"
                    : "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {showAnswer && (
              <div className="flex items-center gap-2 text-sm">
                <div>Correct answer:</div>
                <div className="font-medium">{question.correctAnswer}</div>
              </div>
            )}
          </div>
        )}

        {showAnswer && (
          <div className="p-4 rounded-md bg-slate-100 dark:bg-slate-800">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 mt-0.5 text-slate-500" />
              <div>
                <div className="font-medium">Explanation</div>
                <p className="text-sm text-slate-500">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetExercise}>
          Cancel
        </Button>
        <div>
          {!showAnswer ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={
                (question.type === "multiple-choice" && selectedOption === null) ||
                (question.type === "fill-in-blank" && !textAnswer.trim())
              }
            >
              <Check className="w-4 h-4 mr-2" /> Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestion < selectedExercise.questions.length - 1 ? (
                <>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Complete Exercise"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
