"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Redo, Undo } from "lucide-react"

export function WriteEditor() {
  const [content, setContent] = useState(
    `# Climate Change: Global Challenges and Solutions

## Introduction

Climate change represents one of the most significant challenges facing humanity in the 21st century. The scientific consensus is clear: human activities, particularly the burning of fossil fuels and deforestation, have led to an unprecedented increase in greenhouse gas concentrations in the atmosphere. This essay examines the causes and effects of climate change, as well as potential solutions to mitigate its impact.

## Causes of Climate Change

The primary driver of current climate change is the enhanced greenhouse effect resulting from human activities. The main contributors include:

1. **Fossil Fuel Combustion**: The burning of coal, oil, and natural gas for electricity, heating, and transportation releases significant amounts of carbon dioxide (CO₂).

2. **Deforestation**: Forests act as carbon sinks, absorbing CO₂ from the atmosphere. When forests are cleared, this carbon is released, and the capacity to absorb future emissions is reduced.

3. **Industrial Processes**: Various industrial activities, including cement production and chemical manufacturing, release greenhouse gases.

4. **Agriculture**: Livestock production, rice cultivation, and the use of nitrogen-based fertilizers release methane (CH₄) and nitrous oxide (N₂O), both potent greenhouse gases.

## Effects of Climate Change

The consequences of climate change are far-reaching and increasingly severe:`,
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <Button variant="ghost" size="sm">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Redo className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
        <Button variant="ghost" size="sm">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
        <Button variant="ghost" size="sm">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[500px] font-mono text-sm resize-none border-slate-200 dark:border-slate-800"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <div>Word count: 234</div>
        <div>Last saved: 2 minutes ago</div>
      </div>
    </div>
  )
}
