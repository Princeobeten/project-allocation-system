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
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-primary/20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cta to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">📚</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              ProjectHub
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Student Project Allocation & Management System
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Streamline project assignments, track progress, and foster collaboration between students, supervisors, and administrators.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20 hover:border-cta/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">For Students</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Set project preferences</li>
                <li>• Track assignment status</li>
                <li>• Submit progress reports</li>
                <li>• Receive supervisor feedback</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20 hover:border-cta/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">For Supervisors</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Create and manage projects</li>
                <li>• Monitor student progress</li>
                <li>• Provide detailed feedback</li>
                <li>• Track project milestones</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20 hover:border-cta/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">For Admins</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Manage users and roles</li>
                <li>• Allocate projects efficiently</li>
                <li>• Monitor system overview</li>
                <li>• Generate reports</li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/login" 
              className="bg-gradient-to-r from-cta to-blue-600 hover:from-cta-hover hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>Get Started</span>
              </div>
            </Link>
            <Link 
              href="/register" 
              className="bg-primary/80 backdrop-blur-sm border border-primary/20 hover:border-cta/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📝</span>
                <span>Register Now</span>
              </div>
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="bg-primary/60 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
              <span className="mr-2">🔑</span>
              Demo Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="mr-2">🛠️</span>
                  <span className="font-medium text-red-400">Admin</span>
                </div>
                <p className="text-gray-300">admin@example.com</p>
                <p className="text-gray-400">Password: pass</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="mr-2">👨‍🏫</span>
                  <span className="font-medium text-green-400">Supervisor</span>
                </div>
                <p className="text-gray-300">supervisor@example.com</p>
                <p className="text-gray-400">Password: pass</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="mr-2">👨‍🎓</span>
                  <span className="font-medium text-blue-400">Student</span>
                </div>
                <p className="text-gray-300">student@example.com</p>
                <p className="text-gray-400">Password: pass</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage student projects efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Smart Allocation', desc: 'Intelligent project matching based on student preferences and supervisor capacity' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Real-time monitoring of project milestones and student progress' },
              { icon: '💬', title: 'Feedback System', desc: 'Structured feedback mechanism between supervisors and students' },
              { icon: '🔐', title: 'Role-Based Access', desc: 'Secure authentication with different permission levels' },
              { icon: '📱', title: 'Responsive Design', desc: 'Works seamlessly across desktop, tablet, and mobile devices' },
              { icon: '💾', title: 'Data Persistence', desc: 'Local storage ensures your data is always available' }
            ].map((feature, index) => (
              <div key={index} className="bg-primary/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-cta/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-cta/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
