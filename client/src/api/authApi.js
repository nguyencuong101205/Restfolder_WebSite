import { apiClient } from './apiClient';

export const authApi = {
  // Login to get JWT Token
  async login(username, password) {
    return await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  // Get current user profile using JWT
  async getProfile() {
    return await apiClient('/auth/me');
  },

  // Get list of demo accounts for quick testing
  async getDemoAccounts() {
    return await apiClient('/auth/demo-accounts');
  }
};
