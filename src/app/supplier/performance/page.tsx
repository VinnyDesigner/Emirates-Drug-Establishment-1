'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MetricCard } from '@/components/common/MetricCard';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function SupplierPerformanceScorecardPage() {
  const { slaMetrics } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const overallScore = (
    slaMetrics.reduce((acc, m) => acc + m.complianceRate, 0) / slaMetrics.length
  ).toFixed(1);

  const handleExport = () => {
    exportToCSV('Al_Tamimi_SLA_Scorecard_Section_3_7', slaMetrics, [
      { key: 'code', label: isAr ? 'رمز المؤشر' : 'Indicator Code' },
      { key: isAr ? 'indicatorAr' : 'indicatorEn', label: isAr ? 'مؤشر الأداء' : 'Indicator Description' },
      { key: isAr ? 'targetDescriptionAr' : 'targetDescriptionEn', label: isAr ? 'المعيار المستهدف (SLA)' : 'RFP SLA Target' },
      { key: 'actualValue', label: isAr ? 'النتيجة المحققة' : 'Actual Measured' },
      { key: 'complianceRate', label: isAr ? 'نسبة الامتثال (%)' : 'Compliance Rate (%)' },
      { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      { key: 'breachedTransactionsCount', label: isAr ? 'عدد المخالفات' : 'Breached Count' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'بطاقة قياس أداء مستوى الخدمة ومؤشرات المورد' : 'Supplier SLA Performance & KPI Scorecard'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'مؤشرات الأداء' : 'Performance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مصفوفة اتفاقية مستوى الخدمة الرسمية (RFP بند 3.7)' : 'RFP Section 3.7 Official Service Level Agreement (SLA) Matrix'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تقييم شهري لأداء المورد مقابل مؤشرات مستوى الخدمة التعاقدية العشرة لمؤسسة الإمارات للدواء.'
                  : 'Monthly performance evaluation against the 10 contractual service level indicators.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير بطاقة الأداء (CSV)' : 'Export SLA Scorecard (CSV)'}</span>
            </button>
          </div>

          {/* Top Performance Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title={isAr ? 'الامتثال الكلي لمستوى الخدمة' : 'Overall SLA Compliance'}
              value={`${overallScore}%`}
              subtitle={isAr ? 'النسبة الموزونة عبر كافة المؤشرات العشرة' : 'Weighted achievement across all 10 indicators'}
              highlightColor="primary"
              icon={<ShieldCheck className="w-5 h-5" />}
              trend={{ value: isAr ? 'المستهدف ≥ 95.0%' : 'Target ≥95.0%', isPositive: true, label: isAr ? 'امتثال تعاقدي كامل' : 'Full Compliance' }}
            />
            <MetricCard
              title={isAr ? 'المؤشرات المستوفاة' : 'Compliant Indicators'}
              value={isAr ? '10 / 10 مستوفاة' : '10 / 10 Met'}
              subtitle={isAr ? 'صفر مؤشرات مستوجبة للخصم المالي' : 'Zero penalized service indicators'}
              highlightColor="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'جاهزية وتوافر بوابة الخدمة الذاتية' : 'ESS System Monthly Availability'}
              value="99.94%"
              subtitle={isAr ? 'المستهدف: ألا يقل عن 99.0% شهرياً' : 'Target: At least 99.0% monthly uptime'}
              highlightColor="accent"
              icon={<BarChart3 className="w-5 h-5" />}
            />
          </div>

          {/* SLA Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل مؤشرات الأداء التفصيلية (بند 3.7)' : 'Section 3.7 Contractual KPI Performance Breakdown'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الرمز' : 'Code'}</th>
                    <th className="py-3 px-2">{isAr ? 'المؤشر' : 'Indicator'}</th>
                    <th className="py-3 px-2">{isAr ? 'المعيار التعاقدي' : 'RFP Benchmark'}</th>
                    <th className="py-3 px-2">{isAr ? 'النتيجة المحققة' : 'Actual Measured'}</th>
                    <th className="py-3 px-2">{isAr ? 'نسبة الامتثال' : 'Compliance Rate'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slaMetrics.map((sla) => (
                    <tr key={sla.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{sla.code}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900 max-w-xs">
                        {isAr ? sla.indicatorAr : sla.indicatorEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-600 max-w-sm">
                        {isAr ? sla.targetDescriptionAr : sla.targetDescriptionEn}
                      </td>
                      <td className="py-3.5 px-2 font-mono font-bold text-emerald-700">
                        {sla.actualValue} {sla.targetUnit}
                      </td>
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                        {sla.complianceRate}%
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={sla.status} />
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
