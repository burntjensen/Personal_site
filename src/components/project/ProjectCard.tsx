import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, ExternalLink, Trash } from 'lucide-react';
import { Project } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const { isAuthenticated } = useAuthStore();
  const hasContent = Boolean(project.content);
  const hasExternalLink = Boolean(project.externalLink);

  return (
    <Card className="h-full flex flex-col" hoverable>
      <Link to={`/projects/${project.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-xl font-semibold mb-2 text-accent-900 hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-accent-600 mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap mt-auto gap-2">
          {isAuthenticated && (
            <div className="flex gap-2 ml-auto">
              {onEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(project);
                  }}
                  icon={<Edit size={14} />}
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (
                      window.confirm(
                        'Are you sure you want to delete this project?'
                      )
                    ) {
                      onDelete(project.id);
                    }
                  }}
                  icon={<Trash size={14} />}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
