"use client"

import React, { useState, useRef, useEffect } from "react"
import { Mic, StopCircle, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"

type TranscriptionResult = {
  text: string
  segments: Array<{ text: string; start: number; end: number }>
  words: Array<{ text: string; start: number; end: number }>
}

type KeyPointsResult = {
  key_points: string[]
  summary: string
}

export function VoiceNoteCapture() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null)
  const [keyPoints, setKeyPoints] = useState<KeyPointsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
      }
      
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      setError("Could not access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const handleTranscribe = async () => {
    if (!audioBlob) return
    
    setLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append("file", audioBlob, "recording.wav")
      
      const response = await fetch("http://localhost:8000/transcribe-audio", {
        method: "POST",
        body: formData
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setTranscription(result)
      

    } catch (err) {
      console.error("Error processing audio:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Voice Note Capture</h1>
        <p className="text-muted-foreground">
          Record lectures or thoughts with automatic transcription and key point extraction
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audio Recording</CardTitle>
          <CardDescription>
            {isRecording 
              ? "Recording in progress..." 
              : "Click the microphone button to start recording"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Button 
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
            >
              {isRecording ? (
                <StopCircle className="mr-2 h-5 w-5" />
              ) : (
                <Mic className="mr-2 h-5 w-5" />
              )}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            
            {audioBlob && !isRecording && (
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleTranscribe}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="mr-2 h-5 w-5" />
                )}
                {loading ? "Processing..." : "Transcribe"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {transcription && (
        <Card>
          <CardHeader>
            <CardTitle>Transcription Results</CardTitle>
            <CardDescription>The transcribed text from your audio recording</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[200px]" 
              value={transcription.text} 
              readOnly 
            />
          </CardContent>
        </Card>
      )}

      {keyPoints && (
        <Card>
          <CardHeader>
            <CardTitle>Key Points</CardTitle>
            <CardDescription>Important concepts extracted from your audio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Summary</h3>
              <p className="text-sm text-muted-foreground">{keyPoints.summary}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Key Points</h3>
              <ul className="list-inside list-disc space-y-1">
                {keyPoints.key_points.map((point, index) => (
                  <li key={index} className="text-sm">{point}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}