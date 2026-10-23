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
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  UserCheck,
  Filter,
} from 'lucide-react';

export default function SupplierLeaveAdministrationPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { leaveRequests, employees, currentUser } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(
      leaveRequests.map((l) => ({
        Leave_ID: l.requestId,
        Employee: l.employeeName,
        Department: l.department,
        Leave_Type: l.leaveType,
        Start_Date: l.startDate,
        End_Date: l.endDate,
        Days: l.days,
        Status: l.status,
      })),
      'EDE-Supplier-Leave-Ledger'
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
                <CalendarDays className="w-3.5 h-3.5 text-[#008F88]" />
                <span>
                  {isAr
                    ? 'تسوية إجازات الكوادر الخارجية المؤجرة'
                    : 'OUTSOURCED WORKFORCE LEAVE RECONCILIATION'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'إدارة إجازات المزوّد وسجل الأرصدة المستحقة' : 'Supplier Leave Administration & Balance Ledger'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'مطابقة الإجازات المعتمدة من مديري المؤسسة المباشرين مع أرصدة الاستحقاق التعاقدية للمورد.'
                  : 'Reconciliation of EDE line manager approved leaves against supplier contractual entitlement balances.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير سجل الإجازات' : 'Export Leave Ledger'}</span>
            </button>
          </div>

          {/* Leave Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل إدارة إجازات القوى العاملة' : 'Workforce Leave Administration Ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'رقم الإجازة' : 'Leave Ref'}</th>
                    <th className="py-3 px-4">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-4">{isAr ? 'الإدارة / القسم' : 'Department'}</th>
                    <th className="py-3 px-4">{isAr ? 'نوع الإجازة' : 'Leave Type'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'التواريخ (المدة)' : 'Dates (Duration)'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'التسوية في الرواتب' : 'Payroll Settlement'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveRequests.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#2463A6]">
                        {l.requestId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {l.employeeName}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {l.department}
                      </td>
                      <td className="py-3.5 px-4 capitalize font-semibold text-slate-800">
                        {isAr
                          ? l.leaveType === 'annual'
                            ? 'إجازة اعتيادية سنوية'
                            : l.leaveType === 'sick'
                            ? 'إجازة مرضية معتمدة'
                            : 'إجازة طارئة'
                          : `${l.leaveType} Leave`}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-700">
                        {l.startDate} → {l.endDate} ({l.days} {isAr ? 'أيام' : 'days'})
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge status={l.status} />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${l.status === 'approved' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            {l.status === 'approved'
                              ? isAr ? 'تم الخصم من الرصيد' : 'Balance Debited'
                              : isAr ? 'بانتظار اعتماد المدير' : 'Pending Line Mgr'}
                          </span>
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
