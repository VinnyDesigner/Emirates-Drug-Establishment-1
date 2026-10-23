'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/export-utils';
import { useI18n } from '@/lib/i18n';
import {
  ExternalLink,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Edit2,
  Save,
  Printer,
} from 'lucide-react';

export default function AnnexBComplianceMatrixPage() {
  const { annexBItems, updateAnnexBDevDays, updateAnnexBStatus } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [editingNumber, setEditingNumber] = useState<number | null>(null);
  const [editDaysValue, setEditDaysValue] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredItems = annexBItems.filter((item) => {
    const matchesSearch =
      item.requirementTitleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requirementTitleAr.includes(searchTerm) ||
      item.rfpReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidenceNotesEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierRemarksEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || item.demonstratedStatus === statusFilter;

    const matchesAvail =
      availabilityFilter === 'ALL' || item.availability === availabilityFilter;

    return matchesSearch && matchesStatus && matchesAvail;
  });

  const handleStartEdit = (num: number, currentDays: number) => {
    setEditingNumber(num);
    setEditDaysValue(currentDays);
  };

  const handleSaveEdit = (num: number) => {
    updateAnnexBDevDays(num, Number(editDaysValue));
    setEditingNumber(null);
  };

  const handleExportCSV = () => {
    exportToCSV(
      filteredItems.map((item) => ({
        Number: item.number,
        Requirement: isAr ? item.requirementTitleAr : item.requirementTitleEn,
        RFP_Ref: item.rfpReference,
        Status: item.demonstratedStatus,
        Availability: item.availability,
        Est_Dev_Days: item.estimatedDevDays,
        Screens: item.relatedScreenRoutes.join('; '),
        Remarks: item.supplierRemarksEn,
      })),
      'EDE-Annex-B-Compliance-Matrix'
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#142B52] via-[#1a386b] to-[#2463A6] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'مواصفات الامتثال الإلزامية للملحق (ب) بكراسة الشروط'
                      : 'RFP MANDATORY ANNEX B COMPLIANCE SPECIFICATION'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {isAr
                    ? 'الملحق (ب) — مصفوفة امتثال بوابة الخدمة الذاتية للموظفين'
                    : 'Annex B — Employee Self Service Compliance Matrix'}
                </h1>
                <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                  {isAr
                    ? 'تدقيق شامل لجميع متطلبات الخدمة الذاتية الـ 21 الإلزامية من الوظائف التشغيلية والأمنية المحددة في كراسة شروط مؤسسة الإمارات للتعليم المدرسي (القسم 3.5 والملحق ب).'
                    : 'Comprehensive audit of all 21 mandatory Employee Self-Service (ESS) functional, security, and operational capabilities specified in EDE RFP Section 3.5 & Annex B.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all backdrop-blur-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة PDF' : 'Print PDF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                {isAr ? 'إجمالي متطلبات الملحق (ب)' : 'Total Annex B Scope'}
              </span>
              <span className="text-2xl font-black text-slate-800 mt-1 block">
                {isAr ? '21 متطلباً' : '21 Requirements'}
              </span>
              <span className="text-[10px] text-teal-600 font-semibold mt-1 block">
                {isAr ? 'مغطاة بالكامل 100%' : '100% Accounted'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                {isAr ? 'مطبقة بالواجهة' : 'Frontend Demonstrated'}
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block font-mono">
                {annexBItems.filter((i) => i.demonstratedStatus === 'Frontend Demonstrated').length} / 21
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'تفاعلية بالكامل' : 'Fully Interactive'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                {isAr ? 'بانتظار الربط والتكامل' : 'Integration Pending'}
              </span>
              <span className="text-2xl font-black text-amber-600 mt-1 block font-mono">
                {annexBItems.filter((i) => i.demonstratedStatus === 'Integration Pending').length}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'ربط بوابات / واجهات سحابية' : 'Hardware/Cloud Hooks'}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                {isAr ? 'تتطلب تطويراً مخصصاً' : 'Requires Development'}
              </span>
              <span className="text-2xl font-black text-blue-600 mt-1 block font-mono">
                {annexBItems.filter((i) => i.availability === 'Requires Development').length}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isAr ? 'تطبيقات أصلية / بوابات' : 'Native Mobile / Custom Turnstile'}
              </span>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  isAr
                    ? 'البحث في متطلبات الملحق (ب)، المرجع في الكراسة، الشاشات، الملاحظات...'
                    : 'Search Annex B requirement title, RFP reference, screens, remarks...'
                }
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white rtl:pr-9 rtl:pl-4"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>{isAr ? 'الحالة:' : 'Status:'}</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:border-[#2463A6]"
              >
                <option value="ALL">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
                <option value="Frontend Demonstrated">{isAr ? 'مطبقة بالواجهة' : 'Frontend Demonstrated'}</option>
                <option value="Backend Implemented">{isAr ? 'منفذة بالخلفية' : 'Backend Implemented'}</option>
                <option value="Integration Pending">{isAr ? 'بانتظار التكامل' : 'Integration Pending'}</option>
                <option value="Requires Development">{isAr ? 'تتطلب تطويراً' : 'Requires Development'}</option>
                <option value="Externally Verified">{isAr ? 'تم التحقق خارجياً' : 'Externally Verified'}</option>
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:border-[#2463A6]"
              >
                <option value="ALL">{isAr ? 'جميع درجات التوافر' : 'All Availability'}</option>
                <option value="Available">{isAr ? 'جاهز ومتاح (مباشر)' : 'Available (Live)'}</option>
                <option value="Requires Development">{isAr ? 'يتطلب تطويراً' : 'Requires Development'}</option>
              </select>
            </div>
          </div>

          {/* Interactive Compliance Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل الامتثال التعاقدي والوظيفي' : 'Contractual & Functional Compliance Ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3 text-center w-12">#</th>
                    <th className="py-3 px-4 min-w-[220px]">
                      {isAr ? 'المتطلب والمرجع في الكراسة' : 'Requirement & RFP Ref'}
                    </th>
                    <th className="py-3 px-4 min-w-[180px]">
                      {isAr ? 'شاشات النظام المرتبطة' : 'Application Screens'}
                    </th>
                    <th className="py-3 px-3 text-center min-w-[140px]">
                      {isAr ? 'حالة التطبيق' : 'Demonstrated Status'}
                    </th>
                    <th className="py-3 px-3 text-center min-w-[120px]">
                      {isAr ? 'درجة التوافر' : 'Availability'}
                    </th>
                    <th className="py-3 px-3 text-center min-w-[110px]">
                      {isAr ? 'أيام التطوير' : 'Est. Dev Days'}
                    </th>
                    <th className="py-3 px-4 min-w-[240px]">
                      {isAr ? 'أدلة الإثبات وملاحظات المتعهد' : 'Evidence & Supplier Remarks'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const isEditing = editingNumber === item.number;

                    const statusBadge = {
                      'Frontend Demonstrated': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Backend Implemented': 'bg-teal-50 text-teal-700 border-teal-200',
                      'Integration Pending': 'bg-amber-50 text-amber-700 border-amber-200',
                      'Requires Development': 'bg-blue-50 text-blue-700 border-blue-200',
                      'Externally Verified': 'bg-indigo-50 text-indigo-700 border-indigo-200',
                      'Not Implemented': 'bg-rose-50 text-rose-700 border-rose-200',
                    }[item.demonstratedStatus];

                    return (
                      <tr key={item.number} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3 text-center font-bold text-slate-800 font-mono">
                          {item.number}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block text-xs">
                            {isAr ? item.requirementTitleAr : item.requirementTitleEn}
                          </span>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {isAr ? item.requirementTitleEn : item.requirementTitleAr}
                          </span>
                          <span className="inline-block mt-1 font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                            {item.rfpReference}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          {item.relatedScreenRoutes.map((route, idx) => (
                            <Link
                              key={route}
                              href={route}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2463A6] hover:text-[#142B52] bg-blue-50/60 hover:bg-blue-100/60 px-2 py-0.5 rounded border border-blue-100 transition-colors mr-1 mb-1"
                              target="_blank"
                            >
                              <span>{item.relatedScreenNames[idx] || route}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          ))}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <select
                            value={item.demonstratedStatus}
                            onChange={(e) =>
                              updateAnnexBStatus(item.number, e.target.value as any)
                            }
                            className={`px-2 py-1 rounded text-[11px] font-semibold border ${statusBadge} focus:outline-hidden`}
                          >
                            <option value="Frontend Demonstrated">{isAr ? 'مطبقة بالواجهة' : 'Frontend Demonstrated'}</option>
                            <option value="Backend Implemented">{isAr ? 'منفذة بالخلفية' : 'Backend Implemented'}</option>
                            <option value="Integration Pending">{isAr ? 'بانتظار التكامل' : 'Integration Pending'}</option>
                            <option value="Requires Development">{isAr ? 'تتطلب تطويراً' : 'Requires Development'}</option>
                            <option value="Externally Verified">{isAr ? 'تم التحقق خارجياً' : 'Externally Verified'}</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${
                              item.availability === 'Available'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-amber-100 text-amber-800 border-amber-200'
                            }`}
                          >
                            {isAr
                              ? (item.availability === 'Available' ? 'متاح ومباشر' : 'يتطلب تطويراً')
                              : item.availability}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {isEditing ? (
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={120}
                                value={editDaysValue}
                                onChange={(e) => setEditDaysValue(Number(e.target.value))}
                                className="w-14 p-1 text-center bg-white border border-[#2463A6] rounded text-xs text-slate-800 font-bold focus:outline-hidden"
                              />
                              <button
                                onClick={() => handleSaveEdit(item.number)}
                                className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-xs"
                                title={isAr ? 'حفظ' : 'Save'}
                              >
                                <Save className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1 group">
                              <span className="font-mono font-bold text-slate-800">
                                {item.estimatedDevDays === 0
                                  ? (isAr ? '0 (جاهز)' : '0 (Live)')
                                  : (isAr ? `${item.estimatedDevDays} يوم` : `${item.estimatedDevDays}d`)}
                              </span>
                              <button
                                onClick={() => handleStartEdit(item.number, item.estimatedDevDays)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-700 transition-opacity cursor-pointer"
                                title={isAr ? 'تعديل الأيام' : 'Edit Days'}
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          <p className="text-[11px] text-slate-700 leading-snug">
                            <span className="font-semibold text-slate-900">
                              {isAr ? 'دليل الإثبات: ' : 'Evidence: '}
                            </span>
                            {item.evidenceNotesEn}
                          </p>
                          <p className="text-[10px] text-slate-500 italic">
                            <span className="font-semibold not-italic text-slate-600">
                              {isAr ? 'ملاحظة المتعهد: ' : 'Supplier Note: '}
                            </span>
                            {item.supplierRemarksEn}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="p-12 text-center text-slate-400 text-xs">
                {isAr
                  ? 'لا توجد متطلبات في الملحق (ب) تطابق البحث أو الفلتر المحدد.'
                  : 'No Annex B requirement items match the selected filter or search term.'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
