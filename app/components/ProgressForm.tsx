'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useProgress } from '@/hooks';

export default function ProgressForm({ projectId }: { projectId: string }) {
  const { user, submitProgress, addFeedback } = useApp();
  const { progress } = useProgress();
  const [report, setReport] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'student' || !report.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      submitProgress({
        studentId: user.id,
        projectId,
        report: report.trim(),
      });
      setReport('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleSubmitFeedback = async (e: React.FormEvent, progressId: string) => {
    e.preventDefault();
    if (!user || user.role !== 'supervisor' || !feedback.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addFeedback(progressId, feedback.trim());
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };

  // Get project progress reports for supervisors
  const projectProgress = progress.filter((p: any) => p.projectId === projectId);

  return (
    <div className="bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20">
      {user?.role === 'student' && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <span className="mr-3">📝</span>
            Submit Progress Report
          </h3>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Progress Report
              </label>
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Describe your progress, challenges, and achievements..."
                rows={6}
                className="w-full p-4 border border-gray-600 rounded-xl bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {report.length}/1000 characters
                </span>
                <span className="text-xs text-gray-400">
                  Be specific and detailed
                </span>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting || !report.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2">📤</span>
                  Submit Progress Report
                </div>
              )}
            </button>
          </form>
        </div>
      )}

      {user?.role === 'supervisor' && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <span className="mr-3">💬</span>
            Student Progress & Feedback
          </h3>
          
          {projectProgress.length > 0 ? (
            <div className="space-y-4">
              {projectProgress.map((prog: any) => (
                <div key={prog.id} className="bg-background/30 p-4 rounded-xl border border-gray-600/50">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Progress Report</span>
                      <span className="text-xs text-gray-400">
                        {new Date(prog.submissionDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white text-sm leading-relaxed">{prog.report}</p>
                  </div>
                  
                  {prog.feedback ? (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-green-400 text-sm font-medium">✅ Feedback Provided</span>
                      </div>
                      <p className="text-green-100 text-sm">{prog.feedback}</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmitFeedback(e, prog.id)} className="mt-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-300">
                          Provide Feedback
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Provide constructive feedback and guidance..."
                          rows={3}
                          className="w-full p-3 border border-gray-600 rounded-lg bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all resize-none"
                          required
                        />
                        <button 
                          type="submit" 
                          disabled={isSubmitting || !feedback.trim()}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <span className="mr-2">💬</span>
                              Submit Feedback
                            </div>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-3 block">📊</span>
              <p className="text-gray-300">No progress reports yet</p>
              <p className="text-gray-400 text-sm">Students will submit their progress here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
