import { MainLayout } from "@/components/main-layout"
import { SetupGuide } from "@/components/setup-guide"

export default function SetupPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">API Setup</h1>
          <p className="text-muted-foreground">Configure StudyBud to connect to the API endpoints</p>
        </div>

        <SetupGuide />
      </div>
    </MainLayout>
  )
}
