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
  Compass
} from "lucide-react";
import { useTranslations } from 'next-intl';

export default function CustomerDashboardPage() {
  const t = useTranslations('CustomerDashboard');
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  const myBookings = useAppSelector((state) => state.bookings.items);

  const upcoming = myBookings.filter(b => b.status === "Confirmed" || b.status === "In Progress");
  const past = myBookings.filter(b => b.status === "Completed" || b.status === "Cancelled");

  const displayBookings = activeTab === "Upcoming" ? upcoming : past;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 mt-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-950 to-emerald-700 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-[var(--muted)] mt-1.5 text-sm">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50">
        <button
          className={`pb-3 px-1 mr-8 text-sm font-bold transition-all border-b-2 focus:outline-none ${activeTab === 'Upcoming'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-transparent text-[var(--muted)] hover:text-foreground'
            }`}
          onClick={() => setActiveTab("Upcoming")}
        >
          {t('upcoming')}
          <span className="ml-2 inline-flex items-center justify-center bg-slate-100 text-muted text-[10px] px-2 py-0.5 rounded-full">
            {upcoming.length}
          </span>
        </button>
        <button
          className={`pb-3 px-1 text-sm font-bold transition-all border-b-2 focus:outline-none ${activeTab === 'Past'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-transparent text-[var(--muted)] hover:text-foreground'
            }`}
          onClick={() => setActiveTab("Past")}
        >
          {t('past')}
          <span className="ml-2 inline-flex items-center justify-center bg-slate-100 text-muted text-[10px] px-2 py-0.5 rounded-full">
            {past.length}
          </span>
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-5">
        {displayBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border/60 bg-surface/30">
            <div className="w-16 h-16 bg-surface border-border/50">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">{t('empty_title', { tab: activeTab.toLowerCase() })}</h3>
            <p className="text-[var(--muted)] text-sm mt-1.5 mb-6 max-w-sm">{t('empty_subtitle')}</p>
            <Link href="/rentals" className="premium-button text-sm px-6 py-2.5">
              {t('explore')}
            </Link>
          </div>
        ) : (
          displayBookings.map((booking) => (
            <div key={booking.id} className="bg-card rounded-2xl shadow-sm border border-border/60 hover:border-border transition-all group p-5 sm:p-6 flex flex-col gap-5 relative backdrop-blur-sm">
               
               {/* Header Row */}
               <div className="flex justify-between items-center border-b border-border/40 pb-4">
                 <div className="flex items-center gap-3">
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20' : 
                    booking.status === 'In Progress' ? 'bg-blue-500 shadow-sm shadow-blue-500/20' : 
                    booking.status === 'Cancelled' ? 'bg-red-500 shadow-sm shadow-red-500/20' :
                    'bg-surface0'
                  }`}>
                    {booking.status}
                  </span>
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">{booking.tripType}</span>
                 </div>
                 <span className="text-xs text-slate-400 font-mono tracking-wider items-center gap-1.5 hidden sm:flex">
                   <Car className="w-3.5 h-3.5 opacity-40" /> #{booking.id}
                 </span>
               </div>

               {/* Main Title & Price */}
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                   <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-none">{booking.carName}</h2>
                 </div>
                 <div className="text-left md:text-right">
                   <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1 hidden md:block">{t('total_fare')}</p>
                   <p className="text-3xl font-bold text-foreground tracking-tighter">₹{booking.amount.toLocaleString()}</p>
                 </div>
               </div>

               {/* Route & Actions Bottom Bar */}
               <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface/80 rounded-xl p-4 md:px-5 border border-border/50 shadow-inner">
                 
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm flex-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <p className="font-bold text-foreground text-sm leading-none">{booking.pickupLocation}</p>
                    </div>
                    <p className="text-xs font-medium text-slate-400 ml-5">{booking.startDate}</p>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block" />

                  <div className="flex flex-col mt-1 sm:mt-0 pt-3 border-t border-border/50 sm:border-0 sm:pt-0">
                     <div className="flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <p className="font-bold text-foreground text-sm leading-none">{booking.dropoffLocation}</p>
                    </div>
                    <p className="text-xs font-medium text-slate-400 ml-5">{booking.endDate}</p>
                  </div>
                </div>

                 {/* Action Buttons */}
                 <div className="flex items-center justify-between sm:justify-start gap-2 mt-2 md:mt-0 pt-4 md:pt-0 border-t border-border/50 md:border-transparent shrink-0">
                   {activeTab === "Upcoming" && (
                    <>
                      <button className="text-xs font-bold text-muted hover:text-red-500 py-2.5 px-4 transition-colors flex items-center justify-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> {t('cancel')}
                      </button>
                      <button className="premium-button text-xs py-2.5 px-6 flex items-center justify-center gap-1.5 shadow-md">
                        <Map className="w-3.5 h-3.5" /> {t('track')}
                      </button>
                    </>
                  )}
                  {activeTab === "Past" && (
                    <button className="secondary-button text-xs py-2.5 px-6 w-full sm:w-auto flex items-center justify-center gap-1.5 bg-card border-border shadow-sm hover:bg-surface transition-colors">
                      <Download className="w-3.5 h-3.5 text-muted" /> {t('download')}
                    </button>
                  )}
                 </div>

               </div>
               
            </div>
          ))
        )}
      </div>
    </div>
  );
}
