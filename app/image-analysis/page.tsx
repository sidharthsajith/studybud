import { ImageAnalyzer } from "@/components/image/image-analyzer"

export default function ImageAnalysisPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Image Analysis</h1>
      <p className="mb-8 text-slate-600">
        Upload an image or provide a URL to analyze it with AI. You can extract text, analyze study materials, or get
        help solving problems.
      </p>
      <ImageAnalyzer />
    </div>
  )
}
