import React, { useState, useEffect } from 'react';
import { Shell } from './components/layout/Shell';
import { LandingPage } from './pages/LandingPage';
import { VerifyNoticePage } from './pages/VerifyNoticePage';
import { AdminPlaceholderPage } from './pages/AdminPlaceholderPage';

/**
 * NoticeGuard Root Application Component
 * Manages route navigation with URL hash synchronization.
 */
export default function App() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'verify' || hash === 'scan' || hash === 'scan-preview') return 'verify';
    if (hash === 'admin' || hash === 'admin-preview') return 'admin-preview';
    return 'landing';
  });

  // Sync hash changes (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'verify' || hash === 'scan' || hash === 'scan-preview') {
        setRoute('verify');
      } else if (hash === 'admin' || hash === 'admin-preview') {
        setRoute('admin-preview');
      } else {
        setRoute('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (newRoute) => {
    setRoute(newRoute);
    if (newRoute === 'verify' || newRoute === 'scan-preview') {
      window.location.hash = '/verify';
    } else if (newRoute === 'admin-preview') {
      window.location.hash = '/admin';
    } else {
      window.location.hash = '/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Shell currentRoute={route} onNavigate={handleNavigate}>
      {route === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {route === 'verify' && <VerifyNoticePage onNavigate={handleNavigate} />}
      {route === 'admin-preview' && <AdminPlaceholderPage onNavigate={handleNavigate} />}
    </Shell>
  );
}
