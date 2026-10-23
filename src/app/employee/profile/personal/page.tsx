'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArrowLeft, UserSquare2, Building2 } from 'lucide-react';

export default function ProfilePersonalStandalonePage() {
  const { profile } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'المعلومات الشخصية وسجل المنشأة' : 'Personal Information'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الملف الشخصي' : 'Profile', href: '/employee/profile' },
            { label: isAr ? 'البيانات الشخصية' : 'Personal' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <Link
            href="/employee/profile"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? 'العودة لنظرة عامة على الملف الشخصي' : 'Return to Profile Overview'}</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-[#142B52] border-b border-slate-100 pb-3">
              {isAr ? 'بيانات الهوية الرسمية وسجل التعيين بالمنشأة' : 'Official Identification & Establishment Record'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الاسم بالإنجليزية' : 'Employee Name (English)'}
                </span>
                <span className="font-semibold text-slate-900 text-sm">{profile.fullNameEn}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الاسم الرسمي بالعربية' : 'Official Name (Arabic)'}
                </span>
                <span className="font-semibold text-slate-900 text-sm font-arabic">{profile.fullNameAr}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
                </span>
                <span className="font-mono font-bold text-[#142B52]">{profile.employeeId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'المسمى الوظيفي' : 'Job Designation'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? (profile.jobTitleAr || 'أخصائي أول شؤون تنظيمية وترخيص') : profile.jobTitleEn}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الإدارة التابعة' : 'Department'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? (profile.departmentAr || 'إدارة تسجيل الأدوية والتراخيص') : profile.departmentEn}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'شركة التزويد المتعاقدة' : 'Contracting Supplier'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? (profile.supplierAr || 'التميمي لخدمات القوى العاملة ذ.م.م') : profile.supplierEn}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
                </span>
                <span className="font-semibold text-slate-900 font-mono">{profile.dateOfBirth}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'تاريخ مباشرة العمل' : 'Joining Date'}
                </span>
                <span className="font-semibold text-slate-900 font-mono">{profile.joiningDate}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
