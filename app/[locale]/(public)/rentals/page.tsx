"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/navigation";
import CustomSelect from "@/components/common/CustomSelect";
import { useTranslations } from 'next-intl';
import { createClient } from "@/lib/supabase/client";

export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
  seats: number;
  transmission: string;
  fuel: string;
  description: string;
  status: "Available" | "Booked" | "Maintenance";
  rating: number;
  trips: number;
}

export default function RentalsPage() {
  const t = useTranslations('Rentals');
  const [MOCK_CARS, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      const supabase = createClient();
      const { data, error } = await supabase.from('t_vehicles').select('*');
      
      if (error) {
        setFetchError(error.message);
      } else if (data) {
        if (data.length === 0) setFetchError("Table is empty! No vehicles found in database.");
        const mappedCars = data.map((v: any) => ({
          id: v.id,
          name: v.name,
          type: v.type,
          pricePerDay: v.price_per_day || 2500,
          image: v.images && v.images.length > 0 ? v.images[0] : "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
          seats: v.capacity || 5,
          transmission: "Automatic", // Hardcoded for now
          fuel: "Diesel", // Hardcoded for now
          description: v.description || "A comfortable and reliable vehicle.",
          status: v.is_available ? "Available" : "Booked",
          rating: v.rating || 4.5,
          trips: v.total_trips || 0
        }));
        setCars(mappedCars);
      }
      setLoading(false);
    }
    fetchCars();
  }, []);

  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Calculate active filters count
  const activeFilterCount = [
    selectedModel !== "All",
    selectedSeats !== "All",
    selectedFuel !== "All",
  ].filter(Boolean).length;

  const carModelOptions = [
    { value: "All", label: t('filters.model') },
    ...MOCK_CARS.map(c => ({
      value: c.name,
      label: c.name,
      description: `${c.type} • ${t('filters.seats_count', { count: c.seats })}`
    }))
  ];

  const seatOptions = [
    { value: "All", label: t('filters.any_seats') },
    { value: "4", label: t('filters.seats_count', { count: 4 }) },
    { value: "5", label: t('filters.seats_count', { count: 5 }) },
    { value: "7", label: t('filters.seats_count', { count: 7 }) },
    { value: "9", label: t('filters.seats_count', { count: 9 }) + "+" },
  ];

  const fuelOptions = [
    { value: "All", label: t('filters.any_fuel') },
    { value: "Petrol", label: "Petrol" },
    { value: "Diesel", label: "Diesel" },
    { value: "CNG", label: "CNG" },
  ];

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter((car) => {
      const matchesModel = selectedModel === "All" || car.name === selectedModel;
      const matchesSeats = selectedSeats === "All" || car.seats.toString() === selectedSeats;
      const matchesFuel = selectedFuel === "All" || car.fuel === selectedFuel;

      return matchesModel && matchesSeats && matchesFuel;
    });
  }, [selectedModel, selectedSeats, selectedFuel, MOCK_CARS]);

  const clearFilters = () => {
    setSelectedModel("All");
    setSelectedSeats("All");
    setSelectedFuel("All");
  };

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--foreground)] mb-3">
          {t('title')}
        </h1>
        <p className="text-base text-[var(--muted)] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="py-24 text-center animate-fade-in-up">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Loading vehicles...</h2>
        </div>
      ) : fetchError ? (
        <div className="py-24 text-center animate-fade-in-up card border-red-500 border-2 bg-red-50">
          <h2 className="text-xl font-bold text-red-600 tracking-tight">Database Error</h2>
          <p className="text-red-500 mt-2">{fetchError}</p>
        </div>
      ) : (
        <>

      {/* Top Bar with Filter Toggle */}
      <div className="flex justify-end items-center mb-6 gap-4">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium tracking-wide">
          Showing <span className="text-slate-600 dark:text-slate-300 font-bold">{filteredCars.length}</span> vehicles
        </p>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={`relative p-1.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
            isFiltersOpen || activeFilterCount > 0
              ? "bg-[var(--color-primary)] text-white border-transparent"
              : "bg-transparent text-slate-500 border-slate-200 hover:bg-slate-50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800/50"
          }`}
          title="Toggle Filters"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 flex items-center justify-center bg-rose-500 text-white rounded-full text-[9px] font-bold shadow-sm">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Main Content Area (Cars) */}
        <div className={`flex-1 w-full transition-all duration-500 order-2 lg:order-1 ${isFiltersOpen ? 'lg:w-[75%]' : 'lg:w-full'}`}>
          {filteredCars.length > 0 ? (
            <div className={`grid gap-8 transition-all duration-500 ${isFiltersOpen ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredCars.map((car) => (
                <div key={car.id} className="card overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 animate-fade-in-up">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-info bg-card/90 backdrop-blur-sm text-[var(--color-primary)]">
                        {car.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 animate-fade-in">
                      <span className={`badge bg-card/90 backdrop-blur-sm shadow-sm flex items-center gap-1.5 ${car.status === "Available" ? "text-emerald-600" : car.status === "Booked" ? "text-rose-600" : "text-amber-600"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${car.status === "Available" ? "bg-emerald-600" : car.status === "Booked" ? "bg-rose-600" : "bg-amber-600"
                          }`} />
                        {car.status === "Available" ? t('car.available' as any) || 'Available' : car.status === "Booked" ? t('car.booked') : t('car.maintenance')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{car.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-[var(--muted)] mt-1">
                          <span>{t('car.seats', { count: car.seats })}</span>
                          <span>•</span>
                          <span>{car.fuel}</span>
                          <span>•</span>
                          <span className="font-medium text-[var(--foreground)]">{car.transmission}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-semibold">
                        ⭐ {car.rating}
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="p-3 bg-[var(--surface)] rounded-xl">
                        <p className="text-xs text-[var(--muted-light)] font-medium mb-1 uppercase tracking-wider">8 Hrs / 80 Km</p>
                        <p className="font-semibold text-[var(--foreground)]">₹{(car.pricePerDay * 0.6).toLocaleString()} <span className="text-sm font-normal text-[var(--muted)]">{t('car.per_trip')}</span></p>
                      </div>
                      <div className="p-3 bg-[var(--surface)] rounded-xl">
                        <p className="text-xs text-[var(--muted-light)] font-medium mb-1 uppercase tracking-wider">12 Hrs / 120 Km</p>
                        <p className="font-semibold text-[var(--foreground)]">₹{car.pricePerDay.toLocaleString()} <span className="text-sm font-normal text-[var(--muted)]">{t('car.per_trip')}</span></p>
                      </div>
                    </div>

                    {car.status === "Available" ? (
                      <Link href={`/rentals/${car.id}`} className="premium-button w-full shadow-sm text-center">
                        {t('car.book', { name: car.name })}
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3.5 rounded-xl font-bold bg-surface text-[var(--muted)] cursor-not-allowed border-2 border-dashed border-border transition-all text-sm"
                      >
                        {car.status === "Booked" ? t('car.booked') : t('car.maintenance')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center animate-fade-in-up card border-dashed border-2 bg-surface/50">
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">
                🚗
              </div>
              <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">{t('empty.title')}</h2>
              <p className="text-[var(--muted)] mt-2 mb-8">{t('empty.subtitle')}</p>
              <button onClick={clearFilters} className="premium-button">
                {t('empty.reset')}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Filter Panel */}
        {isFiltersOpen && (
          <div className="w-full lg:w-[25%] lg:sticky lg:top-24 order-1 lg:order-2 z-40 animate-fade-in-up">
            <div className="card border-none ring-1 ring-slate-100 shadow-xl bg-card/95 backdrop-blur-md !overflow-visible">
              <div className="flex justify-between items-center p-6 pb-4 border-b border-border shrink-0">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </h3>
                <button 
                  onClick={clearFilters} 
                  disabled={activeFilterCount === 0} 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${activeFilterCount > 0 ? 'text-rose-500 hover:text-rose-600' : 'text-slate-300 cursor-not-allowed'}`}
                >
                  Clear All
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-bold text-[var(--muted-light)] uppercase tracking-widest mb-3">Car Details</p>
                  <CustomSelect options={carModelOptions} value={selectedModel} onChange={setSelectedModel} placeholder={t('filters.model')} />
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs font-bold text-[var(--muted-light)] uppercase tracking-widest mb-3">Specifications</p>
                  <CustomSelect label={t('filters.seats')} options={seatOptions} value={selectedSeats} onChange={setSelectedSeats} />
                </div>
                <div>
                  <CustomSelect label={t('filters.fuel')} options={fuelOptions} value={selectedFuel} onChange={setSelectedFuel} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-20 border-t border-[var(--card-border)] pt-16">
        <h2 className="text-2xl font-bold text-center mb-10">{t('features.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center text-[var(--muted)]">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🛡️</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">{t('features.safe.title')}</h3>
            <p className="text-sm">{t('features.safe.description')}</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">💸</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">{t('features.price.title')}</h3>
            <p className="text-sm">{t('features.price.description')}</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📍</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">{t('features.support.title')}</h3>
            <p className="text-sm">{t('features.support.description')}</p>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
