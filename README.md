# Work-Well-App

## Working Professionals Wellness App (ZenithMind)

A responsive, offline-friendly web app for working professionals to assess stress, practice mindfulness, manage time/tasks, and engage with a supportive community. Built with **React + TypeScript**, **Vite**, **TailwindCSS**, and **shadcn/ui** (Radix primitives).

> **Status:** Frontend MVP with client-side auth mocks and local persistence. Ready to plug into a real backend/APIs.

---

## ✨ Features

- **Stress Assessment (10-item)** — Calculates total score and tags **Low / Moderate / High / Severe** based on percentage bands. Progress bar, validation toasts, and restart flow. (`src/components/assessment/StressQuiz.tsx`)
- **Mindfulness & Meditation** — Custom **HTML5 audio player** (play/pause/seek/skip/volume) with categorized sessions (relaxation, focus, sleep). (`src/components/mindfulness/MeditationPlayer.tsx`, `src/pages/Mindfulness.tsx`)
- **Task & Time Management** — **Pomodoro timer** (configurable work/short/long durations, cycle tracking) and **to‑do list** with client-side persistence. (`src/components/tasks/PomodoroTimer.tsx`, `src/pages/Tasks.tsx`)
- **Daily Inspiration** — Quote‑of‑the‑day with **per‑day like** persistence and midnight rollover (localStorage). (`src/components/home/DailyQuote.tsx`)
- **Community (prototype)** — Topic tabs, create post, like, and basic sorting; state kept in memory for demo. (`src/pages/Community.tsx`)
- **Auth UX (mocked)** — Email/password and **phone OTP** flows using **React Hook Form + Zod**; **AuthContext** stores session in `localStorage`. (`src/pages/SignIn.tsx`, `src/pages/SignUp.tsx`, `src/pages/PhoneLogin.tsx`, `src/contexts/AuthContext.tsx`)
- **Polished UI** — **shadcn/ui** components over Radix, Tailwind theming with light/dark mode toggle, Lucide icons, toast notifications.

---

## 🧱 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling & UI:** TailwindCSS, shadcn/ui, Radix UI primitives, Lucide icons
- **Forms & Validation:** React Hook Form, Zod
- **Routing:** React Router v6
- **Data Fetching:** TanStack Query (`QueryClientProvider` wired; ready for API integration)
- **Feedback:** Custom toasts + `sonner`
- **Utilities:** date-fns, input-otp
- **Build/Tooling:** ESLint (TS), PostCSS, Autoprefixer, SWC React plugin

---

## 📁 Project Structure

