"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Users, Calendar, CheckCircle2, Star, Share2, Heart } from "lucide-react";

const TOUR_PACKAGES = [
  { 
    id: 1, 
    name: "Pondicherry Local", 
    dest: "Auroville, White Town, Beach", 
    duration: "1 Day", 
    price: 2500, 
    type: "Car + Guide", 
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200",
    description: "Experience the unique blend of French heritage and Indian culture in the charming coastal town of Puducherry. From the spiritual serenity of Auroville to the vibrant streets of the French Quarter (White Town) and the relaxing Promenade Beach.",
    itinerary: [
      { time: "09:00 AM", activity: "Pick up from hotel/residence" },
      { time: "10:00 AM", activity: "Visit Auroville Matrimandir (View point)" },
      { time: "01:00 PM", activity: "Lunch break at a heritage cafe in White Town" },
      { time: "02:30 PM", activity: "Walking tour of French Quarter & Aurobindo Ashram" },
      { time: "04:30 PM", activity: "Evening stroll at Promenade Beach & Gandhi Statue" },
      { time: "06:00 PM", activity: "Drop off at hotel" }
    ],
    inclusions: ["Chauffeur-driven AC Car", "Professional Guide", "Bottled Water", "Parking & Tolls"],
    exclusions: ["Entry Tickets", "Food & Beverages", "Personal Expenses"]
  },
  { 
    id: 2, 
    name: "Mahabalipuram Tour", 
    dest: "Shore Temple, Crocodile Park", 
    duration: "1 Day", 
    price: 3000, 
    type: "Car", 
    img: "https://images.unsplash.com/photo-1590050752117-23a9d7fc20c3?auto=format&fit=crop&q=80&w=1200",
    description: "Explore the UNESCO World Heritage site of Mahabalipuram, famous for its 7th and 8th-century Hindu group of monuments. This day trip from Pondicherry takes you through coastal vistas to ancient rock-cut architecture.",
    itinerary: [
      { time: "08:30 AM", activity: "Departure from Pondicherry" },
      { time: "10:00 AM", activity: "Visit Shore Temple & Five Rathas" },
      { time: "01:00 PM", activity: "Authentic seafood lunch" },
      { time: "02:30 PM", activity: "Arjuna's Penance & Krishna's Butter Ball" },
      { time: "04:00 PM", activity: "Crocodile Bank visit" },
      { time: "06:30 PM", activity: "Return to Pondicherry" }
    ],
    inclusions: ["Chauffeur-driven AC Car", "Pickup & Drop", "Parking & Tolls"],
    exclusions: ["Entry Tickets", "Guide Services", "Meals"]
  },
  { id: 3, name: "Tirupati Darshan", dest: "Tirupati, Tirumala Temple", duration: "2 Days", price: 6500, type: "Car + Hotel", img: "https://picsum.photos/id/1058/800/600" },
  { id: 4, name: "Ooty & Kodai", dest: "Ooty, Kodaikanal, Tea Gardens", duration: "3 Days", price: 12000, type: "Car + Hotel", img: "https://picsum.photos/id/1036/800/600" },
  { id: 5, name: "Kerala Backwaters", dest: "Alleppey, Munnar, Kochi", duration: "4 Days", price: 18000, type: "Car + Hotel", img: "https://picsum.photos/id/1050/800/600" },
  { id: 6, name: "Bangalore - Mysore", dest: "Mysore Palace, Coorg", duration: "3 Days", price: 10000, type: "Car + Hotel", img: "https://picsum.photos/id/1047/800/600" },
  { id: 7, name: "Tamil Nadu Temples", dest: "Madurai, Thanjavur, Rameswaram", duration: "5 Days", price: 20000, type: "Car + Hotel", img: "https://picsum.photos/id/1043/800/600" },
  { id: 8, name: "Hampi Heritage", dest: "Hampi, Badami, Aihole", duration: "3 Days", price: 14000, type: "Car + Hotel", img: "https://picsum.photos/id/1055/800/600" },
];

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = Number(params?.tourId);
  const tour = TOUR_PACKAGES.find(t => t.id === tourId);

  const [bookingData, setBookingData] = useState({
    date: "",
    pax: 1,
    name: "",
    email: ""
  });

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Tour Package Not Found</h2>
        <Link href="/tours" className="secondary-button py-2 px-6">
          Back to Tours
        </Link>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking initiated for ${tour.name}!\nDate: ${bookingData.date}\nPassengers: ${bookingData.pax}`);
    router.push("/rentals/success"); // Redirecting to a success page for demo
  };

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      <Link href="/tours" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to All Tours
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={tour.img} 
              alt={tour.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="badge badge-info bg-[var(--color-primary)] border-none text-white py-1 px-4 h-auto text-sm font-semibold">
                {tour.duration}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>4.9 (42 Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              {tour.name}
            </h1>

            <div className="flex items-center gap-6 text-[var(--muted)] text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{tour.dest}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-[var(--muted)] leading-relaxed">
              <p>{tour.description || "Join us for an unforgettable exploration of South India's finest destinations. Our curated packages ensure you witness the best attractions with absolute comfort and local expertise."}</p>
            </div>

            {tour.itinerary && (
              <div className="space-y-6 pt-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Itinerary</h2>
                <div className="space-y-4 border-l-2 border-emerald-100 ml-4 pl-8 pt-2">
                  {tour.itinerary.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                      <div className="font-bold text-emerald-600 text-sm mb-1">{item.time}</div>
                      <div className="text-[var(--foreground)] font-medium">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              <div className="card p-6 border-emerald-50 bg-emerald-50/10">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                  Inclusions
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {(tour.inclusions || ["AC Vehicle", "Chauffeur", "Fuel & Tolls"]).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-6 border-red-50 bg-red-50/10">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-red-700">
                  <Clock className="w-5 h-5 rotate-45" />
                  Exclusions
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {(tour.exclusions || ["Entry Tickets", "Food", "Guide (Optional)"]).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:h-fit lg:sticky lg:top-24">
          <div className="card p-8 shadow-2xl border-emerald-50">
            <div className="flex items-end gap-1 mb-8">
              <span className="text-3xl font-black text-[var(--foreground)]">₹{tour.price.toLocaleString()}</span>
              <span className="text-[var(--muted)] text-sm mb-1.5">/ total package</span>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-[var(--muted-light)]">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <input 
                    type="date" 
                    required 
                    className="form-input pl-12" 
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-[var(--muted-light)]">Total Passengers</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <select 
                    className="form-input pl-12"
                    onChange={(e) => setBookingData({...bookingData, pax: Number(e.target.value)})}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[var(--muted)]">Base Package Price</span>
                  <span>₹{tour.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[var(--muted)]">GST (5%)</span>
                  <span>₹{(tour.price * 0.05).toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex justify-between items-center font-black text-xl">
                  <span>Total</span>
                  <span className="text-emerald-600">₹{(tour.price * 1.05).toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" className="premium-button w-full py-4 mt-6 text-lg tracking-tight">
                Request Booking
              </button>

              <p className="text-[10px] text-center text-[var(--muted-light)] mt-4 uppercase tracking-widest">
                No payment required upfront for requests
              </p>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-[var(--muted)] text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Secure Booking Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 14.535a9.235 9.235 0 00.174 4.541c.21.564.444 1.121.703 1.668a9.231 9.231 0 002.046 2.744c.54.48 1.115.894 1.721 1.236A9.243 9.243 0 0012 21c2.094 0 4.073-.694 5.679-1.854a9.243 9.243 0 0012.164-3.5L21 8.984z" />
    </svg>
  );
}
