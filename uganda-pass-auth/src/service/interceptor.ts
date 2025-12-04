import axios, { AxiosError, AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Create a configured Axios instance.
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor for global error handling.
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      clearAuthState();
      handleUnauthorized();
    }

    return Promise.reject(error);
  }
);

/**
 * Clears authentication tokens from localStorage.
 * Wrapped in safe browser checks for SSR compatibility.
 */
const clearAuthState = () => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch {
    // Ignore storage errors (user disabled storage or in private mode)
  }
};

/**
 * Handles unauthorized (401) responses globally.
 * Safely redirects without causing loops.
 */
const handleUnauthorized = () => {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  if (!currentPath.includes('/login')) {
    window.location.href = '/login';
  }
};

export default api;
