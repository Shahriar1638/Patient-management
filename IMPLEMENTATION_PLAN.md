# Implementation Plan — MedCare Patient Portal

> Build: **Next.js 16 (App Router, RSC) + Tailwind CSS v4 + shadcn/ui (Radix base, Nova style, Lucide icons)**
> Design system: `DESIGN.md` ("Clinical Editorial") — tokens already applied in `src/app/globals.css` + `src/app/layout.tsx`
> Mock data: `src/data/*.json` (patients, doctors, appointments, prescriptions, vitals, notifications, queue, inventory, records, slots)
> Acceptance criteria: `VERIFY.md` — every item below maps 1:1 to that checklist

---

## 0. Progress summary

| Phase | Status |
| --- | --- |
| 0 — Prep (shadcn init, theme tokens, fonts, mock JSONs) | ✅ Done |
| 1 — Shell (sidebar, top bar, bottom nav, notifications) | ✅ Done |
| 2 — Dashboard | ✅ Done — incl. Ready Reports widget, My Profile dialog, export actions |
| 3 — Book Appointment | ✅ Done — incl. day filter, doctor degrees, visiting hours & room |
| 4 — Medical Records | ✅ Done — incl. VERIFY tab names, specialty, lab status + order ID + download |
| 5 — Serial Tracker | 🗑️ Removed — tracking lives in the Dashboard hero tracker (`/`); dedicated page + nav removed |
| 6 — Medicine Inventory | ✅ Done — incl. generic name, dosage instructions, prescribing doctor |
| 7 — Polish & verify | ⏳ Pending — `npm run lint` + `npm run build` + cross-check vs `VERIFY.md` |

---

## 1. Scope (from `stitch_careflow_medical_portal`)

Five screens, one shared shell. Single user (patient), no auth, no backend — pure mock.

| # | Screen | Source design |
| --- | -------- | --------------- |
| 1 | **Dashboard** | `patient_dashboard_synchronized` |
| 2 | **Book Appointment** | `book_appointment_enhanced_cards` |
| 3 | **Medical Records** | `medical_records_editorial` |
| 4 | **Medicine Inventory** | `medicine_inventory_updated` |

> ~~Serial Tracker~~ — removed as a dedicated page; serial tracking lives on the Dashboard hero tracker.

---

## 2. VERIFY.md alignment (acceptance checklist)

Status legend: ✅ done · 🟡 partial / needs alignment · ❌ not built yet

### 2.1 Dashboard Page (`/`)

| VERIFY item | Status | Where / what remains |
| --- | --- | --- |
| Live Serial Indicator (`Serial #16`) | ✅ | `dashboard/hero-tracker.tsx` — display-hero `#16`, Waiting badge, collapsible details, Current Serving `#11`, ETA `~25 mins` (from `queue.json`) |
| **Ready Reports Summary Widget** (count/mini-list of completed diagnostic/lab reports) | ✅ | `dashboard/ready-reports.tsx` — count + mini-list of `records.json` lab results with `status: "ready"`; "View All" → `/records` |
| "Book Appointment" CTA → appointments page | ✅ | `dashboard/quick-actions.tsx` → `/appointments` |
| **"My Profile" CTA** (opens patient info view/modal) | ✅ | `dashboard/profile-dialog.tsx` — dialog fed by `patients.json`; "View Records" kept as tertiary link |
| **Download Patient Info as PDF** | ✅ | Mock action in profile dialog — `sonner` toast |
| **Download Serial Ticket as PDF / Print** | ✅ | Mock action on Hero Tracker — `sonner` toast |

### 2.2 Book Appointment Page (`/appointments`)

| VERIFY item | Status | Where / what remains |
| --- | --- | --- |
| Search input (doctor name / keyword) | ✅ | `appointments/filter-bar.tsx` (searches name + clinic) |
| Specialty filter (dropdown/pills) | ✅ | `filter-bar.tsx` `Select` |
| **Availability / Day filter** | ✅ | "Available On" `ToggleGroup` (Any/Mon–Sat) derived from `doctor.availability` |
| Doctor photo & name | ✅ | Initials avatar (no photo asset in mock); acceptable |
| **Degrees, designation, & department/specialty** | ✅ | Card displays `doctor.title` (e.g. "MD, FACC") under name |
| **Visiting hours & chamber location** | ✅ | Card shows `doctor.room` (Chamber) + visiting days from `availability` |
| Consultation fee | ✅ | `doctor-card.tsx` info grid |
| "Book Serial" / "Select Slot" button | ✅ | `DoctorCard` "Book Now" → `booking-dialog.tsx` (date pills + slot grids from `slots.json`, Confirm → `sonner` toast) |

