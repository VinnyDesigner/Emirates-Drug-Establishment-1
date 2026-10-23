'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/export-utils';
import {
  FileText,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Clock,
  User,
} from 'lucide-react';

export default function SupplierAuditTrailPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { auditLogs } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const supplierLogs = auditLogs.filter(
    (l) =>
      l.actorRole.includes('supplier') ||
      l.module.includes('Recruitment') ||
      l.module.includes('Transition') ||
      l.module.includes('Certificate')
  );

  const filtered = supplierLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.recordIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    exportToCSV(
      filtered.map((l) => ({
        Timestamp: l.timestamp,
        Actor: l.actorName,
        Role: l.actorRole,
        Action: l.action,
        Module: l.module,
        Identifier: l.recordIdentifier,
        IP_Address: l.ipAddress,
        Details: l.details,
      })),
      'EDE-Supplier-Audit-Log'
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'سجل تدقيق عمليات المزوّد' : 'Supplier Operations Audit Trail'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'سجل إلكتروني موثق وغير قابل للتعديل لكافة اعتمادات المورد، وفحوصات الوثائق، وتعيين الكوادر.'
                  : 'Cryptographically verifiable event log of contractor approvals, document verifications, and onboarding actions.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير سجل التدقيق' : 'Export Audit Log'}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'البحث في الإجراءات أو المنفذين أو المعرفات...' : 'Search audit actions, actors, or identifiers...'}
                className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'السجل الإلكتروني الموثق لإجراءات المزوّد' : 'Supplier Action Audit Trail & Immutable Log'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'الطابع الزمني' : 'Timestamp'}</th>
                    <th className="py-3 px-4">{isAr ? 'المنفّذ' : 'Actor'}</th>
                    <th className="py-3 px-4">{isAr ? 'الإجراء' : 'Action'}</th>
                    <th className="py-3 px-4">{isAr ? 'الوحدة / النظام' : 'Module'}</th>
                    <th className="py-3 px-4">{isAr ? 'معرّف السجل' : 'Record Identifier'}</th>
                    <th className="py-3 px-4">{isAr ? 'التفاصيل' : 'Details'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {l.timestamp.split('T')[0]} {l.timestamp.split('T')[1]?.slice(0, 8)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{l.actorName}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{l.actorRole.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {l.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{l.module}</td>
                      <td className="py-3.5 px-4 font-mono text-[#2463A6] font-bold">{l.recordIdentifier}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs">{l.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                {isAr ? 'لا توجد قيود تدقيق تطابق معايير البحث الحالية.' : 'No supplier audit entries match the search criteria.'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