```
workwell/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig*.json
├─ public/
│  └─ audio/…            # meditation audio files
└─ src/
   App.css
   App.tsx
   index.css
   main.tsx
   vite-env.d.ts
   ├─ App.css/
   ├─ App.tsx/
   ├─ components/
   │  ├─ assessment/
   │  │  StressQuiz.tsx
   │  │  └─ StressQuiz.tsx/
   │  ├─ auth/
   │  │  CountryCodeSelector.tsx
   │  │  OTPForm.tsx
   │  │  PhoneNumberForm.tsx
   │  │  ├─ CountryCodeSelector.tsx/
   │  │  ├─ OTPForm.tsx/
   │  │  └─ PhoneNumberForm.tsx/
   │  ├─ home/
   │  │  CallToAction.tsx
   │  │  DailyQuote.tsx
   │  │  FeatureSection.tsx
   │  │  Hero.tsx
   │  │  Testimonials.tsx
   │  │  ├─ CallToAction.tsx/
   │  │  ├─ DailyQuote.tsx/
   │  │  ├─ FeatureSection.tsx/
   │  │  ├─ Hero.tsx/
   │  │  └─ Testimonials.tsx/
   │  ├─ layout/
   │  │  Footer.tsx
   │  │  Navbar.tsx
   │  │  ├─ Footer.tsx/
   │  │  └─ Navbar.tsx/
   │  ├─ mindfulness/
   │  │  MeditationPlayer.tsx
   │  │  └─ MeditationPlayer.tsx/
   │  ├─ tasks/
   │  │  PomodoroTimer.tsx
   │  │  └─ PomodoroTimer.tsx/
   │  └─ ui/
   │     accordion.tsx
   │     alert-dialog.tsx
   │     alert.tsx
   │     aspect-ratio.tsx
   │     avatar.tsx
   │     badge.tsx
   │     breadcrumb.tsx
   │     button.tsx
   │     calendar.tsx
   │     card.tsx
   │     carousel.tsx
   │     chart.tsx
   │     checkbox.tsx
   │     collapsible.tsx
   │     command.tsx
   │     context-menu.tsx
   │     dialog.tsx
   │     drawer.tsx
   │     dropdown-menu.tsx
   │     form.tsx
   │     hover-card.tsx
   │     input-otp.tsx
   │     input.tsx
   │     label.tsx
   │     menubar.tsx
   │     navigation-menu.tsx
   │     pagination.tsx
   │     popover.tsx
   │     progress.tsx
   │     radio-group.tsx
   │     resizable.tsx
   │     scroll-area.tsx
   │     select.tsx
   │     separator.tsx
   │     sheet.tsx
   │     sidebar.tsx
   │     skeleton.tsx
   │     slider.tsx
   │     sonner.tsx
   │     switch.tsx
   │     table.tsx
   │     tabs.tsx
   │     textarea.tsx
   │     toast.tsx
   │     toaster.tsx
   │     toggle-group.tsx
   │     toggle.tsx
   │     tooltip.tsx
   │     use-toast.ts
   │     ├─ accordion.tsx/
   │     ├─ alert-dialog.tsx/
   │     ├─ alert.tsx/
   │     ├─ aspect-ratio.tsx/
   │     ├─ avatar.tsx/
   │     ├─ badge.tsx/
   │     ├─ breadcrumb.tsx/
   │     ├─ button.tsx/
   │     ├─ calendar.tsx/
   │     ├─ card.tsx/
   │     ├─ carousel.tsx/
   │     ├─ chart.tsx/
   │     ├─ checkbox.tsx/
   │     ├─ collapsible.tsx/
   │     ├─ command.tsx/
   │     ├─ context-menu.tsx/
   │     ├─ dialog.tsx/
   │     ├─ drawer.tsx/
   │     ├─ dropdown-menu.tsx/
   │     ├─ form.tsx/
   │     ├─ hover-card.tsx/
   │     ├─ input-otp.tsx/
   │     ├─ input.tsx/
   │     ├─ label.tsx/
   │     ├─ menubar.tsx/
   │     ├─ navigation-menu.tsx/
   │     ├─ pagination.tsx/
   │     ├─ popover.tsx/
   │     ├─ progress.tsx/
   │     ├─ radio-group.tsx/
   │     ├─ resizable.tsx/
   │     ├─ scroll-area.tsx/
   │     ├─ select.tsx/
   │     ├─ separator.tsx/
   │     ├─ sheet.tsx/
   │     ├─ sidebar.tsx/
   │     ├─ skeleton.tsx/
   │     ├─ slider.tsx/
   │     ├─ sonner.tsx/
   │     ├─ switch.tsx/
   │     ├─ table.tsx/
   │     ├─ tabs.tsx/
   │     ├─ textarea.tsx/
   │     ├─ toast.tsx/
   │     ├─ toaster.tsx/
   │     ├─ toggle-group.tsx/
   │     ├─ toggle.tsx/
   │     ├─ tooltip.tsx/
   │     └─ use-toast.ts/
   ├─ contexts/
   │  AuthContext.tsx
   │  └─ AuthContext.tsx/
   ├─ hooks/
   │  use-mobile.tsx
   │  use-toast.ts
   │  ├─ use-mobile.tsx/
   │  └─ use-toast.ts/
   ├─ index.css/
   ├─ lib/
   │  utils.ts
   │  └─ utils.ts/
   ├─ main.tsx/
   ├─ pages/
   │  AbsoluteConfidentiality.tsx
   │  Assessment.tsx
   │  BookSessionNow.tsx
   │  Community.tsx
   │  CompassionateSupport.tsx
   │  FlexibleAppointments.tsx
   │  Index.tsx
   │  Mindfulness.tsx
   │  NotFound.tsx
   │  OnlineCounselling.tsx
   │  PhoneLogin.tsx
   │  SecureVideoCalls.tsx
   │  SignIn.tsx
   │  SignUp.tsx
   │  Tasks.tsx
   │  WorkplaceWellness.tsx
   │  ├─ AbsoluteConfidentiality.tsx/
   │  ├─ Assessment.tsx/
   │  ├─ BookSessionNow.tsx/
   │  ├─ Community.tsx/
   │  ├─ CompassionateSupport.tsx/
   │  ├─ FlexibleAppointments.tsx/
   │  ├─ Index.tsx/
   │  ├─ Mindfulness.tsx/
   │  ├─ NotFound.tsx/
   │  ├─ OnlineCounselling.tsx/
   │  ├─ PhoneLogin.tsx/
   │  ├─ SecureVideoCalls.tsx/
   │  ├─ SignIn.tsx/
   │  ├─ SignUp.tsx/
   │  ├─ Tasks.tsx/
   │  └─ WorkplaceWellness.tsx/
   ├─ utils/
   │  phoneAuth.ts
   │  └─ phoneAuth.ts/
   └─ vite-env.d.ts/
```

