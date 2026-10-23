'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, ArrowLeft, Home, Building2, LockKeyhole } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';

export default function UnauthorizedPage() {
  const { currentUser } = useAppStore();
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#0B1E38] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#1D68E2]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#0B1E38]/40 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Top Brand Banner */}
        <div className="mb-6 flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-medium shadow-inner">
            <LockKeyhole className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAr ? 'حكومة دولة الإمارات • بوابة حوكمة الصلاحيات' : 'UAE Federal Government • Access Control Gate'}</span>
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
          {/* Top Rose Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-[#142B52]" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-600/30">
            <ShieldAlert className="w-9 h-9 text-white" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-[#0B1E38] tracking-tight">
              {isAr ? 'الصلاحية غير مصرح بها' : 'Access Restricted'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAr ? (
                <>
                  دورك الحالي (<strong className="text-[#0B1E38] font-bold">{currentUser.role}</strong>) لا يملك الصلاحية المعتمدة لعرض هذا المورد الحكومي.
                </>
              ) : (
                <>
                  Your current role (<strong className="text-[#0B1E38] font-bold">{currentUser.role}</strong>) does not have authorized permission to view this government resource.
                </>
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-slate-700 text-left rtl:text-right space-y-1.5">
            <p className="font-bold text-rose-900 flex items-center gap-1.5">
              <span>{isAr ? 'متطلب أمان كراسة الشروط:' : 'RFP Security Enforcement Notice:'}</span>
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isAr
                ? 'لا يحق للكوادر الخارجية الاطلاع على سجلات موظفين آخرين. ولا ترث أدوار المورد صلاحيات إدارة المؤسسة بصورة تلقائية.'
                : 'Outsourced personnel cannot inspect records belonging to other employees. Supplier functions cannot automatically inherit Establishment-wide administrative authority.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/employee/dashboard"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#142B52] via-[#0F2342] to-[#1D68E2] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4 text-[#00B3AA]" />
              <span>{isAr ? 'العودة إلى لوحة التحكم المعتمدة' : 'Return to Authorized Dashboard'}</span>
            </Link>
            <Link
              href="/login"
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isAr ? 'تبديل الدور / الحساب' : 'Switch Persona'}</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'محمي بواسطة نظام الهوية الرقمية EDE IAM وبوابة UAE Pass' : 'Secured by EDE IAM & UAE Pass Gateway'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
