"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Sparkles, Plus, Trash2, FileText } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  summary?: string
  createdAt: string
  updatedAt: string
}

export function NotesEditor() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState(false)
  const { toast } = useToast()

  // Load notes from session storage on component mount
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("studybud-notes")
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes)
        setNotes(parsedNotes)
        if (parsedNotes.length > 0) {
          selectNote(parsedNotes[0])
        }
      } catch (error) {
        console.error("Error loading notes:", error)
      }
    }
  }, [])

  // Save notes to session storage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      sessionStorage.setItem("studybud-notes", JSON.stringify(notes))
    }
  }, [notes])

  const selectNote = (note: Note) => {
    setCurrentNote(note)
    setTitle(note.title)
    setContent(note.content)
    setSummary(note.summary || "")
  }

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    selectNote(newNote)
  }

  const saveNote = () => {
    if (!currentNote) return

    setLoading(true)
    try {
      const updatedNote: Note = {
        ...currentNote,
        title: title || "Untitled Note",
        content,
        summary,
        updatedAt: new Date().toISOString(),
      }

      const updatedNotes = notes.map((note) => (note.id === currentNote.id ? updatedNote : note))
      setNotes(updatedNotes)
      setCurrentNote(updatedNote)

      toast({
        title: "Note saved",
        description: "Your note has been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error saving note",
        description: "Failed to save your note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    setNotes(updatedNotes)

    if (currentNote?.id === noteId) {
      if (updatedNotes.length > 0) {
        selectNote(updatedNotes[0])
      } else {
        setCurrentNote(null)
        setTitle("")
        setContent("")
        setSummary("")
      }
    }

    toast({
      title: "Note deleted",
      description: "Your note has been deleted",
    })
  }

  const summarizeNote = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to summarize",
        description: "Please write some content before summarizing",
        variant: "destructive",
      })
      return
    }

    setSummarizing(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          title: title,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to summarize note")
      }

      const data = await response.json()
      setSummary(data.summary)

      toast({
        title: "Summary generated",
        description: "Your note has been summarized successfully",
      })
    } catch (error: any) {
      console.error("Error summarizing note:", error)
      toast({
        title: "Summarization failed",
        description: error.message || "Failed to summarize note",
        variant: "destructive",
      })
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Notes List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Notes</CardTitle>
              <Button onClick={createNewNote} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No notes yet. Create your first note!</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    currentNote?.id === note.id
                      ? "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => selectNote(note)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{note.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{new Date(note.updatedAt).toLocaleDateString()}</p>
                      {note.content && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{note.content.slice(0, 50)}...</p>
                      )}
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                      size="sm"
                      variant="ghost"
                      className="ml-2 h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Note Editor */}
      <div className="lg:col-span-3">
        {currentNote ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Note title..."
                      className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={summarizeNote} disabled={summarizing} variant="outline">
                      {summarizing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Summarize
                    </Button>
                    <Button onClick={saveNote} disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your notes here..."
                  className="min-h-[400px] resize-none border-slate-200 dark:border-slate-800"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <div>Words: {content.split(/\s+/).filter(Boolean).length}</div>
                  <div>Characters: {content.length}</div>
                </div>
              </CardContent>
            </Card>

            {summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Summary</CardTitle>
                  <CardDescription>Generated summary of your notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-4">
                    <pre className="whitespace-pre-wrap text-sm">{summary}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No note selected</h3>
                <p className="text-slate-500 mb-4">Select a note from the sidebar or create a new one to get started</p>
                <Button onClick={createNewNote}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Note
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
