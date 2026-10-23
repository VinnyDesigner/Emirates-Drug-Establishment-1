'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { UserPlus, Clock, CheckCircle2, Building2, Calendar, FileText } from 'lucide-react';

export default function EstablishmentVacanciesPage() {
  const { requisitions } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'طلبات التوظيف ومستهدفات الإحلال (SLA)' : 'Staffing Requisitions & Replacement SLAs'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'الشواغر والإحلال' : 'Vacancies & Replacements' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'حوكمة طلبات التوظيف والترشيح والإحلال' : 'Manpower Requisitions & Replacement Oversight'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'مراقبة التزام الموردين باتفاقية مستوى الخدمة RFP بند 3.7: ترشيح الكوادر خلال 15 يوم عمل، والإحلال السريع خلال 10 أيام عمل.'
                : 'Monitoring contractor compliance with Section 3.7 SLAs: Candidate nomination within 15 working days; replacement within 10 working days.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'مستهدف ترشيح الكوادر (SLA)' : 'Candidate Nomination SLA'}
              </span>
              <p className="text-2xl font-black text-emerald-700">
                {isAr ? '15 يوم عمل كحد أقصى' : '15 Working Days Target'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'متوسط المورد الحالي: 11.2 يوماً (ممتثل ومتقدم)' : 'Current contractor average: 11.2 days (Compliant)'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'مستهدف الإحلال البديل (SLA)' : 'Emergency Replacement SLA'}
              </span>
              <p className="text-2xl font-black text-emerald-700">
                {isAr ? '10 أيام عمل كحد أقصى' : '10 Working Days Target'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'متوسط المورد الحالي: 8.4 يوماً (ممتثل ومتقدم)' : 'Current contractor average: 8.4 days (Compliant)'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'طلبات التوظيف والترشيحات النشطة' : 'Active Staffing Requisitions & Nominations'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم الطلب' : 'Requisition ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الوظيفة' : 'Position'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'المورد' : 'Contractor'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الطلب' : 'Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'المهلة المسموحة' : 'SLA Days'}</th>
                    <th className="py-3 px-2">{isAr ? 'المرشحون' : 'Nominated Candidates'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requisitions.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{req.requisitionId}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">{t(req.positionTitle)}</td>
                      <td className="py-3.5 px-2 text-slate-600">{t(req.department)}</td>
                      <td className="py-3.5 px-2 text-slate-700">{t(req.assignedSupplier)}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-700">
                        {isAr ? (req.type === 'New Vacancy' ? 'شاغر جديد' : 'استبدال طارئ') : req.type}
                      </td>
                      <td className="py-3.5 px-2 font-bold text-[#142B52]">
                        {req.slaDaysAllowed} {isAr ? 'أيام' : 'days'}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="font-semibold text-slate-800">
                          {req.nominatedCandidates?.length ?? 0} {isAr ? 'مرشحين مؤهلين' : 'candidates'}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={req.status} />
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
