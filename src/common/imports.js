// Centralized exports for common frontend imports
// Use this file to import frequently used modules from a single place.

import axios from 'axios';
import { BASE_URL } from '../../env';
export { BASE_URL };

// Auth context exports
export { useAuth, AuthProvider } from '../admin/AuthContext';

// Preconfigured axios instance for API calls
// Cookies are enabled to carry session/refresh tokens as httpOnly cookies.
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional helper for setting/updating auth headers if needed later
export const setApiHeader = (key, value) => {
  if (value === undefined || value === null) {
    delete api.defaults.headers.common[key];
  } else {
    api.defaults.headers.common[key] = value;
  }
};
