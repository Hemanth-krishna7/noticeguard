import React from 'react';
import {
  RotateCcw,
  Trash2,
  ArrowRight,
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatBytes } from '../../utils/imageInput';

/**
 * ImagePreview Component
 * Displays captured/selected notice photo with metadata and verification actions.
 */
export function ImagePreview({
  image,
  isVerifying = false,
  onRetake,
  onRemove,
  onContinue
}) {
  if (!image) return null;

  const sourceLabels = {
    camera: { label: 'Camera Capture', icon: Camera, badgeVariant: 'accent' },
    gallery: { label: 'Photo Gallery', icon: ImageIcon, badgeVariant: 'neutral' },
    upload: { label: 'Desktop Upload', icon: Upload, badgeVariant: 'neutral' }
  };

  const currentSource = sourceLabels[image.source] || sourceLabels.upload;
  const SourceIcon = currentSource.icon;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <Card padding="md" className="border-stone-200/90 shadow-sm space-y-4 bg-white">
        {/* Header with Source Badge and Quality Assurance Checklist */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Badge variant={currentSource.badgeVariant} size="sm" icon={SourceIcon}>
              {currentSource.label}
            </Badge>
            <span className="text-xs text-stone-500 font-mono truncate max-w-[180px]">
              {image.name}
            </span>
          </div>

          <div className="text-right text-[11px] text-stone-500 font-mono">
            {image.width > 0 && image.height > 0 && (
              <span>{image.width} × {image.height} px • </span>
            )}
            <span>{formatBytes(image.sizeBytes)}</span>
          </div>
        </div>

        {/* Notice Image Frame */}
        <div className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-200/80 flex items-center justify-center max-h-[480px]">
          <img
            src={image.previewUrl}
            alt="Captured Physical Notice Preview"
            className="w-full h-auto max-h-[480px] object-contain select-none"
          />
          {isVerifying && (
            <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white space-y-3 p-4 animate-in fade-in duration-150">
              <RefreshCw className="w-9 h-9 animate-spin text-amber-400" />
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300 block">
                  Registry Inspection In Progress
                </span>
                <span className="text-[11px] text-stone-300 block max-w-xs">
                  Evaluating document parameters against authoritative institutional records...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quality Check Advisory */}
        <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 space-y-1">
          <p className="font-semibold text-stone-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Inspection Checklist</span>
          </p>
          <ul className="text-[11px] text-stone-600 space-y-0.5 list-disc list-inside">
            <li>Is the notice title, date, and body text clearly readable?</li>
            <li>Are all four corners of the notice within frame without heavy obstruction?</li>
          </ul>
        </div>

        {/* Primary Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={isVerifying}
              onClick={onRetake}
              icon={RotateCcw}
              iconPosition="left"
              className="flex-1 sm:flex-initial"
            >
              Retake / Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="md"
              disabled={isVerifying}
              onClick={onRemove}
              icon={Trash2}
              iconPosition="left"
              className="text-stone-600 hover:text-rose-700"
              title="Remove image"
            >
              Remove
            </Button>
          </div>

          <Button
            type="button"
            variant="accent"
            size="md"
            disabled={isVerifying}
            onClick={onContinue}
            icon={isVerifying ? RefreshCw : ArrowRight}
            iconPosition={isVerifying ? 'left' : 'right'}
            iconClassName={isVerifying ? 'animate-spin' : ''}
            className={`w-full sm:w-auto font-semibold ${isVerifying ? 'opacity-90' : ''}`}
          >
            {isVerifying ? 'Verifying Document...' : 'Verify Notice'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
