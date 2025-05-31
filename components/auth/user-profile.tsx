"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  username: string
  full_name: string
  avatar_url: string
  bio?: string
  study_preferences: {
    preferred_time: string[]
    subjects: string[]
    learning_style: string[]
  }
  language_level?: Record<string, string>
}

export function UserProfile() {
  const [updating, setUpdating] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    username: "",
    full_name: "",
    avatar_url: "",
    bio: "",
    study_preferences: {
      preferred_time: [],
      subjects: [],
      learning_style: [],
    },
    language_level: {}
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setUpdating(true)
      console.log("Profile data to save:", profile)
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar_url: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="preferences">Study Preferences</TabsTrigger>
              <TabsTrigger value="language">Language Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>{(profile.full_name || 'U').charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarChange} 
                  />
                </div>
              </div>

              <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    required
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
                    value={profile.study_preferences.subjects.join(", ")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        study_preferences: {
                          ...profile.study_preferences,
                          subjects: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
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
                    value={profile.study_preferences.learning_style.join(", ")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        study_preferences: {
                          ...profile.study_preferences,
                          learning_style: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
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
                    value={profile.study_preferences.preferred_time.join(", ")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        study_preferences: {
                          ...profile.study_preferences,
                          preferred_time: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
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
                      const langLevels: Record<string, string> = {}
                      e.target.value.split("\n").forEach((line) => {
                        const [lang, ...levelParts] = line.split(":")
                        const level = levelParts.join(":").trim()
                        if (lang && level) {
                          langLevels[lang.trim()] = level
                        }
                      })
                      setProfile({ ...profile, language_level: langLevels })
                    }}
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
