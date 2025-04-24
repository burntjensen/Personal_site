import { create } from 'zustand';
import { ProjectsState } from '../types';
import { mockProjects } from '../data/mockProjects';

export const useProjectStore = create<ProjectsState>((set, get) => {
  // Check if there are stored projects in localStorage
  const storedProjects = localStorage.getItem('projects');
  const initialProjects = storedProjects ? JSON.parse(storedProjects) : mockProjects;

  return {
    projects: initialProjects,
    addProject: (project) => {
      const newProject = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => {
        const updatedProjects = [...state.projects, newProject];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        return { projects: updatedProjects };
      });
    },
    updateProject: (id, projectUpdates) => {
      set((state) => {
        const updatedProjects = state.projects.map((project) => 
          project.id === id 
            ? { 
                ...project, 
                ...projectUpdates, 
                updatedAt: new Date().toISOString() 
              } 
            : project
        );
        
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        return { projects: updatedProjects };
      });
    },
    deleteProject: (id) => {
      set((state) => {
        const updatedProjects = state.projects.filter((project) => project.id !== id);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        return { projects: updatedProjects };
      });
    },
    getProjectBySlug: (slug) => {
      return get().projects.find((project) => project.slug === slug);
    }
  };
});