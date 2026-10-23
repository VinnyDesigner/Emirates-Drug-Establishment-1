'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, LogIn, ShieldAlert, Building2, Lock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function SessionExpiredPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#0B1E38] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#1D68E2]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#0B1E38]/40 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Top Brand Banner */}
        <div className="mb-6 flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-medium shadow-inner">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'حكومة دولة الإمارات • انتهاء مهلة الجلسة' : 'UAE Federal Government • Inactivity Timeout'}</span>
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
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-white/60 shadow-2xl text-center space-y-5 relative overflow-hidden">
          {/* Top Amber Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-[#142B52]" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-600/30">
            <Clock className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-[#0B1E38] tracking-tight">
              {isAr ? 'انتهت صلاحية الجلسة' : 'Session Expired'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              {isAr
                ? 'لحمايتك وفق معايير أمن المعلومات بمؤسسة الإمارات للدواء، تم إنهاء الجلسة تلقائياً بسبب عدم النشاط.'
                : 'For your security under EDE Information Security guidelines, your portal session has timed out due to inactivity.'}
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl text-xs text-slate-700 text-left rtl:text-right space-y-1">
            <span className="font-bold text-amber-900 block">{isAr ? 'تنبيه أمني:' : 'Security Notice:'}</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isAr
                ? 'يرجى إعادة تسجيل الدخول برقمك الوظيفي أو بريدك مع رمز التحقق (OTP) لمتابعة العمل بأمان.'
                : 'Please re-authenticate with your employee ID and one-time password (OTP) to resume your work securely.'}
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#142B52] via-[#0F2342] to-[#1D68E2] hover:opacity-95 text-white text-xs font-bold transition-all shadow-md gap-2"
          >
            <LogIn className="w-4 h-4 text-[#00B3AA]" />
            <span>{isAr ? 'تسجيل الدخول مجدداً' : 'Sign In Again'}</span>
          </Link>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'محمي بواسطة نظام الهوية الرقمية EDE IAM وبوابة UAE Pass' : 'Secured by EDE IAM & UAE Pass Gateway'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
