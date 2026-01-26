import apiClient from './client';

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe_to_newsletter?: boolean;
}

export interface ContactResponse {
  message: string;
  success: boolean;
}

export const contactAPI = {
  /**
   * Send contact form message
   */
  sendMessage: async (data: ContactRequest): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>(
      '/api/contact',
      data
    );
    return response.data;
  },
};

