// src/config/api.ts

// Get API URL from environment variable or use default
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8000'  // Local development
  : 'https://ai-and-robot-book4-backend.onrender.com';  // Production on Render

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat`,
  search: `${API_BASE_URL}/search-content`,
  chapters: `${API_BASE_URL}/chapters`,
  health: `${API_BASE_URL}/health`,
};

export default API_ENDPOINTS;