### 2.3 Medical Records Page (`/records`)

| VERIFY item | Status | Where / what remains |
| --- | --- | --- |
| **Tab system: "Doctor Visit Reports" / "Test & Diagnostic Reports"** | ✅ | Renamed in `records/page.tsx` |
| Tab 1 — Doctor name & specialty | ✅ | `specialty` added to `records.json` rxRows + column |
| Tab 1 — Date of visit | ✅ | `date` column |
| Tab 1 — Complaint / diagnosis summary | ✅ | `diagnosis` column |
| Tab 1 — "Download Report / Advice PDF" per record | ✅ | Ghost download button per row (mock) |
| Tab 2 — Test title / category (CBC, X-Ray, ECG, USG) | ✅ | `labResults` cards with type icons |
| Tab 2 — Date of test / **Lab order ID** | ✅ | `orderId` added + shown with date |
| Tab 2 — **Status indicator (Ready / Pending)** | ✅ | `status` on labResults + `Badge` (default for Ready, secondary for Pending) |
| Tab 2 — **"Download Report PDF / Image" per item** | ✅ | Download button next to "View Full Result" (mock) |

### 2.4 Medicine Inventory Page (`/inventory`)

| VERIFY item | Status | Where / what remains |
| --- | --- | --- |
| **Brand name & generic name** | ✅ | `name` = brand, `genericName` added + Generic column |
| **Dosage instructions** (e.g. `1+0+1`, before/after meal) | ✅ | `dosage` added + column |
| **Prescribing doctor's name** | ✅ | `prescribedBy` added + column |
| Estimated / standard unit price | ✅ | `price` column |
| **Download Full Prescription PDF** (global / per-visit) | ✅ | Header outline button (mock action) |

### 2.5 Serial Tracker

Removed as a standalone page/nav item — serial tracking is handled by the Dashboard **Hero Tracker** (display-hero serial, Current Serving, ETA, collapsible details, Serial Ticket download).

---

## 3. Theme — done

Applied: primary `#0F6E6A`, warm background `#FAF9F7`, border `#E5E7EB`, `--radius 0.375rem`, `--font-sans` Inter, `--font-heading` Epilogue, `--text-display-hero`, plus `label-caps`, `headline-lg(-mobile)`, `headline-md`, `body-lg`, `body-md` type utilities in `globals.css` `@theme inline`.

Use `font-heading` for headlines (Epilogue), `font-sans` for body (Inter). No drop shadows — 1px borders + subtle flat layering per DESIGN.md.

---

## 4. Data (mock JSON)

Existing: `patients.json`, `doctors.json`, `appointments.json`, `prescriptions.json`, `vitals.json`, `notifications.json`, `queue.json`, `inventory.json`, `records.json`, `slots.json`.

**Data changes (done):**

- `src/data/records.json` — labResults now have `orderId`, `status: "ready" | "pending"`; rxRows have `specialty`
- `src/data/inventory.json` — items have brand `name`, `genericName`, `dosage`, `prescribedBy`
- `src/data/doctors.json` — already had `title`, `room`, `availability`; now rendered
- `src/data/patients.json` — feeds the My Profile dialog

Pages import their JSON directly (static, RSC-friendly) — no fetch layer needed.

---

## 5. Route structure (current)

```
src/
├─ app/
│  ├─ layout.tsx            # root: fonts, theme, TooltipProvider, Toaster (done)
│  └─ (portal)/
│     ├─ layout.tsx         # SidebarProvider + AppSidebar + TopBar + BottomNav (done)
│     ├─ page.tsx           # Dashboard (done, gaps in §2.1)
│     ├─ appointments/page.tsx
│     ├─ records/page.tsx
│     └─ inventory/page.tsx
└─ components/
   ├─ ui/                   # shadcn components (installed)
   ├─ layout/               # app-sidebar, top-bar, bottom-nav, nav, notifications-menu
   ├─ dashboard/            # hero-tracker, quick-actions, recent-activity, reminder-banner, ready-reports, profile-dialog
   ├─ appointments/         # appointments-view, doctor-card, booking-dialog, filter-bar
```

All `(client)` interactivity (dialogs, tabs state, filters, toggles) lives in `"use client"` components; pages stay RSC and import data + components.

---

## 6. Remaining work

All VERIFY.md feature gaps are implemented (see §2). Remaining:

1. `npm run lint` + `npm run build`
2. Cross-check every box in `VERIFY.md` (mock PDF/print actions via `sonner` toast — no real file generation)

---

## 7. Out of scope

- Auth/login, real booking flow, **real** PDF file generation (mock download actions only), live queue updates (static mock), settings page (nav item only), dark mode toggle (tokens exist, no UI)
