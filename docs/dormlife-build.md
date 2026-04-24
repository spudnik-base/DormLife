# dormlife. — Full Build Guide for Claude Code

A complete walkthrough for taking the prototype into a production PWA, pushed to GitHub, and deployed.

---

## What You're Building

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React | Fast, lightweight, first-class PWA support |
| Styling | CSS Modules or Tailwind | Your call — guide covers both |
| Storage | Google Sheets via Apps Script | No backend, teacher-friendly |
| PWA | `vite-plugin-pwa` | Offline support, installable on mobile |
| Hosting | Vercel (or Netlify) | Free, auto-deploys from GitHub |
| Photos | Google Drive via Apps Script | Optional, same endpoint as Sheets |

---

## Design System

Bright, paper-feel light theme. Five pastels plus a soft peach as per-module accents, on a warm off-white canvas with soft charcoal text.

### Colour tokens

Add to `src/styles/globals.css` as CSS custom properties:

```css
:root {
  --butter: #F5EDB0;
  --rose:   #EDB9BE;
  --lilac:  #C7B4DB;
  --peri:   #B5C4E6;
  --mint:   #BCDCC2;
  --peach:  #F3CDB3;

  --bg:     #FFFBF4;   /* warm off-white canvas */
  --ink:    #2B2B3C;   /* soft charcoal text */
  --muted:  #8B8B9E;
  --accent: #7A6BD1;   /* deeper lilac for CTAs / focus */
}
```

### Module → colour mapping

Add a `color` field to each module in `src/data/modules.js`:

| Module index | Token |
|---|---|
| 0 | `--butter` |
| 1 | `--rose` |
| 2 | `--lilac` |
| 3 | `--peri` |
| 4 | `--mint` |
| 5 | `--peach` |

### Tone guidance

- Cards use their module colour at ~30% opacity as a tint, full-strength as an accent bar or icon pill.
- Primary CTAs: `--accent` on `--bg`; hover lifts with a subtle shadow, not a colour change.
- Text is always `--ink` on any pastel — contrast is sufficient at these saturations.
- Success / XP gain use `--mint`; warm errors use `--rose`.
- Keep generous corner radii (16–24px) and airy padding for the "inviting" feel.

---

## Dorms

`Dorm` is a fixed dropdown on setup, not free-text. Options:

```js
export const DORMS = [
  "Beau Site",
  "Savoy",
  "Beau Reveil",
  "Esplanade",
  "BEC girls",
  "BEC boys",
];
```

Store this in `src/data/dorms.js`. `SetupScreen` renders it as a `<select>` (or custom chip grid) and the chosen dorm is persisted in localStorage alongside the student name, and included in every sync payload to the sheet (column B).

---

## Prerequisites

Make sure you have these before starting:

```bash
node --version    # needs v18+
npm --version     # needs v9+
git --version     # any recent version
```

If you don't have Node, install it from [nodejs.org](https://nodejs.org) (choose LTS).

---

## Phase 1 — Project Setup

### 1.1 Scaffold the Vite project

```bash
npm create vite@latest dormlife -- --template react
cd dormlife
npm install
```

### 1.2 Install dependencies

