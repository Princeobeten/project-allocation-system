Student Project Allocation & Management System – Minimal Prototype
A minimal web-based system to automate project allocation, progress tracking, and communication between students, supervisors, and administrators for a university setting. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and mock data using React Context + Hooks for all data operations (⚠️ no API routes, no MongoDB – pure mock for speed). Data persists in localStorage for session continuity.
🚀 Features (MVP)

Student Registration & Login: Students register with project preferences (mock auth, creates mock user and student records).
Supervisor Project Creation: Supervisors create projects with titles and descriptions (update mock data).
Automatic Project Allocation: Simulate allocation based on student preferences and supervisor capacity (mock logic in context).
Progress Submission & Feedback: Students submit progress reports, supervisors provide feedback (mock CRUD, in-memory state).
Notifications Panel: UI toasts (via react-hot-toast) for allocation confirmations, progress updates, and feedback.
Role-Based Authentication: Mock authentication for admin, supervisor, and student roles.
LocalStorage Persistence: Mock data saved across sessions for seamless user experience.

🛠 Tech Stack

Frontend: Next.js 14 (React + TypeScript), Tailwind CSS
Data: Mock data (no MongoDB/Mongoose – static in-memory objects for rapid prototyping)
State Management: React Context API
Notifications: react-hot-toast
Data Access: Custom hooks for CRUD operations (direct context, no API routes)
Deployment: Vercel

📂 Project Structure
/student-project-system
│── /app                  # Next.js app directory (App Router)
│   ├── /components       # Reusable UI components
│   │   ├── Navbar.tsx    # Navigation bar with role-based links
│   │   ├── ProjectCard.tsx # Display project details
│   │   ├── ProgressForm.tsx # Form for progress submission/feedback
│   │   └── AuthCheck.tsx # Protect routes
│   ├── /admin            # Admin pages
│   │   ├── /students     # Student management
│   │   ├── /supervisors  # Supervisor management
│   │   └── /projects     # Project management
│   ├── /dashboard        # Role-based dashboard
│   ├── /login            # Login page
│   ├── /register         # User registration (admin creates users)
│   ├── /student          # Student pages (view projects, submit progress)
│   ├── /supervisor       # Supervisor pages (create projects, give feedback)
│   └── layout.tsx        # Root layout with AppProvider and Toaster
│
│── /context
│   └── AppContext.tsx    # Global context for mock data & state
│
│── /hooks
│   ├── useStudents.ts    # Mock CRUD for students
│   ├── useSupervisors.ts # Mock CRUD for supervisors
│   ├── useProjects.ts    # Mock CRUD for projects
│   ├── useAllocations.ts # Mock CRUD for allocations
│   └── useProgress.ts    # Mock CRUD for progress
│
│── /lib
│   └── /mockData         # Static mock data
│       ├── users.ts      # Mock users (authentication)
│       ├── students.ts   # Mock students
│       ├── supervisors.ts # Mock supervisors
│       ├── projects.ts   # Mock projects
│       ├── allocations.ts # Mock allocations
│       └── progress.ts   # Mock progress
│
│── /public               # Static assets (e.g., icons)
│── next.config.js        # Next.js config
│── tailwind.config.js    # Tailwind CSS config with custom colors
│── package.json
└── README.md

🗄️ Mock Data Models (in /lib/mockData)
User (users.ts) - Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Plain text for mock (MVP only)
  role: 'admin' | 'supervisor' | 'student';
  department: string;
  matricNumber?: string; // For students
  specialization?: string; // For supervisors
  isActive: boolean;
}

export const mockUsers: User[] = [
  { id: '1', name: 'Admin One', email: 'admin@example.com', password: 'pass', role: 'admin', department: 'Computer Science', isActive: true },
  { id: '2', name: 'Dr. Jane Smith', email: 'supervisor@example.com', password: 'pass', role: 'supervisor', department: 'Computer Science', specialization: 'AI', isActive: true },
  { id: '3', name: 'John Doe', email: 'student@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/001', isActive: true },
  { id: '4', name: 'Alice Brown', email: 'student2@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/002', isActive: true },
];

Student (students.ts)
export interface Student {
  id: string;
  userId: string;
  name: string;
  matricNumber: string;
  email: string;
  department: string;
  preference: string;
  assignedProject?: string; // Project ID
}

