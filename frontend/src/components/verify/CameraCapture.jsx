import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Image as ImageIcon,
  AlertCircle,
  Sun,
  ScanLine,
  RefreshCw
} from 'lucide-react';
import { createNormalizedNoticeImage, validateNoticeFile } from '../../utils/imageInput';

/**
 * CameraCapture Component
 * Real browser camera viewfinder utilizing navigator.mediaDevices.getUserMedia
 */
export function CameraCapture({ onImageSelected, onSwitchToUpload }) {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraState, setCameraState] = useState('initializing'); // 'initializing' | 'active' | 'denied' | 'unsupported' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);

  // Stop camera tracks helper
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore track stop error
        }
      });
      streamRef.current = null;
    }
  }, []);

  // Initialize camera stream
  const initCamera = useCallback(async () => {
    stopCameraStream();
    setCameraState('initializing');
    setErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('unsupported');
      setErrorMessage('Your browser or environment does not support direct camera access.');
      return;
    }

    try {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => setCameraState('active'))
            .catch(() => setCameraState('active'));
        };
      }
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraState('denied');
        setErrorMessage('Camera access was declined. Please allow camera permissions in your browser address bar.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraState('unsupported');
        setErrorMessage('No camera device was detected on your system.');
      } else {
        setCameraState('error');
        setErrorMessage(err.message || 'Unable to access camera.');
      }
    }
  }, [stopCameraStream]);

  // Start on mount, stop on unmount
  useEffect(() => {
    // Start camera stream asynchronously after initial render
    const timeoutId = setTimeout(() => {
      initCamera();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      stopCameraStream();
    };
  }, [initCamera, stopCameraStream]);

  // Capture current video frame
  const handleCaptureFrame = () => {
    if (!videoRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const video = videoRef.current;
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            setIsCapturing(false);
            setErrorMessage('Could not capture frame from camera.');
            return;
          }

          // Stop camera stream immediately upon capture
          stopCameraStream();

          const normalized = await createNormalizedNoticeImage(blob, 'camera', {
            name: `notice_capture_${Date.now()}.jpg`
          });

          onImageSelected(normalized);
        },
        'image/jpeg',
        0.92
      );
    } catch (err) {
      console.error('Capture frame failed:', err);
      setIsCapturing(false);
      setErrorMessage('Frame capture failed. Please try again or select from gallery.');
    }
  };

  // Handle fallback gallery selection
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateNoticeFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    stopCameraStream();
    const normalized = await createNormalizedNoticeImage(file, 'gallery');
    onImageSelected(normalized);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Hidden Gallery Input for direct mobile photos picker */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Main Viewfinder Frame */}
      <div className="relative rounded-3xl bg-stone-900 text-white overflow-hidden shadow-2xl border-4 border-stone-800 aspect-[9/16] sm:aspect-[3/4] flex flex-col justify-between p-4 sm:p-5 select-none">
        {/* Live Video Feed or Fallback State */}
        {cameraState === 'active' && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Top Status Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-stone-200 border border-stone-700/80">
            <span
              className={`w-2 h-2 rounded-full ${
                cameraState === 'active'
                  ? 'bg-emerald-400 animate-pulse'
                  : cameraState === 'initializing'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-400'
              }`}
            />
            <span className="font-mono text-[11px] font-medium tracking-wide">
              {cameraState === 'active'
                ? 'LIVE VIEWFINDER'
                : cameraState === 'initializing'
                ? 'CONNECTING CAMERA'
                : 'CAMERA PAUSED'}
            </span>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Open Photos Gallery"
            className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-medium">Gallery</span>
          </button>
        </div>

        {/* Center: Interactive Viewfinder Brackets OR Error Message */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
          {cameraState === 'active' && (
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-2xl border-2 border-dashed border-white/40 flex flex-col items-center justify-between p-4 pointer-events-none">
              {/* Corner Framing Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg -mt-1 -ml-1" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg -mt-1 -mr-1" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg -mb-1 -ml-1" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg -mb-1 -mr-1" />

              {/* Guidance Hint */}
              <div className="mt-1 bg-stone-950/70 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] text-stone-200 border border-stone-800">
                Fit all edges of the notice inside frame
              </div>

              {/* Center crosshair */}
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-60">
                <div className="w-1 h-1 bg-amber-400 rounded-full" />
              </div>

              {/* Bottom lighting guidance */}
              <div className="flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-amber-300 border border-stone-800">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Avoid glare on glossy notices</span>
              </div>
            </div>
          )}

          {cameraState === 'initializing' && (
            <div className="text-center p-6 space-y-3 bg-stone-950/80 backdrop-blur-md rounded-2xl border border-stone-800 max-w-[280px]">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-sm font-medium text-stone-200">Starting Camera...</p>
              <p className="text-xs text-stone-400">Requesting rear-facing document lens</p>
            </div>
          )}

          {(cameraState === 'denied' || cameraState === 'unsupported' || cameraState === 'error') && (
            <div className="text-center p-5 space-y-3.5 bg-stone-950/90 backdrop-blur-md rounded-2xl border border-stone-700/80 max-w-[300px]">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-stone-100">
                  {cameraState === 'denied' ? 'Camera Permission Denied' : 'Camera Unavailable'}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {errorMessage || 'Unable to open camera on this device.'}
                </p>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Notice From Gallery</span>
                </button>
                <button
                  type="button"
                  onClick={initCamera}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium py-1.5 px-3 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Retry Camera
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Shutter & Controls */}
        <div className="relative z-10 flex flex-col items-center gap-2 pt-2">
          {cameraState === 'active' ? (
            <div className="flex items-center justify-center gap-6">
              {/* Shutter Button */}
              <button
                type="button"
                onClick={handleCaptureFrame}
                disabled={isCapturing}
                aria-label="Capture notice photo"
                className="w-18 h-18 rounded-full border-4 border-amber-400/90 p-1 flex items-center justify-center bg-stone-900/60 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg group focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
              >
                <div className="w-full h-full rounded-full bg-white group-hover:bg-amber-100 flex items-center justify-center text-stone-900 transition-colors shadow-inner">
                  {isCapturing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
                  ) : (
                    <ScanLine className="w-6 h-6 text-stone-900" />
                  )}
                </div>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-xs text-stone-400">
                You can select an existing photo below at any time
              </span>
            </div>
          )}

          <div className="w-full pt-1 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 px-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="hover:text-stone-200 cursor-pointer flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3 text-amber-400" />
              <span>Select photo</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToUpload}
              className="hover:text-stone-200 cursor-pointer underline decoration-stone-600 underline-offset-2"
            >
              Desktop upload mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
