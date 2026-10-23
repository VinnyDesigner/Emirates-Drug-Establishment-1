'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Eye, EyeOff, Lock, User, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const { t, language, toggleLanguage } = useI18n();

  const [identifier, setIdentifier] = useState('ahmed.mansoori@ede-gov.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(identifier);
    setIsLoading(false);
    router.push('/verify-otp');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Left / Top Hero Branding Column */}
      <div className="md:w-5/12 bg-gradient-to-br from-[#0B1E38] via-[#0E2447] to-[#1D68E2] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#00B3AA]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-[#1D68E2]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-block group" title="Emirates Drug Establishment">
              <Image
                src="/ede-official-logo.png"
                alt="Emirates Drug Establishment"
                width={280}
                height={56}
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20 backdrop-blur-xs transition-colors shrink-0 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#00B3AA]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          <div className="pt-6 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B3AA]/20 text-[#00B3AA] text-[11px] font-bold border border-[#00B3AA]/40 backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'معيار الأمان الحكومي الاتحادي' : 'Federal Government Security Standard'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              {language === 'ar' ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
            </h1>
            <p className="text-lg text-[#00B3AA] font-arabic font-bold">
              {language === 'ar' ? 'بوابة الخدمات الإلكترونية الموحدة' : 'مؤسسة الإمارات للدواء'}
            </p>
            <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed pt-2">
              {language === 'ar'
                ? 'البوابة الرسمية المصرح بها للكوادر المؤجرة، المدراء المباشرين، وعمليات الشركات المزودة للقوى العاملة. خاضعة لأحكام المرسوم بقانون اتحادي لتنظيم المنتجات الطبية.'
                : 'Authorized portal for outsourced personnel, line managers, and manpower contractor operations. Governed under Federal Decree-Law on Medical Products Regulation.'}
            </p>
          </div>
        </div>

        {/* Official Federal Footer */}
        <div className="pt-8 border-t border-white/15 text-xs text-slate-300/80 space-y-1 relative z-10">
          <p className="font-semibold">
            {language === 'ar' ? '© 2026 مؤسسة الإمارات للدواء' : '© 2026 Emirates Drug Establishment'}
          </p>
          <p className="text-[11px] text-slate-400">
            {language === 'ar' ? 'قانون اتحادي بشأن تنظيم المنتجات الطبية • دولة الإمارات العربية المتحدة' : 'Federal Law on Medical Products Regulation • United Arab Emirates'}
          </p>
        </div>
      </div>

      {/* Right Login Form Column */}
      <div className="md:w-7/12 p-8 md:p-16 flex items-center justify-center relative">
        <div className="max-w-md w-full space-y-7 bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xl relative overflow-hidden">
          {/* Top card accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00B3AA] via-[#1D68E2] to-[#0B1E38]" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center shadow-xs">
                <Image
                  src="/uae-emblem.png"
                  alt="UAE National Emblem"
                  width={36}
                  height={46}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-[#008F88] bg-[#008F88]/10 px-3 py-1 rounded-full border border-[#008F88]/20">
                {language === 'ar' ? 'البوابة الاتحادية لدولة الإمارات' : 'UAE Federal Gateway'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {t('auth.login')}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'تسجيل الدخول إلى جلستك المصرح بها في بوابة الخدمة الذاتية' : 'Sign in to your authorized EDE Employee Self Service session'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Identifier Input */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                {t('auth.emailOrId')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: ahmed.mansoori@ede-gov.ae أو EDE-EMP-1042' : 'e.g. ahmed.mansoori@ede-gov.ae or EDE-EMP-1042'}
                  className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-3 text-slate-900 focus:outline-hidden focus:border-[#1D68E2] focus:ring-4 focus:ring-[#1D68E2]/10 transition-all text-xs font-semibold"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 block">
                  {t('auth.password')}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#1D68E2] hover:underline font-bold"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور الخاصة بك' : 'Enter your security credential'}
                  className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-3 text-slate-900 focus:outline-hidden focus:border-[#1D68E2] focus:ring-4 focus:ring-[#1D68E2]/10 transition-all text-xs font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer rtl:right-auto rtl:left-3.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0F2342] focus:ring-[#0F2342] cursor-pointer"
              />
              <label htmlFor="remember" className="text-slate-600 text-xs font-semibold cursor-pointer">
                {t('auth.rememberMe')}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] hover:from-[#09172B] hover:to-[#1555BF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              {isLoading ? (
                <span>{language === 'ar' ? 'جارٍ التحقق من بيانات الدخول...' : 'Authenticating Credentials...'}</span>
              ) : (
                <>
                  <span>{language === 'ar' ? 'المتابعة إلى التحقق الثنائي' : 'Proceed to Two-Factor Verification'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 space-y-1">
            <p className="font-medium">
              {language === 'ar' ? 'محمي بتشفير 256-bit ومعايير التحقق الثنائي الحكومية الاتحادية' : 'Protected by 256-bit AES encryption & UAE Gov 2FA Standards'}
            </p>
            <p>
              {language === 'ar' ? 'رمز التحقق الافتراضي للعرض التجريبي:' : 'Default OTP for prototype demonstration:'}{' '}
              <strong className="text-slate-700 font-mono font-bold">123456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
