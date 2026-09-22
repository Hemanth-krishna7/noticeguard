import React from 'react';

/**
 * NoticeGuard Standard Button Component
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:ring-stone-900 active:bg-black',
    secondary: 'bg-[#F5F2EB] text-stone-800 border border-stone-300/80 hover:bg-[#EAE6DC] focus-visible:ring-stone-400',
    accent: 'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500 shadow-sm active:bg-amber-800',
    outline: 'border border-stone-300 text-stone-800 hover:bg-stone-100/70 focus-visible:ring-stone-400',
    ghost: 'text-stone-700 hover:bg-stone-200/50 hover:text-stone-900 focus-visible:ring-stone-300',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />
      )}
    </button>
  );
}
