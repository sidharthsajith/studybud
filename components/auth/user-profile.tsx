"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type Profile } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function UserProfile() {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Partial<Profile>>({
    username: "",
    full_name: "",
    avatar_url: "",
    language_level: {},
    study_preferences: {
      preferred_time: [],
      subjects: [],
      learning_style: [],
    },
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Check if profiles table exists
        try {
          // Fetch profile
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (error && error.code !== "PGRST116") {
            // If the error is not "not found", check if it's a missing table
            if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
              // Create the profiles table
              await createProfilesTable()

              // Create initial profile
              await createInitialProfile(user.id)
            } else {
              throw error
            }
          }

          if (data) {
            setProfile(data)
          }
        } catch (error: any) {
          console.error("Error fetching profile:", error)
          // If there's an error, we'll just use the default profile state
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const createProfilesTable = async () => {
    try {
      // This is a simplified approach - in production, you'd use migrations
      const { error } = await supabase.rpc("create_profiles_table")

      if (error) {
        console.error("Error creating profiles table:", error)
        // Fallback: we'll try to create the profile anyway
      }
    } catch (error) {
      console.error("Error creating profiles table:", error)
    }
  }

  const createInitialProfile = async (userId: string) => {
    try {
      // Try to create the initial profile
      const { error } = await supabase.from("profiles").insert({
        id: userId,
        username: "",
        full_name: "",
        avatar_url: "",
        language_level: {},
        study_preferences: {
          preferred_time: [],
          subjects: [],
          learning_style: [],
        },
      })

      if (error) {
        console.error("Error creating initial profile:", error)
      }
    } catch (error) {
      console.error("Error creating initial profile:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleProfileUpdate = async () => {
    if (!user) return

    setUpdating(true)

    try {
      // Check if avatars bucket exists and create it if not
      try {
        const { data: buckets } = await supabase.storage.getBuckets()
        if (!buckets?.find((b) => b.name === "avatars")) {
          await supabase.storage.createBucket("avatars", {
            public: true,
          })
        }
      } catch (error) {
        console.error("Error checking/creating avatars bucket:", error)
      }

      // Upload avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const filePath = `${user.id}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true })

        if (uploadError) throw uploadError

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath)

        profile.avatar_url = publicUrl
      }

      // Update profile
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="preferences">Study Preferences</TabsTrigger>
            <TabsTrigger value="language">Language Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback>{profile.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
              </div>
            </div>

            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email} disabled />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username || ""}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subjects">Subjects of Interest</Label>
                <Textarea
                  id="subjects"
                  placeholder="Physics, Mathematics, Computer Science, etc."
                  value={profile.study_preferences?.subjects?.join(", ") || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      study_preferences: {
                        ...profile.study_preferences,
                        subjects: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="learningStyle">Learning Style</Label>
                <Textarea
                  id="learningStyle"
                  placeholder="Visual, Auditory, Reading/Writing, Kinesthetic, etc."
                  value={profile.study_preferences?.learning_style?.join(", ") || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      study_preferences: {
                        ...profile.study_preferences,
                        learning_style: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="preferredTime">Preferred Study Times</Label>
                <Textarea
                  id="preferredTime"
                  placeholder="Morning, Afternoon, Evening, etc."
                  value={profile.study_preferences?.preferred_time?.join(", ") || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      study_preferences: {
                        ...profile.study_preferences,
                        preferred_time: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="languages">Language Skills</Label>
                <p className="text-sm text-slate-500">
                  Enter languages and your proficiency level (e.g., English: Native, Spanish: Intermediate)
                </p>
                <Textarea
                  id="languages"
                  placeholder="English: Native, Spanish: Intermediate, Japanese: Beginner"
                  value={Object.entries(profile.language_level || {})
                    .map(([lang, level]) => `${lang}: ${level}`)
                    .join("\n")}
                  onChange={(e) => {
                    const langLevels: { [key: string]: string } = {}
                    e.target.value.split("\n").forEach((line) => {
                      const [lang, level] = line.split(":").map((s) => s.trim())
                      if (lang && level) {
                        langLevels[lang] = level
                      }
                    })
                    setProfile({ ...profile, language_level: langLevels })
                  }}
                  className="min-h-[150px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Button onClick={handleProfileUpdate} disabled={updating}>
          {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
