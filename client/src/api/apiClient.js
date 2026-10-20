/**
 * API Client with JWT Bearer Token Injection
 * Connects to Express MVC Backend
 */

const BASE_URL = '/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('hoanglong_jwt_token');

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json; charset=utf-8',
    ...(options.headers || {})
  };

  // Automatically attach JWT Bearer Token if present
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Lỗi yêu cầu máy chủ');
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If backend isn't reached (e.g. running client standalone), log and throw
    console.warn(`[API Client Warning] Failed to reach ${endpoint}:`, err.message);
    throw err;
  }
};
