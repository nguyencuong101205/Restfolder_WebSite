import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'HoangLongQuan_ImperialSecret_2026_JWT_Key#9999',
  JWT_EXPIRES_IN: '7d',
  RESTAURANT_NAME: 'Hoàng Long Quán - 皇龍樓',
  DATA_DIR: path.join(__dirname, '..', 'data')
};
