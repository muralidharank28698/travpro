# Application Architecture

This document outlines the core design patterns and system architecture that power the Zytravo Trvls platform.

---

## 1. High-Level Design Patterns

### Client-Server Separation
The application uses **Next.js Server Components** by default to minimize the JavaScript sent to the client. Interactive elements (like the `ChatWidget` or `BookingForm`) are marked with `"use client"` and are kept as small as possible to ensure fast initial page loads.

### Internationalized Routing (i18n)
All routes are wrapped in a `[locale]` dynamic segment. The `middleware.ts` (internal to next-intl) detects the user's preferred language and redirects them to the appropriate prefix (e.g., `/en/login` or `/fr/rentals`).

---

## 2. Data Flow Architecture

### Database & Security (Supabase)
The system uses a **PostgreSQL** database where security is enforced through **Row Level Security (RLS)**. 
- **User Scope**: Normal users can only read/write their own bookings.
- **Admin Scope**: Users with the `admin` role in their profile have broad access to fleet management and all reservation data.

### Secure Data Updates (Server Actions)
Instead of traditional API endpoints, all mutations (creating bookings, signing out, updating settings) are handled through **Next.js Server Actions**.
- **Location**: `lib/supabase/actions.ts` (or similar utility folders).
- **Benefit**: Ensures that credentials never leak to the browser and that data is validated on the server before hitting the database.

---

## 3. Component Architecture

### The "Emerald Reserve" Design System
Zytravo uses a custom design system defined in `globals.css` using Tailwind CSS v4 variables. It prioritizes:
- **Glassmorphism**: Using `backdrop-blur` and semi-transparent `bg-card` values.
- **Layering**: Using a strict z-index system (e.g., the `ChatWidget` is at `z-[9999]`).

### State & Providers
The application root (`layout.tsx`) wraps the children in several essential providers:
1. **NextIntlClientProvider**: Provides translation messages to client components.
2. **ThemeProvider**: Manages the dark/light mode switching.
3. **StoreProvider**: Injects the Redux state into the application.
4. **Supabase Auth Listener**: A client-side hook that detects login/logout events to update the UI in real-time.

---

## 4. Operational Modes (Mock vs. Live)
The architecture includes a flexible **Mock Mode** for demonstration and development purposes.
- When `NEXT_PUBLIC_MOCK_MODE` is enabled, the UI bypasses database fetch calls and pulls from `lib/mock-data.ts`.
- This allows for high-fidelity UI testing even when the database is in maintenance or under configuration.
