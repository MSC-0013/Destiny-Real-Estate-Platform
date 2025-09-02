import axios from 'axios';

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
  }
}

// Initialize from saved token on app load
const saved = localStorage.getItem('auth_token');
if (saved) setAuthToken(saved);