Key pages:
- `/` Landing (Hero, Features, Daily Quote, Testimonials, CTA)
- `/assessment` Stress Assessment
- `/mindfulness` Meditation player & sessions
- `/tasks` Pomodoro & To‑Do
- `/community` Community prototype
- `/signin`, `/signup`, `/phone-login` Auth flows (mocked)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Bun).

### Install
```bash
# with npm
npm install

# or with bun
bun install
```

### Run dev server
```bash
npm run dev
# opens on http://localhost:8080 (see vite.config.ts)
```

### Production build
```bash
npm run build
npm run preview
```

---

## 🔐 Auth & OTP (Demo)

- **AuthContext** stores a minimal user object in `localStorage` upon login and clears it on logout.
- **Phone OTP** is simulated: a 6‑digit code is generated and stored with **10‑minute expiry**, **attempt counting**, and **1‑minute resend cooldown**. A mock `sendSMSOTP()` simulates SMS delivery.

Relevant files:
- `src/contexts/AuthContext.tsx`
- `src/pages/PhoneLogin.tsx`
- `src/components/auth/*`
- `src/utils/phoneAuth.ts`

---

## 🧮 Stress Scoring

- Each of the 10 questions has 5 options mapped to numeric **0–4**.
- “Positive” items are ordered so that higher index still means **more stress**, avoiding reverse‑coding.
- `total = sum(indices)` → **0–40** ⇒ `percentage = total/40 * 100`.
- Bands: **Low < 30%**, **Moderate < 60%**, **High < 80%**, **Severe ≥ 80%**.

See `src/components/assessment/StressQuiz.tsx` (“Calculate stress level”).

---

## 📦 State & Persistence

- **LocalStorage:** auth user, OTP state, Pomodoro config, completed cycles, to‑do list, daily quote likes.
- **TanStack Query:** `QueryClientProvider` is set up in `src/App.tsx` and ready for API calls with caching and background refetch. (Persistence plugins can be added later for offline cache across reloads.)

---

## 🧪 Linting & Scripts

`package.json` scripts:
```json
{
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Run lint:
```bash
npm run lint
```

---

## 🛠️ Roadmap (nice-to-haves)

- Hook real APIs to replace mocked auth & community.
- Add **React Query cache persistence** (localStorage/IndexedDB) and SWR policies.
- Service Worker/PWA for richer offline and installable app.
- Role‑based gating for premium mindfulness content.
- Analytics & event tracking.
- Unit tests for scoring/OTP utils.

---

## 📄 License

No license file present. Consider adding **MIT** (or your preferred) license before open-sourcing.

---

## 🙌 Acknowledgements

- UI components: [shadcn/ui] built on Radix Primitives.
- Icons: Lucide.
- Audio tracks are demo assets placed under `public/audio`.
