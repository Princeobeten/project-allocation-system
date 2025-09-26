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
  { id: '2', name: 'Dr. Jane Smith', email: 'supervisor@example.com', password: 'pass', role: 'supervisor', department: 'Computer Science', specialization: 'Artificial Intelligence', isActive: true },
  { id: '3', name: 'John Doe', email: 'student@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/001', isActive: true },
  { id: '4', name: 'Alice Brown', email: 'student2@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/002', isActive: true },
  { id: '5', name: 'Dr. Michael Johnson', email: 'mjohnson@example.com', password: 'pass', role: 'supervisor', department: 'Computer Science', specialization: 'Web Development', isActive: true },
  { id: '6', name: 'Dr. Sarah Wilson', email: 'swilson@example.com', password: 'pass', role: 'supervisor', department: 'Computer Science', specialization: 'Data Science', isActive: true },
  { id: '7', name: 'Dr. Robert Davis', email: 'rdavis@example.com', password: 'pass', role: 'supervisor', department: 'Computer Science', specialization: 'Cybersecurity', isActive: true },
  { id: '8', name: 'Emma Johnson', email: 'emma.j@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/003', isActive: true },
  { id: '9', name: 'David Wilson', email: 'david.w@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/004', isActive: true },
  { id: '10', name: 'Sophie Martinez', email: 'sophie.m@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/005', isActive: true },
  { id: '11', name: 'James Anderson', email: 'james.a@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/006', isActive: true },
  { id: '12', name: 'Olivia Taylor', email: 'olivia.t@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/007', isActive: true },
  { id: '13', name: 'Lucas Garcia', email: 'lucas.g@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/008', isActive: true },
  { id: '14', name: 'Maya Patel', email: 'maya.p@example.com', password: 'pass', role: 'student', department: 'Computer Science', matricNumber: '20/CS/009', isActive: true },
  { id: '15', name: 'Admin Two', email: 'admin2@example.com', password: 'pass', role: 'admin', department: 'Computer Science', isActive: true },
];
