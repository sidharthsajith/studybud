'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { getAssignmentHelp } from '../lib/assignment-client'
import { AssignmentHelperResponse } from '../types/assignment'

export function AssignmentHelp() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AssignmentHelperResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please enter your assignment text')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await getAssignmentHelp(text)
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get assignment help')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm font-medium">
              Assignment Text
            </label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your assignment text here..."
              className="min-h-[200px]"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Get Help'}
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>
      </Card>

      {result && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Title</h3>
            <p>{result.title}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Points</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}