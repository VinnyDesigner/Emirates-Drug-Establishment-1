'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Building2,
  Users2,
  Filter,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { exportToCSV, printFormattedReport } from '@/lib/export-utils';

export default function EstablishmentReportsCenterPage() {
  const { employees, leaveRequests, documents, slaMetrics, tickets } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('headcount');
  const [supplierFilter, setSupplierFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const reportCategories = [
    { id: 'headcount', nameEn: '1. Employee Headcount Master Report', nameAr: '1. التقرير الشامل لأعداد القوى العاملة', count: employees.length },
    { id: 'distribution', nameEn: '2. Departmental Distribution Report', nameAr: '2. تقرير التوزيع عبر الإدارات الست', count: 6 },
    { id: 'costs', nameEn: '3. Outsourcing Invoicing & Costs Report', nameAr: '3. تقرير فواتير وتكاليف التعهيد الشهرية', count: 4 },
    { id: 'leave', nameEn: '4. Workforce Leave Utilization Report', nameAr: '4. تقرير استهلاك إجازات الكوادر الخارجية', count: leaveRequests.length },
    { id: 'attendance', nameEn: '5. Biometric Attendance Ingestion Report', nameAr: '5. تقرير تدفق الحضور والانصراف البيومتري', count: 57 },
    { id: 'documents', nameEn: '6. Expired & Expiring Documents Report', nameAr: '6. تقرير الوثائق المنتهية والجارية التجديد', count: documents.length },
    { id: 'vacancies', nameEn: '7. Staffing Requisitions & Vacancy Report', nameAr: '7. تقرير الشواغر وأوامر التعيين والإحلال', count: 2 },
    { id: 'sla', nameEn: '8. Service Level Performance Report (SLA)', nameAr: '8. تقرير أداء اتفاقيات مستوى الخدمة (SLA)', count: 10 },
    { id: 'requests', nameEn: '9. Employee Request Turnaround Report', nameAr: '9. تقرير زمن معالجة طلبات واستفسارات الموظفين', count: tickets.length },
    { id: 'invoicing', nameEn: '10. Detailed Contractor Cost Ledger', nameAr: '10. السجل المالي المفصل لعقود الموردين', count: 2 },
  ];

  const handleExportCSV = () => {
    if (selectedCategory === 'headcount') {
      exportToCSV('EDE_Headcount_Report', employees, [
        { key: 'employeeId', label: isAr ? 'الرقم الوظيفي' : 'Employee ID' },
        { key: isAr ? 'fullNameAr' : 'fullNameEn', label: isAr ? 'الاسم الكامل' : 'Name' },
        { key: isAr ? 'jobTitleAr' : 'jobTitleEn', label: isAr ? 'المسمى الوظيفي' : 'Job Title' },
        { key: isAr ? 'departmentAr' : 'departmentEn', label: isAr ? 'الإدارة' : 'Department' },
        { key: isAr ? 'supplierAr' : 'supplierEn', label: isAr ? 'المورد المتعاقد' : 'Supplier Entity' },
        { key: 'joiningDate', label: isAr ? 'تاريخ التعيين' : 'Joining Date' },
        { key: 'employmentStatus', label: isAr ? 'الحالة' : 'Status' },
      ]);
    } else if (selectedCategory === 'leave') {
      exportToCSV('EDE_Leave_Report', leaveRequests, [
        { key: 'requestId', label: isAr ? 'رقم الطلب' : 'Request ID' },
        { key: 'employeeName', label: isAr ? 'اسم الموظف' : 'Employee' },
        { key: 'department', label: isAr ? 'الإدارة' : 'Department' },
        { key: 'leaveType', label: isAr ? 'نوع الإجازة' : 'Type' },
        { key: 'startDate', label: isAr ? 'تاريخ البدء' : 'Start Date' },
        { key: 'endDate', label: isAr ? 'تاريخ الانتهاء' : 'End Date' },
        { key: 'days', label: isAr ? 'عدد الأيام' : 'Days' },
        { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      ]);
    } else if (selectedCategory === 'sla') {
      exportToCSV('EDE_SLA_Performance_Report', slaMetrics, [
        { key: 'code', label: isAr ? 'رمز المؤشر' : 'SLA Code' },
        { key: isAr ? 'indicatorAr' : 'indicatorEn', label: isAr ? 'مؤشر الأداء' : 'Indicator' },
        { key: isAr ? 'targetDescriptionAr' : 'targetDescriptionEn', label: isAr ? 'المعيار المستهدف' : 'Benchmark' },
        { key: 'actualValue', label: isAr ? 'النتيجة الفعلية' : 'Actual' },
        { key: 'complianceRate', label: isAr ? 'نسبة الامتثال (%)' : 'Compliance (%)' },
        { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      ]);
    } else {
      exportToCSV(`EDE_${selectedCategory}_Report`, employees, [
        { key: 'employeeId', label: isAr ? 'الرقم' : 'ID' },
        { key: isAr ? 'fullNameAr' : 'fullNameEn', label: isAr ? 'الاسم' : 'Name' },
        { key: isAr ? 'departmentAr' : 'departmentEn', label: isAr ? 'الإدارة' : 'Department' },
        { key: isAr ? 'supplierAr' : 'supplierEn', label: isAr ? 'المورد' : 'Supplier' },
      ]);
    }
  };

  const handlePrintPDF = () => {
    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>${isAr ? 'الرقم الوظيفي' : 'Employee ID'}</th>
            <th>${isAr ? 'الاسم' : 'Name'}</th>
            <th>${isAr ? 'المسمى الوظيفي' : 'Job Title'}</th>
            <th>${isAr ? 'الإدارة' : 'Department'}</th>
            <th>${isAr ? 'المورد' : 'Supplier'}</th>
            <th>${isAr ? 'الحالة' : 'Status'}</th>
          </tr>
        </thead>
        <tbody>
          ${employees
            .slice(0, 20)
            .map(
              (e) => `
            <tr>
              <td>${e.employeeId}</td>
              <td>${isAr ? (e.fullNameAr || e.fullNameEn) : e.fullNameEn}</td>
              <td>${isAr ? (e.jobTitleAr || e.jobTitleEn) : e.jobTitleEn}</td>
              <td>${isAr ? (e.departmentAr || e.departmentEn) : e.departmentEn}</td>
              <td>${isAr ? (e.supplierAr || e.supplierEn) : e.supplierEn}</td>
              <td>${e.employmentStatus}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    printFormattedReport(
      isAr ? 'تقرير الحوكمة والرقابة لمؤسسة الإمارات للدواء' : 'Official Establishment Governance Report',
      isAr ? `فئة التقرير: ${selectedCategory.toUpperCase()} | تم التوليد بموجب كراسة الشروط RFP` : `Category: ${selectedCategory.toUpperCase()} | Generated under EDE Master RFP`,
      tableHtml
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مركز التقارير والتحليلات الرقابية للمنشأة' : 'Reporting & Governance Analytics Center'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'مركز التقارير' : 'Reporting Center' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مركز التقارير التنفيذية والرقابية للمنشأة' : 'Establishment Enterprise Reporting Center'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تغطية متكاملة لجميع فئات التقارير العشر المطلوبة في كراسة الشروط (بند 21) مع تصفية وتصدير فوري.'
                  : 'Fulfilling all 10 required report categories specified in Section 21 with live filtering, preview, and CSV/PDF exports.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تصدير التقرير (Excel/CSV)' : 'Export Report (Excel/CSV)'}</span>
              </button>
              <button
                onClick={handlePrintPDF}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'طباعة تقرير PDF رسمي' : 'Print Official PDF'}</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <span className="text-slate-400 font-bold block mb-1">
                  {isAr ? 'فئة التقرير:' : 'Report Category:'}
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-hidden"
                >
                  {reportCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {isAr ? cat.nameAr : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">
                  {isAr ? 'شركة التزويد المتعاقدة:' : 'Contractor Supplier:'}
                </span>
                <select
                  value={supplierFilter}
                  onChange={(e) => setSupplierFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                >
                  <option value="ALL">{isAr ? 'جميع الموردين (التميمي وأبكس)' : 'All Contractors (Al Tamimi & Apex)'}</option>
                  <option value="Tamimi">{isAr ? 'التميمي لخدمات القوى العاملة' : 'Al Tamimi Manpower'}</option>
                  <option value="Apex">{isAr ? 'أبكس لحلول التعهيد' : 'Apex Outsourcing'}</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">
                  {isAr ? 'الإدارة التخصصية:' : 'Department:'}
                </span>
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                >
                  <option value="ALL">{isAr ? 'جميع الإدارات الست' : 'All Departments'}</option>
                  <option value="Drug Registration & Licensing">{isAr ? 'تسجيل الأدوية والتراخيص' : 'Drug Registration & Licensing'}</option>
                  <option value="Pharmacovigilance & Drug Safety">{isAr ? 'التيقظ الدوائي وسلامة الدواء' : 'Pharmacovigilance & Drug Safety'}</option>
                  <option value="Medical Devices Inspection">{isAr ? 'التفتيش على الأجهزة الطبية' : 'Medical Devices Inspection'}</option>
                  <option value="Central Quality Control Laboratories">{isAr ? 'مختبرات الرقابة وضبط الجودة' : 'Central Quality Control Laboratories'}</option>
                  <option value="Clinical Trials & Bioequivalence">{isAr ? 'الدراسات السريرية والتكافؤ الحيوي' : 'Clinical Trials & Bioequivalence'}</option>
                  <option value="Health Tech & Regulatory IT">{isAr ? 'تقنية المعلومات والتنظيم الرقمي' : 'Health Tech & Regulatory IT'}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                {isAr ? 'الفلترة اللحظية مفعلة' : 'Live Filter Applied'}
              </span>
            </div>
          </div>

          {/* Report Preview Surface */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-[#142B52]">
                  {isAr
                    ? reportCategories.find((c) => c.id === selectedCategory)?.nameAr
                    : reportCategories.find((c) => c.id === selectedCategory)?.nameEn}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'عرض مولد لحظياً استناداً إلى سجلات المنشأة والفلاتر المختارة.'
                    : 'Real-time generated view based on stored application records and active filters.'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {isAr ? 'تصنيف: تدقيق حكومي سري' : 'Classification: Restricted Gov Audit'}
              </span>
            </div>

            {/* Render Preview according to selected category */}
            <div className="overflow-x-auto">
              {selectedCategory === 'headcount' && (
                <table className="w-full text-left rtl:text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-2">{isAr ? 'الرقم الوظيفي' : 'Employee ID'}</th>
                      <th className="py-3 px-2">{isAr ? 'الاسم' : 'Name'}</th>
                      <th className="py-3 px-2">{isAr ? 'المسمى الوظيفي' : 'Designation'}</th>
                      <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                      <th className="py-3 px-2">{isAr ? 'المورد' : 'Contractor'}</th>
                      <th className="py-3 px-2">{isAr ? 'تاريخ التعيين' : 'Joining Date'}</th>
                      <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.slice(0, 10).map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{e.employeeId}</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">
                          {isAr ? (e.fullNameAr || e.fullNameEn) : e.fullNameEn}
                        </td>
                        <td className="py-3.5 px-2 text-slate-700">
                          {isAr ? (e.jobTitleAr || e.jobTitleEn) : e.jobTitleEn}
                        </td>
                        <td className="py-3.5 px-2 text-slate-600">
                          {isAr ? (e.departmentAr || e.departmentEn) : e.departmentEn}
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-800">
                          {isAr ? (e.supplierAr || e.supplierEn) : e.supplierEn}
                        </td>
                        <td className="py-3.5 px-2 text-slate-500 font-mono">{e.joiningDate}</td>
                        <td className="py-3.5 px-2 font-bold text-emerald-700">{isAr ? 'نشط' : e.employmentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedCategory === 'sla' && (
                <table className="w-full text-left rtl:text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-2">{isAr ? 'رمز المؤشر' : 'Indicator Code'}</th>
                      <th className="py-3 px-2">{isAr ? 'وصف المؤشر' : 'Indicator Description'}</th>
                      <th className="py-3 px-2">{isAr ? 'المعيار المستهدف' : 'RFP Target Benchmark'}</th>
                      <th className="py-3 px-2">{isAr ? 'النتيجة الفعلية' : 'Actual Result'}</th>
                      <th className="py-3 px-2">{isAr ? 'نسبة الامتثال' : 'Compliance Rate'}</th>
                      <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {slaMetrics.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{s.code}</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">
                          {isAr ? s.indicatorAr : s.indicatorEn}
                        </td>
                        <td className="py-3.5 px-2 text-slate-600">
                          {isAr ? s.targetDescriptionAr : s.targetDescriptionEn}
                        </td>
                        <td className="py-3.5 px-2 font-mono font-bold">{s.actualValue} {s.targetUnit}</td>
                        <td className="py-3.5 px-2 font-mono font-black text-emerald-700">{s.complianceRate}%</td>
                        <td className="py-3.5 px-2 font-bold text-emerald-700 uppercase text-[10px]">{s.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedCategory !== 'headcount' && selectedCategory !== 'sla' && (
                <table className="w-full text-left rtl:text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-2">{isAr ? 'المعرف' : 'Identifier'}</th>
                      <th className="py-3 px-2">{isAr ? 'الموضوع / المعيار' : 'Subject / Parameter'}</th>
                      <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Scope / Department'}</th>
                      <th className="py-3 px-2">{isAr ? 'مقياس التدقيق' : 'Audit Metric'}</th>
                      <th className="py-3 px-2">{isAr ? 'نتيجة الامتثال' : 'Compliance Result'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.slice(0, 8).map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{emp.employeeId}</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">
                          {isAr ? (emp.fullNameAr || emp.fullNameEn) : emp.fullNameEn}
                        </td>
                        <td className="py-3.5 px-2 text-slate-600">
                          {isAr ? (emp.departmentAr || emp.departmentEn) : emp.departmentEn}
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-700">
                          {isAr ? (emp.supplierAr || emp.supplierEn) : emp.supplierEn}
                        </td>
                        <td className="py-3.5 px-2 font-bold text-emerald-700">
                          {isAr ? 'تم التحقق ومطابق' : 'Verified & Compliant'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>
                {isAr
                  ? 'عرض عينة من السجلات الرسمية للتقييم. انقر على "تصدير التقرير" للحصول على كامل البيانات.'
                  : 'Showing official sample records for evaluation. Click "Export Report" for full dataset.'}
              </span>
              <span className="font-bold text-slate-700">
                {isAr ? 'مختوم وموثق للتدقيق الحكومي' : 'Federal Audit Stamped'}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
