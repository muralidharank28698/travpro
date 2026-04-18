"use client";

import GlassCard from "@/components/common/GlassCard";
import { useAppSelector } from "@/lib/store";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

const statusConfig: Record<string, { badgeBg: string; badgeColor: string; dotColor: string; label: string }> = {
  Available: { badgeBg: "#ECFDF5", badgeColor: "#059669", dotColor: "#10B981", label: "available" },
  Booked: { badgeBg: "#FFFBEB", badgeColor: "#D97706", dotColor: "#F59E0B", label: "booked" },
  Maintenance: { badgeBg: "#F1F5F9", badgeColor: "#64748B", dotColor: "#94A3B8", label: "maintenance" },
};

export default function CarsPage() {
  const t = useTranslations('FleetManagement');
  const MOCK_CARS = useAppSelector((state) => state.cars.items);
  const available = MOCK_CARS.filter((c) => c.status === "Available").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", margin: 0 }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "4px" }}>
            {t('available_of', { available, total: MOCK_CARS.length })}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button 
            onClick={() => alert("Registration of new vehicles - Coming Soon")}
            className="premium-button shadow-md" 
            style={{ fontSize: "14px", padding: "10px 20px" }}
          >
            {t('add_vehicle')}
          </button>
          <div style={{ display: "flex", gap: "12px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "12px",
            backgroundColor: "#ECFDF5",
            border: "1px solid #A7F3D0",
            fontSize: "14px",
            fontWeight: 500,
            color: "#059669",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
            {available} {t('active')}
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "12px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--card-border)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--muted)",
          }}>
            {MOCK_CARS.length} {t('total')}
          </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {MOCK_CARS.map((car, index) => {
          const config = statusConfig[car.status] || statusConfig["Maintenance"];
          return (
            <div
              key={car.id}
              className="card animate-fade-in-up"
              style={{
                padding: 0,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                animationDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 40px -12px rgb(0 0 0 / 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={car.image}
                  alt={car.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)" }} />

                {/* Status Badge */}
                <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: config.badgeBg,
                    color: config.badgeColor,
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: config.dotColor }} />
                    {t(`status.${config.label}`)}
                  </span>
                </div>

                {/* Rating Badge */}
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "var(--foreground)",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                  }}>
                    ⭐ {car.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                    {car.type}
                  </p>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                    {car.name}
                  </h2>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {car.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                  {[
                    { label: t('seats'), value: `${car.seats}` },
                    { label: t('fuel'), value: car.fuel },
                    { label: t('trips'), value: `${car.trips}` },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        borderRadius: "8px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <p style={{ fontSize: "11px", color: "var(--muted-light)", marginBottom: "2px" }}>{spec.label}</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--card-border)",
                }}>
                  <div>
                    <p style={{ fontSize: "22px", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                      ₹{car.pricePerDay.toLocaleString()}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--muted-light)", margin: 0 }}>{t('per_day')}</p>
                  </div>
                  <Link
                    href={car.status === "Available" ? `/bookings/new?carId=${car.id}` : "#"}
                    className={car.status === "Available" ? "premium-button" : ""}
                    style={car.status === "Available"
                      ? { padding: "10px 20px", fontSize: "14px" }
                      : {
                          padding: "10px 20px",
                          fontSize: "14px",
                          backgroundColor: "var(--surface)",
                          color: "var(--muted-light)",
                          borderRadius: "12px",
                          border: "1px solid var(--card-border)",
                          cursor: "not-allowed",
                          textDecoration: "none",
                          fontWeight: 600,
                        }
                    }
                  >
                    {car.status === "Available" ? t('book_now') : t('unavailable')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
