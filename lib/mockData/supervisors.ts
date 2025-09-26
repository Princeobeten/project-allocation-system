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
