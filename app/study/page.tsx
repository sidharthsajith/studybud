import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, FileText, Play } from "lucide-react"
import { StudyNotes } from "@/components/study/study-notes"
import { StudyQuiz } from "@/components/study/study-quiz"
import { StudyFlashcards } from "@/components/study/study-flashcards"

export default function StudyMode() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Study Mode</h1>
        <p className="text-slate-500 dark:text-slate-400">Focus on learning with AI-enhanced study tools</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Current Course</CardTitle>
            <CardDescription>Advanced Physics</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Chapter 7: Electromagnetism</div>
              <div className="text-xs text-slate-500">Last studied: 2 hours ago</div>
              <div className="text-xs text-slate-500">Quiz scheduled: May 21, 2025</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" /> Resume Study Session
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Study Stats</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Study time</div>
                <div className="font-medium">8.5 hours</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Notes created</div>
                <div className="font-medium">12 pages</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Flashcards reviewed</div>
                <div className="font-medium">87 cards</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Quiz score average</div>
                <div className="font-medium">82%</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Knowledge Gaps</CardTitle>
            <CardDescription>AI-identified areas to focus on</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Maxwell's Equations Applications</div>
              <div className="text-xs text-slate-500">Review practical applications in circuit theory</div>
              <div className="text-sm font-medium mt-3">Electromagnetic Induction</div>
              <div className="text-xs text-slate-500">Practice problems with Faraday's Law</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Generate Focused Exercises
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="notes">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="notes">
            <BookOpen className="w-4 h-4 mr-2" /> Notes
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain className="w-4 h-4 mr-2" /> Practice Quiz
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <FileText className="w-4 h-4 mr-2" /> Flashcards
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="mt-4">
          <StudyNotes />
        </TabsContent>
        <TabsContent value="quiz" className="mt-4">
          <StudyQuiz />
        </TabsContent>
        <TabsContent value="flashcards" className="mt-4">
          <StudyFlashcards />
        </TabsContent>
      </Tabs>
    </div>
  )
}
