import React from 'react';
import {
  Camera,
  ScanLine,
  Info,
  Sun,
  ArrowLeft
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';

/**
 * Public Scanner Architectural Placeholder Page
 * High-fidelity phone-first viewfinder interface ready for camera stream integration in Milestone 2.
 */
export function PublicScanPlaceholderPage({ onNavigate }) {
  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] flex-1 flex flex-col justify-center">
      <Container size="narrow">
        {/* Navigation Breadcrumb / Back */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>
          <Badge variant="accent" size="sm">
            MILESTONE 1 SCANNER SHELL
          </Badge>
        </div>

        {/* Scanner Viewfinder Wrapper */}
        <div className="max-w-md mx-auto w-full">
          {/* Milestone 1 Transparency Banner */}
          <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <Info className="w-4 h-4 shrink-0 text-amber-700" />
              <span>Architectural Viewfinder Placeholder</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed pl-5.5">
              This layout establishes the phone-first scanner experience for hackathon review.
              Camera hardware access, OCR extraction, and authoritative matching are scheduled for Milestone 2.
            </p>
          </div>

          {/* Phone-First Viewfinder Surface */}
          <div className="relative rounded-3xl bg-stone-900 text-white overflow-hidden shadow-xl border-4 border-stone-800 aspect-[9/16] sm:aspect-[3/4] flex flex-col justify-between p-5 select-none">
            {/* Top Viewfinder Controls Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-stone-200 border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-[11px]">VIEWFINDER READY</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  title="Flashlight control (Milestone 2)"
                  className="w-8 h-8 rounded-full bg-stone-800/80 backdrop-blur-md flex items-center justify-center text-stone-300 border border-stone-700"
                >
                  <Sun className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Central Document Target Box */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-2xl border-2 border-dashed border-stone-500/60 flex flex-col items-center justify-center p-6 text-center">
                {/* Viewfinder Target Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-amber-400 rounded-tl-lg -mt-1 -ml-1" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-amber-400 rounded-tr-lg -mt-1 -mr-1" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-amber-400 rounded-bl-lg -mb-1 -ml-1" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-amber-400 rounded-br-lg -mb-1 -mr-1" />

                {/* Subdued Central Icon */}
                <div className="w-12 h-12 rounded-xl bg-stone-800/80 border border-stone-700 flex items-center justify-center text-stone-400 mb-3">
                  <Camera className="w-6 h-6 text-amber-400" />
                </div>

                <p className="text-sm font-medium text-stone-200">
                  Align Printed Notice
                </p>
                <p className="mt-1 text-[11px] text-stone-400 leading-relaxed max-w-[200px]">
                  Position the official notice header and body within the framing brackets
                </p>

                {/* Guidance Pill */}
                <div className="mt-4 inline-flex items-center gap-1.5 bg-stone-800/90 text-amber-300/90 border border-amber-400/20 px-2.5 py-1 rounded-full text-[10px] font-medium">
                  <span>Ensure good ambient lighting</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="relative z-10 space-y-3">
              {/* Trigger Button Mock (Disabled / Labeled for Milestone 2) */}
              <div className="flex flex-col items-center gap-2">
                <button
                  disabled
                  className="w-16 h-16 rounded-full border-4 border-amber-400/70 p-1 flex items-center justify-center bg-stone-800/60 opacity-60 cursor-not-allowed"
                >
                  <div className="w-full h-full rounded-full bg-amber-400/40 flex items-center justify-center text-amber-200">
                    <ScanLine className="w-6 h-6" />
                  </div>
                </button>
                <span className="text-[11px] text-stone-400">
                  Camera trigger activates in Milestone 2
                </span>
              </div>

              {/* Status Hint */}
              <div className="text-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
                  NOTICEGUARD CORE ENGINE • M1 UI SHELL
                </span>
              </div>
            </div>
          </div>

          {/* Explanatory Context for Evaluators */}
          <div className="mt-5 p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-2 text-stone-600">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Future Public Scan Workflow
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-stone-600 text-[11px] leading-relaxed">
              <li>Open URL on any smartphone browser (zero login required).</li>
              <li>Camera captures physical notice and extracts visual layout & text.</li>
              <li>Registry verifies if the notice matches an active official record.</li>
              <li>Result instantly displays CURRENT, OUTDATED, MODIFIED, or UNVERIFIED.</li>
            </ol>
          </div>
        </div>
      </Container>
    </div>
  );
}
