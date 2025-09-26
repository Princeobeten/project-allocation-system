'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import { useSupervisors } from '@/hooks/useSupervisors';

export default function AdminSupervisorsPage() {
  const { user } = useApp();
  const { supervisors, addSupervisor } = useSupervisors();
  const [supervisorData, setSupervisorData] = useState({ 
    name: '', 
    email: '', 
    department: '', 
    projectsCount: 0 
  });

  if (user?.role !== 'admin') {
    return <div className="text-center text-red-500">Access denied. Admin only.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupervisor({
      userId: (supervisors.length + 1).toString(),
      name: supervisorData.name,
      email: supervisorData.email,
      department: supervisorData.department,
      projectsCount: supervisorData.projectsCount,
    });
    setSupervisorData({ name: '', email: '', department: '', projectsCount: 0 });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Supervisors</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Supervisor</h2>
          <input
            type="text"
            value={supervisorData.name}
            onChange={(e) => setSupervisorData({ ...supervisorData, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="email"
            value={supervisorData.email}
            onChange={(e) => setSupervisorData({ ...supervisorData, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="text"
            value={supervisorData.department}
            onChange={(e) => setSupervisorData({ ...supervisorData, department: e.target.value })}
            placeholder="Department"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Supervisor
          </button>
        </form>
        <h2 className="text-xl mb-4">Supervisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supervisors.map((supervisor: any) => (
            <div key={supervisor.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {supervisor.name}</p>
              <p><strong>Email:</strong> {supervisor.email}</p>
              <p><strong>Department:</strong> {supervisor.department}</p>
              <p><strong>Projects:</strong> {supervisor.projectsCount}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}
