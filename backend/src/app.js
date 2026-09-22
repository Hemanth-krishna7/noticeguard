import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import registryRoutes from './routes/registry.routes.js';
import verificationRoutes from './routes/verification.routes.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly default
  },
  credentials: true
}));

app.use(express.json());

// Minimal non-intrusive request logging in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// Primary Routes
app.use('/api/health', healthRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/registry', registryRoutes);
app.use('/api/verify', verificationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

export default app;
