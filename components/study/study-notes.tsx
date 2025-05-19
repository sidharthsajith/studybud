import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search } from "lucide-react"

export function StudyNotes() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Smart Notes</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="pl-8 w-[200px] bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> New Note
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="all">All Notes</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <NoteCard
                  title="Electromagnetic Fields"
                  preview="Maxwell's equations describe how electric and magnetic fields are generated and altered by each other and by charges and currents..."
                  date="May 18, 2025"
                  tags={["physics", "electromagnetism"]}
                />
                <NoteCard
                  title="Faraday's Law of Induction"
                  preview="The law states that the induced electromotive force in a closed circuit is equal to the negative of the time rate of change of magnetic flux through the circuit..."
                  date="May 17, 2025"
                  tags={["physics", "induction"]}
                />
                <NoteCard
                  title="Quantum Mechanics Principles"
                  preview="The uncertainty principle states that the more precisely the position of a particle is determined, the less precisely its momentum can be predicted..."
                  date="May 15, 2025"
                  tags={["physics", "quantum"]}
                />
                <NoteCard
                  title="Circuit Theory Basics"
                  preview="Kirchhoff's laws are fundamental for analyzing electrical circuits. The current law states that the algebraic sum of currents in a network of conductors meeting at a point is zero..."
                  date="May 12, 2025"
                  tags={["physics", "circuits"]}
                />
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <NoteCard
                  title="Electromagnetic Fields"
                  preview="Maxwell's equations describe how electric and magnetic fields are generated and altered by each other and by charges and currents..."
                  date="May 18, 2025"
                  tags={["physics", "electromagnetism"]}
                />
                <NoteCard
                  title="Faraday's Law of Induction"
                  preview="The law states that the induced electromotive force in a closed circuit is equal to the negative of the time rate of change of magnetic flux through the circuit..."
                  date="May 17, 2025"
                  tags={["physics", "induction"]}
                />
              </div>
            </TabsContent>
            <TabsContent value="important" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <NoteCard
                  title="Electromagnetic Fields"
                  preview="Maxwell's equations describe how electric and magnetic fields are generated and altered by each other and by charges and currents..."
                  date="May 18, 2025"
                  tags={["physics", "electromagnetism"]}
                />
                <NoteCard
                  title="Quantum Mechanics Principles"
                  preview="The uncertainty principle states that the more precisely the position of a particle is determined, the less precisely its momentum can be predicted..."
                  date="May 15, 2025"
                  tags={["physics", "quantum"]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

interface NoteCardProps {
  title: string
  preview: string
  date: string
  tags: string[]
}

function NoteCard({ title, preview, date, tags }: NoteCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{title}</h3>
          <FileText className="w-4 h-4 text-slate-500" />
        </div>
        <p className="text-sm text-slate-500 line-clamp-3">{preview}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-slate-400">{date}</div>
          <div className="flex gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
