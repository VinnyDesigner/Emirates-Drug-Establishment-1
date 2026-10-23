'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Search, Building2, Phone, Mail, FileText, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function SupplierEmployeesPage() {
  const { employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Supplier A: Al Tamimi Manpower Services (34 employees)
  const supplierStaff = employees.filter((e) => e.supplierEn.includes('Tamimi'));

  const filtered = supplierStaff.filter((e) => {
    const matchesSearch =
      e.fullNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.fullNameAr && e.fullNameAr.includes(searchTerm)) ||
      e.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.jobTitleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.jobTitleAr && e.jobTitleAr.includes(searchTerm));
    const matchesDept = selectedDept === 'ALL' || e.departmentEn === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleExport = () => {
    exportToCSV('Al_Tamimi_Workforce_Roster', filtered, [
      { key: 'employeeId', label: isAr ? 'الرقم الوظيفي' : 'Employee ID' },
      { key: isAr ? 'fullNameAr' : 'fullNameEn', label: isAr ? 'الاسم الكامل' : 'Full Name' },
      { key: isAr ? 'jobTitleAr' : 'jobTitleEn', label: isAr ? 'المسمى الوظيفي' : 'Job Title' },
      { key: isAr ? 'departmentAr' : 'departmentEn', label: isAr ? 'الإدارة' : 'Department' },
      { key: 'email', label: isAr ? 'البريد الإلكتروني' : 'Email' },
      { key: 'mobile', label: isAr ? 'الهاتف' : 'Mobile' },
      { key: 'employmentStatus', label: isAr ? 'الحالة' : 'Status' },
      { key: 'joiningDate', label: isAr ? 'تاريخ التعيين' : 'Joining Date' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'كوادر المورد المؤجرة للمنشأة' : 'Assigned Contractor Workforce'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'سجل الكوادر' : 'Employees' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'دليل كوادر التميمي لخدمات القوى العاملة' : 'Al Tamimi Manpower Contracted Personnel Directory'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'عرض بياني مخصص لجميع الكوادر المؤجرة النشطة والبالغ عددهم 34 أخصائياً لدى مؤسسة الإمارات للدواء.'
                  : 'Isolated data view showing all 34 active outsourced personnel assigned to Emirates Drug Establishment.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير الكشف (CSV)' : 'Export Roster (CSV)'}</span>
            </button>
          </div>

          {/* Search Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'بحث بالاسم، الرقم الوظيفي، أو المسمى...' : 'Search by name, ID, or title...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">{isAr ? 'الإدارة:' : 'Department:'}</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="ALL">{isAr ? 'جميع الإدارات' : 'All Departments'}</option>
                <option value="Drug Registration & Licensing">{isAr ? 'تسجيل الأدوية والتراخيص' : 'Drug Registration & Licensing'}</option>
                <option value="Pharmacovigilance & Drug Safety">{isAr ? 'التيقظ الدوائي وسلامة الدواء' : 'Pharmacovigilance & Drug Safety'}</option>
                <option value="Medical Devices Inspection">{isAr ? 'التفتيش على الأجهزة الطبية' : 'Medical Devices Inspection'}</option>
                <option value="Central Quality Control Laboratories">{isAr ? 'مختبرات الرقابة وضبط الجودة' : 'Central Quality Control Laboratories'}</option>
                <option value="Clinical Trials & Bioequivalence">{isAr ? 'الدراسات السريرية والتكافؤ الحيوي' : 'Clinical Trials & Bioequivalence'}</option>
                <option value="Health Tech & Regulatory IT">{isAr ? 'تقنية المعلومات والتنظيم الرقمي' : 'Health Tech & Regulatory IT'}</option>
              </select>
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? `الكوادر المعينة (${filtered.length} من أصل ${supplierStaff.length})` : `Contracted Personnel (${filtered.length} of ${supplierStaff.length})`}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الرقم الوظيفي' : 'Employee ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'اسم الموظف' : 'Employee Name'}</th>
                    <th className="py-3 px-2">{isAr ? 'المسمى الوظيفي' : 'Designation'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'رقم الهاتف' : 'Contact'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ التعيين' : 'Joining Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{emp.employeeId}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">
                        {isAr ? (emp.fullNameAr || emp.fullNameEn) : emp.fullNameEn}
                      </td>
                      <td className="py-3.5 px-2 font-medium text-slate-700">
                        {isAr ? (emp.jobTitleAr || emp.jobTitleEn) : emp.jobTitleEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-600">
                        {isAr ? (emp.departmentAr || emp.departmentEn) : emp.departmentEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 font-mono text-[11px]">{emp.mobile}</td>
                      <td className="py-3.5 px-2 text-slate-500 font-mono">{emp.joiningDate}</td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.employmentStatus === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isAr ? (emp.employmentStatus === 'Active' ? 'نشط' : 'في إجازة') : emp.employmentStatus}
                        </span>
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
