# Application Folder Structure

The project follows the **Next.js App Router** conventions with additional organization for internationalization (i18n) and business logic.

## Root Directory
```text
/
├── app/               # Next.js App Router (Routing & Layouts)
├── components/        # Reusable UI components
├── i18n/              # next-intl configuration
├── lib/               # Shared logic, store, and database actions
├── messages/          # Translation files (en, fr, es)
├── public/            # Static assets (SVGs, Images)
├── ARCHITECTURE.md    # High-level design documentation
├── FEATURES.md        # Feature implementation log
├── TECH_STACK.md      # Detailed technology breakdown
└── package.json       # Project dependencies and scripts
```

## The `app/` Directory
Utilizes **Route Groups** `(...)` for scope and **Dynamic Routes** `[...]` for internationalization.

```text
app/
└── [locale]/                 # Dynamic locale segment (e.g., /en, /fr)
    ├── layout.tsx            # Global root layout (Providers, ChatWidget)
    ├── (public)/             # Accessible to all users
    │   ├── layout.tsx        # Public header/footer
    │   ├── rentals/          # Car browsing
    │   ├── tours/            # Tour packages
    │   └── airport-transfers/
    ├── (auth)/               # Login & Registration
    │   ├── login/
    │   └── register/
    ├── (customer)/           # Logged-in customer portal
    │   ├── dashboard/        # My Bookings
    │   └── settings/         # Account management
    └── (dashboard)/          # Admin/Staff Portal
        ├── bookings/         # Fleet trip tracking
        └── cars/             # Vehicle inventory management
```

## Key Folders
- **`components/`**: Divided into `common` (buttons, inputs) and feature-specific folders (like `booking`).
- **`lib/`**: Contains the **Redux Store**, **Supabase Client**, and **Server Actions** for secure database operations.
- **`messages/`**: Central JSON hub for all text on the site.
