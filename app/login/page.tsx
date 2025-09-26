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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      router.push('/dashboard');
    }
  };

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4 text-white">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <p className="mt-4 text-center">
          <Link href="/register" className="text-cta hover:underline">Register</Link>
        </p>
        <div className="mt-4 text-sm text-gray-300">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / pass</p>
          <p>Supervisor: supervisor@example.com / pass</p>
          <p>Student: student@example.com / pass</p>
        </div>
      </form>
    </div>
  );
}
