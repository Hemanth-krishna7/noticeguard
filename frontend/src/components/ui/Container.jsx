import React from 'react';

/**
 * NoticeGuard Responsive Container
 */
export function Container({
  children,
  className = '',
  size = 'default',
  ...props
}) {
  const sizeMap = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeMap[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
