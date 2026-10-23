'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  HeartPulse,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  PlusCircle,
  Download,
} from 'lucide-react';

export default function InsuranceCoveragePage() {
  const { medicalPolicy } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'وثيقة التأمين الصحي وتغطية الشبكة' : 'Medical Insurance Policy & Network Coverage'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'التأمين والمطالبات' : 'Insurance & Claims' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مزايا الرعاية الصحية وبطاقة التأمين' : 'Healthcare Benefits & Policy Card'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'وثيقة التأمين الصحي الرسمية الصادرة بموجب العقد الجماعي لمؤسسة الإمارات للدواء.'
                  : 'Official health insurance policy issued under the Emirates Drug Establishment Group Contract.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/employee/insurance/claims"
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isAr ? 'تقديم مطالبة استرداد مالي' : 'Submit Reimbursement Claim'}</span>
              </Link>
            </div>
          </div>

          {/* Electronic Insurance Card Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Front Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-[#142B52] via-[#0E1F3D] to-[#008F88] text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-[#00B3AA]" />
                  <span className="font-black text-sm uppercase tracking-wider">
                    {isAr ? 'ضمان للتأمين الصحي الوطني' : 'DAMAN NATIONAL HEALTH'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 border border-white/20 uppercase tracking-widest">
                  {isAr ? 'الفئة التنفيذية VIP' : 'VIP EXECUTIVE'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-300 uppercase tracking-wider block">
                  {isAr ? 'العضو المؤمن عليه' : 'Insured Member'}
                </span>
                <p className="text-lg font-black tracking-wide text-white">
                  {isAr ? 'أحمد المنصوري' : 'Ahmed Al Mansoori'}
                </p>
                <p className="text-xs font-mono text-[#00B3AA]">
                  {isAr ? `رقم العضوية: ${medicalPolicy.memberNumber}` : `Member ID: ${medicalPolicy.memberNumber}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-300 uppercase block">
                    {isAr ? 'مرجع الوثيقة' : 'Policy Ref'}
                  </span>
                  <span className="font-mono font-semibold">{medicalPolicy.policyNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 uppercase block">
                    {isAr ? 'الحد السنوي' : 'Annual Limit'}
                  </span>
                  <span className="font-bold text-emerald-300">
                    {isAr ? '1,000,000 درهم' : 'AED 1,000,000'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10">
                <span>
                  {isAr
                    ? `الصلاحية: من ${medicalPolicy.effectiveDate} إلى ${medicalPolicy.expiryDate}`
                    : `Valid: ${medicalPolicy.effectiveDate} to ${medicalPolicy.expiryDate}`}
                </span>
                <span className="text-emerald-400 font-bold">
                  {isAr ? '✓ تغطية نشطة' : '✓ Active Coverage'}
                </span>
              </div>
            </div>

            {/* Policy Parameters Grid */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? 'شروط التغطية وجدول الشبكة الطبية' : 'Coverage Terms & Network Schedule'}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{isAr ? 'شركة التأمين' : 'Insurance Provider'}</span>
                  <span className="font-bold text-slate-900">{medicalPolicy.provider}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{isAr ? 'مستوى شبكة المستشفيات' : 'Plan Network Tier'}</span>
                  <span className="font-bold text-slate-900">{medicalPolicy.networkTier}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">
                    {isAr ? 'نسبة التحمل في العيادات الخارجية' : 'Outpatient Consultation Co-Pay'}
                  </span>
                  <span className="font-bold text-emerald-700">{medicalPolicy.coPayOutpatient}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">
                    {isAr ? 'تغطية الأدوية والصيدلية' : 'Prescription Pharmacy Benefit'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {isAr ? '100% حتى 15,000 درهم سقف سنوي' : '100% up to AED 15,000 annual cap'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">
                    {isAr ? 'مخصصات الأسنان والبصريات' : 'Dental & Optical Allowance'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {isAr ? '3,500 درهم للأسنان / 1,500 درهم للبصريات' : 'AED 3,500 Dental / AED 1,500 Optical'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">
                    {isAr ? 'التنويم بالمستشفى في حالات الطوارئ' : 'Emergency Inpatient Hospitalization'}
                  </span>
                  <span className="font-bold text-emerald-700">
                    {isAr ? 'مغطى 100% (فوترة مباشرة)' : '100% Covered (Direct Billing)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
