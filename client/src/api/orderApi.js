import { apiClient } from './apiClient';

export const orderApi = {
  // Customer sends order for table
  async createOrder(orderData) {
    return await apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Get active order for current table
  async getActiveTableOrder(tableNumber) {
    return await apiClient(`/orders/table/${tableNumber}/active`);
  },

  // Staff/Kitchen: Get all orders
  async getAllOrders(status = 'all') {
    const qs = status !== 'all' ? `?status=${status}` : '';
    return await apiClient(`/orders${qs}`);
  },

  // Staff/Kitchen: Update status (pending, preparing, served, completed)
  async updateStatus(orderId, status) {
    return await apiClient(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // Customer: Call staff
  async callStaff(orderId, requestType, note = '') {
    return await apiClient(`/orders/${orderId}/call-staff`, {
      method: 'POST',
      body: JSON.stringify({ requestType, note })
    });
  }
};

export const tableApi = {
  // Get all tables
  async getTables() {
    return await apiClient('/tables');
  },

  // Get QR info for table
  async getTableQr(tableNumber) {
    return await apiClient(`/tables/${tableNumber}/qr`);
  },

  // Get all tables with QR code base64
  async getAllTablesWithQr() {
    return await apiClient('/tables/all/with-qr');
  }
};
