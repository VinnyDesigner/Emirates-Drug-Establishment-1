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
  PlusCircle,
  Clock,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function ServiceRequestsListPage() {
  const { tickets } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'طلبات الخدمة والاستفسارات والشكاوى' : 'Service Requests, Inquiries & Complaints'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'طلبات الخدمة' : 'Service Requests' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'قائمة دعم الموظفين والاستفسارات' : 'Employee Support Queue & Inquiries'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'قناة التذاكر الرسمية مع اتفاقية إلزامية للرد الأولي خلال 24 ساعة عمل.'
                  : 'Formal ticketing channel with mandatory 24-working-hour first response SLA.'}
              </p>
            </div>

            <Link
              href="/employee/requests/new"
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'تقديم تذكرة جديدة' : 'Submit New Ticket'}</span>
            </Link>
          </div>

          {/* 24h SLA Target Indicator Banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4 text-xs text-sky-900">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#2463A6] shrink-0" />
              <div>
                <span className="font-bold">
                  {isAr ? 'مؤشر اتفاقية مستوى الخدمة RFP بند 3.7: ' : 'RFP Section 3.7 SLA Indicator: '}
                </span>
                <span>
                  {isAr
                    ? 'الرد الأولي على طلبات واستفسارات الموظفين خلال 24 ساعة عمل.'
                    : 'Initial response to employee requests and inquiries within 24 working hours.'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] shrink-0">
              {isAr ? 'نسبة الامتثال 98.8%' : '98.8% Compliance'}
            </span>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'حالات الدعم النشطة والسابقة' : 'Active & Historical Support Cases'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'رقم التذكرة' : 'Ticket ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'التصنيف' : 'Category'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموضوع' : 'Subject'}</th>
                    <th className="py-3 px-2">{isAr ? 'الأولوية' : 'Priority'}</th>
                    <th className="py-3 px-2">{isAr ? 'الموظف المسؤول' : 'Assigned Officer'}</th>
                    <th className="py-3 px-2">{isAr ? 'حالة اتفاقية الخدمة' : 'SLA Status'}</th>
                    <th className="py-3 px-2">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((tkt) => (
                    <tr key={tkt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#142B52]">{tkt.ticketNumber}</td>
                      <td className="py-3.5 px-2 text-slate-600 font-medium">{t(tkt.category)}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900 max-w-xs truncate">{tkt.subject}</td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                            tkt.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-800'
                              : tkt.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {t(tkt.priority)}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-slate-600">
                        {tkt.assignedOfficerName || (isAr ? 'قائمة انتظار المورد' : 'Supplier Queue')}
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
                      <td className="py-3.5 px-2 text-right rtl:text-left whitespace-nowrap">
                        <Link
                          href={`/employee/requests/history?id=${tkt.id}`}
                          className="inline-flex items-center gap-1 text-[#2463A6] hover:underline font-semibold"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{isAr ? `عرض المحادثة (${tkt.messages.length})` : `View Thread (${tkt.messages.length})`}</span>
                        </Link>
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
