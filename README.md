# NoticeGuard

> Verify physical notices against an organization's authoritative digital records.

**Live Demo:** https://noticeguard-alpha.vercel.app/

## Overview

Printed notices can remain visible even after the official information has been updated. This can cause people to rely on outdated or changed information.

**NoticeGuard** connects physical notices with their authoritative digital versions. A user can capture or upload a notice image, and the system checks it against the organization's stored notice records and versions.

## How It Works

```text
Physical Notice
      ↓
Camera / Image Upload
      ↓
OCR Text Extraction
      ↓
Notice Registry Matching
      ↓
Verification Result
```

NoticeGuard uses **Tesseract.js** to extract text from the uploaded image and performs deterministic matching against the authoritative notice registry.

## Verification Results

- **CURRENT** — The physical notice matches the current authoritative version.
- **OUTDATED** — The physical notice matches an older official version that has been superseded.
- **MODIFIED** — The notice matches a known notice, but important details differ from the authoritative record.
- **UNVERIFIED** — The system cannot confidently match the notice to a known record.

For outdated notices, the system can show the latest official version and the changes between versions.

## Tech Stack

- **Frontend:** React, Vite, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js, Multer, Tesseract.js
- **Registry:** JSON-based authoritative notice and version records

## Running Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```text
NoticeGuard/
├── backend/
│   ├── data/
│   │   └── notices.json
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── utils/
│
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── utils/
```
