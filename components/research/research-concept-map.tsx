import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut } from "lucide-react"

export function ResearchConceptMap() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Concept Map: AI Ethics in Healthcare</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] border rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 800 600" className="text-slate-800 dark:text-slate-200">
            {/* Main concept node */}
            <g>
              <circle
                cx="400"
                cy="300"
                r="50"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-2"
              />
              <text
                x="400"
                y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
              >
                AI Ethics in Healthcare
              </text>
            </g>

            {/* Primary branches */}
            {/* Privacy & Data Security */}
            <g>
              <line x1="400" y1="300" x2="200" y2="150" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
              <circle
                cx="200"
                cy="150"
                r="40"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-2"
              />
              <text
                x="200"
                y="150"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
              >
                Privacy & Data Security
              </text>

              {/* Sub-concepts */}
              <line x1="200" y1="150" x2="100" y2="100" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="100"
                cy="100"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Consent
              </text>

              <line x1="200" y1="150" x2="150" y2="50" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="150"
                cy="50"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="150" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Data Ownership
              </text>

              <line x1="200" y1="150" x2="250" y2="50" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="250"
                cy="50"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="250" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Security
              </text>
            </g>

            {/* Algorithmic Bias */}
            <g>
              <line x1="400" y1="300" x2="200" y2="400" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
              <circle
                cx="200"
                cy="400"
                r="40"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-2"
              />
              <text
                x="200"
                y="400"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
              >
                Algorithmic Bias
              </text>

              {/* Sub-concepts */}
              <line x1="200" y1="400" x2="100" y2="450" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="100"
                cy="450"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="100" y="450" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Fairness
              </text>

              <line x1="200" y1="400" x2="150" y2="500" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="150"
                cy="500"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="150" y="500" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Representation
              </text>

              <line x1="200" y1="400" x2="250" y2="500" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="250"
                cy="500"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="250" y="500" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Testing
              </text>
            </g>

            {/* Transparency */}
            <g>
              <line x1="400" y1="300" x2="600" y2="150" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
              <circle
                cx="600"
                cy="150"
                r="40"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-2"
              />
              <text
                x="600"
                y="150"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
              >
                Transparency
              </text>

              {/* Sub-concepts */}
              <line x1="600" y1="150" x2="700" y2="100" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="700"
                cy="100"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="700" y="100" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Explainability
              </text>

              <line x1="600" y1="150" x2="650" y2="50" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="650"
                cy="50"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="650" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Auditability
              </text>

              <line x1="600" y1="150" x2="550" y2="50" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="550"
                cy="50"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="550" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Documentation
              </text>
            </g>

            {/* Autonomy & Responsibility */}
            <g>
              <line x1="400" y1="300" x2="600" y2="400" className="stroke-slate-300 dark:stroke-slate-700 stroke-2" />
              <circle
                cx="600"
                cy="400"
                r="40"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-2"
              />
              <text
                x="600"
                y="400"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
              >
                Autonomy & Responsibility
              </text>

              {/* Sub-concepts */}
              <line x1="600" y1="400" x2="700" y2="450" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="700"
                cy="450"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="700" y="450" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Liability
              </text>

              <line x1="600" y1="400" x2="650" y2="500" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="650"
                cy="500"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="650" y="500" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Human Oversight
              </text>

              <line x1="600" y1="400" x2="550" y2="500" className="stroke-slate-300 dark:stroke-slate-700 stroke-1" />
              <circle
                cx="550"
                cy="500"
                r="30"
                className="fill-slate-50 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-1"
              />
              <text x="550" y="500" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-current">
                Patient Choice
              </text>
            </g>

            {/* Cross-connections */}
            <line
              x1="200"
              y1="150"
              x2="600"
              y2="150"
              className="stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            />
            <line
              x1="200"
              y1="400"
              x2="600"
              y2="400"
              className="stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            />
            <line
              x1="200"
              y1="150"
              x2="600"
              y2="400"
              className="stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            />
            <line
              x1="200"
              y1="400"
              x2="600"
              y2="150"
              className="stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
