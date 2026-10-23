'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LeaveType } from '@/lib/types';
import {
  CalendarDays,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function ApplyLeavePage() {
  const router = useRouter();
  const { leaveBalance, submitLeaveRequest } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveType>('annual');
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-14');
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Calculate working days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const calculatedDays = calculateDays();

  // Validate balance
  const availableBalance =
    leaveType === 'annual'
      ? leaveBalance.annualRemaining
      : leaveType === 'sick'
      ? leaveBalance.sickRemaining
      : leaveBalance.emergencyRemaining;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calculatedDays <= 0) {
      setError(isAr ? 'يجب أن يكون تاريخ النهاية مساوياً أو بعد تاريخ البداية.' : 'End date must be on or after start date.');
      return;
    }

    if (calculatedDays > availableBalance) {
      setError(
        isAr
          ? `رصيدك غير كافٍ. طلبت ${calculatedDays} أيام، بينما الرصيد المتاح هو ${availableBalance} يوماً فقط.`
          : `Insufficient balance. You requested ${calculatedDays} days, but only ${availableBalance} days are available.`
      );
      return;
    }

    if (!reason.trim()) {
      setError(isAr ? 'يرجى كتابة سبب الإجازة وترتيبات تغطية العمل.' : 'Please provide a reason for the leave application.');
      return;
    }

    setIsSubmitting(true);
    submitLeaveRequest({
      leaveType,
      startDate,
      endDate,
      days: calculatedDays,
      reason: reason.trim(),
      attachmentName: fileName || undefined,
    });

    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تقديم طلب إجازة' : 'Apply for Leave'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الإجازات' : 'Leave', href: '/employee/leave' },
            { label: isAr ? 'طلب إجازة' : 'Apply' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <Link
            href="/employee/leave"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? 'العودة إلى إدارة الإجازات' : 'Return to Leave Overview'}</span>
          </Link>

          {submittedSuccess ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {isAr ? 'تم تقديم طلب الإجازة بنجاح' : 'Leave Request Submitted Successfully'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? `تم تسجيل طلبك لـ ${calculatedDays} أيام من إجازة ${t(leaveType)} وتوجيهه مباشرة إلى المسؤول المباشر (د. مريم السويدي) للمراجعة والاعتماد.`
                    : `Your application for ${calculatedDays} day(s) of ${leaveType} leave has been recorded and routed directly to your Establishment Line Manager (Dr. Mariam Al Suwaidi) for review.`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto space-y-1">
                <p>{isAr ? 'الحالة:' : 'Status:'} <strong className="text-amber-600">{isAr ? 'قيد المراجعة' : 'Under Review'}</strong></p>
                <p>{isAr ? 'الأيام المخصومة مبدئياً:' : 'Pending Days Deducted:'} <strong>{calculatedDays} {isAr ? 'أيام' : 'days'}</strong></p>
                <p>{isAr ? 'الرصيد المتبقي المتاح:' : 'New Usable Balance:'} <strong>{leaveBalance.annualRemaining} {isAr ? 'أيام' : 'days'}</strong></p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <Link
                  href="/employee/leave/history"
                  className="px-5 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-semibold shadow-xs"
                >
                  {isAr ? 'عرض سجل الإجازات' : 'View Request History'}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setReason('');
                    setFileName('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  {isAr ? 'تقديم طلب إجازة آخر' : 'Submit Another Request'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-lg font-bold text-[#142B52]">
                  {isAr ? 'نموذج طلب إجازة جديدة' : 'New Leave Application'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'حدد تواريخ الإجازة المقترحة، المبررات، والمستندات الثبوتية المؤيدة.'
                    : 'Fill in your proposed dates, rationale, and any supporting documentation.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Leave Type Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'فئة الإجازة' : 'Leave Category'}
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  >
                    <option value="annual">
                      {isAr ? `إجازة سنوية اعتيادية (المتاح: ${leaveBalance.annualRemaining} يوماً)` : `Annual Leave (Usable: ${leaveBalance.annualRemaining} days)`}
                    </option>
                    <option value="sick">
                      {isAr ? `إجازة مرضية معتمدة (المتاح: ${leaveBalance.sickRemaining} يوماً)` : `Certified Sick Leave (Usable: ${leaveBalance.sickRemaining} days)`}
                    </option>
                    <option value="emergency">
                      {isAr ? `إجازة طارئة / حداد (المتاح: ${leaveBalance.emergencyRemaining} يوماً)` : `Emergency / Compassionate Leave (Usable: ${leaveBalance.emergencyRemaining} days)`}
                    </option>
                    <option value="study">
                      {isAr ? `إجازة دراسية وامتحانات (المتاح: ${leaveBalance.studyRemaining} يوماً)` : `Study / Exam Leave (Usable: ${leaveBalance.studyRemaining} days)`}
                    </option>
                    <option value="maternity_paternity">
                      {isAr ? 'إجازة أمومة / أبوة' : 'Maternity / Paternity Leave'}
                    </option>
                    <option value="hajj">
                      {isAr ? 'إجازة أداء فريضة الحج' : 'Hajj Pilgrimage Leave'}
                    </option>
                  </select>
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'تاريخ بداية الإجازة' : 'Start Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'تاريخ نهاية الإجازة' : 'End Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Calculated Days & Entitlement Impact Callout */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-sky-900">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#2463A6]" />
                    <div>
                      <span className="font-bold">{isAr ? 'المدة المحسوبة: ' : 'Calculated Duration: '}</span>
                      <span className="font-mono text-base font-black text-[#142B52]">{calculatedDays}</span> {isAr ? 'أيام' : 'Day(s)'}
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-[11px] text-slate-500 block">{isAr ? 'الرصيد المتاح:' : 'Available Balance:'}</span>
                    <span className="font-bold text-emerald-700">
                      {availableBalance} {isAr ? 'يوماً متبقياً' : 'Days Remaining'}
                    </span>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'سبب الإجازة وخطة تسليم المهام' : 'Reason for Absence'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={(e) => { setReason(e.target.value); setError(''); }}
                    placeholder={isAr ? 'اذكر مبررات الإجازة وترتيبات تغطية المهام أثناء غيابك...' : 'Provide detailed description of leave reason and handover arrangement...'}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>

                {/* Attachment simulation */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'المستند الثبوتي (اختياري / تقرير طبي معتمد)' : 'Supporting Document (Optional / Medical Certificate)'}
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-2 hover:border-[#2463A6] transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-slate-600 font-medium text-xs">
                      {fileName ? `${isAr ? 'المرفق:' : 'Attached:'} ${fileName}` : (isAr ? 'اسحب وأفلت ملف PDF / تقرير طبي، أو اضغط للتصفح' : 'Drag & drop supporting PDF / medical slip, or browse')}
                    </p>
                    <input
                      type="file"
                      id="leaveDoc"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <label
                      htmlFor="leaveDoc"
                      className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer text-xs"
                    >
                      {isAr ? 'اختيار ملف' : 'Select File'}
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Link
                    href="/employee/leave"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00B3AA]" />
                    <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'إرسال طلب الإجازة' : 'Submit Leave Application')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
