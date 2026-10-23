'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { CertificatePreviewModal } from '@/components/modals/CertificatePreviewModal';
import { CertificateRequest } from '@/lib/types';
import {
  FileSignature,
  Clock,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function SupplierCertificatesFulfillmentPage() {
  const { certificates, fulfillCertificate } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateRequest | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleIssue = (certId: string) => {
    fulfillCertificate(certId, 'issued');
    setSuccessMsg(isAr ? 'تم ختم الشهادة رقمياً وإصدارها للموظف ضمن اتفاقية مستوى الخدمة.' : 'Certificate digitally sealed and issued to employee within SLA.');
    setTimeout(() => setSuccessMsg(''), 3000);
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
          pageTitle={isAr ? 'توليد الشهادات والامتثال لاتفاقية الخدمة' : 'Certificate Generation & SLA Fulfillment'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'إصدار الشهادات' : 'Certificates' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'قائمة إصدار الشهادات الرسمية للموظفين' : 'Official Certificate Issuance Queue'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'التزام تعاقدي بإصدار الشهادات خلال يومي عمل (48 ساعة) مع توقيع رقمي معتمد ورمز استجابة سريعة (QR).'
                : 'Contractual 2-working-day issuance SLA (Section 3.7) with digital signature stamps and automated QR verification.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          {/* SLA Indicator Banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4 text-xs text-sky-900">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#2463A6] shrink-0" />
              <div>
                <span className="font-bold">
                  {isAr ? 'مستهدف اتفاقية مستوى الخدمة RFP بند 3.7 (مؤشر 4): ' : 'RFP Section 3.7 Indicator 4 Benchmark: '}
                </span>
                <span>
                  {isAr
                    ? 'إصدار شهادات الراتب والخبرة خلال يومي عمل (48 ساعة) من تقديم الطلب.'
                    : 'Issue official salary or employment certificate within 2 working days (48 hours).'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] shrink-0">
              {isAr ? 'نسبة الامتثال 100%' : '100% On-Time SLA'}
            </span>
          </div>

          {/* Queue Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'طلبات الشهادات الواردة' : 'Incoming Certificate Applications'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الشهادة' : 'Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'اللغة' : 'Format'}</th>
                    <th className="py-3 px-2">{isAr ? 'الجهة الموجه إليها' : 'Addressed To'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Fulfillment Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{cert.id}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">{cert.employeeName}</td>
                      <td className="py-3.5 px-2 font-medium">
                        {isAr
                          ? (cert.certificateType === 'salary' ? 'شهادة راتب ومستحقات' : 'شهادة استمرارية عمل')
                          : (cert.certificateType === 'salary' ? 'Salary Certificate' : 'Employment Certificate')}
                      </td>
                      <td className="py-3.5 px-2 uppercase text-[10px] font-bold text-slate-600 font-mono">
                        {isAr
                          ? (cert.language === 'both' ? 'ثنائي (عربي/إنجليزي)' : cert.language === 'ar' ? 'عربي' : 'إنجليزي')
                          : cert.language}
                      </td>
                      <td className="py-3.5 px-2 text-slate-700 max-w-xs truncate">{cert.addressedTo}</td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={cert.status} />
                      </td>
                      <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => openPreview(cert)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                        >
                          {isAr ? 'معاينة المسودة' : 'Preview'}
                        </button>
                        {cert.status !== 'issued' && (
                          <button
                            onClick={() => handleIssue(cert.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                          >
                            {isAr ? 'ختم وإصدار رقمي' : 'Digitally Seal & Issue'}
                          </button>
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
