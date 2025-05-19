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
import { Search, Plus, Calendar, Clock, MapPin, Users, Video } from "lucide-react"

// Sample events data
const events = [
  {
    id: "1",
    title: "Physics Problem-Solving Workshop",
    description:
      "Join us for a collaborative workshop focused on solving complex physics problems. We'll cover mechanics, thermodynamics, and electromagnetism.",
    date: "May 25, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    organizer: "Physics Study Group",
    attendees: 18,
    maxAttendees: 30,
    tags: ["physics", "problem-solving", "workshop"],
  },
  {
    id: "2",
    title: "Spanish Conversation Practice",
    description: "Practice your Spanish speaking skills in a friendly, supportive environment. All levels welcome!",
    date: "May 22, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Online (Discord)",
    category: "Language Practice",
    organizer: "Spanish Language Exchange",
    attendees: 12,
    maxAttendees: 20,
    tags: ["spanish", "conversation", "language"],
  },
  {
    id: "3",
    title: "Machine Learning Paper Discussion",
    description:
      "We'll be discussing the latest research paper on transformer architectures and their applications in NLP.",
    date: "May 28, 2025",
    time: "4:00 PM - 5:30 PM",
    location: "Online (Google Meet)",
    category: "Discussion",
    organizer: "Machine Learning Research Group",
    attendees: 25,
    maxAttendees: 40,
    tags: ["machine learning", "research", "discussion"],
  },
  {
    id: "4",
    title: "Chemistry Lab Preparation Session",
    description:
      "Get ready for your upcoming organic chemistry lab with this preparation session. We'll cover safety procedures and experimental techniques.",
    date: "May 24, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Online (Zoom)",
    category: "Preparation",
    organizer: "Organic Chemistry Help",
    attendees: 15,
    maxAttendees: 25,
    tags: ["chemistry", "lab", "preparation"],
  },
]

export function CommunityEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventTime, setNewEventTime] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventCategory, setNewEventCategory] = useState("")
  const [newEventMaxAttendees, setNewEventMaxAttendees] = useState("")
  const [newEventTags, setNewEventTags] = useState("")

  const filteredEvents = events
    .filter(
      (event) =>
        (selectedCategory === "all" || event.category === selectedCategory) &&
        (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
    .sort((a, b) => {
      // Sort by date (closest first)
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

  const handleCreateEvent = () => {
    // In a real app, this would create a new event in the database
    console.log("Creating new event:", {
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      category: newEventCategory,
      maxAttendees: newEventMaxAttendees,
      tags: newEventTags.split(",").map((tag) => tag.trim()),
    })

    // Reset form
    setNewEventTitle("")
    setNewEventDescription("")
    setNewEventDate("")
    setNewEventTime("")
    setNewEventLocation("")
    setNewEventCategory("")
    setNewEventMaxAttendees("")
    setNewEventTags("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create a New Event</DialogTitle>
              <DialogDescription>Schedule an event for your study group or the wider community.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g., Physics Problem-Solving Workshop"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  placeholder="Describe your event..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  placeholder="e.g., Online (Zoom) or Room 101, Science Building"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newEventCategory} onValueChange={setNewEventCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Discussion">Discussion</SelectItem>
                      <SelectItem value="Language Practice">Language Practice</SelectItem>
                      <SelectItem value="Study Session">Study Session</SelectItem>
                      <SelectItem value="Preparation">Preparation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newEventMaxAttendees}
                    onChange={(e) => setNewEventMaxAttendees(e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newEventTags}
                  onChange={(e) => setNewEventTags(e.target.value)}
                  placeholder="e.g., physics, problem-solving, workshop"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateEvent}>Create Event</Button>
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
          variant={selectedCategory === "Workshop" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Workshop")}
        >
          Workshops
        </Button>
        <Button
          variant={selectedCategory === "Discussion" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Discussion")}
        >
          Discussions
        </Button>
        <Button
          variant={selectedCategory === "Language Practice" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Language Practice")}
        >
          Language Practice
        </Button>
        <Button
          variant={selectedCategory === "Study Session" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("Study Session")}
        >
          Study Sessions
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="registered" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEvents.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} isRegistered={true} />
            ))}
            {filteredEvents.length === 0 && (
              <div className="text-center py-8 col-span-2">
                <p className="text-slate-500">You haven't registered for any events yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <EventCard
              event={{
                id: "past1",
                title: "Introduction to Calculus",
                description: "A beginner-friendly introduction to calculus concepts and applications.",
                date: "May 10, 2025",
                time: "2:00 PM - 4:00 PM",
                location: "Online (Zoom)",
                category: "Workshop",
                organizer: "Mathematics Study Group",
                attendees: 28,
                maxAttendees: 30,
                tags: ["mathematics", "calculus", "introduction"],
              }}
              isPast={true}
            />
            <EventCard
              event={{
                id: "past2",
                title: "French Pronunciation Workshop",
                description:
                  "Learn the basics of French pronunciation with a focus on vowel sounds and nasal consonants.",
                date: "May 8, 2025",
                time: "5:00 PM - 6:30 PM",
                location: "Online (Discord)",
                category: "Language Practice",
                organizer: "French Language Group",
                attendees: 15,
                maxAttendees: 20,
                tags: ["french", "pronunciation", "language"],
              }}
              isPast={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    category: string
    organizer: string
    attendees: number
    maxAttendees: number
    tags: string[]
  }
  isRegistered?: boolean
  isPast?: boolean
}

function EventCard({ event, isRegistered = false, isPast = false }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.organizer}</CardDescription>
          </div>
          <Badge>{event.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500 line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-slate-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-slate-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm">
            {event.location.toLowerCase().includes("online") ? (
              <Video className="mr-2 h-4 w-4 text-slate-500" />
            ) : (
              <MapPin className="mr-2 h-4 w-4 text-slate-500" />
            )}
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-slate-500" />
            <span>
              {event.attendees} / {event.maxAttendees} attendees
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {isPast ? (
          <Button variant="outline" className="w-full">
            View Recording
          </Button>
        ) : isRegistered ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Calendar
            </Button>
            <Button className="flex-1">Join Now</Button>
          </div>
        ) : (
          <Button className="w-full">Register</Button>
        )}
      </CardFooter>
    </Card>
  )
}
