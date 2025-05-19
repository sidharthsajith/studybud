"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mic, Play, Send, VolumeIcon as VolumeUp, Check, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { analyzeLanguage } from "@/lib/ai-service"

export function LanguagePractice() {
  const [selectedLanguage, setSelectedLanguage] = useState("spanish")
  const [practiceText, setPracticeText] = useState("")
  const [translation, setTranslation] = useState("")
  const [feedback, setFeedback] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()

  const handleLanguageAnalysis = async () => {
    if (!practiceText.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const result = await analyzeLanguage(practiceText, selectedLanguage)
      setFeedback(result)
      setTranslation(result.translation)
    } catch (error) {
      console.error("Error analyzing language:", error)
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Language Practice</CardTitle>
          <CardDescription>Practice writing or speaking in your target language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Select Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="mandarin">Mandarin Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Practice Mode</label>
              <Tabs defaultValue="writing" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="writing">Writing</TabsTrigger>
                  <TabsTrigger value="speaking">Speaking</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Your Text</label>
              <Textarea
                placeholder={`Write something in ${selectedLanguage}...`}
                className="min-h-[150px]"
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Mic className="h-4 w-4" /> Record
              </Button>
              <Button onClick={handleLanguageAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {feedback && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Translation & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Translation</label>
                <div className="p-3 rounded-md bg-slate-100 dark:bg-slate-800 min-h-[100px]">{translation}</div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <VolumeUp className="mr-2 h-4 w-4" /> Listen
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Grammar Analysis</label>
                <div className="space-y-2">
                  {feedback.grammar_issues?.map((issue: any, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">{issue.error}</div>
                        <div className="text-sm text-slate-500">{issue.correction}</div>
                      </div>
                    </div>
                  ))}
                  {feedback.grammar_issues?.length === 0 && (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>No grammar issues found!</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Vocabulary Level</label>
                  <div className="text-2xl font-bold">{feedback.vocabulary_level}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Fluency Score</label>
                  <div className="text-2xl font-bold">{feedback.fluency_score}/10</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Vocabulary Used</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {feedback.vocabulary?.map((word: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Suggestions</label>
                <div className="space-y-2">
                  {feedback.suggestions?.map((suggestion: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                        {i + 1}
                      </div>
                      <div className="text-sm">{suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" /> Practice Similar Exercises
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
