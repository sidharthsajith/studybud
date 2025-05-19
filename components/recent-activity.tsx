import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, FileText, MessageSquare, Mic } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Completed Physics Quiz",
    description: "Scored 85% on Quantum Mechanics",
    time: "2 hours ago",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Added Research Notes",
    description: "Updated literature review on AI Ethics",
    time: "Yesterday",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "Voice Session",
    description: "Practiced Japanese pronunciation",
    time: "Yesterday",
    icon: <Mic className="w-4 h-4" />,
  },
  {
    id: 4,
    title: "Essay Draft",
    description: "Wrote 1,200 words on Climate Change",
    time: "2 days ago",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 5,
    title: "Community Discussion",
    description: "Participated in Data Science forum",
    time: "3 days ago",
    icon: <MessageSquare className="w-4 h-4" />,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your learning activities from the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                {activity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-medium">{activity.title}</div>
                <div className="text-sm text-slate-500">{activity.description}</div>
                <div className="text-xs text-slate-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
