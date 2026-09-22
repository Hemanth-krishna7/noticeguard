/**
 * Verification API Client
 * Sends normalized notice image information and demo tags to the verification engine.
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
    const payload = {
      imageName: normalizedImage?.name || 'uploaded_notice.jpg',
      demoNoticeTag: options.demoNoticeTag || normalizedImage?.demoNoticeTag || '',
      source: normalizedImage?.source || 'upload',
      sizeBytes: normalizedImage?.sizeBytes || 0,
      width: normalizedImage?.width || 0,
      height: normalizedImage?.height || 0
    };

    const response = await fetch(`${API_BASE_URL}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
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
