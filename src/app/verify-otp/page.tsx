'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { ShieldCheck, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VerifyOtpPage() {
  const router = useRouter();
  const { currentUser, verifyOtp } = useAppStore();
  const { t, language, toggleLanguage } = useI18n();
  const isAr = language === 'ar';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']); // pre-filled for immediate testing convenience
  const [cooldown, setCooldown] = useState(45);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please input all 6 digits of your verification code.');
      return;
    }

    setIsVerifying(true);
    const success = await verifyOtp(fullOtp);
    setIsVerifying(false);

    if (success) {
      // Role-based redirection
      if (currentUser.role === 'line_manager') {
        router.push('/manager/dashboard');
      } else if (currentUser.role === 'supplier_esm' || currentUser.role === 'supplier_am') {
        router.push('/supplier/dashboard');
      } else if (currentUser.role === 'establishment_admin') {
        router.push('/establishment/dashboard');
      } else {
        router.push('/employee/dashboard');
      }
    } else {
      setError(t('auth.invalidOtp'));
    }
  };

  const handleResend = () => {
    if (cooldown === 0) {
      setCooldown(60);
      setOtp(['', '', '', '', '', '']);
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00B3AA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1D68E2]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-2xl space-y-6 relative overflow-hidden z-10">
        {/* Top card accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00B3AA] via-[#1D68E2] to-[#0F2342]" />

        {/* Back Link and Language Toggle */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1D68E2] transition-colors font-bold group"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
            <span>{isAr ? 'العودة إلى تسجيل الدخول' : 'Return to Sign In'}</span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#00B3AA]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center mx-auto shadow-xs">
            <Image
              src="/uae-emblem.png"
              alt="UAE National Emblem"
              width={48}
              height={62}
              className="h-12 w-auto object-contain drop-shadow-xs"
              priority
            />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {t('auth.otpTitle')}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {t('auth.otpSubtitle')}
          </p>
          <div className="pt-1">
            <span className="inline-block px-3.5 py-1 rounded-full bg-slate-100/90 text-slate-700 text-xs font-semibold border border-slate-200/60 font-mono">
              {isAr ? 'المستلم:' : 'Target:'} {currentUser.mobile} / {currentUser.email}
            </span>
          </div>
        </div>

        {/* 6-Digit OTP Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-between gap-2 sm:gap-3" dir="ltr">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono bg-slate-50/80 border-2 border-slate-200 rounded-2xl focus:border-[#1D68E2] focus:bg-white focus:ring-4 focus:ring-[#1D68E2]/15 focus:outline-hidden transition-all text-[#0F2342] shadow-2xs"
              />
            ))}
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] hover:from-[#09172B] hover:to-[#1555BF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {isVerifying ? (
              <span>{isAr ? 'جارٍ التحقق من الرمز...' : 'Verifying Token...'}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#00B3AA]" />
                <span>{t('auth.verifyOtp')}</span>
              </>
            )}
          </button>
        </form>

        {/* Resend Cooldown */}
        <div className="text-center pt-2 border-t border-slate-100 space-y-2 text-xs">
          {cooldown > 0 ? (
            <p className="text-slate-400 font-medium">
              {isAr ? 'إعادة إرسال الرمز خلال ' : 'Resend code in '}
              <strong className="text-slate-700 font-mono font-bold">{cooldown}{isAr ? ' ثانية' : 's'}</strong>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#1D68E2] hover:underline font-bold flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('auth.resendOtp')}</span>
            </button>
          )}

          <p className="text-[11px] text-slate-400">
            {isAr ? 'للتقييم السريع، رمز التحقق الافتراضي هو ' : 'For rapid evaluation, default OTP is '}
            <strong className="text-slate-700 font-mono font-bold">123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
