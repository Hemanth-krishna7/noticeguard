import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Camera, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateNoticeFile, createNormalizedNoticeImage } from '../../utils/imageInput';

/**
 * DesktopUpload Component
 * Clean drag-and-drop file upload with keyboard accessibility and format hints.
 */
export function DesktopUpload({ onImageSelected, onSwitchToCamera }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const processFile = async (file) => {
    setErrorMessage('');
    if (!file) return;

    const validation = validateNoticeFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    try {
      const normalized = await createNormalizedNoticeImage(file, 'upload');
      onImageSelected(normalized);
    } catch (err) {
      console.error('Failed to process image file:', err);
      setErrorMessage('Could not load the selected notice image. Please try a different photo.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Validation Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/90 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice Image Error</p>
            <p className="mt-0.5 text-rose-700">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label="Upload notice image dropzone"
        className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
          isDragOver
            ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
            : 'border-stone-300 hover:border-stone-400 bg-white shadow-xs'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <UploadCloud className="w-7 h-7 stroke-[1.8]" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-base sm:text-lg font-semibold text-stone-900">
              Drag and drop your notice photo here
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Or browse files from your computer to inspect the document
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={FileImage}
            iconPosition="left"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose Notice Image
          </Button>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-500">
            <span>Supported: JPG, PNG, WEBP</span>
            <span>•</span>
            <span>Maximum size: 15MB</span>
          </div>
        </div>
      </div>

      {/* Alternative Device Camera Banner */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-200/80 flex items-center justify-center text-stone-700 shrink-0">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-stone-800">Prefer using a camera?</p>
            <p className="text-[11px] text-stone-500">
              Switch to live viewfinder mode if your device has an integrated webcam or lens
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onSwitchToCamera}
          icon={Camera}
          iconPosition="left"
        >
          Open Camera
        </Button>
      </div>
    </div>
  );
}
