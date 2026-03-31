"use client";

import { useState, useRef, useEffect } from "react";

interface DateTimePickerProps {
  label?: string;
  value: string; // YYYY-MM-DDTHH:MM format
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  minDate?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

export default function DateTimePicker({
  label,
  value,
  onChange,
  placeholder = "Select date & time",
  required,
  name,
  minDate,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"date" | "time">("date");
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const valueParts = value ? value.split("T") : ["", ""];
  const dateStr = valueParts[0] || "";
  const timeStr = valueParts[1] || "";
  const selected = dateStr ? new Date(dateStr + "T00:00:00") : null;

  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (selected) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [dateStr]);

  useEffect(() => {
    if (isOpen && tab === "time" && listRef.current && timeStr) {
      const el = listRef.current.querySelector("[data-selected='true']");
      if (el) el.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [isOpen, tab]);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const buildValue = (d: string, t: string) => {
    if (d && t) return `${d}T${t}`;
    if (d) return `${d}T09:00`;
    return "";
  };

  const selectDate = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const newDate = `${viewYear}-${mm}-${dd}`;
    onChange(buildValue(newDate, timeStr || "09:00"));
    setTab("time");
  };

  const selectTime = (h: number, m: number) => {
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    const newTime = `${hh}:${mm}`;
    onChange(buildValue(dateStr, newTime));
    setIsOpen(false);
  };

  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isSelected = (d: number) =>
    selected && d === selected.getDate() && viewMonth === selected.getMonth() && viewYear === selected.getFullYear();
  const isDisabled = (d: number) => {
    if (!minDate) return false;
    return new Date(viewYear, viewMonth, d) < new Date(minDate + "T00:00:00");
  };

  const formatDisplay = () => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    const datePart = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (!timeStr) return datePart;
    const [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${datePart}, ${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const formatSlot = (h: number, m: number) => {
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const getPeriodLabel = (h: number) => {
    if (h < 6) return "Night"; if (h < 12) return "Morning";
    if (h < 17) return "Afternoon"; if (h < 21) return "Evening"; return "Night";
  };
  const getPeriodIcon = (h: number) => {
    if (h < 6 || h >= 21) return "🌙"; if (h < 12) return "☀️";
    if (h < 17) return "🌤️"; return "🌅";
  };

  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  const rem = 7 - (cells.length % 7);
  if (rem < 7) for (let i = 1; i <= rem; i++) cells.push({ day: i, current: false });

  return (
    <div className="relative" ref={ref}>
      {name && <input type="hidden" name={name} value={value} />}
      {label && (
        <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => { setIsOpen(!isOpen); setTab("date"); }}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10 shadow-sm"
            : "border-[var(--card-border)] hover:border-[var(--color-primary)] shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`text-sm font-medium ${value ? "text-[var(--foreground)]" : "text-slate-400"}`}>
            {value ? formatDisplay() : placeholder}
          </span>
        </div>
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 animate-fade-in-up overflow-hidden"
          style={{ minWidth: 300 }}>
          {/* Tabs */}
          <div className="flex bg-slate-50 border-b border-slate-100">
            <button type="button" onClick={() => setTab("date")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                tab === "date"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}>
              📅 Date
            </button>
            <button type="button" onClick={() => setTab("time")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                tab === "time"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}>
              🕐 Time
            </button>
          </div>

          {tab === "date" ? (
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <button type="button" onClick={prevMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-bold text-[var(--foreground)] tracking-tight">
                  {MONTHS[viewMonth]} {viewYear}
                </h3>
                <button type="button" onClick={nextMonth}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((cell, i) => {
                  if (!cell.current) return (
                    <div key={`e-${i}`} className="text-center py-2 text-sm text-slate-200 select-none">{cell.day}</div>
                  );
                  const dis = isDisabled(cell.day), sel = isSelected(cell.day), tod = isToday(cell.day);
                  return (
                    <button type="button" key={`d-${cell.day}`} disabled={dis} onClick={() => selectDate(cell.day)}
                      className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-150 ${
                        dis ? "text-slate-200 cursor-not-allowed"
                          : sel ? "bg-[var(--color-primary)] text-white font-bold shadow-md shadow-emerald-200"
                          : tod ? "text-[var(--color-primary)] font-bold ring-2 ring-[var(--color-primary)]/30"
                          : "text-slate-700 hover:bg-emerald-50 hover:text-[var(--color-primary)] cursor-pointer"
                      }`}>
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div ref={listRef} className="max-h-[280px] overflow-y-auto py-2 px-2">
              {HOURS.map((h) => {
                const isFirst = h === 0 || h === 6 || h === 12 || h === 17 || h === 21;
                return (
                  <div key={h}>
                    {isFirst && (
                      <div className="flex items-center gap-2 px-3 py-2 mt-1">
                        <span className="text-sm">{getPeriodIcon(h)}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{getPeriodLabel(h)}</span>
                      </div>
                    )}
                    {MINUTES.map((m) => {
                      const tv = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                      const active = tv === timeStr;
                      return (
                        <button type="button" key={tv} data-selected={active} onClick={() => selectTime(h, m)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            active
                              ? "bg-[var(--color-primary)] text-white font-bold shadow-sm"
                              : "text-slate-600 hover:bg-emerald-50 hover:text-[var(--color-primary)]"
                          }`}>
                          {formatSlot(h, m)}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
