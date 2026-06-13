"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const tHero = useTranslations("Hero");
  const tLanding = useTranslations("Landing");

  return (
    <>
      {/* Immersive Glassmorphism Hero Section */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        {/* Full-width Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-black">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-20" />
          {/* Transparent blocker to hide YouTube UI */}
          <div className="absolute inset-0 z-10" />
          <iframe
            className="absolute top-1/2 left-1/2 w-[300vw] sm:w-[200vw] lg:w-[150vw] h-[300vh] sm:h-[200vh] lg:h-[150vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover z-0 opacity-60"
            src="https://www.youtube.com/embed/fZWfI0MW1b8?autoplay=1&mute=1&loop=1&playlist=fZWfI0MW1b8&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1"
            title="Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Content Container Area */}
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-16 sm:pt-24 md:pt-28 pb-10 sm:pb-16 md:pb-20 h-full flex items-center mt-4 sm:mt-8 md:mt-12">
          {/* Very Light Glassmorphism Content Box */}
          <div className="w-full max-w-[850px] p-6 sm:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] border border-white/10 shadow-2xl bg-white/5 dark:bg-black/20 flex flex-col items-start text-left animate-fade-in-up">
            <span className="inline-block text-white/90 font-bold text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] tracking-[0.2em] sm:tracking-[0.25em] capitalize mb-4 sm:mb-6 md:mb-8 drop-shadow-lg font-[family-name:var(--font-outfit)]">
              {tHero("badge")}
            </span>

            <h1 className="text-9xl sm:text-[90px] md:text-[140px] lg:text-[220px] xl:text-[280px] font-black tracking-tighter text-white drop-shadow-xl leading-[0.9] sm:leading-[0.85] lg:leading-[0.82] mb-6 sm:mb-8 md:mb-12 font-[family-name:var(--font-outfit)]">
              {tHero.rich("title", {
                br: () => <br className="hidden lg:block" />,
              })}
            </h1>

            <p className="text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] xl:text-[60px] text-white/90 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] leading-snug font-medium drop-shadow-lg mb-8 sm:mb-10 md:mb-12 font-[family-name:var(--font-inter)]">
              {tHero("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center w-full sm:w-auto">
              <Link
                href="/rentals"
                className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] py-3.5 sm:py-4 md:py-5 px-10 sm:px-12 md:px-16 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all text-black w-full sm:w-auto text-center font-bold bg-white drop-shadow-md"
              >
                {tHero("cta_rentals")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 pt-4 lg:pt-8 lg:pb-24 bg-background relative z-10 px-4 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <span className="inline-block text-[var(--color-accent)] font-bold text-[14px] tracking-[0.15em] uppercase mb-2">
              {tLanding("Services.badge")}
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">
              {tLanding("Services.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Rentals */}
            <Link
              href="/rentals"
              className="bg-card rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800"
                  alt={tLanding("Services.rentals.title")}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-foreground mb-3">
                  {tLanding("Services.rentals.title")}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  {tLanding("Services.rentals.description")}
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {tLanding("Services.rentals.cta")} <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2: Tours */}
            <Link
              href="/tours"
              className="bg-card rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(217,119,6,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"
                  alt={tLanding("Services.tours.title")}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-foreground mb-3">
                  {tLanding("Services.tours.title")}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  {tLanding("Services.tours.description")}
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-accent)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {tLanding("Services.tours.cta")} <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3: Transfers */}
            <Link
              href="/airport-transfers"
              className="bg-card rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800"
                  alt={tLanding("Services.transfers.title")}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-foreground mb-3">
                  {tLanding("Services.transfers.title")}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  {tLanding("Services.transfers.description")}
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {tLanding("Services.transfers.cta")} <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 4: Hire */}
            <Link
              href="/driver-hire"
              className="bg-card rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800"
                  alt={tLanding("Services.hire.title")}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-foreground mb-3">
                  {tLanding("Services.hire.title")}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  {tLanding("Services.hire.description")}
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    {tLanding("Services.hire.cta")} <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-8 pt-4 lg:pt-12 lg:pb-24 bg-card relative z-10 px-4 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <span className="inline-block text-[var(--color-accent)] font-bold text-[14px] tracking-[0.15em] uppercase mb-2">
              {tLanding("Destinations.badge")}
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">
              {tLanding("Destinations.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Dest 1: Munnar */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300">
              <div className="h-[400px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800"
                  alt="Munnar Tea Gardens"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Munnar, Kerala
                  </h3>
                  <span className="font-bold text-[var(--color-primary)]">
                    ₹12,500
                  </span>
                </div>
                <div className="flex items-center text-muted text-sm font-medium gap-2">
                  <span>
                    📍 {tLanding("Destinations.drive", { hours: 11 })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{tLanding("Destinations.trip", { days: 3 })}</span>
                </div>
              </div>
            </div>

            {/* Dest 2: Ooty */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300">
              <div className="h-[400px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"
                  alt="Ooty Nilgiris"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Ooty, Tamil Nadu
                  </h3>
                  <span className="font-bold text-[var(--color-primary)]">
                    ₹8,500
                  </span>
                </div>
                <div className="flex items-center text-muted text-sm font-medium gap-2">
                  <span>
                    📍 {tLanding("Destinations.drive", { hours: 10 })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{tLanding("Destinations.trip", { days: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Dest 3: Pondicherry */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300">
              <div className="h-[400px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
                  alt="Pondicherry French Quarter"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Pondicherry
                  </h3>
                  <span className="font-bold text-[var(--color-primary)]">
                    ₹5,000
                  </span>
                </div>
                <div className="flex items-center text-muted text-sm font-medium gap-2">
                  <span>📍 {tLanding("Destinations.drive", { hours: 3 })}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{tLanding("Destinations.trip", { days: 1 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 lg:py-24 bg-emerald-900 relative z-10 px-4 sm:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-10">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800"
                alt="Premium Fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
            </div>
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-2xl z-20 max-w-[200px] hidden md:block animate-[bounce_4s_infinite]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl drop-shadow-md">⭐</span>
                <div>
                  <div className="font-extrabold text-xl text-zinc-900 dark:text-white">
                    4.9/5
                  </div>
                  <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {tLanding("WhyUs.stats.rating")}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                {tLanding("WhyUs.stats.trusted")}
              </p>
            </div>
          </div>

          <div className="space-y-10 text-white relative z-10 mt-12 lg:mt-0">
            <div>
              <span className="inline-block text-emerald-400 font-bold text-[14px] tracking-[0.15em] uppercase mb-2">
                {tLanding("WhyUs.badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-6">
                {tLanding("WhyUs.title")}
              </h2>
              <p className="text-emerald-100/80 text-[17px] leading-relaxed max-w-[500px]">
                {tLanding("WhyUs.subtitle")}
              </p>
            </div>

            <div className="space-y-8">
              {/* Safety */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {tLanding("WhyUs.safety.title")}
                  </h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">
                    {tLanding("WhyUs.safety.description")}
                  </p>
                </div>
              </div>
              {/* Chauffeurs */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">👨‍✈️</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {tLanding("WhyUs.chauffeurs.title")}
                  </h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">
                    {tLanding("WhyUs.chauffeurs.description")}
                  </p>
                </div>
              </div>
              {/* Reliability */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {tLanding("WhyUs.reliability.title")}
                  </h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">
                    {tLanding("WhyUs.reliability.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-8 lg:py-24 bg-background relative z-10 px-4 sm:px-12">
        <div className="max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center relative overflow-hidden border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 lg:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              {tLanding("CTA.title")}
            </h2>
            <p className="text-muted text-base lg:text-lg font-medium">
              {tLanding("CTA.subtitle")}
            </p>
            <div className="flex justify-center pt-4">
              <Link
                href="/rentals"
                className="premium-button text-[16px] lg:text-[18px] py-3 lg:py-4 px-8 lg:px-10 rounded-xl lg:rounded-2xl shadow-md hover:-translate-y-1 transition-transform w-full sm:w-auto"
              >
                {tLanding("CTA.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
