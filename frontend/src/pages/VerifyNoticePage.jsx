import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  ArrowLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { CameraCapture } from '../components/verify/CameraCapture';
import { DesktopUpload } from '../components/verify/DesktopUpload';
import { ImagePreview } from '../components/verify/ImagePreview';
import { VerificationResultView } from '../components/verify/VerificationResultView';
import { revokeNoticeImage } from '../utils/imageInput';
import { verifyNoticeImage } from '../services/verificationApi';

/**
 * Generate a visual synthetic document data URL for prototype demo presets
 */
function createDemoNoticeDataUrl(title, subtitle, badgeText, statusColor, customBodyLines) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');

  // Background Paper Texture
  ctx.fillStyle = '#FFFDF8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle border / shadow
  ctx.strokeStyle = '#D6D3D1';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // University Header Bar
  ctx.fillStyle = '#1C1917';
  ctx.fillRect(70, 70, canvas.width - 140, 100);

  ctx.fillStyle = '#FAF8F5';
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  ctx.fillText('CITY CENTRAL UNIVERSITY • OFFICIAL NOTICE', canvas.width / 2, 134);

  // Document Badge
  ctx.fillStyle = statusColor || '#D97706';
  ctx.fillRect(canvas.width / 2 - 220, 210, 440, 48);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(badgeText || 'PHYSICAL NOTICE COPY', canvas.width / 2, 242);

  // Headline Title
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 46px serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, canvas.width / 2, 335);

  // Subtitle / Reference
  ctx.fillStyle = '#57534E';
  ctx.font = '24px monospace';
  ctx.fillText(subtitle, canvas.width / 2, 390);

  // Divider Line
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 435);
  ctx.lineTo(canvas.width - 100, 435);
  ctx.stroke();

  // Document Body Paragraphs
  ctx.fillStyle = '#292524';
  ctx.font = '30px serif';
  ctx.textAlign = 'left';

  const bodyLines = customBodyLines || [
    'TO ALL CANDIDATES AND FACULTY MEMBERS:',
    '',
    'This physical circular is posted on the institutional bulletin board for',
    'student compliance and immediate public reference.',
    '',
    'Please inspect the official scheduled parameters below:',
    '• Verify reporting timing and venue allocation carefully.',
    '• Discrepancies between printed copies and the digital registry',
    '  must be brought to the Controller of Examinations.',
    '',
    'NoticeGuard Physical-to-Digital Verification Protocol active.'
  ];

  let y = 500;
  for (const line of bodyLines) {
    if (line.startsWith('•')) {
      ctx.font = 'bold 29px sans-serif';
      ctx.fillStyle = '#1C1917';
    } else if (line.startsWith('OFFICIAL') || line.startsWith('ADDENDUM') || line.startsWith('UNOFFICIAL') || line.startsWith('ANNUAL')) {
      ctx.font = 'bold 31px serif';
      ctx.fillStyle = '#0C0A09';
    } else {
      ctx.font = '28px serif';
      ctx.fillStyle = '#44403C';
    }
    ctx.fillText(line, 120, y);
    y += 52;
  }

  // Institutional Official Stamp
  ctx.save();
  ctx.translate(canvas.width - 320, canvas.height - 280);
  ctx.rotate(-0.08);
  ctx.strokeStyle = statusColor || '#D97706';
  ctx.lineWidth = 5;
  ctx.strokeRect(-160, -60, 320, 120);
  ctx.fillStyle = statusColor || '#D97706';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AUTHORIZED POSTING', 0, -15);
  ctx.font = '15px monospace';
  ctx.fillText('CAMPUS BULLETIN ARCHIVE', 0, 18);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.9);
}

