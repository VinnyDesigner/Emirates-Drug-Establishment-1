'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useI18n } from '@/lib/i18n';
import {
  ArrowLeft,
  Mail,
  Phone,
} from 'lucide-react';

function EdeWorkforceDossierContent() {
  const params = useParams();
  const id = params?.id as string;
  const { employees, documents } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';
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
              href="/ede/workforce"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isAr ? employee.fullNameAr : employee.fullNameEn}
                </h1>
                <StatusBadge status={employee.employmentStatus.toLowerCase().replace(/\s+/g, '_') as any} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr ? employee.jobTitleAr : employee.jobTitleEn} •{' '}
                {isAr ? employee.departmentAr : employee.departmentEn} •{' '}
                {isAr
                  ? `متعاقد عبر ${employee.supplierAr || employee.supplierEn}`
                  : `Contracted via ${employee.supplierEn}`}
              </p>
            </div>
          </div>

          {/* Dossier Overview */}
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
                  {isAr ? 'مزود الخدمة / المتعهد' : 'Contractor / Supplier'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {isAr ? (employee.supplierAr || employee.supplierEn) : employee.supplierEn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'الجنسية' : 'Nationality'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.nationality}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'تاريخ الالتحاق' : 'Contract Onboarding'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono">{employee.joiningDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  {isAr ? 'قنوات التواصل المعتمدة' : 'Official Contact Channels'}
                </span>
                <div className="flex items-center gap-2 text-slate-600 dir-ltr rtl:justify-end">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dir-ltr rtl:justify-end">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{employee.mobile}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  {isAr ? 'بيانات الرواتب وحماية الأجور (WPS)' : 'Salary & WPS Compliance'}
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isAr ? 'اسم المصرف:' : 'Bank Name:'}</span>
                  <span className="font-semibold text-slate-800">{employee.bankDetails.bankName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isAr ? 'الآيبان المحمي:' : 'Masked IBAN:'}</span>
                  <span className="font-mono font-semibold text-slate-800">{employee.bankDetails.maskedIban}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Document Compliance Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">
                {isAr ? 'الوثائق الثبوتية وجدول انتهاء الصلاحية' : 'Statutory Documents & Expiry Timeline'}
              </h2>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                {isAr ? 'مراقبة التجديد قبل 30 يوماً' : '30-Day Renewal Monitoring'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {employeeDocs.map((doc) => (
                <div key={doc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {isAr ? (doc.categoryLabelAr || doc.categoryLabelEn) : doc.categoryLabelEn}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 block mt-0.5">{doc.documentNumber}</span>
                  </div>
                  <div className={isAr ? 'text-left' : 'text-right'}>
                    <span className="text-[10px] text-slate-500 block">
                      {isAr ? 'تاريخ الانتهاء' : 'Expires'}
                    </span>
                    <span className={`font-semibold text-xs font-mono ${doc.daysUntilExpiry <= 30 ? 'text-rose-600' : 'text-slate-700'}`}>
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

export default function EdeWorkforceDossierPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EdeWorkforceDossierContent />
    </Suspense>
  );
}
