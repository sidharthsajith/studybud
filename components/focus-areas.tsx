import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb } from "lucide-react"

const focusAreas = [
  {
    id: 1,
    title: "Quantum Mechanics Concepts",
    description: "Review wave-particle duality and uncertainty principle",
    progress: 35,
    recommendation: "Practice with interactive simulations",
  },
  {
    id: 2,
    title: "JavaScript Async Functions",
    description: "Master promises and async/await patterns",
    progress: 62,
    recommendation: "Complete the coding exercises in Web Development path",
  },
  {
    id: 3,
    title: "Japanese Kanji Practice",
    description: "Focus on JLPT N4 level kanji characters",
    progress: 28,
    recommendation: "Use spaced repetition flashcards daily",
  },
]

export function FocusAreas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Focus Areas</CardTitle>
        <CardDescription>AI-suggested topics based on your learning patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {focusAreas.map((area) => (
            <div key={area.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{area.title}</div>
                <div className="text-sm text-slate-500">{area.progress}% mastery</div>
              </div>
              <div className="text-sm text-slate-500">{area.description}</div>
              <Progress value={area.progress} className="h-2" />
              <div className="flex items-start gap-2 pt-2">
                <Lightbulb className="w-4 h-4 mt-0.5 text-slate-500" />
                <div className="flex-1 text-sm text-slate-500">{area.recommendation}</div>
              </div>
              <Button variant="link" size="sm" className="p-0 h-auto">
                Start focused session <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