function dataUrlToBlob(dataUrl) {
  try {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch {
    return null;
  }
}

/**
 * VerifyNoticePage
 * Public Notice Input & Minimal Verification Engine (Milestone 4).
 */
export function VerifyNoticePage({ onNavigate }) {
  const [inputMode, setInputMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isMobileWidth = window.innerWidth < 768;
      return isTouch || isMobileWidth ? 'camera' : 'upload';
    }
    return 'upload';
  });

  // Flow step: 'input' -> 'preview' -> 'result'
  const [step, setStep] = useState('input');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationError, setVerificationError] = useState(null);

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
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
    }
    setSelectedImage(normalizedImage);
    setVerificationResult(null);
    setVerificationError(null);
    setStep('preview');
  };

  // Quick Demo Preset Loader
  const handleLoadDemoPreset = (presetKey) => {
    let name = '';
    let demoNoticeTag = '';
    let title = '';
    let subtitle = '';
    let badgeText = '';
    let color = '';
    let customBodyLines = [];

    if (presetKey === 'exam-v1') {
      name = 'exam_schedule_v1_notice_board.jpg';
      demoNoticeTag = 'not-exam-2026-v1';
      title = 'Fall 2026 Examination Schedule (v1)';
      subtitle = 'REF: CCU-EXAM-2026-089-V1 • OCT 12 • HALL 302';
      badgeText = 'OUTDATED PHYSICAL NOTICE (OCT 12)';
      color = '#D97706';
      customBodyLines = [
        'OFFICIAL CIRCULAR: END SEMESTER EXAMINATION TIMETABLE',
        '',
        'To all undergraduate candidates and departmental faculty:',
        'Examinations for the Autumn Term 2026 are scheduled as follows:',
        '',
        '• Examination Date: Monday, October 12, 2026',
        '• Reporting Timing: 08:30 AM (Commences: 09:00 AM – 12:00 PM)',
        '• Assigned Examination Venue: Hall 302, Main Academic Block',
        '• Standard Published Timetable for all registered candidates',
        '',
        'Candidates must carry their Student ID card and Hall Pass.',
        'Direct inquiries to the Office of the Controller of Examinations.'
      ];
    } else if (presetKey === 'exam-v2') {
      name = 'exam_schedule_v2_current.jpg';
      demoNoticeTag = 'not-exam-2026-v2';
      title = 'Revised Examination Schedule (v2)';
      subtitle = 'REF: CCU-EXAM-2026-089-R2 • OCT 15 • HALL 408';
      badgeText = 'CURRENT OFFICIAL REVISION (OCT 15)';
      color = '#059669';
      customBodyLines = [
        'ADDENDUM NOTIFICATION: REVISED EXAMINATION SCHEDULE',
        '',
        'Notice is hereby given that due to infrastructure upgrades in Main Block,',
        'the schedule published in Circular 089 is amended as follows:',
        '',
        '• Rescheduled Date: Thursday, October 15, 2026',
        '• Revised Timing: 10:00 AM (Commences: 10:30 AM – 01:30 PM)',
        '• Relocated Venue: Hall 408, Science & Tech Annex Wing (2nd Floor)',
        '• Revision Reason: Emergency electrical infrastructure upgrade',
        '',
        'This constitutes the active authoritative schedule for Autumn 2026.',
        'Dr. Aris Thorne, Controller of Examinations'
      ];
    } else if (presetKey === 'exam-modified') {
      name = 'exam_schedule_altered_flyer.jpg';
      demoNoticeTag = 'not-exam-modified';
      title = 'Exam Schedule (Unofficial Date)';
      subtitle = 'REF: CCU-EXAM-2026-UNOFFICIAL • OCT 22 • HALL 101';
      badgeText = 'CONTENT DISCREPANCY DETECTED';
      color = '#DC2626';
      customBodyLines = [
        'UNOFFICIAL STUDENT CIRCULAR: SEMESTER TIMETABLE',
        '',
        'Attention all registered classes:',
        'Please note alternate examination guidelines circulating on campus:',
        '',
        '• Stated Date: Thursday, October 22, 2026',
        '• Stated Timing: 02:00 PM – 05:00 PM',
        '• Stated Venue: Hall 101, Ground Floor Lecture Theater',
        '',
        'NoticeGuard registry check will detect content divergence against',
        'the stored authoritative university records.'
      ];
    } else {
      name = 'generic_campus_poster.png';
      demoNoticeTag = 'unregistered-poster';
      title = 'Campus Student Art Showcase';
      subtitle = 'REF: STUDENT-ACTIVITY-UNREGISTERED';
      badgeText = 'COMMUNITY BULLETIN (UNINDEXED)';
      color = '#64748B';
      customBodyLines = [
        'ANNUAL CAMPUS STUDENT ART & MUSIC SHOWCASE',
        '',
        'Presented by the Student Cultural Committee:',
        'Join us for the autumn fine arts exhibition and live performances!',
        '',
        '• Event Date: Friday, November 06, 2026 at 05:00 PM',
        '• Location: Student Activity Center Amphitheater',
        '• Entry: Free for all students and visitors with campus pass',
        '',
        'This community activity notice is unindexed in the official',
        'administrative registry. NoticeGuard does not guess answers.'
      ];
    }

    const dataUrl = createDemoNoticeDataUrl(title, subtitle, badgeText, color, customBodyLines);

    const mockNormalizedImage = {
      id: `demo_${Date.now()}`,
      name,
      demoNoticeTag,
      source: 'upload',
      previewUrl: dataUrl,
      file: dataUrlToBlob(dataUrl),
      sizeBytes: 184500,
      mimeType: 'image/jpeg',
      width: 1200,
      height: 1600,
      timestamp: Date.now()
    };

    handleImageSelected(mockNormalizedImage);
  };

  // Handler to perform verification against authoritative registry
  const handleStartVerification = async () => {
    if (!selectedImage || isVerifying) return;

    setIsVerifying(true);
    setVerificationError(null);

    // Simulate a brief natural scan processing pause (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = await verifyNoticeImage(selectedImage);

    setIsVerifying(false);

    if (!res.success) {
      setVerificationError(res.error || 'Verification request failed.');
      return;
    }

    setVerificationResult(res.data);
    setStep('result');
  };

  // Handler to retake or replace the image
  const handleRetake = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setVerificationResult(null);
    setStep('input');
  };

  // Handler to remove image and start over
  const handleRemove = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setVerificationResult(null);
    setStep('input');
  };

  // Reset entire flow for another notice
  const handleReset = () => {
    if (selectedImage) {
      revokeNoticeImage(selectedImage);
      setSelectedImage(null);
    }
    setVerificationResult(null);
    setVerificationError(null);
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
            PUBLIC VERIFICATION • OFFICIAL REGISTRY
          </Badge>
        </div>

        {/* Section Heading (Visible only on Input Step) */}
        {step === 'input' && (
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2.5">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Verify Physical Notice
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Capture or upload a photo of the printed notice to check whether it corresponds to the current authoritative digital version in the official registry.
            </p>

            {/* Try a demo sample (Evaluator Shortcut) */}
            <div className="pt-2 p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200/90 text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-700 font-medium">
                <span className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Try a demo sample
                </span>
                <span className="text-[11px] text-stone-500">Optional evaluator shortcuts</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleLoadDemoPreset('exam-v1')}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <span className="block text-[11px] font-bold text-amber-900 group-hover:text-amber-700">
                    Sample 1: Outdated
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight pt-0.5">
                    Exam Schedule v1 (Hall 302, Oct 12)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadDemoPreset('exam-v2')}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <span className="block text-[11px] font-bold text-emerald-900 group-hover:text-emerald-700">
                    Sample 2: Current
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight pt-0.5">
                    Exam Schedule v2 (Hall 408, Oct 15)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadDemoPreset('exam-modified')}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-rose-400 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <span className="block text-[11px] font-bold text-rose-900 group-hover:text-rose-700">
                    Sample 3: Modified
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight pt-0.5">
                    Altered flyer / discrepancy
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadDemoPreset('unregistered')}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-stone-400 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <span className="block text-[11px] font-bold text-stone-800 group-hover:text-stone-600">
                    Sample 4: Unverified
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight pt-0.5">
                    Unindexed community poster
                  </span>
                </button>
              </div>
            </div>

            {/* Input Mode Selector (Camera vs Desktop Upload) */}
            <div className="pt-2 flex items-center justify-center">
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
                Confirm readability and click <strong className="text-stone-900 font-semibold">Verify Notice</strong> to query the authoritative registry
              </p>
            </div>

            {verificationError && (
              <div className="max-w-xl mx-auto mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{verificationError}</span>
              </div>
            )}

            <ImagePreview
              image={selectedImage}
              isVerifying={isVerifying}
              onRetake={handleRetake}
              onRemove={handleRemove}
              onContinue={handleStartVerification}
            />
          </div>
        )}

        {/* STEP 3: VERIFICATION RESULT VIEW */}
        {step === 'result' && (
          <VerificationResultView
            result={verificationResult}
            submittedImage={selectedImage}
            onReset={handleReset}
            onNavigate={onNavigate}
          />
        )}
      </Container>
    </div>
  );
}
