import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Lightbulb, Plus, RefreshCw } from "lucide-react"

export function WriteSuggestions() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
            <div className="space-y-2">
              <div className="font-medium">Content Suggestion</div>
              <p className="text-sm text-slate-500">
                Consider adding a section on rising sea levels and coastal flooding as a major effect of climate change.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Section
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
            <div className="space-y-2">
              <div className="font-medium">Style Improvement</div>
              <p className="text-sm text-slate-500">
                The introduction could be more engaging. Consider starting with a compelling statistic or real-world
                example of climate change impact.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8">
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Generate Examples
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
            <div className="space-y-2">
              <div className="font-medium">Missing Content</div>
              <p className="text-sm text-slate-500">
                Your essay mentions effects of climate change but doesn't fully explore potential solutions. Consider
                adding a section on renewable energy transitions and policy recommendations.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Solutions Section
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-0.5 text-amber-500" />
            <div className="space-y-2">
              <div className="font-medium">Citation Needed</div>
              <p className="text-sm text-slate-500">
                The statement about scientific consensus would be stronger with a citation from the IPCC or another
                authoritative source.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8">
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Find Sources
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Check className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
