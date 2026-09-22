import { Router } from 'express';
import { verifyNotice } from '../controllers/verification.controller.js';

const router = Router();

// POST /api/verify
router.post('/', verifyNotice);

export default router;
