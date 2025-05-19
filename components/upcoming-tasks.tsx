import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Calendar, FileText } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Physics Quiz",
    description: "Chapter 7: Electromagnetism",
    dueDate: "May 21, 2025",
    priority: "High",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Research Paper Draft",
    description: "First draft of AI Ethics paper",
    dueDate: "May 25, 2025",
    priority: "Medium",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "Essay Submission",
    description: "Final version of Climate Change essay",
    dueDate: "May 30, 2025",
    priority: "High",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 4,
    title: "Study Group Meeting",
    description: "Web Development project discussion",
    dueDate: "June 2, 2025",
    priority: "Low",
    icon: <Calendar className="w-4 h-4" />,
  },
]

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Deadlines and scheduled activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                {task.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{task.title}</div>
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="text-sm text-slate-500">{task.description}</div>
                <div className="text-xs text-slate-400">Due: {task.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
