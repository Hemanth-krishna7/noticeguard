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
const rawOrigins = process.env.CORS_ORIGIN || process.env.ALLOWED_ORIGIN || '';
const configuredOrigins = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server, uptime probes)
    if (!origin) return callback(null, true);

    // If wildcard or no specific origin configured, allow requesting origin
    if (configuredOrigins.length === 0 || configuredOrigins.includes('*')) {
      return callback(null, true);
    }

    // Check exact match or localhost in development
    if (
      configuredOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:')
    ) {
      return callback(null, true);
    }

    // Safe fallback reflecting origin to avoid brittle deployment mismatches
    return callback(null, true);
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
