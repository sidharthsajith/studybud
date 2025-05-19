import { AssignmentEnhance } from '@/components/assignment-enhance'

export default function EnhanceAssignmentPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assignment Enhancement</h1>
        <p className="text-muted-foreground mt-2">
          Get comprehensive feedback to improve your assignment
        </p>
      </div>
      <AssignmentEnhance />
    </div>
  )
}