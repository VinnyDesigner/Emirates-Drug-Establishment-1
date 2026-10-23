'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { FolderArchive, AlertTriangle, ShieldCheck, Download, Search } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentDocumentsCompliancePage() {
  const { documents } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = documents.filter((doc) =>
    doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.categoryLabelEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.categoryLabelAr.includes(searchTerm) ||
    doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV('EDE_Document_Compliance_Audit', documents, [
      { key: 'employeeName', label: isAr ? 'اسم الموظف' : 'Employee Name' },
      { key: isAr ? 'categoryLabelAr' : 'categoryLabelEn', label: isAr ? 'نوع الوثيقة' : 'Document Type' },
      { key: 'documentNumber', label: isAr ? 'رقم الوثيقة' : 'Document Number' },
      { key: 'expiryDate', label: isAr ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date' },
      { key: 'daysUntilExpiry', label: isAr ? 'الأيام المتبقية' : 'Days Until Expiry' },
      { key: 'verificationStatus', label: isAr ? 'حالة التحقق' : 'Status' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'الامتثال لصلاحية الوثائق والتدقيق' : 'Document Expiry Compliance & Audit'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'امتثال الوثائق' : 'Document Compliance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'الرقابة على صلاحية الهويات والإقامات لكوادر المنشأة' : 'Establishment Identity & Residency Compliance Oversight'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تفتيش رقابي مستقل لامتثال الموردين للوائح الإقامة وتأشيرات العمل والتأمين الصحي بدولة الإمارات.'
                  : 'Independent supervisory inspection of contractor compliance with UAE residency, visa, and insurance regulations.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير تدقيق الامتثال (CSV)' : 'Export Compliance Audit (CSV)'}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'سجل تدقيق تواريخ انتهاء الوثائق' : 'Document Expiry Audit Log'}
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isAr ? 'بحث عن موظف أو وثيقة...' : 'Search document or employee...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الوثيقة' : 'Document Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'رقم الوثيقة' : 'Document Number'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأيام المتبقية' : 'Days Until Expiry'}</th>
                    <th className="py-3 px-2">{isAr ? 'حالة الاعتماد' : 'Verification Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-[#142B52]">{doc.employeeName}</td>
                      <td className="py-3.5 px-2 text-slate-700 font-medium">
                        {isAr ? doc.categoryLabelAr : doc.categoryLabelEn}
                      </td>
                      <td className="py-3.5 px-2 font-mono text-slate-600">{doc.documentNumber}</td>
                      <td className="py-3.5 px-2 font-mono text-slate-600">{doc.expiryDate}</td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`font-mono font-bold ${
                            doc.daysUntilExpiry <= 30
                              ? 'text-rose-600'
                              : doc.daysUntilExpiry <= 60
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
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
