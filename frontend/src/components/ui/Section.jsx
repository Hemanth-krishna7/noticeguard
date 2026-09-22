import React from 'react';

/**
 * NoticeGuard Standard Section
 */
export function Section({
  children,
  className = '',
  spacing = 'default',
  id,
  ...props
}) {
  const spacingMap = {
    compact: 'py-8 sm:py-12',
    default: 'py-12 sm:py-20',
    generous: 'py-16 sm:py-28',
  };

  return (
    <section
      id={id}
      className={`relative ${spacingMap[spacing]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
