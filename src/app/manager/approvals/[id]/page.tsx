'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  FileText,
} from 'lucide-react';

function ManagerApprovalDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { leaveRequests, reviewLeaveRequest, leaveBalance } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);

  const request =
    leaveRequests.find((r) => r.id === id || r.requestId === id) ||
    leaveRequests[0];

  const handleDecision = (decision: 'approved' | 'rejected' | 'returned_for_clarification') => {
    if (decision === 'rejected' && !remarks.trim()) {
      alert('Please enter justification remarks for the rejection.');
      return;
    }
    reviewLeaveRequest(request.id, decision, remarks || 'Approved by Line Manager.');
    setIsProcessed(true);
    setTimeout(() => {
      router.push('/manager/approvals');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/manager/approvals"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isAr ? `طلب اعتماد ${request.requestId}` : `Approval Request ${request.requestId}`}
                </h1>
                <StatusBadge status={request.status} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? `مُقدَّم من ${request.employeeName} (${request.employeeId})`
                  : `Submitted by ${request.employeeName} (${request.employeeId})`}
              </p>
            </div>
          </div>

          {isProcessed ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم تسجيل القرار بنجاح' : 'Decision Committed Successfully'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تم تحديث سجل الإجازات وإرسال الإشعارات. جارٍ العودة إلى صندوق الوارد...'
                  : 'Leave record and notifications have been updated. Returning to inbox...'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Request Details Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'نوع الإجازة' : 'Leave Type'}
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block capitalize">
                      {isAr
                        ? request.leaveType === 'annual'
                          ? 'إجازة اعتيادية سنوية'
                          : request.leaveType === 'sick'
                          ? 'إجازة مرضية معتمدة'
                          : 'إجازة طارئة'
                        : `${request.leaveType} Leave`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'الأيام المطلوبة' : 'Requested Days'}
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {isAr ? `${request.days} أيام عمل` : `${request.days} Working Days`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'تاريخ البدء' : 'Start Date'}
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{request.startDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'تاريخ الانتهاء' : 'End Date'}
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{request.endDate}</span>
                  </div>
                </div>

                {/* Balance Impact Inspection */}
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2463A6]" />
                    <span className="text-xs font-bold text-[#142B52]">
                      {isAr ? 'تحليل تأثير الإجازة على الرصيد' : 'Leave Balance Impact Analysis'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">
                        {isAr ? 'الرصيد المتاح حالياً:' : 'Current Available:'}
                      </span>
                      <span className="font-bold text-slate-800">
                        {isAr ? `${leaveBalance.annualRemaining} يوم` : `${leaveBalance.annualRemaining} days`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">
                        {isAr ? 'هذا الطلب:' : 'This Request:'}
                      </span>
                      <span className="font-bold text-amber-600">
                        {isAr ? `-${request.days} يوم` : `-${request.days} days`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">
                        {isAr ? 'الرصيد بعد الموافقة:' : 'Post-Approval Balance:'}
                      </span>
                      <span className="font-bold text-emerald-700">
                        {isAr
                          ? `${leaveBalance.annualRemaining - request.days} يوم`
                          : `${leaveBalance.annualRemaining - request.days} days`}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    {isAr ? 'سبب الإجازة المدخل من الموظف:' : 'Employee Reason:'}
                  </span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {request.reason || (isAr ? 'إجازة سنوية اعتيادية للسفر وقضاء وقت مع العائلة.' : 'Annual leave requested for family travel.')}
                  </p>
                </div>

                {/* Manager Remarks Form */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr
                      ? 'ملاحظات وتوجيهات المدير المباشر (إلزامية في حال الرفض)'
                      : 'Manager Remarks / Feedback (Mandatory for rejection)'}
                  </label>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={
                      isAr
                        ? 'أدخل ملاحظات الاعتماد أو أسباب طلب الاستيضاح...'
                        : 'Enter approval comments or clarification requirements...'
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleDecision('returned_for_clarification')}
                    className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold transition-colors"
                  >
                    {isAr ? 'إعادة للاستيضاح' : 'Return for Clarification'}
                  </button>

                  <button
                    onClick={() => handleDecision('rejected')}
                    className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors"
                  >
                    {isAr ? 'رفض الطلب' : 'Reject Request'}
                  </button>

                  <button
                    onClick={() => handleDecision('approved')}
                    className="px-6 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'اعتماد الإجازة' : 'Approve Leave'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ManagerApprovalDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ManagerApprovalDetailContent />
    </Suspense>
  );
}
