'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  FolderArchive,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Filter,
} from 'lucide-react';

export default function SupplierDocumentsVerificationPage() {
  const { documents, uploadReplacementDocument } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const urgentDocs = documents.filter((d) => d.renewalUrgent || d.daysUntilExpiry <= 30);

  const handleCompleteRenewal = (docId: string, fileName: string) => {
    uploadReplacementDocument(docId, `PRO_Renewed_${fileName}`, '2028-11-20');
    setSuccessMsg(isAr ? 'تم اعتماد ملف التجديد وأرشفته بنجاح ضمن الأرشيف الإلكتروني.' : 'Residency renewal dossier committed to electronic archive.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'عمليات تجديد الوثائق والامتثال للرقابة' : 'Document Expiry & PRO Renewal Operations'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'الوثائق والتجديدات' : 'Documents' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'عمليات تجديد وثائق القوى العاملة ومتابعة العلاقات الحكومية (PRO)' : 'Workforce Document Compliance & Renewal Operations'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'تتبع مهام فريق العلاقات الحكومية لتحقيق مستهدف اتفاقية مستوى الخدمة RFP بند 3.7 بإتمام التجديد قبل 30 يوماً من انتهاء الصلاحية.'
                : 'PRO task tracking to meet the RFP Section 3.7 SLA target of completing renewals 30 days before document expiry.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          {/* Urgent Renewal Queue (Section 3.7 SLA 30 Days Target) */}
          <div className="bg-white rounded-3xl border border-amber-300 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold">
                  {isAr ? 'قائمة التجديد العاجل خلال 30 يوماً (مؤشر SLA رقم 6)' : 'Active 30-Day Renewal Queue (SLA Indicator 6)'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {isAr ? `${urgentDocs.length} إجراءات مطلوبة` : `${urgentDocs.length} Action(s) Due`}
              </span>
            </div>

            <div className="space-y-3">
              {urgentDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{doc.employeeName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                        {doc.employeeId}
                      </span>
                      <span className="font-bold text-rose-600 font-mono">
                        &bull; {isAr ? `متبقي ${doc.daysUntilExpiry} يوماً` : `${doc.daysUntilExpiry} Days Remaining`}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">
                      {isAr ? doc.categoryLabelAr : doc.categoryLabelEn} ({isAr ? 'المرجع: ' : 'Ref: '}
                      <span className="font-mono">{doc.documentNumber}</span>)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isAr ? `تاريخ الانتهاء الرسمي: ${doc.expiryDate} • المستهدف: إتمام التجديد قبل 30 يوماً` : `Official Expiry Date: ${doc.expiryDate} • Target: Complete renewal before T-30 days`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCompleteRenewal(doc.id, doc.fileName)}
                      className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      {isAr ? 'إتمام التجديد الحكومي والتحقق' : 'Complete PRO Renewal & Verify'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Documents Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'كافة وثائق الكوادر وسجل الصلاحيات' : 'All Document Records'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'الفئة' : 'Category'}</th>
                    <th className="py-3 px-2">{isAr ? 'رقم الوثيقة' : 'Document Number'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأيام المتبقية' : 'Days Remaining'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900">{doc.employeeName}</td>
                      <td className="py-3.5 px-2 font-medium">
                        {isAr ? doc.categoryLabelAr : doc.categoryLabelEn}
                      </td>
                      <td className="py-3.5 px-2 font-mono text-slate-700">{doc.documentNumber}</td>
                      <td className="py-3.5 px-2 font-mono text-slate-600">{doc.expiryDate}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-xs">
                        <span className={doc.daysUntilExpiry <= 30 ? 'text-rose-600' : 'text-slate-800'}>
                          {doc.daysUntilExpiry} {isAr ? 'يوماً' : 'days'}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={doc.verificationStatus} />
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
