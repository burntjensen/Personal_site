export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  content?: string;
  externalLink?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export type ProjectsState = {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectBySlug: (slug: string) => Project | undefined;
};