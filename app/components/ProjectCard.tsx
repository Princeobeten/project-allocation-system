import { Project } from '@/lib/mockData/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-primary p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <p><strong>Title:</strong> {project.title}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Status:</strong> {project.status}</p>
    </div>
  );
}
