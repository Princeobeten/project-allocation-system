import { useApp } from '@/context/AppContext';

export function useAllocations() {
  const { allocations, allocateProject } = useApp();
  return { allocations, allocateProject };
}
