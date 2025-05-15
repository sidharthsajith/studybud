"use client"

import { BookOpen, Brain, Calendar, FileText, Layers, Lightbulb } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeIn, floatAnimation, pulseAnimation } from "@/lib/motion"

export function Dashboard() {
  const features = [
    {
      title: "Organize Notes",
      description: "Categorize your study notes by topic and concept",
      icon: Layers,
      href: "/organize-notes",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500",
      delay: 0.1,
    },
    {
      title: "Extract Key Points",
      description: "Identify the most important concepts from your notes",
      icon: Lightbulb,
      href: "/extract-key-points",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500",
      delay: 0.2,
    },
    {
      title: "Generate Flash Cards",
      description: "Create study cards from your notes automatically",
      icon: FileText,
      href: "/flash-cards",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-500",
      delay: 0.3,
    },
    {
      title: "Create Study Plan",
      description: "Get an optimized study schedule based on your availability",
      icon: Calendar,
      href: "/study-plan",
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-500",
      delay: 0.4,
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div className="space-y-2" variants={fadeIn("up", 0)} initial="hidden" animate="show">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to StudyBud</h1>
        <p className="text-muted-foreground">Your AI-powered study assistant to help you learn more effectively</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.href}
            variants={fadeIn("up", feature.delay)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <Link href={feature.href}>
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <motion.div
                    className={`mb-2 inline-flex rounded-xl p-2 ${feature.color}`}
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={fadeIn("left", 0.5)} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest study sessions and notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-4"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <div className="rounded-full bg-muted p-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Biology Notes Organized</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Physics Key Points Extracted</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <div className="rounded-full bg-muted p-2">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Chemistry Flash Cards Created</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("right", 0.5)} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Biology</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Chemistry</span>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1, delay: 1 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
