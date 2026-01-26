import apiClient from './client';

export interface Project {
  id?: number;
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
  status?: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface ProjectFormData extends Omit<Project, 'id' | 'created_at' | 'updated_at'> {
  thumbnail?: File;
  screenshots?: File[];
  video?: File;
}

export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/api/admin/projects');
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<Project>(`/api/admin/projects/${id}`);
    return response.data;
  },

  create: async (data: FormData): Promise<Project> => {
    const response = await apiClient.post<Project>('/api/admin/projects', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: number, data: FormData): Promise<Project> => {
    const response = await apiClient.put<Project>(`/api/admin/projects/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/projects/${id}`);
  },

  deleteScreenshot: async (projectId: number, screenshotIndex: number): Promise<Project> => {
    const response = await apiClient.delete<Project>(
      `/api/admin/projects/${projectId}/screenshots/${screenshotIndex}`
    );
    return response.data;
  },
};

