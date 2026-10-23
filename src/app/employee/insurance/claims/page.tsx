'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  HeartPulse,
  PlusCircle,
  Upload,
  Calendar,
  DollarSign,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export default function MedicalClaimsPage() {
  const { medicalClaims, submitMedicalClaim } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [claimCategory, setClaimCategory] = useState<'Consultation & Lab' | 'Pharmacy' | 'Dental' | 'Optical' | 'Emergency Inpatient'>('Consultation & Lab');
  const [treatmentDate, setTreatmentDate] = useState('2026-10-21');
  const [claimedAmount, setClaimedAmount] = useState(850);
  const [providerClinic, setProviderClinic] = useState('Mediclinic Al Noor Hospital');
  const [invoiceNumber, setInvoiceNumber] = useState('MC-2026-9912');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMedicalClaim({
      claimCategory,
      treatmentDate,
      claimedAmountAed: claimedAmount,
      providerClinic,
      invoiceNumber,
    });
    setShowForm(false);
    setSubmittedSuccess(true);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'إدارة مطالبات التأمين الصحي' : 'Medical Claims Management'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'التأمين' : 'Insurance', href: '/employee/insurance/coverage' },
            { label: isAr ? 'المطالبات' : 'Claims' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مطالبات الاسترداد الطبي' : 'Medical Reimbursement Claims'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تقديم فواتير العلاج خارج الشبكة ومتابعة حالة التسوية من شركة التأمين.'
                  : 'Submit out-of-network treatment invoices and track insurer settlement status.'}
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showForm ? (isAr ? 'إغلاق النموذج' : 'Close Form') : (isAr ? 'مطالبة استرداد جديدة' : 'New Reimbursement Claim')}</span>
            </button>
          </div>

          {/* Form Accordion */}
          {showForm && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr ? 'تقديم فاتورة النفقات الطبية' : 'Submit Medical Expense Invoice'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'يتم التحقق من اكتمال المطالبة من قبل المورد قبل إرسالها إلكترونياً إلى شركة ضمان.'
                    : 'Claims are verified for completeness by the Supplier before electronic submission to Daman.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'فئة المطالبة' : 'Claim Category'}
                    </label>
                    <select
                      value={claimCategory}
                      onChange={(e) => setClaimCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Consultation & Lab">{isAr ? 'استشارات ومختبر' : 'Consultation & Lab'}</option>
                      <option value="Pharmacy">{isAr ? 'أدوية وصيدلية' : 'Prescription Pharmacy'}</option>
                      <option value="Dental">{isAr ? 'علاج الأسنان' : 'Dental Care'}</option>
                      <option value="Optical">{isAr ? 'بصريات ونظارات' : 'Optical & Vision'}</option>
                      <option value="Emergency Inpatient">{isAr ? 'طوارئ وتنويم بالمستشفى' : 'Emergency Hospital Care'}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'تاريخ العلاج' : 'Treatment Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={treatmentDate}
                      onChange={(e) => setTreatmentDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'المبلغ المطالب به (درهم)' : 'Claimed Amount (AED)'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={claimedAmount}
                      onChange={(e) => setClaimedAmount(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'العيادة / المستشفى المعالج' : 'Clinic / Hospital Provider'}
                    </label>
                    <input
                      type="text"
                      required
                      value={providerClinic}
                      onChange={(e) => setProviderClinic(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'رقم الفاتورة الضريبية الرسمية' : 'Official Tax Invoice Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded-xl cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {isAr ? 'إرسال المطالبة للتحقق' : 'Submit Claim for Verification'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Claims History Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل المطالبات وتتبع الاسترداد المالي' : 'Claim History & Reimbursement Tracking'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم المطالبة' : 'Claim ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الفئة' : 'Category'}</th>
                    <th className="py-3 px-2">{isAr ? 'مقدم الرعاية الصحية' : 'Healthcare Provider'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ العلاج' : 'Treatment Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'المبلغ المطالب به' : 'Claimed'}</th>
                    <th className="py-3 px-2">{isAr ? 'المعتمد / المسوى' : 'Approved / Settled'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicalClaims.map((clm) => (
                    <tr key={clm.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{clm.claimId}</td>
                      <td className="py-3.5 px-2 font-medium">{t(clm.claimCategory)}</td>
                      <td className="py-3.5 px-2 text-slate-700 font-semibold">{clm.providerClinic}</td>
                      <td className="py-3.5 px-2 text-slate-500">{clm.treatmentDate}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                        {isAr ? `${clm.claimedAmountAed.toLocaleString()} درهم` : `AED ${clm.claimedAmountAed.toLocaleString()}`}
                      </td>
                      <td className="py-3.5 px-2 font-mono font-bold text-emerald-700">
                        {clm.approvedAmountAed
                          ? (isAr ? `${clm.approvedAmountAed.toLocaleString()} درهم` : `AED ${clm.approvedAmountAed.toLocaleString()}`)
                          : (isAr ? 'قيد المراجعة' : 'Under Review')}
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={clm.status} />
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
