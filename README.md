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

NoticeGuard has completed **Milestone 3: Minimal Authoritative Notice Registry**.

### Authoritative Notice Registry Purpose:
Physical printed notices on walls inevitably go stale or get modified. To determine whether a photographed physical copy corresponds to official digital truth, the system requires an authoritative source of truth.

In Milestone 3, NoticeGuard introduces the backend registry and data model holding official organizational notices and their complete version histories.

### Data Model (`backend/data/notices.json`):
Each **Notice** contains:
- `id`: Unique identifier (e.g. `not-exam-2026`)
- `title`: Official notice headline
- `department`: Issuing sector / department
- `organization`: Issuing institution name
- `description`: Contextual synopsis
- `currentVersionId`: Pointer to the active official version
- `versions`: Complete chronological array of version snapshots

Each **Version** snapshot contains:
- `id`: Version identifier (e.g. `not-exam-2026-v2`)
- `versionNumber`: Human-readable tag (`v1`, `v2`, etc.)
- `noticeId`: Parent notice reference
- `publishedAt`: ISO publication timestamp
- `effectiveFrom`: ISO effective validity timestamp
- `status`: Lifecycle state (`CURRENT` or `ARCHIVED`)
- `changesSummary`: Plain-language explanation of revisions
- `content`: Official authoritative notice text
- `signatory`: Authorized institutional official
- `documentRef`: Official circular/archive reference number
- `documentImage`: Authoritative visual document reference

### Seeded Demonstration Notices:
1. **End Semester Examination Schedule & Venue Relocation** (`Controller of Examinations`):
   - `v1` (**ARCHIVED**): Initial exam date (Oct 12) in Hall 302.
   - `v2` (**CURRENT**): Exam rescheduled to Oct 15 and relocated to Hall 408 (Annex Wing) due to emergency electrical upgrades.
2. **Central Library Extended Reading Room Hours** (`Library & Information Services`):
   - `v1` (**ARCHIVED**): Standard hours (Mon-Fri 8 AM - 8 PM, weekends closed).
   - `v2` (**CURRENT**): Extended hours (Mon-Fri 7 AM - 11 PM, weekends 9 AM - 5 PM) for exam preparation.
3. **Annual Student Identity Card Validation & Campus Pass Renewal** (`Office of the Registrar`):
   - `v1` (**CURRENT**): Smartcard re-validation window at Counter 4, Administrative Wing.

### Organization Portal Features:
- **Sector/Department Filter**: Real-time filtering across university departments.
- **Master Registry List**: Live query from `GET /api/notices` showing active revision tags and version counts.
- **Version History Lineage**: Interactive timeline displaying the evolution of each notice (`v1 — Archived` ──► `v2 — Current`).
- **Changes Summary Callout**: Explicit explanation of why a newer version superseded an older one.
- **Authoritative Document Sheet**: Rendered official letterhead notice simulating the printed physical record.

### What is Intentionally NOT Implemented in Milestone 3:
- OCR text extraction
- Image-to-document matching algorithms
- Automated verification or diff comparison from uploaded photos
- Organization user authentication or login
- Production third-party database (PostgreSQL/MongoDB)
- Administrative notice editing or publishing tools

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
- **`GET /api/notices/:noticeId`**: Returns single notice record with complete version history.
- **`GET /api/notices/:noticeId/versions/:versionId`**: Returns a specific version snapshot within a notice.

---

## 9. Build and Code Quality

To verify production builds and linting:

```bash
# In frontend directory:
npm run lint    # Oxlint (0 warnings, 0 errors)
npm run build   # Production Vite bundle
```

---

## 10. Future Milestones Roadmap

- **Milestone 2**: Phone Camera Integration & Optical Text Processing (WebRTC camera stream, client-side bounding box detection, and notice alignment guide).
- **Milestone 3**: Authoritative Notice Registry & Database Persistence (PostgreSQL/SQLite schemas for organizations, departments, notices, and version trees).
- **Milestone 4**: Verification Engine & Difference Analysis (Levenshtein/embedding matching, status resolution `CURRENT` / `OUTDATED` / `MODIFIED` / `UNVERIFIED`, and visual side-by-side diffing).
- **Milestone 5**: Organization Publishing Console & Version Publishing (Authentication, document upload, markdown/PDF parsing, and notice lifecycle management).
