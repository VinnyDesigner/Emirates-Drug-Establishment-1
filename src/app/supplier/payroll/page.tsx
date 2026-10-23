'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/export-utils';
import {
  DollarSign,
  Download,
  Building2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Send,
  FileCheck2,
} from 'lucide-react';

export default function SupplierPayrollCyclePage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { employees } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cycleStatus, setCycleStatus] = useState<'Reconciled' | 'Batch SIF Generated' | 'Dispatched to CBUAE'>('Batch SIF Generated');

  const supplierEmployees = employees.filter((e) => e.supplierEn.includes('Tamimi'));
  const totalBasic = supplierEmployees.length * 22500;
  const totalAllowances = supplierEmployees.length * 15000;
  const totalGross = totalBasic + totalAllowances;

  const handleExportWps = () => {
    exportToCSV(
      supplierEmployees.map((e) => ({
        Employee_ID: e.employeeId,
        Full_Name: e.fullNameEn,
        Bank: e.bankDetails.bankName,
        IBAN: e.bankDetails.fullIbanForSupplierView || e.bankDetails.maskedIban,
        Basic_Salary_AED: 22500,
        Housing_Transport_Allowance_AED: 15000,
        Net_Salary_AED: 37500,
        WPS_Status: 'Ready for Central Bank SIF Transfer',
      })),
      'WPS-Salary-Information-File-SIF-Oct2026'
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {isAr
                    ? 'مطابقة نظام حماية الأجور (WPS) لمصرف الإمارات المركزي'
                    : 'UAE CENTRAL BANK WAGE PROTECTION SYSTEM (WPS) RECONCILIATION'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'إدارة مسيرات الرواتب الشهرية وتوليد ملف حماية الأجور (SIF)' : 'Monthly Payroll Administration & SIF Generation'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'الالتزام التعاقدي لمستوى الخدمة: تحويل الرواتب قبل حلول اليوم الأول من الشهر التالي (بند 3.7 المؤشر 3).'
                  : 'Contractual SLA: Salaries dispatched no later than the 1st day of the following month (Section 3.7 Indicator 3).'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportWps}
                className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{isAr ? 'تصدير ملف SIF' : 'Export SIF (WPS)'}</span>
              </button>
              <Link
                href="/supplier/payslips"
                className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{isAr ? 'نشر قسائم الرواتب' : 'Publish Payslips'}</span>
              </Link>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {isAr ? 'القوى العاملة المسندة' : 'Assigned Workforce'}
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {supplierEmployees.length} {isAr ? 'أخصائيين' : 'Specialists'}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                {isAr ? 'تم التحقق من الآيبان 100%' : '100% IBAN Verified'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {isAr ? 'إجمالي مسير الرواتب الشهري' : 'Monthly Gross Payroll'}
              </span>
              <span className="text-2xl font-black text-[#142B52] mt-1 block">
                {isAr ? `${(totalGross / 1000).toFixed(0)} ألف درهم` : `AED ${(totalGross / 1000).toFixed(0)}k`}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'أساسي + سكن + انتقال' : 'Fixed + Housing + Transport'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {isAr ? 'مؤشر دقة الرواتب' : 'Payroll Accuracy KPI'}
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">99.8%</span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'المستهدف: ≥99% (المؤشر 10)' : 'Target: ≥99% (SLA Ind 10)'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {isAr ? 'حالة دورة حماية الأجور' : 'WPS Cycle Status'}
              </span>
              <span className="text-sm font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200 mt-1 inline-block">
                {isAr
                  ? cycleStatus === 'Batch SIF Generated'
                    ? 'تم توليد حزمة SIF'
                    : cycleStatus === 'Dispatched to CBUAE'
                    ? 'أُرسل للمصرف المركزي'
                    : 'تمت التسوية'
                  : cycleStatus}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'مجدولة للأول من الشهر' : 'Scheduled for 1st of month'}
              </span>
            </div>
          </div>

          {/* Payroll Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr
                  ? 'كشف تحويلات الرواتب التفصيلية لأكتوبر 2026 (جدول ملف SIF)'
                  : 'October 2026 Itemized Salary Dispatches (WPS SIF Schedule)'}
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {isAr ? 'شركة التميمي لخدمات القوى العاملة ذ.م.م' : 'Al Tamimi Manpower Services LLC'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-4">{isAr ? 'إدارة المؤسسة' : 'EDE Department'}</th>
                    <th className="py-3 px-4">{isAr ? 'اسم البنك' : 'Bank Name'}</th>
                    <th className="py-3 px-4 font-mono">{isAr ? 'رقم الآيبان الكامل' : 'Unmasked IBAN'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'الراتب الأساسي' : 'Basic Salary'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'البدلات' : 'Allowances'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'صافي المستحق' : 'Net Payable'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierEmployees.slice(0, 10).map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {isAr ? (emp.fullNameAr || emp.fullNameEn) : emp.fullNameEn}
                        <span className="font-mono text-[10px] text-slate-400 block">{emp.employeeId}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {isAr ? (emp.departmentAr || emp.departmentEn) : emp.departmentEn}
                      </td>
                      <td className="py-3 px-4 text-slate-800">{emp.bankDetails.bankName}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600" dir="ltr">
                        {emp.bankDetails.fullIbanForSupplierView || emp.bankDetails.maskedIban}
                      </td>
                      <td className="py-3 px-4 text-right rtl:text-left font-semibold">
                        {isAr ? '22,500 درهم' : 'AED 22,500'}
                      </td>
                      <td className="py-3 px-4 text-right rtl:text-left font-semibold">
                        {isAr ? '15,000 درهم' : 'AED 15,000'}
                      </td>
                      <td className="py-3 px-4 text-right rtl:text-left font-bold text-[#142B52]">
                        {isAr ? '37,500 درهم' : 'AED 37,500'}
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
