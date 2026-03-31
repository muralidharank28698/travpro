"use client";

import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="py-20 px-6 sm:px-12 max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-3">
          Privacy <span className="text-[var(--color-primary)]">Policy</span>
        </h1>
        <p className="text-sm text-[var(--muted-light)] uppercase tracking-widest font-bold">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="card p-8 sm:p-12 space-y-10 text-[var(--muted)] leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">1. Introduction</h2>
          <p>
            At Zytravo Trvls, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our car rental and travel services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">2. Information Collection</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create an account or profile</li>
            <li>Book a car rental, tour, or transfer</li>
            <li>Contact our support team</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, payment details, and driver&apos;s license information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">3. Use of Information</h2>
          <p>
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and manage your bookings</li>
            <li>Provide customer support and service updates</li>
            <li>Verify your identity and eligibility for rentals</li>
            <li>Improve our platform and user experience</li>
            <li>Send promotional communications (with your consent)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">4. Data Security</h2>
          <p>
            We implement robust security measures to protect your personal data from unauthorized access, alteration, or disclosure. All sensitive data is encrypted using industry-standard protocols.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information at any time through your account settings or by contacting our support team.
          </p>
        </section>

        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-[var(--foreground)] mb-2">Contact Privacy Officer</h3>
          <p className="text-sm">
            If you have any questions about this policy, please reach out to us at <span className="font-bold text-[var(--color-primary)]">privacy@zytravo.com</span>.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/" className="secondary-button py-3 px-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}
