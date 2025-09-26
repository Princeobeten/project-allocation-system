export interface Progress {
  id: string;
  studentId: string;
  projectId: string;
  report: string;
  submissionDate: Date;
  feedback?: string;
}

export const mockProgress: Progress[] = [
  { 
    id: '1', 
    studentId: '1', 
    projectId: '1', 
    report: 'Completed initial research on NLP libraries and frameworks. Set up development environment with Python and TensorFlow. Created basic chatbot prototype with simple intent recognition.', 
    submissionDate: new Date('2024-01-15'), 
    feedback: 'Good progress! Consider exploring more advanced NLP models like BERT or GPT for better understanding. Focus on training data quality for next phase.' 
  },
  { 
    id: '2', 
    studentId: '1', 
    projectId: '1', 
    report: 'Implemented advanced intent classification using BERT model. Added conversation context management and integrated with customer service database. Achieved 85% accuracy in testing.', 
    submissionDate: new Date('2024-02-01'), 
    feedback: 'Excellent improvement! The accuracy is impressive. Next, work on response generation and handling edge cases.' 
  },
  { 
    id: '3', 
    studentId: '2', 
    projectId: '2', 
    report: 'Designed system architecture and database schema. Implemented user authentication and basic course management features. Created responsive UI using React and Tailwind CSS.', 
    submissionDate: new Date('2024-01-20'), 
    feedback: 'Solid foundation! The UI looks clean and professional. Consider adding more interactive elements for better user engagement.' 
  },
  { 
    id: '4', 
    studentId: '2', 
    projectId: '2', 
    report: 'Added video streaming functionality with progress tracking. Implemented quiz system with automatic grading. Integrated discussion forums and real-time notifications.', 
    submissionDate: new Date('2024-02-05'), 
    feedback: 'Great work on the interactive features! The video streaming works smoothly. Focus on performance optimization for the next milestone.' 
  },
];
