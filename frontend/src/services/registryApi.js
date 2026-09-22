/**
 * Registry API Client
 * Fetches authoritative notices, version lineages, and registry stats from the backend.
 */

const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');

/**
 * Fetch all notices, with optional department filter
 * @param {Object} [params={}]
 * @param {string} [params.department]
 * @returns {Promise<{ success: boolean, data?: Array, error?: string }>}
 */
export async function fetchNotices({ department } = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/api/notices`, window.location.origin);
    if (department && department !== 'all') {
      url.searchParams.set('department', department);
    }

    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return { success: false, error: `Failed to load notices (HTTP ${response.status})` };
    }

    const json = await response.json();
    return { success: true, data: json.data || [] };
  } catch (err) {
    return { success: false, error: err.message || 'Network error fetching notices' };
  }
}

/**
 * Fetch a single notice with complete version history
 * @param {string} noticeId
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function fetchNoticeById(noticeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notices/${noticeId}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return { success: false, error: `Notice not found (HTTP ${response.status})` };
    }

    const json = await response.json();
    return { success: true, data: json.data };
  } catch (err) {
    return { success: false, error: err.message || 'Error fetching notice details' };
  }
}

/**
 * Fetch a specific version of a notice
 * @param {string} noticeId
 * @param {string} versionId
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function fetchNoticeVersion(noticeId, versionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notices/${noticeId}/versions/${versionId}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return { success: false, error: `Version not found (HTTP ${response.status})` };
    }

    const json = await response.json();
    return { success: true, data: json.data };
  } catch (err) {
    return { success: false, error: err.message || 'Error fetching notice version' };
  }
}

/**
 * Fetch registry health and summary statistics
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function fetchRegistryHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/registry/health`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    const json = await response.json();
    return { success: true, data: json };
  } catch (err) {
    return { success: false, error: err.message || 'Error checking registry health' };
  }
}
