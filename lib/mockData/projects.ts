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
