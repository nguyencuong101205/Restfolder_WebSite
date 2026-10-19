import fs from 'fs/promises';
import path from 'path';
import { CONFIG } from '../config/config.js';

const ORDERS_FILE = path.join(CONFIG.DATA_DIR, 'orders.json');

export const OrderModel = {
  async getAll() {
    try {
      const data = await fs.readFile(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  async getById(id) {
    const orders = await this.getAll();
    return orders.find(ord => ord.id === id);
  },

  async getByTable(tableNumber) {
    const orders = await this.getAll();
    return orders.filter(ord => String(ord.tableNumber) === String(tableNumber));
  },

  async getActiveOrderForTable(tableNumber) {
    const orders = await this.getAll();
    return orders
      .filter(ord => String(ord.tableNumber) === String(tableNumber) && ord.status !== 'completed')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  },

  async create(orderData) {
    const orders = await this.getAll();
    const newOrder = {
      id: `ord-${Date.now()}`,
      tableNumber: String(orderData.tableNumber || '01'),
      customerName: orderData.customerName || `Khách Bàn ${orderData.tableNumber}`,
      items: orderData.items || [],
      subTotal: Number(orderData.subTotal) || 0,
      vat: Number(orderData.vat) || 0,
      totalPrice: Number(orderData.totalPrice) || 0,
      status: 'pending', // pending -> preparing -> served -> completed
      note: orderData.note || '',
      callStaffRequests: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.unshift(newOrder); // newest first
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    return newOrder;
  },

  async updateStatus(id, newStatus) {
    const orders = await this.getAll();
    const index = orders.findIndex(ord => ord.id === id);
    if (index === -1) return null;

    orders[index].status = newStatus;
    orders[index].updatedAt = new Date().toISOString();

    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    return orders[index];
  },

  async addCallStaffRequest(id, requestType, note = '') {
    const orders = await this.getAll();
    const index = orders.findIndex(ord => ord.id === id);
    if (index === -1) return null;

    if (!orders[index].callStaffRequests) {
      orders[index].callStaffRequests = [];
    }

    orders[index].callStaffRequests.push({
      id: `req-${Date.now()}`,
      requestType, // 'water', 'sauce', 'napkin', 'payment', 'other'
      note,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    return orders[index];
  }
};
