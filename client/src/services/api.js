import axios from 'axios';

// In production on Vercel, relative path '/api' reaches the serverless API directly.
// In local development, fallback to 'http://localhost:5000/api'
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? '/api' 
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
});

export default api;
export { API_BASE_URL };
