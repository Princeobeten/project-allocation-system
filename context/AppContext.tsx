'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockUsers, 
  mockStudents, 
  mockSupervisors, 
  mockProjects, 
  mockAllocations, 
  mockProgress,
  User,
  Student,
  Supervisor,
  Project,
  Allocation,
  Progress
} from '@/lib/mockData';
import toast from 'react-hot-toast';

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
    const foundUser = users.find((u: any) => u.email === email && u.password === password && u.isActive);
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
    setStudents(students.map((s: any) => s.id === studentId ? { ...s, preference } : s));
    toast.success('Preference updated');
  };

  const addSupervisor = (newSupervisor: Omit<Supervisor, 'id'>) => {
    const newId = (supervisors.length + 1).toString();
    const supervisor = { ...newSupervisor, id: newId };
    setSupervisors([...supervisors, supervisor]);
    toast.success('Supervisor added');
  };

  const addProject = (newProject: Omit<Project, 'id' | 'status'>) => {
    const newId = (projects.length + 1).toString();
    const project = { ...newProject, id: newId, status: 'available' as const };
    setProjects([...projects, project]);
    setSupervisors(supervisors.map((s: any) => s.id === newProject.supervisorId ? { ...s, projectsCount: s.projectsCount + 1 } : s));
    toast.success('Project added');
  };

  const allocateProject = (studentId: string, projectId: string) => {
    const project = projects.find((p: any) => p.id === projectId);
    if (!project || project.status !== 'available') {
      toast.error('Project not available');
      return;
    }
    const newId = (allocations.length + 1).toString();
    const alloc = { id: newId, studentId, projectId, supervisorId: project.supervisorId };
    setAllocations([...allocations, alloc]);
    setProjects(projects.map((p: any) => p.id === projectId ? { ...p, status: 'assigned' as const } : p));
    setStudents(students.map((s: any) => s.id === studentId ? { ...s, assignedProject: projectId } : s));
    toast.success('Project allocated');
  };

  const submitProgress = (newProgress: Omit<Progress, 'id' | 'submissionDate'>) => {
    const newId = (progress.length + 1).toString();
    const prog = { ...newProgress, id: newId, submissionDate: new Date() };
    setProgress([...progress, prog]);
    toast.success('Progress submitted');
  };

  const addFeedback = (progressId: string, feedback: string) => {
    setProgress(progress.map((p: any) => p.id === progressId ? { ...p, feedback } : p));
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
