import { useApp } from '@/context/AppContext';

export function useStudents() {
  const { students, addStudent, updateStudentPreference } = useApp();
  return { students, addStudent, updateStudentPreference };
}
