'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import ProjectCard from '@/app/components/ProjectCard';
import ProgressForm from '@/app/components/ProgressForm';
import { useStudents, useProjects, useProgress } from '@/hooks';

export default function StudentPage() {
  const { user } = useApp();
  const { students } = useStudents();
  const { projects } = useProjects();
  const { progress } = useProgress();
  const student = students.find((s: any) => s.userId === user?.id);

  if (user?.role !== 'student' || !student) {
    return <div className="text-center text-red-500">Access denied. Student only.</div>;
  }

  const assignedProject = projects.find((p: any) => p.id === student.assignedProject);
  const studentProgress = progress.filter((p: any) => p.studentId === student.id);

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">My Projects</h1>
        {assignedProject ? (
          <div>
            <ProjectCard project={assignedProject} />
            <div className="mt-6">
              <ProgressForm projectId={assignedProject.id} />
            </div>
            <h2 className="text-xl mb-4 mt-8">Progress Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentProgress.map((prog: any) => (
                <div key={prog.id} className="bg-primary p-4 rounded-lg shadow-md">
                  <p><strong>Report:</strong> {prog.report}</p>
                  <p><strong>Date:</strong> {new Date(prog.submissionDate).toLocaleDateString()}</p>
                  {prog.feedback && <p><strong>Feedback:</strong> {prog.feedback}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-primary p-6 rounded-lg shadow-md">
            <p>No project assigned yet. Please wait for allocation or contact your administrator.</p>
          </div>
        )}
      </div>
    </AuthCheck>
  );
}
