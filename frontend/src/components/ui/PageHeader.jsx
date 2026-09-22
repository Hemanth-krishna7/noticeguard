import React from 'react';

/**
 * NoticeGuard Page Header
 */
export function PageHeader({
  badge,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col mb-10 sm:mb-14 ${alignClasses[align]} ${className}`}>
      {badge && <div className="mb-3">{badge}</div>}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.15]">
        {title}
      </h1>
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
