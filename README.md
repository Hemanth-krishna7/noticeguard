# NOTICEGUARD

> **Bridging the gap between official digital notices and the physical printed copies people actually read.**

NoticeGuard is a physical-to-digital notice verification platform designed for institutions, municipalities, universities, and public facilities. It enables anyone who encounters a printed physical notice to verify its authenticity, active status, and latest official version in seconds using their smartphone.

---

## 1. The Core Problem

Official information changes digitally in real time: schedules are updated, venues are relocated, fee deadlines are extended, and regulations are amended.

However, **physical printed copies remain pinned to walls, bulletin boards, and doors long after they become obsolete**:
```
OFFICIAL DIGITAL NOTICE (Changes in real-time)
        ↓
PHYSICAL PRINTED COPY   (Fixed on wall, severed from digital updates)
        ↓
PERSON READING IT       (Trusts outdated or modified information)
```

Printed paper possesses no live refresh mechanism. This disconnect causes missed examinations, incorrect administrative filings, compliance failures, and confusion.

---

## 2. The Solution

NoticeGuard establishes a continuous chain of trust between the issuing authority and the physical reader:

```
SEE NOTICE  ──►  SCAN VIA PHONE  ──►  VERIFY AGAINST REGISTRY  ──►  GET THE LATEST
```

The system evaluates a physical document and produces one of four definitive outcomes:

| Status Token | Visual Indicator | Meaning |
| :--- | :--- | :--- |
| **`CURRENT`** | Emerald Green | The physical print matches the active official digital notice exactly. Safe to rely on. |
| **`OUTDATED`** | Amber / Orange | The notice was authentic when printed, but a newer official version exists. Automatically displays the diff and latest notice. |
| **`MODIFIED`** | Crimson / Red-Orange | Discrepancies detected between the physical print and digital record (unauthorized alterations). |
| **`UNVERIFIED`** | Neutral Slate / Gray | Low visual confidence or unindexed notice. NoticeGuard strictly refuses to guess or hallucinate truth. |

---

## 3. Product Architecture

NoticeGuard is structured around two distinct operational pillars:

1. **Public Side (Citizen / Reader)**
   - **Phone-first mobile web experience**: No account, login, or app-store installation required.
   - Designed for 3-second checks in front of notice boards.
   - Plain-language version difference summaries.

2. **Organization Side (Authority / Publisher)**
   - Structured department/sector hierarchy.
   - Authoritative digital notice registry with immutable revision histories.
   - Audit-ready notice lifecycle management.

---

## 4. Milestone Status

NoticeGuard has completed **Milestone 4: Minimal Document Verification Engine**.

### Document Verification Engine Purpose:
Milestone 4 connects the public input experience (`#/verify`) with the authoritative notice registry (`backend/data/notices.json`) to create a working end-to-end verification demonstration.

When a citizen, student, or visitor encounters a physical notice pinned to a board, they capture or upload a photo. NoticeGuard evaluates the document against the authoritative digital registry and deterministically resolves one of four official outcome states:

1. **`OUTDATED`** (Primary Demo Pathway — Fall 2026 Examination Schedule):
   - Notice matches an older authoritative record (`v1`, ARCHIVED).
   - Clear visual comparison: `v1 (Archived)` vs `v2 (Current)`.
   - Structured diff highlights changes:
     - **Date**: Monday, October 12, 2026 ➔ Thursday, October 15, 2026
     - **Timing**: 08:30 AM (Exam: 09:00 AM) ➔ 10:00 AM (Exam: 10:30 AM)
     - **Venue**: Hall 302, Main Block ➔ Hall 408, Science & Technology Annex Wing
     - **Reason**: Emergency electrical infrastructure upgrades
   - Interactive **"View Latest Official Notice"** button opens the digital authoritative record sheet modal.

2. **`CURRENT`** (Verified Active Document):
   - Document matches the active official version in the registry (`v2`, CURRENT).
   - Confirms the document is safe to rely on, displaying effective date and registry reference.

3. **`MODIFIED`** (Content Discrepancy Detected):
   - Notice corresponds to a known official topic, but key parameters (dates, venues, times) diverge from official records.
   - Objective, professional phrasing strictly avoids accusatory language ("fake", "forged", "fraudulent").
   - Explains the discrepancy and directs the user to the official authoritative digital notice.

4. **`UNVERIFIED`** (Unindexed / Low Confidence):
   - Unrecognized document not indexed in the current prototype registry.
   - Embodies the NoticeGuard trust principle: **refuses to hallucinate verification**.
   - Provides plain-language guidance to retry with better framing or consult the issuing authority.

### Verification Demo Presets:
To facilitate rapid hackathon evaluation without requiring custom image uploads, the Verify Notice screen includes **4 interactive sample notice presets**:
- **Sample 1**: Outdated Exam Schedule (`v1` — Oct 12, Hall 302)
- **Sample 2**: Current Exam Schedule (`v2` — Oct 15, Hall 408)
- **Sample 3**: Altered Flyer (Discrepancy detected)
- **Sample 4**: Unindexed Community Flyer (Refusal to guess)

### What is Intentionally NOT Implemented in Milestone 4:
- Complex OCR / machine vision pipelines
- LLMs or external third-party AI APIs
- Production databases (PostgreSQL/MongoDB)
- User authentication or RBAC
- Cloud file storage or analytics tracking
- Push notifications or alerting systems

