"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Copy, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SetupGuide() {
  const [copied, setCopied] = useState(false)

  const copyEnvTemplate = async () => {
    try {
      const response = await fetch("/api/env-template")
      const template = await response.text()
      await navigator.clipboard.writeText(template)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy template:", error)
    }
  }

  const downloadEnvTemplate = async () => {
    try {
      const response = await fetch("/api/env-template")
      const template = await response.text()

      const element = document.createElement("a")
      const file = new Blob([template], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = ".env.local"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error("Failed to download template:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Setup Guide</CardTitle>
        <CardDescription>Configure StudyBud to connect to the API</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local">
          <TabsList className="mb-4">
            <TabsTrigger value="local">Local Development</TabsTrigger>
            <TabsTrigger value="vercel">Vercel Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="local">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Environment Setup</AlertTitle>
                <AlertDescription>
                  Create a <code className="rounded bg-muted px-1 py-0.5">.env.local</code> file in your project root
                  with the following content:
                </AlertDescription>
              </Alert>

              <div className="relative rounded-md bg-muted p-4">
                <pre className="text-sm">
                  <code>
                    # StudyBud API Configuration{"\n"}
                    API_BASE_URL=https://api.studybud.example.com{"\n\n"}# Replace with your actual API base URL{"\n"}#
                    API_BASE_URL=https://your-studybud-api-url.com
                  </code>
                </pre>
                <Button size="sm" variant="ghost" className="absolute right-2 top-2" onClick={copyEnvTemplate}>
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyEnvTemplate} variant="outline" className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Template"}
                </Button>
                <Button onClick={downloadEnvTemplate} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download .env.local
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vercel">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Vercel Environment Variables</AlertTitle>
                <AlertDescription>
                  Add the following environment variable to your Vercel project settings:
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 rounded-md border p-2">
                  <div className="font-medium">Name</div>
                  <div className="font-medium">Value</div>
                  <div>API_BASE_URL</div>
                  <div>https://your-studybud-api-url.com</div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Go to your Vercel project dashboard, navigate to Settings → Environment Variables, and add the
                  variable above.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          After setting up, restart your development server or redeploy your application.
        </p>
      </CardFooter>
    </Card>
  )
}
