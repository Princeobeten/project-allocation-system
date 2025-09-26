'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import { useStudents } from '@/hooks/useStudents';

export default function AdminStudentsPage() {
  const { user } = useApp();
  const { students, addStudent } = useStudents();
  const [studentData, setStudentData] = useState({ 
    name: '', 
    matricNumber: '', 
    email: '', 
    department: '', 
    preference: '' 
  });

  if (user?.role !== 'admin') {
    return <div className="text-center text-red-500">Access denied. Admin only.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      userId: (students.length + 1).toString(),
      name: studentData.name,
      matricNumber: studentData.matricNumber,
      email: studentData.email,
      department: studentData.department,
      preference: studentData.preference,
    });
    setStudentData({ name: '', matricNumber: '', email: '', department: '', preference: '' });
  };

  return (
    <AuthCheck>
      <div className="bg-background min-h-screen">
        <h1 className="text-2xl mb-6">Manage Students</h1>
        <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl mb-4">Add Student</h2>
          <input
            type="text"
            value={studentData.name}
            onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="text"
            value={studentData.matricNumber}
            onChange={(e) => setStudentData({ ...studentData, matricNumber: e.target.value })}
            placeholder="Matric Number"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="email"
            value={studentData.email}
            onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="text"
            value={studentData.department}
            onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
            placeholder="Department"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
            required
          />
          <input
            type="text"
            value={studentData.preference}
            onChange={(e) => setStudentData({ ...studentData, preference: e.target.value })}
            placeholder="Project Preference"
            className="w-full p-2 mb-4 border border-primary rounded bg-background text-white"
          />
          <button type="submit" className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded">
            Add Student
          </button>
        </form>
        <h2 className="text-xl mb-4">Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student: any) => (
            <div key={student.id} className="bg-primary p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Matric Number:</strong> {student.matricNumber}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Preference:</strong> {student.preference}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}
