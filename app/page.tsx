'use client';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Student Project Allocation System</h1>
        <p className="text-lg mb-8 text-gray-300">
          A comprehensive system for managing student project allocations, progress tracking, 
          and communication between students, supervisors, and administrators.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="bg-primary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="text-left space-y-1 text-sm">
              <li>• Student registration and project preferences</li>
              <li>• Supervisor project creation and management</li>
              <li>• Automatic project allocation</li>
              <li>• Progress submission and feedback</li>
              <li>• Role-based authentication and dashboards</li>
            </ul>
          </div>
        </div>

        <div className="space-x-4">
          <Link 
            href="/login" 
            className="bg-cta hover:bg-cta-hover text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="bg-primary hover:bg-opacity-80 text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Register
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / pass</p>
          <p>Supervisor: supervisor@example.com / pass</p>
          <p>Student: student@example.com / pass</p>
        </div>
      </div>
    </div>
  );
}
