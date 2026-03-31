"use client";

import { useState, useRef, useEffect } from "react";

interface TimePickerProps {
  label?: string;
  value: string; // HH:MM (24h)
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

export default function TimePicker({
  label,
  value,
  onChange,
  placeholder = "Select time",
  required,
  name,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll to selected time when dropdown opens
  useEffect(() => {
    if (isOpen && listRef.current && value) {
      const selectedEl = listRef.current.querySelector("[data-selected='true']");
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [isOpen]);

  const selectTime = (h: number, m: number) => {
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    onChange(`${hh}:${mm}`);
    setIsOpen(false);
  };

  const formatDisplay = () => {
    if (!value) return "";
    const [h, m] = value.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const formatSlot = (h: number, m: number) => {
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const getPeriodLabel = (h: number) => {
    if (h < 6) return "Night";
    if (h < 12) return "Morning";
    if (h < 17) return "Afternoon";
    if (h < 21) return "Evening";
    return "Night";
  };

  const getPeriodIcon = (h: number) => {
    if (h < 6 || h >= 21) return "🌙";
    if (h < 12) return "☀️";
    if (h < 17) return "🌤️";
    return "🌅";
  };

  return (
    <div className="relative" ref={ref}>
      {name && <input type="hidden" name={name} value={value} />}
      {label && (
        <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10 shadow-sm"
            : "border-[var(--card-border)] hover:border-[var(--color-primary)] shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`text-sm font-medium ${value ? "text-[var(--foreground)]" : "text-slate-400"}`}>
            {value ? formatDisplay() : placeholder}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 animate-fade-in-up overflow-hidden"
          style={{ minWidth: 220 }}
        >
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Time</p>
          </div>
          <div ref={listRef} className="max-h-[280px] overflow-y-auto py-2 px-2 custom-scrollbar">
            {HOURS.map((h) => {
              const isFirstOfPeriod =
                h === 0 || h === 6 || h === 12 || h === 17 || h === 21;
              return (
                <div key={h}>
                  {isFirstOfPeriod && (
                    <div className="flex items-center gap-2 px-3 py-2 mt-1">
                      <span className="text-sm">{getPeriodIcon(h)}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {getPeriodLabel(h)}
                      </span>
                    </div>
                  )}
                  {MINUTES.map((m) => {
                    const thisVal = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                    const isActive = thisVal === value;
                    return (
                      <button
                        type="button"
                        key={thisVal}
                        data-selected={isActive}
                        onClick={() => selectTime(h, m)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-[var(--color-primary)] text-white font-bold shadow-sm"
                            : "text-slate-600 hover:bg-emerald-50 hover:text-[var(--color-primary)]"
                        }`}
                      >
                        {formatSlot(h, m)}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
