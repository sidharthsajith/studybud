import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mic, Calendar, Clock, Tag, MoreHorizontal } from "lucide-react"

// Sample data for voice recordings
const recordings = [
  {
    id: 1,
    title: "Physics Lecture: Quantum Mechanics",
    date: "May 19, 2025",
    duration: "45:12",
    tags: ["physics", "lecture", "quantum"],
  },
  {
    id: 2,
    title: "Research Ideas for AI Ethics Paper",
    date: "May 18, 2025",
    duration: "12:34",
    tags: ["research", "ai ethics", "brainstorm"],
  },
  {
    id: 3,
    title: "Japanese Pronunciation Practice",
    date: "May 17, 2025",
    duration: "08:45",
    tags: ["japanese", "language", "practice"],
  },
  {
    id: 4,
    title: "Meeting with Study Group",
    date: "May 15, 2025",
    duration: "32:18",
    tags: ["meeting", "group", "discussion"],
  },
  {
    id: 5,
    title: "Chemistry Lab Notes",
    date: "May 14, 2025",
    duration: "15:22",
    tags: ["chemistry", "lab", "notes"],
  },
]

export function VoiceLibrary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Voice Recording Library</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search recordings..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all">All Recordings</TabsTrigger>
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {recordings.map((recording) => (
                <RecordingCard key={recording.id} recording={recording} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lectures" className="mt-4">
            <div className="space-y-4">
              {recordings
                .filter((r) => r.tags.includes("lecture"))
                .map((recording) => (
                  <RecordingCard key={recording.id} recording={recording} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="space-y-4">
              {recordings
                .filter((r) => r.tags.includes("notes"))
                .map((recording) => (
                  <RecordingCard key={recording.id} recording={recording} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="practice" className="mt-4">
            <div className="space-y-4">
              {recordings
                .filter((r) => r.tags.includes("practice"))
                .map((recording) => (
                  <RecordingCard key={recording.id} recording={recording} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface RecordingCardProps {
  recording: {
    id: number
    title: string
    date: string
    duration: string
    tags: string[]
  }
}

function RecordingCard({ recording }: RecordingCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{recording.title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {recording.date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {recording.duration}
          </div>
          <div className="flex items-center">
            <Mic className="mr-1 h-4 w-4" />
            Audio
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {recording.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            Play
          </Button>
          <Button size="sm" className="flex-1">
            View Transcript
          </Button>
        </div>
      </div>
    </Card>
  )
}
