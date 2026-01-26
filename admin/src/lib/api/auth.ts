import apiClient from './client';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  admin: {
    id: number;
    username: string;
    email: string;
  };
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/admin/login', credentials);
    return response.data;
  },

  getCurrentAdmin: async () => {
    const response = await apiClient.get('/api/admin/me');
    return response.data;
  },
};

