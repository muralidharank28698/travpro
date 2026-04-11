"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  FileText,
  User,
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Truck
} from "lucide-react";

export default function OperatorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "Travel & Transportation",
    location: "Puducherry",
    gstNo: "",
    regNo: "",
    contactName: "",
    email: "",
    phone: "",
    fleetSize: "1-5"
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-emerald-500' : 'w-4 bg-slate-200'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="card p-8 md:p-12 shadow-2xl border-border/60 bg-card/60 backdrop-blur-xl relative overflow-hidden transition-all duration-300">

          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                  <Building2 className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
                  Register as an <span className="text-[var(--color-primary)]">Operator</span>
                </h1>
                <p className="text-[var(--muted)] font-medium">Step 1: Tell us about your travel business</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zytravo Trvls"
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all"
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Business Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Puducherry"
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all"
                      defaultValue="Puducherry"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Fleet Size</label>
                  <div className="relative">
                    <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <select
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all appearance-none"
                      onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    >
                      <option value="1-5" className="bg-background">1-5 Vehicles</option>
                      <option value="6-15" className="bg-background">6-15 Vehicles</option>
                      <option value="15+" className="bg-background">15+ Vehicles</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">GST Number (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      placeholder="e.g. 33AAAAA0000A1Z5"
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Registration No.</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      required
                      placeholder="Reg-123456789"
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/20 mt-10">
                <button
                  onClick={handleNext}
                  className="premium-button w-full py-4 text-lg tracking-tight group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Continue to Contact Details
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                  <User className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
                  Contact <span className="text-primary">Person</span>
                </h2>
                <p className="text-[var(--muted)] font-medium">Step 2: Who should we reach out to?</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input 
                      type="text" 
                      required 
                      placeholder="Authorized Contact Person"
                      className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input 
                        type="email" 
                        required 
                        placeholder="business@email.com"
                        className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 90000 00000"
                        className="form-input !pl-12 h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-surface/50 border border-border/60 transition-all hover:bg-surface/80 group/terms flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-xs text-muted font-medium leading-relaxed">
                    By submitting, you agree to our <span className="text-primary font-bold cursor-pointer">Platform Operator Terms</span> and commission structure (10-20% per booking).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="secondary-button py-4 px-8"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="premium-button flex-1 py-4 text-lg tracking-tight"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-8 py-10 animate-scale-in">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] mx-auto flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Application Submitted!</h2>
                <p className="text-[var(--muted)] leading-relaxed font-medium max-w-[400px] mx-auto">
                  Thank you for applying to join Zytravo Trvls. Our team will review your registration and business documents within 24-48 hours.
                </p>
              </div>

              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20 text-sm text-primary font-bold flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Verification email sent to your business address.
              </div>

              <Link
                href="/"
                className="premium-button block py-4 text-lg tracking-tight"
              >
                Return to Website
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="text-[var(--muted)] text-sm font-medium">Already have an operator account? <Link href="/login" className="text-[var(--color-primary)] font-bold">Sign In</Link></p>
          <div className="flex gap-8 opacity-40 grayscale h-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-full" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
