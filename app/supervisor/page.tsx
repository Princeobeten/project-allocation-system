'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import ProjectCard from '@/app/components/ProjectCard';
import ProgressForm from '@/app/components/ProgressForm';
import { useProjects, useAllocations, useProgress, useStudents } from '@/hooks';

export default function SupervisorPage() {
  const { user } = useApp();
  const { projects, addProject } = useProjects();
  const { allocations } = useAllocations();
  const { progress } = useProgress();
  const { students } = useStudents();
  const [projectData, setProjectData] = useState({ title: '', description: '' });

  if (user?.role !== 'supervisor') {
    return <div className="text-center text-red-500">Access denied. Supervisor only.</div>;
  }

  const supervisorProjects = projects.filter((p: any) => p.supervisorId === user.id);
  const supervisorAllocations = allocations.filter((a: any) => a.supervisorId === user.id);
  const supervisorProgress = progress.filter((p: any) => supervisorProjects.some((proj: any) => proj.id === p.projectId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title: projectData.title,
      description: projectData.description,
      supervisorId: user.id,
    });
    setProjectData({ title: '', description: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Projects</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Project</h2>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <textarea
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Project
          </button>
        </form>
        
        <h2 className="text-xl mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisorProjects.map((project: any) => (
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
          {supervisorAllocations.map((alloc: any) => {
            const student = students.find((s: any) => s.id === alloc.studentId);
            return (
              <div key={alloc.id} className="bg-primary p-4 rounded-lg shadow-md">
                <p><strong>Student:</strong> {student?.name}</p>
                <p><strong>Project:</strong> {projects.find((p: any) => p.id === alloc.projectId)?.title}</p>
              </div>
            );
          })}
        </div>
        
        <h2 className="text-xl mb-4 mt-8">Progress Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisorProgress.map((prog: any) => (
            <div key={prog.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Student:</strong> {students.find((s: any) => s.id === prog.studentId)?.name}</p>
              <p><strong>Project:</strong> {projects.find((p: any) => p.id === prog.projectId)?.title}</p>
              <p><strong>Report:</strong> {prog.report}</p>
              <p><strong>Date:</strong> {new Date(prog.submissionDate).toLocaleDateString()}</p>
              {prog.feedback && <p><strong>Feedback:</strong> {prog.feedback}</p>}
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}
