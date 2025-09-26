'use client';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useEffect } from 'react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cta"></div>
      </div>
    );
  }

  return <>{children}</>;
}
