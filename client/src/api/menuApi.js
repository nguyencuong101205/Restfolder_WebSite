import { apiClient } from './apiClient';

export const menuApi = {
  // Fetch dishes with category / search query
  async getDishes(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.spicyOnly) query.append('spicyOnly', 'true');
    if (params.bestSellerOnly) query.append('bestSellerOnly', 'true');

    const qs = query.toString() ? `?${query.toString()}` : '';
    return await apiClient(`/menu${qs}`);
  },

  async getDishById(id) {
    return await apiClient(`/menu/${id}`);
  },

  // Admin: Create dish
  async createDish(dishData) {
    return await apiClient('/menu', {
      method: 'POST',
      body: JSON.stringify(dishData)
    });
  },

  // Admin/Kitchen: Update dish / toggle inStock
  async updateDish(id, dishData) {
    return await apiClient(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dishData)
    });
  },

  // Admin: Delete dish
  async deleteDish(id) {
    return await apiClient(`/menu/${id}`, {
      method: 'DELETE'
    });
  }
};
