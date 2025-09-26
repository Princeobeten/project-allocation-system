'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import { useProjects, useSupervisors, useAllocations, useStudents } from '@/hooks';
import ProjectCard from '@/app/components/ProjectCard';

export default function AdminProjectsPage() {
  const { user } = useApp();
  const { projects, addProject } = useProjects();
  const { supervisors } = useSupervisors();
  const { students } = useStudents();
  const { allocateProject } = useAllocations();
  const [projectData, setProjectData] = useState({ 
    title: '', 
    description: '', 
    supervisorId: '' 
  });
  const [allocationData, setAllocationData] = useState({ 
    studentId: '', 
    projectId: '' 
  });

  if (user?.role !== 'admin') {
    return <div className="text-center text-red-500">Access denied. Admin only.</div>;
  }

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title: projectData.title,
      description: projectData.description,
      supervisorId: projectData.supervisorId,
    });
    setProjectData({ title: '', description: '', supervisorId: '' });
  };

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    allocateProject(allocationData.studentId, allocationData.projectId);
    setAllocationData({ studentId: '', projectId: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Projects</h1>
        <form onSubmit={handleSubmitProject} className="bg-primary p-6 rounded-lg shadow-md mb-8">
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
          <select
            value={projectData.supervisorId}
            onChange={(e) => setProjectData({ ...projectData, supervisorId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((sup: any) => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Project
          </button>
        </form>
        
        <form onSubmit={handleAllocate} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Allocate Project</h2>
          <select
            value={allocationData.studentId}
            onChange={(e) => setAllocationData({ ...allocationData, studentId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          >
            <option value="">Select Student</option>
            {students.map((student: any) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            value={allocationData.projectId}
            onChange={(e) => setAllocationData({ ...allocationData, projectId: e.target.value })}
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          >
            <option value="">Select Project</option>
            {projects.filter((p: any) => p.status === 'available').map((project: any) => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Allocate
          </button>
        </form>
        
        <h2 className="text-xl mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}
