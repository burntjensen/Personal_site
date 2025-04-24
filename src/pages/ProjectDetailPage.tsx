import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useProjectStore } from '../store/projectStore';
import { Project } from '../types';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProjectBySlug } = useProjectStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = () => {
      if (slug) {
        const foundProject = getProjectBySlug(slug);
        if (foundProject) {
          setProject(foundProject);
          // Handle external link redirect during project load
          if (foundProject.externalLink && !foundProject.content) {
            window.location.href = foundProject.externalLink;
          }
        }
      }
      setIsLoading(false);
    };

    loadProject();
  }, [slug, getProjectBySlug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-accent-900 mb-4">Project Not Found</h1>
          <p className="text-accent-600 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate('/')}
        icon={<ArrowLeft size={16} />}
      >
        Back to Projects
      </Button>
      
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video relative">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {project.externalLink && (
            <a 
              href={project.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-800"
            >
              <ExternalLink size={18} className="mr-1" /> 
              Visit Project
            </a>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-accent-700 mb-8">
            {project.description}
          </p>
          
          {project.content && (
            <div 
              className="prose prose-lg max-w-none prose-headings:text-accent-900 prose-a:text-primary-600"
              dangerouslySetInnerHTML={{ __html: project.content }} 
            />
          )}
        </div>
      </motion.article>
    </Layout>
  );
};

export default ProjectDetailPage;