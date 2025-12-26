// src/config/api.ts
// Automatically switches between local and production backend

export const API_URL = 
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://ai-and-robot-book5-backend.onrender.com';

export const API_ENDPOINTS = {
  chat: `${API_URL}/chat`,
  health: `${API_URL}/health`,
  search: `${API_URL}/search-content`,
  chapters: `${API_URL}/chapters`,
};