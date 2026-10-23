'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  CalendarCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

export default function ManagerLeaveCalendarPage() {
  const { leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('November 2026');

  // Days in November 2026 (30 days)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // November leaves:
  // Ahmed: Nov 2 - Nov 5 (pending)
  // Rashid: Nov 15 - Nov 20 (pending)
  const isDayOnLeave = (day: number) => {
    const events: { name: string; type: string; status: string }[] = [];
    if (day >= 2 && day <= 5) {
      events.push({
        name: isAr ? 'أحمد المنصوري' : 'Ahmed Al Mansoori',
        type: isAr ? 'سنوية' : 'Annual',
        status: 'under_review',
      });
    }
    if (day >= 15 && day <= 20) {
      events.push({
        name: isAr ? 'راشد الكعبي' : 'Rashid Al Kaabi',
        type: isAr ? 'سنوية' : 'Annual',
        status: 'under_review',
      });
    }
    return events;
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تقويم إجازات الفريق ومخطط التغطية التشغيلية' : 'Team Leave Calendar & Coverage Planner'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/manager/dashboard' },
            { label: isAr ? 'تقويم الإجازات' : 'Leave Calendar' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'جدول إجازات وتغطية كادر الإدارة الشهري' : 'Monthly Department Leave & Coverage Schedule'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'مخطط زمني مرئي لتتبع الغيابات المتزامنة لمنع أي فجوات تشغيلية في تقييم وترخيص الأدوية.'
                  : 'Visual timeline tracking simultaneous absences to prevent operational gaps in drug assessment.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/manager/approvals"
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{isAr ? 'صندوق الموافقات' : 'Approvals Inbox'}</span>
              </Link>
            </div>
          </div>

          {/* Month Selector Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
            <button
              onClick={() => setCurrentMonth(isAr ? 'أكتوبر 2026' : 'October 2026')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 text-sm">
                {isAr ? 'نوفمبر 2026' : currentMonth}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'قسم تسجيل وترخيص الأدوية' : 'Drug Registration & Licensing Division'}
              </p>
            </div>
            <button
              onClick={() => setCurrentMonth(isAr ? 'ديسمبر 2026' : 'December 2026')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
              <span>{isAr ? 'الأحد' : 'Sun'}</span>
              <span>{isAr ? 'الإثنين' : 'Mon'}</span>
              <span>{isAr ? 'الثلاثاء' : 'Tue'}</span>
              <span>{isAr ? 'الأربعاء' : 'Wed'}</span>
              <span>{isAr ? 'الخميس' : 'Thu'}</span>
              <span className="text-slate-400">{isAr ? 'الجمعة' : 'Fri'}</span>
              <span className="text-slate-400">{isAr ? 'السبت' : 'Sat'}</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => {
                const events = isDayOnLeave(day);
                const isWeekend = day % 7 === 6 || day % 7 === 0;

                return (
                  <div
                    key={day}
                    className={`min-h-[90px] p-2 rounded-xl border text-xs flex flex-col justify-between transition-colors ${
                      isWeekend ? 'bg-slate-50/70 border-slate-100' : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <span className={`font-mono font-bold ${isWeekend ? 'text-slate-400' : 'text-slate-800'}`}>
                      {day}
                    </span>

                    <div className="space-y-1">
                      {events.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-1 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-semibold truncate leading-tight"
                          title={`${ev.name} - ${ev.type}`}
                        >
                          {ev.name.split(' ')[0]} ({ev.type})
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coverage Health Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">
                  {isAr
                    ? 'لا توجد تعارضات تشغيلية في تغطية المهام خلال شهر نوفمبر 2026'
                    : 'No Operational Coverage Clashes in November 2026'}
                </p>
                <p className="text-[11px] text-emerald-700">
                  {isAr
                    ? 'ضمان وجود ما لا يقل عن 80% من الكادر التخصصي في فرق التقييم أثناء الإجازات المجدولة.'
                    : 'Minimum of 80% specialist presence guaranteed across regulatory assessment teams during scheduled absences.'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
