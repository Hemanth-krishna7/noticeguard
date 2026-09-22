import { Router } from 'express';
import multer from 'multer';
import { verifyNotice } from '../controllers/verification.controller.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB limit
  }
});

const router = Router();

// POST /api/verify - Accepts multipart/form-data (image file) or JSON (presets)
router.post('/', upload.single('image'), verifyNotice);

export default router;
