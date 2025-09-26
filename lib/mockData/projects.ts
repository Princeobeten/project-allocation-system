export interface Project {
  id: string;
  title: string;
  description: string;
  supervisorId: string;
  status: 'available' | 'assigned' | 'completed';
}

export const mockProjects: Project[] = [
  { id: '1', title: 'AI-Powered Customer Service Chatbot', description: 'Develop an intelligent chatbot using natural language processing to handle customer inquiries and provide automated support solutions.', supervisorId: '1', status: 'assigned' },
  { id: '2', title: 'Interactive E-Learning Platform', description: 'Create a comprehensive web-based learning management system with video streaming, quiz functionality, and progress tracking.', supervisorId: '1', status: 'assigned' },
  { id: '3', title: 'Smart Home IoT System', description: 'Design and implement an IoT-based smart home automation system with mobile app control and voice integration.', supervisorId: '1', status: 'available' },
  { id: '4', title: 'Real-Time Collaborative Code Editor', description: 'Build a web-based code editor with real-time collaboration features, syntax highlighting, and version control integration.', supervisorId: '2', status: 'available' },
  { id: '5', title: 'Progressive Web App for Task Management', description: 'Develop a PWA for task and project management with offline capabilities, push notifications, and team collaboration features.', supervisorId: '2', status: 'available' },
  { id: '6', title: 'Data Visualization Dashboard', description: 'Create an interactive dashboard for business intelligence with advanced charting, filtering, and real-time data updates.', supervisorId: '3', status: 'available' },
  { id: '7', title: 'Machine Learning Recommendation Engine', description: 'Build a recommendation system using collaborative filtering and content-based algorithms for e-commerce applications.', supervisorId: '3', status: 'available' },
  { id: '8', title: 'Cybersecurity Threat Detection System', description: 'Develop an AI-based system for detecting and analyzing cybersecurity threats in network traffic and system logs.', supervisorId: '4', status: 'available' },
];
