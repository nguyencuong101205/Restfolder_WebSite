import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for dev / mobile QR testing
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from client/dist
app.use(express.static(clientDistPath));

// Welcome root
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: `Chào mừng tới API ${CONFIG.RESTAURANT_NAME}`,
    version: '1.0.0',
    architecture: 'MVC (Model - View - Controller) with JWT Authentication',
    endpoints: {
      auth: '/api/auth (POST /login, POST /register, GET /me, GET /demo-accounts)',
      menu: '/api/menu (GET /, GET /:id, POST /, PUT /:id, DELETE /:id)',
      orders: '/api/orders (POST /, GET /, GET /table/:num/active, PATCH /:id/status, POST /:id/call-staff)',
      tables: '/api/tables (GET /, GET /:num/qr, GET /all/with-qr)'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

// SPA client fallback for non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏮  ${CONFIG.RESTAURANT_NAME} SERVER STARTED!  🏮`);
  console.log(`🔥  Port: http://localhost:${CONFIG.PORT}`);
  console.log(`📜  API Doc: http://localhost:${CONFIG.PORT}/api`);
  console.log(`🍜  MVC Pattern & JWT Authentication Active!`);
  console.log(`=======================================================`);
});
