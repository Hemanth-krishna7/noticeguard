import React from 'react';
import {
  FileCheck2,
  RotateCcw,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatBytes } from '../../utils/imageInput';

/**
 * NoticeReadyState Component
 * Honest Milestone 2 transition state confirming image normalization
 * without fake simulated verification outcomes.
 */
export function NoticeReadyState({
  image,
  onReset,
  onNavigateHome
}) {
  if (!image) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <Card padding="lg" className="border-stone-200/90 shadow-sm text-center space-y-6 bg-white">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <FileCheck2 className="w-8 h-8 stroke-[2]" />
        </div>

        {/* Core Status Message */}
        <div className="space-y-2">
          <Badge variant="accent" size="sm">
            INPUT PIPELINE COMPLETE
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Notice Image Ready
          </h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Your physical notice has been captured and formatted into a unified document structure ready for verification.
          </p>
        </div>

        {/* Normalized Image Metadata Summary */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-left space-y-2.5 text-xs text-stone-700">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/70 font-semibold text-stone-900">
            <span>Normalized Document Metadata</span>
            <span className="font-mono text-[11px] text-stone-500">M2 Schema</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-stone-500">Document Name:</span>
              <p className="font-medium text-stone-800 truncate">{image.name}</p>
            </div>
            <div>
              <span className="text-stone-500">Input Pathway:</span>
              <p className="font-medium text-stone-800 capitalize">{image.source}</p>
            </div>
            <div>
              <span className="text-stone-500">Resolution:</span>
              <p className="font-medium text-stone-800">{image.width} × {image.height} px</p>
            </div>
            <div>
              <span className="text-stone-500">File Payload:</span>
              <p className="font-medium text-stone-800">{formatBytes(image.sizeBytes)} ({image.mimeType})</p>
            </div>
          </div>
        </div>

        {/* Transparent Milestone Boundary Notice */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs text-left space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-amber-950">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Milestone 2 Milestone Completed</span>
          </div>
          <p className="text-amber-900 text-[11px] leading-relaxed">
            In adherence to the project roadmap, the automated verification engine (OCR text extraction, document fingerprinting, and comparison against the authoritative notice registry) will connect to this normalized image payload in subsequent milestones.
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            type="button"
            variant="primary"
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
            variant="outline"
            size="md"
            onClick={onNavigateHome}
            icon={ArrowLeft}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Back to Overview
          </Button>
        </div>
      </Card>
    </div>
  );
}
