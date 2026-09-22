import React from 'react';
import { Shield } from 'lucide-react';

/**
 * NoticeGuard Application Footer
 */
export function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-stone-200/90 bg-[#F5F2EB]/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-stone-900 flex items-center justify-center text-amber-400">
                <Shield className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <span className="font-bold tracking-tight text-stone-900 text-sm">
                NOTICEGUARD
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-md">
              Bridging the gap between official digital notices and the physical printed copies
              people read in the real world. Built with a commitment to verifiability and truth.
            </p>
          </div>

          {/* Architecture Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
              Application Shell
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Overview & Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verify')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Verify Notice Input
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-preview')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Organization Portal (Preview)
                </button>
              </li>
            </ul>
          </div>

          {/* Verification Philosophy */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
              Verification Ethos
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Authoritative Source Truth</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                <span>Unverified When Uncertain</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Clear Version History</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} NoticeGuard. Built for Hackathon Demonstration.</p>
          <p className="text-stone-400">
            Current release: v0.1.0 • Deterministic Registry Verification • Production Prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
