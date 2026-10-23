'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import { exportToCSV } from '@/lib/export-utils';
import {
  Gift,
  Plane,
  Award,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function SupplierBenefitsDeskPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { airTickets, employees } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(
      airTickets.map((t) => ({
        Request_ID: t.requestId,
        Employee: t.employeeName,
        Benefit_Type: t.benefitType,
        Route: `${t.origin} → ${t.destination}`,
        Departure: t.departureDate,
        Status: t.status,
      })),
      'EDE-Supplier-Flight-Benefits-Register'
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
                <Gift className="w-3.5 h-3.5 text-[#008F88]" />
                <span>
                  {isAr
                    ? 'إدارة المزايا والمستحقات النظامية (كراسة الشروط بند 3.5.1)'
                    : 'BENEFITS & ENTITLEMENTS ADMINISTRATION (RFP SECTION 3.5.1)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'مكتب حجوزات تذاكر الطيران والمستحقات النظامية' : 'Air Ticket Bookings & Statutory Benefits Desk'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'تنسيق إصدار تذاكر السفر وتخصيص رموز الحجز (PNR) ومستحقات نهاية الخدمة وفق قانون العمل الاتحادي.'
                  : 'Coordination of flight allowance issuance, PNR code assignment, and UAE Federal Labor Law End-of-Service accruals.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير سجل المزايا' : 'Export Benefits Log'}</span>
            </button>
          </div>

          {/* Air Tickets Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'طلبات تذاكر الطيران المعلقة والمنجزة' : 'Pending & Processed Air Ticket Requisitions'}
              </h3>
              <span className="text-xs text-slate-400">
                {isAr ? 'استحقاق السفر السنوي' : 'Annual Travel Entitlement'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'رقم الطلب' : 'Request Ref'}</th>
                    <th className="py-3 px-4">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-4">{isAr ? 'نوع الميزة' : 'Benefit Type'}</th>
                    <th className="py-3 px-4">{isAr ? 'خط السير' : 'Routing'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'تاريخ المغادرة' : 'Departure Date'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'رمز الحجز / التذكرة' : 'PNR / Ticket'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {airTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#2463A6]">{t.requestId}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{t.employeeName}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {isAr
                          ? (t.benefitType === 'Annual Home Leave'
                              ? 'تذكرة الإجازة السنوية للوطن'
                              : t.benefitType === 'Family Vacation'
                              ? 'إجازة عائلية'
                              : 'رحلة انتقال واستقرار')
                          : t.benefitType}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800" dir="ltr">{t.origin} → {t.destination}</td>
                      <td className="py-3.5 px-4 text-center text-slate-600">{t.departureDate}</td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge status={t.status as any} />
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-700">
                        {t.pnrCode || (isAr ? 'بانتظار الإصدار' : 'Awaiting Issuance')}
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
