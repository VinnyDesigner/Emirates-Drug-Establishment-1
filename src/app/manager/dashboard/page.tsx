'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ApprovalModal } from '@/components/modals/ApprovalModal';
import { LeaveRequest } from '@/lib/types';
import {
  Users2,
  FileCheck2,
  CalendarCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
} from 'lucide-react';

export default function ManagerDashboardPage() {
  const { currentUser, leaveRequests, employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState<LeaveRequest | null>(null);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  // Department team: Drug Registration & Licensing
  const teamMembers = employees.filter(
    (e) => e.departmentEn === 'Drug Registration & Licensing'
  );

  const pendingApprovals = leaveRequests.filter((r) => r.status === 'under_review');
  const onLeaveCount = teamMembers.filter((e) => e.employmentStatus === 'On Leave').length;

  const handleReview = (req: LeaveRequest) => {
    setSelectedReq(req);
    setIsApprovalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'بوابة المسؤول المباشر' : 'Line Manager Portal'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/' },
            { label: isAr ? 'لوحة تحكم المسؤول المباشر' : 'Line Manager Dashboard' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#0B1E38] via-[#0E2447] to-[#008F88] text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-white/10">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00B3AA]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 font-semibold border border-white/15 backdrop-blur-xs text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? 'رئيس قسم التقييم الصيدلاني • إدارة تسجيل وترخيص الأدوية'
                      : 'Head of Pharmaceutical Assessment • Drug Registration & Licensing'}
                  </span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {isAr ? `مرحباً د. ${currentUser.nameAr || currentUser.name}` : `Welcome, ${currentUser.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
                {isAr
                  ? 'الإشراف على الكوادر الخارجية المتعاقدة، مراجعة طلبات الإجازات المعلقة، وفحص جداول الحضور والانصراف.'
                  : 'Supervise outsourced personnel, review pending leave applications, and inspect team attendance schedules.'}
              </p>
            </div>

            <Link
              href="/manager/approvals"
              className="px-5 py-3 rounded-xl bg-white text-[#0B1E38] hover:bg-slate-100 font-bold text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 shrink-0 relative z-10"
            >
              <FileCheck2 className="w-4 h-4 text-[#008F88]" />
              <span>{isAr ? 'مراجعة الموافقات' : 'Review Approvals'}</span>
              {pendingApprovals.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold animate-pulse">
                  {pendingApprovals.length}
                </span>
              )}
            </Link>
          </div>

          {/* Manager KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <MetricCard
              title={isAr ? 'إجمالي كادر الإدارة' : 'Department Team Headcount'}
              value={`${teamMembers.length} ${isAr ? 'أخصائيين' : 'Specialists'}`}
              subtitle={isAr ? 'تسجيل وترخيص الأدوية' : 'Drug Registration & Licensing'}
              highlightColor="primary"
              icon={<Users2 className="w-5 h-5" />}
              trend={{
                value: isAr ? '100% نشط' : '100% Active',
                isPositive: true,
                label: isAr ? 'جميع الكوادر مسندة' : 'All Roster Assigned',
              }}
            />
            <MetricCard
              title={isAr ? 'الموافقات المعلقة' : 'Pending Approvals'}
              value={pendingApprovals.length}
              subtitle={isAr ? 'بانتظار توقيعك واعتمادك' : 'Awaiting your authorized sign-off'}
              highlightColor={pendingApprovals.length > 0 ? 'amber' : 'emerald'}
              icon={<Clock className="w-5 h-5" />}
              trend={{
                value: `${pendingApprovals.length} ${isAr ? 'طلبات' : 'Requests'}`,
                isPositive: pendingApprovals.length === 0,
                label: isAr ? 'ساعة SLA نشطة' : 'SLA Clock Active',
              }}
            />
            <MetricCard
              title={isAr ? 'الكوادر في إجازة حالياً' : 'Personnel Currently on Leave'}
              value={onLeaveCount}
              subtitle={isAr ? 'تغطية كافية لمهام الإدارة' : 'Adequate department cover maintained'}
              highlightColor="accent"
              icon={<CalendarCheck className="w-5 h-5" />}
              trend={{
                value: isAr ? 'تغطية كاملة' : 'Full Coverage',
                isPositive: true,
                label: isAr ? 'لا توجد فجوات مناوبة' : 'No Shift Gaps',
              }}
            />
            <MetricCard
              title={isAr ? 'حضور البصمة اليوم' : 'Biometric Attendance Today'}
              value="96.8%"
              subtitle={isAr ? 'جميع مناوبات الصباح مسجلة' : 'All morning shifts accounted for'}
              highlightColor="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
              trend={{
                value: isAr ? 'ضمن المستهدف' : 'On Target',
                isPositive: true,
                label: isAr ? 'ساعات الدوام الرسمية' : 'Gov Office Hours',
              }}
            />
          </div>

          {/* Pending Approvals Inbox Quick Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'طلبات إجازات الفريق المعلقة' : 'Pending Team Leave Approvals'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'تتطلب قراراً إدارياً معتمداً من المسؤول المباشر' : 'Requires line manager authorized decision'}
                </p>
              </div>
              <Link
                href="/manager/approvals"
                className="text-xs text-[#1D68E2] hover:underline font-bold flex items-center gap-1 group"
              >
                <span>{isAr ? 'صندوق الموافقات الكامل' : 'Full Approvals Inbox'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3">{isAr ? 'نوع الإجازة' : 'Leave Type'}</th>
                    <th className="py-3">{isAr ? 'المدة' : 'Duration'}</th>
                    <th className="py-3">{isAr ? 'السبب' : 'Reason'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 text-right rtl:text-left">{isAr ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingApprovals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-400">
                        {isAr ? 'لا توجد طلبات معلقة في قائمة الانتظار. جميع الطلبات محدثة!' : 'No pending approvals in queue. All leave requests up to date!'}
                      </td>
                    </tr>
                  ) : (
                    pendingApprovals.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold text-[#142B52]">{req.requestId}</td>
                        <td className="py-3.5 font-bold text-slate-900">{req.employeeName}</td>
                        <td className="py-3.5 capitalize font-semibold text-slate-700">
                          {t(req.leaveType)} {isAr ? 'إجازة' : 'Leave'}
                        </td>
                        <td className="py-3.5 text-slate-600 font-medium">
                          {req.startDate} {isAr ? 'إلى' : 'to'} {req.endDate} <span className="text-slate-400">({req.days} {isAr ? 'أيام' : 'days'})</span>
                        </td>
                        <td className="py-3.5 text-slate-600 max-w-xs truncate">{req.reason}</td>
                        <td className="py-3.5">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="py-3.5 text-right rtl:text-left whitespace-nowrap">
                          <button
                            onClick={() => handleReview(req)}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F2342] to-[#1D68E2] hover:from-[#09172B] hover:to-[#1555BF] text-white text-xs font-bold shadow-xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                          >
                            {isAr ? 'مراجعة واتخاذ قرار' : 'Review & Decide'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Roster & Attendance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'أخصائيو تسجيل الأدوية' : 'Drug Registration Specialists'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'أعضاء الكادر النشط تحت الإشراف المباشر' : 'Active roster members under supervision'}
                  </p>
                </div>
                <Link href="/manager/team" className="text-xs text-[#1D68E2] hover:underline font-bold">
                  {isAr ? 'عرض الكل' : 'View All'} ({teamMembers.length}) {isAr ? '←' : '→'}
                </Link>
              </div>

              <div className="space-y-3">
                {teamMembers.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">{isAr ? member.fullNameAr : member.fullNameEn}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{isAr ? member.jobTitleAr : member.jobTitleEn}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t(member.employmentStatus)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'المخطط التقويمي لإجازات الفريق' : 'Team Leave Calendar Quick View'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'معاينة تغطية العمل وتعارض المواعيد' : 'Coverage conflicts & scheduling preview'}
                  </p>
                </div>
                <Link href="/manager/leave-calendar" className="text-xs text-[#1D68E2] hover:underline font-bold">
                  {isAr ? 'فتح المخطط التقويمي ←' : 'Open Planner →'}
                </Link>
              </div>

              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/80 text-xs space-y-2.5 text-slate-700">
                <div className="flex items-center gap-2 font-bold text-[#0F2342]">
                  <Calendar className="w-4 h-4 text-[#00B3AA]" />
                  <span>{isAr ? 'الإجازات المجدولة في نوفمبر 2026' : 'Scheduled Leaves in November 2026'}</span>
                </div>
                <div className="space-y-1.5 pl-6 rtl:pl-0 rtl:pr-6">
                  <p className="text-[11px] text-slate-600 font-medium">
                    &bull; {isAr ? 'أحمد المنصوري' : 'Ahmed Al Mansoori'}: <strong>{isAr ? '4 أيام' : '4 days'}</strong> (Nov 02 - Nov 05) &bull; <span className="text-amber-600">{isAr ? 'قيد المراجعة' : 'Under Review'}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    &bull; {isAr ? 'راشد الكعبي' : 'Rashid Al Kaabi'}: <strong>{isAr ? '5 أيام' : '5 days'}</strong> (Nov 15 - Nov 20) &bull; <span className="text-amber-600">{isAr ? 'قيد المراجعة' : 'Under Review'}</span>
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-200/80 text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'لم يتم رصد أي تعارض في جدول مناوبات الإدارة.' : 'No coverage conflicts detected in Department roster.'}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ApprovalModal
        request={selectedReq}
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
      />
    </div>
  );
}
