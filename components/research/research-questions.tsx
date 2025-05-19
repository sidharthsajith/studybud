import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Plus, Star } from "lucide-react"

export function ResearchQuestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generated">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generated">AI-Generated</TabsTrigger>
            <TabsTrigger value="saved">Saved Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="generated" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Based on your research on AI Ethics in Healthcare</div>
              <Button size="sm">
                <Brain className="w-4 h-4 mr-2" /> Generate More
              </Button>
            </div>

            <ResearchQuestionCard
              question="How do healthcare professionals' perceptions of AI ethics differ from those of patients and the general public?"
              relevance={85}
              literature="Moderate coverage"
              methodology="Qualitative interviews, surveys"
              tags={["perception", "stakeholders", "qualitative"]}
            />

            <ResearchQuestionCard
              question="What governance mechanisms are most effective at ensuring algorithmic fairness in clinical decision support systems?"
              relevance={92}
              literature="Limited coverage"
              methodology="Comparative case studies, policy analysis"
              tags={["governance", "fairness", "policy"]}
            />

            <ResearchQuestionCard
              question="How does the implementation of explainable AI affect clinical workflow and decision-making processes?"
              relevance={78}
              literature="Growing interest"
              methodology="Mixed methods, observational studies"
              tags={["explainability", "clinical workflow", "decision-making"]}
            />

            <ResearchQuestionCard
              question="What are the long-term implications of AI-driven healthcare for patient-provider relationships and medical professionalism?"
              relevance={81}
              literature="Emerging area"
              methodology="Longitudinal studies, theoretical analysis"
              tags={["relationships", "professionalism", "long-term"]}
            />

            <ResearchQuestionCard
              question="How can privacy-preserving techniques be balanced with the need for diverse, representative training data in healthcare AI?"
              relevance={89}
              literature="Active research area"
              methodology="Technical experiments, ethical analysis"
              tags={["privacy", "training data", "technical"]}
            />
          </TabsContent>
          <TabsContent value="saved" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Your saved research questions</div>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Question
              </Button>
            </div>

            <Card className="border border-slate-200 dark:border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="font-medium">
                      What governance mechanisms are most effective at ensuring algorithmic fairness in clinical
                      decision support systems?
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">governance</Badge>
                      <Badge variant="outline">fairness</Badge>
                      <Badge variant="outline">policy</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="outline" size="sm">
                    <FileText className="w-3.5 h-3.5 mr-1" /> View Notes
                  </Button>
                  <div className="text-xs text-slate-500">Added: May 15, 2025</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="font-medium">
                      How can privacy-preserving techniques be balanced with the need for diverse, representative
                      training data in healthcare AI?
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">privacy</Badge>
                      <Badge variant="outline">training data</Badge>
                      <Badge variant="outline">technical</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="outline" size="sm">
                    <FileText className="w-3.5 h-3.5 mr-1" /> View Notes
                  </Button>
                  <div className="text-xs text-slate-500">Added: May 17, 2025</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ResearchQuestionCardProps {
  question: string
  relevance: number
  literature: string
  methodology: string
  tags: string[]
}

function ResearchQuestionCard({ question, relevance, literature, methodology, tags }: ResearchQuestionCardProps) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="font-medium">{question}</div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="text-sm font-medium">{relevance}%</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs text-slate-500">Literature Coverage</div>
            <div className="text-sm">{literature}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Suggested Methodology</div>
            <div className="text-sm">{methodology}</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" /> Save Question
          </Button>
          <Button variant="ghost" size="sm">
            <Star className="w-3.5 h-3.5 mr-1" /> Prioritize
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
