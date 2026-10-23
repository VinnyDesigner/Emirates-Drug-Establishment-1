'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  CalendarDays,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  User,
  PlusCircle,
} from 'lucide-react';

export default function LeaveHistoryPage() {
  const { leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(leaveRequests[0]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'سجل طلبات الإجازات ومسار الاعتماد' : 'Leave Request History & Approval Timeline'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الإجازات' : 'Leave', href: '/employee/leave' },
            { label: isAr ? 'السجل الزمني' : 'History' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between">
            <Link
              href="/employee/leave"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{isAr ? 'العودة إلى إدارة الإجازات' : 'Back to Leave Overview'}</span>
            </Link>

            <Link
              href="/employee/leave/apply"
              className="px-4 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'طلب إجازة جديد' : 'New Leave Request'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'كافة طلبات الإجازات المقدمة' : 'All Submitted Applications'}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                      <th className="py-3">{isAr ? 'النوع' : 'Type'}</th>
                      <th className="py-3">{isAr ? 'التواريخ' : 'Dates'}</th>
                      <th className="py-3">{isAr ? 'الأيام' : 'Days'}</th>
                      <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="py-3 text-right rtl:text-left">{isAr ? 'المسار' : 'Inspect'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaveRequests.map((req) => (
                      <tr
                        key={req.id}
                        onClick={() => setSelectedReq(req)}
                        className={`hover:bg-slate-50/70 cursor-pointer transition-colors ${
                          selectedReq?.id === req.id ? 'bg-sky-50/50' : ''
                        }`}
                      >
                        <td className="py-3.5 font-mono font-bold text-[#142B52]">{req.requestId}</td>
                        <td className="py-3.5 capitalize font-medium">{t(req.leaveType)} {isAr ? 'إجازة' : ''}</td>
                        <td className="py-3.5 text-slate-600">
                          {req.startDate} {isAr ? 'إلى' : 'to'} {req.endDate}
                        </td>
                        <td className="py-3.5 font-bold text-slate-900">{req.days} {isAr ? 'أيام' : ''}</td>
                        <td className="py-3.5">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="py-3.5 text-right rtl:text-left font-medium text-[#2463A6]">
                          {isAr ? 'المسار ←' : 'Timeline →'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 1 Col: Lifecycle Timeline Drawer */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'الطلب المحدد للمعاينة' : 'Selected Request'}
                </span>
                <h4 className="text-base font-bold text-[#142B52] font-mono">{selectedReq?.requestId}</h4>
              </div>

              {selectedReq ? (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isAr ? 'الفئة' : 'Category'}</span>
                      <span className="font-bold capitalize">{t(selectedReq.leaveType)} {isAr ? 'إجازة' : 'Leave'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isAr ? 'المدة' : 'Duration'}</span>
                      <span className="font-bold">{selectedReq.days} {isAr ? 'أيام تقويمية' : 'Calendar Days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isAr ? 'تاريخ التقديم' : 'Submitted'}</span>
                      <span>{new Date(selectedReq.submittedAt).toLocaleDateString(isAr ? 'ar-AE' : 'en-GB')}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">
                      {isAr ? 'سبب الإجازة المسجل' : 'Reason Provided'}
                    </span>
                    <p className="text-slate-700 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                      &ldquo;{selectedReq.reason}&rdquo;
                    </p>
                  </div>

                  {/* Visual Audit & Approval Timeline */}
                  <div className="space-y-3 pt-2">
                    <span className="text-slate-800 font-bold block">
                      {isAr ? 'دورة الاعتماد والتدقيق' : 'Approval Lifecycle'}
                    </span>

                    <div className="space-y-4 pl-3 rtl:pl-0 rtl:pr-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200">
                      {/* Step 1: Submission */}
                      <div className="relative space-y-0.5">
                        <div className="absolute -left-[19px] rtl:-left-auto rtl:-right-[19px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                        <p className="font-bold text-slate-900">{isAr ? 'تم تقديم الطلب' : 'Request Submitted'}</p>
                        <p className="text-slate-500 text-[11px]">{isAr ? 'بواسطة' : 'By'} {selectedReq.employeeName}</p>
                      </div>

                      {/* Step 2: Line Manager Review */}
                      <div className="relative space-y-0.5">
                        <div
                          className={`absolute -left-[19px] rtl:-left-auto rtl:-right-[19px] top-0.5 w-3 h-3 rounded-full ring-4 ring-white ${
                            selectedReq.status === 'approved'
                              ? 'bg-emerald-500'
                              : selectedReq.status === 'under_review'
                              ? 'bg-amber-400 animate-pulse'
                              : selectedReq.status === 'rejected'
                              ? 'bg-rose-500'
                              : 'bg-orange-500'
                          }`}
                        />
                        <p className="font-bold text-slate-900">
                          {isAr ? 'مراجعة المسؤول المباشر بالمؤسسة' : 'Establishment Line Manager Review'}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          {isAr ? 'المسؤول المكلّف: د. مريم السويدي (رئيس قسم تسجيل الأدوية)' : 'Assigned: Dr. Mariam Al Suwaidi (Head of Drug Reg)'}
                        </p>

                        {selectedReq.managerRemarks && (
                          <div className="mt-1.5 p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                            <span className="font-bold">{isAr ? 'ملاحظات المسؤول: ' : 'Manager Remarks: '}</span>
                            <span>{selectedReq.managerRemarks}</span>
                          </div>
                        )}
                      </div>

                      {/* Step 3: Resolution */}
                      <div className="relative space-y-0.5">
                        <div
                          className={`absolute -left-[19px] rtl:-left-auto rtl:-right-[19px] top-0.5 w-3 h-3 rounded-full ring-4 ring-white ${
                            selectedReq.status === 'approved'
                              ? 'bg-emerald-500'
                              : 'bg-slate-300'
                          }`}
                        />
                        <p className="font-bold text-slate-900">
                          {isAr ? 'تحديث الرصيد وتقويم الإجازات' : 'Balance & Calendar Update'}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          {selectedReq.status === 'approved'
                            ? (isAr ? 'تمت الموافقة. تم خصم الأيام من الرصيد وإرسال الإشعارات.' : 'Approved. Balances adjusted and notifications dispatched.')
                            : (isAr ? 'بانتظار اكتمال الإجراء السابق.' : 'Awaiting completion of previous step.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  {isAr ? 'اختر طلباً لعرض مساره الزمني.' : 'Select a request to inspect its timeline.'}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
