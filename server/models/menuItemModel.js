import fs from 'fs/promises';
import path from 'path';
import { CONFIG } from '../config/config.js';

const MENU_FILE = path.join(CONFIG.DATA_DIR, 'menu.json');

export const MenuItemModel = {
  async getAll() {
    try {
      const data = await fs.readFile(MENU_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  async getById(id) {
    const items = await this.getAll();
    return items.find(item => item.id === id);
  },

  async getByCategory(category) {
    const items = await this.getAll();
    if (!category || category === 'all') return items;
    return items.filter(item => item.category === category);
  },

  async create(dishData) {
    const items = await this.getAll();
    const newDish = {
      id: `dish-${Date.now()}`,
      name: dishData.name,
      hanzi: dishData.hanzi || '',
      pinyin: dishData.pinyin || '',
      category: dishData.category || 'dimsum',
      price: Number(dishData.price) || 50000,
      image: dishData.image || 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700',
      description: dishData.description || '',
      isSpicy: Boolean(dishData.isSpicy),
      spiceLevel: Number(dishData.spiceLevel) || 0,
      isBestSeller: Boolean(dishData.isBestSeller),
      isChefSpecial: Boolean(dishData.isChefSpecial),
      inStock: dishData.inStock !== false,
      toppings: dishData.toppings || []
    };

    items.push(newDish);
    await fs.writeFile(MENU_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return newDish;
  },

  async update(id, updateData) {
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updateData
    };

    await fs.writeFile(MENU_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return items[index];
  },

  async delete(id) {
    const items = await this.getAll();
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;

    await fs.writeFile(MENU_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
};
