import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguagePractice } from "@/components/language/language-practice"
import { LanguageVocabulary } from "@/components/language/language-vocabulary"
import { LanguageProgress } from "@/components/language/language-progress"
import { LanguageExercises } from "@/components/language/language-exercises"
import { BookOpen, ListChecks, BarChart, MessageSquare } from "lucide-react"

export default function LanguagePage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Language Learning</h1>
        <p className="text-slate-500 dark:text-slate-400">Practice and improve your language skills</p>
      </div>

      <Tabs defaultValue="practice">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="practice">
            <MessageSquare className="w-4 h-4 mr-2" /> Practice
          </TabsTrigger>
          <TabsTrigger value="vocabulary">
            <BookOpen className="w-4 h-4 mr-2" /> Vocabulary
          </TabsTrigger>
          <TabsTrigger value="exercises">
            <ListChecks className="w-4 h-4 mr-2" /> Exercises
          </TabsTrigger>
          <TabsTrigger value="progress">
            <BarChart className="w-4 h-4 mr-2" /> Progress
          </TabsTrigger>
        </TabsList>
        <TabsContent value="practice" className="mt-4">
          <LanguagePractice />
        </TabsContent>
        <TabsContent value="vocabulary" className="mt-4">
          <LanguageVocabulary />
        </TabsContent>
        <TabsContent value="exercises" className="mt-4">
          <LanguageExercises />
        </TabsContent>
        <TabsContent value="progress" className="mt-4">
          <LanguageProgress />
        </TabsContent>
      </Tabs>
    </div>
  )
}
