'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArrowLeft, CalendarDays, CheckCircle2, Info, PlusCircle } from 'lucide-react';

export default function LeaveBalancesDetailPage() {
  const { leaveBalance } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    {
      title: isAr ? 'الإجازة السنوية الاعتيادية' : 'Annual Vacation Leave',
      statutory: isAr ? '30 يوماً تقويمياً عن كل سنة خدمة' : '30 Calendar Days per calendar year',
      accrual: isAr ? '2.5 يوم عن كل شهر خدمة منجز' : '2.5 days per month of completed service',
      total: leaveBalance.annualTotal,
      used: leaveBalance.annualUsed,
      pending: leaveBalance.annualPending,
      remaining: leaveBalance.annualRemaining,
      color: 'border-l-[#142B52]',
      note: isAr ? 'تخضع لموافقة المسؤول المباشر والحد الأدنى للتغطية التشغيلية في الإدارة.' : 'Subject to Line Manager approval and department coverage minimums.',
    },
    {
      title: isAr ? 'الإجازة المرضية المعتمدة' : 'Certified Sick Leave',
      statutory: isAr ? 'حتى 90 يوماً (15 براتب كامل، 30 بنصف راتب، والباقي بدون راتب)' : 'Up to 90 days (15 full pay, 30 half pay, remainder unpaid)',
      accrual: isAr ? 'تتجدد سنوياً بناءً على تقرير طبي معتمد' : 'Renewed per operational year upon verified medical certificate',
      total: 15,
      used: 0,
      pending: 0,
      remaining: leaveBalance.sickRemaining,
      color: 'border-l-emerald-600',
      note: isAr ? 'تتطلب تقريراً طبياً معتمداً من هيئة الصحة أو مؤسسة الإمارات للخدمات الصحية.' : 'Requires authenticated DHA, DOH, or EHS medical authority certificate.',
    },
    {
      title: isAr ? 'إجازة الطوارئ والحداد' : 'Emergency & Compassionate Leave',
      statutory: isAr ? '5 أيام عمل لحالات الوفاة من الدرجة الأولى' : '5 Working Days for first-degree bereavement',
      accrual: isAr ? 'تمنح عند تحقق السبب وفقاً لقانون العمل الاتحادي' : 'Granted per qualifying event as per UAE Labour Law',
      total: 5,
      used: 2,
      pending: 0,
      remaining: leaveBalance.emergencyRemaining,
      color: 'border-l-amber-500',
      note: isAr ? 'يجب إشعار المسؤول المباشر ومسؤول المزوّد فور وقوع الحدث.' : 'Immediate notification to Line Manager and Supplier PRO required.',
    },
    {
      title: isAr ? 'إجازة الدراسة والامتحانات' : 'Study & Examination Leave',
      statutory: isAr ? 'حتى 10 أيام عمل سنوياً للبرامج المعتمدة' : 'Up to 10 working days annually for accredited programs',
      accrual: isAr ? 'تتطلب ما يثبت القيد في الجامعة وجدول الامتحانات المعتمد' : 'Requires university enrollment proof and examination timetable',
      total: 10,
      used: 5,
      pending: 0,
      remaining: leaveBalance.studyRemaining,
      color: 'border-l-indigo-600',
      note: isAr ? 'مخصصة للترخيص الصيدلاني المهني أو برامج الدراسات العليا ذات الصلة.' : 'For professional pharmaceutical licensing or graduate degree programs.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'أرصدة الإجازات والسياسات الرسمية' : 'Leave Balances & Policy Framework'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الإجازات' : 'Leave', href: '/employee/leave' },
            { label: isAr ? 'الأرصدة المفصلة' : 'Balances' },
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
              <span>{isAr ? 'تقديم طلب إجازة' : 'Apply for Leave'}</span>
            </Link>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs border-l-4 rtl:border-l rtl:border-r-4 ${cat.color} space-y-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.statutory}</p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {isAr ? 'الرصيد المتاح حالياً' : 'Current Balance'}
                    </span>
                    <span className="text-xl font-black text-[#142B52]">
                      {cat.remaining} {isAr ? 'يوماً متبقياً' : 'Days Remaining'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      {isAr ? 'إجمالي الرصيد السنوي' : 'Total Pool'}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{cat.total} {isAr ? 'أيام' : 'Days'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      {isAr ? 'المستخدم والمخصوم' : 'Deducted / Used'}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{cat.used} {isAr ? 'أيام' : 'Days'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      {isAr ? 'قيد المراجعة والاعتماد' : 'Pending Review'}
                    </span>
                    <span className="text-sm font-bold text-amber-600">{cat.pending} {isAr ? 'أيام' : 'Days'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-700 block text-[10px] uppercase font-bold">
                      {isAr ? 'الصافي القابل للاستخدام' : 'Net Usable'}
                    </span>
                    <span className="text-sm font-bold text-emerald-800">{cat.remaining} {isAr ? 'أيام' : 'Days'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
                  <Info className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{cat.note}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
