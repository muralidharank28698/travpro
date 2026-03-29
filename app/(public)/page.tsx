"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 pt-8 pb-16 lg:pt-12 lg:pb-24 w-full max-w-[1400px] mx-auto overflow-hidden grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-60" />
        </div>

        {/* Left Content */}
        <div className="relative z-10 space-y-6 animate-fade-in-up mt-8 lg:mt-0">
          <span className="inline-block text-[var(--color-accent)] font-bold text-[15px] tracking-[0.15em] uppercase">
            Best Destinations Around South India
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
            Travel, enjoy <br className="hidden lg:block"/>
            and live a new <br className="hidden lg:block"/>
            and full life
          </h1>
          <p className="text-[17px] text-[var(--muted)] max-w-[450px] leading-relaxed font-medium">
            From quick airport drops and premium car rentals to extensive South India tours. 
            Experience comfort, safety, and ultimate reliability with Jayasree Travels.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center pt-4">
            <Link href="/rentals" className="text-[16px] py-[16px] px-8 rounded-xl shadow-[0px_20px_35px_rgba(5,150,105,0.2)] hover:-translate-y-1 transition-transform text-white w-full sm:w-auto text-center font-bold bg-[var(--color-primary)]">
              Find out more
            </Link>
            <button 
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-4 text-[var(--muted)] font-semibold text-[17px] hover:text-[var(--foreground)] transition-colors w-full sm:w-auto justify-center sm:justify-start group"
            >
              <div className="w-[52px] h-[52px] rounded-full shadow-[0px_15px_30px_rgba(217,119,6,0.3)] flex items-center justify-center text-white transition-transform group-hover:scale-105 bg-[var(--color-accent)]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 6.13397C14.1667 6.51887 14.1667 7.48113 13.5 7.86603L2.25 14.3615C1.58333 14.7464 0.750001 14.2653 0.750001 13.4955L0.750001 0.504494C0.750001 -0.265305 1.58333 -0.746431 2.25 -0.361531L13.5 6.13397Z" fill="currentColor"/>
                </svg>
              </div>
              Play Demo
            </button>
          </div>
        </div>

        {/* Right Image/Graphic */}
        <div className="relative w-full h-[350px] lg:h-[550px] animate-fade-in-up flex items-center justify-center mt-12 lg:mt-0" style={{ animationDelay: "200ms" }}>
          {/* Decorative Background Shapes Behind Image */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-amber-100 rounded-[4rem] -rotate-6 z-0" />
          <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-emerald-50 rounded-[4rem] rotate-3 z-0" />
          
          {/* Main Image or Video */}
          <div className="relative z-10 w-[90%] h-[90%] flex items-center justify-center">
            {showVideo ? (
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/Sen_tMhmPv8?autoplay=1" 
                title="Jayasree Travels Demo Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl z-10 bg-black"
              />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800" 
                alt="Happy travelers enjoying a road trip" 
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl z-10"
              />
            )}
          </div>

          {/* Decorative Floating Elements */}
          <div className="absolute top-[5%] -left-[2%] w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 flex items-center justify-center text-2xl lg:text-3xl animate-[bounce_3s_infinite]" style={{ animationDelay: "0.2s" }}>
            ✈️
          </div>
          <div className="absolute bottom-[10%] -right-[2%] w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 flex items-center justify-center text-2xl lg:text-3xl animate-[bounce_4s_infinite]" style={{ animationDelay: "1s" }}>
            🚗
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50 relative z-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-[var(--color-accent)] font-bold text-[14px] tracking-[0.15em] uppercase mb-2">Category</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">We Offer Best Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <Link href="/rentals" className="bg-white rounded-[2rem] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" 
                  alt="Car Rentals" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-slate-800 mb-3">Car Rentals</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  Chauffeur-driven hatchbacks, sedans, and SUVs for hourly or daily requirements.
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Browse Fleet <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/tours" className="bg-white rounded-[2rem] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(217,119,6,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" 
                  alt="Tour Packages" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-slate-800 mb-3">Tour Packages</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  Curated trips across South India from Pondicherry to Ooty, Munnar, and Hampi.
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-accent)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Packages <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/airport-transfers" className="bg-white rounded-[2rem] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800" 
                  alt="Airport Transfers" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-slate-800 mb-3">Airport Transfers</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  Punctual pick-up and drop-off spanning Chennai, Bangalore, and local airports.
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Book Transfer <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/driver-hire" className="bg-white rounded-[2rem] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(5,150,105,0.12)] hover:-translate-y-3 transition-all duration-300 group block decoration-none text-left flex flex-col h-full animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800" 
                  alt="Hire a Driver" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="text-[22px] font-extrabold text-slate-800 mb-3">Hire a Driver</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-1 font-medium">
                  Professional, background-verified drivers available for your own vehicle.
                </p>
                <div className="mt-auto">
                  <span className="text-[var(--color-primary)] font-bold text-[15px] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Find Drivers <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-24 bg-white relative z-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-[var(--color-accent)] font-bold text-[14px] tracking-[0.15em] uppercase mb-2">Top Selling</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">Top Destinations</h2>
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
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Munnar, Kerala</h3>
                  <span className="font-bold text-[var(--color-primary)]">₹12,500</span>
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium gap-2">
                  <span>📍 Appx. 11h Drive</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>3 Days Trip</span>
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
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Ooty, Tamil Nadu</h3>
                  <span className="font-bold text-[var(--color-primary)]">₹8,500</span>
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium gap-2">
                  <span>📍 Appx. 10h Drive</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>2 Days Trip</span>
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
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 m-4 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Pondicherry</h3>
                  <span className="font-bold text-[var(--color-primary)]">₹5,000</span>
                </div>
                <div className="flex items-center text-slate-500 text-sm font-medium gap-2">
                  <span>📍 Appx. 3h Drive</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>1 Day Trip</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-emerald-900 relative z-10 px-6 sm:px-12 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-10">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800" alt="Premium Fleet" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
            </div>
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-[2rem] shadow-2xl z-20 max-w-[200px] hidden md:block animate-[bounce_4s_infinite]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl">⭐</span>
                <div>
                  <div className="font-extrabold text-xl text-slate-800">4.9/5</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 font-medium">Trusted by 10k+ happy customers.</p>
            </div>
          </div>

          <div className="space-y-10 text-white relative z-10">
            <div>
              <span className="inline-block text-emerald-400 font-bold text-[14px] tracking-[0.15em] uppercase mb-2">Why Us?</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">Experience the highest standard of travel</h2>
              <p className="text-emerald-100/80 text-[17px] leading-relaxed max-w-[500px]">
                We don't just provide a vehicle; we deliver a premium, stress-free travel experience across South India.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Safety First, Always</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">Every vehicle in our fleet undergoes rigorous maintenance checks before every single trip.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">👨‍✈️</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Elite Chauffeurs</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">Our drivers are permanently employed, background-verified professionals with years of inter-city expertise.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">24/7 Reliability</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">Flight delayed at 3 AM? We'll be there. Our dispatch and support team operates around the clock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-24 bg-slate-50 relative z-10 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto bg-emerald-50 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden border border-emerald-100 shadow-[0_20px_40px_rgba(5,150,105,0.05)]">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-300 rounded-full blur-3xl opacity-30" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">Ready to start your journey?</h2>
            <p className="text-slate-600 text-lg font-medium">Book your reliable ride today and experience the absolute best in comfort and safety across South India.</p>
            <div className="flex justify-center pt-4">
              <Link href="/rentals" className="text-[18px] py-4 px-10 rounded-2xl shadow-[0px_20px_35px_rgba(5,150,105,0.25)] hover:-translate-y-1 transition-transform text-white font-bold bg-[var(--color-primary)]">
                Book Your Ride Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
