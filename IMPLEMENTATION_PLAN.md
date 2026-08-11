# Implementation Plan — MedCare Patient Portal

> Build: **Next.js 16 (App Router, RSC) + Tailwind CSS v4 + shadcn/ui (Radix base, Nova style, Lucide icons)**
> Design system: `DESIGN.md` ("Clinical Editorial") — tokens already applied in `src/app/globals.css` + `src/app/layout.tsx`
> Mock data: `src/data/*.json` (patients, doctors, appointments, prescriptions, vitals, notifications)

---

## 1. Scope (from `stitch_careflow_medical_portal`)

Five screens, one shared shell. Single user (patient), no auth, no backend — pure mock.

| # | Screen | Source design |
| --- | -------- | --------------- |
| 1 | **Dashboard** | `patient_dashboard_synchronized` |
| 2 | **Book Appointment** | `book_appointment_enhanced_cards` |
| 3 | **Medical Records** | `medical_records_editorial` |
| 4 | **Serial Tracker** | `serial_tracker_mobile` |
| 5 | **Medicine Inventory** | `medicine_inventory_updated` |

### Features per screen

**Dashboard** (`/`)

- Greeting header ("Good morning, Alex.") + notification bell (unread dot)
- Reminder banner (dismissible) — upcoming appointment
- Bento grid:
  - **Hero Tracker card** (deep teal `primary-container`): label-caps "Live Serial Tracker", waiting badge, display-hero serial `#16`, collapsible details (doctor / schedule / room), footer strip with *Current Serving #11* + *Estimated Wait ~25 mins*
  - **Quick Actions**: primary "Book Appointment" → `/appointments`, outline "View Records" → `/records`
  - **Recent Activity** list: past visits with download icons

**Book Appointment** (`/appointments`)

- Search + filter bar: doctor/clinic search, specialty select, location, fee range (min–max), Apply Filters
- Quick filters: "Available Today", "Video Consultation" (checkboxes)
- Doctor card grid (2-col): photo, name, specialty, rating badge, clinic, "Next Available", fee; actions: View Profile (outline), Book Now (primary)
- **Booking dialog**: available-date pills, Morning/Afternoon slot grids (disabled / selected states), footer with selected slot summary + Confirm Booking

**Medical Records** (`/records`)

- Tabs: **Digital Rx Vault** (table: Date, Doctor, Diagnosis, Status badge, Download action) | **Lab Test Results** (cards: icon, date, title, description, View Full Result)

**Serial Tracker** (`/tracking`)

- Hero tracker card: live-status label + pulsing dot, display-hero "Your Serial #16", "Currently Serving #12", wait-time block
- Chamber details card: room + floor, map placeholder with "View Interactive Map" overlay chip
- Alerts card: SMS toggle switch ("Notify me when #15 is called")

**Medicine Inventory** (`/inventory`)

- Header with doctor line ("Dr. Sarah Jenkins — Cardiology") + "Download Prescription PDF" outline button
- Inventory table: Medication Name, Category, Price, Offers/Discounts, Status badge (In Stock / Low Stock / Out of Stock)

**Shared shell**

- Desktop: fixed left sidebar (logo, nav: Dashboard / Book Appointment / Medical Records / Serial Tracking / Medicine Inventory / Settings, Support button)
- Mobile: top bar (logo + bell) + bottom nav (Dashboard / Bookings / Records / Tracking)

---

## 2. Theme — already done, plus small additions

Done: primary `#0F6E6A`, warm background `#FAF9F7`, border `#E5E7EB`, `--radius 0.375rem`, `--font-sans` Inter, `--font-heading` Epilogue, `--text-display-hero`.

**Add (phase 1):** remaining type utilities to `globals.css` `@theme inline` so stitch styles map 1:1:

- `--text-label-caps` 12px / lh 1 / ls 0.05em / w600
- `--text-headline-lg` 32px / 1.2 / 600; `--text-headline-lg-mobile` 28px / 1.2 / 600
- `--text-headline-md` 24px / 1.3 / 600
- `--text-body-lg` 18px / 1.6 / 400; `--text-body-md` 16px / 1.5 / 400

Use `font-heading` for headlines (Epilogue), `font-sans` for body (Inter). No drop shadows — 1px borders + `shadow-sm` only where the stitch used it.

---

## 3. Data (mock JSON)

Existing in `src/data/`: `patients.json`, `doctors.json`, `appointments.json`, `prescriptions.json`, `vitals.json`, `notifications.json`.

**Add:**

