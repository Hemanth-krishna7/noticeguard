import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  FileText,
  Eye,
  X,
  ShieldCheck,
  Stamp
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

/**
 * VerificationResultView Component
 * Displays the authoritative verification result for a physical notice:
 * OUTDATED | CURRENT | MODIFIED | UNVERIFIED
 */
export function VerificationResultView({
  result,
  onReset,
  onNavigate
}) {
  const [showLatestNoticeModal, setShowLatestNoticeModal] = useState(false);

  if (!result) return null;

  const {
    status = 'UNVERIFIED',
    notice,
    identifiedVersion,
    currentVersion,
    changes = [],
    message,
    guidance,
    discrepancyDetails
  } = result;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* ===================================================
          1. OUTDATED NOTICE RESULT (Primary Demo Pathway)
         =================================================== */}
      {status === 'OUTDATED' && (
        <Card padding="lg" className="border-amber-200/90 bg-white shadow-sm space-y-6 text-left">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusBadge status="OUTDATED" size="lg" />
                <span className="text-xs font-mono text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded font-semibold">
                  Superseded Notice
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 pt-1">
                Notice Matches an Older Official Version
              </h2>
            </div>
            <div className="text-xs text-stone-500 sm:text-right">
              <span className="block font-mono font-medium text-stone-700">
                {notice?.department}
              </span>
              <span>{notice?.organization}</span>
            </div>
          </div>

          {/* Notice Subject Line */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Matched Official Notice
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900">
              {notice?.title}
            </h3>
          </div>

          {/* Identified vs Current Version Comparison Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                Physical Copy Identified As:
              </span>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-sm font-bold text-stone-900 font-mono">
                  {identifiedVersion?.versionNumber?.toUpperCase() || 'Version 1'}
                </span>
                <span className="text-[11px] text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded font-medium">
                  ARCHIVED
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Issued: {new Date(identifiedVersion?.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200/90 bg-emerald-50/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Current Authoritative Version:
              </span>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-sm font-bold text-emerald-950 font-mono">
                  {currentVersion?.versionNumber?.toUpperCase() || 'Version 2'}
                </span>
                <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                  ACTIVE DIGITAL
                </span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Effective: {new Date(currentVersion?.effectiveFrom).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* WHAT CHANGED: Structured Diff Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                What Changed In The Official Revision
              </span>
              <Badge variant="accent" size="sm">
                Critical Differences
              </Badge>
            </div>

            <div className="space-y-2">
              {changes.map((change, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF8F5] space-y-1.5"
                >
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wide">
                    {change.field}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs items-center">
                    <div className="sm:col-span-5 line-through text-stone-500 font-medium">
                      {change.from}
                    </div>
                    <div className="sm:col-span-2 text-center text-amber-600 font-bold hidden sm:block">
                      →
                    </div>
                    <div className="sm:col-span-5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80">
                      {change.to}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action: VIEW LATEST NOTICE & Reset */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onReset}
              icon={RotateCcw}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Verify Another Notice
            </Button>

            <Button
              type="button"
              variant="accent"
              size="md"
              onClick={() => setShowLatestNoticeModal(true)}
              icon={Eye}
              iconPosition="left"
              className="w-full sm:w-auto font-semibold"
            >
              View Latest Official Notice
            </Button>
          </div>
        </Card>
      )}

      {/* ===================================================
          2. CURRENT NOTICE RESULT
         =================================================== */}
      {status === 'CURRENT' && (
        <Card padding="lg" className="border-emerald-200/90 bg-white shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusBadge status="CURRENT" size="lg" />
                <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                  Verified Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 pt-1">
                Notice Matches the Current Official Version
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs text-stone-700">
            <p className="font-semibold text-emerald-950 text-sm">
              Matches the Current Authoritative Record
            </p>
            <p className="text-stone-600 leading-relaxed">
              This physical notice corresponds to the current authoritative version maintained in the official registry. No subsequent amendments or relocations have been issued.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
              <span className="font-semibold text-stone-900">{notice?.title}</span>
              <span className="font-mono font-bold text-emerald-800">
                {currentVersion?.versionNumber?.toUpperCase()} CURRENT
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1">
              <div>
                <span className="text-stone-400">Department:</span>
                <p className="font-medium text-stone-800">{notice?.department}</p>
              </div>
              <div>
                <span className="text-stone-400">Effective Date:</span>
                <p className="font-medium text-stone-800">
                  {new Date(currentVersion?.effectiveFrom).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onReset}
              icon={RotateCcw}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Verify Another Notice
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setShowLatestNoticeModal(true)}
              icon={FileText}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              View Official Registry Sheet
            </Button>
          </div>
        </Card>
      )}

      {/* ===================================================
          3. MODIFIED NOTICE RESULT (Discrepancy)
         =================================================== */}
      {status === 'MODIFIED' && (
        <Card padding="lg" className="border-rose-200/90 bg-white shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusBadge status="MODIFIED" size="lg" />
                <span className="text-xs font-mono text-rose-800 bg-rose-100 px-2 py-0.5 rounded font-semibold">
                  Content Divergence
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 pt-1">
                Content Discrepancy Detected
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2">
            <p className="font-semibold text-rose-900">
              Notice content does not match the stored authoritative version
            </p>
            <p className="text-rose-800 leading-relaxed">
              {discrepancyDetails || (
                <>This physical document appears to correspond to <strong className="text-stone-900">{notice?.title}</strong>, but key details (such as venue, timing, or dates) diverge from the official records in the university registry.</>
              )}
            </p>
            <p className="text-[11px] text-rose-700 font-medium">
              {guidance || "Important: Please do not rely on this physical copy. Check the official digital notice below or visit the issuing department in person."}
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onReset}
              icon={RotateCcw}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Verify Another Notice
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setShowLatestNoticeModal(true)}
              icon={Eye}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              View Official Authoritative Version
            </Button>
          </div>
        </Card>
      )}

      {/* ===================================================
          4. UNVERIFIED NOTICE RESULT
         =================================================== */}
      {status === 'UNVERIFIED' && (
        <Card padding="lg" className="border-stone-300 bg-white shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusBadge status="UNVERIFIED" size="lg" />
                <span className="text-xs font-mono text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded font-semibold">
                  Unindexed Document
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 pt-1">
                Notice Could Not Be Confirmed
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 stroke-[2]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
            <p className="font-semibold text-stone-900">
              NoticeGuard does not guess when a notice cannot be confidently matched
            </p>
            <p className="text-stone-600 leading-relaxed">
              {message || "In accordance with our trust principle, NoticeGuard does not guess answers when certainty is insufficient. The document may belong to an unindexed department or the image may lack clear reference markings."}
            </p>
            <p className="text-[11px] text-stone-500">
              {guidance || "Guidance: Ensure good ambient lighting, align the entire notice header and body within the frame, or consult the issuing authority directly."}
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onReset}
              icon={RotateCcw}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Try Another Image
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => onNavigate('landing')}
              className="w-full sm:w-auto"
            >
              Back to Overview
            </Button>
          </div>
        </Card>
      )}

      {/* Prototype Disclosure Note */}
      <div className="text-center text-[11px] text-stone-500">
        NoticeGuard Prototype • Verification matched against active authoritative registry
      </div>

      {/* ===================================================
          5. MODAL: AUTHORITATIVE OFFICIAL DOCUMENT SHEET
         =================================================== */}
      {showLatestNoticeModal && currentVersion && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-300 overflow-hidden my-8">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Stamp className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Official Registry Record (Current Version)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLatestNoticeModal(false)}
                aria-label="Close official document modal"
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Letterhead Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-[#FFFDF9] text-stone-900 select-text">
              <div className="text-center border-b-2 border-stone-900 pb-4 space-y-1">
                <h4 className="text-sm sm:text-base font-bold tracking-wider uppercase font-serif">
                  {notice?.organization || 'City Central University'}
                </h4>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-700">
                  {notice?.department}
                </p>
                <p className="text-[10px] font-mono text-stone-500">
                  REGISTRY REF: {currentVersion.documentRef} • REVISION: {currentVersion.versionNumber?.toUpperCase()} ACTIVE
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 gap-2 border-b border-stone-200 pb-3">
                <div>
                  <span className="text-stone-400">Date Issued: </span>
                  <span className="font-medium text-stone-800">
                    {new Date(currentVersion.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400">Effective Date: </span>
                  <span className="font-medium text-stone-800">
                    {new Date(currentVersion.effectiveFrom).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed font-serif whitespace-pre-line">
                {currentVersion.content}
              </div>

              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-stone-900 font-sans">
                    {currentVersion.signatory}
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Authoritative Record • Maintained in Digital Registry
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 border-2 border-dashed border-emerald-500 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="block font-bold">OFFICIAL DIGITAL RECORD</span>
                    <span className="text-emerald-700">AUTHORITATIVE VERSION</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-stone-200 bg-[#FAF8F5] flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setShowLatestNoticeModal(false)}
              >
                Close Official Document
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
