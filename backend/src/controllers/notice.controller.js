import { noticeService } from '../services/notice.service.js';

/**
 * Controller for Authoritative Notice Registry Endpoints
 */

// GET /api/notices
export const getNotices = (req, res) => {
  try {
    const { department } = req.query;
    const notices = noticeService.getAllNotices({ department });
    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (err) {
    console.error('getNotices error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve notices from registry'
    });
  }
};

// GET /api/notices/:noticeId
export const getNoticeById = (req, res) => {
  try {
    const { noticeId } = req.params;
    const notice = noticeService.getNoticeById(noticeId);

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: `Notice with ID '${noticeId}' was not found in the authoritative registry.`
      });
    }

    return res.status(200).json({
      success: true,
      data: notice
    });
  } catch (err) {
    console.error('getNoticeById error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve notice'
    });
  }
};

// GET /api/notices/:noticeId/versions/:versionId
export const getNoticeVersion = (req, res) => {
  try {
    const { noticeId, versionId } = req.params;
    const version = noticeService.getNoticeVersion(noticeId, versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        error: `Version '${versionId}' for notice '${noticeId}' was not found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: version
    });
  } catch (err) {
    console.error('getNoticeVersion error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve notice version'
    });
  }
};

// GET /api/registry/health
export const getRegistryHealth = (req, res) => {
  try {
    const stats = noticeService.getRegistryStats();
    return res.status(200).json(stats);
  } catch (err) {
    console.error('getRegistryHealth error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Registry service health check failed'
    });
  }
};
