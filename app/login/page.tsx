'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login, user } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        router.push('/dashboard');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleAutoFill = (userType: 'admin' | 'supervisor' | 'student') => {
    const credentials = {
      admin: { email: 'admin@example.com', password: 'pass' },
      supervisor: { email: 'supervisor@example.com', password: 'pass' },
      student: { email: 'student@example.com', password: 'pass' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
  };

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-gray-900 to-primary p-4">
      <div className="w-full max-w-md">
        <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-primary/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cta to-blue-600 hover:from-cta-hover hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-400 mb-4">Quick Login (Demo)</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAutoFill('admin')}
                className="bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded-lg transition-all transform hover:scale-105"
              >
                👨‍💼 Admin
              </button>
              <button
                onClick={() => handleAutoFill('supervisor')}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-all transform hover:scale-105"
              >
                👨‍🏫 Supervisor
              </button>
              <button
                onClick={() => handleAutoFill('student')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-all transform hover:scale-105"
              >
                👨‍🎓 Student
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-cta hover:text-cta-hover font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-primary/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
          <h3 className="text-sm font-semibold text-white mb-2">Demo Credentials:</h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p>🔴 Admin: admin@example.com / pass</p>
            <p>🟢 Supervisor: supervisor@example.com / pass</p>
            <p>🔵 Student: student@example.com / pass</p>
          </div>
        </div>
      </div>
    </div>
  );
}
