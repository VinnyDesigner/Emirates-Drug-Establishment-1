'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  Users2,
  Building2,
  Phone,
  Mail,
  Search,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export default function ManagerTeamPage() {
  const { employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Assigned department: Drug Registration & Licensing
  const team = employees.filter(
    (e) =>
      e.departmentEn === 'Drug Registration & Licensing' &&
      (e.fullNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.jobTitleEn.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'دليل كادر الإدارة التخصصي' : 'Department Team Overview'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/manager/dashboard' },
            { label: isAr ? 'فريق العمل' : 'Team' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr
                  ? 'أخصائيو تسجيل وترخيص الأدوية الخارجيون'
                  : 'Drug Registration & Licensing Outsourced Specialists'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'دليل إشرافي شامل للكوادر الصيدلانية التخصصية الخارجية المسندة للإدارة.'
                  : 'Supervisory directory of assigned external pharmaceutical professionals.'}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'ابحث عن عضو في الفريق...' : 'Search team member...'}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#2463A6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#142B52] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0">
                      {member.fullNameEn.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">
                        {isAr ? member.fullNameAr : member.fullNameEn}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">{member.employeeId}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      member.employmentStatus === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {t(member.employmentStatus)}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="font-semibold text-slate-800">
                    {isAr ? member.jobTitleAr : member.jobTitleEn}
                  </p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#008F88] shrink-0" />
                    <span>{isAr ? 'جهة التعهيد:' : 'Contractor:'} {member.supplierEn}</span>
                  </p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-mono">{member.email}</span>
                  </p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono" dir="ltr">{member.mobile}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
