import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('================================================================');
console.log('🏮 KHỞI ĐỘNG HỆ THỐNG HOÀNG LONG QUÁN (皇龍樓) 🏮');
console.log('🥟 Backend API (Express MVC + JWT) & Frontend (React + Vite)');
console.log('================================================================\n');

// Tự động giải phóng cổng 5000 và 5173 nếu bị kẹt từ phiên chạy trước
function freePort(port) {
  try {
    if (process.platform === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore']
      });
      const lines = output.trim().split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && Number(pid) > 0 && pid !== String(process.pid)) {
          try {
            execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
            console.log(`🧹 Đã giải phóng cổng ${port} (PID ${pid})`);
          } catch {}
        }
      }
    }
  } catch {}
}

freePort(5000);
freePort(5173);

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// 1. Khởi động Backend Express (Port 5000)
const serverProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  shell: true,
  stdio: 'inherit'
});

// 2. Khởi động Frontend React Vite (Port 5173)
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  shell: true,
  stdio: 'inherit'
});

const cleanup = () => {
  console.log('\n🛑 Đang dừng hệ thống...');
  try {
    if (process.platform === 'win32') {
      if (serverProcess.pid) execSync(`taskkill /F /T /PID ${serverProcess.pid}`, { stdio: 'ignore' });
      if (clientProcess.pid) execSync(`taskkill /F /T /PID ${clientProcess.pid}`, { stdio: 'ignore' });
    } else {
      serverProcess.kill('SIGTERM');
      clientProcess.kill('SIGTERM');
    }
  } catch {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
