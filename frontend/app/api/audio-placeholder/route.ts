import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message:
      "This is a placeholder for the NYC ambient sounds audio file. In a real application, you would place an MP3 file at /public/sounds/nyc-ambient.mp3",
  })
}