```bash
# PWA plugin
npm install -D vite-plugin-pwa

# Icons (already used in the prototype)
npm install lucide-react

# Optional: if you want Tailwind instead of custom CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.3 Clean up the Vite boilerplate

Delete everything inside `src/` except `main.jsx`. Claude Code prompt:

```
Delete the boilerplate contents of src/ — remove App.css, App.jsx default 
content, index.css default content, and assets/. Keep main.jsx but clear it 
to just import React and render a placeholder div.
```

---

## Phase 2 — Project Structure

Ask Claude Code to create this folder structure:

```
dormlife/
├── public/
│   ├── icons/              ← PWA icons (see Phase 4)
│   └── screenshots/        ← optional, for app store listing
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── ModuleCard.jsx
│   │   ├── ModuleDetail.jsx
│   │   ├── QuizTab.jsx
│   │   ├── CheckInTab.jsx
│   │   ├── LearnTab.jsx
│   │   ├── BadgesView.jsx
│   │   ├── ChoresView.jsx
│   │   ├── TeacherView.jsx
│   │   ├── SetupScreen.jsx
│   │   └── ScriptModal.jsx
│   ├── hooks/
│   │   ├── useProgress.js  ← all XP + progress state logic
│   │   └── useSheets.js    ← Google Sheets sync logic
│   ├── data/
│   │   ├── modules.js      ← the 6 module definitions
│   │   └── mockStudents.js ← teacher demo data
│   ├── styles/
│   │   └── globals.css     ← CSS variables, base styles, fonts
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── index.html
└── package.json
```

**Claude Code prompt to do this in one go:**

```
Create the folder structure above inside src/. Add an index.js barrel export 
to src/components/ and src/hooks/. Leave all files empty for now — 
just create them.
```

---

## Phase 3 — Migrate the Prototype

### 3.1 Paste in the prototype

Drop the full `DormApp.jsx` prototype into the project root as `DormApp.prototype.jsx` — don't delete it, you'll reference it throughout migration.

### 3.2 Extract data files

**Claude Code prompt:**

```
Read DormApp.prototype.jsx. Extract the MODULES array into src/data/modules.js 
and the MOCK_STUDENTS array into src/data/mockStudents.js. 
Export both as named exports. Keep the exact same data structure.
```

### 3.3 Extract the useProgress hook

```
Create src/hooks/useProgress.js. Extract all progress/XP state from 
DormApp.prototype.jsx into a custom hook called useProgress(). 

It should expose:
- progress, xp, studentName, dorm, sheetsUrl
- getLevel(moduleId) — returns 0/1/2/3
- markLearn(module)
- markQuizPassed(module, score)
- markChoreDone(module, note)
- setupUser(name, dorm, url)
- totalDone, levelNum, xpPct

Use localStorage for persistence (key: "dorm-v4"). 
Handle JSON parse errors gracefully.
```

> **Note on storage:** In the Claude.ai artifact we used `window.storage` (a sandbox API). In a real app, use `localStorage` — it's perfectly fine here since this is per-device student data.

### 3.4 Extract the useSheets hook

```
Create src/hooks/useSheets.js. Extract the Google Sheets sync logic 
from DormApp.prototype.jsx into a hook called useSheets(sheetsUrl, studentName, dorm).

It should expose:
- sync(payload) — POST to sheetsUrl with { student, dorm, ...payload }
- syncStatus — null | "syncing" | "ok" | "err"

