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
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  AlertTriangle,
  Building2,
  FileCheck2,
} from 'lucide-react';

export default function SupplierTransfersPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { transfers, submitTransferRequest, reviewTransferRequest } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [employeeName, setEmployeeName] = useState('Sara Al Suwaidi');
  const [employeeId, setEmployeeId] = useState('EDE-EMP-1025');
  const [department, setDepartment] = useState('Clinical Trials & Research');
  const [currentSupplier, setCurrentSupplier] = useState('Al Tamimi Manpower Services');
  const [targetSupplier, setTargetSupplier] = useState('Apex Solutions');
  const [reason, setReason] = useState('Operational reallocation authorized by EDE Directorate');
  const [effectiveDate, setEffectiveDate] = useState('2026-11-15');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    submitTransferRequest({
      employeeId,
      employeeName,
      department,
      currentSupplier,
      targetSupplier,
      reason,
      effectiveDate,
    });
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(
      transfers.map((t) => ({
        Transfer_Ref: t.transferNumber,
        Employee_ID: t.employeeId,
        Employee_Name: t.employeeName,
        Department: t.department,
        From_Supplier: t.currentSupplier,
        To_Supplier: t.targetSupplier,
        Request_Date: t.requestDate,
        Effective_Date: t.effectiveDate,
        EDE_Approval: t.edeApprovalStatus,
      })),
      'EDE-Supplier-Transfers-Register'
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {isAr
                    ? 'حوكمة النقل والتحويل بين الموردين'
                    : 'CROSS-SUPPLIER TRANSFERS & GOVERNANCE'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'نقل الكوادر المؤجرة بين شركات التزويد' : 'Outsourced Personnel Inter-Supplier Transfers'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'إدارة تسليم ونقل العقود بين شركة التميمي وشركة أبيكس وفق التفويض الإلزامي لمؤسسة الإمارات للدواء.'
                  : 'Managed handover and contract migration between Al Tamimi Manpower and Apex Solutions subject to mandatory EDE authorization.'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{isAr ? 'تصدير السجل' : 'Export Log'}</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>{isAr ? 'طلب نقل كادر' : 'Request Transfer'}</span>
              </button>
            </div>
          </div>

          {/* Transfers Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'أرشيف طلبات نقل الكوادر بين الموردين' : 'Workforce Supplier Transfers Archive'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'رقم النقل' : 'Transfer Ref'}</th>
                    <th className="py-3 px-4">{isAr ? 'بيانات الموظف' : 'Employee Details'}</th>
                    <th className="py-3 px-4">{isAr ? 'المورد الحالي' : 'Current Supplier'}</th>
                    <th className="py-3 px-4">{isAr ? 'المورد المنقول إليه' : 'Target Supplier'}</th>
                    <th className="py-3 px-4">{isAr ? 'تاريخ السريان' : 'Effective Date'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'اعتماد المؤسسة' : 'EDE Authorization'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'قائمة الاستلام' : 'Handover Checklist'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transfers.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#2463A6]">
                        {t.transferNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{t.employeeName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{t.employeeId} • {t.department}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {t.currentSupplier}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {t.targetSupplier}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {t.effectiveDate}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            t.edeApprovalStatus === 'Approved by EDE'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : t.edeApprovalStatus === 'Rejected by EDE'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {isAr
                            ? t.edeApprovalStatus === 'Approved by EDE'
                              ? 'معتمد من المؤسسة'
                              : t.edeApprovalStatus === 'Rejected by EDE'
                              ? 'مرفوض من المؤسسة'
                              : 'قيد الاعتماد من المؤسسة'
                            : t.edeApprovalStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${t.handoverChecklistCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.handoverChecklistCompleted ? (isAr ? 'مكتمل' : 'Completed') : (isAr ? 'معلق' : 'Pending')}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? 'تقديم طلب نقل بين الموردين' : 'Initiate Supplier Transfer Request'}
                </h3>
                <form onSubmit={handleCreate} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'اسم الموظف ورقمه' : 'Employee Name & ID'}
                    </label>
                    <input
                      type="text"
                      required
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'المورد المنقول إليه' : 'Target Supplier'}
                    </label>
                    <select
                      value={targetSupplier}
                      onChange={(e) => setTargetSupplier(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="Apex Solutions">Apex Solutions</option>
                      <option value="Al Tamimi Manpower Services">Al Tamimi Manpower Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'تاريخ السريان المستهدف' : 'Target Effective Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'مبررات النقل' : 'Reason for Transfer'}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1.5 rounded-lg border text-slate-600"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#142B52] text-white font-bold rounded-lg"
                    >
                      {isAr ? 'إرسال للاعتماد من المؤسسة' : 'Submit for EDE Authorization'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
