'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArrowLeft, Landmark, Lock, Edit3, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfileBankingStandalonePage() {
  const { profile, requestBankDetailChange } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [proposedBank, setProposedBank] = useState('Emirates NBD');
  const [proposedIban, setProposedIban] = useState('AE44 0260 0000 8712 9011 4455');
  const [reason, setReason] = useState(isAr ? 'تحديث حساب تحويل الراتب لشروط تمويل عقاري أفضل.' : 'Salary account transition for preferential mortgage terms.');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedIban.startsWith('AE') || proposedIban.replace(/ /g, '').length !== 23) {
      setError(isAr ? 'صيغة الآيبان غير صحيحة. يجب أن يبدأ بـ AE ويتكون من 23 خانة.' : 'Invalid UAE IBAN format. Must start with AE and contain 23 characters.');
      return;
    }
    requestBankDetailChange({ proposedBank, proposedIban, reason });
    setShowForm(false);
    setError('');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'إدارة الحساب المصرفي ونظام حماية الأجور (WPS)' : 'Banking & WPS Account Management'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الملف الشخصي' : 'Profile', href: '/employee/profile' },
            { label: isAr ? 'البيانات المصرفية' : 'Banking' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <Link
            href="/employee/profile"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? 'العودة لنظرة عامة على الملف الشخصي' : 'Return to Profile Overview'}</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#142B52]">
                  {isAr ? 'حساب الراتب المسجل بنظام حماية الأجور (WPS)' : 'Registered WPS Salary Account'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'تفاصيل التحويل الإلكتروني للراتب المصروف من قبل شركة التميمي لخدمات القوى العاملة.'
                    : 'Electronic salary routing details for wages transferred by Al Tamimi Manpower Services.'}
                </p>
              </div>

              {!profile.pendingBankChange && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طلب تعديل الحساب البنكي' : 'Request Account Change'}</span>
                </button>
              )}
            </div>

            {/* Current Active Bank Card */}
            <div className="p-6 rounded-2xl bg-[#0E1F3D] text-white space-y-4 shadow-md max-w-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00B3AA] tracking-wider uppercase">
                  {isAr ? 'حساب الرواتب النشط (WPS)' : 'ACTIVE WPS SALARY ACCOUNT'}
                </span>
                <Lock className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'اسم المصرف' : 'Bank Name'}
                </span>
                <p className="text-base font-bold text-white">{profile.bankDetails.bankName}</p>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'رقم الحساب المصرفي الدولي (IBAN)' : 'Masked IBAN'}
                </span>
                <p className="font-mono text-lg font-black tracking-widest text-emerald-400">
                  {profile.bankDetails.maskedIban}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{isAr ? `صاحب الحساب: ${isAr ? (profile.fullNameAr || profile.bankDetails.accountHolder) : profile.bankDetails.accountHolder}` : `Account Holder: ${profile.bankDetails.accountHolder}`}</span>
                <span className="text-emerald-400 font-semibold">{isAr ? '✓ تم التحقق' : '✓ Verified'}</span>
              </div>
            </div>

            {/* Pending Change Notice Callout if active */}
            {profile.pendingBankChange && (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs text-amber-900">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-sm">
                      {isAr ? `طلب التعديل قيد التدقيق: ${profile.pendingBankChange.requestId}` : `Pending Account Change: ${profile.pendingBankChange.requestId}`}
                    </p>
                    <p className="text-amber-800">
                      {isAr ? 'المصرف المقترح: ' : 'Proposed Bank: '}<strong>{profile.pendingBankChange.proposedBank}</strong> | {isAr ? 'الآيبان المقترح: ' : 'Proposed IBAN: '}
                      <span className="font-mono font-bold">{profile.pendingBankChange.proposedIban}</span>
                    </p>
                    <p className="text-slate-600 pt-1 text-[11px]">
                      {isAr
                        ? 'في انتظار تدقيق المستندات من قبل مسؤول خدمات الموظفين لدى المورد. يظل الحساب الحالي نشطاً لصرف الرواتب حتى الاعتماد.'
                        : 'Awaiting verification by the supplier employee services lead. Current account remains active for salary disbursements.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Change Form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-slate-900 text-sm">
                  {isAr ? 'تقديم رقم آيبان جديد للتحقق' : 'Submit New IBAN for Verification'}
                </h3>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'المصرف المقترح' : 'Proposed Bank'}
                  </label>
                  <input
                    type="text"
                    required
                    value={proposedBank}
                    onChange={(e) => setProposedBank(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'رقم الآيبان الجديد' : 'Proposed IBAN'}
                  </label>
                  <input
                    type="text"
                    required
                    value={proposedIban}
                    onChange={(e) => setProposedIban(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'سبب التعديل' : 'Reason'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                {error && <p className="text-rose-600 font-semibold">{error}</p>}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded-xl cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#142B52] text-white font-bold rounded-xl cursor-pointer"
                  >
                    {isAr ? 'إرسال للاعتماد' : 'Submit for Approval'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
