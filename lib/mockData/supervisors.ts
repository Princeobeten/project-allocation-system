export interface Supervisor {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  projectsCount: number;
}

export const mockSupervisors: Supervisor[] = [
  { id: '1', userId: '2', name: 'Dr. Jane Smith', email: 'supervisor@example.com', department: 'Computer Science', projectsCount: 3 },
  { id: '2', userId: '5', name: 'Dr. Michael Johnson', email: 'mjohnson@example.com', department: 'Computer Science', projectsCount: 2 },
  { id: '3', userId: '6', name: 'Dr. Sarah Wilson', email: 'swilson@example.com', department: 'Computer Science', projectsCount: 2 },
  { id: '4', userId: '7', name: 'Dr. Robert Davis', email: 'rdavis@example.com', department: 'Computer Science', projectsCount: 1 },
];
