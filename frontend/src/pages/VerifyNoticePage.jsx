import React, { useState, useEffect } from 'react';
import { Camera, Upload, ArrowLeft } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { CameraCapture } from '../components/verify/CameraCapture';
import { DesktopUpload } from '../components/verify/DesktopUpload';
import { ImagePreview } from '../components/verify/ImagePreview';
import { NoticeReadyState } from '../components/verify/NoticeReadyState';
import { revokeNoticeImage } from '../utils/imageInput';

/**
 * VerifyNoticePage
 * Main entry point for the Public Notice Input Experience (Milestone 2).
 * Orchestrates camera capture, gallery selection, desktop upload, review, and verification-ready states.
 */
export function VerifyNoticePage({ onNavigate }) {
  // Determine default mode: Camera on mobile/touch, Upload on desktop
  const [inputMode, setInputMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isMobileWidth = window.innerWidth < 768;
      return isTouch || isMobileWidth ? 'camera' : 'upload';
    }
    return 'upload';
  });

  // Flow step: 'input' -> 'preview' -> 'ready'
  const [step, setStep] = useState('input');
  const [selectedImage, setSelectedImage] = useState(null);

  // Clean up Object URL on component unmount
  useEffect(() => {
    return () => {
      if (selectedImage) {
        revokeNoticeImage(selectedImage);
      }
    };
  }, [selectedImage]);

  // Handler when an image is captured or selected
  const handleImageSelected = (normalizedImage) => {
    // If an image was previously active, clean up its URL
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
    }
    setSelectedImage(normalizedImage);
    setStep('preview');
  };

  // Handler to retake or replace the image
  const handleRetake = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setStep('input');
  };

  // Handler to remove image and start over
  const handleRemove = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setStep('input');
  };

  // Handler to confirm image and proceed to ready state
  const handleContinue = () => {
    setStep('ready');
  };

  // Reset entire flow for another notice
  const handleReset = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setStep('input');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] flex-1 flex flex-col justify-center">
      <Container size="default">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>

          <Badge variant="accent" size="sm">
            MILESTONE 2 • PUBLIC INPUT
          </Badge>
        </div>

        {/* Section Heading (Visible only on Input Step) */}
        {step === 'input' && (
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2.5">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Verify Physical Notice
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Capture or upload a photo of the printed notice on the wall to check its authenticity against the authoritative digital registry.
            </p>

            {/* Input Mode Selector (Camera vs Desktop Upload) */}
            <div className="pt-3 flex items-center justify-center">
              <div className="inline-flex p-1 bg-stone-200/70 rounded-xl text-xs font-medium border border-stone-300/80">
                <button
                  type="button"
                  onClick={() => setInputMode('camera')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    inputMode === 'camera'
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-600" />
                  <span>Camera Viewfinder</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    inputMode === 'upload'
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 text-stone-700" />
                  <span>File Upload</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: INPUT MODES */}
        {step === 'input' && (
          <div className="animate-in fade-in duration-150">
            {inputMode === 'camera' ? (
              <CameraCapture
                onImageSelected={handleImageSelected}
                onSwitchToUpload={() => setInputMode('upload')}
              />
            ) : (
              <DesktopUpload
                onImageSelected={handleImageSelected}
                onSwitchToCamera={() => setInputMode('camera')}
              />
            )}
          </div>
        )}

        {/* STEP 2: IMAGE PREVIEW & REVIEW */}
        {step === 'preview' && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center max-w-md mx-auto mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Review Notice Photo
              </h2>
              <p className="text-xs text-stone-600">
                Confirm readability before proceeding to verification
              </p>
            </div>

            <ImagePreview
              image={selectedImage}
              onRetake={handleRetake}
              onRemove={handleRemove}
              onContinue={handleContinue}
            />
          </div>
        )}

        {/* STEP 3: READY TRANSITION STATE */}
        {step === 'ready' && (
          <NoticeReadyState
            image={selectedImage}
            onReset={handleReset}
            onNavigateHome={() => onNavigate('landing')}
          />
        )}
      </Container>
    </div>
  );
}
