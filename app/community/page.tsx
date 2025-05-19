import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommunityGroups } from "@/components/community/community-groups"
import { CommunityForum } from "@/components/community/community-forum"
import { CommunityEvents } from "@/components/community/community-events"
import { CommunityResources } from "@/components/community/community-resources"
import { Users, MessageSquare, Calendar, BookOpen } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <p className="text-slate-500 dark:text-slate-400">Connect with fellow learners and share knowledge</p>
      </div>

      <Tabs defaultValue="groups">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="groups">
            <Users className="w-4 h-4 mr-2" /> Study Groups
          </TabsTrigger>
          <TabsTrigger value="forum">
            <MessageSquare className="w-4 h-4 mr-2" /> Forum
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="w-4 h-4 mr-2" /> Events
          </TabsTrigger>
          <TabsTrigger value="resources">
            <BookOpen className="w-4 h-4 mr-2" /> Resources
          </TabsTrigger>
        </TabsList>
        <TabsContent value="groups" className="mt-4">
          <CommunityGroups />
        </TabsContent>
        <TabsContent value="forum" className="mt-4">
          <CommunityForum />
        </TabsContent>
        <TabsContent value="events" className="mt-4">
          <CommunityEvents />
        </TabsContent>
        <TabsContent value="resources" className="mt-4">
          <CommunityResources />
        </TabsContent>
      </Tabs>
    </div>
  )
}
