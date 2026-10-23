'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArrowLeft, Phone, Mail, Home, ShieldAlert } from 'lucide-react';

export default function ProfileContactStandalonePage() {
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
          pageTitle={isAr ? 'بيانات الاتصال وجهات الطوارئ' : 'Contact Details & Emergency Contacts'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الملف الشخصي' : 'Profile', href: '/employee/profile' },
            { label: isAr ? 'بيانات الاتصال' : 'Contact' },
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
              {isAr ? 'دليل الاتصال والعنوان السكني الرسمي' : 'Official Contact & Address Directory'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'البريد الإلكتروني للعمل' : 'Work Email'}
                </span>
                <span className="font-semibold text-slate-900">{profile.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'رقم الهاتف المتحرك' : 'Primary Mobile'}
                </span>
                <span className="font-semibold text-slate-900 font-mono">{profile.mobile}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'العنوان السكني بدولة الإمارات' : 'Residential Address'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? 'أبوظبي، شاطئ الراحة، برج البندر، شقة 804' : profile.residentialAddress}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {isAr ? 'بيانات الاتصال في حالات الطوارئ' : 'Emergency Contact Details'}
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'اسم جهة الاتصال' : 'Contact Person'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {isAr ? 'فاطمة المنصوري' : profile.emergencyContact.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'صلة القرابة' : 'Relationship'}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {isAr ? 'الزوجة' : profile.emergencyContact.relationship}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'هاتف الطوارئ' : 'Contact Telephone'}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {profile.emergencyContact.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
