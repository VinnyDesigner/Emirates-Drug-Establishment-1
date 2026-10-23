'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { PayslipModal } from '@/components/modals/PayslipModal';
import { Payslip } from '@/lib/types';
import {
  FileCheck2,
  Download,
  Eye,
  Building2,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  FileSignature,
} from 'lucide-react';

export default function PayslipsPage() {
  const { payslips, currentUser } = useAppStore();
  const { t, language } = useI18n();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPreview = (p: Payslip) => {
    setSelectedPayslip(p);
    setIsModalOpen(true);
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

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={t('Payroll & Electronic Payslips')}
          breadcrumbs={[
            { label: 'Portal', href: '/employee/dashboard' },
            { label: 'Payroll & Payslips' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header & Sub-nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {language === 'ar' ? 'كشوف الرواتب الشهرية' : 'Monthly Salary Statements'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'كشوف الأجور الرسمية المفصلة المصروفة بموجب نظام حماية الأجور (WPS) بدولة الإمارات.'
                  : 'Official itemized remuneration statements disbursed under the UAE Wages Protection System (WPS).'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/employee/payroll/certificates"
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs flex items-center gap-2"
              >
                <FileSignature className="w-4 h-4 text-amber-600" />
                <span>{t('Request Salary Certificate')}</span>
              </Link>
            </div>
          </div>

          {/* WPS Compliance Callout */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">
                  {language === 'ar'
                    ? 'مطابق لنظام حماية الأجور (WPS) بوزارة الموارد البشرية والتوطين'
                    : 'MOHRE Wages Protection System (WPS) Compliant'}
                </p>
                <p className="text-[11px] text-emerald-700">
                  {language === 'ar'
                    ? 'يتم صرف الرواتب في أو قبل الأول من كل شهر ميلادي عبر نظام التحويل الإلكتروني لمصرف الإمارات المركزي.'
                    : 'Salaries disbursed on or before the 1st of each calendar month via Central Bank of the UAE electronic routing.'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] shrink-0">
              {language === 'ar' ? 'التزام 100% بمستوى الخدمة' : '100% On-Time SLA'}
            </span>
          </div>

          {/* Year Filter & Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {t('Payslip Archive')}
              </h3>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">{t('Filter Year:')}</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 font-semibold focus:outline-hidden"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{t('Pay Period')}</th>
                    <th className="py-3">{t('Basic Salary')}</th>
                    <th className="py-3">{t('Allowances')}</th>
                    <th className="py-3">{t('Gross Salary')}</th>
                    <th className="py-3">{t('Deductions')}</th>
                    <th className="py-3">{t('Net Transferred')}</th>
                    <th className="py-3">{t('Payment Date')}</th>
                    <th className="py-3">{t('Status')}</th>
                    <th className="py-3 text-right rtl:text-left">{t('Actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payslips.map((p) => {
                    const allowancesTotal = p.housingAllowance + p.transportAllowance + p.otherAllowances;
                    const displayMonth = language === 'ar' ? (monthNamesAr[p.month] || p.month) : p.month;
                    const currencyPrefix = language === 'ar' ? '' : 'AED ';
                    const currencySuffix = language === 'ar' ? ' د.إ' : '';
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold text-[#142B52]">
                          {displayMonth} {p.year}
                        </td>
                        <td className="py-3.5 font-mono">{currencyPrefix}{p.basicSalary.toLocaleString()}{currencySuffix}</td>
                        <td className="py-3.5 font-mono text-slate-600">{currencyPrefix}{allowancesTotal.toLocaleString()}{currencySuffix}</td>
                        <td className="py-3.5 font-mono font-medium">{currencyPrefix}{p.grossSalary.toLocaleString()}{currencySuffix}</td>
                        <td className="py-3.5 font-mono text-slate-500">{currencyPrefix}{p.deductions.toFixed(2)}{currencySuffix}</td>
                        <td className="py-3.5 font-mono font-black text-emerald-700">
                          {currencyPrefix}{p.netSalary.toLocaleString()}{currencySuffix}
                        </td>
                        <td className="py-3.5 text-slate-500">{p.paymentDate}</td>
                        <td className="py-3.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{t('Paid')}</span>
                          </span>
                        </td>
                        <td className="py-3.5 text-right rtl:text-left whitespace-nowrap">
                          <button
                            onClick={() => openPreview(p)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2463A6] hover:bg-[#1D3C6E] text-white text-xs font-medium transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t('Preview / Print PDF')}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <PayslipModal
        payslip={selectedPayslip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
