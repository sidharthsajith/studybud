import React from 'react';
import Link from 'next/link';
import { FileText, Mic, Image as ImageIcon, BookOpen, MessageSquare, FileQuestion, LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactElement<LucideProps>;
  href: string;
};

const FeatureCard = ({ title, description, icon, href }: FeatureCardProps) => (
  <Link href={href} className="group block h-full">
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/20 border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-primary/30">
      <CardHeader className="p-6">
        <div className="w-12 h-12 rounded-xl bg-foreground/5 dark:bg-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/10 dark:group-hover:bg-foreground/20 transition-colors">
          {React.cloneElement(icon, { className: 'w-5 h-5 text-foreground' })}
        </div>
        <CardTitle className="text-foreground text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-foreground/60 dark:text-foreground/70 mt-1">
          {description}
        </CardDescription>
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
      icon: <ImageIcon />,
      href: '/image-analysis',
    },
    {
      title: 'Study Notes',
      description: 'Create and manage your study materials',
      icon: <BookOpen />,
      href: '/notes',
    },
    {
      title: 'Community',
      description: 'Connect with other learners and share knowledge',
      icon: <MessageSquare />,
      href: '/community',
    },
    {
      title: 'Quizzes',
      description: 'Test your knowledge with interactive quizzes',
      icon: <FileQuestion />,
      href: '/quizzes',
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
          Study Smarter,<br />
          <span className="text-primary">Not Harder</span>
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
          Transform your study sessions with AI-powered tools designed to help you learn more effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
          />
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center space-x-4 mb-8">
          <div className="h-px w-16 bg-foreground/20"></div>
          <span className="text-sm font-medium text-foreground/50">Ready to get started?</span>
          <div className="h-px w-16 bg-foreground/20"></div>
        </div>
        <Button 
          asChild 
          size="lg" 
          className="px-8 py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          <Link href="/auth/signin">
            Get Started for Free
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
}
