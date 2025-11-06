"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ImageAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("analyze")
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      // Check file size - limit to 5MB to avoid issues with data URLs
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      // Clear previous results and errors
      setResult("")
      setImageUrl("")
      setError(null)
    }
  }

  // Convert file to data URL
  const getImageDataUrl = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Validate external URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const analyzeImage = async () => {
    setLoading(true)
    setResult("")
    setError(null)

    try {
      let url = imageUrl

      // If we have a file but no URL, convert the file to a data URL
      if (file && !url) {
        try {
          url = await getImageDataUrl(file)
          setImageUrl(url)
        } catch (e) {
          throw new Error("Failed to process the uploaded image. Please try a different image.")
        }
      }

      if (!url) {
        throw new Error("No image URL available for analysis")
      }

      // Dynamically import the client-side image analysis utility
      const { analyzeImage: analyzeImageWithOpenRouter } = await import('@/lib/image-utils')
      
      // Use client-side image analysis
      const analysisResult = await analyzeImageWithOpenRouter(url, {
        action: activeTab as any,
        prompt: prompt || undefined,
      })
      
      setResult(analysisResult)
    } catch (error: any) {
      console.error("Error:", error)
      const errorMessage = error.message || "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Analysis</CardTitle>
        <CardDescription>Upload an image to analyze with AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analyze">General Analysis</TabsTrigger>
            <TabsTrigger value="extract-text">Extract Text</TabsTrigger>
            <TabsTrigger value="analyze-study-material">Study Material</TabsTrigger>
            <TabsTrigger value="solve-problems">Solve Problems</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid w-full gap-2">
              <label htmlFor="image-upload" className="text-sm font-medium">
                Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
              />
              <p className="text-xs text-slate-500">Maximum file size: 5MB</p>
            </div>

            <div className="grid w-full gap-2">
              <label htmlFor="image-url" className="text-sm font-medium">
                Or Enter Image URL
              </label>
              <input
                id="image-url"
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  setFile(null) // Clear file if URL is entered
                }}
                placeholder="https://example.com/image.jpg"
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </div>

            {activeTab === "analyze" && (
              <div className="grid w-full gap-2">
                <label htmlFor="prompt" className="text-sm font-medium">
                  Custom Prompt (Optional)
                </label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to know about this image..."
                  className="min-h-[100px]"
                />
              </div>
            )}

            <Button onClick={analyzeImage} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {loading ? "Analyzing..." : "Analyze Image"}
            </Button>

            {file && (
              <div className="mt-4">
                <p className="text-sm text-slate-500">Preview:</p>
                <div className="mt-2 max-h-[300px] overflow-hidden rounded-md border border-slate-200">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt="Preview"
                    className="h-auto max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {imageUrl && !file && imageUrl.startsWith("http") && (
              <div className="mt-4">
                <p className="text-sm text-slate-500">Image:</p>
                <div className="mt-2 max-h-[300px] overflow-hidden rounded-md border border-slate-200">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Analysis"
                    className="h-auto max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {result && (
              <div className="mt-4">
                <p className="text-sm font-medium">Results:</p>
                <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-4">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
