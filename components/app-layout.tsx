import { ReactNode } from 'react';
import { MainNav } from './main-nav';
import { Toaster } from '@/components/ui/toaster';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">StudyBud</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <MainNav />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}
