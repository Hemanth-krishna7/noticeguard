import { noticeService } from './notice.service.js';
import { ocrService } from './ocr.service.js';
import { normalizeText } from '../utils/textNormalizer.js';
import { matcherService } from './matcher.service.js';

/**
 * Verification Service
 * Evaluates submitted notice images against authoritative registry records.
 * 
 * Supports two operational pathways:
 * 1. Real Image Verification (Milestone 6): Image Buffer -> OCR -> Text Normalization -> Deterministic Registry Matching
 * 2. Evaluator Demo Presets: Instant deterministic shortcut triggered solely when demoNoticeTag is explicitly provided.
 */
class VerificationService {
  /**
   * Evaluates an image submission against the authoritative notice registry
   * @param {Object} input
   * @param {Buffer} [input.fileBuffer] - In-memory image buffer (from multipart/form-data upload)
   * @param {string} [input.imageName] - Name or path of the uploaded file
   * @param {string} [input.demoNoticeTag] - Explicit demo tag or preset key (used ONLY for presets)
   * @param {string} [input.source] - 'camera' | 'gallery' | 'upload'
   * @returns {Promise<Object>} Structured verification response
   */
  async verifyNotice(input = {}) {
    const { fileBuffer, imageName = '', demoNoticeTag = '', source = 'upload' } = input;

    // PATHWAY 1: Explicit Evaluator Demo Presets (Instant shortcut)
    if (demoNoticeTag && demoNoticeTag.trim() !== '') {
      return this.matchDemoPreset(demoNoticeTag, imageName, source);
    }

    // PATHWAY 2: Real Image Verification via OCR -> Registry Matcher
    if (fileBuffer && Buffer.isBuffer(fileBuffer) && fileBuffer.length > 0) {
      console.log(`[VerificationService] Processing real image verification (${fileBuffer.length} bytes, source: ${source})...`);
      const ocrResult = await ocrService.extractText(fileBuffer);
      console.log(`[VerificationService] OCR extracted ${ocrResult.text.length} characters (confidence: ${ocrResult.confidence}%).`);

      const normalizedText = normalizeText(ocrResult.text);
      const matchResult = matcherService.matchAgainstRegistry(normalizedText, {
        rawOcrText: ocrResult.text,
        ocrConfidence: ocrResult.confidence,
        source
      });

      return matchResult;
    }

    // PATHWAY 3: No Image & No Demo Preset provided
    return {
      success: true,
      matched: false,
      status: 'UNVERIFIED',
      confidence: 'NO_IMAGE_DATA',
      source,
      message: 'NoticeGuard could not confidently match this image to an authoritative notice in the current prototype registry.',
      notice: null,
      identifiedVersion: null,
      currentVersion: null,
      changes: [],
      guidance: 'Ensure all edges of the notice header and reference code are clearly visible, or check directly with the issuing department.'
    };
  }

  /**
   * Deterministic evaluator preset matcher (Preserved from Milestone 4 & 5)
   * @private
   */
  matchDemoPreset(demoNoticeTag, imageName, source) {
    const nameLower = imageName.toLowerCase();
    const tagLower = demoNoticeTag.toLowerCase();

    // 1. Check for OUTDATED Examination Notice (v1)
    if (
      tagLower === 'not-exam-2026-v1' ||
      tagLower === 'exam-v1' ||
      tagLower === 'exam-outdated' ||
      (nameLower.includes('exam') && (nameLower.includes('v1') || nameLower.includes('old') || nameLower.includes('archived')))
    ) {
      const notice = noticeService.getNoticeById('not-exam-2026');
      const v1 = notice.versions.find((v) => v.id === 'not-exam-2026-v1');
      const v2 = notice.versions.find((v) => v.id === notice.currentVersionId);

      return {
        success: true,
        matched: true,
        status: 'OUTDATED',
        confidence: 'DEMO_CONFIRMED',
        source,
        message: 'This notice corresponds to an older official revision. A newer authoritative version has superseded it.',
        notice: {
          id: notice.id,
          title: notice.title,
          department: notice.department,
          organization: notice.organization
        },
        identifiedVersion: {
          id: v1.id,
          versionNumber: v1.versionNumber,
          status: v1.status,
          publishedAt: v1.publishedAt,
          effectiveFrom: v1.effectiveFrom,
          documentRef: v1.documentRef,
          signatory: v1.signatory
        },
        currentVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory,
          changesSummary: v2.changesSummary,
          content: v2.content
        },
        changes: [
          {
            field: 'Examination Date',
            from: 'Monday, October 12, 2026',
            to: 'Thursday, October 15, 2026',
            critical: true
          },
          {
            field: 'Reporting & Exam Timing',
            from: '08:30 AM (Exam: 09:00 AM – 12:00 PM)',
            to: '10:00 AM (Exam: 10:30 AM – 01:30 PM)',
            critical: true
          },
          {
            field: 'Examination Venue',
            from: 'Hall 302, Main Academic Block',
            to: 'Hall 408, Science & Technology Annex Wing (2nd Floor)',
            critical: true
          },
          {
            field: 'Reason for Revision',
            from: 'Standard Published Timetable',
            to: 'Unscheduled emergency electrical infrastructure upgrades in Main Block',
            critical: false
          }
        ]
      };
    }

