"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const TOUR_PACKAGES = [
  { id: 1, name: "Pondicherry Local", dest: "Auroville, White Town, Beach", duration: "1 Day", price: 2500, type: "Car + Guide", img: "https://picsum.photos/id/1015/800/600" },
  { id: 2, name: "Mahabalipuram Tour", dest: "Shore Temple, Crocodile Park", duration: "1 Day", price: 3000, type: "Car", img: "https://picsum.photos/id/1040/800/600" },
  { id: 3, name: "Tirupati Darshan", dest: "Tirupati, Tirumala Temple", duration: "2 Days", price: 6500, type: "Car + Hotel", img: "https://picsum.photos/id/1058/800/600" },
  { id: 4, name: "Ooty & Kodai", dest: "Ooty, Kodaikanal, Tea Gardens", duration: "3 Days", price: 12000, type: "Car + Hotel", img: "https://picsum.photos/id/1036/800/600" },
  { id: 5, name: "Kerala Backwaters", dest: "Alleppey, Munnar, Kochi", duration: "4 Days", price: 18000, type: "Car + Hotel", img: "https://picsum.photos/id/1050/800/600" },
  { id: 6, name: "Bangalore - Mysore", dest: "Mysore Palace, Coorg", duration: "3 Days", price: 10000, type: "Car + Hotel", img: "https://picsum.photos/id/1047/800/600" },
  { id: 7, name: "Tamil Nadu Temples", dest: "Madurai, Thanjavur, Rameswaram", duration: "5 Days", price: 20000, type: "Car + Hotel", img: "https://picsum.photos/id/1043/800/600" },
  { id: 8, name: "Hampi Heritage", dest: "Hampi, Badami, Aihole", duration: "3 Days", price: 14000, type: "Car + Hotel", img: "https://picsum.photos/id/1055/800/600" },
];

export default function ToursPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const supabase = createClient();
        
        // Get session first (faster)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session && mounted) {
          router.push("/login?redirectTo=/tours");
          return;
        }

        // Verify with getUser (safer)
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if ((error || !user) && mounted) {
          router.push("/login?redirectTo=/tours");
        } else if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) {
          router.push("/login?redirectTo=/tours");
        }
      }
    }

    checkUser();
    return () => { mounted = false; };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Securing your session...</h2>
        <p className="text-sm font-medium text-slate-400 mt-2 uppercase tracking-widest">Preparing your tour packages</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Curated <span className="text-[var(--color-primary)]">Tour Packages</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Explore the rich heritage and natural beauty of South India with our carefully crafted itineraries. Relax, we handle the driving and details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TOUR_PACKAGES.map((tour) => (
          <div key={tour.id} className="card overflow-hidden group flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={tour.img} 
                alt={tour.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="badge badge-info bg-[var(--color-primary)] border-none text-white font-medium mb-2 opacity-90 backdrop-blur-md">
                  {tour.duration}
                </span>
                <h3 className="text-xl font-bold tracking-tight">{tour.name}</h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex-1 space-y-3 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--muted-light)] font-semibold mb-1">Destinations</p>
                  <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed">{tour.dest}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--muted-light)] font-semibold mb-1">Includes</p>
                  <p className="text-sm rounded-lg bg-[var(--surface)] text-[var(--muted)] py-1.5 px-3 inline-block">
                    ✓ {tour.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-[var(--muted-light)] font-medium">Starting from</span>
                  <span className="text-lg font-bold text-[var(--foreground)]">₹{tour.price.toLocaleString()}</span>
                </div>
                <Link 
                  href={`/tours/${tour.id}`}
                  className="premium-button py-2 px-5 text-sm"
                >
                  View Itinerary
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
