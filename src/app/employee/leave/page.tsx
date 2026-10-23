'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  CalendarDays,
  PlusCircle,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
} from 'lucide-react';

export default function LeaveOverviewPage() {
  const { leaveBalance, leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAr = language === 'ar';

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'إدارة الإجازات والأرصدة' : 'Leave Management & Balances'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'إدارة الإجازات' : 'Leave Management' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Top Actions & Balances Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'استحقاقات الإجازات ونظرة عامة' : 'Leave Entitlements & Overview'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'متابعة الأرصدة المستحقة والموافقات المعلقة والإجازات المعتمدة القادمة.'
                  : 'Track accrued entitlements, pending approvals, and upcoming approved absence.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/employee/leave/apply"
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isAr ? 'تقديم طلب إجازة' : 'Apply for Leave'}</span>
              </Link>
              <Link
                href="/employee/leave/history"
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <History className="w-4 h-4" />
                <span>{isAr ? 'سجل الطلبات' : 'Request History'}</span>
              </Link>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title={isAr ? 'رصيد الإجازة السنوية المتبقي' : 'Annual Balance Remaining'}
              value={isAr ? `${leaveBalance.annualRemaining} يوم` : `${leaveBalance.annualRemaining} Days`}
              subtitle={isAr ? 'الرصيد الفعلي القابل للاستخدام' : 'Current usable calendar balance'}
              highlightColor="primary"
              icon={<CalendarDays className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'الاستحقاق السنوي الكامل' : 'Annual Entitlement'}
              value={isAr ? `${leaveBalance.annualTotal} يوم` : `${leaveBalance.annualTotal} Days`}
              subtitle={isAr ? 'المخصص السنوي النظامي الكامل' : 'Full-year statutory allocation'}
              highlightColor="accent"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'المستنفد هذا العام' : 'Used This Year'}
              value={isAr ? `${leaveBalance.annualUsed} يوم` : `${leaveBalance.annualUsed} Days`}
              subtitle={isAr ? 'إجازات تم استنفادها واحتسابها' : 'Completed and deducted leaves'}
              highlightColor="amber"
              icon={<Clock className="w-5 h-5" />}
            />
            <MetricCard
              title={isAr ? 'بانتظار موافقة المدير المباشر' : 'Pending Manager Review'}
              value={isAr ? `${leaveBalance.annualPending} يوم` : `${leaveBalance.annualPending} Days`}
              subtitle={isAr ? 'قيد المعالجة في قائمة الاعتمادات' : 'Currently locked in approval queue'}
              highlightColor={leaveBalance.annualPending > 0 ? 'rose' : 'emerald'}
              icon={<AlertCircle className="w-5 h-5" />}
            />
          </div>

          {/* Tabular Details of Leave Categories */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{t('Entitlement Pools by Leave Category')}</h3>
              <Link
                href="/employee/leave/balances"
                className="text-xs text-[#2463A6] hover:underline font-semibold"
              >
                {t('View Detailed Rules')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">{t('Annual Vacation Leave')}</span>
                <p className="text-2xl font-black text-[#142B52]">
                  {leaveBalance.annualRemaining}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    / 30 {isAr ? 'يوم' : 'days'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('Accrues 2.5 days per completed service month')}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">{t('Certified Sick Leave')}</span>
                <p className="text-2xl font-black text-emerald-700">
                  {leaveBalance.sickRemaining}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    / 15 {isAr ? 'يوم' : 'days'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('Full pay entitlement with approved DHA/EHS medical report')}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">{t('Emergency & Compassionate')}</span>
                <p className="text-2xl font-black text-amber-700">
                  {leaveBalance.emergencyRemaining}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    / 5 {isAr ? 'أيام' : 'days'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('Bereavement and immediate family emergency clause')}
                </p>
              </div>
            </div>
          </div>

          {/* Active Leave Requests Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{t('Submitted Leave Requests')}</h3>
              <Link
                href="/employee/leave/apply"
                className="text-xs text-[#2463A6] hover:underline font-semibold flex items-center gap-1"
              >
                <span>{t('New Application')}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{t('Request ID')}</th>
                    <th className="py-3">{t('Leave Type')}</th>
                    <th className="py-3">{t('Start Date')}</th>
                    <th className="py-3">{t('End Date')}</th>
                    <th className="py-3">{t('Days')}</th>
                    <th className="py-3">{t('Reason')}</th>
                    <th className="py-3">{t('Status')}</th>
                    <th className="py-3">{t('Reviewed By')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/60">
                      <td className="py-3 font-mono font-bold text-slate-800">{req.requestId}</td>
                      <td className="py-3 capitalize font-medium">{t(req.leaveType)}</td>
                      <td className="py-3 text-slate-600 font-mono">{req.startDate}</td>
                      <td className="py-3 text-slate-600 font-mono">{req.endDate}</td>
                      <td className="py-3 font-bold text-slate-800">
                        {req.days} {isAr ? 'يوم' : 'd'}
                      </td>
                      <td className="py-3 text-slate-600 max-w-xs truncate">{req.reason}</td>
                      <td className="py-3">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="py-3 text-slate-500">{req.reviewedBy || (isAr ? 'معلق' : 'Pending')}</td>
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
