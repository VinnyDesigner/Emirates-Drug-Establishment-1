'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Clock3, RefreshCw, Server, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentAttendanceAnalyticsPage() {
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

  const handleExport = () => {
    exportToCSV('EDE_Establishment_Attendance_Audit', attendanceRecords, [
      { key: 'date', label: isAr ? 'تاريخ الوردية' : 'Shift Date' },
      { key: 'employeeId', label: isAr ? 'الرقم الوظيفي' : 'Employee ID' },
      { key: 'employeeName', label: isAr ? 'الاسم الكامل' : 'Full Name' },
      { key: 'department', label: isAr ? 'الإدارة' : 'Department' },
      { key: 'checkIn', label: isAr ? 'بصمة الدخول' : 'Check-In Punch' },
      { key: 'checkOut', label: isAr ? 'بصمة الخروج' : 'Check-Out Punch' },
      { key: 'workingHours', label: isAr ? 'ساعات العمل' : 'Total Hours' },
      { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      { key: 'sourceSystem', label: isAr ? 'نظام البوابة' : 'Source Adapter' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تحليلات الحضور ومحول التكامل البيومتري' : 'Workforce Attendance Analytics & Biometric Ingestion'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'سجلات الحضور' : 'Attendance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'نظام حضور المنشأة وتكامل البوابات البيومترية' : 'Establishment Attendance System & Biometric Ingestion'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'بوابة مزامنة بيومترية تلتقط بصمات الدخول عبر البوابات الدوارة الذكية بكافة منشآت المقر الرئيسي.'
                  : 'Enterprise biometric synchronization gateway capturing turnstile punches across all headquarters facilities.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تصدير سجل التدقيق (CSV)' : 'Export Audit (CSV)'}</span>
              </button>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="px-4 py-2.5 rounded-xl bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? (isAr ? 'جارٍ مزامنة البوابات...' : 'Synchronizing Gates...') : (isAr ? 'تشغيل المزامنة البيومترية' : 'Trigger Biometric Sync')}</span>
              </button>
            </div>
          </div>

          {/* Section 14 Integration Gateway Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#2463A6]" />
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr ? 'حالة محول تكامل الدخول البيومتري (بند 3.5.1 ح)' : 'Biometric Access Integration Adapter Status (Section 3.5.1 h)'}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {isAr ? '✓ المزامنة اللحظية متصلة ومباشرة' : '✓ Continuous Sync Online'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'نقطة نهاية المحول' : 'Adapter Endpoint'}
                </span>
                <span className="font-semibold text-slate-900 block truncate font-mono">{attendanceSyncState.sourceSystem}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'آخر دورة مزامنة' : 'Last Sync Cycle'}
                </span>
                <span className="font-semibold text-slate-900 font-mono">{attendanceSyncState.lastSync}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'السجلات المعالجة' : 'Records Ingested'}
                </span>
                <span className="font-bold text-emerald-700">
                  {isAr ? `${attendanceSyncState.recordsProcessed} سجلاً للكادر` : `${attendanceSyncState.recordsProcessed} Workforce Records`}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'تصفية التكرار' : 'Duplicate Filter'}
                </span>
                <span className="font-semibold text-slate-700">
                  {isAr ? `${attendanceSyncState.duplicatesSkipped} تم استبعادها` : `${attendanceSyncState.duplicatesSkipped} Dropped (Anti-bounce)`}
                </span>
              </div>
            </div>
          </div>

          {/* Master Log */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل تدفق حركات الحضور والانصراف' : 'Attendance Ingestion Log'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'بصمة الدخول' : 'In Punch'}</th>
                    <th className="py-3 px-2">{isAr ? 'بصمة الخروج' : 'Out Punch'}</th>
                    <th className="py-3 px-2">{isAr ? 'ساعات الوردية' : 'Shift Hours'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900 font-mono">{att.date}</td>
                      <td className="py-3.5 px-2 font-bold text-[#142B52]">{att.employeeName}</td>
                      <td className="py-3.5 px-2 text-slate-600">{t(att.department)}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-emerald-700">{att.checkIn}</td>
                      <td className="py-3.5 px-2 font-mono text-slate-700">{att.checkOut}</td>
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                        {att.workingHours.toFixed(2)} {isAr ? 'ساعة' : 'hrs'}
                      </td>
                      <td className="py-3.5 px-2">
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
