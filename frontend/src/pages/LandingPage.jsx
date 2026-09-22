import React from 'react';
import {
  Shield,
  Eye,
  Camera,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Smartphone,
  ArrowRight,
  HelpCircle,
  FileCheck2,
  Clock
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';

/**
 * NoticeGuard Landing Page
 * Introduces the core physical-to-digital verification problem and concept.
 */
export function LandingPage({ onNavigate }) {
  return (
    <div className="w-full">
      {/* ===================================================
          1. HERO SECTION
         =================================================== */}
      <Section spacing="generous" className="border-b border-stone-200/80 bg-gradient-to-b from-[#FAF8F5] via-[#F8F5EE] to-[#FAF8F5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Mission & Core Question */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="accent" size="md" icon={Shield}>
                  PHYSICAL-TO-DIGITAL VERIFICATION
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
                What if the notice in front of you is{' '}
                <span className="relative inline-block text-amber-700 underline decoration-amber-400/60 decoration-wavy decoration-2 underline-offset-8">
                  wrong?
                </span>
              </h1>

              <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-2xl font-normal">
                Official information updates digitally in seconds, yet physical printed copies remain
                pinned to walls, doors, and boards for weeks. NoticeGuard bridges this gap, giving anyone
                the ability to verify physical documents against authoritative digital records.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => onNavigate('verify')}
                  icon={Camera}
                  iconPosition="left"
                >
                  Verify a Notice
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => onNavigate('admin-preview')}
                  icon={Building2}
                  iconPosition="left"
                >
                  Organization Workspace
                </Button>
              </div>

              {/* Trust Tagline */}
              <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Phone-first verification
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-stone-500" />
                  No citizen login needed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Official source truth
                </span>
              </div>
            </div>

            {/* Right Column: Physical vs Digital Divergence Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Physical Card Mock */}
                <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-stone-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Physical Notice on Board
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-mono">
                      Pinned 14 Days Ago
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-stone-900 text-sm">
                      Midterm Examination Schedule: Hall 302
                    </p>
                    <p className="text-stone-500 line-through">
                      Date: Friday, Oct 12 • Time: 09:00 AM • Venue: Hall 302
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-amber-700 font-medium bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                      Physical copy is obsolete
                    </span>
                    <span className="text-[11px] text-stone-500">Notice ID #NG-8491</span>
                  </div>
                </div>

                {/* Arrow connecting the two */}
                <div className="my-2 flex items-center justify-center text-amber-600">
                  <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-stone-300 px-3 py-1 rounded-full text-xs font-medium text-stone-700 shadow-xs">
                    <span>NoticeGuard Match</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                </div>

                {/* Digital Official State Card */}
                <div className="bg-emerald-50/50 rounded-xl border border-emerald-200/90 p-5 shadow-sm space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                        Official Digital Record (v2.0)
                      </span>
                    </div>
                    <StatusBadge status="OUTDATED" size="sm" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-stone-900 text-sm">
                      Rescheduled: Hall 408 (Annex Wing)
                    </p>
                    <p className="text-emerald-900 font-medium">
                      Date: Monday, Oct 15 • Time: 10:30 AM • Venue: Hall 408
                    </p>
                    <p className="text-[11px] text-stone-600">
                      Reason: Scheduled electrical maintenance in original building.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          2. THE PROBLEM SECTION
         =================================================== */}
      <Section spacing="default" className="border-b border-stone-200/80">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="subtle" size="sm" className="mb-2.5">
              THE PHYSICAL-DIGITAL GAP
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              When paper is printed, digital control is severed.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Organizations publish corrections, addendums, and venue adjustments online.
              Meanwhile, hundreds of students, citizens, or employees continue relying on the printed paper pinned to the entrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="lg" hover className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 text-base">
                Invisible Staleness
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Printed paper has no live refresh button. Notices stay pinned on walls for days or months after deadlines, dates, or terms have changed.
              </p>
            </Card>

            <Card padding="lg" hover className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 text-base">
                High-Stakes Consequences
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Missed exams, incorrect application procedures, expired tenders, or outdated health directives create severe friction and loss of trust.
              </p>
            </Card>

            <Card padding="lg" hover className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 text-base">
                Zero Verification Mechanism
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Currently, a reader must search confusing web portals or seek out staff just to confirm if the paper in front of them is legitimate and current.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          3. THE CONCEPT SECTION: 4 STEPS
         =================================================== */}
      <Section spacing="default" className="border-b border-stone-200/80 bg-[#FBF9F5]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="subtle" size="sm" className="mb-2.5">
              HOW NOTICEGUARD WORKS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              The Four-Step Verification Pathway
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base">
              A friction-free sequence engineered to answer one simple question in seconds:
              <br />
              <strong className="text-stone-900">“Is this document still the authoritative truth?”</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <Card padding="md" className="relative border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-md bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <Eye className="w-4 h-4 text-stone-400" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  SEE NOTICE
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  A student, citizen, or employee encounters a printed document pinned on a board, door, or bulletin.
                </p>
              </div>
            </Card>

            {/* Step 2 */}
            <Card padding="md" className="relative border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <Camera className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  SCAN
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Open NoticeGuard on a mobile browser—no account or download required—and point the camera at the paper.
                </p>
              </div>
            </Card>

            {/* Step 3 */}
            <Card padding="md" className="relative border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-md bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <Shield className="w-4 h-4 text-stone-400" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  VERIFY
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  The document is matched against the issuing organization's authoritative digital registry to verify version integrity.
                </p>
              </div>
            </Card>

            {/* Step 4 */}
            <Card padding="md" className="relative border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  GET THE LATEST
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  If the notice is outdated or modified, the user immediately sees the newest official version and key differences.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          4. RESULT STATUS PREVIEW (Purely Visual / Conceptual)
         =================================================== */}
      <Section spacing="default" className="border-b border-stone-200/80">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-2">
              DESIGN SYSTEM TOKENS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Four Definite Verification Outcomes
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              Visual specification of the eventual verification states. Each status provides clarity without ambiguity.
            </p>
            <div className="mt-3 inline-block bg-stone-100 border border-stone-200/90 px-3 py-1 rounded text-[11px] text-stone-600">
              Note: Conceptual UI specification for Milestone 1. Live matching engine is in future milestones.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* CURRENT */}
            <Card padding="md" className="border-emerald-200/80 bg-emerald-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status="CURRENT" size="md" />
                <span className="text-[10px] uppercase font-mono text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  Match 100%
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  Verified Active
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  The physical print exactly represents the organization's current official digital notice. No changes have occurred.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Matches current authoritative record</span>
              </div>
            </Card>

            {/* OUTDATED */}
            <Card padding="md" className="border-amber-200/80 bg-amber-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status="OUTDATED" size="md" />
                <span className="text-[10px] uppercase font-mono text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                  Superseded
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  Newer Version Exists
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  This notice corresponds to an older official version that has been superseded by a subsequent update or addendum.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-amber-800 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Shows latest notice automatically</span>
              </div>
            </Card>

            {/* MODIFIED */}
            <Card padding="md" className="border-rose-200/80 bg-rose-50/20 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status="MODIFIED" size="md" />
                <span className="text-[10px] uppercase font-mono text-rose-700 bg-rose-100/70 px-1.5 py-0.5 rounded">
                  Discrepancy
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  Content Altered
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Discrepancies detected between the physical text and the stored digital record. Critical details diverge from official files.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-rose-800 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Highlights specific mismatches</span>
              </div>
            </Card>

            {/* UNVERIFIED */}
            <Card padding="md" className="border-stone-200 bg-stone-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status="UNVERIFIED" size="md" />
                <span className="text-[10px] uppercase font-mono text-stone-600 bg-stone-200/70 px-1.5 py-0.5 rounded">
                  Low Confidence
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">
                  Cannot Confirm
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  NoticeGuard cannot reliably index or match this notice. The system does not guess when confidence is insufficient.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-stone-600 font-medium flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Guides user to official office</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          5. PUBLIC / ADMIN SPLIT
         =================================================== */}
      <Section spacing="default" className="border-b border-stone-200/80 bg-[#FAF8F5]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="subtle" size="sm" className="mb-2">
              SYSTEM ARCHITECTURE
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Two Interconnected Sides of NoticeGuard
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              Tailored specifically to citizen simplicity on one side and rigorous organizational governance on the other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizen / Public Side */}
            <Card padding="lg" className="border-stone-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <Badge variant="accent" size="sm">
                    PUBLIC EXPERIENCE
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Citizen & Student Verification
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Zero barrier to entry. Anyone who encounters a physical notice can verify it on the spot without downloading an app or creating an account.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Phone-first mobile web experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No login, registration, or app store download</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Plain-language explanation of version changes</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-stone-100">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('verify')}
                  className="w-full"
                >
                  Open Public Notice Scanner
                </Button>
              </div>
            </Card>

            {/* Organization / Admin Side */}
            <Card padding="lg" className="border-stone-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <Badge variant="neutral" size="sm">
                    ORGANIZATION WORKSPACE
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Authoritative Notice Registry
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Universities, municipal bodies, and corporate departments maintain a single digital source of truth with immutable version tracking.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Structured department and sector hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Version control with historical record preservation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-world notice verification readiness</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-stone-100">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('admin-preview')}
                  className="w-full"
                >
                  View Organization Shell
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          6. TRUST & RELIABILITY: UNVERIFIED WHEN UNCERTAIN
         =================================================== */}
      <Section spacing="default" className="border-b border-stone-200/80 bg-white">
        <Container size="narrow">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-stone-800 mx-auto">
              <Shield className="w-6 h-6 stroke-[2]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              The “Unverified When Uncertain” Principle
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              In public notices—where exam locations, regulatory deadlines, and civic health advisories are on the line—a bad guess is dangerous.
            </p>
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 text-left text-xs sm:text-sm text-stone-700 space-y-2.5">
              <p className="font-semibold text-stone-900">
                NoticeGuard does not guess when a notice cannot be confidently matched:
              </p>
              <p className="text-stone-600">
                • If lighting is too poor, text is obstructed, or the document does not exist in an authoritative registry, NoticeGuard clearly reports <strong className="text-stone-900">UNVERIFIED</strong>.
              </p>
              <p className="text-stone-600">
                • Instead of giving false confidence, it safely directs the user to the official issuing department.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===================================================
          7. FINAL PRODUCT CTA
         =================================================== */}
      <Section spacing="default" className="bg-[#F8F5EE]/80">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Ready to verify what you're actually looking at?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Explore the phone-first scanner interface designed specifically for printed notice boards, university corridors, and municipal buildings.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="accent"
                onClick={() => onNavigate('verify')}
                icon={Camera}
                iconPosition="left"
              >
                Verify a Notice Now
              </Button>
            </div>
            <p className="text-[11px] text-stone-500">
              Milestone 2 • Live Camera Capture, Photo Gallery & Desktop Upload
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
