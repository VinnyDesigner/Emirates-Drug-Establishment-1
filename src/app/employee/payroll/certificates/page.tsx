'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CertificatePreviewModal } from '@/components/modals/CertificatePreviewModal';
import { StatusBadge } from '@/components/common/StatusBadge';
import { CertificateRequest } from '@/lib/types';
import {
  FileSignature,
  PlusCircle,
  Clock,
  Printer,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  FileText,
  Building2,
} from 'lucide-react';

export default function CertificatesPage() {
  const { certificates, submitCertificateRequest } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [certType, setCertType] = useState<'salary' | 'employment'>('salary');
  const [certDocFormat, setCertDocFormat] = useState<'en' | 'ar' | 'both'>('both');
  const [purpose, setPurpose] = useState('');
  const [addressedTo, setAddressedTo] = useState(isAr ? 'إلى من يهمه الأمر' : 'To Whom It May Concern');
  const [selectedCert, setSelectedCert] = useState<CertificateRequest | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) {
      setError(isAr ? 'يرجى تحديد الغرض من الشهادة.' : 'Please provide the certificate purpose.');
      return;
    }

    submitCertificateRequest({
      certificateType: certType,
      language: certDocFormat,
      purpose: purpose.trim(),
      addressedTo: addressedTo.trim() || (isAr ? 'إلى من يهمه الأمر' : 'To Whom It May Concern'),
    });

    setIsFormOpen(false);
    setPurpose('');
    setError('');
  };

  const openPreview = (c: CertificateRequest) => {
    setSelectedCert(c);
    setIsPreviewOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'الشهادات الرسمية' : 'Official Certificates'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الرواتب' : 'Payroll', href: '/employee/payroll/payslips' },
            { label: isAr ? 'الشهادات' : 'Certificates' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'طلبات الشهادات الرسمية' : 'Official Certificate Requests'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'شهادات إلكترونية رسمية بختم رقمي تصدر وفق اتفاقية مستوى الخدمة خلال يومي عمل.'
                  : 'Official electronic certificates generated with digital stamps under RFP 2-working-day issuance SLA.'}
              </p>
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {isFormOpen
                  ? (isAr ? 'إغلاق النموذج' : 'Close Form')
                  : (isAr ? 'طلب شهادة جديدة' : 'Request New Certificate')}
              </span>
            </button>
          </div>

          {/* RFP SLA Banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4 text-xs text-sky-900">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#2463A6] shrink-0" />
              <div>
                <span className="font-bold">
                  {isAr ? 'مستهدف اتفاقية مستوى الخدمة RFP بند 3.7: ' : 'RFP Section 3.7 SLA Target: '}
                </span>
                <span>
                  {isAr
                    ? 'إصدار الوثائق والشهادات خلال يومي عمل (48 ساعة) من تقديم الطلب.'
                    : 'Document & Certificate Issuance within 2 working days (48 hours) from request submission.'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] shrink-0">
              {isAr ? 'نسبة الالتزام 99.1%' : '99.1% Compliance'}
            </span>
          </div>

          {/* New Request Modal Form Accordion */}
          {isFormOpen && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr ? 'تقديم طلب شهادة' : 'Submit Certificate Application'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'حدد نوع الشهادة والجهة المستلمة المقصودة.' : 'Select certificate parameters and intended institutional recipient.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'نوع الشهادة' : 'Certificate Type'}
                    </label>
                    <select
                      value={certType}
                      onChange={(e) => setCertType(e.target.value as 'salary' | 'employment')}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-[#2463A6]"
                    >
                      <option value="salary">
                        {isAr ? 'شهادة راتب (مع جدول البدلات والمكافآت الكامل)' : 'Salary Certificate (With Full Compensation Schedule)'}
                      </option>
                      <option value="employment">
                        {isAr ? 'شهادة استمرارية عمل (إثبات الخدمة المستمرة)' : 'Employment Certificate (Verification of Continuous Service)'}
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'لغة الشهادة' : 'Language Format'}
                    </label>
                    <select
                      value={certDocFormat}
                      onChange={(e) => setCertDocFormat(e.target.value as 'en' | 'ar' | 'both')}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-[#2463A6]"
                    >
                      <option value="both">
                        {isAr ? 'ثنائية اللغة (عربي وإنجليزي) - قياسي' : 'Bilingual (English & Arabic) - Standard'}
                      </option>
                      <option value="en">
                        {isAr ? 'الإنجليزية فقط' : 'English Only'}
                      </option>
                      <option value="ar">
                        {isAr ? 'العربية فقط' : 'Arabic Only (باللغة العربية فقط)'}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'موجهة إلى (الجهة المستلمة)' : 'Addressed To (Recipient Entity)'}
                    </label>
                    <input
                      type="text"
                      value={addressedTo}
                      onChange={(e) => setAddressedTo(e.target.value)}
                      placeholder={isAr ? 'مثال: بنك أبوظبي الأول / سفارة فرنسا / لمن يهمه الأمر' : 'e.g. First Abu Dhabi Bank / French Embassy / To Whom It May Concern'}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'الغرض من الطلب' : 'Purpose of Request'}
                    </label>
                    <input
                      type="text"
                      required
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder={isAr ? 'مثال: طلب تمويل عقاري / تأشيرة شنغن / شراء مركبة' : 'e.g. Mortgage application / Schengen visa / Personal vehicle financing'}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-rose-600 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </p>
                )}

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00B3AA]" />
                    <span>{isAr ? 'إرسال إلى خدمات المورد' : 'Submit to Supplier Services'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Certificate Requests Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل وحالة طلبات الشهادات' : 'Certificate Status & Issuance Log'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الشهادة' : 'Certificate Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'موجهة إلى' : 'Addressed To'}</th>
                    <th className="py-3 px-2">{isAr ? 'الغرض' : 'Purpose'}</th>
                    <th className="py-3 px-2">{isAr ? 'اللغة' : 'Language'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ التقديم' : 'Submitted'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{cert.requestId}</td>
                      <td className="py-3.5 px-2 font-medium">
                        {cert.certificateType === 'salary'
                          ? (isAr ? 'شهادة راتب' : 'Salary Certificate')
                          : (isAr ? 'شهادة استمرارية عمل' : 'Employment Certificate')}
                      </td>
                      <td className="py-3.5 px-2 text-slate-700 font-medium">{cert.addressedTo}</td>
                      <td className="py-3.5 px-2 text-slate-600 max-w-xs truncate">{cert.purpose}</td>
                      <td className="py-3.5 px-2 uppercase text-slate-500">{cert.language}</td>
                      <td className="py-3.5 px-2 text-slate-500">
                        {new Date(cert.submittedAt).toLocaleDateString(isAr ? 'ar-AE' : 'en-GB')}
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={cert.status} />
                      </td>
                      <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap">
                        {cert.status === 'issued' ? (
                          <button
                            onClick={() => openPreview(cert)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>{isAr ? 'معاينة وطباعة PDF' : 'Preview & Print PDF'}</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-amber-600 font-medium flex items-center justify-end rtl:justify-start gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{isAr ? 'قيد المعالجة (اتفاقية 48 ساعة)' : 'Processing (SLA 48h)'}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <CertificatePreviewModal
        certificate={selectedCert}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
