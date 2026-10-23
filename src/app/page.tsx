'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import {
  Building2,
  ShieldCheck,
  Users2,
  CalendarCheck,
  FileSpreadsheet,
  Activity,
  ArrowRight,
  CheckCircle,
  FileSignature,
  FileCheck2,
  Layers,
  Lock,
  Globe,
} from 'lucide-react';

import Image from 'next/image';

export default function HomePage() {
  const { switchUserRole, slaMetrics, employees } = useAppStore();
  const { t, language, toggleLanguage } = useI18n();

  const overallSla = (
    slaMetrics.reduce((acc, m) => acc + m.complianceRate, 0) / slaMetrics.length
  ).toFixed(1);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0B1E38] via-[#0E2447] to-[#F8FAFC]">
      {/* Top Government Header Strip */}
      <header className="px-6 lg:px-16 py-6 border-b border-white/10 max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <Link href="/" className="inline-block group" title="Emirates Drug Establishment">
          <Image
            src="/ede-official-logo.png"
            alt="Emirates Drug Establishment"
            width={260}
            height={52}
            className="h-11 sm:h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20 backdrop-blur-xs transition-colors shrink-0 cursor-pointer text-white"
            title="Switch Language / تبديل اللغة"
          >
            <Globe className="w-4 h-4 text-[#00B3AA]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium border border-white/15 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {language === 'ar' ? 'البوابة الاتحادية v2.6' : 'Federal Portal v2.6'}
          </span>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D68E2] to-[#2563EB] hover:from-[#1555BF] hover:to-[#1D68E2] text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t('Sign In')}</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-16 pt-12 pb-20 text-white max-w-7xl mx-auto w-full relative">
        {/* Ambient glow behind hero */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#00B3AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#1D68E2]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B3AA]/20 border border-[#00B3AA]/40 text-[#00B3AA] text-xs font-bold backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'حوكمة الموارد البشرية وإسناد القوى العاملة الاتحادية' : 'Federal Government HRMS & Outsourcing Governance'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {language === 'ar' ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
              <span className="block text-[#00B3AA] font-normal text-2xl sm:text-3xl mt-2 font-arabic drop-shadow-sm">
                {language === 'ar' ? 'نظام الخدمة الذاتية للموظفين وإدارة إسناد القوى العاملة' : 'مؤسسة الإمارات للدواء'}
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'ar'
                ? 'منصة الويب المؤسسية للخدمة الذاتية للموظفين (ESS) وإدارة إسناد القوى العاملة بمؤسسة الإمارات للدواء. تقدم إدارة شاملة لدورة حياة العمل عبر مختلف الفئات: الكوادر المعارة، المدراء المباشرين، ممثلي الشركات المزوّدة، ومسؤولي الحوكمة بالمؤسسة.'
                : 'Enterprise Employee Self Service (ESS) and Manpower Outsourcing Management Web Platform. Delivering complete cross-module lifecycle management for outsourced personnel, line managers, supplier leads, and establishment governance stakeholders.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1D68E2] to-[#2563EB] hover:from-[#1555BF] hover:to-[#1D68E2] text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 hover:scale-[1.02] transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>{language === 'ar' ? 'تسجيل الدخول بالتحقق الثنائي' : 'Sign In via 2FA'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/employee/dashboard"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all"
              >
                {language === 'ar' ? 'فتح بوابة الموظف' : 'Launch Employee Portal'}
              </Link>

              <Link
                href="/traceability"
                className="px-6 py-3.5 rounded-xl bg-[#00B3AA]/20 hover:bg-[#00B3AA]/30 text-[#00B3AA] font-semibold text-sm border border-[#00B3AA]/40 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>{language === 'ar' ? 'مصفوفة مطابقة كراسة الشروط' : 'RFP Traceability Matrix'}</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="w-full lg:w-96 glass-card-dark rounded-3xl p-6 sm:p-7 backdrop-blur-xl space-y-5 shadow-2xl border border-white/20 relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Platform Operational Health
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-300 block font-medium">Workforce Active</span>
                <span className="text-2xl font-black text-white">{employees.length}</span>
                <span className="text-[10px] text-teal-300 block font-semibold">57 Outsourced Pros</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-300 block font-medium">RFP Section 3.7 SLA</span>
                <span className="text-2xl font-black text-emerald-400">{overallSla}%</span>
                <span className="text-[10px] text-emerald-300 block font-semibold">Across 10 KPIs</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-300 block font-medium">Contracted Suppliers</span>
                <span className="text-2xl font-black text-white">2</span>
                <span className="text-[10px] text-slate-300 block font-semibold">Al Tamimi & Apex</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-300 block font-medium">System Availability</span>
                <span className="text-2xl font-black text-white">99.9%</span>
                <span className="text-[10px] text-teal-300 block font-semibold">Target &ge;99.0%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" /> All Services Operational
              </span>
              <span className="text-[11px] text-slate-400 font-mono">GST (UTC+4)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Navigation Hub */}
      <section className="px-6 lg:px-16 -mt-8 pb-16 max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Employee */}
          <div className="card-trendy p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden bg-white/95 backdrop-blur-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F2342] to-[#1D68E2]" />
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/80 text-[#1D68E2] border border-blue-200/60 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1D68E2] transition-colors">
                {t('portal.employee')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Personal dashboard, leave applications, WPS payslips, certificates, document vault, insurance claims, and service requests.
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00B3AA]/10 text-[#008F88] text-[11px] font-bold border border-[#00B3AA]/20">
                <span>Ahmed Al Mansoori (EDE-EMP-1042)</span>
              </div>
            </div>
            <Link
              href="/employee/dashboard"
              onClick={() => switchUserRole('outsourced_employee')}
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-[#1D68E2] text-slate-800 hover:text-white font-bold text-xs border border-slate-200/80 hover:border-[#1D68E2] transition-all shadow-xs group/btn"
            >
              <span>{language === 'ar' ? 'الدخول إلى بوابة الموظف' : 'Access Employee Portal'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Line Manager */}
          <div className="card-trendy p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden bg-white/95 backdrop-blur-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00B3AA] to-[#008F88]" />
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/80 text-[#008F88] border border-teal-200/60 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#008F88] transition-colors">
                {t('portal.manager')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'ar'
                  ? 'صندوق اعتمادات موحد للإجازات والطلبات، كشف فريق الإدارة، وسجل الحضور البيومتري الحي وتقويم الإجازات.'
                  : 'Unified approvals inbox for leave & requests, department team roster, live biometric attendance, and visual leave calendar.'}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00B3AA]/10 text-[#008F88] text-[11px] font-bold border border-[#00B3AA]/20">
                <span>{language === 'ar' ? 'د. مريم السويدي (رئيس قسم تسجيل الأدوية)' : 'Dr. Mariam Suwaidi (Head of Drug Reg)'}</span>
              </div>
            </div>
            <Link
              href="/manager/dashboard"
              onClick={() => switchUserRole('line_manager')}
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-[#008F88] text-slate-800 hover:text-white font-bold text-xs border border-slate-200/80 hover:border-[#008F88] transition-all shadow-xs group/btn"
            >
              <span>{language === 'ar' ? 'الدخول إلى بوابة المدير' : 'Access Manager Portal'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Supplier Operations */}
          <div className="card-trendy p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden bg-white/95 backdrop-blur-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                <FileSignature className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {t('portal.supplier')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'ar'
                  ? 'طابور معالجة المهام، تعقب تجديد الوثائق خلال 30 يوماً، إصدار الشهادات، وتدقيق التعديلات المصرفية.'
                  : 'Task processing queue, document 30-day renewal tracker, certificate issuance (2-day SLA), banking change reviews, and escalations.'}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                <span>{language === 'ar' ? 'طارق الهاشمي وليلى محمود' : 'Tariq Al Hashimi & Layla Mahmoud'}</span>
              </div>
            </div>
            <Link
              href="/supplier/dashboard"
              onClick={() => switchUserRole('supplier_esm')}
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-amber-600 text-slate-800 hover:text-white font-bold text-xs border border-slate-200/80 hover:border-amber-600 transition-all shadow-xs group/btn"
            >
              <span>{language === 'ar' ? 'الدخول إلى بوابة المزوّد' : 'Access Supplier Portal'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Establishment Admin */}
          <div className="card-trendy p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden bg-white/95 backdrop-blur-xs">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/80 text-indigo-600 border border-indigo-200/60 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {t('portal.establishment')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'ar'
                  ? 'لوحة حوكمة المؤسسة، دليل القوى العاملة المؤجرة عبر المزوّدين، تحليلات الإدارات، وسجل التدقيق.'
                  : 'Executive dashboard, 57-workforce directory across 2 suppliers, department analytics, outsourcing costs, and immutable audit trail.'}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                <span>{language === 'ar' ? 'سلطان النعيمي (مدير الحوكمة)' : 'Sultan Al Nuaimi (Governance Director)'}</span>
              </div>
            </div>
            <Link
              href="/establishment/dashboard"
              onClick={() => switchUserRole('establishment_admin')}
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-800 hover:text-white font-bold text-xs border border-slate-200/80 hover:border-indigo-600 transition-all shadow-xs group/btn"
            >
              <span>{language === 'ar' ? 'الدخول إلى بوابة الحوكمة' : 'Access Governance Portal'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 px-6 lg:px-16 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          {language === 'ar'
            ? '© 2026 مؤسسة الإمارات للدواء • حكومة دولة الإمارات العربية المتحدة الاتحادية'
            : '© 2026 Emirates Drug Establishment (EDE) • United Arab Emirates Federal Government'}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/traceability" className="hover:text-[#1D68E2] font-semibold transition-colors">
            {language === 'ar' ? 'مصفوفة مطابقة كراسة الشروط' : 'RFP Traceability'}
          </Link>
          <Link href="/login" className="hover:text-[#1D68E2] font-semibold transition-colors">
            {language === 'ar' ? 'تسجيل الدخول / 2FA' : 'Sign In / 2FA'}
          </Link>
        </div>
      </footer>
    </div>
  );
}
