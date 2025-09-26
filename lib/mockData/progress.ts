export interface Progress {
  id: string;
  studentId: string;
  projectId: string;
  report: string;
  submissionDate: Date;
  feedback?: string;
}

export const mockProgress: Progress[] = [];
