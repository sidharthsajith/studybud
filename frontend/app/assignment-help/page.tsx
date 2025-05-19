import { AssignmentHelp } from '@/components/assignment-help'

export default function AssignmentHelpPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assignment Help</h1>
        <p className="text-muted-foreground mt-2">
          Get structured guidance and key points for your assignment
        </p>
      </div>
      <AssignmentHelp />
    </div>
  )
}