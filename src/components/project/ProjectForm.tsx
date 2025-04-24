import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  project, 
  onSubmit, 
  onCancel 
}) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || '');
  const [content, setContent] = useState(project?.content || '');
  const [externalLink, setExternalLink] = useState(project?.externalLink || '');
  const [contentType, setContentType] = useState(
    project?.content ? 'internal' : 'external'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate slug from title
  useEffect(() => {
    if (!project && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, project]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!slug.trim()) newErrors.slug = 'URL slug is required';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    if (contentType === 'external' && !externalLink.trim()) {
      newErrors.externalLink = 'External link is required';
    } else if (contentType === 'internal' && !content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      title,
      description,
      slug,
      imageUrl,
      content: contentType === 'internal' ? content : undefined,
      externalLink: contentType === 'external' ? externalLink : undefined,
      isPublished: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          error={errors.title}
          fullWidth
        />
        
        <Input
          label="URL Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="project-url-slug"
          error={errors.slug}
          fullWidth
        />
      </div>
      
      <Input
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
        error={errors.imageUrl}
        fullWidth
      />
      
      <div>
        <label className="block text-sm font-medium text-accent-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="block w-full rounded-md border-accent-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          placeholder="Brief description of the project"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-accent-700 mb-2">
          Project Type
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-primary-600"
              name="contentType"
              value="external"
              checked={contentType === 'external'}
              onChange={() => setContentType('external')}
            />
            <span className="ml-2">External Link</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-primary-600"
              name="contentType"
              value="internal"
              checked={contentType === 'internal'}
              onChange={() => setContentType('internal')}
            />
            <span className="ml-2">Blog Content</span>
          </label>
        </div>
      </div>
      
      {contentType === 'external' ? (
        <Input
          label="External Link"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          placeholder="https://example.com"
          error={errors.externalLink}
          fullWidth
        />
      ) : (
        <div>
          <label className="block text-sm font-medium text-accent-700 mb-1">
            Content
          </label>
          <div className="mb-6">
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              className="h-64 mb-12"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;