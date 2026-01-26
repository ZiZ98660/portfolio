import apiClient from './client';

export interface SubscribeRequest {
  email: string;
  name?: string;
  source?: string;
}

export interface SubscribeResponse {
  message: string;
  subscribed: boolean;
}

export const subscriptionsAPI = {
  /**
   * Subscribe to newsletter
   * Includes retry logic for Render cold starts
   */
  subscribe: async (data: SubscribeRequest, retries = 2): Promise<SubscribeResponse> => {
    try {
      const response = await apiClient.post<SubscribeResponse>(
        '/api/subscribe',
        data
      );
      return response.data;
    } catch (error: any) {
      // Retry on timeout or network errors (common with Render cold starts)
      if (retries > 0 && (
        error.code === 'ECONNABORTED' || // Timeout
        error.message?.includes('timeout') ||
        error.message?.includes('Network Error') ||
        (error.response?.status >= 500 && error.response?.status < 600) // Server errors
      )) {
        // Wait 2 seconds before retry
        await new Promise(resolve => setTimeout(resolve, 2000));
        return subscriptionsAPI.subscribe(data, retries - 1);
      }
      throw error;
    }
  },

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      '/api/unsubscribe',
      { email }
    );
    return response.data;
  },
};

