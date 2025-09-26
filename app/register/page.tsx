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
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4 text-white">Register</h2>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value as 'admin' | 'supervisor' | 'student' })}
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
          <option value="student">Student</option>
        </select>
        <input
          type="text"
          value={data.department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
          placeholder="Department"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          required
        />
        {data.role === 'student' && (
          <input
            type="text"
            value={data.matricNumber}
            onChange={(e) => setData({ ...data, matricNumber: e.target.value })}
            placeholder="Matric Number"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
        )}
        {data.role === 'supervisor' && (
          <input
            type="text"
            value={data.specialization}
            onChange={(e) => setData({ ...data, specialization: e.target.value })}
            placeholder="Specialization"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
        )}
        <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p className="mt-4 text-center">
          <Link href="/login" className="text-cta hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