    // 2. Check for CURRENT Examination Notice (v2)
    if (
      tagLower === 'not-exam-2026-v2' ||
      tagLower === 'exam-v2' ||
      tagLower === 'exam-current' ||
      (nameLower.includes('exam') && (nameLower.includes('v2') || nameLower.includes('current') || nameLower.includes('latest')))
    ) {
      const notice = noticeService.getNoticeById('not-exam-2026');
      const v2 = notice.versions.find((v) => v.id === notice.currentVersionId);

      return {
        success: true,
        matched: true,
        status: 'CURRENT',
        confidence: 'DEMO_CONFIRMED',
        source,
        message: 'This notice matches the current authoritative digital version in the official registry.',
        notice: {
          id: notice.id,
          title: notice.title,
          department: notice.department,
          organization: notice.organization
        },
        identifiedVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory
        },
        currentVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory,
          content: v2.content
        },
        changes: []
      };
    }

    // 3. Check for MODIFIED Examination Notice (Discrepancy)
    if (
      tagLower === 'not-exam-modified' ||
      tagLower === 'exam-modified' ||
      tagLower === 'exam-tampered' ||
      tagLower.includes('modified') ||
      tagLower.includes('tamper') ||
      nameLower.includes('modified') ||
      nameLower.includes('tamper')
    ) {
      const notice = noticeService.getNoticeById('not-exam-2026');
      const v2 = notice.versions.find((v) => v.id === notice.currentVersionId);

      return {
        success: true,
        matched: true,
        status: 'MODIFIED',
        confidence: 'DEMO_CONFIRMED',
        source,
        message: 'This document corresponds to a known official notice topic, but its content does not match the stored authoritative version. Critical details diverge from official records.',
        notice: {
          id: notice.id,
          title: notice.title,
          department: notice.department,
          organization: notice.organization
        },
        identifiedVersion: null,
        currentVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory,
          content: v2.content
        },
        discrepancyDetails: 'The physical copy contains altered timing or venue text that has no corresponding record in the university registry.',
        guidance: 'Do not rely on this physical copy. Please consult the official digital notice below or visit the Controller of Examinations.',
        changes: []
      };
    }

    // 4. Check for OUTDATED Library Notice (v1)
    if (
      tagLower === 'not-lib-2026-v1' ||
      tagLower === 'lib-v1' ||
      tagLower === 'lib-outdated' ||
      (nameLower.includes('lib') && (nameLower.includes('v1') || nameLower.includes('old')))
    ) {
      const notice = noticeService.getNoticeById('not-lib-2026');
      const v1 = notice.versions.find((v) => v.id === 'not-lib-2026-v1');
      const v2 = notice.versions.find((v) => v.id === notice.currentVersionId);

      return {
        success: true,
        matched: true,
        status: 'OUTDATED',
        confidence: 'DEMO_CONFIRMED',
        source,
        message: 'This notice corresponds to an older official revision. Extended operational hours are now active.',
        notice: {
          id: notice.id,
          title: notice.title,
          department: notice.department,
          organization: notice.organization
        },
        identifiedVersion: {
          id: v1.id,
          versionNumber: v1.versionNumber,
          status: v1.status,
          publishedAt: v1.publishedAt,
          effectiveFrom: v1.effectiveFrom,
          documentRef: v1.documentRef
        },
        currentVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory,
          changesSummary: v2.changesSummary,
          content: v2.content
        },
        changes: [
          {
            field: 'Weekday Operational Hours',
            from: '08:00 AM – 08:00 PM',
            to: '07:00 AM – 11:00 PM (Extended by 3 hours)',
            critical: true
          },
          {
            field: 'Weekend Study Access',
            from: 'CLOSED on Saturdays & Sundays',
            to: '09:00 AM – 05:00 PM (Weekends Now Open)',
            critical: true
          },
          {
            field: 'Overnight Facility',
            from: 'Not Available',
            to: '24/7 Overnight Reading Room open in Ground Floor Annex',
            critical: false
          }
        ]
      };
    }

    // 5. Check for CURRENT Library Notice (v2)
    if (
      tagLower === 'not-lib-2026-v2' ||
      tagLower === 'lib-v2' ||
      tagLower === 'lib-current' ||
      (nameLower.includes('lib') && (nameLower.includes('v2') || nameLower.includes('current')))
    ) {
      const notice = noticeService.getNoticeById('not-lib-2026');
      const v2 = notice.versions.find((v) => v.id === notice.currentVersionId);

      return {
        success: true,
        matched: true,
        status: 'CURRENT',
        confidence: 'DEMO_CONFIRMED',
        source,
        message: 'This notice matches the current authoritative digital version in the official registry.',
        notice: {
          id: notice.id,
          title: notice.title,
          department: notice.department,
          organization: notice.organization
        },
        identifiedVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef
        },
        currentVersion: {
          id: v2.id,
          versionNumber: v2.versionNumber,
          status: v2.status,
          publishedAt: v2.publishedAt,
          effectiveFrom: v2.effectiveFrom,
          documentRef: v2.documentRef,
          signatory: v2.signatory,
          content: v2.content
        },
        changes: []
      };
    }

    // 6. Default Fallback: UNVERIFIED
    return {
      success: true,
      matched: false,
      status: 'UNVERIFIED',
      confidence: 'INSUFFICIENT_CONFIDENCE',
      source,
      message: 'NoticeGuard could not confidently match this image to an authoritative notice in the current prototype registry.',
      notice: null,
      identifiedVersion: null,
      currentVersion: null,
      changes: [],
      guidance: 'Ensure all edges of the notice header and reference code are clearly visible, or check directly with the issuing department.'
    };
  }
}

export const verificationService = new VerificationService();
