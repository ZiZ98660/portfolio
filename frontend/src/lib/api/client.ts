import axios from 'axios';

// Export API base URL for use in components (e.g., for image URLs)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds - increased for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

