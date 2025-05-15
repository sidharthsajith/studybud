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

      
    </div>
  )
}
