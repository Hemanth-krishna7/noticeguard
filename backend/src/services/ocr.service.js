import Tesseract from 'tesseract.js';

/**
 * OCR Service
 * Wraps Tesseract.js for extracting text from physical notice images in memory.
 */
class OcrService {
  /**
   * Extracts text from an image buffer
   * @param {Buffer} imageBuffer - In-memory image buffer (from multer memoryStorage)
   * @returns {Promise<{ text: string, confidence: number, error?: string }>}
   */
  async extractText(imageBuffer) {
    if (!imageBuffer || !Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
      return {
        text: '',
        confidence: 0,
        error: 'Empty or invalid image buffer provided.'
      };
    }

    try {
      const result = await Tesseract.recognize(imageBuffer, 'eng');
      const text = result?.data?.text || '';
      const confidence = Math.round(result?.data?.confidence || 0);

      return {
        text,
        confidence
      };
    } catch (err) {
      console.error('[OcrService] OCR recognition failed:', err);
      return {
        text: '',
        confidence: 0,
        error: err.message || 'OCR extraction error'
      };
    }
  }
}

export const ocrService = new OcrService();
