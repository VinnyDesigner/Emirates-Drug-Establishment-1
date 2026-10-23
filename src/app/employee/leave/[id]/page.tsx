'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  CalendarDays,
  ArrowLeft,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

function LeaveDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { leaveRequests, currentUser } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const request =
    leaveRequests.find((r) => r.id === id || r.requestId === id) ||
    leaveRequests[0];

  if (!request) {
    return (
      <div className="flex h-screen bg-[#F5F7FB] items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            {isAr ? 'لم يتم العثور على سجل طلب الإجازة.' : 'Leave request record not found.'}
          </p>
          <Link
            href="/employee/leave"
            className="px-4 py-2 bg-[#142B52] text-white text-xs rounded-xl inline-block cursor-pointer"
          >
            {isAr ? 'العودة لنظرة عامة على الإجازات' : 'Back to Leave Overview'}
          </Link>
        </div>
      </div>
    );
  }

  const handleCancelRequest = () => {
    if (confirm(isAr ? 'هل أنت متأكد من رغبتك في سحب وإلغاء طلب الإجازة هذا؟' : 'Are you sure you want to withdraw this leave request?')) {
      setIsCancelled(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? `تفاصيل طلب الإجازة ${request.requestId}` : `Leave Request ${request.requestId}`}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'إدارة الإجازات' : 'Leave', href: '/employee/leave' },
            { label: request.requestId },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/employee/leave"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {isAr ? `طلب إجازة ${request.requestId}` : `Leave Request ${request.requestId}`}
                  </h1>
                  <StatusBadge
                    status={isCancelled ? 'rejected' : request.status}
                    label={isCancelled ? (isAr ? 'ملغى من الموظف' : 'Cancelled by Employee') : undefined}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr
                    ? `تم التقديم بتاريخ ${new Date(request.submittedAt).toLocaleDateString('ar-AE')}`
                    : `Submitted on ${new Date(request.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                </p>
              </div>
            </div>

            {(request.status === 'submitted' || request.status === 'under_review') && !isCancelled && (
              <button
                onClick={handleCancelRequest}
                className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                {isAr ? 'سحب وإلغاء الطلب' : 'Withdraw Request'}
              </button>
            )}
          </div>

          {/* Request Overview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'نوع الإجازة' : 'Leave Type'}
                </span>
                <span className="text-sm font-bold text-slate-800 capitalize mt-0.5 block">
                  {isAr ? (request.leaveType === 'annual' ? 'إجازة سنوية' : request.leaveType === 'sick' ? 'إجازة مرضية' : 'إجازة طارئة') : `${request.leaveType} Leave`}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'المدة الإجمالية' : 'Duration'}
                </span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                  {request.days} {isAr ? 'أيام عمل' : 'Working Days'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'تاريخ البدء' : 'Start Date'}
                </span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block font-mono">
                  {request.startDate}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'تاريخ العودة / الانتهاء' : 'End Date'}
                </span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block font-mono">
                  {request.endDate}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                {isAr ? 'سبب طلب الإجازة:' : 'Reason for Leave:'}
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {request.reason || (isAr ? 'إجازة سنوية اعتيادية وسفر عائلي.' : 'Annual vacation and family travel.')}
              </p>
            </div>

            {request.managerRemarks && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5">
                <span className="text-xs font-bold text-blue-900 block mb-0.5">
                  {isAr ? 'ملاحظات قرار المدير المباشر:' : 'Line Manager Decision Remarks:'}
                </span>
                <p className="text-xs text-blue-800">{request.managerRemarks}</p>
              </div>
            )}
          </div>

          {/* Multi-Tier Approval Workflow Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isAr ? 'مسار الاعتمادات وسجل التدقيق الإلكتروني' : 'Approval Journey & Audit Verification'}
            </h2>

            <div className="relative pl-6 rtl:pl-0 rtl:pr-6 space-y-6 before:absolute before:left-2 rtl:before:left-auto rtl:before:right-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Step 1: Submission */}
              <div className="relative">
                <div className="absolute -left-6 rtl:-left-auto rtl:-right-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      {isAr ? 'تقديم الطلب من قبل الموظف' : 'Request Submitted by Employee'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{request.submittedAt.split('T')[0]}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {isAr
                      ? `قام الموظف ${currentUser.nameAr || request.employeeName} بتقديم طلب إجازة لمدة ${request.days} يوم.`
                      : `${request.employeeName} submitted ${request.days} days ${request.leaveType} leave request.`}
                  </p>
                </div>
              </div>

              {/* Step 2: Line Manager */}
              <div className="relative">
                <div
                  className={`absolute -left-6 rtl:-left-auto rtl:-right-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${
                    request.status === 'approved'
                      ? 'bg-emerald-500'
                      : request.status === 'rejected'
                      ? 'bg-rose-500'
                      : 'bg-amber-500'
                  }`}
                >
                  {request.status === 'approved' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : request.status === 'rejected' ? (
                    <XCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      {isAr ? 'مراجعة واعتماد المدير المباشر في المنشأة' : 'EDE Line Manager Review'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {request.status === 'submitted' || request.status === 'under_review'
                        ? (isAr ? 'بانتظار القرار' : 'Awaiting Decision')
                        : (isAr ? 'تم اتخاذ القرار' : 'Decision Rendered')}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {isAr
                      ? `المسند إليه: رئيس القسم (د. مريم السويدي). الحالة: `
                      : `Assigned to Head of Section (Dr. Mariam Al Suwaidi). Status: `}
                    <span className="capitalize font-semibold text-slate-700">
                      {isAr
                        ? (request.status === 'approved' ? 'معتمد' : request.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة')
                        : request.status.replace(/_/g, ' ')}
                    </span>
                  </p>
                </div>
              </div>

              {/* Step 3: Supplier Record Update */}
              <div className="relative">
                <div
                  className={`absolute -left-6 rtl:-left-auto rtl:-right-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${
                    request.status === 'approved' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-800">
                    {isAr ? 'تحديث رصيد الإجازات في نظام المورد (HRMS)' : 'Supplier HRMS Balance Commitment'}
                  </span>
                  <p className="text-slate-500 mt-0.5">
                    {request.status === 'approved'
                      ? (isAr ? `تم خصم ${request.days} يوم تلقائياً من رصيد الإجازات المتاح.` : `Automatic payroll balance deduction completed. ${request.days} days debited.`)
                      : (isAr ? 'في انتظار موافقة المدير المباشر النهائية قبل الخصم من الرصيد.' : 'Pending final line manager authorization before balance deduction.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LeaveDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LeaveDetailContent />
    </Suspense>
  );
}
