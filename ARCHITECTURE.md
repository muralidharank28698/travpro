# Jayasree Travels: Application Architecture & Flow

This document outlines the technical architecture, routing structure, user flows, and database design for the Jayasree Travels platform. The application is built using a modern **Next.js (App Router)** frontend paired with a **Supabase (PostgreSQL)** backend.

---

## 1. Technology Stack

- **Framework**: Next.js 16 (App Router) with Turbopack for ultrafast development.
- **Styling**: Tailwind CSS v4 featuring a custom "Emerald Reserve" global design system.
- **Backend / Database**: Supabase (PostgreSQL).
- **Authentication**: Supabase Auth (Email & Password).
- **Component Library**: Hand-crafted React Server Components (RSC) with heavily stylized glassmorphic and modern Figma-inspired layouts.

---

## 2. Directory & Routing Architecture

The application utilizes Next.js **Route Groups** (folders wrapped in parentheses) to cleanly separate layouts and authentication scopes without affecting the URL structure.

```text
app/
├── (public)/              # Publicly accessible pages
│   ├── layout.tsx         # Shared Header & Footer (Navigation, Logo)
│   ├── page.tsx           # Main Landing Page / Hero Banner
│   ├── rentals/           # Car fleet browsing and reservation flow
│   ├── tours/             # Pre-packaged South India tour plans
│   ├── airport-transfers/ # Dedicated airport pickup/drop-off services
│   └── driver-hire/       # Chauffeur-only booking service
│
├── (auth)/                # Authentication flows
│   ├── login/             # User sign-in
│   └── register/          # New user signup (creates Supabase profile)
│
├── (customer)/            # Private Customer Portal
│   ├── layout.tsx         # Customer Sidebar (My Account, Billing)
│   └── dashboard/         # View upcoming/past bookings and invoices
│
└── (dashboard)/           # Private Admin & Fleet Management Portal
    ├── layout.tsx         # Admin Sidebar (Bookings, Fleet)
    ├── bookings/          # Central hub for admins to approve/track all trips
    └── cars/              # Inventory system to add/edit/remove vehicles
```

---

## 3. User Journey & Application Flow

### A. The Public User Flow
1. **Discovery**: A user lands on `/` (Landing Page) and explores the core services.
2. **Browsing**: They navigate to `/rentals` or `/tours` to view the available fleet or packages. The data is either pulled from the database or the mock-data fallback system.
3. **Intent to Book**: They select a vehicle/tour and click "Book Now". This opens the `BookingForm.tsx` component.
4. **Authentication Check**: If the user is not logged in, they are redirected to `/login`.

### B. The Customer Portal Flow
1. **Dashboard Entry**: After logging in and booking, the user visits `/dashboard`.
2. **Booking Management**: They see a clear split between **Upcoming** and **Past Trips**.
3. **Actions**: They can track their assigned driver, view their invoice, or cancel upcoming trips.

### C. The Admin Management Flow
1. **Fleet Management (`/cars`)**: Admins log in to the dashboard to update vehicle statuses (e.g., from "Available" to "Maintenance"), adjust pricing, or add new vehicles to the fleet.
2. **Booking Operations (`/bookings`)**: When a customer submits a booking, it appears here. Admins can update the status (e.g., Pending -> Confirmed -> In Progress -> Completed), which automatically updates the customer's dashboard in real-time.

---

## 4. Backend & Database Schema

The core operations run on a **Supabase PostgreSQL** database. The system is designed to enforce security at the database level using Row Level Security (RLS).

### Core Tables

1. **`users`**
   - **Purpose**: Stores extended profile data linked securely to the core `auth.users` authentication table.
   - **Key Fields**: `id`, `email`, `full_name`, `phone`, `user_role` (ENUM: `admin` | `customer`).

2. **`vehicles`**
   - **Purpose**: The central inventory for the car rental and tour fleet.
   - **Key Fields**: `id`, `name`, `type`, `seats`, `price_per_day`, `status` (Available, Booked, Maintenance), `image_urls`.

3. **`bookings`**
   - **Purpose**: The transactional heart of the application, tracking all customer service requests.
   - **Key Fields**: `id`, `customer_id` (foreign key to users), `service_type` (Rental, Tour, Airport transfer), `total_amount`, `status` (Pending, Confirmed, Completed, Cancelled).

> **Data Validation & Server Actions**
> All data manipulation (creating bookings, updating cars) bypasses generic API routes and uses **Next.js Server Actions** (`lib/actions/*.ts`). These functions execute securely on the server, validate user roles via Supabase, and communicate directly with the database safely away from the client.

---

## 5. Mock Mode Configuration

The application includes an emergency "Mock Mode". By setting `NEXT_PUBLIC_MOCK_MODE=true` in the `.env` file, the entire application will bypass the Supabase database and retrieve data exclusively from `lib/mock-data.ts`. 

This is highly useful for iterating on UI designs or demonstrating the application flow to stakeholders before the live database is fully configured or network-accessible.