export const mockStudents: Student[] = [
  { id: '1', userId: '3', name: 'John Doe', matricNumber: '20/CS/001', email: 'student@example.com', department: 'Computer Science', preference: 'AI Project' },
  { id: '2', userId: '4', name: 'Alice Brown', matricNumber: '20/CS/002', email: 'student2@example.com', department: 'Computer Science', preference: 'Web Development' },
];

Supervisor (supervisors.ts)
export interface Supervisor {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  projectsCount: number;
}

export const mockSupervisors: Supervisor[] = [
  { id: '1', userId: '2', name: 'Dr. Jane Smith', email: 'supervisor@example.com', department: 'Computer Science', projectsCount: 1 },
];

Project (projects.ts)
export interface Project {
  id: string;
  title: string;
  description: string;
  supervisorId: string;
  status: 'available' | 'assigned' | 'completed';
}

export const mockProjects: Project[] = [
  { id: '1', title: 'AI Chatbot', description: 'Build an AI-powered chatbot', supervisorId: '1', status: 'available' },
  { id: '2', title: 'E-Learning Platform', description: 'Develop a web-based learning system', supervisorId: '1', status: 'available' },
];

Allocation (allocations.ts)
export interface Allocation {
  id: string;
  studentId: string;
  projectId: string;
  supervisorId: string;
}

export const mockAllocations: Allocation[] = [];

Progress (progress.ts)
export interface Progress {
  id: string;
  studentId: string;
  projectId: string;
  report: string;
  submissionDate: Date;
  feedback?: string;
}

export const mockProgress: Progress[] = [];

📝 Minimal User Flows
Student

Register via /register (creates user and student record, saved in localStorage).
Login via /login (mock auth, email: student@example.com, password: pass).
Set project preferences on /student (update mock student record).
View allocated project on /dashboard (filter mock allocations).
Submit progress reports on /student (add to mock progress).

Supervisor

Login via /login (email: supervisor@example.com, password: pass).
Create projects on /supervisor (add to mock projects).
View assigned students on /dashboard (filter mock allocations).
Provide feedback on progress reports on /supervisor (update mock progress).

Admin

Login via /login (email: admin@example.com, password: pass).
Manage students, supervisors, projects via /admin/students, /admin/supervisors, /admin/projects (CRUD on mock data).
Monitor allocations and progress on /dashboard (view aggregated mock data).
Create users via /register (admin only).

🎨 Color Scheme

Text: #ffffff (white, text-white) – Headings, labels.
Foreground: #152345 (dark blue-gray, bg-primary, border-primary) – Cards, inputs.
CTA: #2563eb (blue, bg-cta, hover:bg-cta-hover) – Buttons.
Background: #111827 (dark gray, bg-background) – Page background.

⚙️ Setup & Installation
# Clone repo (assuming Next.js 14 + Tailwind CSS already set up)
git clone <repo-url>
cd student-project-system

# Install additional dependency
npm install react-hot-toast

# Run dev server (no .env needed – mock data)
npm run dev

Development Plan (Waterfall Methodology)
Phase 1: Setup

Confirm Setup: Ensure Next.js 14 (App Router) and Tailwind CSS are configured.
Add Tailwind Config (tailwind.config.js):/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#152345',
        cta: '#2563eb',
        'cta-hover': '#1d4ed8',
        background: '#111827',
      },
    },
  },
  plugins: [],
};


Add Global CSS (app/globals.css):@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-background text-white;
}



Phase 2: Mock Data & Context

Create Mock Data (/lib/mockData): Implement users.ts, students.ts, supervisors.ts, projects.ts, allocations.ts, progress.ts as shown above.
Implement Context (context/AppContext.tsx):'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockStudents, mockSupervisors, mockProjects, mockAllocations, mockProgress } from '@/lib/mockData';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'supervisor' | 'student';
  department: string;
  matricNumber?: string;
  specialization?: string;
  isActive: boolean;
}

interface Student {
  id: string;
  userId: string;
  name: string;
  matricNumber: string;
  email: string;
  department: string;
  preference: string;
  assignedProject?: string;
}

