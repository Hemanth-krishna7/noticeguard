import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * NoticeGuard Application Shell
 * Provides consistent frame, header, navigation, and footer.
 */
export function Shell({ currentRoute, onNavigate, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <Navbar currentRoute={currentRoute} onNavigate={onNavigate} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
