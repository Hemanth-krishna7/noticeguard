import React, { useState, useEffect, useCallback } from 'react';
import {
  Building2,
  FolderTree,
  FileText,
  History,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Stamp,
  ShieldCheck
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { fetchNotices, fetchRegistryHealth } from '../services/registryApi';

/**
 * OrganizationPortalPage
 * Authoritative Notice Registry Viewer for Milestone 3.
 * Enables inspection of official notices, department categorization, and multi-version lineages.
 */
export function OrganizationPortalPage({ onNavigate }) {
  const [notices, setNotices] = useState([]);
  const [registryStats, setRegistryStats] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load notices and registry stats from backend API
  const loadRegistryData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const [noticesRes, statsRes] = await Promise.all([
      fetchNotices({ department: selectedDepartment }),
      fetchRegistryHealth()
    ]);

    if (!noticesRes.success) {
      setError(noticesRes.error || 'Failed to load authoritative notices.');
      setIsLoading(false);
      return;
    }

    setNotices(noticesRes.data);
    if (statsRes.success) {
      setRegistryStats(statsRes.data);
    }

    // Set default selected notice if none selected or if filtered out
    if (noticesRes.data.length > 0) {
      setSelectedNoticeId((prevId) => {
        const exists = noticesRes.data.some((n) => n.id === prevId);
        const activeId = exists ? prevId : noticesRes.data[0].id;
        const activeItem = noticesRes.data.find((n) => n.id === activeId);
        if (activeItem) {
          setSelectedVersionId(activeItem.currentVersionId);
        }
        return activeId;
      });
    } else {
      setSelectedNoticeId(null);
      setSelectedVersionId(null);
    }

    setIsLoading(false);
  }, [selectedDepartment]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadRegistryData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadRegistryData]);

  // Derive current notice and currently viewed version
  const activeNotice = notices.find((n) => n.id === selectedNoticeId) || null;
  const activeVersion =
    activeNotice?.versions.find((v) => v.id === selectedVersionId) ||
    activeNotice?.versions.find((v) => v.id === activeNotice.currentVersionId) ||
    activeNotice?.versions[0] ||
    null;

  // Handle notice selection
  const handleSelectNotice = (notice) => {
    setSelectedNoticeId(notice.id);
    setSelectedVersionId(notice.currentVersionId);
  };

  // Department tabs list
  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'Controller of Examinations', label: 'Examinations' },
    { id: 'Library & Information Services', label: 'Library' },
    { id: 'Office of the Registrar', label: 'Registrar' }
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] flex-1 flex flex-col">
      <Container size="default">
        {/* Navigation Breadcrumb & Top Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <Badge variant="stone" size="sm">
              MILESTONE 3 • AUTHORITATIVE REGISTRY
            </Badge>
            <button
              type="button"
              onClick={loadRegistryData}
              title="Refresh Registry Data"
              className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Organization Top Banner */}
        <div className="mb-6 bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold shadow-xs shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl font-bold text-stone-900">
                    City Central University
                  </h1>
                  <Badge variant="accent" size="sm">
                    Authoritative Publisher
                  </Badge>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Official Notice Registry • Domain: <span className="font-mono text-stone-600">ccu.edu</span> • Node/Express JSON Store
                </p>
              </div>
            </div>

            {/* Registry Stats Summary */}
            {registryStats && (
              <div className="flex items-center gap-4 bg-[#FAF8F5] border border-stone-200/80 px-4 py-2.5 rounded-xl text-xs text-stone-600">
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-400 block">Notices</span>
                  <span className="font-semibold text-stone-900 text-sm">{registryStats.totalNotices}</span>
                </div>
                <div className="w-px h-6 bg-stone-200" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-400 block">Versions</span>
                  <span className="font-semibold text-stone-900 text-sm">{registryStats.totalVersions}</span>
                </div>
                <div className="w-px h-6 bg-stone-200" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-400 block">Status</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Department Filter Tabs */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <FolderTree className="w-3.5 h-3.5 text-stone-400" />
              Sectors:
            </span>
            {departments.map((dept) => {
              const isActive = selectedDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading and Error Feedback */}
        {isLoading && (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-600" />
            <p className="text-xs font-medium">Querying authoritative notice registry...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-center space-y-2">
            <p className="text-sm font-semibold">Registry Access Error</p>
            <p className="text-xs text-rose-700">{error}</p>
            <Button size="sm" variant="secondary" onClick={loadRegistryData}>
              Retry Query
            </Button>
          </div>
        )}

        {/* Master-Detail Registry Grid */}
        {!isLoading && !error && notices.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (4 cols): Notice Registry Master List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-stone-500" />
                  Notices in Registry ({notices.length})
                </span>
                <span className="text-[11px] text-stone-500 font-mono">Live API</span>
              </div>

              <div className="space-y-2.5">
                {notices.map((notice) => {
                  const isSelected = notice.id === selectedNoticeId;
                  const currentVer = notice.versions.find((v) => v.id === notice.currentVersionId) || notice.versions[0];
                  return (
                    <div
                      key={notice.id}
                      onClick={() => handleSelectNotice(notice)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectNotice(notice);
                        }
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isSelected
                          ? 'bg-white border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                          : 'bg-white/80 hover:bg-white border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {notice.department}
                        </span>
                        <StatusBadge status="CURRENT" size="sm" />
                      </div>

                      <h3 className="font-semibold text-stone-900 text-xs sm:text-sm leading-snug">
                        {notice.title}
                      </h3>

                      <p className="mt-1.5 text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        {notice.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-mono font-medium text-stone-700">
                          {currentVer ? `${currentVer.versionNumber} Active` : 'Active'}
                        </span>
                        <span>{notice.versions.length} {notice.versions.length === 1 ? 'version' : 'versions'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (8 cols): Selected Notice Inspector */}
            {activeNotice && activeVersion && (
              <div className="lg:col-span-8 space-y-5">
                {/* Inspector Header Card */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="subtle" size="sm">
                          {activeNotice.department}
                        </Badge>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="font-mono text-[11px] text-stone-500">
                          ID: {activeNotice.id}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-xl font-bold text-stone-900">
                        {activeNotice.title}
                      </h2>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <StatusBadge status={activeVersion.status} size="md" />
                    </div>
                  </div>

                  {/* Version History Timeline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <History className="w-4 h-4 text-stone-500" />
                        Version History Lineage
                      </span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        Select version to inspect
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {activeNotice.versions.map((version) => {
                        const isSelectedVersion = version.id === activeVersion.id;
                        const isCurrentVersion = version.id === activeNotice.currentVersionId;

                        return (
                          <button
                            key={version.id}
                            type="button"
                            onClick={() => setSelectedVersionId(version.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                              isSelectedVersion
                                ? 'bg-amber-50/60 border-amber-400 ring-1 ring-amber-400/30'
                                : 'bg-stone-50/70 hover:bg-stone-100/70 border-stone-200'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono font-bold text-xs text-stone-900 flex items-center gap-1.5">
                                <span>{version.versionNumber}</span>
                                {isCurrentVersion && (
                                  <span className="text-[10px] font-sans font-medium text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                                    Latest Active
                                  </span>
                                )}
                              </span>
                              <StatusBadge status={version.status} size="sm" />
                            </div>

                            <p className="text-[11px] text-stone-600 line-clamp-1">
                              {version.changesSummary}
                            </p>

                            <div className="text-[10px] text-stone-400 flex items-center gap-2 pt-0.5">
                              <span>Pub: {new Date(version.publishedAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>Ref: {version.documentRef}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Changes Summary Callout */}
                  {activeVersion.changesSummary && (
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Changes in Version {activeVersion.versionNumber}:</span>
                      </div>
                      <p className="text-amber-900/90 leading-relaxed pl-5 text-[11px]">
                        {activeVersion.changesSummary}
                      </p>
                    </div>
                  )}

                  {/* Authoritative Document Representation Sheet */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Stamp className="w-4 h-4 text-stone-600" />
                        Authoritative Official Document
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {activeVersion.documentRef}
                      </span>
                    </div>

                    {/* Official Notice Letterhead Surface */}
                    <div className="bg-[#FFFDF9] border border-stone-300 rounded-xl p-6 sm:p-8 shadow-inner space-y-6 text-stone-900 select-text">
                      {/* Institutional Header */}
                      <div className="text-center border-b-2 border-stone-900 pb-4 space-y-1">
                        <h4 className="text-sm sm:text-base font-bold tracking-wider uppercase font-serif text-stone-900">
                          {activeNotice.organization}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-700">
                          {activeNotice.department}
                        </p>
                        <p className="text-[10px] font-mono text-stone-500">
                          REGISTRY ARCHIVE REF: {activeVersion.documentRef} • REVISION: {activeVersion.versionNumber.toUpperCase()}
                        </p>
                      </div>

                      {/* Document Meta Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 gap-2 border-b border-stone-200 pb-3">
                        <div>
                          <span className="text-stone-400">Date Issued: </span>
                          <span className="font-medium text-stone-800">
                            {new Date(activeVersion.publishedAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400">Effective Date: </span>
                          <span className="font-medium text-stone-800">
                            {new Date(activeVersion.effectiveFrom).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Official Content Body */}
                      <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed font-serif whitespace-pre-line">
                        {activeVersion.content}
                      </div>

                      {/* Signatory & Verification Seal Block */}
                      <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-stone-900 font-sans">
                            {activeVersion.signatory}
                          </p>
                          <p className="text-[11px] text-stone-500 font-sans">
                            Issued by Authoritative Institutional Mandate
                          </p>
                        </div>

                        {/* Digital Verification Stamp */}
                        <div className="inline-flex items-center gap-2 border-2 border-dashed border-stone-400 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-stone-600 bg-[#FAF8F5]">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <span className="block font-bold text-stone-800">NOTICEGUARD VERIFIED REGISTRY</span>
                            <span className="text-stone-500">DIGITAL SOURCE OF TRUTH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
