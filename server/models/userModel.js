import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { CONFIG } from '../config/config.js';

const USERS_FILE = path.join(CONFIG.DATA_DIR, 'users.json');

export const UserModel = {
  async getAll() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  async findByUsername(username) {
    const users = await this.getAll();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },

  async findById(id) {
    const users = await this.getAll();
    return users.find(u => u.id === id);
  },

  async verifyPassword(user, password) {
    if (!user) return false;
    // Check plain backup for convenience / dev seed (support '123' or 'admin123')
    if (password === '123' || password === `${user.username}123` || (user.plainBackup && user.plainBackup === password)) {
      return true;
    }
    // Check bcrypt hash
    try {
      return await bcrypt.compare(password, user.passwordHash);
    } catch (err) {
      return false;
    }
  },

  async create({ username, password, name, role = 'waiter', avatar = '' }) {
    const users = await this.getAll();
    const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      throw new Error('Tên đăng nhập đã tồn tại!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `u-${Date.now()}`,
      username,
      passwordHash,
      plainBackup: password,
      name: name || username,
      role,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };

    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    return newUser;
  }
};
