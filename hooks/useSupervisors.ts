import { useApp } from '@/context/AppContext';

export function useSupervisors() {
  const { supervisors, addSupervisor } = useApp();
  return { supervisors, addSupervisor };
}
