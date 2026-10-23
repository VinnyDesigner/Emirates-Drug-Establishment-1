'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { StatusBadge } from '@/components/common/StatusBadge';
import { exportToCSV } from '@/lib/export-utils';
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  FileSignature,
  Plane,
  HeartPulse,
  LifeBuoy,
  CreditCard,
  ExternalLink,
} from 'lucide-react';

export default function RequestHistoryPage() {
  const { leaveRequests, certificates, airTickets, medicalClaims, tickets } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Assemble cross-module unified request history
  const allRequests = [
    ...leaveRequests.map((l) => ({
      id: l.id,
      refNumber: l.requestId,
      type: 'Leave Request',
      typeAr: 'طلب إجازة',
      title: isAr ? `${l.days} أيام إجازة ${t(l.leaveType)}` : `${l.days} Days ${l.leaveType.toUpperCase()} Leave`,
      submittedDate: l.submittedAt.split('T')[0],
      status: l.status,
      actionUrl: `/employee/leave/${l.id}`,
      icon: Calendar,
    })),
    ...certificates.map((c) => ({
      id: c.id,
      refNumber: c.requestId,
      type: 'Certificate Request',
      typeAr: 'شهادة رسمية',
      title: isAr
        ? `شهادة ${c.certificateType === 'salary' ? 'راتب' : 'استمرار عمل'} (${c.language === 'ar' ? 'عربي' : c.language === 'en' ? 'إنجليزي' : 'ثنائية اللغة'})`
        : `${c.certificateType === 'salary' ? 'Salary' : 'Employment'} Certificate (${c.language.toUpperCase()})`,
      submittedDate: c.submittedAt.split('T')[0],
      status: c.status,
      actionUrl: `/employee/certificates`,
      icon: FileSignature,
    })),
    ...airTickets.map((a) => ({
      id: a.id,
      refNumber: a.requestId,
      type: 'Air Ticket',
      typeAr: 'تذكرة طيران',
      title: `${a.benefitType}: ${a.origin} ${isAr ? '←' : '→'} ${a.destination}`,
      submittedDate: a.submittedAt.split('T')[0],
      status: a.status,
      actionUrl: `/employee/air-tickets`,
      icon: Plane,
    })),
    ...medicalClaims.map((m) => ({
      id: m.id,
      refNumber: m.claimId,
      type: 'Medical Claim',
      typeAr: 'مطالبة تأمينية',
      title: isAr ? `${m.claimCategory} — ${m.claimedAmountAed} د.إ` : `${m.claimCategory} — AED ${m.claimedAmountAed}`,
      submittedDate: m.submittedAt.split('T')[0],
      status: m.status,
      actionUrl: `/employee/medical-claims`,
      icon: HeartPulse,
    })),
    ...tickets.map((t) => ({
      id: t.id,
      refNumber: t.ticketNumber,
      type: 'Service Ticket',
      typeAr: 'تذكرة دعم',
      title: t.subject,
      submittedDate: t.submittedAt.split('T')[0],
      status: t.status,
      actionUrl: `/employee/service-requests/${t.id}`,
      icon: LifeBuoy,
    })),
  ].sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

  const filteredRequests = allRequests.filter((r) => {
    const matchesCategory = categoryFilter === 'ALL' || r.type === categoryFilter;
    const matchesSearch =
      r.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.typeAr.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExportCSV = () => {
    exportToCSV(
      'EDE-Employee-Request-History',
      filteredRequests,
      [
        { key: 'refNumber', label: isAr ? 'رقم المعاملة' : 'Reference' },
        { key: isAr ? 'typeAr' : 'type', label: isAr ? 'الفئة' : 'Category' },
        { key: 'title', label: isAr ? 'الموضوع' : 'Title' },
        { key: 'submittedDate', label: isAr ? 'تاريخ التقديم' : 'Submitted_Date' },
        { key: 'status', label: isAr ? 'الحالة' : 'Status' },
      ]
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'سجل الطلبات والمعاملات الموحد' : 'Unified Request History & Archive'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'سجل الطلبات' : 'Request History' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'سجل الطلبات والمعاملات الموحد' : 'Unified Request History & Archive'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'سجل تدقيق شامل لكافة طلبات الإجازات، الشهادات، تذاكر السفر، المطالبات التأمينية، واستفسارات الدعم.'
                  : 'Complete audit trail of all leave applications, certificates, travel bookings, claims, and inquiries.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير السجل (CSV)' : 'Export History (CSV)'}</span>
            </button>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'ابحث برقم المعاملة، العنوان، أو الفئة...' : 'Search by reference ID, title, or category...'}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-500 shrink-0">
                {isAr ? 'تصفية الفئة:' : 'Filter Module:'}
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:border-[#2463A6] cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الفئات' : 'All Categories'}</option>
                <option value="Leave Request">{isAr ? 'طلبات الإجازة' : 'Leave Requests'}</option>
                <option value="Certificate Request">{isAr ? 'الشهادات الرسمية' : 'Certificates'}</option>
                <option value="Air Ticket">{isAr ? 'تذاكر الطيران' : 'Air Tickets'}</option>
                <option value="Medical Claim">{isAr ? 'المطالبات الطبية' : 'Medical Claims'}</option>
                <option value="Service Ticket">{isAr ? 'تذاكر الدعم والخدمة' : 'Service Inquiries'}</option>
              </select>
            </div>
          </div>

          {/* Unified Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'أرشيف المعاملات المقدمة' : 'Submitted Applications Archive'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'رقم المعاملة' : 'Ref Number'}</th>
                    <th className="py-3">{isAr ? 'الفئة' : 'Category'}</th>
                    <th className="py-3">{isAr ? 'الموضوع / التفاصيل' : 'Subject / Details'}</th>
                    <th className="py-3">{isAr ? 'تاريخ التقديم' : 'Submitted Date'}</th>
                    <th className="py-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 text-right rtl:text-left">{isAr ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => {
                    const IconComponent = req.icon;
                    return (
                      <tr key={req.refNumber} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-mono font-bold text-[#142B52]">
                          {req.refNumber}
                        </td>
                        <td className="py-3.5">
                          <div className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                            <IconComponent className="w-3.5 h-3.5 text-slate-500" />
                            <span>{isAr ? req.typeAr : req.type}</span>
                          </div>
                        </td>
                        <td className="py-3.5 font-semibold text-slate-800">
                          {req.title}
                        </td>
                        <td className="py-3.5 text-slate-500 font-mono">
                          {req.submittedDate}
                        </td>
                        <td className="py-3.5 text-center">
                          <StatusBadge status={req.status as any} />
                        </td>
                        <td className="py-3.5 text-right rtl:text-left">
                          <Link
                            href={req.actionUrl}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1D68E2] hover:text-[#0F2342] transition-colors"
                          >
                            <span>{isAr ? 'معاينة' : 'Inspect'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredRequests.length === 0 && (
              <div className="p-12 text-center text-slate-400 text-xs">
                {isAr ? 'لا توجد معاملات مطابقة لمعايير البحث.' : 'No request records match the selected filters.'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
