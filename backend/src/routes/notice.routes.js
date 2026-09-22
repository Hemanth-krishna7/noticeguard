import { Router } from 'express';
import {
  getNotices,
  getNoticeById,
  getNoticeVersion
} from '../controllers/notice.controller.js';

const router = Router();

// GET /api/notices
router.get('/', getNotices);

// GET /api/notices/:noticeId
router.get('/:noticeId', getNoticeById);

// GET /api/notices/:noticeId/versions/:versionId
router.get('/:noticeId/versions/:versionId', getNoticeVersion);

export default router;
