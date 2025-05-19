import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceRecorder } from "@/components/voice/voice-recorder"
import { VoiceLibrary } from "@/components/voice/voice-library"
import { VoiceAnalysis } from "@/components/voice/voice-analysis"
import { Mic, Library, BarChart3 } from "lucide-react"

export default function VoicePage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Voice Tools</h1>
        <p className="text-slate-500 dark:text-slate-400">Record, transcribe, and analyze audio content</p>
      </div>

      <Tabs defaultValue="record">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="record">
            <Mic className="w-4 h-4 mr-2" /> Record
          </TabsTrigger>
          <TabsTrigger value="library">
            <Library className="w-4 h-4 mr-2" /> Library
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <BarChart3 className="w-4 h-4 mr-2" /> Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="record" className="mt-4">
          <VoiceRecorder />
        </TabsContent>
        <TabsContent value="library" className="mt-4">
          <VoiceLibrary />
        </TabsContent>
        <TabsContent value="analysis" className="mt-4">
          <VoiceAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
