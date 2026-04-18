"use client";

import { Link } from "@/navigation";

export default function TermsPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="py-20 px-6 sm:px-12 max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-3">
          Terms & <span className="text-[var(--color-primary)]">Conditions</span>
        </h1>
        <p className="text-sm text-[var(--muted-light)] uppercase tracking-widest font-bold">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="card p-8 sm:p-12 space-y-10 text-[var(--muted)] leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Zytravo Trvls platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">2. Booking Policies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Users must be at least 21 years old and hold a valid driver&apos;s license for all car rentals.</li>
            <li>All bookings are subject to availability and confirmation.</li>
            <li>Users are responsible for providing accurate information during the booking process.</li>
            <li>Cancellations made less than 24 hours before the scheduled service may incur a fee.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">3. User Responsibilities</h2>
          <p>
            You agree to use our vehicles and services in a safe and lawful manner. You are responsible for any traffic violations, tolls, or damage caused to the vehicle during your rental period.
          </p>
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            <span className="font-bold">IMPORTANT:</span> Smoking, consuming alcohol, or transporting illegal substances in our vehicles is strictly prohibited.
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">4. Payment and Fees</h2>
          <p>
            Payment for all services must be made through our platform using the available payment methods. All prices are inclusive of GST unless otherwise stated. Surges or additional fees may apply for extended rental periods or additional mileage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">5. Limitation of Liability</h2>
          <p>
            Zytravo Trvls shall not be held liable for any indirect, incidental, or consequential damages resulting from the use of our services, including but not limited to lost profits or business interruptions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">6. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Puducherry.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/" className="secondary-button py-3 px-8">
          Agree and Return Home
        </Link>
      </div>
    </div>
  );
}