interface Supervisor {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  projectsCount: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  supervisorId: string;
  status: 'available' | 'assigned' | 'completed';
}

interface Allocation {
  id: string;
  studentId: string;
  projectId: string;
  supervisorId: string;
}

interface Progress {
  id: string;
  studentId: string;
  projectId: string;
  report: string;
  submissionDate: Date;
  feedback?: string;
}

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockUsers');
      return stored ? JSON.parse(stored) : mockUsers;
    }
    return mockUsers;
  });
  const [students, setStudents] = useState<Student[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockStudents');
      return stored ? JSON.parse(stored) : mockStudents;
    }
    return mockStudents;
  });
  const [supervisors, setSupervisors] = useState<Supervisor[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockSupervisors');
      return stored ? JSON.parse(stored) : mockSupervisors;
    }
    return mockSupervisors;
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockProjects');
      return stored ? JSON.parse(stored) : mockProjects;
    }
    return mockProjects;
  });
  const [allocations, setAllocations] = useState<Allocation[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockAllocations');
      return stored ? JSON.parse(stored) : mockAllocations;
    }
    return mockAllocations;
  });
  const [progress, setProgress] = useState<Progress[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockProgress');
      return stored ? JSON.parse(stored) : mockProgress;
    }
    return mockProgress;
  });
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockUsers', JSON.stringify(users));
      localStorage.setItem('mockStudents', JSON.stringify(students));
      localStorage.setItem('mockSupervisors', JSON.stringify(supervisors));
      localStorage.setItem('mockProjects', JSON.stringify(projects));
      localStorage.setItem('mockAllocations', JSON.stringify(allocations));
      localStorage.setItem('mockProgress', JSON.stringify(progress));
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
    }
  }, [users, students, supervisors, projects, allocations, progress, user]);

  const addUser = (newUser: Omit<User, 'id'>) => {
    const newId = (users.length + 1).toString();
    const userToAdd = { ...newUser, id: newId, isActive: true };
    setUsers([...users, userToAdd]);
    if (newUser.role === 'student') {
      addStudent({
        userId: newId,
        name: newUser.name,
        matricNumber: newUser.matricNumber || '',
        email: newUser.email,
        department: newUser.department,
        preference: '',
      });
    } else if (newUser.role === 'supervisor') {
      addSupervisor({
        userId: newId,
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        projectsCount: 0,
      });
    }
    toast.success('User registered');
  };

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password && u.isActive);
    if (foundUser) {
      setUser(foundUser);
      toast.success(`Logged in as ${foundUser.role}`);
      return { success: true };
    }
    toast.error('Invalid credentials');
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem('user');
    toast.success('Logged out');
  };

  const addStudent = (newStudent: Omit<Student, 'id'>) => {
    const newId = (students.length + 1).toString();
    const student = { ...newStudent, id: newId };
    setStudents([...students, student]);
    toast.success('Student added');
  };

  const updateStudentPreference = (studentId: string, preference: string) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, preference } : s));
    toast.success('Preference updated');
  };

  const addSupervisor = (newSupervisor: Omit<Supervisor, 'id'>) => {
    const newId = (supervisors.length + 1).toString();
    const supervisor = { ...newSupervisor, id: newId };
    setSupervisors([...supervisors, supervisor]);
    toast.success('Supervisor added');
  };

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const newId = (projects.length + 1).toString();
    const project = { ...newProject, id: newId, status: 'available' as const };
    setProjects([...projects, project]);
    setSupervisors(supervisors.map(s => s.id === newProject.supervisorId ? { ...s, projectsCount: s.projectsCount + 1 } : s));
    toast.success('Project added');
  };

  const allocateProject = (studentId: string, projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || project.status !== 'available') {
      toast.error('Project not available');
      return;
    }
    const newId = (allocations.length + 1).toString();
    const alloc = { id: newId, studentId, projectId, supervisorId: project.supervisorId };
    setAllocations([...allocations, alloc]);
    setProjects(projects.map(p => p.id === projectId ? { ...p, status: 'assigned' as const } : p));
    setStudents(students.map(s => s.id === studentId ? { ...s, assignedProject: projectId } : s));
    toast.success('Project allocated');
  };

  const submitProgress = (newProgress: Omit<Progress, 'id' | 'submissionDate'>) => {
    const newId = (progress.length + 1).toString();
    const prog = { ...newProgress, id: newId, submissionDate: new Date() };
    setProgress([...progress, prog]);
    toast.success('Progress submitted');
  };

  const addFeedback = (progressId: string, feedback: string) => {
    setProgress(progress.map(p => p.id === progressId ? { ...p, feedback } : p));
    toast.success('Feedback added');
  };

  return (
    <AppContext.Provider
      value={{
        users,
        students,
        supervisors,
        projects,
        allocations,
        progress,
        user,
        addUser,
        login,
        logout,
        addStudent,
        updateStudentPreference,
        addSupervisor,
        addProject,
        allocateProject,
        submitProgress,
        addFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}



Phase 3: Hooks

Create Hooks (/hooks):
useStudents.ts:import { useApp } from '@/context/AppContext';

export function useStudents() {
  const { students, addStudent, updateStudentPreference } = useApp();
  return { students, addStudent, updateStudentPreference };
}


useSupervisors.ts:import { useApp } from '@/context/AppContext';

export function useSupervisors() {
  const { supervisors, addSupervisor } = useApp();
  return { supervisors, addSupervisor };
}


useProjects.ts:import { useApp } from '@/context/AppContext';

export function useProjects() {
  const { projects, addProject } = useApp();
  return { projects, addProject };
}


useAllocations.ts:import { useApp } from '@/context/AppContext';

export function useAllocations() {
  const { allocations, allocateProject } = useApp();
  return { allocations, allocateProject };
}


useProgress.ts:import { useApp } from '@/context/AppContext';

export function useProgress() {
  const { progress, submitProgress, addFeedback } = useApp();
  return { progress, submitProgress, addFeedback };
}





Phase 4: Components & Pages

Components (/app/components):

Navbar.tsx:'use client';
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


ProjectCard.tsx:import { Project } from '@/lib/mockData/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-primary p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <p><strong>Title:</strong> {project.title}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Status:</strong> {project.status}</p>
    </div>
  );
}