- `src/data/queue.json` — serial tracker: `{ serial, serving, estimatedWaitMin, doctorName, specialty, date, time, room, status }`
- `src/data/inventory.json` — medicine stock: `{ name, category, price, discount, stock, status }`
- `src/data/records.json` — Rx vault rows + lab results: `{ date, doctor, diagnosis, status }[]` and `{ date, title, description, icon }[]`
- `src/data/slots.json` — booking slots: `{ date, day, month, morning: [], afternoon: [], booked: [] }`

Pages import their JSON directly (static, RSC-friendly) — no fetch layer needed.

---

## 4. Route structure

```
src/
├─ app/
│  ├─ layout.tsx            # root: fonts, theme (done)
│  ├─ page.tsx              # Dashboard
│  ├─ appointments/page.tsx # Book Appointment
│  ├─ records/page.tsx      # Medical Records
│  ├─ tracking/page.tsx     # Serial Tracker
│  └─ inventory/page.tsx    # Medicine Inventory
└─ components/
   ├─ ui/                   # shadcn components (CLI-added)
   ├─ layout/
   │  ├─ sidebar.tsx        # desktop nav (shadcn Sidebar)
   │  ├─ top-bar.tsx        # mobile header + desktop greeting
   │  └─ bottom-nav.tsx     # mobile nav
   ├─ dashboard/            # tracker-hero, quick-actions, recent-activity
   ├─ appointments/         # doctor-card, booking-dialog, filter-bar
   ├─ records/              # rx-vault-table, lab-results-grid
   ├─ tracking/             # tracker-hero, chamber-card, sms-toggle
   └─ inventory/            # inventory-table
```

All `(client)` interactivity (dialogs, tabs state, filters, toggles) in `"use client"` components; pages stay RSC and just import data + components.

---

## 5. shadcn components to install

```
npx shadcn@latest add button card table tabs dialog badge avatar
npx shadcn@latest add input select checkbox switch separator
npx shadcn@latest add skeleton sidebar sheet dropdown-menu tooltip
```

> `button` already installed. Use `sonner` (Radix base) for any toasts. Icons: `lucide-react`.

Composition rules (from shadcn skill):

- Semantic colors only (`bg-primary`, `text-muted-foreground`), `gap-*` not `space-y-*`
- `DialogTitle` required in dialogs; `AvatarFallback` required in avatars
- Forms use `FieldGroup`/`Field`; option sets (2–7) use `ToggleGroup`
- Status chips = `Badge` variants; rows = `Table`; cards = full `Card` composition
- Icons in buttons via `data-icon="inline-start"`, no size classes on icons

---

## 6. Build phases

**Phase 0 — prep (done):** shadcn init, theme tokens, fonts, base mock JSONs, lint/build green.

**Phase 1 — shell**

1. Add missing type utilities (see §2)
2. `add` all components in §5
3. `src/components/layout/sidebar.tsx` — shadcn `Sidebar` w/ lucide icons (LayoutDashboard, CalendarDays, FolderOpen, Activity, Pill, Settings, LifeBuoy), active-state styling via `usePathname`
4. `top-bar.tsx` + `bottom-nav.tsx` (mobile), wire into a `(portal)` route group layout
5. Notifications dropdown (bell + unread dot from `notifications.json`)

**Phase 2 — Dashboard**

1. Greeting header + dismissible reminder `Alert`
2. Hero tracker card (deep teal, `text-display-hero`, collapsible details)
3. Quick actions + Recent Activity from `prescriptions.json`

**Phase 3 — Book Appointment**

1. Filter bar (search `Input`, `Select` specialty, fee `Input`s, `Checkbox` quick filters)
2. Doctor card grid from `doctors.json` (extend doctors with rating/clinic/fee/availability)
3. Booking `Dialog`: date pills + slot grids from `slots.json`; Confirm → `sonner` toast

**Phase 4 — Medical Records**

1. `Tabs`: Rx Vault `Table` from `records.json` + `Badge` statuses; Lab Results card grid

**Phase 5 — Serial Tracker**

1. Hero tracker (pulsing dot, display-hero serial) from `queue.json`
2. Chamber details card + map placeholder
3. SMS alert `Switch`

**Phase 6 — Medicine Inventory**

1. Header + download button, inventory `Table` with stock `Badge`s from `inventory.json`

**Phase 7 — polish & verify**

- Mobile responsiveness (bottom nav, single-column grids, 20px margins)
- `npm run lint` + `npm run build`
- Cross-check against stitch screenshots (`*.png`)

---

## 7. Out of scope

- Auth/login, real booking flow, PDF generation, live queue updates (static mock), settings page (nav item only), dark mode toggle (tokens exist, no UI)
