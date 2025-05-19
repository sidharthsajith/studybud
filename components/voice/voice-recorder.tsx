"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Square, Loader2, Save, Trash } from "lucide-react"
import { transcribeAudio } from "@/lib/voice-service"
import { useToast } from "@/hooks/use-toast"

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [transcription, setTranscription] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      audioChunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioUrl(audioUrl)

        // Auto-transcribe if less than 5 minutes
        if (recordingTime < 300) {
          handleTranscribe(audioBlob)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error starting recording:", error)
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleTranscribe = async (blob: Blob = audioBlob!) => {
    if (!blob) return

    try {
      setIsTranscribing(true)
      const result = await transcribeAudio(blob)
      setTranscription(result.text)

      // Auto-generate title if empty
      if (!title && result.text) {
        const autoTitle = result.text.split(".")[0].substring(0, 50) + (result.text.length > 50 ? "..." : "")
        setTitle(autoTitle)
      }

      toast({
        title: "Transcription Complete",
        description: "Your audio has been transcribed successfully.",
      })
    } catch (error) {
      console.error("Transcription error:", error)
      toast({
        title: "Transcription Failed",
        description: "There was an error transcribing your audio.",
        variant: "destructive",
      })
    } finally {
      setIsTranscribing(false)
    }
  }

  const handleSave = async () => {
    if (!audioBlob || !title) return

    try {
      setIsSaving(true)

      // In a real app, you would upload to a server here
      // For now, we'll simulate saving with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Recording Saved",
        description: "Your voice note has been saved successfully.",
      })

      // Reset the form
      setAudioBlob(null)
      setAudioUrl(null)
      setTitle("")
      setTranscription("")
      setRecordingTime(0)
    } catch (error) {
      console.error("Error saving recording:", error)
      toast({
        title: "Save Failed",
        description: "There was an error saving your recording.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDiscard = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setTitle("")
    setTranscription("")
    setRecordingTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Voice Recorder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
            {isRecording ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center animate-pulse">
                  <Mic className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
                <div className="text-sm text-slate-500 mt-1">Recording in progress...</div>
              </div>
            ) : audioUrl ? (
              <div className="w-full space-y-4">
                <audio ref={audioRef} src={audioUrl} controls className="w-full" />
                <div className="text-sm text-slate-500 text-center">Recording length: {formatTime(recordingTime)}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Mic className="w-8 h-8 text-slate-500" />
                </div>
                <div className="text-sm text-center text-slate-500">Click the button below to start recording</div>
              </div>
            )}
          </div>

          {isRecording ? (
            <Button variant="destructive" className="w-full" onClick={stopRecording}>
              <Square className="w-4 h-4 mr-2" /> Stop Recording
            </Button>
          ) : audioBlob ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your recording"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleDiscard}>
                  <Trash className="w-4 h-4 mr-2" /> Discard
                </Button>
                <Button className="flex-1" onClick={handleSave} disabled={!title || isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save Recording
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={startRecording}>
              <Mic className="w-4 h-4 mr-2" /> Start Recording
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transcription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isTranscribing ? (
            <div className="flex flex-col items-center justify-center p-6 h-64">
              <Loader2 className="w-8 h-8 mb-4 animate-spin text-slate-500" />
              <div className="text-sm text-slate-500">Transcribing your audio...</div>
            </div>
          ) : transcription ? (
            <Textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-[250px] resize-none"
            />
          ) : audioBlob ? (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800 h-64">
              <Button variant="outline" onClick={() => handleTranscribe()} disabled={isTranscribing}>
                {isTranscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transcribing...
                  </>
                ) : (
                  <>Transcribe Recording</>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800 h-64">
              <div className="text-sm text-center text-slate-500">Record audio to generate a transcription</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-slate-500">
          Transcriptions are automatically generated for recordings under 5 minutes.
        </CardFooter>
      </Card>
    </div>
  )
}
