import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';
import { checkBackendHealth } from '../../services/api';

/**
 * NoticeGuard Application Shell Header / Navbar
 */
export function Navbar({ currentRoute, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState({ state: 'checking', message: 'Checking API...' });

  useEffect(() => {
    let isMounted = true;

    async function verifyHealth() {
      const result = await checkBackendHealth();
      if (!isMounted) return;

      if (result.isConnected) {
        setApiStatus({ state: 'online', message: 'API Online' });
      } else {
        setApiStatus({ state: 'offline', message: 'API Offline' });
      }
    }

    verifyHealth();
    // Subtle polling every 20 seconds to keep development status truthful
    const interval = setInterval(verifyHealth, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { id: 'landing', label: 'Overview' },
    { id: 'verify', label: 'Verify Notice' },
    { id: 'admin-preview', label: 'Organization Portal' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Mark & Title */}
          <button
            onClick={() => handleLinkClick('landing')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg p-1 -ml-1 cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-amber-400 shadow-xs group-hover:bg-stone-800 transition-colors">
              <Shield className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-stone-900 text-base leading-none">
                NOTICEGUARD
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium mt-0.5">
                Notice Verification
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-stone-900 bg-stone-200/60 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Subtle secondary API status indicator & Primary CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Subtle API Health Dot */}
            <div
              title={`Backend: ${apiStatus.message}`}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium text-stone-500 bg-stone-100 border border-stone-200/80 select-none"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  apiStatus.state === 'online'
                    ? 'bg-emerald-500'
                    : apiStatus.state === 'checking'
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-stone-400'
                }`}
              />
              <span className="tracking-tight text-stone-600">{apiStatus.message}</span>
            </div>

            <button
              onClick={() => handleLinkClick('verify')}
              className="bg-stone-900 text-white hover:bg-stone-800 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-xs"
            >
              Verify Notice
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Minimal dot on mobile */}
            <span
              title={`API: ${apiStatus.message}`}
              className={`w-2 h-2 rounded-full mr-1 ${
                apiStatus.state === 'online' ? 'bg-emerald-500' : 'bg-stone-400'
              }`}
            />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-2 py-1.5 mb-2 bg-stone-100 rounded text-xs text-stone-600">
            <span>System Status:</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus.state === 'online' ? 'bg-emerald-500' : 'bg-stone-400'
                }`}
              />
              {apiStatus.message}
            </span>
          </div>

          {navLinks.map((link) => {
            const isActive = currentRoute === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-stone-200/80 text-stone-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('verify')}
              className="w-full bg-stone-900 text-white hover:bg-stone-800 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors cursor-pointer text-center"
            >
              Verify Notice
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
