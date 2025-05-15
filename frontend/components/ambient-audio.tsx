"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/sounds/nyc-ambient.mp3")
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
    } else {
      // Some browsers require user interaction before playing audio
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback failed:", error)
        })
      }
    }
    setPlaying(!playing)
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        {showVolume && (
          <div className="flex w-24 items-center rounded-full bg-background p-2 shadow-md">
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="mr-2"
            />
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background shadow-md"
              onClick={togglePlay}
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{playing ? "Mute NYC Ambient Sounds" : "Play NYC Ambient Sounds"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
