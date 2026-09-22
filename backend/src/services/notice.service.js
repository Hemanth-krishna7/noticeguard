import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.resolve(__dirname, '../../data/notices.json');

/**
 * Notice Service
 * In-memory / file-backed access to authoritative organizational notices.
 */
class NoticeService {
  constructor() {
    this.cache = null;
    this.lastLoaded = 0;
  }

  /**
   * Load notices from JSON file (reloads if file changes or on initial start)
   */
  loadData() {
    try {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      this.cache = JSON.parse(fileData);
      this.lastLoaded = Date.now();
      return this.cache;
    } catch (err) {
      console.error('Error reading notices.json:', err);
      return this.cache || [];
    }
  }

  /**
   * Get all notices with optional department filter
   * @param {Object} [filter={}]
   * @param {string} [filter.department]
   * @returns {Array} List of notices
   */
  getAllNotices(filter = {}) {
    const notices = this.loadData();
    if (!filter.department || filter.department.toLowerCase() === 'all') {
      return notices;
    }
    const deptQuery = filter.department.toLowerCase();
    return notices.filter((n) => n.department.toLowerCase() === deptQuery);
  }

  /**
   * Find a single notice by ID
   * @param {string} noticeId
   * @returns {Object|null}
   */
  getNoticeById(noticeId) {
    const notices = this.loadData();
    return notices.find((n) => n.id === noticeId) || null;
  }

  /**
   * Find a specific version within a notice
   * @param {string} noticeId
   * @param {string} versionId
   * @returns {Object|null}
   */
  getNoticeVersion(noticeId, versionId) {
    const notice = this.getNoticeById(noticeId);
    if (!notice) return null;

    const version = notice.versions.find(
      (v) => v.id === versionId || v.versionNumber.toLowerCase() === versionId.toLowerCase()
    );

    if (!version) return null;

    return {
      ...version,
      noticeTitle: notice.title,
      department: notice.department,
      organization: notice.organization,
      isLatest: notice.currentVersionId === version.id
    };
  }

  /**
   * Get registry summary statistics
   */
  getRegistryStats() {
    const notices = this.loadData();
    const departments = [...new Set(notices.map((n) => n.department))];
    const totalVersions = notices.reduce((acc, n) => acc + (n.versions ? n.versions.length : 0), 0);

    return {
      status: 'ok',
      totalNotices: notices.length,
      totalVersions,
      departments,
      organization: 'City Central University',
      lastSynced: new Date().toISOString()
    };
  }
}

export const noticeService = new NoticeService();
