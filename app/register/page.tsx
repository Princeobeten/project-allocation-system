'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { addUser, user } = useApp();
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'admin' | 'supervisor' | 'student' | '',
    department: '',
    matricNumber: '',
    specialization: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.role) {
      toast.error('Please select a role');
      return;
    }
    addUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      department: data.department,
      matricNumber: data.role === 'student' ? data.matricNumber : undefined,
      specialization: data.role === 'supervisor' ? data.specialization : undefined,
    });
    router.push('/login');
  };

  if (user && user.role !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-gray-900 to-primary p-4">
      <div className="w-full max-w-md">
        <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-primary/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cta to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📝</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join ProjectHub today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Create a password"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value as 'admin' | 'supervisor' | 'student' })}
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              >
                <option value="">Select your role</option>
                <option value="admin">🛠️ Administrator</option>
                <option value="supervisor">👨‍🏫 Supervisor</option>
                <option value="student">👨‍🎓 Student</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input
                type="text"
                value={data.department}
                onChange={(e) => setData({ ...data, department: e.target.value })}
                placeholder="Enter your department"
                className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                required
              />
            </div>

            {data.role === 'student' && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-medium text-gray-300 mb-2">Matriculation Number</label>
                <input
                  type="text"
                  value={data.matricNumber}
                  onChange={(e) => setData({ ...data, matricNumber: e.target.value })}
                  placeholder="e.g., 20/CS/001"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            {data.role === 'supervisor' && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                <input
                  type="text"
                  value={data.specialization}
                  onChange={(e) => setData({ ...data, specialization: e.target.value })}
                  placeholder="e.g., Artificial Intelligence"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cta to-blue-600 hover:from-cta-hover hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                Create Account
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-cta hover:text-cta-hover font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {data.role && (
          <div className="mt-6 bg-primary/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
            <div className="flex items-center mb-2">
              <span className="mr-2">
                {data.role === 'admin' ? '🛠️' : data.role === 'supervisor' ? '👨‍🏫' : '👨‍🎓'}
              </span>
              <h3 className="text-sm font-semibold text-white">
                {data.role === 'admin' ? 'Administrator' : 
                 data.role === 'supervisor' ? 'Supervisor' : 'Student'} Role
              </h3>
            </div>
            <p className="text-xs text-gray-300">
              {data.role === 'admin' ? 'Manage users, projects, and system settings' :
               data.role === 'supervisor' ? 'Create projects, monitor students, and provide feedback' :
               'Join projects, submit progress, and receive guidance'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
