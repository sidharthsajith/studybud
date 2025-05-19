import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Search } from "lucide-react"

export function WriteCitations() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          type="search"
          placeholder="Search for sources..."
          className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Current Citations</div>
        <Button size="sm" variant="ghost">
          <Plus className="w-3.5 h-3.5 mr-1" /> Add New
        </Button>
      </div>

      <div className="space-y-3">
        <CitationCard
          title="IPCC, 2021: Climate Change 2021: The Physical Science Basis"
          authors="Masson-Delmotte, V., P. Zhai, A. Pirani, S.L. Connors, et al."
          publisher="Cambridge University Press"
          year="2021"
        />

        <CitationCard
          title="Global Warming of 1.5°C"
          authors="IPCC"
          publisher="Intergovernmental Panel on Climate Change"
          year="2018"
        />

        <CitationCard
          title="Climate Change: Evidence and Causes"
          authors="National Academy of Sciences and The Royal Society"
          publisher="The National Academies Press"
          year="2020"
        />
      </div>

      <div className="text-sm font-medium mt-6">Suggested Sources</div>

      <div className="space-y-3">
        <CitationCard
          title="State of the Climate 2022"
          authors="National Oceanic and Atmospheric Administration"
          publisher="NOAA"
          year="2022"
          suggested
        />

        <CitationCard
          title="Renewable Energy Sources and Climate Change Mitigation"
          authors="IPCC Working Group III"
          publisher="Cambridge University Press"
          year="2011"
          suggested
        />
      </div>
    </div>
  )
}

interface CitationCardProps {
  title: string
  authors: string
  publisher: string
  year: string
  suggested?: boolean
}

function CitationCard({ title, authors, publisher, year, suggested = false }: CitationCardProps) {
  return (
    <Card className={suggested ? "border-dashed border-slate-300 dark:border-slate-700" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 mt-0.5 text-slate-500" />
          <div className="space-y-1 flex-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-slate-500">{authors}</div>
            <div className="text-xs text-slate-400">
              {publisher}, {year}
            </div>

            <div className="flex gap-2 mt-2">
              {suggested ? (
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Add to Citations
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Insert Citation
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
