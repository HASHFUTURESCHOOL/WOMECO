import axios from 'axios';

// In production, admin connects to the public domain API (e.g., https://womeco.org/api) or REACT_APP_API_URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('womeco.org')
    ? 'https://womeco.org/api'
    : (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '/api' : 'http://localhost:5000/api'));

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default api;
export { API_BASE_URL };
