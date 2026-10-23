'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { History, ShieldCheck, Download, Search, Filter, Lock } from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';

export default function EstablishmentAuditTrailPage() {
  const { auditLogs } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recordIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'ALL' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const handleExport = () => {
    exportToCSV('EDE_Electronic_Audit_Trail', filtered, [
      { key: 'timestamp', label: isAr ? 'الوقت والتاريخ' : 'Timestamp (UTC)' },
      { key: 'actorName', label: isAr ? 'اسم المنفذ' : 'Actor Name' },
      { key: 'actorRole', label: isAr ? 'الصفة الوظيفية' : 'Role Persona' },
      { key: 'action', label: isAr ? 'الإجراء الإلكتروني' : 'System Action Event' },
      { key: 'module', label: isAr ? 'الوحدة / النظام' : 'System Module' },
      { key: 'recordIdentifier', label: isAr ? 'رقم المعاملة' : 'Record ID' },
      { key: 'details', label: isAr ? 'تفاصيل الحركة' : 'Audit Transaction Details' },
      { key: 'ipAddress', label: isAr ? 'عنوان IP' : 'IP Address' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'سجل التدقيق الإلكتروني المحمي' : 'Immutable Electronic Audit Trail'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'سجل التدقيق' : 'Audit Trail' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'سجل التدقيق الإلكتروني والأرشيف الرقابي الموثق' : 'Electronic Audit Trail & Archival Log'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'سجل غير قابل للتعديل يوثق زمنياً عمليات تسجيل الدخول والاعتمادات وتعديلات الحسابات المصرفية وتحديثات الوثائق.'
                  : 'Immutable chronological event registry capturing sign-ins, approvals, banking modifications, and document updates.'}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير سجل التدقيق (CSV)' : 'Export Audit Trail (CSV)'}</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'بحث عن منفذ، إجراء، أو رقم معاملة...' : 'Search actor, action, or record ID...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">{isAr ? 'تصفية النظام:' : 'Filter Module:'}</span>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="ALL">{isAr ? 'جميع الوحدات' : 'All Modules'}</option>
                <option value="Leave Management">{isAr ? 'إدارة الإجازات' : 'Leave Management'}</option>
                <option value="Profile & Banking">{isAr ? 'الملف الشخصي والحسابات البنكية' : 'Profile & Banking'}</option>
                <option value="Official Certificates">{isAr ? 'الشهادات الرسمية' : 'Official Certificates'}</option>
                <option value="Security & Access Control">{isAr ? 'الأمان وإدارة الوصول' : 'Security & Access Control'}</option>
                <option value="Document Vault">{isAr ? 'خزينة الوثائق' : 'Document Vault'}</option>
                <option value="Attendance Integration Adapter">{isAr ? 'محول تكامل الحضور' : 'Attendance Integration Adapter'}</option>
              </select>
            </div>
          </div>

          {/* Audit Events Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? `سجل أحداث النظام (${filtered.length} معاملة مسجلة)` : `System Event Log (${filtered.length} Recorded Transactions)`}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الوقت والتاريخ' : 'Timestamp (GST)'}</th>
                    <th className="py-3 px-2">{isAr ? 'المنفذ والصفة' : 'Actor & Role'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإجراء' : 'Event Action'}</th>
                    <th className="py-3 px-2">{isAr ? 'الوحدة' : 'Module'}</th>
                    <th className="py-3 px-2">{isAr ? 'معرف المعاملة' : 'Record Identifier'}</th>
                    <th className="py-3 px-2">{isAr ? 'تفاصيل التدقيق' : 'Audit Details'}</th>
                    <th className="py-3 px-2">{isAr ? 'عنوان IP' : 'IP Address'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {filtered.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 text-slate-500 whitespace-nowrap">
                        {new Date(entry.timestamp).toLocaleString(isAr ? 'ar-AE' : 'en-GB')}
                      </td>
                      <td className="py-3.5 px-2 font-sans">
                        <span className="font-bold text-slate-900 block">{entry.actorName}</span>
                        <span className="text-[10px] text-slate-500 capitalize">{entry.actorRole.replace('_', ' ')}</span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-[#142B52] border border-slate-200 text-[10px]">
                          {entry.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 font-sans font-medium text-slate-700">{t(entry.module)}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-800">{entry.recordIdentifier}</td>
                      <td className="py-3.5 px-2 font-sans text-slate-600 max-w-xs">{entry.details}</td>
                      <td className="py-3.5 px-2 text-slate-400">{entry.ipAddress}</td>
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