Use mode: "no-cors" on the fetch. Auto-clear syncStatus after 3 seconds.
Handle missing URL gracefully (just skip the fetch, don't throw).
```

### 3.5 Migrate components one by one

Use this prompt pattern for each component. Example for QuizTab:

```
Create src/components/QuizTab.jsx.

Extract the quiz UI from DormApp.prototype.jsx. The component receives:
- module (object from modules.js)
- quizPassed (bool)
- onPass(score) callback

Manage quiz state (qIdx, qSel, qFeed, qAns, qDone) internally.
Call onPass(score) when the student scores 3+ out of 5.
Include a retry button on fail.
Keep all existing CSS class names exactly as they are in the prototype.
```

Repeat for: `LearnTab`, `CheckInTab`, `ModuleDetail`, `ModuleCard`, `BottomNav`, `BadgesView`, `ChoresView`, `TeacherView`, `SetupScreen`, `ScriptModal`.

**SetupScreen specifics:**

```
Create src/components/SetupScreen.jsx.

Collect three things before the student can use the app:
1. Student name — text input, required
2. Dorm — <select> populated from DORMS in src/data/dorms.js, required
3. Sheets URL — text input, optional (can be pre-filled from VITE_SHEETS_URL)

On submit, call setupUser(name, dorm, url) from useProgress.
Disable submit until name and dorm are both set.
Style with the pastel palette — each dorm option gets a subtle pastel background chip.
```

**TeacherView specifics:**

```
TeacherView groups students by dorm. Show one collapsible section per dorm
(from DORMS), with the dorm name as a pill in that dorm's pastel, and the
students inside. Include a "filter by dorm" dropdown at the top.
```

### 3.6 Wire up App.jsx

```
Create src/App.jsx. Wire together all components using useProgress and useSheets.

App should handle:
- Top-level view routing (home / chores / badges / module detail / teacher)
- Setup screen on first load (if no studentName in localStorage)
- Settings modal
- Mode toggle (student / teacher)
- Inject Google Fonts link on mount

Import all components from src/components/ and hooks from src/hooks/.
```

---

## Phase 4 — PWA Configuration

### 4.1 Generate icons

You need a 512×512 PNG icon. Use any of these free tools:
- [favicon.io](https://favicon.io) — generate from emoji (use 🏠)
- [realfavicongenerator.net](https://realfavicongenerator.net) — most complete output

Place them in `public/icons/`:
```
public/icons/
├── icon-192.png
├── icon-512.png
├── icon-maskable-192.png   ← same image is fine to start
└── icon-maskable-512.png
```

### 4.2 Configure vite-plugin-pwa

**Claude Code prompt:**

```
Update vite.config.js to add vite-plugin-pwa with this config:

App name: "dormlife."
Short name: "dormlife"
Description: "Dorm life skills tracker"
Theme color: "#FFFBF4"
Background color: "#FFFBF4"
Display: standalone
Start URL: /
Icons: 192 and 512 versions from public/icons/
Scope: /

Enable generateSW strategy with these runtime caching rules:
- Cache Google Fonts (CacheFirst, max 1 year)
- Cache app assets (StaleWhileRevalidate)

Also add a registerSW import in src/main.jsx.
```

### 4.3 Add web app manifest meta tags

```
Add to index.html:
- <meta name="theme-color" content="#FFFBF4">
- <meta name="apple-mobile-web-app-capable" content="yes">
- <meta name="apple-mobile-web-app-status-bar-style" content="default">
- <meta name="apple-mobile-web-app-title" content="dormlife.">
- <link rel="apple-touch-icon" href="/icons/icon-192.png">
- viewport meta: width=device-width, initial-scale=1, viewport-fit=cover
```

---

## Phase 5 — Google Drive Photo Upload (the addition)

This extends the existing Apps Script to also accept photos and save them to Drive.

### 5.1 Update the Apps Script

Open your existing Apps Script and replace `doPost` with this:

```javascript
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet();

    let photoUrl = "";

    // Handle optional photo upload
    if (d.photo) {
      const folder = getOrCreateFolder("dormlife-photos");
      const blob = Utilities.newBlob(
        Utilities.base64Decode(d.photo),
        d.photoMime || "image/jpeg",
        `${d.student}-${d.module}-${Date.now()}.jpg`
      );
      const file = folder.createFile(blob);
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );
      photoUrl = file.getUrl();
    }

    sheet.appendRow([
      new Date().toLocaleString(),  // A Timestamp
      d.dorm    || "",              // B Dorm
      d.student || "",              // C Student
      d.module  || "",              // D Module
      d.action  || "",              // E Action
      d.score   || "",              // F Score
      d.xp      || 0,               // G XP
      d.note    || "",              // H Note
      photoUrl                      // I Photo URL
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, photoUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}
```

After pasting, click **Deploy → Manage Deployments → Edit → New Version → Deploy**. The URL stays the same.

### 5.2 Update useSheets.js to send the photo

**Claude Code prompt:**

```
Update src/hooks/useSheets.js.

Add a syncWithPhoto(payload, photoFile) function that:
1. If photoFile is null, calls the existing sync() with no photo field
2. If photoFile exists:
   - Converts it to base64 using FileReader
   - Adds photo (base64 string) and photoMime (file.type) to the payload
   - POSTs to sheetsUrl as normal
3. Returns the photoUrl from the response if available

Keep the existing sync() function unchanged for non-photo actions.
```

### 5.3 Update CheckInTab.jsx to use it

**Claude Code prompt:**

```
Update src/components/CheckInTab.jsx.

When the student taps "Mark as Done":
- If they attached a photo, call syncWithPhoto(payload, photoFile)
- If no photo, call sync(payload) as before

Show a small "📎 Photo saved to Drive" confirmation line 
in the success card if a photoUrl was returned.
```

---

## Phase 6 — GitHub + Deployment

### 6.1 Initialise git

```bash
git init
git add .
git commit -m "initial: dormlife PWA scaffold"
```

### 6.2 Push to GitHub

```bash
# Create a new repo on github.com first (no README, no .gitignore)
git remote add origin https://github.com/YOUR_USERNAME/dormlife.git
git branch -M main
git push -u origin main
```

Add a `.gitignore` if Vite didn't create one:

```
node_modules/
dist/
.env
.env.local
```

### 6.3 Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts — it auto-detects Vite. Every `git push` to `main` triggers a redeploy automatically.

Or connect via the Vercel dashboard: [vercel.com/new](https://vercel.com/new) → Import from GitHub → done.

**Vercel settings for Vite:**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

---

## Phase 7 — Environment Variables (optional but good practice)

If you want to keep the Sheets URL out of localStorage and bake it in as a default:

```bash
# .env.local (never commit this)
VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

In `useSheets.js`:
```js
const DEFAULT_URL = import.meta.env.VITE_SHEETS_URL || "";
```

Add `VITE_SHEETS_URL` to your Vercel environment variables in the dashboard too.

---

## Phase 8 — Testing the PWA

### On desktop (Chrome)
1. `npm run build && npm run preview`
2. Open Chrome DevTools → Application → Manifest — check it loads
3. Application → Service Workers — check it's registered
4. Lighthouse → run PWA audit — aim for green across the board

### On mobile
1. Open the deployed Vercel URL in Chrome (Android) or Safari (iOS)
2. Android: three-dot menu → "Add to Home Screen"
3. iOS: Share button → "Add to Home Screen"
4. Launch from home screen — should open full-screen with no browser chrome

---

## Recommended Claude Code Workflow

Work phase by phase, not all at once. Suggested session order:

| Session | Focus |
|---|---|
| 1 | Scaffold + data files + hooks |
| 2 | Migrate components (LearnTab, QuizTab, CheckInTab) |
| 3 | Migrate views (Home, Chores, Badges, Teacher) |
| 4 | Wire App.jsx + test full flow |
| 5 | PWA config + icon generation |
| 6 | Google Drive photo upload |
| 7 | GitHub push + Vercel deploy |

At each session start, give Claude Code context:

```
We're building dormlife. — a PWA dorm life skills tracker.
The prototype is in DormApp.prototype.jsx.
Project structure is in src/ as per the build doc.
Today we're working on: [current phase].
```

---

## Useful Commands

```bash
npm run dev          # local dev server (hot reload)
npm run build        # production build → dist/
npm run preview      # preview the production build locally
vercel               # deploy to Vercel
vercel --prod        # force production deployment
```

---

## Spreadsheet Column Reference

Once the Apps Script is live, your Google Sheet will have these columns:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Dorm | Student | Module | Action | Score | XP | Note | Photo URL |

You can add a summary tab with `=COUNTIF` formulas to build a simple class dashboard directly in Sheets — no extra tooling needed.

---

## What's Next After Launch

- **Push notifications** — when an RA pings a student, trigger a real browser push via the Web Push API (needs a small service worker addition)
- **Student login** — swap localStorage for Firebase Auth if you want cross-device sync
- **New modules** — just add objects to `src/data/modules.js`, everything else scales automatically
- **PDF certificate** — generate a micro-credential PDF on full completion using `jsPDF`
- **Admin Sheets dashboard** — use Apps Script to auto-generate a summary pivot tab for the teacher
