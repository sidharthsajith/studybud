import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

// This is a server-side route that will handle file uploads
// It uses service_role key to bypass RLS policies
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer()

    // Use the admin client to bypass RLS
    const serviceClient = supabaseAdmin.storage.from("images")

    // Generate a unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `public/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

    // Upload the file
    const { error: uploadError, data } = await serviceClient.upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get the public URL
    const { data: urlData } = serviceClient.getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (error: any) {
    console.error("Server upload error:", error)
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 })
  }
}
