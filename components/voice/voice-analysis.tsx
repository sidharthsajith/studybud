import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle, Lightbulb } from "lucide-react"

export function VoiceAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Analysis Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="mt-4">
              <EngagementAnalysis />
            </TabsContent>
            <TabsContent value="concepts" className="mt-4">
              <ConceptsAnalysis />
            </TabsContent>
            <TabsContent value="sentiment" className="mt-4">
              <SentimentAnalysis />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
              <div className="space-y-2">
                <div className="font-medium">Confusion Detected</div>
                <p className="text-sm text-slate-500">
                  In your Physics lecture recording, we detected confusion around the concept of wave-particle duality.
                  Consider reviewing this topic with additional resources.
                </p>
                <Button size="sm" variant="outline">
                  Generate Study Materials
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
              <div className="space-y-2">
                <div className="font-medium">Pronunciation Improvement</div>
                <p className="text-sm text-slate-500">
                  Your Japanese pronunciation has improved by 15% since last month, particularly with the "r" sound.
                  Keep practicing with the suggested exercises.
                </p>
                <Button size="sm" variant="outline">
                  View Pronunciation Exercises
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
              <div className="space-y-2">
                <div className="font-medium">Study Pattern Insight</div>
                <p className="text-sm text-slate-500">
                  Based on your voice notes, you engage most deeply with content in the morning hours (8-10 AM).
                  Consider scheduling important study sessions during this time.
                </p>
                <Button size="sm" variant="outline">
                  Optimize Study Schedule
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EngagementAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Average Engagement</div>
            <div className="text-3xl font-bold mt-1">78%</div>
            <div className="text-xs text-slate-400 mt-1">+5% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Confusion Markers</div>
            <div className="text-3xl font-bold mt-1">12</div>
            <div className="text-xs text-slate-400 mt-1">-3 from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Focus Duration</div>
            <div className="text-3xl font-bold mt-1">42 min</div>
            <div className="text-xs text-slate-400 mt-1">Average per session</div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Engagement by Recording</div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Physics Lecture: Quantum Mechanics</div>
              <div className="text-sm font-medium">85%</div>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Research Ideas for AI Ethics Paper</div>
              <div className="text-sm font-medium">92%</div>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Japanese Pronunciation Practice</div>
              <div className="text-sm font-medium">78%</div>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Meeting with Study Group</div>
              <div className="text-sm font-medium">65%</div>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Chemistry Lab Notes</div>
              <div className="text-sm font-medium">70%</div>
            </div>
            <Progress value={70} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ConceptsAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Key Concepts Identified</div>
            <div className="text-3xl font-bold mt-1">24</div>
            <div className="text-xs text-slate-400 mt-1">Across all recordings</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Concept Connections</div>
            <div className="text-3xl font-bold mt-1">18</div>
            <div className="text-xs text-slate-400 mt-1">Between different subjects</div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg border-slate-200 dark:border-slate-800">
        <div className="font-medium mb-4">Top Concepts by Recording</div>

        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="font-medium">Physics Lecture: Quantum Mechanics</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Wave-particle duality</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Uncertainty principle</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Quantum states</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Schrödinger equation</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Quantum measurement</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="font-medium">Research Ideas for AI Ethics Paper</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Algorithmic bias</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Transparency</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Accountability</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Privacy concerns</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="font-medium">Japanese Pronunciation Practice</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">R sound variations</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Pitch accent</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Vowel length</div>
              <div className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700">Intonation patterns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SentimentAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Overall Sentiment</div>
            <div className="text-3xl font-bold mt-1">Positive</div>
            <div className="text-xs text-slate-400 mt-1">72% positive markers</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Confidence Level</div>
            <div className="text-3xl font-bold mt-1">Medium</div>
            <div className="text-xs text-slate-400 mt-1">Based on voice patterns</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-slate-500">Stress Indicators</div>
            <div className="text-3xl font-bold mt-1">Low</div>
            <div className="text-xs text-slate-400 mt-1">8% of recordings</div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg border-slate-200 dark:border-slate-800">
        <div className="font-medium mb-4">Sentiment Analysis by Recording</div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Physics Lecture: Quantum Mechanics</div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <div className="text-sm">Neutral (58%)</div>
              </div>
            </div>
            <div className="flex h-2 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <div className="bg-green-500 h-full" style={{ width: "32%" }}></div>
              <div className="bg-amber-500 h-full" style={{ width: "58%" }}></div>
              <div className="bg-red-500 h-full" style={{ width: "10%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <div>Positive: 32%</div>
              <div>Neutral: 58%</div>
              <div>Negative: 10%</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Research Ideas for AI Ethics Paper</div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm">Positive (75%)</div>
              </div>
            </div>
            <div className="flex h-2 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
              <div className="bg-amber-500 h-full" style={{ width: "20%" }}></div>
              <div className="bg-red-500 h-full" style={{ width: "5%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <div>Positive: 75%</div>
              <div>Neutral: 20%</div>
              <div>Negative: 5%</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Japanese Pronunciation Practice</div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="text-sm">Negative (62%)</div>
              </div>
            </div>
            <div className="flex h-2 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <div className="bg-green-500 h-full" style={{ width: "15%" }}></div>
              <div className="bg-amber-500 h-full" style={{ width: "23%" }}></div>
              <div className="bg-red-500 h-full" style={{ width: "62%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <div>Positive: 15%</div>
              <div>Neutral: 23%</div>
              <div>Negative: 62%</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 mt-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 mt-0.5 text-slate-500" />
              <div>
                <div className="font-medium">About Sentiment Analysis</div>
                <p className="text-sm text-slate-500 mt-1">
                  Sentiment analysis examines your voice patterns, word choice, and speech cadence to identify emotional
                  states. Negative sentiment isn't necessarily bad—it can indicate areas where you might benefit from
                  additional support or resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
