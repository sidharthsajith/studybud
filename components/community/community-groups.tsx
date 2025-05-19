"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Lock, Globe, UserPlus, MessageSquare, Calendar } from "lucide-react"

// Sample study groups data
const studyGroups = [
  {
    id: "1",
    name: "Physics Study Group",
    description: "A group for discussing physics concepts and problem-solving",
    subject: "Physics",
    members: 24,
    isPrivate: false,
    tags: ["quantum mechanics", "electromagnetism", "thermodynamics"],
    recentActivity: "New discussion: Understanding wave-particle duality",
    createdAt: "2 months ago",
  },
  {
    id: "2",
    name: "Spanish Language Exchange",
    description: "Practice Spanish conversation and grammar with fellow learners",
    subject: "Spanish",
    members: 18,
    isPrivate: false,
    tags: ["language", "conversation", "grammar"],
    recentActivity: "Upcoming event: Spanish conversation practice (May 22)",
    createdAt: "3 weeks ago",
  },
  {
    id: "3",
    name: "Machine Learning Research",
    description: "Discuss latest ML papers and techniques",
    subject: "Computer Science",
    members: 32,
    isPrivate: true,
    tags: ["AI", "deep learning", "neural networks"],
    recentActivity: "New resource: Introduction to Transformers",
    createdAt: "1 month ago",
  },
  {
    id: "4",
    name: "Organic Chemistry Help",
    description: "Get help with organic chemistry concepts and reactions",
    subject: "Chemistry",
    members: 15,
    isPrivate: false,
    tags: ["organic chemistry", "reactions", "mechanisms"],
    recentActivity: "New question: Stereochemistry of SN2 reactions",
    createdAt: "2 weeks ago",
  },
]

export function CommunityGroups() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [newGroupSubject, setNewGroupSubject] = useState("")
  const [newGroupPrivacy, setNewGroupPrivacy] = useState("public")
  const [newGroupTags, setNewGroupTags] = useState("")

  const filteredGroups = studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreateGroup = () => {
    // In a real app, this would create a new group in the database
    console.log("Creating new group:", {
      name: newGroupName,
      description: newGroupDescription,
      subject: newGroupSubject,
      isPrivate: newGroupPrivacy === "private",
      tags: newGroupTags.split(",").map((tag) => tag.trim()),
    })

    // Reset form
    setNewGroupName("")
    setNewGroupDescription("")
    setNewGroupSubject("")
    setNewGroupPrivacy("public")
    setNewGroupTags("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search study groups..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Study Group</DialogTitle>
              <DialogDescription>
                Create a group to collaborate with other students on specific subjects or topics.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g., Physics Study Group"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  placeholder="Describe the purpose and focus of your group"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newGroupSubject}
                  onChange={(e) => setNewGroupSubject(e.target.value)}
                  placeholder="e.g., Physics, Mathematics, Language"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="privacy">Privacy</Label>
                <Select value={newGroupPrivacy} onValueChange={setNewGroupPrivacy}>
                  <SelectTrigger id="privacy">
                    <SelectValue placeholder="Select privacy setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone can join)</SelectItem>
                    <SelectItem value="private">Private (By invitation only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newGroupTags}
                  onChange={(e) => setNewGroupTags(e.target.value)}
                  placeholder="e.g., quantum mechanics, thermodynamics"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my">My Groups</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGroups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGroups.slice(0, 2).map((group) => (
              <StudyGroupCard key={group.id} group={group} isMember={true} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGroups.slice(2, 4).map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StudyGroupCardProps {
  group: {
    id: string
    name: string
    description: string
    subject: string
    members: number
    isPrivate: boolean
    tags: string[]
    recentActivity: string
    createdAt: string
  }
  isMember?: boolean
}

function StudyGroupCard({ group, isMember = false }: StudyGroupCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              {group.name}
              {group.isPrivate && <Lock className="ml-2 h-4 w-4 text-slate-400" />}
              {!group.isPrivate && <Globe className="ml-2 h-4 w-4 text-slate-400" />}
            </CardTitle>
            <CardDescription>{group.subject}</CardDescription>
          </div>
          <Badge variant="outline">{group.members} members</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500">{group.description}</p>

        <div className="flex flex-wrap gap-2">
          {group.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-slate-500">
          <div className="font-medium">Recent Activity</div>
          <div>{group.recentActivity}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-slate-400">Created {group.createdAt}</div>
        {isMember ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" /> Chat
            </Button>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" /> Schedule
            </Button>
          </div>
        ) : (
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Join Group
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
