'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PayslipModal } from '@/components/modals/PayslipModal';
import {
  CalendarDays,
  FileCheck2,
  Clock3,
  AlertTriangle,
  PlusCircle,
  Download,
  FileSignature,
  LifeBuoy,
  HeartPulse,
  Plane,
  Building2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export default function EmployeeDashboardPage() {
  const { currentUser, leaveBalance, leaveRequests, documents, notifications, payslips } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(payslips[0]);
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);

  const pendingRequestsCount = leaveRequests.filter((r) => r.status === 'under_review').length;
  const expiringDocs = documents.filter((d) => d.renewalUrgent || d.daysUntilExpiry <= 30);

  const quickActions = [
    {
      title: 'Apply for Leave',
      titleAr: 'تقديم طلب إجازة',
      href: '/employee/leave/apply',
      icon: <CalendarDays className="w-5 h-5 text-[#2463A6]" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Download Payslip',
      titleAr: 'تحميل كشف الراتب',
      onClick: () => {
        setSelectedPayslip(payslips[0]);
        setIsPayslipModalOpen(true);
      },
      icon: <Download className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    {
      title: 'Request Certificate',
      titleAr: 'طلب شهادة رسمية',
      href: '/employee/payroll/certificates',
      icon: <FileSignature className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      title: 'Submit Service Request',
      titleAr: 'طلب خدمة أو استفسار',
      href: '/employee/requests/new',
      icon: <LifeBuoy className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
    {
      title: 'View Medical Insurance',
      titleAr: 'بطاقة التأمين الصحي',
      href: '/employee/insurance/coverage',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50',
    },
    {
      title: 'Request Air Ticket',
      titleAr: 'حجز تذكرة سفر سنوية',
      href: '/employee/air-tickets',
      icon: <Plane className="w-5 h-5 text-[#008F88]" />,
      bg: 'bg-teal-50',
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle="Employee Self Service"
          breadcrumbs={[
            { label: 'Portal', href: '/' },
            { label: 'Employee Dashboard' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Welcome Greeting Banner */}
          <div className="bg-gradient-to-r from-[#0B1E38] via-[#0E2447] to-[#1D68E2] text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B3AA]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#1D68E2]/25 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 font-semibold border border-white/15 backdrop-blur-xs text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Emirates Drug Establishment &bull; {currentUser.department}</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">&bull; EDE-EMP-1042</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ar' ? `صباح الخير، ${currentUser.nameAr || currentUser.name}` : `Good Morning, ${currentUser.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
                {isAr
                  ? 'مرحباً بك في بوابة الخدمة الذاتية المعتمدة للموظف. يمكنك متابعة رصيد الإجازات، كشوف الرواتب، والطلبات الرسمية.'
                  : 'Welcome to your authorized Employee Self Service portal. Review live leave balances, payroll statements, and official service requests.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <Link
                href="/employee/leave/apply"
                className="px-4.5 py-3 rounded-xl bg-gradient-to-r from-[#00B3AA] to-[#008F88] hover:from-[#008F88] hover:to-[#00736D] text-white text-xs font-bold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('Apply for Leave')}</span>
              </Link>
              <Link
                href="/employee/requests/new"
                className="px-4.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-teal-300" />
                <span>{t('Support Inquiry')}</span>
              </Link>
            </div>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <MetricCard
              title={t('metric.annualLeaveBalance')}
              value={`${leaveBalance.annualRemaining} Days`}
              subtitle={`${leaveBalance.annualUsed} used / ${leaveBalance.annualPending} pending`}
              icon={<CalendarDays className="w-5 h-5" />}
              highlightColor="primary"
              trend={{ value: '30 Days Total', isPositive: true, label: 'Annual Entitlement' }}
            />
            <MetricCard
              title={t('metric.pendingRequests')}
              value={pendingRequestsCount}
              subtitle="Awaiting Line Manager Approval"
              icon={<Clock3 className="w-5 h-5" />}
              highlightColor="amber"
              trend={{ value: 'Under Review', isPositive: false, label: 'Current SLA Track' }}
            />
            <MetricCard
              title="Attendance This Month"
              value="98.2%"
              subtitle="21 Present / 0 Absent / 1 Late"
              icon={<CheckCircle2 className="w-5 h-5" />}
              highlightColor="emerald"
              trend={{ value: '162 Hours', isPositive: true, label: 'Logged via Biometrics' }}
            />
            <MetricCard
              title={t('metric.expiringDocs')}
              value={expiringDocs.length}
              subtitle={expiringDocs.length > 0 ? `${expiringDocs[0].categoryLabelEn} (<30d)` : 'All Documents Compliant'}
              icon={<AlertTriangle className="w-5 h-5" />}
              highlightColor={expiringDocs.length > 0 ? 'rose' : 'emerald'}
              trend={{
                value: expiringDocs.length > 0 ? 'Urgent Action' : '100% Valid',
                isPositive: expiringDocs.length === 0,
                label: expiringDocs.length > 0 ? 'Residency Renewal Target' : 'Compliant',
              }}
            />
          </div>

          {/* 30-Day Renewal Alert Callout if any */}
          {expiringDocs.length > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border-l-4 rtl:border-l-0 rtl:border-r-4 border-amber-500 p-5 rounded-2xl text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs border border-amber-200/80">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">
                    {t('RFP Compliance Target: Document Renewal Action Required (Within 30 Days)')}
                  </p>
                  <p className="text-amber-900/90 leading-relaxed">
                    {isAr ? (
                      <>
                        تنتهي صلاحية وثيقة <strong>{expiringDocs[0].categoryLabelAr || expiringDocs[0].categoryLabelEn}</strong> في <strong>{expiringDocs[0].expiryDate}</strong> ({expiringDocs[0].daysUntilExpiry} يوماً متبقياً). تم توجيه فريق علاقات المزوّد لتنسيق إجراءات التجديد.
                      </>
                    ) : (
                      <>
                        Your <strong>{expiringDocs[0].categoryLabelEn}</strong> expires on <strong>{expiringDocs[0].expiryDate}</strong> ({expiringDocs[0].daysUntilExpiry} days remaining). The supplier PRO team has been dispatched to coordinate screening appointments.
                      </>
                    )}
                  </p>
                </div>
              </div>
              <Link
                href="/employee/documents"
                className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shrink-0 shadow-sm transition-all text-center"
              >
                {t('Inspect Document')}
              </Link>
            </div>
          )}

          {/* Quick Actions Grid */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('Quick Actions')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {quickActions.map((action, idx) => (
                action.href ? (
                  <Link
                    key={idx}
                    href={action.href}
                    className="p-4.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col items-center text-center gap-2.5 group"
                  >
                    <div className={`p-3 rounded-2xl ${action.bg} group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-xs`}>
                      {action.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#1D68E2] transition-colors leading-tight">
                      {language === 'ar' ? action.titleAr : action.title}
                    </span>
                  </Link>
                ) : (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className="p-4.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col items-center text-center gap-2.5 group cursor-pointer"
                  >
                    <div className={`p-3 rounded-2xl ${action.bg} group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-xs`}>
                      {action.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#1D68E2] transition-colors leading-tight">
                      {language === 'ar' ? action.titleAr : action.title}
                    </span>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Dual Column: Recent Requests & Employee Profile Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Requests Table (2 Cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t('Recent Service & Leave Requests')}</h3>
                  <p className="text-xs text-slate-500">{t('Live transaction lifecycle and status tracking')}</p>
                </div>
                <Link
                  href="/employee/leave/history"
                  className="text-xs text-[#1D68E2] hover:underline font-bold flex items-center gap-1 group"
                >
                  <span>{t('View All')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3">{t('Request ID')}</th>
                      <th className="py-3">{t('Type')}</th>
                      <th className="py-3">{t('Dates / Scope')}</th>
                      <th className="py-3">{t('Status')}</th>
                      <th className="py-3 text-right rtl:text-left">{t('Action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaveRequests.slice(0, 4).map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold text-[#142B52]">{req.requestId}</td>
                        <td className="py-3.5 capitalize font-semibold text-slate-800">
                          {t(req.leaveType)} {isAr ? 'إجازة' : 'Leave'}
                        </td>
                        <td className="py-3.5 text-slate-600 font-medium">
                          {req.startDate} {isAr ? 'إلى' : 'to'} {req.endDate} <span className="text-slate-400">({req.days}{isAr ? 'يوم' : 'd'})</span>
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="py-3.5 text-right rtl:text-left">
                          <Link
                            href="/employee/leave/history"
                            className="text-[#1D68E2] hover:underline font-bold text-xs"
                          >
                            {isAr ? 'التفاصيل ←' : 'Details →'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Employee Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">{t('Outsourced Profile Summary')}</h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {isAr ? (currentUser.nameAr || currentUser.name) : currentUser.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      {currentUser.employeeId}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">
                    {isAr ? (currentUser.jobTitleAr || currentUser.jobTitle) : currentUser.jobTitle}
                  </p>
                </div>

                <div className="space-y-2.5 text-slate-600">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">{t('Department')}</span>
                    <span className="font-semibold text-slate-800">
                      {isAr ? (currentUser.departmentAr || currentUser.department) : currentUser.department}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">{t('Assigned Supplier')}</span>
                    <span className="font-semibold text-slate-800">{currentUser.supplier}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">{t('Employment Status')}</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {t('Active')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-400">{t('Joining Date')}</span>
                    <span className="font-semibold text-slate-800 font-mono">10 Jan 2023</span>
                  </div>
                </div>

                <Link
                  href="/employee/profile"
                  className="block text-center w-full py-3 rounded-xl bg-slate-100/80 hover:bg-[#1D68E2] text-slate-700 hover:text-white font-bold text-xs transition-all shadow-2xs"
                >
                  {isAr ? 'إدارة الملف الشخصي والحساب المصرفي ←' : 'Manage Full Profile & Banking →'}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Payslip Modal */}
      <PayslipModal
        payslip={selectedPayslip}
        isOpen={isPayslipModalOpen}
        onClose={() => setIsPayslipModalOpen(false)}
      />
    </div>
  );
}
