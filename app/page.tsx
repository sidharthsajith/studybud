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
      description: 'Create, organize, and review your study materials',
      icon: <BookOpen />,
      href: '/notes',
    },
    {
      title: 'AI Tutor',
      description: 'Get explanations and help with any subject',
      icon: <MessageSquare />,
      href: '/tutor',
    },
    {
      title: 'Quiz Generator',
      description: 'Create custom quizzes to test your knowledge',
      icon: <FileQuestion />,
      href: '/quiz',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your AI-Powered <span className="text-primary">Study Companion</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Supercharge your learning with AI tools for notes, PDFs, audio, and more.
          Study smarter, not harder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-8 rounded-2xl border border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to boost your learning?</h2>
          <p className="text-foreground/70 mb-6">
            Get started with our AI-powered tools and take your study sessions to the next level.
          </p>
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