---

## 5. Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Language**: JavaScript (ES Modules, strictly no TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: Oxlint

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (Environment: v25.2.1)
- **Server**: [Express.js](https://expressjs.com/) (v4.21.2)
- **Language**: JavaScript (ES Modules)
- **Middleware**: CORS, Dotenv, JSON parser

---

## 6. Project Structure

```
NoticeGuard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── health.controller.js   # Health check controller
│   │   ├── routes/
│   │   │   └── health.routes.js       # Express routes for /api/health
│   │   ├── app.js                     # Express app, middleware, CORS
│   │   └── server.js                  # Server listener and graceful shutdown
│   └── package.json                   # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx         # Header, branding, subtle API indicator, mobile drawer
│   │   │   │   ├── Footer.jsx         # Mission, ethos, and links
│   │   │   │   └── Shell.jsx          # Top-level application shell
│   │   │   └── ui/
│   │   │       ├── Badge.jsx          # Tag pills and metadata badges
│   │   │       ├── Button.jsx         # Primary, secondary, accent, outline, ghost buttons
│   │   │       ├── Card.jsx           # Clean bordered surface cards
│   │   │       ├── Container.jsx      # Responsive horizontal boundaries
│   │   │       ├── PageHeader.jsx     # Consistent section titles
│   │   │       ├── Section.jsx        # Vertical rhythm layout
│   │   │       └── StatusBadge.jsx    # Status tokens (CURRENT, OUTDATED, etc.)
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx        # Problem, concept, and visual state previews
│   │   │   ├── PublicScanPlaceholderPage.jsx # Phone-first camera viewfinder shell
│   │   │   └── AdminPlaceholderPage.jsx      # Organization workspace shell
│   │   ├── services/
│   │   │   └── api.js                 # API service for health check
│   │   ├── App.jsx                    # Root app with hash-sync navigation
│   │   ├── index.css                  # Tailwind v4 import & custom tokens
│   │   └── main.jsx                   # React 19 entry point
│   ├── index.html                     # HTML shell, metadata, and shield favicon
│   ├── vite.config.js                 # Vite + Tailwind + API proxy config
│   └── package.json                   # Frontend dependencies
├── .env.example                       # Environment variables template
├── .gitignore                         # Git exclusion rules
├── package.json                       # Root convenience scripts
└── README.md                          # Comprehensive documentation
```

---

## 7. Installation & Running Locally

### Prerequisites
- Node.js (v20+ or v25.2.1)
- npm (v10+ or v11.6.2)

### Quick Start

1. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   *The backend starts at `http://localhost:5000`.*
   *Health endpoint available at `http://localhost:5000/api/health`.*

3. **Start the Frontend Application** (in a separate terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   *The frontend starts at `http://localhost:5173`.*

---

## 8. Backend API Endpoints

### System Health
- **`GET /api/health`**: General server operational check.
```json
{
  "status": "ok",
  "service": "noticeguard-api",
  "version": "0.1.0",
  "milestone": "Milestone 1: Foundation & Shell",
  "timestamp": "2026-09-22T05:12:04.161Z",
  "uptime": 19.56
}
```

### Authoritative Registry Endpoints
- **`GET /api/registry/health`**: Summary statistics of the authoritative notice registry (total notices, version count, active departments).
- **`GET /api/notices`**: Returns all official notices in the registry. Supports optional query filtering: `?department=Controller%20of%20Examinations`.
### Verification Engine Endpoint
- **`POST /api/verify`**: Evaluates submitted document metadata/image against the authoritative registry.
  - Request body: `{ "imageName": "exam_schedule_v1.jpg", "demoNoticeTag": "not-exam-2026-v1", "source": "upload" }`
  - Returns structured verification result:
    ```json
    {
      "success": true,
      "matched": true,
      "status": "OUTDATED",
      "confidence": "DEMO_CONFIRMED",
      "notice": {
        "id": "not-exam-2026",
        "title": "End Semester Examination Schedule & Venue Relocation",
        "department": "Controller of Examinations"
      },
      "identifiedVersion": { "versionNumber": "v1", "status": "ARCHIVED" },
      "currentVersion": { "versionNumber": "v2", "status": "CURRENT" },
      "changes": [
        {
          "field": "Examination Date",
          "from": "Monday, October 12, 2026",
          "to": "Thursday, October 15, 2026",
          "critical": true
        }
      ]
    }
    ```

---

## 9. Build and Code Quality

To verify production builds and linting:

```bash
# In frontend directory:
npm run lint    # Oxlint (0 warnings, 0 errors)
npm run build   # Production Vite bundle
```

---

## 10. Milestones & Roadmap

- [x] **Milestone 1**: Foundation & Product Shell (Visual design system, navigation, status indicators).
- [x] **Milestone 2**: Public Notice Input Experience (Camera viewfinder, gallery selection, desktop upload, normalized image model).
- [x] **Milestone 3**: Minimal Authoritative Notice Registry (JSON file repository, versions, changes summaries, organization portal).
- [x] **Milestone 4**: Minimal Document Verification Engine (Deterministic matcher, OUTDATED/CURRENT/MODIFIED/UNVERIFIED states, structured diffs, "View Latest Notice" sheet).
- [ ] **Milestone 5**: Organization Publishing Console & Authentication (Notice authoring, version publishing, revocation).