ProgressForm.tsx:'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ProgressForm({ projectId }: { projectId: string }) {
  const { user, submitProgress, addFeedback } = useApp();
  const [report, setReport] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'student') return;
    submitProgress({
      studentId: user.id,
      projectId,
      report,
    });
    setReport('');
  };

  const handleSubmitFeedback = (e: React.FormEvent, progressId: string) => {
    e.preventDefault();
    if (!user || user.role !== 'supervisor') return;
    addFeedback(progressId, feedback);
    setFeedback('');
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-md">
      {user?.role === 'student' && (
        <form onSubmit={handleSubmitReport}>
          <h2 className="text-xl mb-4">Submit Progress</h2>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Progress Report"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      )}
      {user?.role === 'supervisor' && (
        <form onSubmit={(e) => handleSubmitFeedback(e, projectId)}>
          <h2 className="text-xl mb-4">Provide Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Feedback"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}


AuthCheck.tsx:'use client';
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




Pages (/app):

layout.tsx:import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <Toaster position="top-right" toastOptions={{ style: { background: '#152345', color: '#ffffff' } }} />
        </AppProvider>
      </body>
    </html>
  );
}


login/page.tsx:'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

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
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
        />
        <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <p className="mt-4 text-center">
          <Link href="/register" className="text-cta hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}


register/page.tsx:'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        />
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
        />
        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value as 'admin' | 'supervisor' | 'student' })}
          className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
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
        />
        {data.role === 'student' && (
          <input
            type="text"
            value={data.matricNumber}
            onChange={(e) => setData({ ...data, matricNumber: e.target.value })}
            placeholder="Matric Number"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
        )}
        {data.role === 'supervisor' && (
          <input
            type="text"
            value={data.specialization}
            onChange={(e) => setData({ ...data, specialization: e.target.value })}
            placeholder="Specialization"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
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


dashboard/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import ProjectCard from '@/components/ProjectCard';
import ProgressForm from '@/components/ProgressForm';
import { useStudents, useProjects, useAllocations, useProgress } from '@/hooks';

export default function DashboardPage() {
  const { user } = useApp();
  const { students } = useStudents();
  const { projects } = useProjects();
  const { allocations } = useAllocations();
  const { progress } = useProgress();

  const userStudent = students.find(s => s.userId === user?.id);
  const userAllocations = allocations.filter(a => user?.role === 'student' ? a.studentId === userStudent?.id : a.supervisorId === user?.id);
  const userProjects = user?.role === 'student'
    ? projects.filter(p => p.id === userStudent?.assignedProject)
    : user?.role === 'supervisor'
    ? projects.filter(p => p.supervisorId === user?.id)
    : projects;

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">{user?.role === 'admin' ? 'Admin Dashboard' : user?.role === 'supervisor' ? 'Supervisor Dashboard' : 'Student Dashboard'}</h1>
        {user?.role === 'student' && userStudent && (
          <>
            <h2 className="text-xl mb-4">Set Project Preference</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const preference = (e.target as any).preference.value;
              useApp().updateStudentPreference(userStudent.id, preference);
            }} className="bg-primary p-6 rounded-lg shadow-md mb-8">
              <input
                type="text"
                name="preference"
                defaultValue={userStudent.preference}
                placeholder="Project Preference"
                className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
              />
              <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
                Update Preference
              </button>
            </form>
            <h2 className="text-xl mb-4">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map(project => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                  <ProgressForm projectId={project.id} />
                </div>
              ))}
            </div>
          </>
        )}
        {user?.role === 'supervisor' && (
          <>
            <h2 className="text-xl mb-4">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map(project => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                  <ProgressForm projectId={project.id} />
                </div>
              ))}
            </div>
            <h2 className="text-xl mb-4 mt-8">Assigned Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAllocations.map(alloc => {
                const student = students.find(s => s.id === alloc.studentId);
                return (
                  <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                    <p><strong>Student:</strong> {student?.name}</p>
                    <p><strong>Project:</strong> {projects.find(p => p.id === alloc.projectId)?.title}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <h2 className="text-xl mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Students:</strong> {students.length}</p>
              </div>
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Supervisors:</strong> {supervisors.length}</p>
              </div>
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Projects:</strong> {projects.length}</p>
              </div>
            </div>
            <h2 className="text-xl mb-4 mt-8">Recent Allocations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allocations.map(alloc => (
                <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                  <p><strong>Student:</strong> {students.find(s => s.id === alloc.studentId)?.name}</p>
                  <p><strong>Project:</strong> {projects.find(p => p.id === alloc.projectId)?.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AuthCheck>
  );
}


admin/students/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import { useStudents } from '@/hooks/useStudents';

export default function AdminStudentsPage() {
  const { user } = useApp();
  const { students, addStudent } = useStudents();
  const [studentData, setStudentData] = useState({ name: '', matricNumber: '', email: '', department: '', preference: '' });

  if (user?.role !== 'admin') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      userId: (students.length + 1).toString(),
      name: studentData.name,
      matricNumber: studentData.matricNumber,
      email: studentData.email,
      department: studentData.department,
      preference: studentData.preference,
    });
    setStudentData({ name: '', matricNumber: '', email: '', department: '', preference: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Students</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Student</h2>
          <input
            type="text"
            value={studentData.name}
            onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="text"
            value={studentData.matricNumber}
            onChange={(e) => setStudentData({ ...studentData, matricNumber: e.target.value })}
            placeholder="Matric Number"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="email"
            value={studentData.email}
            onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="text"
            value={studentData.department}
            onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
            placeholder="Department"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="text"
            value={studentData.preference}
            onChange={(e) => setStudentData({ ...studentData, preference: e.target.value })}
            placeholder="Project Preference"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Student
          </button>
        </form>
        <h2 className="text-xl mb-4">Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map(student => (
            <div key={student.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Matric Number:</strong> {student.matricNumber}</p>
              <p><strong>Preference:</strong> {student.preference}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}


admin/supervisors/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import { useSupervisors } from '@/hooks/useSupervisors';

export default function AdminSupervisorsPage() {
  const { user } = useApp();
  const { supervisors, addSupervisor } = useSupervisors();
  const [supervisorData, setSupervisorData] = useState({ name: '', email: '', department: '', projectsCount: 0 });

  if (user?.role !== 'admin') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupervisor({
      userId: (supervisors.length + 1).toString(),
      name: supervisorData.name,
      email: supervisorData.email,
      department: supervisorData.department,
      projectsCount: supervisorData.projectsCount,
    });
    setSupervisorData({ name: '', email: '', department: '', projectsCount: 0 });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Supervisors</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Supervisor</h2>
          <input
            type="text"
            value={supervisorData.name}
            onChange={(e) => setSupervisorData({ ...supervisorData, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="email"
            value={supervisorData.email}
            onChange={(e) => setSupervisorData({ ...supervisorData, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <input
            type="text"
            value={supervisorData.department}
            onChange={(e) => setSupervisorData({ ...supervisorData, department: e.target.value })}
            placeholder="Department"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Supervisor
          </button>
        </form>
        <h2 className="text-xl mb-4">Supervisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisors.map(supervisor => (
            <div key={supervisor.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {supervisor.name}</p>
              <p><strong>Email:</strong> {supervisor.email}</p>
              <p><strong>Projects:</strong> {supervisor.projectsCount}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}


admin/projects/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import { useProjects, useSupervisors, useAllocations } from '@/hooks';
import ProjectCard from '@/components/ProjectCard';

export default function AdminProjectsPage() {
  const { user } = useApp();
  const { projects, addProject } = useProjects();
  const { supervisors } = useSupervisors();
  const { allocateProject } = useAllocations();
  const [projectData, setProjectData] = useState({ title: '', description: '', supervisorId: '' });
  const [allocationData, setAllocationData] = useState({ studentId: '', projectId: '' });

  if (user?.role !== 'admin') {
    return null;
  }

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title: projectData.title,
      description: projectData.description,
      supervisorId: projectData.supervisorId,
    });
    setProjectData({ title: '', description: '', supervisorId: '' });
  };

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    allocateProject(allocationData.studentId, allocationData.projectId);
    setAllocationData({ studentId: '', projectId: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Projects</h1>
        <form onSubmit={handleSubmitProject} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Project</h2>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <textarea
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <select
            value={projectData.supervisorId}
            onChange={(e) => setProjectData({ ...projectData, supervisorId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          >
            <option value="">Select Supervisor</option>
            {supervisors.map(sup => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Project
          </button>
        </form>
        <form onSubmit={handleAllocate} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Allocate Project</h2>
          <select
            value={allocationData.studentId}
            onChange={(e) => setAllocationData({ ...allocationData, studentId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            value={allocationData.projectId}
            onChange={(e) => setAllocationData({ ...allocationData, projectId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          >
            <option value="">Select Project</option>
            {projects.filter(p => p.status === 'available').map(project => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Allocate
          </button>
        </form>
        <h2 className="text-xl mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}


student/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import ProjectCard from '@/components/ProjectCard';
import ProgressForm from '@/components/ProgressForm';
import { useStudents, useProjects, useProgress } from '@/hooks';

export default function StudentPage() {
  const { user } = useApp();
  const { students } = useStudents();
  const { projects } = useProjects();
  const { progress } = useProgress();
  const student = students.find(s => s.userId === user?.id);

  if (user?.role !== 'student' || !student) {
    return null;
  }

  const assignedProject = projects.find(p => p.id === student.assignedProject);
  const studentProgress = progress.filter(p => p.studentId === student.id);

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">My Projects</h1>
        {assignedProject ? (
          <div>
            <ProjectCard project={assignedProject} />
            <ProgressForm projectId={assignedProject.id} />
            <h2 className="text-xl mb-4 mt-8">Progress Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentProgress.map(prog => (
                <div key={prog.id} className="bg-primary p-4 rounded-lg shadow-md">
                  <p><strong>Report:</strong> {prog.report}</p>
                  <p><strong>Date:</strong> {new Date(prog.submissionDate).toLocaleDateString()}</p>
                  {prog.feedback && <p><strong>Feedback:</strong> {prog.feedback}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No project assigned yet.</p>
        )}
      </div>
    </AuthCheck>
  );
}


supervisor/page.tsx:'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/components/AuthCheck';
import ProjectCard from '@/components/ProjectCard';
import ProgressForm from '@/components/ProgressForm';
import { useProjects, useAllocations, useProgress, useStudents } from '@/hooks';

export default function SupervisorPage() {
  const { user } = useApp();
  const { projects, addProject } = useProjects();
  const { allocations } = useAllocations();
  const { progress } = useProgress();
  const { students } = useStudents();
  const [projectData, setProjectData] = useState({ title: '', description: '' });

  if (user?.role !== 'supervisor') {
    return null;
  }

  const supervisorProjects = projects.filter(p => p.supervisorId === user.id);
  const supervisorAllocations = allocations.filter(a => a.supervisorId === user.id);
  const supervisorProgress = progress.filter(p => supervisorProjects.some(proj => proj.id === p.projectId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title: projectData.title,
      description: projectData.description,
      supervisorId: user.id,
    });
    setProjectData({ title: '', description: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Projects</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Project</h2>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <textarea
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Project
          </button>
        </form>
        <h2 className="text-xl mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisorProjects.map(project => (
            <div key={project.id}>
              <ProjectCard project={project} />
              <ProgressForm projectId={project.id} />
            </div>
          ))}
        </div>
        <h2 className="text-xl mb-4 mt-8">Assigned Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisorAllocations.map(alloc => {
            const student = students.find(s => s.id === alloc.studentId);
            return (
              <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Student:</strong> {student?.name}</p>
                <p><strong>Project:</strong> {projects.find(p => p.id === alloc.projectId)?.title}</p>
              </div>
            );
          })}
        </div>
        <h2 className="text-xl mb-4 mt-8">Progress Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisorProgress.map(prog => (
            <div key={prog.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Student:</strong> {students.find(s => s.id === prog.studentId)?.name}</p>
              <p><strong>Project:</strong> {projects.find(p => p.id === prog.projectId)?.title}</p>
              <p><strong>Report:</strong> {prog.report}</p>
              <p><strong>Date:</strong> {new Date(prog.submissionDate).toLocaleDateString()}</p>
              {prog.feedback && <p><strong>Feedback:</strong> {prog.feedback}</p>}
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}





Phase 5: Testing

Unit Tests:
Install Jest: npm install --save-dev jest @types/jest ts-jest.
Configure jest.config.js and test context functions (e.g., addUser, allocateProject).
Example test:import { renderHook, act } from '@testing-library/react-hooks';
import { AppProvider, useApp } from '@/context/AppContext';

test('should add user', () => {
  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;
  const { result } = renderHook(() => useApp(), { wrapper });
  act(() => {
    result.current.addUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      role: 'student',
      department: 'CS',
      matricNumber: '20/CS/003',
    });
  });
  expect(result.current.users).toHaveLength(5); // Initial 4 + new user
});




UI Tests:
Test flows:
Admin: Register user (admin@example.com/pass), add student/supervisor, allocate project.
Student: Login (student@example.com/pass), set preference, submit progress.
Supervisor: Login (supervisor@example.com/pass), add project, view students, add feedback.


Verify localStorage: Check mockUsers, mockStudents, etc., after actions.
Test navigation: Ensure Link components work (no conflicts, based on past navigation issues).


Error Handling:
Toasts for invalid actions (e.g., "Project not available", "Invalid credentials").
Role-based access: Prevent unauthorized actions (e.g., student can't add projects).


LocalStorage Sync: Verify data persists after page refresh.

Phase 6: Deployment

Deploy to Vercel:
Run vercel --prod (no env vars needed for mock data).
Verify live site: UI, mock data persistence, navigation.


Demo Instructions:
Use credentials:
Admin: admin@example.com/pass
Supervisor: supervisor@example.com/pass
Student: student@example.com/pass


Test flows: Register users, create projects, allocate projects, submit progress.



🎯 GoalShip a functional MVP in minutes: Mock-powered project allocation system with a modern, responsive dashboard (text: #ffffff, foreground: #152345, CTA: #2563eb, background: #111827). Fully tested, no errors, with localStorage syncing for persistence. Extend with MongoDB later.
🔧 Troubleshooting

Navigation Issues: If Link components fail (based on past issues), ensure no custom router conflicts and use next/navigation correctly.
LocalStorage Errors: Ensure typeof window !== 'undefined' checks to avoid server-side errors.
Type Errors: Use consistent interfaces across context and hooks (aligned with mockData types).
