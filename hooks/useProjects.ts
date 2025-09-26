import { useApp } from '@/context/AppContext';

export function useProjects() {
  const { projects, addProject } = useApp();
  return { projects, addProject };
}
