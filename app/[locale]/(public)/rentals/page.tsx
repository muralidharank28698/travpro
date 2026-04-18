"use client";

import { useState, useMemo } from "react";
import { Link } from "@/navigation";
import { Car } from "@/lib/mock-data";
import { useAppSelector } from "@/lib/store";
import CustomSelect from "@/components/common/CustomSelect";
import { useTranslations } from 'next-intl';

export default function RentalsPage() {
  const t = useTranslations('Rentals');
  const MOCK_CARS = useAppSelector((state) => state.cars.items);
  
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Calculate active filters count
  const activeFilterCount = [
    selectedModel !== "All",
    selectedType !== "All",
    selectedSeats !== "All",
    selectedFuel !== "All",
    selectedTransmission !== "All"
  ].filter(Boolean).length;

  const carTypeOptions = [
    { value: "All", label: t('filters.category') },
    ...Array.from(new Set(MOCK_CARS.map(c => c.type))).map(type => ({
      value: type,
      label: type,
      description: t('filters.vehicles_count', { count: MOCK_CARS.filter(c => c.type === type).length })
    }))
  ];

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

  const transmissionOptions = [
    { value: "All", label: t('filters.any_trans') },
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
  ];

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter((car) => {
      const matchesModel = selectedModel === "All" || car.name === selectedModel;
      const matchesType = selectedType === "All" || car.type === selectedType;
      const matchesSeats = selectedSeats === "All" || car.seats.toString() === selectedSeats;
      const matchesFuel = selectedFuel === "All" || car.fuel === selectedFuel;
      const matchesTransmission = selectedTransmission === "All" || car.transmission === selectedTransmission;
      
      return matchesModel && matchesType && matchesSeats && matchesFuel && matchesTransmission && car.type !== 'Tempo Traveller';
    });
  }, [selectedModel, selectedType, selectedSeats, selectedFuel, selectedTransmission, MOCK_CARS]);

  const clearFilters = () => {
    setSelectedModel("All");
    setSelectedType("All");
    setSelectedSeats("All");
    setSelectedFuel("All");
    setSelectedTransmission("All");
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

      {/* Filter Toolbar */}
      <div className="card mb-12 bg-card/80 backdrop-blur-md relative z-40 shadow-xl border-none ring-1 ring-slate-100 transition-all duration-500">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div className="flex-1 w-full lg:w-auto">
              <CustomSelect
                options={carModelOptions}
                value={selectedModel}
                onChange={setSelectedModel}
                placeholder={t('filters.model')}
              />
            </div>
            
            <div className="flex-1 w-full lg:w-64">
              <CustomSelect
                options={carTypeOptions}
                value={selectedType}
                onChange={setSelectedType}
                placeholder={t('filters.category')}
              />
            </div>

            <div className="flex items-center justify-between lg:justify-start gap-4 w-full lg:w-auto shrink-0">
              <button
                onClick={clearFilters}
                disabled={activeFilterCount === 0}
                className={`flex items-center gap-2 px-0 sm:px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-bold transition-all duration-300 justify-center border border-transparent ${
                  activeFilterCount > 0 
                    ? "text-rose-500 hover:bg-rose-50 hover:border-rose-100 cursor-pointer" 
                    : "text-foreground cursor-not-allowed opacity-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t('filters.clear')}
              </button>

              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 w-auto lg:w-auto justify-center whitespace-nowrap shadow-sm ${
                  isFiltersOpen || activeFilterCount > 0
                    ? "bg-surface text-[var(--color-primary)] ring-1 ring-border"
                    : "bg-slate-900 dark:bg-card dark:text-foreground dark:border dark:border-border text-white hover:bg-slate-800"
                }`}
              >
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isFiltersOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isFiltersOpen ? "M5 15l7-7 7 7" : "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"} />
                </svg>
                {isFiltersOpen ? t('filters.hide') : t('filters.more')}
                {activeFilterCount > 0 && !isFiltersOpen && (
                  <span className="ml-1 w-5 h-5 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full text-[9px]">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isFiltersOpen && (
            <div className="mt-6 pt-6 border-t border-border animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <CustomSelect
                  label={t('filters.seats')}
                  options={seatOptions}
                  value={selectedSeats}
                  onChange={setSelectedSeats}
                />
                <CustomSelect
                  label={t('filters.fuel')}
                  options={fuelOptions}
                  value={selectedFuel}
                  onChange={setSelectedFuel}
                />
                <CustomSelect
                  label={t('filters.transmission')}
                  options={transmissionOptions}
                  value={selectedTransmission}
                  onChange={setSelectedTransmission}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
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
                  <span className={`badge bg-card/90 backdrop-blur-sm shadow-sm flex items-center gap-1.5 ${
                    car.status === "Available" ? "text-emerald-600" : car.status === "Booked" ? "text-rose-600" : "text-amber-600"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      car.status === "Available" ? "bg-emerald-600" : car.status === "Booked" ? "bg-rose-600" : "bg-amber-600"
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
    </div>
  );
}
