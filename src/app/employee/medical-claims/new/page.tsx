'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import {
  HeartPulse,
  ArrowLeft,
  Calendar,
  Building2,
  DollarSign,
  Upload,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function NewMedicalClaimPage() {
  const router = useRouter();
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { submitMedicalClaim } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [claimCategory, setClaimCategory] = useState<'Consultation & Lab' | 'Pharmacy' | 'Dental' | 'Optical' | 'Emergency Inpatient'>('Consultation & Lab');
  const [treatmentDate, setTreatmentDate] = useState('2026-10-21');
  const [claimedAmount, setClaimedAmount] = useState(850);
  const [providerClinic, setProviderClinic] = useState('Mediclinic Al Noor Hospital');
  const [invoiceNumber, setInvoiceNumber] = useState('MC-2026-9912');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMedicalClaim({
      claimCategory,
      treatmentDate,
      claimedAmountAed: claimedAmount,
      providerClinic,
      invoiceNumber,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/employee/medical-claims');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/employee/medical-claims"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'تقديم طلب استرداد نفقات علاج طبي' : 'Submit Medical Reimbursement Claim'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'رفع الفواتير والوصفات الطبية للعلاجات التي تمت خارج شبكة التأمين المباشرة.'
                  : 'Upload clinic invoices and prescriptions for out-of-network healthcare treatments.'}
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم تقديم المطالبة بنجاح' : 'Claim Submitted Successfully'}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isAr
                  ? 'تم تعيين رقم مرجعي للمطالبة وتوجيهها لمكتب التأمين لاعتماد التعويض. جارٍ التحويل...'
                  : 'Your claim has been assigned a tracking reference and routed to the insurance desk for underwriter adjudication. Redirecting...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'تصنيف المعاملة العلاجية' : 'Claim Treatment Category'}
                </label>
                <select
                  value={claimCategory}
                  onChange={(e) => setClaimCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                >
                  <option value="Consultation & Lab">{isAr ? 'كشف العيادات الخارجية والتحاليل التشخيصية' : 'Outpatient Consultation & Diagnostic Lab'}</option>
                  <option value="Pharmacy">{isAr ? 'صرف الوصفات الدوائية والصيدلية' : 'Prescription Pharmacy & Medications'}</option>
                  <option value="Dental">{isAr ? 'علاج ورعاية الأسنان واللثة' : 'Dental Care & Periodontics'}</option>
                  <option value="Optical">{isAr ? 'فحص البصر والعدسات الطبية' : 'Optical Lenses & Vision Assessment'}</option>
                  <option value="Emergency Inpatient">{isAr ? 'التنويم بالمستشفى وحالات الطوارئ' : 'Hospital Inpatient & Emergency Care'}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'تاريخ تلقي العلاج' : 'Treatment Date'}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={treatmentDate}
                      onChange={(e) => setTreatmentDate(e.target.value)}
                      className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'المبلغ المطالب به (درهم)' : 'Claimed Amount (AED)'}
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={claimedAmount}
                      onChange={(e) => setClaimedAmount(Number(e.target.value))}
                      className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'اسم المركز الطبي / المستشفى' : 'Medical Provider / Clinic Name'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={providerClinic}
                      onChange={(e) => setProviderClinic(e.target.value)}
                      className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'رقم الفاتورة الضريبية / الإيصال' : 'Tax Invoice / Receipt Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'إرفاق الفاتورة الضريبية المفصلة والتقرير الطبي' : 'Upload Itemized Tax Receipt & Medical Report'}
                </label>
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-semibold text-slate-700 block">
                    {isAr ? 'انقر لاختيار ملف الفاتورة بصيغة PDF أو JPG' : 'Click to select invoice PDF or JPG file'}
                  </span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/employee/medical-claims"
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>{isAr ? 'إرسال مطالبة التعويض المالي' : 'Submit Claim for Reimbursement'}</span>
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
