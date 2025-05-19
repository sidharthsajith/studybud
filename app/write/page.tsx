import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Lightbulb, Save, Send } from "lucide-react"
import { WriteEditor } from "@/components/write/write-editor"
import { WriteSuggestions } from "@/components/write/write-suggestions"
import { WriteCitations } from "@/components/write/write-citations"

export default function WritePage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Write Mode</h1>
        <p className="text-slate-500 dark:text-slate-400">Create and enhance your writing with AI assistance</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle>Document Editor</CardTitle>
                <CardDescription>Climate Change Essay</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button size="sm">
                  <Send className="w-4 h-4 mr-2" /> Submit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <WriteEditor />
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="suggestions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">
                <Lightbulb className="w-4 h-4 mr-2" /> Suggestions
              </TabsTrigger>
              <TabsTrigger value="citations">
                <FileText className="w-4 h-4 mr-2" /> Citations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions" className="mt-4">
              <WriteSuggestions />
            </TabsContent>
            <TabsContent value="citations" className="mt-4">
              <WriteCitations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
