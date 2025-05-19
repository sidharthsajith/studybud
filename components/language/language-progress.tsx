import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Calendar, Clock, TrendingUp } from "lucide-react"

export function LanguageProgress() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Language Learning Progress</CardTitle>
          <CardDescription>Track your language learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-slate-50 dark:bg-slate-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-500" />
                      <div className="text-sm font-medium text-slate-500">Current Streak</div>
                    </div>
                    <div className="text-3xl font-bold mt-1">12 days</div>
                    <div className="text-xs text-slate-400 mt-1">Best: 21 days</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 dark:bg-slate-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <div className="text-sm font-medium text-slate-500">Study Time</div>
                    </div>
                    <div className="text-3xl font-bold mt-1">24.5 hrs</div>
                    <div className="text-xs text-slate-400 mt-1">This month</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 dark:bg-slate-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-slate-500" />
                      <div className="text-sm font-medium text-slate-500">Vocabulary</div>
                    </div>
                    <div className="text-3xl font-bold mt-1">487</div>
                    <div className="text-xs text-slate-400 mt-1">Words learned</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language Proficiency</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Spanish</Badge>
                        <div className="text-sm">Intermediate (B1)</div>
                      </div>
                      <div className="text-sm text-slate-500">65%</div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Japanese</Badge>
                        <div className="text-sm">Beginner (A2)</div>
                      </div>
                      <div className="text-sm text-slate-500">32%</div>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>French</Badge>
                        <div className="text-sm">Beginner (A1)</div>
                      </div>
                      <div className="text-sm text-slate-500">15%</div>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Achievements</h3>

                <div className="grid gap-3 md:grid-cols-2">
                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardContent className="p-4">
                      <div className="font-medium">Vocabulary Master</div>
                      <div className="text-sm text-slate-500">Learned 100 Spanish words</div>
                      <div className="text-xs text-slate-400 mt-1">May 15, 2025</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardContent className="p-4">
                      <div className="font-medium">Grammar Guru</div>
                      <div className="text-sm text-slate-500">Completed Spanish verb conjugation course</div>
                      <div className="text-xs text-slate-400 mt-1">May 12, 2025</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardContent className="p-4">
                      <div className="font-medium">Consistent Learner</div>
                      <div className="text-sm text-slate-500">Studied for 7 days in a row</div>
                      <div className="text-xs text-slate-400 mt-1">May 10, 2025</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardContent className="p-4">
                      <div className="font-medium">Conversation Starter</div>
                      <div className="text-sm text-slate-500">Completed first Japanese dialogue</div>
                      <div className="text-xs text-slate-400 mt-1">May 8, 2025</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Spanish Skills</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Reading</div>
                      <div className="text-sm text-slate-500">78%</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Writing</div>
                      <div className="text-sm text-slate-500">62%</div>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Listening</div>
                      <div className="text-sm text-slate-500">70%</div>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Speaking</div>
                      <div className="text-sm text-slate-500">55%</div>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Japanese Skills</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Reading</div>
                      <div className="text-sm text-slate-500">35%</div>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Writing</div>
                      <div className="text-sm text-slate-500">28%</div>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Listening</div>
                      <div className="text-sm text-slate-500">40%</div>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Speaking</div>
                      <div className="text-sm text-slate-500">25%</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Grammar Proficiency</h3>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Spanish Verb Conjugation</div>
                      <div className="text-sm text-slate-500">72%</div>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Spanish Tenses</div>
                      <div className="text-sm text-slate-500">65%</div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Japanese Particles</div>
                      <div className="text-sm text-slate-500">45%</div>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Japanese Sentence Structure</div>
                      <div className="text-sm text-slate-500">38%</div>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Study Sessions</h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Spanish Practice</div>
                      <Badge>45 min</Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">Verb conjugation and vocabulary</div>
                    <div className="flex items-center text-xs text-slate-400 mt-2">
                      <Calendar className="h-3 w-3 mr-1" /> May 19, 2025
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Japanese Hiragana</div>
                      <Badge>30 min</Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">Writing practice</div>
                    <div className="flex items-center text-xs text-slate-400 mt-2">
                      <Calendar className="h-3 w-3 mr-1" /> May 18, 2025
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Spanish Conversation</div>
                      <Badge>60 min</Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">Speaking practice with AI tutor</div>
                    <div className="flex items-center text-xs text-slate-400 mt-2">
                      <Calendar className="h-3 w-3 mr-1" /> May 17, 2025
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Japanese Vocabulary</div>
                      <Badge>25 min</Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">Common phrases and greetings</div>
                    <div className="flex items-center text-xs text-slate-400 mt-2">
                      <Calendar className="h-3 w-3 mr-1" /> May 16, 2025
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Spanish Reading</div>
                      <Badge>40 min</Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">Short stories with comprehension</div>
                    <div className="flex items-center text-xs text-slate-400 mt-2">
                      <Calendar className="h-3 w-3 mr-1" /> May 15, 2025
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
