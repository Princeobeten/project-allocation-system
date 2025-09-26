'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ProgressForm({ projectId }: { projectId: string }) {
  const { user, submitProgress, addFeedback } = useApp();
  const [report, setReport] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'student') return;
    submitProgress({
      studentId: user.id,
      projectId,
      report,
    });
    setReport('');
  };

  const handleSubmitFeedback = (e: React.FormEvent, progressId: string) => {
    e.preventDefault();
    if (!user || user.role !== 'supervisor') return;
    addFeedback(progressId, feedback);
    setFeedback('');
  };

  return (
    <div className="bg-primary p-6 rounded-lg shadow-md">
      {user?.role === 'student' && (
        <form onSubmit={handleSubmitReport}>
          <h2 className="text-xl mb-4">Submit Progress</h2>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Progress Report"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      )}
      {user?.role === 'supervisor' && (
        <form onSubmit={(e) => handleSubmitFeedback(e, projectId)}>
          <h2 className="text-xl mb-4">Provide Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Feedback"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
