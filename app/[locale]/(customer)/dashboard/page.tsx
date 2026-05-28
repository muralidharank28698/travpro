"use client";

import { useAppSelector } from "@/lib/store";
import { Link } from "@/navigation";
import { useState } from "react";
import {
  Car,
  MapPin,
  ArrowRight,
  Download,
  XCircle,
  Map,
  Compass,
  Clock
} from "lucide-react";
import { useTranslations } from 'next-intl';
import { MOCK_CARS } from "@/lib/mock-data";
import BookingTicket from "@/components/dashboard/BookingTicket";

export default function CustomerDashboardPage() {
  const t = useTranslations('CustomerDashboard');
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  const myBookings = useAppSelector((state) => state.bookings.items);

  const upcoming = myBookings.filter(b => b.status === "Confirmed" || b.status === "In Progress");
  const past = myBookings.filter(b => b.status === "Completed" || b.status === "Cancelled");

  const displayBookings = activeTab === "Upcoming" ? upcoming : past;

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 mt-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-600 to-emerald-400 bg-clip-text text-transparent">            {t('title')}
          </h1>
          <p className="text-[var(--muted)] mt-1.5 text-sm">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Raycast-Style Segmented Toggle */}
      <div className="flex bg-[#F4F4F5] dark:bg-card/40 p-1 rounded-full w-fit mb-10 border border-border/20 shadow-inner">
        <button
          onClick={() => setActiveTab("Upcoming")}
          className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[13px] transition-all duration-300 ${
            activeTab === 'Upcoming' 
              ? 'bg-white dark:bg-surface text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-bold scale-[1.02]' 
              : 'text-muted-light hover:text-foreground font-medium'
          }`}
        >
          <div className={`w-5 h-5 flex items-center justify-center rounded-md ${activeTab === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-transparent text-muted-light'}`}>
            <Clock className="w-3.5 h-3.5" />
          </div>
          {t('upcoming')}
          <span className={`ml-1 text-[10px] opacity-40 font-mono`}>{upcoming.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("Past")}
          className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[13px] transition-all duration-300 ${
            activeTab === 'Past' 
              ? 'bg-white dark:bg-surface text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-bold scale-[1.02]' 
              : 'text-muted-light hover:text-foreground font-medium'
          }`}
        >
          <div className={`w-5 h-5 flex items-center justify-center rounded-md ${activeTab === 'Past' ? 'bg-primary/10 text-primary' : 'bg-transparent text-muted-light'}`}>
            <MapPin className="w-3.5 h-3.5" />
          </div>
          {t('past')}
          <span className={`ml-1 text-[10px] opacity-40 font-mono`}>{past.length}</span>
        </button>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-8">
        {displayBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center rounded-[2.5rem] border border-dashed border-border/60 bg-surface/30">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-border/50 flex items-center justify-center mb-6 shadow-sm">
              <Compass className="w-8 h-8 text-[var(--muted-light)] opacity-30" />
            </div>
            <h3 className="text-xl font-black text-foreground tracking-tight">{t('empty_title', { tab: activeTab.toLowerCase() })}</h3>
            <p className="text-[var(--muted)] text-sm mt-2 mb-8 max-w-sm font-medium leading-relaxed">{t('empty_subtitle')}</p>
            <Link href="/rentals" className="premium-button text-xs px-8 py-3.5 shadow-lg shadow-primary/20">
              {t('explore')}
            </Link>
          </div>
        ) : (
          displayBookings.map((booking) => {
            const car = MOCK_CARS.find(c => c.name === booking.carName);
            return (
              <BookingTicket 
                key={booking.id} 
                booking={booking} 
                car={car}
                isActive={activeTab === "Upcoming"}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
