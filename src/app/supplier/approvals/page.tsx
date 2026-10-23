'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  ShieldCheck,
  CreditCard,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Landmark,
} from 'lucide-react';

export default function SupplierApprovalsInboxPage() {
  const { profile, reviewBankDetailChange, certificates } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [actionDone, setActionDone] = useState('');

  const handleBankDecision = (decision: 'approved' | 'rejected') => {
    reviewBankDetailChange(decision, remarks.trim() || 'Verified against bank stamped account letter.');
    setActionDone(
      isAr
        ? (decision === 'approved' ? 'تمت الموافقة على طلب تحديث الحساب وتحديث الآيبان بنجاح!' : 'تم رفض طلب تعديل الحساب المصرفي.')
        : `Banking change request successfully ${decision}!`
    );
    setTimeout(() => setActionDone(''), 3000);
  };

  const pendingCertificates = certificates.filter(
    (c) => c.status === 'submitted' || c.status === 'processing'
  );

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مكتب اعتمادات وتدقيق المزوّد' : 'Supplier Approvals & Verification Desk'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'اعتمادات المزوّد' : 'Approvals Desk' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>
                {isAr
                  ? 'حاجز الاعتماد والتدقيق التشغيلي للمزوّد (كراسة الشروط بند 3.5.1)'
                  : 'SUPPLIER OPERATIONAL APPROVAL BARRIER (RFP SECTION 3.5.1)'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {isAr ? 'مكتب اعتمادات وتدقيق المزوّد' : 'Supplier Approvals & Verification Desk'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'مراجعة وتدقيق تعديلات الحسابات المصرفية الحساسة، شهادات الراتب، وتحديث بيانات الموظفين قبل اعتمادها بالسجلات النشطة.'
                : 'Review sensitive banking detail modifications, salary certificates, and contractor data updates before commitment to active records.'}
            </p>
          </div>

          {actionDone && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionDone}</span>
            </div>
          )}

          {/* Pending Bank Details Change Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2463A6]" />
                <h2 className="text-sm font-bold text-slate-800">
                  {isAr
                    ? 'طلب معلق لتعديل بيانات الحساب المصرفي لنظام حماية الأجور (WPS)'
                    : 'Pending WPS Banking Information Change Request'}
                </h2>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                {isAr ? 'يتطلب التحقق والمطابقة' : 'Verification Required'}
              </span>
            </div>

            {profile.pendingBankChange ? (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'الموظف' : 'Employee'}
                    </span>
                    <span className="font-bold text-slate-900 text-xs block">
                      {isAr ? profile.fullNameAr : profile.fullNameEn} ({profile.employeeId})
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isAr ? profile.departmentAr : profile.departmentEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'سبب التغيير' : 'Change Reason'}
                    </span>
                    <span className="font-semibold text-slate-800 text-xs block">
                      {profile.pendingBankChange.reason}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isAr ? 'المصرف والآيبان الحالي المعتمد' : 'Current Active Bank & IBAN'}
                    </span>
                    <span className="font-semibold text-slate-800 block text-xs">{profile.bankDetails.bankName}</span>
                    <span className="font-mono text-slate-600 block text-xs" dir="ltr">{profile.bankDetails.maskedIban}</span>
                  </div>
                  <div>
                    <span className="text-[#2463A6] block text-[10px] uppercase font-semibold">
                      {isAr ? 'المصرف والآيبان الجديد المطلوب' : 'Requested Bank & IBAN'}
                    </span>
                    <span className="font-bold text-slate-900 block text-xs">{profile.pendingBankChange.proposedBank}</span>
                    <span className="font-mono font-bold text-[#142B52] block text-xs" dir="ltr">{profile.pendingBankChange.proposedIban}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {isAr
                      ? 'ملاحظات التحقق / تأكيد خطاب المصرف المختوم'
                      : 'Verification Remarks / Stamped Letter Confirmation'}
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={isAr ? 'مثال: تم التحقق والمطابقة بموجب شهادة الحساب المختومة من مصرف أبوظبي التجاري' : 'e.g. Verified against Abu Dhabi Commercial Bank stamped certificate'}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleBankDecision('rejected')}
                    className="px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {isAr ? 'رفض التعديل' : 'Reject Change'}
                  </button>
                  <button
                    onClick={() => handleBankDecision('approved')}
                    className="px-5 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B3AA]" />
                    <span>{isAr ? 'اعتماد وتحديث الآيبان النشط' : 'Approve & Update Active IBAN'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">
                {isAr
                  ? 'لا توجد طلبات تعديل حسابات مصرفية معلقة. جميع أرقام الآيبان موثقة ومتزامنة مع نظام حماية الأجور.'
                  : 'No bank account modifications pending review. All employee IBANs are verified and synchronized with the UAE Wage Protection System.'}
              </div>
            )}
          </div>

          {/* Pending Certificates Queue */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-800">
                {isAr
                  ? `طلبات إصدار الشهادات المعلقة (${pendingCertificates.length})`
                  : `Pending Certificate Generation Requests (${pendingCertificates.length})`}
              </h2>
              <Link
                href="/supplier/certificates"
                className="text-xs font-semibold text-[#2463A6] hover:underline"
              >
                {isAr ? 'الانتقال إلى طابور الإنجاز ←' : 'Go to Fulfillment Queue →'}
              </Link>
            </div>

            {pendingCertificates.length > 0 ? (
              <div className="space-y-2">
                {pendingCertificates.map((cert) => (
                  <div key={cert.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block capitalize">
                        {isAr
                          ? (cert.certificateType === 'salary' ? 'شهادة راتب' : 'شهادة استمرار عمل')
                          : `${cert.certificateType} Certificate`}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {isAr ? 'إلى:' : 'For'} {cert.addressedTo} &bull; {cert.purpose}
                      </span>
                    </div>
                    <Link
                      href="/supplier/certificates"
                      className="px-3 py-1.5 rounded-lg bg-[#142B52] text-white text-[11px] font-bold hover:bg-[#0E1F3D]"
                    >
                      {isAr ? 'إصدار المستند المختوم PDF' : 'Issue Stamped PDF'}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">
                {isAr
                  ? 'تم إنجاز كافة طلبات الشهادات ضمن اتفاقية مستوى الخدمة (يومي عمل).'
                  : 'All certificate requests fulfilled within 2-day SLA.'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
