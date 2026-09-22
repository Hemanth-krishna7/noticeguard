import React from 'react';

/**
 * NoticeGuard Surface Card
 */
export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) {
  const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:border-stone-400/80 hover:shadow-sm transition-all duration-200'
    : '';

  return (
    <div
      className={`bg-white rounded-xl border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${paddingMap[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
