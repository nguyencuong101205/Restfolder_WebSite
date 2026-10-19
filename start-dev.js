import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('================================================================');
console.log('🏮 KHỞI ĐỘNG HỆ THỐNG HOÀNG LONG QUÁN (皇龍樓) 🏮');
console.log('🥟 Backend API (Express MVC + JWT) & Frontend (React + Vite)');
console.log('================================================================\n');

// Start Express Backend
const serverProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  shell: true,
  stdio: 'inherit'
});

// Start React Vite Frontend
const clientProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  shell: true,
  stdio: 'inherit'
});

const cleanup = () => {
  console.log('\n🛑 Đang dừng hệ thống...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
