'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { enhanceAssignment } from '../lib/assignment-client'
import { EnhancerAssignmentResponse } from '../types/assignment'

export function AssignmentEnhance() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<EnhancerAssignmentResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please enter your assignment text')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await enhanceAssignment(text)
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enhance assignment')
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
            {loading ? 'Analyzing...' : 'Enhance Assignment'}
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>
      </Card>

      {result && (
        <Card className="p-6 space-y-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-primary">Clarity</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {result.clarity.map((tip, index) => (
                <li key={index} className="text-muted-foreground">{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Structure</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.structure.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-primary">Writing Style</h3>
            <p className="text-sm text-muted-foreground">{result.writing_style}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Vocabulary</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.vocabulary.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Grammar</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.grammar.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Coherence</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.coherence.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Logical Flow</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.logical_flow.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Readability</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.readability.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Overall Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {result.overall.map((tip, index) => (
                <li key={index} className="text-muted-foreground">{tip}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  )
}