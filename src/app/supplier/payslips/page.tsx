'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  FileCheck2,
  Send,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Building2,
} from 'lucide-react';

export default function SupplierPayslipBatchPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { employees } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [isPublished, setIsPublished] = useState(false);

  const supplierEmployees = employees.filter((e) => e.supplierEn.includes('Tamimi'));

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'توزيع حزم قسائم الرواتب الإلكترونية' : 'Electronic Payslip Batch Distribution'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'إصدار وتوزيع قسائم الرواتب المفصلة في محافظ الخدمة الذاتية للموظفين.'
                  : 'Generate and distribute itemized electronic payslips to employee self-service vaults.'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="October 2026">{isAr ? 'دفعة أكتوبر 2026' : 'October 2026 Batch'}</option>
                <option value="September 2026">{isAr ? 'دفعة سبتمبر 2026' : 'September 2026 Batch'}</option>
                <option value="August 2026">{isAr ? 'دفعة أغسطس 2026' : 'August 2026 Batch'}</option>
              </select>

              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isAr
                    ? `نشر الحزمة (${supplierEmployees.length})`
                    : `Publish Batch (${supplierEmployees.length})`}
                </span>
              </button>
            </div>
          </div>

          {isPublished && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isAr
                  ? `تم نشر ${supplierEmployees.length} قسيمة دفع إلكترونية لدفعة ${selectedMonth} بنجاح! تم إشعار الموظفين عبر التنبيهات المباشرة.`
                  : `Successfully published ${supplierEmployees.length} electronic payslips for ${selectedMonth}! Employees received automated push notifications.`}
              </span>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr
                  ? `قسائم الرواتب الجاهزة للتوزيع — ${selectedMonth}`
                  : `Payslips Ready for Distribution — ${selectedMonth}`}
              </h3>
              <span className="text-xs text-slate-400">
                {isAr ? 'نموذج متوافق مع نظام حماية الأجور' : 'WPS Compliant Template'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-4">{isAr ? 'الإدارة / القسم' : 'Department'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'صافي الراتب' : 'Net Salary'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'فترة الدفعة' : 'Batch Period'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'حالة التسليم' : 'Delivery Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierEmployees.slice(0, 10).map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {isAr ? (emp.fullNameAr || emp.fullNameEn) : emp.fullNameEn}
                        <span className="font-mono text-[10px] text-slate-400 block">{emp.employeeId}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {isAr ? (emp.departmentAr || emp.departmentEn) : emp.departmentEn}
                      </td>
                      <td className="py-3.5 px-4 text-right rtl:text-left font-bold text-slate-900">
                        {isAr ? '37,500 درهم' : 'AED 37,500'}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-600">{selectedMonth}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {isAr ? 'جاهز في محفظة الخدمة الذاتية' : 'Ready in ESS Vault'}
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
