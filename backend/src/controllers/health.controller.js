/**
 * Health Controller
 * Returns server operational status, service information, and uptime.
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'noticeguard-api',
    version: '0.1.0',
    milestone: 'Milestone 1: Foundation & Shell',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};
