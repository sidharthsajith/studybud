import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">StudyBud</h1>
        <p className="text-slate-500 dark:text-slate-400">Your AI Learning Companion</p>
      </div>
      <AuthForm />
    </div>
  )
}
