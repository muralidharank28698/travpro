"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  error,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-card border rounded-xl transition-all duration-300 text-sm ${
          isOpen 
            ? "border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10" 
            : "border-[var(--card-border)] hover:border-[var(--color-primary)]"
        } ${error ? "border-red-500" : ""}`}
      >
        <span className={selectedOption ? "text-[var(--foreground)] font-medium" : "text-[var(--muted-light)]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 text-[var(--muted-light)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--card-border)] overflow-hidden animate-fade-in-up origin-top">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.length === 0 ? (
              <div className="px-4 py-6 text-center text-[var(--muted-light)] text-xs uppercase tracking-widest font-bold">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-surface group ${
                    option.value === value 
                      ? "bg-surface text-[var(--color-primary)] font-bold" 
                      : "text-[var(--foreground)] font-medium"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`group-hover:text-[var(--color-primary)] ${option.value === value ? "text-[var(--color-primary)]" : ""}`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-[10px] text-[var(--muted-light)] uppercase tracking-wider mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs font-bold text-red-500 animate-shake">
          {error}
        </p>
      )}
    </div>
  );
}
