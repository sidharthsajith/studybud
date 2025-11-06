import Link from 'next/link';
import React from 'react';
import { FileText, Mic, Image, BookOpen, MessageSquare, FileQuestion, LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactElement<LucideProps>;
  href: string;
};

const FeatureCard = ({ title, description, icon, href }: FeatureCardProps) => (
  <Link href={href}>
    <Card className="h-full transition-all hover:shadow-md hover:border-primary">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-foreground/5 dark:bg-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/10 dark:group-hover:bg-foreground/20 transition-colors">
          {React.cloneElement(icon, { className: 'w-5 h-5 text-foreground' })}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  </Link>
);

export default function HomePage() {
  const features = [
    {
      title: 'Audio Analysis',
      description: 'Transcribe, summarize, and analyze audio content',
      icon: <Mic />,
      href: '/audio',
    },
    {
      title: 'PDF Analysis',
      description: 'Extract text, summarize, and get insights from PDFs',
      icon: <FileText />,
      href: '/pdf',
    },
    {
      title: 'Image Analysis',
      description: 'Analyze images, extract text, and more',
      icon: <Image />,
      href: '/image-analysis',
    },
    {
      title: 'Study Materials',
      description: 'Create and manage your study materials',
      icon: <BookOpen />,
      href: '/study',
    },
    {
      title: 'Notes',
      description: 'Take and organize your study notes',
      icon: <MessageSquare />,
      href: '/notes',
    },
    {
      title: 'Flashcards',
      description: 'Create and study with digital flashcards',
      icon: <FileQuestion />,
      href: '/flashcards',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-16 sm:mb-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-sm font-medium text-primary mb-6">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI-Powered Learning Tools
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Welcome to StudyBud
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
          Your all-in-one study companion with AI-powered tools to enhance your learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Choose a tool above or explore our features to enhance your study sessions.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/audio">Try Audio Analysis</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pdf">Explore PDF Tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
