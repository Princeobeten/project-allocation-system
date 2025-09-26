'use client';
import { useApp } from '@/context/AppContext';
import AuthCheck from '@/app/components/AuthCheck';
import ProjectCard from '@/app/components/ProjectCard';
import ProgressForm from '@/app/components/ProgressForm';
import { useStudents, useProjects, useAllocations, useProgress } from '@/hooks';

export default function DashboardPage() {
  const { user, updateStudentPreference, supervisors } = useApp();
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

  // Statistics calculations
  const totalStudents = students.length;
  const totalSupervisors = supervisors.length;
  const totalProjects = projects.length;
  const assignedProjects = projects.filter((p: any) => p.status === 'assigned').length;
  const availableProjects = projects.filter((p: any) => p.status === 'available').length;
  const completedProjects = projects.filter((p: any) => p.status === 'completed').length;

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-primary/20 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {user?.role === 'admin' ? '🛠️ Admin Dashboard' : 
                 user?.role === 'supervisor' ? '👨‍🏫 Supervisor Dashboard' : 
                 '👨‍🎓 Student Dashboard'}
              </h1>
              <p className="text-gray-300">Welcome back, {user?.name}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Student Dashboard */}
        {user?.role === 'student' && userStudent && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <p className="text-blue-100">Assigned Projects</p>
                    <p className="text-3xl font-bold text-white">{userProjects.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <p className="text-green-100">Progress Reports</p>
                    <p className="text-3xl font-bold text-white">{progress.filter((p: any) => p.studentId === userStudent.id).length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-purple-100">Feedback Received</p>
                    <p className="text-3xl font-bold text-white">{progress.filter((p: any) => p.studentId === userStudent.id && p.feedback).length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Preference */}
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                Project Preference
              </h2>
              <form onSubmit={handlePreferenceUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Preference</label>
                  <input
                    type="text"
                    name="preference"
                    defaultValue={userStudent.preference}
                    placeholder="Describe your project interests..."
                    className="w-full p-4 border border-gray-600 rounded-xl bg-background/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cta focus:border-transparent transition-all"
                  />
                </div>
                <button type="submit" className="bg-gradient-to-r from-cta to-blue-600 hover:from-cta-hover hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105">
                  Update Preference
                </button>
              </form>
            </div>

            {/* My Projects */}
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                My Projects
              </h2>
              {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userProjects.map((project: any) => (
                    <div key={project.id} className="space-y-4">
                      <ProjectCard project={project} />
                      <ProgressForm projectId={project.id} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">📋</span>
                  <p className="text-gray-300 text-lg">No projects assigned yet</p>
                  <p className="text-gray-400">Check back later or contact your administrator</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supervisor Dashboard */}
        {user?.role === 'supervisor' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <p className="text-emerald-100">My Projects</p>
                    <p className="text-3xl font-bold text-white">{userProjects.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <p className="text-blue-100">Assigned Students</p>
                    <p className="text-3xl font-bold text-white">{userAllocations.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <p className="text-orange-100">Progress Reports</p>
                    <p className="text-3xl font-bold text-white">{progress.filter((p: any) => userProjects.some((proj: any) => proj.id === p.projectId)).length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="text-purple-100">Feedback Given</p>
                    <p className="text-3xl font-bold text-white">{progress.filter((p: any) => userProjects.some((proj: any) => proj.id === p.projectId) && p.feedback).length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Projects */}
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                My Projects
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userProjects.map((project: any) => (
                  <div key={project.id} className="space-y-4">
                    <ProjectCard project={project} />
                    <ProgressForm projectId={project.id} />
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Students */}
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="mr-3">👥</span>
                Assigned Students
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAllocations.map((alloc: any) => {
                  const student = students.find((s: any) => s.id === alloc.studentId);
                  const project = projects.find((p: any) => p.id === alloc.projectId);
                  return (
                    <div key={alloc.id} className="bg-background/50 p-6 rounded-xl border border-gray-600 hover:border-cta transition-colors">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cta to-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-semibold">{student?.name?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{student?.name}</p>
                          <p className="text-sm text-gray-400">{student?.matricNumber}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2"><strong>Project:</strong> {project?.title}</p>
                      <p className="text-gray-400 text-xs"><strong>Email:</strong> {student?.email}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {user?.role === 'admin' && (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">👨‍🎓</span>
                  </div>
                  <div>
                    <p className="text-blue-100">Total Students</p>
                    <p className="text-3xl font-bold text-white">{totalStudents}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div>
                    <p className="text-green-100">Total Supervisors</p>
                    <p className="text-3xl font-bold text-white">{totalSupervisors}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <p className="text-purple-100">Total Projects</p>
                    <p className="text-3xl font-bold text-white">{totalProjects}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <div>
                    <p className="text-orange-100">Allocations</p>
                    <p className="text-3xl font-bold text-white">{allocations.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🟢</span>
                  Available Projects
                </h3>
                <p className="text-4xl font-bold text-green-400">{availableProjects}</p>
                <p className="text-gray-300 text-sm mt-2">Ready for allocation</p>
              </div>
              <div className="bg-primary/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🟡</span>
                  Assigned Projects
                </h3>
                <p className="text-4xl font-bold text-yellow-400">{assignedProjects}</p>
                <p className="text-gray-300 text-sm mt-2">Currently in progress</p>
              </div>
              <div className="bg-primary/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🔵</span>
                  Completed Projects
                </h3>
                <p className="text-4xl font-bold text-blue-400">{completedProjects}</p>
                <p className="text-gray-300 text-sm mt-2">Successfully finished</p>
              </div>
            </div>

            {/* Recent Allocations */}
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="mr-3">🔗</span>
                Recent Allocations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allocations.map((alloc: any) => {
                  const student = students.find((s: any) => s.id === alloc.studentId);
                  const project = projects.find((p: any) => p.id === alloc.projectId);
                  const supervisor = supervisors.find((sup: any) => sup.id === alloc.supervisorId);
                  return (
                    <div key={alloc.id} className="bg-background/50 p-6 rounded-xl border border-gray-600 hover:border-cta transition-colors">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cta to-blue-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-semibold">{student?.name?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{student?.name}</p>
                          <p className="text-xs text-gray-400">{student?.matricNumber}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2"><strong>Project:</strong> {project?.title}</p>
                      <p className="text-gray-400 text-xs"><strong>Supervisor:</strong> {supervisor?.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthCheck>
  );
}
