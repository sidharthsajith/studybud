import { NotesEditor } from "@/components/notes/notes-editor"

export const metadata = {
  title: "Notes | StudyBud",
  description: "Write, organize, and summarize your notes",
}

export default function NotesPage() {
  return (
    <div className="container p-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <p className="text-slate-500">Write, organize, and summarize your notes with AI assistance</p>
      </div>
      <NotesEditor />
    </div>
  )
}
