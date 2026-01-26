import apiClient from './client';

// Personal Info
export interface PersonalInfo {
  id?: number;
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  profile_image?: string;
}

export const personalInfoAPI = {
  get: async (): Promise<PersonalInfo> => {
    const response = await apiClient.get<PersonalInfo>('/api/admin/personal-info');
    return response.data;
  },
  update: async (data: FormData | PersonalInfo): Promise<PersonalInfo> => {
    const isFormData = data instanceof FormData;
    const response = await apiClient[isFormData ? 'post' : 'put']<PersonalInfo>(
      '/api/admin/personal-info',
      data,
      isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
    return response.data;
  },
};

// Impact Metrics
export interface ImpactMetric {
  id?: number;
  value: number;
  suffix: string;
  label: string;
  color: string;
  order: number;
}

export const impactMetricsAPI = {
  getAll: async (): Promise<ImpactMetric[]> => {
    const response = await apiClient.get<ImpactMetric[]>('/api/admin/impact-metrics');
    return response.data;
  },
  create: async (data: ImpactMetric): Promise<ImpactMetric> => {
    const response = await apiClient.post<ImpactMetric>('/api/admin/impact-metrics', data);
    return response.data;
  },
  update: async (id: number, data: Partial<ImpactMetric>): Promise<ImpactMetric> => {
    const response = await apiClient.put<ImpactMetric>(`/api/admin/impact-metrics/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/impact-metrics/${id}`);
  },
};

// Technical Skills
export interface TechnicalSkill {
  id?: number;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'database' | 'devops';
  order: number;
}

export const technicalSkillsAPI = {
  getAll: async (): Promise<TechnicalSkill[]> => {
    const response = await apiClient.get<TechnicalSkill[]>('/api/admin/technical-skills');
    return response.data;
  },
  create: async (data: TechnicalSkill): Promise<TechnicalSkill> => {
    const response = await apiClient.post<TechnicalSkill>('/api/admin/technical-skills', data);
    return response.data;
  },
  update: async (id: number, data: Partial<TechnicalSkill>): Promise<TechnicalSkill> => {
    const response = await apiClient.put<TechnicalSkill>(`/api/admin/technical-skills/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/technical-skills/${id}`);
  },
};

// Experience
export interface Experience {
  id?: number;
  company: string;
  location: string;
  role: string;
  period: string;
  achievements: string[];
  order: number;
}

export const experiencesAPI = {
  getAll: async (): Promise<Experience[]> => {
    const response = await apiClient.get<Experience[]>('/api/admin/experiences');
    return response.data;
  },
  create: async (data: Experience): Promise<Experience> => {
    const response = await apiClient.post<Experience>('/api/admin/experiences', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Experience>): Promise<Experience> => {
    const response = await apiClient.put<Experience>(`/api/admin/experiences/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/experiences/${id}`);
  },
};

// Education
export interface Education {
  id?: number;
  degree: string;
  institution: string;
  period: string;
  type: 'degree' | 'diploma' | 'certificate';
  order: number;
}

export const educationsAPI = {
  getAll: async (): Promise<Education[]> => {
    const response = await apiClient.get<Education[]>('/api/admin/educations');
    return response.data;
  },
  create: async (data: Education): Promise<Education> => {
    const response = await apiClient.post<Education>('/api/admin/educations', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Education>): Promise<Education> => {
    const response = await apiClient.put<Education>(`/api/admin/educations/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/educations/${id}`);
  },
};

// Certification
export interface Certification {
  id?: number;
  name: string;
  issuer: string;
  order: number;
}

export const certificationsAPI = {
  getAll: async (): Promise<Certification[]> => {
    const response = await apiClient.get<Certification[]>('/api/admin/certifications');
    return response.data;
  },
  create: async (data: Certification): Promise<Certification> => {
    const response = await apiClient.post<Certification>('/api/admin/certifications', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Certification>): Promise<Certification> => {
    const response = await apiClient.put<Certification>(`/api/admin/certifications/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/certifications/${id}`);
  },
};

// Social Links
export interface SocialLink {
  id?: number;
  name: string;
  url: string;
  icon: string;
  order: number;
}

export const socialLinksAPI = {
  getAll: async (): Promise<SocialLink[]> => {
    const response = await apiClient.get<SocialLink[]>('/api/admin/social-links');
    return response.data;
  },
  create: async (data: SocialLink): Promise<SocialLink> => {
    const response = await apiClient.post<SocialLink>('/api/admin/social-links', data);
    return response.data;
  },
  update: async (id: number, data: Partial<SocialLink>): Promise<SocialLink> => {
    const response = await apiClient.put<SocialLink>(`/api/admin/social-links/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/social-links/${id}`);
  },
};

