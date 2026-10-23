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
import { FileCheck2, Clock, CheckCircle2, ShieldCheck, User } from 'lucide-react';

export default function EstablishmentApprovalsPage() {
  const { leaveRequests } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState<LeaveRequest | null>(null);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'الاعتمادات المتدرجة للمنشأة' : 'Establishment Tiered Approvals'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'الاعتمادات' : 'Approvals' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'الاعتمادات المتدرجة والرقابة الإشرافية للمنشأة' : 'Executive Tiered Approvals & Governance Oversight'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'إشراف رقابي رفيع المستوى عبر قوائم طلبات وإجازات الأقسام التخصصية الستة.'
                : 'High-level supervisory oversight across all department request queues.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل طلبات كوادر المنشأة' : 'Establishment Request Ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'اسم الموظف' : 'Employee Name'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة التابعة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'نوع الإجازة' : 'Type'}</th>
                    <th className="py-3 px-2">{isAr ? 'المدة' : 'Duration'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{req.requestId}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">{req.employeeName}</td>
                      <td className="py-3.5 px-2 text-slate-600">{t(req.department)}</td>
                      <td className="py-3.5 px-2 capitalize font-medium">{t(req.leaveType)}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-800">
                        {req.days} {isAr ? 'أيام' : 'days'}
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedReq(req);
                            setIsApprovalOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                        >
                          {isAr ? 'مراجعة الحالة' : 'Review Case'}
                        </button>
                      </td>
                    </tr>
                  ))}
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
