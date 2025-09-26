'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useApp();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return '🛠️';
      case 'supervisor':
        return '👨‍🏫';
      case 'student':
        return '👨‍🎓';
      default:
        return '👤';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'supervisor':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'student':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <nav className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 backdrop-blur-sm border-b border-primary/20 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-cta to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl group-hover:text-cta transition-colors">
                ProjectHub
              </h1>
              <p className="text-gray-300 text-xs hidden sm:block">Allocation System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                      <span className="mr-1">{getRoleIcon(user.role)}</span>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-cta to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:text-cta transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2"
                  >
                    <span>🏠</span>
                    <span>Dashboard</span>
                  </Link>

                  {user.role === 'admin' && (
                    <div className="relative group">
                      <button className="text-white hover:text-cta transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2">
                        <span>⚙️</span>
                        <span>Admin</span>
                        <span className="text-xs">▼</span>
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-primary/95 backdrop-blur-sm border border-primary/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <Link href="/admin/students" className="block px-4 py-3 text-white hover:text-cta hover:bg-white/10 transition-colors border-b border-gray-600/30">
                          <div className="flex items-center space-x-2">
                            <span>👨‍🎓</span>
                            <span>Students</span>
                          </div>
                        </Link>
                        <Link href="/admin/supervisors" className="block px-4 py-3 text-white hover:text-cta hover:bg-white/10 transition-colors border-b border-gray-600/30">
                          <div className="flex items-center space-x-2">
                            <span>👨‍🏫</span>
                            <span>Supervisors</span>
                          </div>
                        </Link>
                        <Link href="/admin/projects" className="block px-4 py-3 text-white hover:text-cta hover:bg-white/10 transition-colors">
                          <div className="flex items-center space-x-2">
                            <span>📚</span>
                            <span>Projects</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {user.role === 'supervisor' && (
                    <Link 
                      href="/supervisor" 
                      className="text-white hover:text-cta transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2"
                    >
                      <span>📚</span>
                      <span>My Projects</span>
                    </Link>
                  )}

                  {user.role === 'student' && (
                    <Link 
                      href="/student" 
                      className="text-white hover:text-cta transition-colors px-3 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2"
                    >
                      <span>📖</span>
                      <span>My Projects</span>
                    </Link>
                  )}

                  <button 
                    onClick={handleLogout}
                    className="text-white hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10 flex items-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="text-white hover:text-cta transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-gradient-to-r from-cta to-blue-600 hover:from-cta-hover hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-cta transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/20 py-4">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-cta to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                      <span className="mr-1">{getRoleIcon(user.role)}</span>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link href="/dashboard" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                    🏠 Dashboard
                  </Link>
                  
                  {user.role === 'admin' && (
                    <>
                      <Link href="/admin/students" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                        👨‍🎓 Students
                      </Link>
                      <Link href="/admin/supervisors" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                        👨‍🏫 Supervisors
                      </Link>
                      <Link href="/admin/projects" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                        📚 Projects
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'supervisor' && (
                    <Link href="/supervisor" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                      📚 My Projects
                    </Link>
                  )}
                  
                  {user.role === 'student' && (
                    <Link href="/student" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                      📖 My Projects
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="block px-4 py-2 text-white hover:text-cta hover:bg-white/10 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
