"use client";

import { Booking, Car } from "@/lib/mock-data";
import { 
  MapPin, 
  ArrowRight, 
  Car as CarIcon, 
  Download, 
  XCircle, 
  Map,
  Clock,
  ChevronRight
} from "lucide-react";
import { useTranslations } from "next-intl";

interface BookingTicketProps {
  booking: Booking;
  car?: Car;
  isActive?: boolean;
}

export default function BookingTicket({ booking, car, isActive = true }: BookingTicketProps) {
  const t = useTranslations('CustomerDashboard');
  
  const statusColors = {
    "Confirmed": "bg-emerald-500",
    "In Progress": "bg-blue-500",
    "Completed": "bg-slate-500",
    "Cancelled": "bg-rose-500"
  };

  return (
    <div className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border border-border/60 hover:border-primary/30 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
      {/* Visual Accents */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 ${statusColors[booking.status]}`} />
      
      <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-6 relative z-10">
        
        {/* Left Section: Visual Route Plotter */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full animate-pulse ${statusColors[booking.status]}`} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/80">{booking.status}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[9px] font-bold text-[var(--muted-light)] uppercase tracking-widest">{booking.tripType}</span>
            </div>
            <span className="text-[9px] font-mono text-[var(--muted-light)] bg-surface/50 px-1.5 py-0.5 rounded-md border border-border/40">#{booking.id}</span>
          </div>

          <div className="relative flex flex-col gap-8 flex-1">
            {/* Connecting Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-primary/40 via-border/40 to-slate-200/40 border-dashed border-l-[1px] border-border/50" />
            
            {/* Pickup */}
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10 mt-1 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-light)] leading-none mb-1">{t('pickupLocation') || 'Pickup'}</p>
                <h4 className="text-base font-black tracking-tight text-foreground leading-tight">{booking.pickupLocation}</h4>
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-tight">{booking.startDate}</span>
                </div>
              </div>
            </div>

            {/* Dropoff */}
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-slate-50 border border-border flex items-center justify-center relative z-10 mt-1 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-light)] leading-none mb-1">{t('dropoffLocation') || 'Destination'}</p>
                <h4 className="text-base font-black tracking-tight text-foreground leading-tight">{booking.dropoffLocation}</h4>
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-tight">{booking.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Compact Vehicle & Fare */}
        <div className="w-full lg:w-56 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-border/40 pt-4 lg:pt-0 lg:pl-5">
          <div className="space-y-3">
             {car?.image ? (
               <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-surface/30 p-1.5 border border-border/30">
                 <img 
                   src={car.image} 
                   alt={booking.carName} 
                   className="w-full h-full object-cover rounded-xl mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700" 
                 />
               </div>
             ) : (
               <div className="aspect-[3/2] w-full rounded-2xl bg-surface/50 flex items-center justify-center border border-border/40">
                  <CarIcon className="w-8 h-8 text-[var(--muted-light)] opacity-20" />
               </div>
             )}
            
            <div className="flex items-end justify-between px-1">
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[var(--muted-light)] uppercase tracking-widest leading-none mb-1">Vehicle</p>
                <h3 className="text-sm font-black tracking-tight text-foreground truncate">{booking.carName}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[var(--muted-light)] uppercase tracking-widest leading-none mb-1">{t('total_fare')}</p>
                <span className="text-base font-black text-foreground">₹{booking.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            {isActive ? (
              <>
                <button className="premium-button py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group/btn active:scale-95">
                  <Map className="w-3.5 h-3.5" />
                  {t('track')}
                </button>
                <button className="flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-[9px] font-bold text-rose-500 hover:bg-rose-500/10 transition-all active:scale-95">
                  <XCircle className="w-3.5 h-3.5" />
                  {t('cancel')}
                </button>
              </>
            ) : (
              <button className="secondary-button py-2 px-4 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 w-full active:scale-95 bg-surface/50 border-border/60">
                <Download className="w-3.5 h-3.5" />
                {t('download')}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
