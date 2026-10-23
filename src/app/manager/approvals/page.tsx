'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ApprovalModal } from '@/components/modals/ApprovalModal';
import { LeaveRequest } from '@/lib/types';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Filter,
  User,
  Calendar,
} from 'lucide-react';

export default function ManagerApprovalsPage() {
  const { leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReq, setSelectedReq] = useState<LeaveRequest | null>(null);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  const filtered = leaveRequests.filter((req) => {
    const matchesSearch =
      req.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReview = (req: LeaveRequest) => {
    setSelectedReq(req);
    setIsApprovalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'صندوق اعتمادات وموافقات المسؤول المباشر' : 'Line Manager Approvals Inbox'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/manager/dashboard' },
            { label: isAr ? 'صندوق الموافقات' : 'Approvals Inbox' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'صندوق الموافقات الموحد لكادر الإدارة' : 'Unified Team Approvals Inbox'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'القرارات الإدارية المعتمدة تخصم تلقائياً من رصيد الإجازات، وتحدث تقويم الإدارة، وترسل إشعاراً فورياً للموظف.'
                  : 'Authorized decisions immediately deduct leave balances, update team calendar, and notify employees.'}
              </p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'ابحث باسم الموظف أو رقم الطلب...' : 'Search employee or request...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#2463A6]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">{isAr ? 'تصفية الحالة:' : 'Status Filter:'}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الطلبات' : 'All Requests'}</option>
                <option value="under_review">{isAr ? 'قيد المراجعة (تتطلب إجراء)' : 'Under Review (Action Needed)'}</option>
                <option value="approved">{isAr ? 'مقبول' : 'Approved'}</option>
                <option value="rejected">{isAr ? 'مرفوض' : 'Rejected'}</option>
                <option value="returned_for_clarification">{isAr ? 'معاد للاستفسار' : 'Returned for Clarification'}</option>
              </select>
            </div>
          </div>

          {/* Approvals Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'قائمة طلبات الإجازات المقدمة' : 'Submitted Applications Queue'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3">{isAr ? 'اسم الموظف' : 'Employee Name'}</th>
                    <th className="py-3">{isAr ? 'النوع' : 'Type'}</th>
                    <th className="py-3">{isAr ? 'التواريخ والأيام' : 'Dates & Days'}</th>
                    <th className="py-3">{isAr ? 'السبب' : 'Reason'}</th>
                    <th className="py-3">{isAr ? 'تاريخ التقديم' : 'Submitted On'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 text-right rtl:text-left">{isAr ? 'القرار الإداري' : 'Decision'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        {isAr ? 'لا توجد طلبات تطابق معايير التصفية المحددة.' : 'No requests matching this filter criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-mono font-bold text-[#142B52]">{req.requestId}</td>
                        <td className="py-3.5 font-bold text-slate-900">{req.employeeName}</td>
                        <td className="py-3.5 capitalize font-medium">{t(req.leaveType)} {isAr ? 'إجازة' : 'Leave'}</td>
                        <td className="py-3.5 text-slate-700">
                          {req.startDate} {isAr ? 'إلى' : 'to'} {req.endDate} ({req.days}{isAr ? 'ي' : 'd'})
                        </td>
                        <td className="py-3.5 text-slate-600 max-w-xs truncate">{req.reason}</td>
                        <td className="py-3.5 text-slate-500">
                          {new Date(req.submittedAt).toLocaleDateString(isAr ? 'ar-AE' : 'en-GB')}
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="py-3.5 text-right rtl:text-left whitespace-nowrap">
                          {req.status === 'under_review' ? (
                            <button
                              onClick={() => handleOpenReview(req)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                            >
                              {isAr ? 'مراجعة واتخاذ قرار' : 'Review & Decide'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenReview(req)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                            >
                              {isAr ? 'معاينة القرار' : 'Re-Inspect'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
