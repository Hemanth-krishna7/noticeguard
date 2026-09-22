import { Router } from 'express';
import { getRegistryHealth } from '../controllers/notice.controller.js';

const router = Router();

// GET /api/registry/health
router.get('/health', getRegistryHealth);

export default router;
