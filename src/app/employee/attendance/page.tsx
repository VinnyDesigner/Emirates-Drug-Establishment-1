'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MetricCard } from '@/components/common/MetricCard';
import {
  Clock3,
  Calendar,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export default function EmployeeAttendancePage() {
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

  const totalPresent = attendanceRecords.filter((r) => r.status === 'present').length;
  const totalLate = attendanceRecords.filter((r) => r.status === 'late').length;
  const avgHours = (
    attendanceRecords.reduce((acc, r) => acc + r.workingHours, 0) / (attendanceRecords.length || 1)
  ).toFixed(1);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'سجل الحضور ومحول التكامل' : 'Attendance & Integration Adapter'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الحضور والانصراف' : 'Attendance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'سجلات الحضور والانصراف' : 'Time & Attendance Records'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'حركات الدخول والخروج المتكاملة مع البوابات الذكية لمؤسسة الإمارات للدواء.'
                  : 'Punches integrated from Emirates Drug Establishment biometric turnstiles and smart gates.'}
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>
                {isSyncing
                  ? (isAr ? 'جارٍ مزامنة البوابة البيومترية...' : 'Syncing Biometric Gate...')
                  : (isAr ? 'تشغيل المزامنة الحية للبوابات' : 'Trigger Live Biometric Sync')}
              </span>
            </button>
          </div>

          {/* Metric Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title={isAr ? 'نسبة الامتثال للحضور' : 'Attendance Compliance'}
              value="98.2%"
              subtitle={isAr ? 'تم إكمال 21 وردية' : '21 shifts completed'}
              highlightColor="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'متوسط الساعات اليومية' : 'Average Daily Hours'}
              value={isAr ? `${avgHours} س` : `${avgHours} hrs`}
              subtitle={isAr ? 'المستهدف: 8.00 ساعات / وردية' : 'Target: 8.00 hrs / shift'}
              highlightColor="primary"
              icon={<Clock3 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'حالات التأخير' : 'Late Arrivals'}
              value={totalLate}
              subtitle={isAr ? 'فترة السماح: 15 دقيقة' : 'Tolerance: 15 mins'}
              highlightColor="amber"
              icon={<AlertTriangle className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'الغياب (غير المصرح)' : 'Absences (Unapproved)'}
              value="0"
              subtitle={isAr ? 'نسبة حضور 100%' : '100% attendance rate'}
              highlightColor="emerald"
              icon={<ShieldCheck className="w-5 h-5" />}
            />
          </div>

          {/* Section 14 Integration-Ready Architecture Demo Box */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#2463A6]" />
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr
                    ? 'محول تكامل حضور المنشأة (بند RFP 3.5.1 h)'
                    : 'Establishment Attendance Integration Adapter (Section 3.5.1 h)'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {isAr ? 'موصل واجهة برمجة مباشر (API Live)' : 'API Live Connector'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'النظام المصدر' : 'Source System'}
                </span>
                <span className="font-semibold text-slate-900 truncate block">{attendanceSyncState.sourceSystem}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'آخر مزامنة منفذة' : 'Last Sync Execution'}
                </span>
                <span className="font-semibold text-slate-900">{attendanceSyncState.lastSync}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الحركات المستوردة' : 'Punches Ingested'}
                </span>
                <span className="font-bold text-emerald-700">
                  {isAr ? `${attendanceSyncState.recordsProcessed} سجل` : `${attendanceSyncState.recordsProcessed} Records`}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الحركات المكررة المستبعدة' : 'Duplicates Filtered'}
                </span>
                <span className="font-semibold text-slate-700">
                  {isAr
                    ? `${attendanceSyncState.duplicatesSkipped} تم استبعادها (حماية من الارتداد)`
                    : `${attendanceSyncState.duplicatesSkipped} Dropped (Anti-bounce)`}
                </span>
              </div>
            </div>
          </div>

          {/* Attendance Log Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل الحركات البيومترية اليومية - أكتوبر 2026' : 'October 2026 Daily Biometric Punch Log'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'حركة الدخول' : 'Check-In Punch'}</th>
                    <th className="py-3 px-2">{isAr ? 'حركة الخروج' : 'Check-Out Punch'}</th>
                    <th className="py-3 px-2">{isAr ? 'إجمالي ساعات الوردية' : 'Total Shift Hours'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2">{isAr ? 'محول المصدر' : 'Source Adapter'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900">{att.date}</td>
                      <td className="py-3.5 px-2 font-mono text-emerald-700 font-bold">{att.checkIn}</td>
                      <td className="py-3.5 px-2 font-mono text-slate-700">{att.checkOut}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">
                        {isAr ? `${att.workingHours.toFixed(2)} س` : `${att.workingHours.toFixed(2)} hrs`}
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={att.status} />
                      </td>
                      <td className="py-3.5 px-2 font-mono text-[11px] text-slate-400">
                        {att.sourceSystem}
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
