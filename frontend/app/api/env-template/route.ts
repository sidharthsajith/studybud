import { NextResponse } from "next/server"

export async function GET() {
  const template = `# StudyBud API Configuration
API_BASE_URL=https://api.studybud.example.com

# Replace with your actual API base URL
# API_BASE_URL=https://your-studybud-api-url.com
`

  return new NextResponse(template, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
