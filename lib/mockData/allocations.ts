export interface Allocation {
  id: string;
  studentId: string;
  projectId: string;
  supervisorId: string;
}

export const mockAllocations: Allocation[] = [
  { id: '1', studentId: '1', projectId: '1', supervisorId: '1' },
  { id: '2', studentId: '2', projectId: '2', supervisorId: '1' },
];
