import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project #1',
    description: 'Description for Project #1',
    slug: 'project-1',
    imageUrl: 'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=800',
    externalLink: 'https://example.com/project1',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Project #2',
    description: 'Description for Project #1',
    slug: 'project-2',
    imageUrl: 'https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: '<p>This is a sample blog post content for project 2. It demonstrates the rich text editing capabilities.</p><h2>Features</h2><ul><li>Responsive design</li><li>Modern aesthetics</li><li>User-friendly interface</li></ul>',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];