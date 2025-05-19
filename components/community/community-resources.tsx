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
import { Search, Plus, Download, ThumbsUp, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample resources data
const resources = [
  {
    id: "1",
    title: "Comprehensive Guide to Quantum Mechanics",
    description:
      "A detailed guide covering the fundamental concepts of quantum mechanics, including wave-particle duality, uncertainty principle, and quantum states.",
    type: "PDF",
    url: "#",
    author: {
      name: "Dr. Richard Feynman",
      avatar: "",
    },
    category: "Physics",
    tags: ["quantum mechanics", "physics", "guide"],
    likes: 45,
    downloads: 128,
    createdAt: "2 months ago",
  },
  {
    id: "2",
    title: "Spanish Verb Conjugation Cheat Sheet",
    description:
      "A comprehensive reference sheet for Spanish verb conjugations across all tenses, including regular and irregular verbs.",
    type: "PDF",
    url: "#",
    author: {
      name: "Maria Rodriguez",
      avatar: "",
    },
    category: "Languages",
    tags: ["spanish", "grammar", "verbs"],
    likes: 32,
    downloads: 215,
    createdAt: "3 weeks ago",
  },
  {
    id: "3",
    title: "Calculus Problem-Solving Techniques",
    description:
      "A collection of strategies and techniques for solving complex calculus problems, with step-by-step examples.",
    type: "PDF",
    url: "#",
    author: {
      name: "Prof. Sarah Johnson",
      avatar: "",
    },
    category: "Mathematics",
    tags: ["calculus", "problem-solving", "mathematics"],
    likes: 28,
    downloads: 176,
    createdAt: "1 month ago",
  },
  {
    id: "4",
    title: "Interactive Periodic Table of Elements",
    description:
      "An interactive web tool that provides detailed information about each element in the periodic table, including properties, uses, and discovery.",
    type: "Website",
    url: "https://example.com/periodic-table",
    author: {
      name: "Chemistry Learning Group",
      avatar: "",
    },
    category: "Chemistry",
    tags: ["chemistry", "periodic table", "interactive"],
    likes: 56,
    downloads: 0,
    createdAt: "2 months ago",
  },
]

export function CommunityResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newResourceTitle, setNewResourceTitle] = useState("")
  const [newResourceDescription, setNewResourceDescription] = useState("")
  const [newResourceType, setNewResourceType] = useState("")
  const [newResourceUrl, setNewResourceUrl] = useState("")
  const [newResourceCategory, setNewResourceCategory] = useState("")
  const [newResourceTags, setNewResourceTags] = useState("")

  const filteredResources = resources
    .filter(
      (resource) =>
        (selectedCategory === "all" || resource.category === selectedCategory) &&
        (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
    .sort((a, b) => {
      // Sort by most liked
      return b.likes - a.likes
    })

  const handleShareResource = () => {
    // In a real app, this would share a new resource in the database
    console.log("Sharing new resource:", {
      title: newResourceTitle,
      description: newResourceDescription,
      type: newResourceType,
      url: newResourceUrl,
      category: newResourceCategory,
      tags: newResourceTags.split(",").map((tag) => tag.trim()),
    })

    // Reset form
    setNewResourceTitle("")
    setNewResourceDescription("")
    setNewResourceType("")
    setNewResourceUrl("")
    setNewResourceCategory("")
    setNewResourceTags("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Share Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share a Learning Resource</DialogTitle>
              <DialogDescription>
                Share helpful learning materials with the community. You can upload files or link to external resources.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  placeholder="e.g., Comprehensive Guide to Quantum Mechanics"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newResourceDescription}
                  onChange={(e) => setNewResourceDescription(e.target.value)}
                  placeholder="Describe the resource..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Resource Type</Label>
                  <Select value={newResourceType} onValueChange={setNewResourceType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                      <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newResourceCategory} onValueChange={setNewResourceCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Languages">Languages</SelectItem>
                      <SelectItem value="Literature">Literature</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL or Upload</Label>
                <Input
                  id="url"
                  value={newResourceUrl}
                  onChange={(e) => setNewResourceUrl(e.target.value)}
                  placeholder="https://example.com/resource or upload a file"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newResourceTags}
                  onChange={(e) => setNewResourceTags(e.target.value)}
                  placeholder="e.g., quantum mechanics, physics, guide"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleShareResource}>Share Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === "Physics" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Physics")}
        >
          Physics
        </Button>
        <Button
          variant={selectedCategory === "Mathematics" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Mathematics")}
        >
          Mathematics
        </Button>
        <Button
          variant={selectedCategory === "Chemistry" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Chemistry")}
        >
          Chemistry
        </Button>
        <Button
          variant={selectedCategory === "Languages" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Languages")}
        >
          Languages
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="websites">Websites & Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources
              .filter((resource) => ["PDF", "Document", "Presentation", "Spreadsheet"].includes(resource.type))
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="websites" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources
              .filter((resource) => ["Website", "Video"].includes(resource.type))
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    type: string
    url: string
    author: {
      name: string
      avatar: string
    }
    category: string
    tags: string[]
    likes: number
    downloads: number
    createdAt: string
  }
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {resource.category}
              </Badge>
              <span>{resource.createdAt}</span>
            </CardDescription>
          </div>
          {resource.type === "PDF" || resource.type === "Document" ? (
            <Badge className="bg-blue-500 hover:bg-blue-600">{resource.type}</Badge>
          ) : resource.type === "Website" ? (
            <Badge className="bg-green-500 hover:bg-green-600">{resource.type}</Badge>
          ) : (
            <Badge>{resource.type}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500 line-clamp-3">{resource.description}</p>

        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={resource.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{resource.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{resource.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{resource.likes}</span>
          </Button>
          {resource.type === "Website" ? (
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Visit</span>
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>{resource.downloads}</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
