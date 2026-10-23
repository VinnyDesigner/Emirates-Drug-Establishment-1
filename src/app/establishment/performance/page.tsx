'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MetricCard } from '@/components/common/MetricCard';
import { BarChart3, ShieldCheck, CheckCircle2, Download, AlertTriangle } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentPerformancePage() {
  const { slaMetrics } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const overallScore = (
    slaMetrics.reduce((acc, m) => acc + m.complianceRate, 0) / slaMetrics.length
  ).toFixed(1);

  const handleExport = () => {
    exportToCSV('EDE_Executive_SLA_Matrix_Section_3_7', slaMetrics, [
      { key: 'rfpSection', label: isAr ? 'بند كراسة الشروط' : 'RFP Section' },
      { key: 'code', label: isAr ? 'الرمز' : 'Code' },
      { key: isAr ? 'indicatorAr' : 'indicatorEn', label: isAr ? 'مؤشر الأداء' : 'Indicator' },
      { key: isAr ? 'targetDescriptionAr' : 'targetDescriptionEn', label: isAr ? 'المعيار المستهدف' : 'Benchmark Target' },
      { key: 'actualValue', label: isAr ? 'النتيجة المحققة' : 'Actual Result' },
      { key: 'complianceRate', label: isAr ? 'نسبة الامتثال (%)' : 'Compliance Rate (%)' },
      { key: 'status', label: isAr ? 'الحالة التعاقدية' : 'Contractual Status' },
      { key: 'breachedTransactionsCount', label: isAr ? 'عدد المخالفات' : 'Breaches Count' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مصفوفة اتفاقية مستوى الخدمة ومؤشرات الأداء' : 'Service Level Agreement (SLA) Matrix'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'مصفوفة مستوى الخدمة' : 'SLA Matrix' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مستويات الخدمة ومؤشرات الأداء التعاقدية (RFP بند 3.7)' : 'RFP Section 3.7 Service Levels & Performance Indicators'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'مصفوفة حوكمة الأداء الرسمية المكونة من 10 مؤشرات رئيسية لضبط امتثال الموردين وتدقيق الغرامات.'
                  : 'Official 10-indicator performance governance matrix governing contractor compliance and penalty audits.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير سجل مستوى الخدمة (CSV)' : 'Export SLA Ledger (CSV)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title={isAr ? 'المؤشر العام لمستوى الخدمة' : 'Overall SLA Index'}
              value={`${overallScore}%`}
              subtitle={isAr ? 'تم تقييم جميع المؤشرات التعاقدية العشرة' : 'All 10 contractual indicators evaluated'}
              highlightColor="primary"
              icon={<ShieldCheck className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'المؤشرات الممتثلة' : 'Compliant Indicators'}
              value={isAr ? '10 / 10 مستوفاة' : '10 / 10 Met'}
              subtitle={isAr ? 'صفر مؤشرات متعثرة أو متأخرة' : 'Zero lagging or failing indicators'}
              highlightColor="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'الخصومات والجزاءات' : 'Penalties & Deductions'}
              value={isAr ? '0.00 درهم' : 'AED 0.00'}
              subtitle={isAr ? 'لم تسجل أي مخالفات تستوجب الخصم' : 'No breached SLA deductions accrued'}
              highlightColor="accent"
              icon={<BarChart3 className="w-5 h-5" />}
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'جدول مؤشرات الأداء العشرة (بند 3.7)' : 'RFP Section 3.7 Evaluated Indicators'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الرمز' : 'Code'}</th>
                    <th className="py-3 px-2">{isAr ? 'مؤشر الأداء' : 'Indicator'}</th>
                    <th className="py-3 px-2">{isAr ? 'المعيار المستهدف' : 'Benchmark Target'}</th>
                    <th className="py-3 px-2">{isAr ? 'النتيجة الفعلية' : 'Actual Result'}</th>
                    <th className="py-3 px-2">{isAr ? 'نسبة الامتثال' : 'Compliance Rate'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slaMetrics.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{m.code}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900 max-w-xs">
                        {isAr ? m.indicatorAr : m.indicatorEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-600 max-w-sm">
                        {isAr ? m.targetDescriptionAr : m.targetDescriptionEn}
                      </td>
                      <td className="py-3.5 px-2 font-mono font-bold text-[#008F88]">{m.actualValue}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                        {m.complianceRate}%
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={m.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
