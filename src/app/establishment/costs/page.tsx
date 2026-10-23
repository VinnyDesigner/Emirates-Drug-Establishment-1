'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { DollarSign, Download, Building2, TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentCostsPage() {
  const { employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Financial figures for demo
  const monthlyCostTamimi = 1275000; // 34 * ~37.5k
  const monthlyCostApex = 862500;    // 23 * ~37.5k
  const totalMonthly = monthlyCostTamimi + monthlyCostApex; // AED 2,137,500

  const costBreakdown = [
    {
      monthEn: 'October 2026 (Projected)',
      monthAr: 'أكتوبر 2026 (تقديري متوقع)',
      tamimi: 1275000,
      apex: 862500,
      total: 2137500,
      wpsStatusEn: 'Scheduled',
      wpsStatusAr: 'مجدول للتحويل',
    },
    {
      monthEn: 'September 2026',
      monthAr: 'سبتمبر 2026',
      tamimi: 1275000,
      apex: 862500,
      total: 2137500,
      wpsStatusEn: 'Settled & WPS Verified',
      wpsStatusAr: 'تمت التسوية ومطابق لنظام حماية الأجور (WPS)',
    },
    {
      monthEn: 'August 2026',
      monthAr: 'أغسطس 2026',
      tamimi: 1275000,
      apex: 862500,
      total: 2137500,
      wpsStatusEn: 'Settled & WPS Verified',
      wpsStatusAr: 'تمت التسوية ومطابق لنظام حماية الأجور (WPS)',
    },
    {
      monthEn: 'July 2026',
      monthAr: 'يوليو 2026',
      tamimi: 1275000,
      apex: 862500,
      total: 2137500,
      wpsStatusEn: 'Settled & WPS Verified',
      wpsStatusAr: 'تمت التسوية ومطابق لنظام حماية الأجور (WPS)',
    },
  ];

  const handleExport = () => {
    exportToCSV('EDE_Monthly_Outsourcing_Expenditure', costBreakdown, [
      { key: isAr ? 'monthAr' : 'monthEn', label: isAr ? 'فترة الفاتورة' : 'Billing Period' },
      { key: 'tamimi', label: isAr ? 'التميمي للقوى العاملة (درهم)' : 'Al Tamimi Manpower (AED)' },
      { key: 'apex', label: isAr ? 'أبكس للتعهيد (درهم)' : 'Apex Outsourcing (AED)' },
      { key: 'total', label: isAr ? 'الإجمالي المفوتر (درهم)' : 'Total Invoiced (AED)' },
      { key: isAr ? 'wpsStatusAr' : 'wpsStatusEn', label: isAr ? 'حالة نظام حماية الأجور (WPS)' : 'WPS Settlement Status' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'نفقات التعهيد والفواتير الشهرية' : 'Outsourcing Expenditure & Invoicing'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'النفقات والفواتير' : 'Costs & Invoicing' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'الإنفاق الشهري على عقود القوى العاملة الخارجية' : 'Monthly Manpower Contracting Expenditure'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تدقيق مالي يتابع تحويلات الأجور للموردين ورسوم الإدارة ومطابقة معاملات نظام حماية الأجور (WPS).'
                  : 'Financial audit tracking multi-supplier wage transfers, contractor management fees, and WPS transaction compliance.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير سجل الفواتير (CSV)' : 'Export Invoicing Ledger (CSV)'}</span>
            </button>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title={isAr ? 'إجمالي الإنفاق الشهري' : 'Total Monthly Expenditure'}
              value={isAr ? `${(totalMonthly / 1000000).toFixed(2)} مليون درهم` : `AED ${(totalMonthly / 1000000).toFixed(2)}M`}
              subtitle={isAr ? '57 وظيفة تخصصية مسندة' : '57 Specialized External Roles'}
              highlightColor="primary"
              icon={<DollarSign className="w-5 h-5" />}
              trend={{ value: isAr ? '100% ضمن الميزانية' : '100% On-Budget', isPositive: true, label: isAr ? 'الميزانية المعتمدة' : 'Approved Fiscal Plan' }}
            />
            <MetricCard
              title={isAr ? 'إنفاق التميمي لخدمات القوى العاملة' : 'Al Tamimi Manpower Outlay'}
              value={isAr ? `${(monthlyCostTamimi / 1000000).toFixed(2)} مليون درهم` : `AED ${(monthlyCostTamimi / 1000000).toFixed(2)}M`}
              subtitle={isAr ? '34 موظفاً متخصصاً' : '34 Assigned Personnel'}
              highlightColor="primary"
              icon={<Building2 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'إنفاق أبكس لحلول التعهيد' : 'Apex Outsourcing Outlay'}
              value={isAr ? `${(monthlyCostApex / 1000000).toFixed(2)} مليون درهم` : `AED ${(monthlyCostApex / 1000000).toFixed(2)}M`}
              subtitle={isAr ? '23 موظفاً متخصصاً' : '23 Assigned Personnel'}
              highlightColor="accent"
              icon={<Building2 className="w-5 h-5" />}
            />
          </div>

          {/* Monthly Invoicing History Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل الفواتير التعاقدية وصرف الأجور عبر WPS' : 'Contractual Invoicing & WPS Disbursement History'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'شهر الفاتورة' : 'Billing Month'}</th>
                    <th className="py-3 px-2">{isAr ? 'التميمي (34 موظفاً)' : 'Al Tamimi Manpower (34 Staff)'}</th>
                    <th className="py-3 px-2">{isAr ? 'أبكس (23 موظفاً)' : 'Apex Outsourcing (23 Staff)'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإجمالي الموحد (درهم)' : 'Total Consolidated (AED)'}</th>
                    <th className="py-3 px-2">{isAr ? 'حالة التحويل بنظام WPS' : 'WPS Routing Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {costBreakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-[#142B52]">
                        {isAr ? item.monthAr : item.monthEn}
                      </td>
                      <td className="py-3.5 px-2 font-mono text-slate-700">
                        {isAr ? `${item.tamimi.toLocaleString()} درهم` : `AED ${item.tamimi.toLocaleString()}`}
                      </td>
                      <td className="py-3.5 px-2 font-mono text-slate-700">
                        {isAr ? `${item.apex.toLocaleString()} درهم` : `AED ${item.apex.toLocaleString()}`}
                      </td>
                      <td className="py-3.5 px-2 font-mono font-black text-slate-900">
                        {isAr ? `${item.total.toLocaleString()} درهم` : `AED ${item.total.toLocaleString()}`}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{isAr ? item.wpsStatusAr : item.wpsStatusEn}</span>
                        </span>
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
