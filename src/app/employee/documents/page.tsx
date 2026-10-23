'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmployeeDocument } from '@/lib/types';
import {
  FolderArchive,
  Upload,
  Download,
  Eye,
  AlertTriangle,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  X,
} from 'lucide-react';

export default function EmployeeDocumentsPage() {
  const { documents, uploadReplacementDocument } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [targetDoc, setTargetDoc] = useState<EmployeeDocument | null>(null);
  const [replacementFileName, setReplacementFileName] = useState('');
  const [newExpiry, setNewExpiry] = useState('2028-11-20');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.categoryLabelEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.categoryLabelAr.includes(searchTerm) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenUpload = (doc: EmployeeDocument) => {
    setTargetDoc(doc);
    setReplacementFileName(`Renewed_${doc.fileName}`);
    setIsUploadOpen(true);
    setUploadSuccess(false);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDoc) return;
    uploadReplacementDocument(targetDoc.id, replacementFileName, newExpiry);
    setUploadSuccess(true);
    setTimeout(() => {
      setIsUploadOpen(false);
      setUploadSuccess(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'خزينة الوثائق والامتثال للصلاحية' : 'Document Vault & Expiry Compliance'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الوثائق' : 'Documents' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'المستودع الرسمي لوثائق القوى العاملة' : 'Official Workforce Document Repository'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'مستودع مشفر لبطاقات الهوية والتأشيرات وعقود العمل والشهادات المهنية.'
                  : 'Encrypted repository for identity cards, visas, labor contracts, and professional certifications.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008F88]" />
                <span>{isAr ? 'تشفير AES-256' : 'AES-256 Encrypted'}</span>
              </span>
            </div>
          </div>

          {/* 30-Day Renewal SLA Compliance Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-amber-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  {isAr
                    ? 'مؤشر اتفاقية مستوى الخدمة RFP بند 3.7: التجديد الاستباقي قبل 30 يوماً من الانتهاء'
                    : 'RFP Section 3.7 SLA Indicator: Proactive Renewal 30 Days Before Expiry'}
                </p>
                <p className="text-amber-800">
                  {isAr
                    ? 'يجب تجديد تأشيرات الإقامة وبطاقات الهوية والتأمين الصحي قبل 30 يوماً على الأقل من تاريخ الانتهاء. يتم إرسال مهام تلقائية إلى فريق العلاقات العامة (PRO) للمورد.'
                    : 'Residency visas, Emirates IDs, and medical insurance must be renewed at least 30 days prior to expiry date. Automatic task triggers are dispatched to the supplier PRO team.'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-[11px] shrink-0">
              {isAr ? 'مستهدف التجديد خلال 30 يوماً' : '30-Day Renewal Target'}
            </span>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'البحث عن اسم الوثيقة أو رقمها...' : 'Search document name or number...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#2463A6]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">{isAr ? 'التصنيف:' : 'Category:'}</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="ALL">{isAr ? 'جميع أنواع الوثائق' : 'All Document Types'}</option>
                <option value="residence_visa">{isAr ? 'تأشيرة إقامة الإمارات' : 'UAE Residence Visa'}</option>
                <option value="emirates_id">{isAr ? 'الهوية الإماراتية' : 'Emirates ID'}</option>
                <option value="passport">{isAr ? 'جواز السفر' : 'Passport'}</option>
                <option value="labor_contract">{isAr ? 'عقد عمل وزارة الموارد البشرية والتوطين' : 'MOHRE Labor Contract'}</option>
                <option value="health_insurance">{isAr ? 'التأمين الصحي' : 'Health Insurance'}</option>
              </select>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'وثائق الهوية والامتثال المحفوظة' : 'Stored Identity & Compliance Documents'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'فئة الوثيقة' : 'Document Category'}</th>
                    <th className="py-3 px-2">{isAr ? 'رقم الوثيقة' : 'Document Number'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ الإصدار' : 'Issue Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأيام المتبقية' : 'Days Remaining'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2">{isAr ? 'مواصفات الملف' : 'File Specs'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => {
                    const isUrgent = doc.renewalUrgent || doc.daysUntilExpiry <= 30;
                    return (
                      <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-2 space-y-0.5">
                          <span className="font-bold text-[#142B52] block text-xs">
                            {isAr ? doc.categoryLabelAr : doc.categoryLabelEn}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {isAr ? doc.categoryLabelEn : doc.categoryLabelAr}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-mono font-semibold text-slate-800">
                          {doc.documentNumber}
                        </td>
                        <td className="py-3.5 px-2 text-slate-600">{doc.issueDate}</td>
                        <td className="py-3.5 px-2 font-semibold text-slate-900">{doc.expiryDate}</td>
                        <td className="py-3.5 px-2">
                          <span
                            className={`font-mono font-bold text-xs ${
                              isUrgent ? 'text-rose-600 font-black' : 'text-slate-700'
                            }`}
                          >
                            {isAr ? `${doc.daysUntilExpiry} يوم` : `${doc.daysUntilExpiry} days`}
                          </span>
                        </td>
                        <td className="py-3.5 px-2">
                          <StatusBadge status={doc.verificationStatus} />
                        </td>
                        <td className="py-3.5 px-2 text-slate-500 text-[11px]">
                          <span>{doc.fileSize}</span>
                        </td>
                        <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap space-x-1.5 rtl:space-x-reverse">
                          <button
                            onClick={() => alert(`Opening secure preview for: ${doc.fileName}`)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isAr ? 'معاينة' : 'Preview'}</span>
                          </button>
                          <button
                            onClick={() => handleOpenUpload(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-semibold shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تجديد / استبدال' : 'Renew / Replace'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Replacement Upload Modal */}
      {isUploadOpen && targetDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-[#142B52]">
                {isAr
                  ? `تحميل وثيقة مجددة: ${targetDoc.categoryLabelAr}`
                  : `Upload Renewed Document: ${targetDoc.categoryLabelEn}`}
              </h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-700">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">
                  {isAr ? 'تم استبدال الوثيقة والتحقق منها بنجاح' : 'Document Replaced & Verified'}
                </p>
                <p className="text-xs text-slate-500">
                  {isAr ? 'تم تحديث الأرشيف الإلكتروني وتوثيق سجل التدقيق.' : 'Electronic archive updated and audit log recorded.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'الملف البديل' : 'Replacement File'}
                  </label>
                  <input
                    type="text"
                    required
                    value={replacementFileName}
                    onChange={(e) => setReplacementFileName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'تاريخ الانتهاء الجديد' : 'New Expiry Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2 border rounded-xl"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#142B52] text-white font-bold rounded-xl shadow-xs"
                  >
                    {isAr ? 'تحميل وتأكيد الأرشفة' : 'Upload & Commit Archive'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
