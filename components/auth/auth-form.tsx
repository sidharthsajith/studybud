'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual auth logic
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-slate-900">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
        <p className="text-slate-500 dark:text-slate-400">
          {isLogin ? 'Sign in to your account' : 'Get started with StudyBud'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Forgot password?
              </a>
            )}
          </div>
          <Input id="password" type="password" required minLength={6} />
        </div>
        <Button type="submit" className="w-full">
          {isLogin ? 'Sign in' : 'Create account'}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </div>
  );
}
