'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Search, Filter, Download, Building2, Users2, Eye } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentWorkforcePage() {
  const { employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.fullNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.fullNameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.jobTitleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.jobTitleAr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier =
      supplierFilter === 'ALL' || e.supplierEn.includes(supplierFilter);
    const matchesDept = deptFilter === 'ALL' || e.departmentEn === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || e.employmentStatus === statusFilter;

    return matchesSearch && matchesSupplier && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    exportToCSV('EDE_Complete_Outsourced_Workforce', filtered, [
      { key: 'employeeId', label: isAr ? 'الرقم الوظيفي' : 'Employee ID' },
      { key: 'fullNameEn', label: isAr ? 'الاسم بالإنجليزية' : 'Full Name (English)' },
      { key: 'fullNameAr', label: isAr ? 'الاسم بالعربية' : 'Full Name (Arabic)' },
      { key: isAr ? 'jobTitleAr' : 'jobTitleEn', label: isAr ? 'المسمى الوظيفي' : 'Job Designation' },
      { key: isAr ? 'departmentAr' : 'departmentEn', label: isAr ? 'الإدارة' : 'Department' },
      { key: 'supplierEn', label: isAr ? 'المزوّد' : 'Supplier Entity' },
      { key: 'nationality', label: isAr ? 'الجنسية' : 'Nationality' },
      { key: 'joiningDate', label: isAr ? 'تاريخ التعيين' : 'Joining Date' },
      { key: 'employmentStatus', label: isAr ? 'الحالة' : 'Status' },
      { key: 'email', label: isAr ? 'البريد الرسمي' : 'Work Email' },
      { key: 'mobile', label: isAr ? 'الهاتف' : 'Contact Phone' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'دليل وسجل القوى العاملة الخارجية' : 'Outsourced Workforce Directory'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'سجل القوى العاملة' : 'Workforce Directory' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'السجل الرئيسي الشامل للكوادر الخارجية المتعاقدة' : 'Complete Outsourced Workforce Master Registry'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'الدليل الرسمي للمؤسسة لمتابعة وتدقيق 57 كادراً تخصصياً صيدلانياً وفنياً ومخبرياً.'
                  : 'Official establishment directory tracking all 57 outsourced pharmaceutical, technical, and laboratory specialists.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير الدليل الشامل (CSV)' : 'Export Full Directory (CSV)'}</span>
            </button>
          </div>

          {/* Search & Multi-Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder={isAr ? 'ابحث بالاسم، الرقم الوظيفي، أو المسمى...' : 'Search by name, ID, or title...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={supplierFilter}
                onChange={(e) => { setSupplierFilter(e.target.value); setCurrentPage(1); }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الموردين (التميمي وأبيكس)' : 'All Suppliers (Al Tamimi & Apex)'}</option>
                <option value="Tamimi">{isAr ? 'التميمي للقوى العاملة (34)' : 'Al Tamimi Manpower (34)'}</option>
                <option value="Apex">{isAr ? 'أبيكس للتعهيد (23)' : 'Apex Outsourcing (23)'}</option>
              </select>

              <select
                value={deptFilter}
                onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الإدارات' : 'All Departments'}</option>
                <option value="Drug Registration & Licensing">{isAr ? 'تسجيل وترخيص الأدوية' : 'Drug Registration & Licensing'}</option>
                <option value="Pharmacovigilance & Drug Safety">{isAr ? 'اليقظة الدوائية وسلامة الدواء' : 'Pharmacovigilance & Drug Safety'}</option>
                <option value="Medical Devices Inspection">{isAr ? 'تفتيش الأجهزة الطبية' : 'Medical Devices Inspection'}</option>
                <option value="Central Quality Control Laboratories">{isAr ? 'مختبرات الرقابة النوعية المركزية' : 'Central Quality Control Laboratories'}</option>
                <option value="Clinical Trials & Bioequivalence">{isAr ? 'الدراسات السريرية والتكافؤ الحيوي' : 'Clinical Trials & Bioequivalence'}</option>
                <option value="Health Tech & Regulatory IT">{isAr ? 'التكنولوجيا الصحية والأنظمة التنظيمية' : 'Health Tech & Regulatory IT'}</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
                <option value="Active">{isAr ? 'على رأس العمل' : 'Active'}</option>
                <option value="On Leave">{isAr ? 'في إجازة' : 'On Leave'}</option>
              </select>
            </div>
          </div>

          {/* Master Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr
                  ? `سجلات الكوادر (${filtered.length} كادراً مطابقاً)`
                  : `Workforce Records (${filtered.length} Matching Personnel)`}
              </h3>
              <span className="text-xs text-slate-400">
                {isAr ? `الصفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'الرقم الوظيفي' : 'Employee ID'}</th>
                    <th className="py-3">{isAr ? 'الاسم الكامل' : 'Full Name'}</th>
                    <th className="py-3">{isAr ? 'المسمى الوظيفي' : 'Job Designation'}</th>
                    <th className="py-3">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3">{isAr ? 'الجهة المزوّدة' : 'Supplier Contractor'}</th>
                    <th className="py-3">{isAr ? 'الجنسية' : 'Nationality'}</th>
                    <th className="py-3">{isAr ? 'تاريخ التعيين' : 'Joining Date'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 font-mono font-bold text-[#142B52]">{emp.employeeId}</td>
                      <td className="py-3.5 font-bold text-slate-900">
                        {isAr ? emp.fullNameAr : emp.fullNameEn}
                      </td>
                      <td className="py-3.5 font-medium text-slate-700">
                        {isAr ? emp.jobTitleAr : emp.jobTitleEn}
                      </td>
                      <td className="py-3.5 text-slate-600">
                        {isAr ? emp.departmentAr : emp.departmentEn}
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800">{emp.supplierEn}</td>
                      <td className="py-3.5 text-slate-500">{t(emp.nationality)}</td>
                      <td className="py-3.5 text-slate-500">{emp.joiningDate}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.employmentStatus === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {t(emp.employmentStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                {isAr
                  ? `عرض ${(currentPage - 1) * itemsPerPage + 1} إلى ${Math.min(currentPage * itemsPerPage, filtered.length)} من أصل ${filtered.length} كادراً`
                  : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filtered.length)} of ${filtered.length} entries`}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  {isAr ? 'السابق' : 'Previous'}
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  {isAr ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
