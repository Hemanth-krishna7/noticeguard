import { verificationService } from '../services/verification.service.js';

/**
 * Controller for Document Verification Endpoints
 */

// POST /api/verify
export const verifyNotice = (req, res) => {
  try {
    const { imageName, demoNoticeTag, source } = req.body || {};

    const result = verificationService.verifyNotice({
      imageName,
      demoNoticeTag,
      source
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('verifyNotice error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process document verification request'
    });
  }
};
