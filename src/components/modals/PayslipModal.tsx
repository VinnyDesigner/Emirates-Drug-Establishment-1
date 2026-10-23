'use client';

import React from 'react';
import { Payslip } from '@/lib/types';
import { X, Printer, CheckCircle2, Building2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface PayslipModalProps {
  payslip: Payslip | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PayslipModal({ payslip, isOpen, onClose }: PayslipModalProps) {
  const { language } = useI18n();
  const isAr = language === 'ar';

  if (!isOpen || !payslip) return null;

  const handlePrint = () => {
    window.print();
  };

  const monthNamesAr: Record<string, string> = {
    January: 'يناير',
    February: 'فبراير',
    March: 'مارس',
    April: 'أبريل',
    May: 'مايو',
    June: 'يونيو',
    July: 'يوليو',
    August: 'أغسطس',
    September: 'سبتمبر',
    October: 'أكتوبر',
    November: 'نوفمبر',
    December: 'ديسمبر',
  };

  const displayMonth = isAr ? (monthNamesAr[payslip.month] || payslip.month) : payslip.month;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="no-print px-6 py-4.5 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/10 text-[#00B3AA]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block">
                {isAr ? 'كشف الراتب الإلكتروني الرسمي' : 'Official Electronic Payslip'}
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                {displayMonth} {payslip.year} &bull; {isAr ? 'رواتب مؤسسة الإمارات للدواء' : 'EDE Payroll'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#00B3AA] to-[#008F88] hover:from-[#008F88] hover:to-[#00736D] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة / حفظ كملف PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Document Header */}
          <div className="border-b-2 border-[#142B52] pb-4 flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#142B52] uppercase tracking-wide">
                {isAr ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isAr ? 'الخدمات المشتركة — إدارة الموارد البشرية والرواتب' : 'مؤسسة الإمارات للدواء — الخدمات المشتركة'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'إدارة رواتب القوى العاملة الخارجية المتعاقدة' : 'Outsourced Workforce Payroll Administration'}
              </p>
            </div>
            <div className="text-right rtl:text-left space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                {isAr ? 'كشف راتب سري ومحمي' : 'CONFIDENTIAL PAYSLIP'}
              </span>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'فترة الاستحقاق:' : 'Pay Period:'} {displayMonth} {payslip.year}
              </p>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'تاريخ الصرف:' : 'Disbursement Date:'} {payslip.paymentDate}
              </p>
            </div>
          </div>

          {/* Employee Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
              </span>
              <span className="font-semibold text-slate-900 font-mono">{payslip.employeeId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {isAr ? 'المسمى الوظيفي' : 'Designation'}
              </span>
              <span className="font-semibold text-slate-900">
                {isAr ? 'أخصائي شؤون تنظيمية وترخيص' : 'Regulatory Affairs Specialist'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {isAr ? 'المصرف المحول إليه' : 'Disbursed To'}
              </span>
              <span className="font-semibold text-slate-900">{payslip.bankName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {isAr ? 'الآيبان المقنع' : 'Account Mask'}
              </span>
              <span className="font-semibold text-slate-900 font-mono" dir="ltr">{payslip.accountMasked}</span>
            </div>
          </div>

          {/* Itemized Allowances & Earnings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#142B52] uppercase tracking-wider">
              {isAr ? 'تفاصيل مفردات الراتب والمستحقات التعاقدية (درهم إماراتي)' : 'Earnings & Compensations Breakdown (AED)'}
            </h3>
            <table className="w-full text-left rtl:text-right border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2.5 border border-slate-200">{isAr ? 'بيان عنصر الأجر' : 'Pay Element Description'}</th>
                  <th className="p-2.5 border border-slate-200">{isAr ? 'التصنيف' : 'Classification'}</th>
                  <th className="p-2.5 border border-slate-200 text-right rtl:text-left">{isAr ? 'المبلغ (د.إ)' : 'Amount (AED)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-medium">{isAr ? 'الراتب الأساسي' : 'Basic Salary'}</td>
                  <td className="p-2.5 text-slate-500">{isAr ? 'الأساس التعاقدي الثابت' : 'Fixed Contractual Base'}</td>
                  <td className="p-2.5 text-right rtl:text-left font-mono font-semibold">
                    {payslip.basicSalary.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">{isAr ? 'بدل السكن' : 'Housing Allowance'}</td>
                  <td className="p-2.5 text-slate-500">{isAr ? 'مخصص الدرجة الوظيفية المعتمد' : 'Standard Grade Allocation'}</td>
                  <td className="p-2.5 text-right rtl:text-left font-mono font-semibold">
                    {payslip.housingAllowance.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">{isAr ? 'بدل الانتقال والمواصلات' : 'Transport Allowance'}</td>
                  <td className="p-2.5 text-slate-500">{isAr ? 'بدل تنقل شهري ثابت' : 'Fixed Commute Grant'}</td>
                  <td className="p-2.5 text-right rtl:text-left font-mono font-semibold">
                    {payslip.transportAllowance.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">{isAr ? 'علاوة تخصصية وفنية' : 'Professional & Technical Allowance'}</td>
                  <td className="p-2.5 text-slate-500">{isAr ? 'علاوة القطاع الدوائي والعلمي' : 'Scientific Sector Supplement'}</td>
                  <td className="p-2.5 text-right rtl:text-left font-mono font-semibold">
                    {payslip.otherAllowances.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5" colSpan={2}>{isAr ? 'إجمالي الأجر الشهري المستحق' : 'Gross Monthly Remuneration'}</td>
                  <td className="p-2.5 text-right rtl:text-left font-mono text-[#142B52]">
                    {payslip.grossSalary.toLocaleString()} {isAr ? 'د.إ' : 'AED'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions & Net Total */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">
                {isAr ? 'الاستقطاعات المعتمدة' : 'Authorized Deductions'}
              </span>
              <p className="text-sm font-bold text-slate-900">
                {payslip.deductions.toFixed(2)} {isAr ? 'د.إ' : 'AED'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'صفر استقطاعات (لا توجد إجازات غير مدفوعة أو استردادات)' : 'Zero deductions (no unpaid leave or loan recoveries)'}
              </p>
            </div>

            <div className="p-4 border border-emerald-300 rounded-xl bg-emerald-50/70 space-y-1.5 text-right rtl:text-left">
              <span className="text-[10px] text-emerald-800 font-bold uppercase block">
                {isAr ? 'صافي الراتب المحول' : 'Net Transferred Salary'}
              </span>
              <p className="text-xl font-black text-emerald-800 font-mono">
                {payslip.netSalary.toLocaleString()} {isAr ? 'د.إ' : 'AED'}
              </p>
              <div className="flex items-center justify-end rtl:justify-start gap-1 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'اكتمل التحويل عبر نظام حماية الأجور (WPS)' : 'WPS Electronic Transfer Completed'}</span>
              </div>
            </div>
          </div>

          {/* Official Footnote */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <p>
              {isAr
                ? 'هذا مستند إلكتروني رسمي صادر ومعتمد عبر بوابة الخدمة الذاتية لمؤسسة الإمارات للدواء.'
                : 'This is a computer-generated payroll document issued via the Emirates Drug Establishment ESS Portal.'}
            </p>
            <p className="font-mono">{isAr ? 'الرمز الأمني: 89a2-f011-ed90-1042' : 'Security Hash: 89a2-f011-ed90-1042'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
