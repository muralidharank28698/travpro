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
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= s ? 'w-8 bg-emerald-500' : 'w-4 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="card p-10 shadow-2xl border-emerald-50 overflow-hidden relative">
          
          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-3">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <Building2 className="w-7 h-7" />
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
                      className="form-input pl-12 h-14" 
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
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
                      className="form-input pl-12 h-14" 
                      defaultValue="Puducherry"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Fleet Size</label>
                  <div className="relative">
                    <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <select className="form-input pl-12 h-14" onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}>
                      <option value="1-5">1-5 Vehicles</option>
                      <option value="6-15">6-15 Vehicles</option>
                      <option value="15+">15+ Vehicles</option>
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
                      className="form-input pl-12 h-14" 
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
                      className="form-input pl-12 h-14" 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="premium-button w-full py-4 text-lg tracking-tight group"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue to Contact Details
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
              <div className="space-y-3">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <User className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
                  Contact <span className="text-blue-600">Person</span>
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
                      className="form-input pl-12 h-14" 
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
                        className="form-input pl-12 h-14" 
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
                        className="form-input pl-12 h-14" 
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-[var(--muted)] leading-relaxed border border-slate-100 flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  By submitting, you agree to our Platform Operator Terms and commission structure (10-20% per booking).
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
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Application Submitted!</h2>
                <p className="text-[var(--muted)] leading-relaxed font-medium max-w-[400px] mx-auto">
                  Thank you for applying to join Zytravo Trvls. Our team will review your registration and business documents within 24-48 hours.
                </p>
              </div>

              <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 text-sm text-emerald-800 font-medium">
                We've sent a confirmation email to your business address with the next steps.
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
