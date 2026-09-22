import React from 'react';

/**
 * NoticeGuard Status Badge
 * Visual status token representing the four core verification states:
 * CURRENT | OUTDATED | MODIFIED | UNVERIFIED
 */
export function StatusBadge({
  status = 'UNVERIFIED',
  size = 'md',
  showDot = true,
  className = '',
}) {
  const normalizedStatus = status.toUpperCase();

  const configs = {
    CURRENT: {
      label: 'CURRENT',
      badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200/90',
      dotClass: 'bg-emerald-500',
    },
    OUTDATED: {
      label: 'OUTDATED',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200/90',
      dotClass: 'bg-amber-500',
    },
    MODIFIED: {
      label: 'MODIFIED',
      badgeClass: 'bg-rose-50 text-rose-900 border-rose-200/90',
      dotClass: 'bg-rose-500',
    },
    UNVERIFIED: {
      label: 'UNVERIFIED',
      badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
      dotClass: 'bg-stone-400',
    },
  };

  const current = configs[normalizedStatus] || configs.UNVERIFIED;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-semibold tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-2 font-semibold tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-semibold tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${current.badgeClass} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full shrink-0 ${current.dotClass}`} />
      )}
      <span>{current.label}</span>
    </span>
  );
}
