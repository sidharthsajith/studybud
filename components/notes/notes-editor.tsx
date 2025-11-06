"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Sparkles, Plus, Trash2, FileText, Copy } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Note {
  id: string
  title: string
  content: string
  summary?: string
  createdAt: string
  updatedAt: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

export function NotesEditor() {
  const { toast } = useToast()
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])

  // Load notes from sessionStorage
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("studybud-notes")
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes)
        setNotes(Array.isArray(parsedNotes) ? parsedNotes : [])
        if (Array.isArray(parsedNotes) && parsedNotes.length > 0) {
          selectNote(parsedNotes[0])
        }
      } catch (error) {
        console.error("Error loading notes:", error)
        // Initialize with empty array if there's an error
        setNotes([])
      }
    }
  }, [])

  // Save notes to session storage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      sessionStorage.setItem("studybud-notes", JSON.stringify(notes));
    }
  }, [notes])

  const selectNote = (note: Note) => {
    setCurrentNote(note)
    setTitle(note.title)
    setContent(note.content)
    setSummary(note.summary || "")
  }

  const createNewNote = () => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      summary: "",
      createdAt: now,
      updatedAt: now,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    selectNote(newNote);
  }

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please enter both title and content",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const now = new Date().toISOString()
      
      if (currentNote) {
        // Update existing note
        const updatedNote = {
          ...currentNote,
          title,
          content,
          summary: summary || currentNote.summary,
          updatedAt: now,
        }
        
        const updatedNotes = notes.map(note => 
          note.id === currentNote.id ? updatedNote : note
        )
        
        setNotes(updatedNotes)
        setCurrentNote(updatedNote)
        
        // Save to localStorage
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        
        toast({
          title: "Success",
          description: "Note updated successfully",
        })
      } else {
        // Create new note
        const newNote = {
          id: Date.now().toString(),
          title,
          content,
          summary,
          createdAt: now,
          updatedAt: now,
        }
        
        const updatedNotes = [...notes, newNote]
        setNotes(updatedNotes)
        setCurrentNote(newNote)
        
        // Save to localStorage
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        
        toast({
          title: "Success",
          description: "Note created successfully",
        })
      }
    } catch (error) {
      console.error('Error saving note:', error)
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (noteId: string) => {
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
      // Use client-side summarization
      const summaryText = await import('@/lib/summarize').then(module => 
        module.summarizeContent(content, title)
      )
      
      setSummary(summaryText)

      // Update current note with the new summary
      if (currentNote) {
        const updatedNote = {
          ...currentNote,
          summary: summaryText,
          updatedAt: new Date().toISOString(),
        }
        const updatedNotes = notes.map((note) => 
          note.id === currentNote.id ? updatedNote : note
        )
        setNotes(updatedNotes)
        setCurrentNote(updatedNote)
      }

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to your clipboard",
      })
    } catch (error) {
      console.error("Failed to copy:", error)
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }


  const handleGenerateQuiz = async () => {
    console.log("Generating quiz for content:", content);

    setIsGenerating(true)
    try {
      const baseUrl = window.location.origin;
      const response = await fetch(`${baseUrl}/api/generate-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate quiz")
      }

      const data = await response.json();
      console.log("Received quiz data:", data);
      setQuiz(data.quiz);


      toast({
        title: "Quiz generated",
        description: "Your quiz has been generated successfully",
      })
    } catch (error: any) {
      console.error("Error generating quiz:", error)
      toast({
        title: "Quiz generation failed",
        description: error.message || "Failed to generate quiz",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
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
                      <p className="text-xs text-slate-500 truncate mt-1">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-400 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Note Editor */}
      <div className="lg:col-span-3 space-y-4">
        {currentNote ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Note</h2>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={summarizeNote}
                  variant="outline"
                  size="sm"
                  disabled={!content.trim() || summarizing}
                >
                  {summarizing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Summarize with AI
                </Button>
                <Button onClick={saveNote} disabled={!currentNote || loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save
                </Button>
                
              </div>
            </div>

            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />

            <Textarea
              placeholder="Start writing your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px]"
            />

            {summary && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">AI Summary</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(summary)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="markdown">Markdown</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <div className="relative">
                                  <div className="absolute right-2 top-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs opacity-70 hover:opacity-100"
                                      onClick={() => copyToClipboard(String(children))}
                                    >
                                      <Copy className="w-3 h-3 mr-1" />
                                      Copy
                                    </Button>
                                  </div>
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              )
                            },
                          }}
                        >
                          {summary}
                        </ReactMarkdown>
                      </div>
                    </TabsContent>
                    <TabsContent value="markdown" className="mt-4">
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-2 z-10"
                          onClick={() => copyToClipboard(summary)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Markdown
                        </Button>
                        <pre className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md overflow-auto max-h-[500px]">
                          <code className="text-sm">{summary}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700">
            <FileText className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No note selected</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Select a note or create a new one to get started
            </p>
            <Button onClick={createNewNote}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Note
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
