import { ImageAnalyzer } from "@/components/image/image-analyzer"

export default function ImageAnalysisPage() {
  return (
    <div className="container mx-auto py-8 pb-20 md:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Image Analysis</h1>
        <p className="text-slate-500">Upload images and get AI-powered analysis and insights</p>
      </div>
      <ImageAnalyzer />
    </div>
  )
}
