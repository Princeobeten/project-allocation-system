'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Project Allocation System</div>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-white hover:underline">Dashboard</Link>
              {user.role === 'student' && (
                <>
                  <Link href="/student" className="text-white hover:underline">My Projects</Link>
                </>
              )}
              {user.role === 'supervisor' && (
                <>
                  <Link href="/supervisor" className="text-white hover:underline">Manage Projects</Link>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <Link href="/admin/students" className="text-white hover:underline">Students</Link>
                  <Link href="/admin/supervisors" className="text-white hover:underline">Supervisors</Link>
                  <Link href="/admin/projects" className="text-white hover:underline">Projects</Link>
                </>
              )}
              <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:underline">Login</Link>
              <Link href="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
