'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import { exportToCSV } from '@/lib/export-utils';
import { useI18n } from '@/lib/i18n';
import {
  Users2,
  ShieldCheck,
  Download,
} from 'lucide-react';

export default function EdeSuppliersGovernancePage() {
  const { suppliers, employees } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(
      suppliers.map((s) => ({
        Code: s.code,
        Supplier_Name: isAr ? s.nameAr : s.nameEn,
        Contract_Number: s.contractNumber,
        Headcount_Quota: s.headcountQuota,
        Active_Headcount: s.activeHeadcount,
        Compliance_Rate: `${s.complianceRate}%`,
        Monthly_Billing_AED: s.monthlyBillingEstimated,
        Contact_Person: s.contactPerson,
      })),
      'EDE-Suppliers-Governance-Report'
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#142B52] text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008F88]" />
                <span>
                  {isAr
                    ? 'إطار التعهيد الخارجي المزدوج (كراسة الشروط - البند 3.5.2)'
                    : 'DUAL-SUPPLIER OUTSOURCING FRAMEWORK (RFP SECTION 3.5.2)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'إدارة الموردين وحوكمة الحصص والكوادر' : 'Supplier Management & Quota Governance'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'الإشراف على مزودي خدمات التعهيد المعتمدين، ومخصصات العقود، ومؤشرات الامتثال، ومطابقة الفواتير الشهرية.'
                  : 'Oversight of appointed outsourcing service providers, contract allocations, compliance ratings, and monthly billing reconciliation.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير بيانات الموردين' : 'Export Suppliers Data'}</span>
            </button>
          </div>

          {/* Supplier Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {suppliers.map((sup) => {
              const utilizationPct = Math.round((sup.activeHeadcount / sup.headcountQuota) * 100);

              return (
                <div
                  key={sup.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#142B52] text-white flex items-center justify-center font-black text-lg">
                        {sup.code.slice(0, 2)}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          {isAr ? sup.nameAr : sup.nameEn}
                        </h2>
                        <span className="text-xs text-slate-500 block">
                          {isAr ? sup.nameEn : sup.nameAr}
                        </span>
                        <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 mt-1 inline-block">
                          {isAr ? 'رقم العقد: ' : 'Contract: '}{sup.contractNumber}
                        </span>
                      </div>
                    </div>

                    <StatusBadge
                      status="approved"
                      label={isAr ? (sup.status === 'Active' ? 'نشط ومعتمد' : sup.status) : sup.status}
                    />
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        {isAr ? 'حصة الكوادر المتعاقد عليها' : 'Contracted Headcount Quota'}
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        {sup.activeHeadcount} / {sup.headcountQuota} ({utilizationPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2463A6] to-[#008F88] rounded-full transition-all"
                        style={{ width: `${utilizationPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {isAr
                        ? `متبقي ${sup.headcountQuota - sup.activeHeadcount} شاغر ضمن السقف التعاقدي المتفق عليه.`
                        : `${sup.headcountQuota - sup.activeHeadcount} open requisition capacity remaining under agreed contract cap.`}
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        {isAr ? 'امتثال اتفاقية الخدمة' : 'SLA Compliance'}
                      </span>
                      <span className="text-base font-black text-emerald-600 mt-0.5 block font-mono">
                        {sup.complianceRate}%
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {isAr ? 'أعلى من المستهدف 98%' : 'Above 98% threshold'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        {isAr ? 'الفاتورة الشهرية التقديرية' : 'Est. Monthly Billing'}
                      </span>
                      <span className="text-base font-black text-[#142B52] mt-0.5 block font-mono">
                        {isAr
                          ? `${(sup.monthlyBillingEstimated / 1000).toFixed(0)} ألف د.إ`
                          : `AED ${(sup.monthlyBillingEstimated / 1000).toFixed(0)}k`}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {isAr ? 'نظام حماية الأجور (WPS)' : 'WPS Verified'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-1 col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        {isAr ? 'سريان العقد' : 'Contract Validity'}
                      </span>
                      <span className="text-xs font-bold text-slate-800 mt-1 block font-mono">
                        {sup.contractEndDate}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {isAr ? 'إطار تعاقدي نشط' : 'Active Framework'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info & Action */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-800 block">{sup.contactPerson}</span>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px] dir-ltr rtl:justify-end">
                        <span>{sup.email}</span>
                        <span>•</span>
                        <span className="font-mono">{sup.phone}</span>
                      </div>
                    </div>

                    <Link
                      href={`/ede/workforce?supplier=${sup.code}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors shrink-0"
                    >
                      <Users2 className="w-3.5 h-3.5" />
                      <span>
                        {isAr
                          ? `عرض الكوادر العاملة (${sup.activeHeadcount})`
                          : `View Personnel (${sup.activeHeadcount})`}
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Supplier Data Segregation & Security Notice */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2463A6] shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-1">
              <span className="font-bold block">
                {isAr ? 'سياسة عزل وسرية بيانات الموردين:' : 'Supplier Data Segregation Policy:'}
              </span>
              <p className="leading-relaxed">
                {isAr
                  ? 'التزاماً بقواعد حوكمة المشتريات بمؤسسة الإمارات للتعليم المدرسي، تخضع جلسات مزودي الخدمة لعزل تقني تام وصارم لبيانات كوادرهم. لا يحق لأي مورد الاطلاع على عقود، أو قوائم أسعار، أو سجلات موظفي، أو البيانات المصرفية للمزود المنافس. تتطلب أي عمليات نقل بين الموردين موافقة خطية مسبقة من إدارة المؤسسة.'
                  : 'In strict adherence to EDE procurement rules, each supplier portal session is strictly isolated to its respective assigned personnel. Neither supplier can view the contracts, rate cards, employee rosters, or banking details of the competing provider. Cross-supplier transfers require affirmative written authorization from the EDE Administration team.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
