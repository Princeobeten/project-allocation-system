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
