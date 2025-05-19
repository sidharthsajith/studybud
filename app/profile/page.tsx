import { UserProfile } from "@/components/auth/user-profile"

export default function ProfilePage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
      </div>

      <UserProfile />
    </div>
  )
}
