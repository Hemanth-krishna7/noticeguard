/**
 * NoticeGuard API Client
 * Used for system health check and future backend communication.
 */

const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        isConnected: false,
        status: response.status,
        error: `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      isConnected: true,
      data,
    };
  } catch (err) {
    return {
      isConnected: false,
      error: err.name === 'AbortError' ? 'Timeout' : (err.message || 'Connection failed'),
    };
  }
}
