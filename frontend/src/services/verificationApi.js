/**
 * Verification API Client
 * Sends notice image data (multipart/form-data) and demo tags to the verification engine.
 */

const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');

/**
 * Verify a notice image against the authoritative registry
 * @param {Object} normalizedImage - The normalized notice image structure from imageInput.js
 * @param {Object} [options={}]
 * @param {string} [options.demoNoticeTag] - Optional preset tag for demo matching
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function verifyNoticeImage(normalizedImage, options = {}) {
  try {
    const formData = new FormData();

    // 1. Attach actual image file/blob if available
    if (normalizedImage?.file) {
      formData.append('image', normalizedImage.file, normalizedImage.name || 'notice_image.jpg');
    }

    // 2. Demo notice tag (used exclusively for evaluator shortcut presets)
    const demoNoticeTag = options.demoNoticeTag || normalizedImage?.demoNoticeTag || '';
    if (demoNoticeTag) {
      formData.append('demoNoticeTag', demoNoticeTag);
    }

    // 3. Metadata fields
    formData.append('imageName', normalizedImage?.name || 'uploaded_notice.jpg');
    formData.append('source', normalizedImage?.source || 'upload');

    const response = await fetch(`${API_BASE_URL}/api/verify`, {
      method: 'POST',
      headers: {
        // NOTE: Do not set Content-Type header manually when sending FormData
        // so the browser can attach the proper boundary multipart header.
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Verification request failed (HTTP ${response.status})`
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error communicating with verification engine'
    };
  }
}
