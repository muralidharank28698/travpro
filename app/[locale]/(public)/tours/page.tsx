"use client";

import { useState, useEffect } from "react";
import { useRouter, Link } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { Search, Filter, Compass, SlidersHorizontal } from "lucide-react";
import TourDiscoveryCard from "@/components/tours/TourDiscoveryCard";
import { useTranslations } from 'next-intl';

const TOUR_PACKAGES = [
  { id: 1, name: "Pondicherry Local", dest: "Auroville, White Town, Beach", duration: "1 Day", price: 2500, type: "Car + Guide", img: "https://picsum.photos/id/1015/800/600", aspect: "aspect-[3/4]", rating: 4.8, reviews: 124, category: "Local" },
  { id: 2, name: "Mahabalipuram Tour", dest: "Shore Temple, Crocodile Park", duration: "1 Day", price: 3000, type: "Car", img: "https://picsum.photos/id/1040/800/600", aspect: "aspect-square", rating: 4.7, reviews: 89, category: "Heritage" },
  { id: 3, name: "Tirupati Darshan", dest: "Tirupati, Tirumala Temple", duration: "2 Days", price: 6500, type: "Car + Hotel", img: "https://picsum.photos/id/1058/800/600", aspect: "aspect-[4/5]", rating: 4.9, reviews: 312, category: "Pilgrimage" },
  { id: 4, name: "Ooty & Kodai", dest: "Ooty, Kodaikanal, Tea Gardens", duration: "3 Days", price: 12000, type: "Car + Hotel", img: "https://picsum.photos/id/1036/800/600", aspect: "aspect-[2/3]", rating: 4.9, reviews: 567, category: "Nature" },
  { id: 5, name: "Kerala Backwaters", dest: "Alleppey, Munnar, Kochi", duration: "4 Days", price: 18000, type: "Car + Hotel", img: "https://picsum.photos/id/1050/800/600", aspect: "aspect-[3/4]", rating: 4.8, reviews: 423, category: "Nature" },
  { id: 6, name: "Bangalore - Mysore", dest: "Mysore Palace, Coorg", duration: "3 Days", price: 10000, type: "Car + Hotel", img: "https://picsum.photos/id/1047/800/600", aspect: "aspect-square", rating: 4.6, reviews: 156, category: "Heritage" },
  { id: 7, name: "Tamil Nadu Temples", dest: "Madurai, Thanjavur, Rameswaram", duration: "5 Days", price: 20000, type: "Car + Hotel", img: "https://picsum.photos/id/1043/800/600", aspect: "aspect-[4/5]", rating: 4.9, reviews: 298, category: "Pilgrimage" },
  { id: 8, name: "Hampi Heritage", dest: "Hampi, Badami, Aihole", duration: "3 Days", price: 14000, type: "Car + Hotel", img: "https://picsum.photos/id/1055/800/600", aspect: "aspect-[2/3]", rating: 4.7, reviews: 178, category: "Heritage" },
];

const CATEGORIES = ["All", "Heritage", "Nature", "Pilgrimage", "Local"];

export default function ToursPage() {
  const t = useTranslations('Tours');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session && mounted) {
          router.push("/login?redirectTo=/tours");
          return;
        }

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

  const filteredTours = TOUR_PACKAGES.filter((tour) => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.dest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black text-foreground tracking-tight">{t('securing')}</h2>
        <p className="text-sm font-medium text-[var(--muted-light)] mt-2 uppercase tracking-widest">{t('preparing')}</p>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-6 lg:pt-14 px-6 sm:px-12 max-w-[1400px] mx-auto w-full animate-fade-in-up">
      {/* Premium Hero Section */}
      <div className="mb-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-1">
          <Compass className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Discover the Extraordinary</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-[var(--foreground)] leading-[1.1]">
          {t.rich('title', {
            span: (chunks) => <span className="text-[var(--color-primary)]">{chunks}</span>
          })}
        </h1>
        <p className="text-base text-[var(--muted)] max-w-2xl mx-auto font-medium">
          {t('subtitle')}
        </p>
      </div>

      {/* Professional Search & Filter */}
      <div className="mb-12 space-y-6 max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center px-2">
          {/* Search Input */}
          <div className="relative flex-1 w-full max-w-2xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search destinations, tours, or experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-14 sm:pr-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/10 rounded-full outline-none transition-all text-[14px] font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {/* Mobile Filter Icon (Inside Search Bar) */}
            <button className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Button */}
          <button className="hidden sm:flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold text-[11px] uppercase tracking-widest shrink-0 w-full sm:w-auto">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                : "bg-surface dark:bg-slate-900 border-border/40 dark:border-slate-800 text-muted dark:text-slate-400 hover:border-primary/20 hover:text-foreground dark:hover:text-slate-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Gallery */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <TourDiscoveryCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center space-y-6 animate-fade-in-up">
          <div className="w-20 h-20 bg-surface rounded-[2rem] flex items-center justify-center mx-auto border border-border/60 shadow-inner">
            <Search className="w-8 h-8 text-muted opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground tracking-tight">No experiences found</h3>
            <p className="text-muted text-sm font-medium">Try adjusting your filters or search terms.</p>
          </div>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="premium-button text-[10px] px-8 py-3.5"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
