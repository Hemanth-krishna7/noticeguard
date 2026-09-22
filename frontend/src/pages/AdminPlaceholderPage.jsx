import React from 'react';
import {
  Building2,
  FolderTree,
  FileText,
  History,
  UploadCloud,
  ArrowLeft,
  Info,
  Lock
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

/**
 * Organization / Admin Architectural Placeholder Page
 * Shows structured layout for future authoritative notice publishing & version control.
 */
export function AdminPlaceholderPage({ onNavigate }) {
  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] flex-1 flex flex-col">
      <Container size="default">
        {/* Navigation Breadcrumb / Back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>
          <Badge variant="stone" size="sm">
            MILESTONE 1 ADMIN SHELL
          </Badge>
        </div>

        {/* Milestone Transparency Alert */}
        <div className="mb-6 p-4 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs space-y-1">
          <div className="flex items-center gap-2 font-semibold text-stone-900">
            <Info className="w-4 h-4 text-stone-700 shrink-0" />
            <span>Organization Portal Architecture Shell</span>
          </div>
          <p className="text-stone-600 leading-relaxed pl-6">
            This screen provides the structural blueprint for issuing organizations (universities, municipal bodies, enterprises).
            Authentication, notice authoring, and database persistence will be introduced in subsequent milestones.
          </p>
        </div>

        {/* Mock Organization Dashboard Frame */}
        <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
          {/* Organization Top Bar */}
          <div className="border-b border-stone-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-stone-900">
                    City Central University
                  </h2>
                  <Badge variant="neutral" size="sm">
                    Verified Org
                  </Badge>
                </div>
                <p className="text-xs text-stone-500">
                  Authoritative Registry • Domain: cc-univ.edu
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                Auth disabled in M1
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled
                icon={UploadCloud}
                iconPosition="left"
              >
                Publish New Notice
              </Button>
            </div>
          </div>

          {/* Dashboard Body with Architectural Subsections */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Department Hierarchy Preview */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <FolderTree className="w-4 h-4 text-stone-600" />
                    Sectors / Departments
                  </span>
                  <span className="text-[10px] text-stone-500">Architecture</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Organizations will structure notices under distinct departments to prevent conflicting updates.
                </p>
                <div className="space-y-1.5 text-xs text-stone-700 pt-1">
                  <div className="p-2 rounded bg-white border border-stone-200 font-medium flex items-center justify-between">
                    <span>Academic Affairs</span>
                    <span className="text-[10px] text-stone-500 font-mono">14 Active</span>
                  </div>
                  <div className="p-2 rounded bg-stone-100/70 border border-stone-200 text-stone-600 flex items-center justify-between">
                    <span>Examination Controller</span>
                    <span className="text-[10px] text-stone-500 font-mono">8 Active</span>
                  </div>
                  <div className="p-2 rounded bg-stone-100/70 border border-stone-200 text-stone-600 flex items-center justify-between">
                    <span>Campus Facilities</span>
                    <span className="text-[10px] text-stone-500 font-mono">3 Active</span>
                  </div>
                </div>
              </div>

              {/* Versioning Protocol Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  <History className="w-4 h-4 text-stone-600" />
                  <span>Version Integrity Protocol</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Every notice edit creates an immutable child version. When a citizen scans an older physical print, NoticeGuard traces the change log.
                </p>
              </div>
            </div>

            {/* Right Main Panel: Registry Overview Blueprint */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-stone-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-stone-600" />
                    <h3 className="font-semibold text-sm text-stone-900">
                      Authoritative Notice Registry Blueprint
                    </h3>
                  </div>
                  <Badge variant="subtle" size="sm">
                    Static Schema Preview
                  </Badge>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors bg-white space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-stone-900">
                          Notice #CC-2026-089: End-Term Exam Timetable
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-0.5">
                          <span>Dept: Examination Controller</span>
                          <span>•</span>
                          <span>Published: Sep 18, 2026</span>
                          <span>•</span>
                          <span className="font-mono">v1.2 Active</span>
                        </div>
                      </div>
                      <StatusBadge status="CURRENT" size="sm" />
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Updated room allocations for Hall 401 through 408. Supersedes initial notification from Sep 10.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors bg-white space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-stone-900">
                          Notice #CC-2026-074: Library Renovation Closure
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-0.5">
                          <span>Dept: Campus Facilities</span>
                          <span>•</span>
                          <span>Published: Aug 29, 2026</span>
                          <span>•</span>
                          <span className="font-mono">v2.0 Active</span>
                        </div>
                      </div>
                      <StatusBadge status="CURRENT" size="sm" />
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Main wing closed. Temporary study tables relocated to Student Centre 2nd Floor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Roadmap Extension Note */}
              <div className="p-4 rounded-xl border border-dashed border-stone-300 bg-[#FAF8F5] text-stone-600 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium text-stone-800">
                    Next Milestone: Backend Storage & Authentication
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Database schemas for notices, revisions, and department permissions will attach to this layout.
                  </p>
                </div>
                <Badge variant="subtle" size="sm">
                  Milestone 3 Roadmap
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
