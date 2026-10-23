'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Building2,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export default function SupplierEscalationsPage() {
  const { escalations, resolveEscalation } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEsc, setSelectedEsc] = useState(escalations[0]);
  const [resolutionRemarks, setResolutionRemarks] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEsc || !resolutionRemarks.trim()) return;

    resolveEscalation(selectedEsc.id, 'Closed', resolutionRemarks.trim());
    setSuccessMsg(
      isAr
        ? `تمت معالجة وإغلاق التصعيد ${selectedEsc.escalationNumber} بنجاح ضمن مهلة 4 ساعات.`
        : `Escalation ${selectedEsc.escalationNumber} marked resolved within 4-hour SLA target.`
    );
    setResolutionRemarks('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تصعيدات الحساب واتفاقية الاستجابة خلال 4 ساعات' : 'Account Escalations & 4-Hour Response SLA'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'التصعيدات التشغيلية' : 'Escalations' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'مكتب التصعيدات التنفيذية (مدير حساب المورد)' : 'Executive Escalation Desk (Supplier Account Director)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'مكتب لمعالجة الحالات التشغيلية ذات الأولوية القصوى ملزم تعاقدياً بالاستجابة والحل خلال 4 ساعات عمل.'
                : 'High-priority operational incident desk contractually committed to 4-working-hour response and resolution.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          {/* 4-Hour SLA Indicator Banner */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 flex items-center justify-between gap-4 text-xs text-rose-900">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold text-sm">
                  {isAr ? 'اتفاقية مستوى الخدمة للتصعيدات الحرجة (RFP بند 3.7): ' : 'RFP Section 3.7 Critical Escalation SLA: '}
                </span>
                <span>
                  {isAr
                    ? 'يلتزم مدير حساب المورد بالاستجابة والتدخل خلال مدة أقصاها 4 ساعات عمل من تفعيل التصعيد.'
                    : 'Supplier Account Manager response required within 4 working hours of escalation trigger.'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-200 text-rose-900 font-bold text-xs shrink-0">
              {isAr ? 'مهلة 4 ساعات' : '4h SLA Clock'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 1 Col: Escalations Registry */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'سجل التصعيدات المسجلة' : 'Escalations Log'}
              </h3>

              <div className="space-y-3">
                {escalations.map((esc) => (
                  <div
                    key={esc.id}
                    onClick={() => setSelectedEsc(esc)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedEsc?.id === esc.id
                        ? 'bg-rose-50/40 border-rose-400 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-700">{esc.escalationNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">
                        {isAr ? (esc.priority === 'Critical' ? 'حرج' : 'عالي') : esc.priority}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-1">{esc.issueSummary}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{esc.department}</p>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px]">{esc.escalatedAt.split('T')[0]}</span>
                      <span className="font-bold text-slate-700">{isAr ? (esc.status === 'Closed' ? 'مغلق' : 'قيد المتابعة') : esc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 2 Cols: Escalation Details & Resolution Action */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] text-rose-600 font-bold uppercase font-mono">
                    {selectedEsc?.escalationNumber} &bull; {selectedEsc?.priority}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedEsc?.issueSummary}</h3>
                  <p className="text-xs text-slate-500">{selectedEsc?.department}</p>
                </div>

                <div className="text-right rtl:text-left">
                  <span className="text-[11px] text-slate-400 block">{isAr ? 'المهلة المحددة' : 'Target SLA'}</span>
                  <span className="text-xs font-bold text-rose-700 font-mono">
                    {isAr ? 'استجابة خلال 4 ساعات عمل' : '4-Working-Hour Response'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <span className="font-bold text-slate-800 block">
                  {isAr ? 'شرح الحالة والتفاصيل التشغيلية:' : 'Incident Description & Impact:'}
                </span>
                <p className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedEsc?.issueSummary}
                </p>
              </div>

              {selectedEsc?.status === 'Closed' ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isAr ? 'تم إغلاق وحل هذا التصعيد' : 'Escalation Resolved & Closed'}</span>
                  </div>
                  <p className="text-emerald-700">{selectedEsc?.supplierRemarks}</p>
                </div>
              ) : (
                <form onSubmit={handleResolve} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
                  <h4 className="font-bold text-slate-900">
                    {isAr ? 'تسجيل الحل والإجراءات المتخذة' : 'Record Remediation & Close Escalation'}
                  </h4>
                  <textarea
                    rows={4}
                    required
                    value={resolutionRemarks}
                    onChange={(e) => setResolutionRemarks(e.target.value)}
                    placeholder={isAr ? 'سجل الإجراءات التصحيحية التي اتخذها المورد والتنسيق مع المنشأة...' : 'Detail corrective action taken, stakeholder alignment, and permanent resolution...'}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? 'اعتماد الحل وإغلاق التصعيد' : 'Confirm Resolution & Close'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
