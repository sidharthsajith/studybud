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
import { Search, Plus, ThumbsUp, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample forum data
const forumPosts = [
  {
    id: "1",
    title: "Understanding wave-particle duality in quantum mechanics",
    content:
      "I'm having trouble understanding the concept of wave-particle duality in quantum mechanics. Can someone explain it in simple terms?",
    author: {
      name: "Alex Johnson",
      avatar: "",
    },
    category: "Physics",
    tags: ["quantum mechanics", "physics", "theory"],
    likes: 12,
    comments: 8,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Best resources for learning Spanish subjunctive mood?",
    content:
      "I'm struggling with the subjunctive mood in Spanish. Can anyone recommend good resources or exercises to practice this concept?",
    author: {
      name: "Maria Garcia",
      avatar: "",
    },
    category: "Languages",
    tags: ["spanish", "grammar", "learning resources"],
    likes: 8,
    comments: 15,
    createdAt: "1 day ago",
  },
  {
    id: "3",
    title: "How to approach complex integration problems?",
    content:
      "I'm preparing for my calculus exam and having trouble with complex integration problems. Any tips or strategies?",
    author: {
      name: "David Kim",
      avatar: "",
    },
    category: "Mathematics",
    tags: ["calculus", "integration", "exam prep"],
    likes: 5,
    comments: 7,
    createdAt: "3 days ago",
  },
  {
    id: "4",
    title: "Recommended textbooks for organic chemistry?",
    content:
      "I'm starting an organic chemistry course next semester and want to get ahead. What textbooks would you recommend for self-study?",
    author: {
      name: "Sophia Chen",
      avatar: "",
    },
    category: "Chemistry",
    tags: ["organic chemistry", "textbooks", "self-study"],
    likes: 10,
    comments: 12,
    createdAt: "4 days ago",
  },
]

export function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [newPostTags, setNewPostTags] = useState("")

  const filteredPosts = forumPosts
    .filter(
      (post) =>
        (selectedCategory === "all" || post.category === selectedCategory) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
    .sort((a, b) => {
      // Sort by most recent
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const handleCreatePost = () => {
    // In a real app, this would create a new post in the database
    console.log("Creating new post:", {
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      tags: newPostTags.split(",").map((tag) => tag.trim()),
    })

    // Reset form
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostCategory("")
    setNewPostTags("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search forum posts..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Forum Post</DialogTitle>
              <DialogDescription>
                Share your questions, insights, or start a discussion with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g., Understanding wave-particle duality"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
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
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="e.g., quantum mechanics, physics, theory"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreatePost}>Post</Button>
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

      <Tabs defaultValue="recent">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-4">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <ForumPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="popular" className="mt-4">
          <div className="space-y-4">
            {filteredPosts
              .sort((a, b) => b.likes - a.likes)
              .map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="unanswered" className="mt-4">
          <div className="space-y-4">
            {filteredPosts
              .filter((post) => post.comments === 0)
              .map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            {filteredPosts.filter((post) => post.comments === 0).length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">No unanswered posts found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ForumPostCardProps {
  post: {
    id: string
    title: string
    content: string
    author: {
      name: string
      avatar: string
    }
    category: string
    tags: string[]
    likes: number
    comments: number
    createdAt: string
  }
}

function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {post.category}
              </Badge>
              <span>{post.createdAt}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500 line-clamp-3">{post.content}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{post.author.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
