import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import ProjectCard from '../../components/project/ProjectCard';
import ProjectForm from '../../components/project/ProjectForm';
import { useProjectStore } from '../../store/projectStore';
import { useAuthStore } from '../../store/authStore';
import { Project } from '../../types';

const AdminProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  const handleAddSubmit = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProject(projectData);
    setIsAdding(false);
  };

  const handleEditSubmit = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedProject) {
      updateProject(selectedProject.id, projectData);
      setIsEditing(false);
      setSelectedProject(null);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSelectedProject(null);
  };

  if (!isAuthenticated) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-accent-900">
          Manage Projects
        </h1>
        
        {!isAdding && !isEditing && (
          <Button 
            variant="primary" 
            onClick={() => setIsAdding(true)}
            icon={<Plus size={16} />}
          >
            Add Project
          </Button>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <ProjectForm 
              onSubmit={handleAddSubmit} 
              onCancel={handleCancel} 
            />
          </motion.div>
        )}
        
        {isEditing && selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <ProjectForm 
              project={selectedProject}
              onSubmit={handleEditSubmit} 
              onCancel={handleCancel} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isAdding && !isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminProjectsPage;