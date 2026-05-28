"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface Tour {
  id: number;
  name: string;
  dest: string;
  duration: string;
  price: number;
  type: string;
  img: string;
  aspect?: string;
  rating?: number;
  reviews?: number;
  category?: string;
}

interface TourDiscoveryCardProps {
  tour: Tour;
}

export default function TourDiscoveryCard({ tour }: TourDiscoveryCardProps) {
  const t = useTranslations('Tours');

  return (
    <div className="bg-white dark:bg-[#121212] rounded-[2rem] p-3 sm:p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 border border-slate-100 dark:border-[#222] transition-all duration-500 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-5">
        <img 
          src={tour.img} 
          alt={tour.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
        />
        
        {/* Duration Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 dark:bg-[#2563eb] text-slate-800 dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 flex-1 flex flex-col">
        <h3 className="text-[19px] font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {tour.name}
        </h3>
        
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 flex-1">
          Explore {tour.dest} with our curated {tour.duration.toLowerCase()} itinerary perfectly designed for you.
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-[#262626]">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
              Starting from
            </span>
            <span className="text-[16px] font-black text-slate-800 dark:text-white tracking-tight leading-none">
              ₹{tour.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <Link 
            href={`/tours/${tour.id}`}
            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 text-[13px] font-bold transition-colors"
          >
            View Itinerary
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
