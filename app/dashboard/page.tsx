'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import ProjectCard from '@/app/components/ProjectCard';
import ProgressForm from '@/app/components/ProgressForm';
import { useStudents, useProjects, useAllocations, useProgress } from '@/hooks';

export default function DashboardPage() {
  const { user, updateStudentPreference } = useApp();
  const { students } = useStudents();
  const { projects } = useProjects();
  const { allocations } = useAllocations();
  const { progress } = useProgress();

  const userStudent = students.find((s: any) => s.userId === user?.id);
  const userAllocations = allocations.filter((a: any) => 
    user?.role === 'student' ? a.studentId === userStudent?.id : 
    user?.role === 'supervisor' ? a.supervisorId === user?.id : true
  );
  const userProjects = user?.role === 'student'
    ? projects.filter((p: any) => p.id === userStudent?.assignedProject)
    : user?.role === 'supervisor'
    ? projects.filter((p: any) => p.supervisorId === user?.id)
    : projects;

  const handlePreferenceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userStudent) return;
    const preference = (e.target as any).preference.value;
    updateStudentPreference(userStudent.id, preference);
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">
          {user?.role === 'admin' ? 'Admin Dashboard' : 
           user?.role === 'supervisor' ? 'Supervisor Dashboard' : 
           'Student Dashboard'}
        </h1>
        
        {user?.role === 'student' && userStudent && (
          <>
            <h2 className="text-xl mb-4">Set Project Preference</h2>
            <form onSubmit={handlePreferenceUpdate} className="bg-primary p-6 rounded-lg shadow-md mb-8">
              <input
                type="text"
                name="preference"
                defaultValue={userStudent.preference}
                placeholder="Project Preference"
                className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
              />
              <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
                Update Preference
              </button>
            </form>
            <h2 className="text-xl mb-4">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                  <div className="mt-4">
                    <ProgressForm projectId={project.id} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {user?.role === 'supervisor' && (
          <>
            <h2 className="text-xl mb-4">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                  <div className="mt-4">
                    <ProgressForm projectId={project.id} />
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-xl mb-4 mt-8">Assigned Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAllocations.map((alloc: any) => {
                const student = students.find((s: any) => s.id === alloc.studentId);
                return (
                  <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                    <p><strong>Student:</strong> {student?.name}</p>
                    <p><strong>Project:</strong> {projects.find((p: any) => p.id === alloc.projectId)?.title}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        
        {user?.role === 'admin' && (
          <>
            <h2 className="text-xl mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Students:</strong> {students.length}</p>
              </div>
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Supervisors:</strong> {useApp().supervisors.length}</p>
              </div>
              <div className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Projects:</strong> {projects.length}</p>
              </div>
            </div>
            <h2 className="text-xl mb-4 mt-8">Recent Allocations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allocations.map((alloc: any) => (
                <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                  <p><strong>Student:</strong> {students.find((s: any) => s.id === alloc.studentId)?.name}</p>
                  <p><strong>Project:</strong> {projects.find((p: any) => p.id === alloc.projectId)?.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AuthCheck>
  );
}
