'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  ShieldCheck,
  Calculator,
  Coins,
  HeartPulse,
  Plane,
  CalendarDays,
  Building2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export default function EmployeeBenefitsPage() {
  const { profile, payslips } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [yearsOfService, setYearsOfService] = useState(3.8); // 3.8 years since Jan 2023
  const [basicSalaryInput, setBasicSalaryInput] = useState(22000);

  // UAE End of Service Gratuity (EOSB) calculation
  // 21 days basic salary for each year of the first 5 years
  // 30 days basic salary for each additional year
  const calculateGratuity = (years: number, basic: number) => {
    const dailyWage = basic / 30;
    if (years <= 5) {
      return Math.round(years * 21 * dailyWage);
    } else {
      const first5 = 5 * 21 * dailyWage;
      const extra = (years - 5) * 30 * dailyWage;
      return Math.round(first5 + extra);
    }
  };

  const estimatedGratuity = calculateGratuity(yearsOfService, basicSalaryInput);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'المستحقات ومكافأة نهاية الخدمة' : 'Benefits & End of Service Entitlements'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'المستحقات' : 'Benefits' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr
                ? 'نظرة عامة على التعويضات التعاقدية والمزايا القانونية'
                : 'Contractual Compensation & Statutory Benefits Overview'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'جدول كامل للبدلات الشهرية، والتغطية الصحية، وتذاكر السفر السنوية، ومكافأة نهاية الخدمة المستحقة.'
                : 'Complete schedule of monthly allowances, wellness coverage, flight grants, and accrued severance gratuity.'}
            </p>
          </div>

          {/* Benefits Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'البدلات الشهرية' : 'Monthly Allowances'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{isAr ? '15,500 درهم' : 'AED 15,500'}</p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'سكن (10 آلاف)، مواصلات (3 آلاف)، اتصالات (2.5 ألف)' : 'Housing (10k), Transport (3k), Tech (2.5k)'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                <Plane className="w-4 h-4 text-[#008F88]" />
                <span>{isAr ? 'منحة السفر السنوية' : 'Annual Flight Grant'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{isAr ? 'تذكرة ذهاب وعودة / سنة' : '1 Roundtrip / yr'}</p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'تذاكر طيران مباشرة للموظف والأسرة' : 'Direct airline tickets for self & family'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>{isAr ? 'التغطية الصحية' : 'Medical Coverage'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{isAr ? 'فئة VIP 1' : 'VIP Tier 1'}</p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'الحد الأقصى للوثيقة السنوية 1,000,000 درهم' : 'AED 1,000,000 Annual Policy Limit'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                <CalendarDays className="w-4 h-4 text-[#2463A6]" />
                <span>{isAr ? 'الإجازة المدفوعة' : 'Paid Vacation'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{isAr ? '30 يوماً تقويمياً' : '30 Calendar Days'}</p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'رصيد إجازة سنوية مدفوعة بالكامل' : 'Fully paid annual leave balance'}
              </p>
            </div>
          </div>

          {/* End of Service (EOSB) Gratuity Calculator */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-[#142B52]">
                  {isAr
                    ? 'حاسبة مكافأة نهاية الخدمة وفقاً لقانون العمل الإماراتي (EOSB)'
                    : 'UAE Labor Law End-of-Service Gratuity (EOSB) Estimator'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'محسوبة وفقاً للمرسوم بقانون اتحادي رقم (33) لسنة 2021 بشأن تنظيم علاقات العمل في دولة الإمارات.'
                    : 'Calculated based on Federal Decree-Law No. (33) of 2021 regarding the Regulation of Labour Relations.'}
                </p>
              </div>
              <Coins className="w-6 h-6 text-amber-500 shrink-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-xs">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr
                      ? `سنوات الخدمة المستمرة المكتملة: ${yearsOfService} سنة`
                      : `Completed Years of Continuous Service: ${yearsOfService} years`}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={yearsOfService}
                    onChange={(e) => setYearsOfService(parseFloat(e.target.value))}
                    className="w-full accent-[#142B52] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{isAr ? 'سنة واحدة' : '1 Year'}</span>
                    <span>{isAr ? '5 سنوات' : '5 Years'}</span>
                    <span>{isAr ? '10 سنوات' : '10 Years'}</span>
                    <span>{isAr ? '15 سنة' : '15 Years'}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'الراتب الأساسي التعاقدي (درهم إماراتي)' : 'Contractual Basic Salary (AED)'}
                  </label>
                  <input
                    type="number"
                    value={basicSalaryInput}
                    onChange={(e) => setBasicSalaryInput(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] space-y-1">
                  <p className="font-bold text-slate-800">
                    {isAr ? 'معادلة المكافأة القانونية:' : 'Statutory Gratuity Formula:'}
                  </p>
                  <p>{isAr ? '• أول 5 سنوات: أجر 21 يوماً أساسي عن كل سنة خدمة.' : '• First 5 years: 21 days basic salary per year completed.'}</p>
                  <p>{isAr ? '• ما زاد عن 5 سنوات: أجر 30 يوماً أساسي عن كل سنة إضافية.' : '• Exceeding 5 years: 30 days basic salary for each additional year.'}</p>
                </div>
              </div>

              {/* Result Callout */}
              <div className="p-6 rounded-3xl bg-linear-to-br from-[#142B52] to-[#2463A6] text-white space-y-3 text-center shadow-lg">
                <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">
                  {isAr ? 'مستحقات نهاية الخدمة التقديرية' : 'Estimated Severance Entitlement'}
                </span>
                <p className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                  {isAr ? `${estimatedGratuity.toLocaleString()} درهم` : `AED ${estimatedGratuity.toLocaleString()}`}
                </p>
                <p className="text-xs text-slate-300">
                  {isAr
                    ? `مستحقة عن ${yearsOfService} سنوات من الخدمة المستمرة في مؤسسة الإمارات للدواء.`
                    : `Accrued for ${yearsOfService} years of continuous outsourced service at Emirates Drug Establishment.`}
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  {isAr
                    ? '* يخضع الصرف النهائي لبراءة الذمة ومراجعة التدقيق المالي للمؤسسة والمورد.'
                    : '* Final disbursement subject to clearance from EDE and Supplier finance audit.'}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
