const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
};

