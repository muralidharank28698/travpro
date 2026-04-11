"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Smartphone,
  KeyRound,
  BellRing,
  BellOff,
  MessageSquare,
  Tag,
  Plane,
  Wallet,
  Plus,
  Trash2,
  MapPin,
  Globe,
  Fingerprint,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

type SettingsTab = "personal" | "security" | "notifications" | "payments";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("personal");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Security state
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Notifications state
  const [notifBookingUpdates, setNotifBookingUpdates] = useState(true);
  const [notifPromotions, setNotifPromotions] = useState(false);
  const [notifTripReminders, setNotifTripReminders] = useState(true);
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);

  // Billing state
  const [billingPage, setBillingPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const allInvoices = [
    { id: "INV-2026-041", desc: "Toyota Fortuner · Round Trip", date: "Apr 01, 2026", amount: "₹11,000", status: "Paid" },
    { id: "INV-2026-038", desc: "Airport Transfer · One Way", date: "Mar 28, 2026", amount: "₹2,500", status: "Paid" },
    { id: "INV-2026-035", desc: "Audi A6 · Bangalore Trip", date: "Mar 26, 2026", amount: "₹25,500", status: "Paid" },
    { id: "INV-2026-029", desc: "Driver Hire · Pondicherry", date: "Mar 20, 2026", amount: "₹4,000", status: "Refunded" },
    { id: "INV-2026-021", desc: "Maruti Swift · Local Rental", date: "Feb 14, 2026", amount: "₹1,800", status: "Paid" },
    { id: "INV-2026-015", desc: "Innova Crysta · Airport", date: "Jan 10, 2026", amount: "₹3,200", status: "Refunded" },
    { id: "INV-2025-112", desc: "BMW 5 Series · Wedding", date: "Dec 15, 2025", amount: "₹45,000", status: "Paid" },
    { id: "INV-2025-084", desc: "Tempo Traveller · Group", date: "Nov 02, 2025", amount: "₹18,500", status: "Paid" },
  ];
  const totalBillingPages = Math.ceil(allInvoices.length / ITEMS_PER_PAGE);
  const currentInvoices = allInvoices.slice((billingPage - 1) * ITEMS_PER_PAGE, billingPage * ITEMS_PER_PAGE);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "personal" as SettingsTab, label: "Personal Info", icon: User },
    { id: "security" as SettingsTab, label: "Security", icon: Lock },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
    { id: "payments" as SettingsTab, label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="w-full animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Account <span className="text-[var(--color-primary)]">Settings</span>
          </h1>
          <p className="text-[var(--muted)] font-medium text-sm">Manage your personal information and security</p>
        </div>
        <Link href="/dashboard" className="secondary-button py-2.5 px-6 flex items-center gap-2 text-sm shrink-0">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Settings Navigation */}
        <div className="lg:border-r lg:border-border/40 lg:pr-6">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted-light)] mb-4 px-3">General</p>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3 rounded-xl font-semibold flex items-center gap-3 relative transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-sm"
                    : "text-[var(--muted)] hover:text-primary transition-colors"
                }`}
              >
                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
                <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? "text-primary" : "opacity-50"}`} />
                <span className="text-sm tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">

          {/* ========== PERSONAL INFO TAB ========== */}
          {activeTab === "personal" && (
            <div className="animate-fade-in-up">
              <div className="card p-6 md:p-8 space-y-8 shadow-xl border border-border/60 bg-card/50 backdrop-blur-md relative overflow-hidden transition-all duration-300">

                {success && (
                  <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white py-3.5 px-6 text-center text-sm font-bold flex items-center justify-center gap-2 z-20" style={{ animation: "fadeInUp 0.3s ease-out" }}>
                    <CheckCircle2 className="w-4 h-4" />
                    Profile updated successfully!
                  </div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                  {/* Avatar & Name */}
                  <div className="border-b border-border/50 pb-6 flex items-center gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] bg-surface flex items-center justify-center relative group cursor-pointer border border-border shadow-xl overflow-hidden shrink-0 shadow-primary/5 group-hover:border-primary transition-all duration-300">
                      <User className="w-10 h-10 text-emerald-200" />
                      <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Update</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <h2 className="text-2xl font-black tracking-tight text-[var(--foreground)]">Murali Dharan</h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 leading-none py-1.5 px-3 rounded-full border border-primary/20 uppercase tracking-[0.1em]">Premium Member</span>
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 leading-none py-1.5 px-3 rounded-full border border-amber-500/20 uppercase tracking-[0.1em] flex items-center gap-1">
                          <Shield className="w-3 h-3 fill-amber-500" /> PRO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--muted-light)] group-hover:text-emerald-500 transition-colors" />
                        <input
                          type="text"
                          defaultValue="Murali Dharan"
                          className="form-input !pl-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-400 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                        <input
                          type="email"
                          defaultValue="murali@example.com"
                          className="form-input !pl-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-400 ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                        <input
                          type="tel"
                          defaultValue="+91 94432 02669"
                          className="form-input !pl-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-400 ml-1">Current Location</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                        <select className="form-input !pl-12 h-12 bg-card border-slate-100 focus:bg-card text-[15px] font-semibold appearance-none transition-all">
                          <option value="pondy">Puducherry, India</option>
                          <option value="tn">Tamil Nadu, India</option>
                          <option value="kar">Karnataka, India</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ArrowLeft className="w-4 h-4 -rotate-90 opacity-40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-8 flex justify-end border-t border-border/40">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-10 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                      Apply Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="mt-6 card p-6 md:p-8 bg-card border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ring-1 ring-red-500/10 shadow-sm transition-all hover:bg-red-500/5 group/danger">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-red-100 rounded-full blur-[80px] opacity-20" />
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-3 text-red-600">
                    <Shield className="w-5 h-5 opacity-70" />
                    <h3 className="text-sm font-black tracking-[0.2em] uppercase">Permanent Delete</h3>
                  </div>
                  <p className="text-xs text-[var(--muted)] max-w-sm font-semibold opacity-70">
                    Once confirmed, all your active bookings and data legacy will be wiped. Proceed with extreme caution.
                  </p>
                </div>
                <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-sm whitespace-nowrap relative z-10 shrink-0 border border-red-500/20">
                  Delete Forever
                </button>
              </div>
            </div>
          )}

          {/* ========== SECURITY TAB ========== */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Change Password */}
              <div className="card-elevated p-6 md:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-emerald-50 bg-card/70 backdrop-blur-md relative overflow-hidden ring-1 ring-emerald-50/50">

                {success && (
                  <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white py-3.5 px-6 text-center text-sm font-bold flex items-center justify-center gap-2 z-20" style={{ animation: "fadeInUp 0.3s ease-out" }}>
                    <CheckCircle2 className="w-4 h-4" />
                    Security settings updated!
                  </div>
                )}

                <div className="border-b border-border/50 pb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <KeyRound className="w-6 h-6 text-primary transition-colors" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-[var(--foreground)]">Change Password</h2>
                    <p className="text-xs text-[var(--muted)] font-medium">Update your password to keep your account secure</p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Current Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                      <input
                        type={showCurrentPw ? "text" : "password"}
                        placeholder="Enter current password"
                        className="form-input !pl-12 !pr-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-muted transition-colors"
                      >
                        {showCurrentPw ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                        <input
                          type={showNewPw ? "text" : "password"}
                          placeholder="Enter new password"
                          className="form-input !pl-12 !pr-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-muted transition-colors"
                        >
                          {showNewPw ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Confirm Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                        <input
                          type="password"
                          placeholder="Re-enter new password"
                          className="form-input !pl-12 h-12 bg-surface/30 border-border/50 focus:bg-card focus:border-primary text-[15px] font-medium transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Password Strength</p>
                    <div className="flex gap-1.5">
                      <div className="h-1.5 flex-1 rounded-full bg-emerald-500"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-emerald-500"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-emerald-500"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-primary/20"></div>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold">Good — Add special characters for stronger security</p>
                  </div>

                  <div className="pt-4 flex justify-end border-t border-border/20">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-slate-900 dark:bg-primary/90 hover:bg-black dark:hover:bg-primary text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <KeyRound className="w-5 h-5" />
                      )}
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="card p-6 md:p-8 space-y-6 shadow-xl border border-border/60 bg-card/50 backdrop-blur-md relative overflow-hidden transition-all duration-300">
                <div className="flex items-center gap-4 pb-6 border-b border-border/20">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Fingerprint className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-black tracking-tight text-[var(--foreground)]">Two-Factor Authentication</h2>
                    <p className="text-xs text-[var(--muted)] font-medium">Add an extra layer of security to your account</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface/50 border border-border/60 transition-all hover:border-border/80">
                    <div className="flex items-center gap-4">
                      <Smartphone className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Authenticator App</p>
                        <p className="text-xs text-[var(--muted)]">Use Google Authenticator or Authy</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                        twoFactorEnabled ? "bg-primary shadow-sm" : "bg-border/60"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        twoFactorEnabled ? "left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>

                  {/* Login Alerts Toggle */}
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface/50 border border-border/60 transition-all hover:border-border/80">
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Login Alerts</p>
                        <p className="text-xs text-[var(--muted)]">Get notified of unrecognized sign-ins</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setLoginAlerts(!loginAlerts)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                        loginAlerts ? "bg-primary shadow-sm" : "bg-border/60"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        loginAlerts ? "left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="pt-6 border-t border-border/20 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--muted-light)]">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: "Windows PC · Chrome", location: "Puducherry, India", time: "Active now", current: true },
                      { device: "iPhone 15 · Safari", location: "Chennai, India", time: "2 hours ago", current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface/30 border border-border/40 hover:border-border/60 transition-all">
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-semibold text-[var(--foreground)]">
                              {session.device}
                              {session.current && (
                                <span className="ml-2 text-[10px] font-bold text-primary bg-primary/10 py-0.5 px-2 rounded-full uppercase">This device</span>
                              )}
                            </p>
                            <p className="text-xs text-[var(--muted)]">{session.location} · {session.time}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== NOTIFICATIONS TAB ========== */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="card-elevated p-6 md:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-card/70 backdrop-blur-md ring-1 ring-emerald-50/50">
                <div className="border-b border-border/50 pb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center ring-1 ring-blue-100/50">
                    <BellRing className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-[var(--foreground)]">Notification Preferences</h2>
                    <p className="text-xs text-[var(--muted)] font-medium">Choose what updates you want to receive</p>
                  </div>
                </div>

                {/* Notification Categories */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted-light)] ml-1">Categories</h3>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface/30 border border-border/40 transition-all hover:border-border/60 group/row">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Plane className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Booking Updates</p>
                        <p className="text-xs text-[var(--muted)]">Confirmations, cancellations, and status changes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifBookingUpdates(!notifBookingUpdates)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                        notifBookingUpdates ? "bg-primary shadow-sm" : "bg-border/60"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        notifBookingUpdates ? "left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface/30 border border-border/40 transition-all hover:border-border/60 group/row">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <Tag className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Promotions & Offers</p>
                        <p className="text-xs text-[var(--muted)]">Seasonal discounts and exclusive deals</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifPromotions(!notifPromotions)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                        notifPromotions ? "bg-primary shadow-sm" : "bg-border/60"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        notifPromotions ? "left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface/30 border border-border/40 transition-all hover:border-border/60 group/row">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <BellRing className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Trip Reminders</p>
                        <p className="text-xs text-[var(--muted)]">Pickup time alerts and pre-trip notifications</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifTripReminders(!notifTripReminders)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                        notifTripReminders ? "bg-primary shadow-sm" : "bg-border/60"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
                        notifTripReminders ? "left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Delivery Channels */}
                <div className="space-y-3 pt-6 border-t border-border/40">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted-light)] ml-1">Delivery Channels</h3>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setNotifEmail(!notifEmail)}
                      className={`p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                        notifEmail
                          ? "bg-primary/5 border-primary shadow-inner"
                          : "bg-surface/30 border-border/40 hover:border-border/60"
                      }`}
                    >
                      <Mail className={`w-5 h-5 mb-3 ${notifEmail ? "text-primary" : "text-muted"}`} />
                      <p className={`text-sm font-bold transition-colors ${notifEmail ? "text-primary" : "text-foreground"}`}>Email</p>
                      <p className="text-[11px] text-muted-light mt-0.5 font-medium">murali@example.com</p>
                    </button>

                    <button
                      onClick={() => setNotifSMS(!notifSMS)}
                      className={`p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                        notifSMS
                          ? "bg-primary/5 border-primary shadow-inner"
                          : "bg-surface/30 border-border/40 hover:border-border/60"
                      }`}
                    >
                      <MessageSquare className={`w-5 h-5 mb-3 ${notifSMS ? "text-primary" : "text-muted"}`} />
                      <p className={`text-sm font-bold transition-colors ${notifSMS ? "text-primary" : "text-foreground"}`}>SMS</p>
                      <p className="text-[11px] text-muted-light mt-0.5 font-medium">+91 94432 02669</p>
                    </button>

                    <button
                      onClick={() => setNotifPush(!notifPush)}
                      className={`p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                        notifPush
                          ? "bg-primary/5 border-primary shadow-inner"
                          : "bg-surface/30 border-border/40 hover:border-border/60"
                      }`}
                    >
                      <Bell className={`w-5 h-5 mb-3 ${notifPush ? "text-primary" : "text-muted"}`} />
                      <p className={`text-sm font-bold transition-colors ${notifPush ? "text-primary" : "text-foreground"}`}>Push</p>
                      <p className="text-[11px] text-muted-light mt-0.5 font-medium">Browser notifications</p>
                    </button>
                  </div>
                </div>

                {/* Quiet Hours */}
                <div className="p-5 rounded-2xl bg-surface/40 border border-border/50 transition-all hover:bg-surface/60 group/quiet">
                  <div className="flex items-center gap-3 mb-3">
                    <BellOff className="w-5 h-5 text-slate-400" />
                    <p className="text-sm font-bold text-[var(--foreground)]">Quiet Hours</p>
                  </div>
                  <p className="text-xs text-[var(--muted)] mb-4">Mute all non-critical notifications during specific hours</p>
                  <div className="flex items-center gap-3">
                    <input type="time" defaultValue="22:00" className="form-input h-10 text-sm font-medium w-32 text-center" />
                    <span className="text-xs font-bold text-[var(--muted-light)]">to</span>
                    <input type="time" defaultValue="07:00" className="form-input h-10 text-sm font-medium w-32 text-center" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== PAYMENTS TAB ========== */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Billing History */}
              <div className="card p-6 md:p-8 space-y-6 shadow-xl border border-border/60 bg-card/50 backdrop-blur-md relative overflow-hidden transition-all duration-300">
                <div className="flex items-center gap-4 pb-6 border-b border-border/20">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-[var(--foreground)]">Billing History</h2>
                    <p className="text-xs text-[var(--muted)] font-medium">Your recent transactions and invoices</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-border/50 hover:border-border transition-all group">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border/40 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-muted" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[var(--foreground)] truncate">{invoice.desc}</p>
                          <p className="text-xs text-[var(--muted)]">{invoice.id} · {invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full ${
                          invoice.status === "Paid"
                            ? "text-primary bg-primary/10"
                            : "text-amber-500 bg-amber-500/10"
                        }`}>
                          {invoice.status}
                        </span>
                        <span className="text-sm font-black text-[var(--foreground)]">{invoice.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/20">
                  <p className="text-xs text-[var(--muted)] font-medium">
                    Showing <span className="font-bold text-[var(--foreground)]">{((billingPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="font-bold text-[var(--foreground)]">{Math.min(billingPage * ITEMS_PER_PAGE, allInvoices.length)}</span> of <span className="font-bold text-[var(--foreground)]">{allInvoices.length}</span> entries
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setBillingPage(prev => Math.max(prev - 1, 1))}
                      disabled={billingPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-[var(--muted)] hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalBillingPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setBillingPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          billingPage === i + 1 
                            ? "bg-primary text-white border-transparent" 
                            : "border border-border/60 text-[var(--muted)] hover:text-primary transition-all duration-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setBillingPage(prev => Math.min(prev + 1, totalBillingPages))}
                      disabled={billingPage === totalBillingPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-[var(--muted)] hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
