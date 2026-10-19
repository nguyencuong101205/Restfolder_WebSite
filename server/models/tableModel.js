import fs from 'fs/promises';
import path from 'path';
import QRCode from 'qrcode';
import { CONFIG } from '../config/config.js';

const TABLES_FILE = path.join(CONFIG.DATA_DIR, 'tables.json');

export const TableModel = {
  async getAll() {
    try {
      const data = await fs.readFile(TABLES_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  async getByNumber(tableNumber) {
    const tables = await this.getAll();
    return tables.find(t => String(t.tableNumber) === String(tableNumber));
  },

  async updateStatus(tableNumber, status, currentOrderId = null) {
    const tables = await this.getAll();
    const index = tables.findIndex(t => String(t.tableNumber) === String(tableNumber));
    if (index === -1) return null;

    tables[index].status = status;
    if (currentOrderId !== undefined) {
      tables[index].currentOrderId = currentOrderId;
    }

    await fs.writeFile(TABLES_FILE, JSON.stringify(tables, null, 2), 'utf-8');
    return tables[index];
  },

  /**
   * Generate QR Code Data URL for a table
   * Customer scanning this URL will be directed to: http://localhost:5173/?table=<tableNumber>
   */
  async generateQrCode(tableNumber, baseUrl = 'http://localhost:5173') {
    const orderUrl = `${baseUrl}/?table=${encodeURIComponent(tableNumber)}`;
    const qrDataUrl = await QRCode.toDataURL(orderUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#8B0000', // Deep Imperial Red
        light: '#FFF8E7'  // Warm Silk Cream
      }
    });

    return {
      tableNumber,
      orderUrl,
      qrDataUrl
    };
  }
};
