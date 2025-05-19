import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Calendar, Clock, FileText, Flame, Mic } from "lucide-react"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingTasks } from "@/components/upcoming-tasks"
import { FocusAreas } from "@/components/focus-areas"

export default function Dashboard() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, User</h1>
      <p className="text-slate-500 dark:text-slate-400">Continue your learning journey where you left off</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 hours</div>
            <p className="text-xs text-slate-500">+2.3 hours from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Active</div>
            <p className="text-xs text-slate-500">8 completed this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-slate-500">Best: 14 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Tasks</div>
            <p className="text-xs text-slate-500">Next: Physics Quiz (2d)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Current Learning Pathways</CardTitle>
            <CardDescription>Track your progress across active courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Advanced Physics</div>
                <div className="text-sm text-slate-500">68%</div>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Web Development</div>
                <div className="text-sm text-slate-500">42%</div>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Japanese Language</div>
                <div className="text-sm text-slate-500">23%</div>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Data Science Fundamentals</div>
                <div className="text-sm text-slate-500">89%</div>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Jump back into your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <div className="font-medium">Study Mode</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Brain className="w-8 h-8 mb-2" />
                  <div className="font-medium">Research</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <FileText className="w-8 h-8 mb-2" />
                  <div className="font-medium">Write</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Mic className="w-8 h-8 mb-2" />
                  <div className="font-medium">Voice</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="focus">Focus Areas</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="mt-4">
          <RecentActivity />
        </TabsContent>
        <TabsContent value="tasks" className="mt-4">
          <UpcomingTasks />
        </TabsContent>
        <TabsContent value="focus" className="mt-4">
          <FocusAreas />
        </TabsContent>
      </Tabs>
    </div>
  )
}
