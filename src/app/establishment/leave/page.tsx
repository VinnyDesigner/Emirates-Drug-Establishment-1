'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { CalendarDays, CheckCircle2, Clock, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentLeaveAnalyticsPage() {
  const { leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleExport = () => {
    exportToCSV('EDE_Establishment_Leave_Ledger', leaveRequests, [
      { key: 'requestId', label: isAr ? 'رقم الطلب' : 'Request ID' },
      { key: 'employeeName', label: isAr ? 'اسم الموظف' : 'Employee Name' },
      { key: 'department', label: isAr ? 'الإدارة' : 'Department' },
      { key: 'leaveType', label: isAr ? 'نوع الإجازة' : 'Leave Type' },
      { key: 'startDate', label: isAr ? 'تاريخ البدء' : 'Start Date' },
      { key: 'endDate', label: isAr ? 'تاريخ الانتهاء' : 'End Date' },
      { key: 'days', label: isAr ? 'عدد الأيام' : 'Days' },
      { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      { key: 'reviewedBy', label: isAr ? 'المسؤول المعتمد' : 'Reviewed By' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تحليلات الإجازات وحوكمة الغياب لكوادر المنشأة' : 'Establishment-Wide Leave Analytics'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'تحليلات الإجازات' : 'Leave Analytics' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'حوكمة استهلاك الإجازات ومعدلات الغياب للمنشأة' : 'Workforce Leave Utilization & Absence Governance'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'مؤشرات شاملة على مستوى المنشأة حول استخدام الإجازات النظامية والموافقات المعلقة والامتثال للتدقيق.'
                  : 'Establishment-wide metrics on statutory leave utilization, pending authorizations, and audit compliance.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير سجل الإجازات (CSV)' : 'Export Leave Ledger (CSV)'}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل غياب وإجازات القوى العاملة' : 'Workforce Absence Ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الإجازة' : 'Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'التواريخ' : 'Dates'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأيام' : 'Days'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{req.requestId}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">{req.employeeName}</td>
                      <td className="py-3.5 px-2 text-slate-600">{t(req.department)}</td>
                      <td className="py-3.5 px-2 capitalize font-medium">{t(req.leaveType)}</td>
                      <td className="py-3.5 px-2 font-mono text-slate-600 text-[11px]">
                        {req.startDate} → {req.endDate}
                      </td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">
                        {req.days} {isAr ? 'أيام' : 'days'}
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={req.status} />
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
