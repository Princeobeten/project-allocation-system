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
