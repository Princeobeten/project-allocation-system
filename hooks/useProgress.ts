import { useApp } from '@/context/AppContext';

export function useProgress() {
  const { progress, submitProgress, addFeedback } = useApp();
  return { progress, submitProgress, addFeedback };
}
