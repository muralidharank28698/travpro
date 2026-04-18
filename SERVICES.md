# External Services & Integrations

The Zytravo Trvls platform leverages several key services to provide a reliable and secure experience.

## 1. Supabase (Backend-as-a-Service)
- **PostgreSQL Database**: Stores all relational data for users, vehicles, and bookings.
- **Authentication**: Manages user roles, secure sign-ins, and session persistence.
- **Row Level Security (RLS)**: Protects data at the database level, ensuring users can only see their own information.
- **Edge Functions**: Used for secure processing of sensitive logic (e.g., invoices).

## 2. next-intl (Localization Service)
- **Infrastructure**: Handles the middleware for localized routing.
- **Message Management**: Orchestrates the server-side retrieval of translation JSON files.

## 3. Zytravo AI (Mock Service)
- **Technology**: Custom-built logic within the `ChatWidget` component.
- **Future Ready**: Designed to easily hook into OpenAI or Anthropic API Endpoints for advanced reasoning.

## 4. Vercel Development Ecosystem
- **Vercel Toolbar**: Injected in development to provide accessibility checks, speed analytics, and real-time collaboration.
- **Deployment**: Next-generation hosting optimized for Next.js features like Incremental Static Regeneration (ISR).

## 5. Lucide (Iconography)
- **Service**: Provides the vector icon set used throughout the UI to ensure a crisp, high-end look on all screen resolutions.
