import apiClient from './client';

export interface Project {
  id: number;
  title: string;
  description: string;
  short_description?: string;
  thumbnail_image?: string;
  screenshots?: string[];
  video_url?: string;
  video_file?: string;
  live_link?: string;
  github_link?: string;
  demo_link?: string;
  technologies?: string[];
  category?: string;
  featured?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const projectsAPI = {
  getAll: async (params?: { featured?: boolean; category?: string; limit?: number }): Promise<{ count: number; projects: Project[] }> => {
    const response = await apiClient.get('/api/projects', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await apiClient.get(`/api/projects/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<{ count: number; projects: Project[] }> => {
    const response = await apiClient.get('/api/projects/featured');
    return response.data;
  },
};

