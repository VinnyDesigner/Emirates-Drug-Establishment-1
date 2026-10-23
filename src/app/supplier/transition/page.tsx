'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useI18n } from '@/lib/i18n';
import {
  RefreshCw,
  FileCheck2,
} from 'lucide-react';

export default function SupplierTransitionPage() {
  const { employees, documents } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const transitionMilestones = [
    {
      id: 1,
      titleEn: 'Master Roster & Contract Ingestion',
      titleAr: 'استيعاب سجل القيد الرئيسي ومطابقة العقود',
      status: 'Completed',
      statusAr: 'مكتمل',
      progress: 100,
      date: '2026-09-15',
    },
    {
      id: 2,
      titleEn: 'Statutory Document Readiness & Verification',
      titleAr: 'جاهزية الوثائق القانونية والتحقق النظامي',
      status: 'In Progress',
      statusAr: 'قيد الإنجاز',
      progress: 96,
      date: '2026-10-15',
    },
    {
      id: 3,
      titleEn: 'WPS IBAN Validation & Salary Alignment',
      titleAr: 'التحقق من الآيبان البنكي ومطابقة نظام حماية الأجور (WPS)',
      status: 'Completed',
      statusAr: 'مكتمل',
      progress: 100,
      date: '2026-10-01',
    },
    {
      id: 4,
      titleEn: 'Health Insurance Continuity & Thiqa Migration',
      titleAr: 'استمرارية التأمين الصحي ونقل وثائق التغطية العلاجية',
      status: 'Completed',
      statusAr: 'مكتمل',
      progress: 100,
      date: '2026-10-10',
    },
    {
      id: 5,
      titleEn: 'Biometric Turnstile Ingestion & Badge Issuance',
      titleAr: 'تكامل بوابات الحضور البيومترية وإصدار بطاقات العمل',
      status: 'In Progress',
      statusAr: 'قيد الإنجاز',
      progress: 92,
      date: '2026-10-20',
    },
    {
      id: 6,
      titleEn: 'Final Handover Documentation Sign-Off',
      titleAr: 'التوقيع النهائي على وثائق تسليم واستلام العمل',
      status: 'Scheduled',
      statusAr: 'مجدول',
      progress: 0,
      date: '2026-11-01',
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#142B52] text-xs font-semibold mb-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#008F88]" />
                <span>
                  {isAr
                    ? 'جاهزية الانتقال والتأهيل الأولي (كراسة الشروط - البند 3.5.2)'
                    : 'TRANSITION & ONBOARDING READINESS (RFP SECTION 3.5.2)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'مراحل ومحطات انتقال القوى العاملة' : 'Workforce Transition & Migration Milestones'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'متابعة التسليم الأولي للموظفين، وجاهزية الوثائق النظامية، وتعديل أوضاع الإقامات، والربط مع بوابات الدخول البيومترية.'
                  : 'Tracking initial personnel handover, document readiness, visa transitions, and biometric turnstile integration.'}
              </p>
            </div>

            <Link
              href="/supplier/data-handover"
              className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isAr ? 'حزم تسليم ونقل البيانات ←' : 'Data Handover Packages →'}</span>
            </Link>
          </div>

          {/* Milestone Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transitionMilestones.map((m) => (
              <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {isAr ? `المرحلة 0${m.id}` : `Milestone 0${m.id}`}
                  </span>
                  <StatusBadge
                    status={m.status === 'Completed' ? 'approved' : m.status === 'In Progress' ? 'pending' : 'under_review'}
                    label={isAr ? m.statusAr : m.status}
                  />
                </div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {isAr ? m.titleAr : m.titleEn}
                </h2>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{isAr ? 'نسبة الجاهزية:' : 'Readiness:'}</span>
                    <span className="font-bold text-slate-800">{m.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2463A6] to-[#008F88] rounded-full transition-all"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
                  {isAr ? 'التاريخ المستهدف: ' : 'Target Date: '}{m.date}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
