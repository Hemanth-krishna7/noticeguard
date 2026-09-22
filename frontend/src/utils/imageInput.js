/**
 * Unified Notice Image Input Abstraction
 * Normalizes images from Camera capture, Gallery selection, and Desktop file upload
 * into a consistent structure for the future verification engine.
 */

export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 Megabytes

/**
 * Validate a user-provided file against supported types and maximum size
 * @param {File|Blob} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateNoticeFile(file) {
  if (!file) {
    return { valid: false, error: 'No image file was provided.' };
  }

  // Check MIME type
  const mimeType = file.type?.toLowerCase();
  const isMimeSupported = SUPPORTED_MIME_TYPES.includes(mimeType);

  // Fallback check by extension if mime type is missing or generic (e.g. from some mobile browsers)
  const name = file.name || '';
  const extensionMatch = name.match(/\.(jpe?g|png|webp)$/i);

  if (!isMimeSupported && !extensionMatch) {
    return {
      valid: false,
      error: 'Unsupported format. Please provide a JPG, PNG, or WEBP document photo.'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeInMB}MB). Maximum allowed notice image size is 15MB.`
    };
  }

  return { valid: true };
}

/**
 * Creates a normalized notice image data structure with dimensions and preview URL
 * @param {File|Blob} fileOrBlob
 * @param {'camera'|'gallery'|'upload'} source
 * @param {Object} [meta={}]
 * @returns {Promise<NormalizedNoticeImage>}
 */
export async function createNormalizedNoticeImage(fileOrBlob, source = 'upload', meta = {}) {
  const objectUrl = URL.createObjectURL(fileOrBlob);

  // Calculate natural image dimensions
  const dimensions = await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || 0, height: img.naturalHeight || 0 });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = objectUrl;
  });

  const timestamp = Date.now();
  const defaultName = source === 'camera'
    ? `notice_scan_${timestamp}.jpg`
    : (fileOrBlob.name || `notice_image_${timestamp}.jpg`);

  return {
    id: `notice_img_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
    file: fileOrBlob,
    previewUrl: objectUrl,
    source, // 'camera' | 'gallery' | 'upload'
    name: meta.name || defaultName,
    sizeBytes: fileOrBlob.size,
    mimeType: fileOrBlob.type || 'image/jpeg',
    width: dimensions.width,
    height: dimensions.height,
    timestamp
  };
}

/**
 * Revokes the Object URL of a normalized notice image to prevent memory leaks
 * @param {NormalizedNoticeImage} normalizedImage
 */
export function revokeNoticeImage(normalizedImage) {
  if (normalizedImage && normalizedImage.previewUrl) {
    try {
      URL.revokeObjectURL(normalizedImage.previewUrl);
    } catch {
      // Ignore cleanup error
    }
  }
}

/**
 * Format bytes into human readable format (e.g. "1.4 MB")
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
