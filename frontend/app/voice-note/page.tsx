"use client"
import { MainLayout } from "@/components/main-layout"
import { VoiceNoteCapture } from "@/components/voice-note"

export default function VoiceNotePage() {
  return (
    <div className="container py-6">
    <MainLayout>
    <VoiceNoteCapture />
    </MainLayout>

    </div>
  )
}
