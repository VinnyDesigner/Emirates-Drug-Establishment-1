'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { Lock, CheckCircle2, ArrowRight, ShieldCheck, KeyRound, Sparkles, Building2, Globe } from 'lucide-react';

export default function ResetPasswordPage() {
  const { t, language, toggleLanguage } = useI18n();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isAr = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError(isAr ? 'يجب ألا تقل كلمة المرور عن 8 أحرف.' : 'Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError(isAr ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }
    setError('');
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#0B1E38] overflow-hidden">
      {/* Ambient background glow */}
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
              <span>{isAr ? 'حكومة دولة الإمارات • تفويض الدخول' : 'UAE Federal Government • Access Authorization'}</span>
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

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-white/60 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Gradient Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#008F88] via-[#1D68E2] to-[#2463A6]" />

          <div className="space-y-2 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#142B52] to-[#1D68E2] text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-900/20">
              <KeyRound className="w-7 h-7 text-[#00B3AA]" />
            </div>
            <h2 className="text-xl font-black text-[#0B1E38] tracking-tight">
              {isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Your Password'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              {isAr
                ? 'أدخل كلمة مرور جديدة وآمنة لحسابك في بوابة مؤسسة الإمارات للدواء.'
                : 'Enter a secure new password for your EDE Portal account.'}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center space-y-4 p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">
                  {isAr ? 'تم تحديث كلمة المرور بنجاح' : 'Password Reset Successful'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'تم تحديث كلمة المرور الخاصة بك بأمان. يمكنك الآن تسجيل الدخول ببياناتك الجديدة.'
                    : 'Your password has been securely updated. You can now log in with your new credentials.'}
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#142B52] via-[#0F2342] to-[#1D68E2] hover:opacity-95 text-white text-xs font-bold transition-all shadow-md gap-2"
              >
                <span>{isAr ? 'الانتقال إلى تسجيل الدخول' : 'Proceed to Sign In'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#1D68E2] focus:ring-3 focus:ring-[#1D68E2]/15 focus:bg-white transition-all font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  {isAr ? 'يجب ألا تقل عن 8 أحرف' : 'Must be at least 8 characters'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#1D68E2] focus:ring-3 focus:ring-[#1D68E2]/15 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#142B52] via-[#0F2342] to-[#1D68E2] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 transition-all text-xs flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
              >
                <span>{isAr ? 'تحديث كلمة المرور' : 'Update Password'}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00B3AA] group-hover:rotate-12 transition-transform" />
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'محمي بنظام IAM المعتمد وبوابة UAE Pass' : 'Secured by EDE IAM & UAE Pass Gateway'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
