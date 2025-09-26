import { Project } from '@/lib/mockData/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'assigned':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return '🟢';
      case 'assigned':
        return '🟡';
      case 'completed':
        return '🔵';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary/20 hover:border-cta/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            <span className="mr-1">{getStatusIcon(project.status)}</span>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
        <div className="flex items-center text-xs text-gray-400">
          <span className="mr-1">📋</span>
          Project ID: {project.id}
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <span className="mr-1">👨‍🏫</span>
          Supervisor: {project.supervisorId}
        </div>
      </div>
    </div>
  );
}
