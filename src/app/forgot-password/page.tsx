'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck, KeyRound, Sparkles, Building2, Globe } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { t, language, toggleLanguage } = useI18n();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isAr = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#0B1E38] overflow-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1D68E2]/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#008F88]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#0B1E38]/40 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Top Brand Banner with Language Switcher */}
        <div className="mb-6 flex flex-col items-center text-center space-y-3">
          <div className="w-full flex items-center justify-between gap-2 px-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-medium shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B3AA]" />
              <span>{isAr ? 'حكومة دولة الإمارات • استعادة الهوية الرقمية' : 'UAE Federal Government • Identity Recovery'}</span>
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
              title="Switch Language / تبديل اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-[#00B3AA]" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/30 flex items-center justify-center">
            <Image
              src="/ede-official-logo.png"
              alt="Emirates Drug Establishment"
              width={260}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Password Reset Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-white/60 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#008F88] via-[#1D68E2] to-[#2463A6]" />

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#142B52] transition-colors font-medium group"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
            <span>{isAr ? 'العودة إلى تسجيل الدخول' : 'Back to Sign In'}</span>
          </Link>

          <div className="space-y-2 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#142B52] to-[#1D68E2] text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-900/20">
              <KeyRound className="w-7 h-7 text-[#00B3AA]" />
            </div>
            <h2 className="text-xl font-black text-[#0B1E38] tracking-tight">
              {isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              {isAr
                ? 'أدخل بريدك الإلكتروني المسجل أو رقمك الوظيفي لاستلام رابط استعادة مشفر.'
                : 'Enter your registered EDE workforce email or Employee ID to receive a secure recovery link.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs space-y-2 text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-emerald-900">
                {isAr ? 'تم إرسال رابط إعادة التعيين بنجاح' : 'Password Reset Link Dispatched'}
              </p>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                {isAr ? (
                  <>تم إرسال رابط مشفر إلى <strong className="font-semibold">{email}</strong>. يرجى تفقد بريدك الوارد خلال 15 دقيقة.</>
                ) : (
                  <>An encrypted link has been sent to <strong className="font-semibold">{email}</strong>. Please check your inbox within 15 minutes.</>
                )}
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors"
                >
                  {isAr ? 'العودة إلى تسجيل الدخول' : 'Return to Sign In'}
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  {isAr ? 'البريد الإلكتروني للعمل أو الرقم الوظيفي' : 'Work Email or Employee ID'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ahmed.mansoori@ede-gov.ae"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-3 text-slate-900 focus:outline-hidden focus:border-[#1D68E2] focus:ring-3 focus:ring-[#1D68E2]/15 focus:bg-white text-xs font-medium transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#142B52] via-[#0F2342] to-[#1D68E2] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 transition-all text-xs flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
              >
                <span>{isAr ? 'إرسال رابط إعادة التعيين الآمن' : 'Send Security Reset Link'}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00B3AA] group-hover:rotate-12 transition-transform" />
              </button>
            </form>
          )}

          {/* Security badge footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'محمي بنظام IAM المعتمد وبوابة UAE Pass' : 'Secured by EDE IAM & UAE Pass Gateway'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
