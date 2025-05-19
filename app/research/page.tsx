import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, FileText, Search, Upload } from "lucide-react"
import { ResearchPaperAnalysis } from "@/components/research/research-paper-analysis"
import { ResearchConceptMap } from "@/components/research/research-concept-map"
import { ResearchQuestions } from "@/components/research/research-questions"

export default function ResearchPage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Research Mode</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Analyze papers, map concepts, and develop research questions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upload Research Paper</CardTitle>
            <CardDescription>Upload a PDF to analyze its content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
              <Upload className="w-10 h-10 mb-4 text-slate-400" />
              <p className="mb-2 text-sm text-center text-slate-500">
                Drag and drop a PDF file here, or click to browse
              </p>
              <Button>Select File</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Research Topic</CardTitle>
            <CardDescription>AI Ethics and Governance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Papers Analyzed</div>
                <div className="text-2xl font-bold">7</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Key Concepts Identified</div>
                <div className="text-2xl font-bold">23</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Research Questions</div>
                <div className="text-2xl font-bold">5</div>
              </div>
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" /> Find Related Papers
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Papers</CardTitle>
            <CardDescription>Recently analyzed research</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <div className="font-medium">Ethical Implications of AI in Healthcare</div>
                <div className="text-xs text-slate-500">Smith et al., 2024</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <div className="font-medium">Governance Frameworks for Generative AI</div>
                <div className="text-xs text-slate-500">Johnson & Lee, 2023</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <div className="font-medium">Bias Mitigation in Large Language Models</div>
                <div className="text-xs text-slate-500">Zhang et al., 2024</div>
              </div>
              <Button variant="link" className="w-full">
                View All Papers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analysis">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="analysis">
            <FileText className="w-4 h-4 mr-2" /> Paper Analysis
          </TabsTrigger>
          <TabsTrigger value="concepts">
            <Brain className="w-4 h-4 mr-2" /> Concept Map
          </TabsTrigger>
          <TabsTrigger value="questions">
            <Search className="w-4 h-4 mr-2" /> Research Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="mt-4">
          <ResearchPaperAnalysis />
        </TabsContent>
        <TabsContent value="concepts" className="mt-4">
          <ResearchConceptMap />
        </TabsContent>
        <TabsContent value="questions" className="mt-4">
          <ResearchQuestions />
        </TabsContent>
      </Tabs>
    </div>
  )
}
