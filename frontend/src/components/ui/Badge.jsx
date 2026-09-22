import React from 'react';

/**
 * NoticeGuard Badge / Pill Tag Component
 */
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon: Icon,
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-1.5',
  };

  const variantStyles = {
    neutral: 'bg-stone-100 text-stone-700 border border-stone-200/80',
    accent: 'bg-amber-50 text-amber-800 border border-amber-200/90',
    stone: 'bg-stone-800 text-stone-100',
    subtle: 'bg-stone-200/60 text-stone-600',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
