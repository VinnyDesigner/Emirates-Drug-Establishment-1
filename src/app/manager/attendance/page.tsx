'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Clock3, RefreshCw, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

export default function ManagerAttendancePage() {
  const { attendanceRecords, attendanceSyncState, triggerAttendanceSync } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    await triggerAttendanceSync();
    setIsSyncing(false);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'متابعة حضور وانصراف الفريق' : 'Team Attendance Monitoring'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/manager/dashboard' },
            { label: isAr ? 'الحضور والانصراف' : 'Attendance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'سجلات بصمات المناوبات والتحقق البيومتري للإدارة' : 'Department Shift Punches & Biometric Verification'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تسجيلات بوابات الدخول اللحظية متطابقة ومنظمة عبر محول التكامل البيومتري للمؤسسة.'
                  : 'Live gate punches normalized via Establishment biometric integration adapter.'}
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? (isAr ? 'جاري تحديث البوابات...' : 'Refreshing Gates...') : (isAr ? 'تشغيل المزامنة الحية للبوابات' : 'Sync Live Turnstiles')}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'سجلات بصمة الحضور اليومية للإدارة' : "Today's Department Punch Records"}
              </h3>
              <span className="text-xs text-slate-400">
                {isAr ? 'آخر مزامنة:' : 'Last Synced:'} {attendanceSyncState.lastSync}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'اسم الموظف' : 'Employee Name'}</th>
                    <th className="py-3">{isAr ? 'الرقم الوظيفي' : 'ID'}</th>
                    <th className="py-3">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-3">{isAr ? 'تسجيل الدخول' : 'Check-In'}</th>
                    <th className="py-3">{isAr ? 'تسجيل الخروج' : 'Check-Out'}</th>
                    <th className="py-3">{isAr ? 'الساعات المسجلة' : 'Hours Logged'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 font-bold text-slate-900">{att.employeeName}</td>
                      <td className="py-3.5 font-mono text-slate-500">{att.employeeId}</td>
                      <td className="py-3.5 text-slate-600">{att.date}</td>
                      <td className="py-3.5 font-mono font-bold text-emerald-700">{att.checkIn}</td>
                      <td className="py-3.5 font-mono text-slate-700">{att.checkOut}</td>
                      <td className="py-3.5 font-mono font-bold text-[#142B52]">
                        {att.workingHours.toFixed(2)} {isAr ? 'س' : 'hrs'}
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={att.status} />
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
