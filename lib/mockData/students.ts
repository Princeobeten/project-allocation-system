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
  { id: '1', userId: '3', name: 'John Doe', matricNumber: '20/CS/001', email: 'student@example.com', department: 'Computer Science', preference: 'Machine Learning and AI Applications', assignedProject: '1' },
  { id: '2', userId: '4', name: 'Alice Brown', matricNumber: '20/CS/002', email: 'student2@example.com', department: 'Computer Science', preference: 'Full-Stack Web Development', assignedProject: '2' },
  { id: '3', userId: '8', name: 'Emma Johnson', matricNumber: '20/CS/003', email: 'emma.j@example.com', department: 'Computer Science', preference: 'Data Analytics and Visualization' },
  { id: '4', userId: '9', name: 'David Wilson', matricNumber: '20/CS/004', email: 'david.w@example.com', department: 'Computer Science', preference: 'Cybersecurity and Network Security' },
  { id: '5', userId: '10', name: 'Sophie Martinez', matricNumber: '20/CS/005', email: 'sophie.m@example.com', department: 'Computer Science', preference: 'Mobile App Development' },
  { id: '6', userId: '11', name: 'James Anderson', matricNumber: '20/CS/006', email: 'james.a@example.com', department: 'Computer Science', preference: 'Cloud Computing and DevOps' },
  { id: '7', userId: '12', name: 'Olivia Taylor', matricNumber: '20/CS/007', email: 'olivia.t@example.com', department: 'Computer Science', preference: 'Artificial Intelligence Research' },
  { id: '8', userId: '13', name: 'Lucas Garcia', matricNumber: '20/CS/008', email: 'lucas.g@example.com', department: 'Computer Science', preference: 'Game Development and Graphics' },
  { id: '9', userId: '14', name: 'Maya Patel', matricNumber: '20/CS/009', email: 'maya.p@example.com', department: 'Computer Science', preference: 'Blockchain and Cryptocurrency' },
];
