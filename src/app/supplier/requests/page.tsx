'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  LifeBuoy,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Landmark,
  MessageSquare,
} from 'lucide-react';

export default function SupplierRequestsQueuePage() {
  const { profile, reviewBankDetailChange, tickets, updateTicketStatus } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [actionDone, setActionDone] = useState('');

  const handleBankDecision = (decision: 'approved' | 'rejected') => {
    reviewBankDetailChange(decision, remarks.trim() || 'Verified against bank stamped account letter.');
    setActionDone(
      isAr
        ? (decision === 'approved' ? 'تمت الموافقة وتحديث الآيبان بنجاح!' : 'تم رفض طلب تعديل الحساب المصرفي.')
        : `Banking change request successfully ${decision}!`
    );
    setTimeout(() => setActionDone(''), 3000);
  };

  const handleResolveTicket = (ticketId: string) => {
    updateTicketStatus(ticketId, 'resolved', 'Tariq Al Hashimi');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'قائمة طلبات واستفسارات الكوادر' : 'Supplier Employee Requests Queue'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'طلبات الموظفين' : 'Requests Queue' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'عمليات خدمات الموظفين وقائمة التدقيق والاعتماد' : 'Employee Service Operations & Approval Queue'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'معالجة طلبات تعديل الملف الشخصي، وتحديثات الحسابات البنكية، والرد على تذاكر الاستفسارات وفق SLA.'
                : 'Process profile change requests, bank detail updates, and resolve employee ticketing inquiries.'}
            </p>
          </div>

          {actionDone && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{actionDone}</span>
            </div>
          )}

          {/* Section A: Profile & Banking Change Verification */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#2463A6]" />
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr ? 'قائمة تدقيق تعديلات الحسابات البنكية (WPS)' : 'Profile & Bank Detail Verification Queue (Scenario D)'}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {profile.pendingBankChange
                  ? (isAr ? 'إجراء واحد بانتظار التدقيق' : '1 Action Pending')
                  : (isAr ? 'لا توجد طلبات معلقة' : '0 Pending')}
              </span>
            </div>

            {profile.pendingBankChange ? (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      {isAr ? 'الموظف' : 'Employee'}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {isAr ? (profile.fullNameAr || profile.fullNameEn) : profile.fullNameEn}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-mono">{profile.employeeId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      {isAr ? 'الآيبان النشط حالياً' : 'Current Active IBAN'}
                    </span>
                    <span className="font-mono text-slate-700 block">{profile.bankDetails.maskedIban}</span>
                    <span className="text-[11px] text-slate-500">{profile.bankDetails.bankName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      {isAr ? 'الآيبان الجديد المطلوب' : 'Proposed New IBAN'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 block">
                      {profile.pendingBankChange.proposedIban}
                    </span>
                    <span className="text-[11px] text-slate-700 font-semibold">{profile.pendingBankChange.proposedBank}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    {isAr ? 'مبررات الموظف' : 'Employee Reason'}
                  </span>
                  <p className="text-slate-700 italic">&ldquo;{profile.pendingBankChange.reason}&rdquo;</p>
                </div>

                <div className="pt-2 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={isAr ? 'ملاحظات التحقق / تم فحص شهادة الحساب البنكي المختومة...' : 'Verification remarks / IBAN confirmation certificate verified...'}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl flex-1 text-xs text-slate-900 focus:outline-hidden"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBankDecision('rejected')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      {isAr ? 'رفض الطلب' : 'Reject Request'}
                    </button>
                    <button
                      onClick={() => handleBankDecision('approved')}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? 'التحقق واعتماد الآيبان' : 'Verify & Approve IBAN'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-4 text-center text-xs text-slate-400">
                {isAr ? 'لا توجد طلبات تعديل حسابات مصرفية معلقة في القائمة.' : 'No pending bank detail change requests in queue.'}
              </p>
            )}
          </div>

          {/* Section B: General Support Inquiries & Tickets */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'قائمة استفسارات الدعم (التزام بالرد خلال 24 ساعة)' : 'Support Inquiries Queue (24-Hour SLA)'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم التذكرة' : 'Ticket ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموظف' : 'Employee'}</th>
                    <th className="py-3 px-2">{isAr ? 'التصنيف' : 'Category'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموضوع' : 'Subject'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأولوية' : 'Priority'}</th>
                    <th className="py-3 px-2">{isAr ? 'حالة الالتزام' : 'SLA Status'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((tkt) => (
                    <tr key={tkt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{tkt.ticketNumber}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">{tkt.employeeName}</td>
                      <td className="py-3.5 px-2 text-slate-600">{t(tkt.category)}</td>
                      <td className="py-3.5 px-2 text-slate-800 font-medium max-w-xs truncate">{tkt.subject}</td>
                      <td className="py-3.5 px-2">
                        <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {t(tkt.priority)}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{isAr ? 'خلال 24 ساعة' : 'Within 24h'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <StatusBadge status={tkt.status} />
                      </td>
                      <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap space-x-1.5 rtl:space-x-reverse">
                        <Link
                          href={`/employee/requests/history?id=${tkt.id}`}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                        >
                          {isAr ? 'الرد' : 'Reply'}
                        </Link>
                        {tkt.status !== 'resolved' && (
                          <button
                            onClick={() => handleResolveTicket(tkt.id)}
                            className="px-3 py-1 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold cursor-pointer"
                          >
                            {isAr ? 'إغلاق ومكتمل' : 'Mark Resolved'}
                          </button>
                        )}
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
