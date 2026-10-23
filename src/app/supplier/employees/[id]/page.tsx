'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  User,
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  CreditCard,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Clock,
} from 'lucide-react';

function SupplierEmployeeDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { employees, documents, currentUser } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const employee =
    employees.find((e) => e.id === id || e.employeeId === id) || employees[0];

  const employeeDocs = documents.slice(0, 4);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/supplier/employees"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isAr ? (employee.fullNameAr || employee.fullNameEn) : employee.fullNameEn}
                </h1>
                <StatusBadge status={employee.employmentStatus.toLowerCase().replace(/\s+/g, '_') as any} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? `${employee.jobTitleAr || employee.jobTitleEn} • مسند إلى مؤسسة الإمارات للدواء (${employee.departmentAr || employee.departmentEn})`
                  : `${employee.jobTitleEn} • Allocated to EDE ${employee.departmentEn}`}
              </p>
            </div>
          </div>

          {/* Core Profile Details */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
                </span>
                <span className="font-mono font-bold text-[#2463A6] mt-0.5 block">{employee.employeeId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'الجنسية' : 'Nationality'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.nationality}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'تاريخ التعيين والمباشرة' : 'Onboarding Date'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.joiningDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'جهة التزويد المتعاقدة' : 'Contractor Entity'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {isAr ? (employee.supplierAr || employee.supplierEn) : employee.supplierEn}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  {isAr ? 'بيانات الاتصال والسكن' : 'Contact & Residence'}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span dir="ltr">{employee.mobile}</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  {isAr ? `العنوان السكني: ${employee.residentialAddress}` : `Address: ${employee.residentialAddress}`}
                </div>
              </div>

              {/* Unmasked Banking View for Authorized Supplier Operations */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 block text-xs">
                    {isAr ? 'الحساب المصرفي لنظام حماية الأجور (عرض المزوّد)' : 'WPS Payroll Banking (Supplier View)'}
                  </span>
                  <span className="text-[9px] font-bold uppercase bg-emerald-200/80 text-emerald-800 px-1.5 py-0.5 rounded">
                    {isAr ? 'جاهز لملف SIF' : 'WPS SIF Ready'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isAr ? 'البنك:' : 'Bank:'}</span>
                  <span className="font-bold text-slate-900">{employee.bankDetails.bankName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isAr ? 'رقم الآيبان الكامل:' : 'Unmasked IBAN:'}</span>
                  <span className="font-mono font-bold text-slate-900" dir="ltr">
                    {employee.bankDetails.fullIbanForSupplierView || employee.bankDetails.maskedIban}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 pt-1">
                  {isAr
                    ? 'تم التحقق والمطابقة مع السجل المركزي لنظام حماية الأجور (WPS).'
                    : 'Verified against Wage Protection System central ledger.'}
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification & 30-Day Renewal Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">
                {isAr ? 'سجلات الامتثال للوثائق الثبوتية' : 'Assigned Document Compliance Records'}
              </h2>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                {isAr ? 'مستوى الخدمة: التجديد قبل 30 يوماً' : 'SLA: 30 Days Prior Renewal'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {employeeDocs.map((doc) => (
                <div key={doc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {isAr ? (doc.categoryLabelAr || doc.categoryLabelEn) : doc.categoryLabelEn}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 block">{doc.documentNumber}</span>
                  </div>

                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] text-slate-400 block">{isAr ? 'الانتهاء' : 'Expiry'}</span>
                    <span className={`font-semibold text-xs ${doc.daysUntilExpiry <= 30 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {doc.expiryDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SupplierEmployeeDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SupplierEmployeeDetailContent />
    </Suspense>
  );
}
