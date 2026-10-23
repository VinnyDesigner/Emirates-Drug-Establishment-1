'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  Users2,
  LifeBuoy,
  FileSignature,
  FolderArchive,
  AlertTriangle,
  BarChart3,
  Building2,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

export default function SupplierDashboardPage() {
  const {
    currentUser,
    employees,
    tickets,
    documents,
    certificates,
    escalations,
    profile,
    slaMetrics,
  } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'operations' | 'account'>(
    currentUser.role === 'supplier_am' ? 'account' : 'operations'
  );

  // Al Tamimi Manpower workforce (34 employees)
  const assignedWorkforce = employees.filter((e) => e.supplierEn.includes('Tamimi'));
  const pendingCertificates = certificates.filter((c) => c.status === 'processing');
  const urgentDocs = documents.filter((d) => d.renewalUrgent || d.daysUntilExpiry <= 30);
  const openTickets = tickets.filter((t) => t.status !== 'resolved' && t.status !== 'closed');
  const activeEscalations = escalations.filter((e) => e.status !== 'Closed');

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'بوابة عمليات المورد وإدارة الحساب' : 'Supplier Operations & Account Portal'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/' },
            { label: isAr ? 'لوحة تحكم المورد' : 'Supplier Dashboard' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Top Banner with Dual Role View Toggle */}
          <div className="bg-gradient-to-r from-[#0B1E38] via-[#0E2447] to-[#1D68E2] text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B3AA]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-xs text-[#00B3AA]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 font-semibold border border-white/15 backdrop-blur-xs text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? 'التميمي لخدمات القوى العاملة • المقاول الرئيسي لتوريد القوى العاملة'
                      : 'Al Tamimi Manpower Services • Primary Manpower Contractor'}
                  </span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {activeView === 'operations'
                  ? (isAr ? 'مركز العمليات وخدمات الموظفين' : 'Operations & Employee Services Hub')
                  : (isAr ? 'لوحة إدارة الحساب واتفاقيات مستوى الخدمة' : 'Account Management & SLA Dashboard')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
                {activeView === 'operations'
                  ? (isAr
                      ? 'إصدار الشهادات خلال يومين، ومعالجة طلبات تغيير الحساب البنكي، والتحقق من التجديدات، والرد على الاستفسارات خلال 24 ساعة.'
                      : 'Fulfill certificates within 2 days, process banking change requests, verify renewals, and reply to employee inquiries within 24h.')
                  : (isAr
                      ? 'مراقبة أهداف التصعيد خلال 4 ساعات، ومستهدفات التوظيف (15 يوماً للترشيح / 10 أيام للاستبدال)، ومقاييس التسليم الشهرية.'
                      : 'Monitor 4-hour escalation targets, staffing SLAs (15-day nomination / 10-day replacement), and monthly delivery metrics.')}
              </p>
            </div>

            {/* Dual View Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-white/20 shrink-0 backdrop-blur-md relative z-10 shadow-inner">
              <button
                onClick={() => setActiveView('operations')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'operations'
                    ? 'bg-gradient-to-r from-[#00B3AA] to-[#008F88] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isAr ? 'مسؤول خدمات الموظفين' : 'Employee Services Lead'}
              </button>
              <button
                onClick={() => setActiveView('account')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'account'
                    ? 'bg-gradient-to-r from-[#1D68E2] to-[#2563EB] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isAr ? 'عرض مدير الحساب' : 'Account Director View'}
              </button>
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <MetricCard
              title={isAr ? 'القوى العاملة المسندة' : 'Assigned Workforce'}
              value={isAr ? `${assignedWorkforce.length} موظفاً` : `${assignedWorkforce.length} Personnel`}
              subtitle={isAr ? 'التميمي لخدمات القوى العاملة' : 'Al Tamimi Manpower Services'}
              highlightColor="primary"
              icon={<Users2 className="w-5 h-5" />}
              trend={{ value: isAr ? '100% مكتمل التعيين' : '100% Deployed', isPositive: true, label: isAr ? 'جميع الشواغر مفعلة' : 'All Positions Active' }}
            />
            <MetricCard
              title={isAr ? 'استفسارات الدعم المفتوحة' : 'Open Support Inquiries'}
              value={openTickets.length}
              subtitle={isAr ? 'هدف الرد خلال 24 ساعة نشط' : '24h SLA response target active'}
              highlightColor={openTickets.length > 0 ? 'amber' : 'emerald'}
              icon={<LifeBuoy className="w-5 h-5" />}
              trend={{
                value: isAr ? `${openTickets.length} في الانتظار` : `${openTickets.length} In Queue`,
                isPositive: openTickets.length === 0,
                label: isAr ? 'عداد الاتفاقية يعمل' : 'SLA Clock Running',
              }}
            />
            <MetricCard
              title={isAr ? 'طلبات الشهادات المعلقة' : 'Pending Certificate Requests'}
              value={pendingCertificates.length}
              subtitle={isAr ? 'التزام اتفاقية الخدمة خلال يومي عمل' : '2 working day SLA commitment'}
              highlightColor={pendingCertificates.length > 0 ? 'accent' : 'emerald'}
              icon={<FileSignature className="w-5 h-5" />}
              trend={{
                value: isAr ? `${pendingCertificates.length} قيد المعالجة` : `${pendingCertificates.length} Processing`,
                isPositive: pendingCertificates.length === 0,
                label: isAr ? 'الأختام الرسمية جاهزة' : 'Gov Seals Ready',
              }}
            />
            <MetricCard
              title={isAr ? 'وثائق تنتهي قريباً' : 'Documents Expiring Soon'}
              value={urgentDocs.length}
              subtitle={isAr ? 'قائمة التجديد الاستباقي قبل 30 يوماً' : '30-day proactive renewal queue'}
              highlightColor={urgentDocs.length > 0 ? 'rose' : 'emerald'}
              icon={<FolderArchive className="w-5 h-5" />}
              trend={{
                value: urgentDocs.length > 0 ? (isAr ? 'إجراء عاجل' : 'Urgent Action') : (isAr ? 'الكل سارٍ' : 'All Valid'),
                isPositive: urgentDocs.length === 0,
                label: isAr ? 'فريق العلاقات العامة مكلف' : 'PRO Dispatched',
              }}
            />
          </div>

          {/* Operations View Sections */}
          {activeView === 'operations' && (
            <div className="space-y-6">
              {/* Pending Banking Profile Changes Queue */}
              {profile.pendingBankChange && (
                <div className="bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-amber-300/80 p-6 sm:p-7 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <div className="flex items-center gap-2 text-amber-900">
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm sm:text-base">
                        {isAr
                          ? 'مطلوب الموافقة على تغيير الحساب البنكي والملف الشخصي'
                          : 'Pending Profile & Banking Change Approval Required'}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
                      {isAr ? 'بانتظار مسؤول خدمات الموظفين' : 'Awaiting Supplier ESM'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {isAr ? 'الموظف' : 'Employee'}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {isAr ? profile.fullNameAr || profile.fullNameEn : profile.fullNameEn}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block">{profile.employeeId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {isAr ? 'البنك ورقم الآيبان المقترح' : 'Proposed Bank & IBAN'}
                      </span>
                      <span className="font-mono font-bold text-slate-900 block">
                        {profile.pendingBankChange.proposedBank}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px] block">
                        {profile.pendingBankChange.proposedIban}
                      </span>
                    </div>
                    <div className="sm:text-right rtl:sm:text-left flex sm:flex-col justify-end">
                      <Link
                        href="/supplier/requests"
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] hover:from-[#09172B] hover:to-[#1555BF] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        {isAr ? 'فحص واعتماد الطلب في القائمة ←' : 'Inspect & Approve in Queue →'}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Tasks Quick Table: Certificates & Tickets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Certificate Fulfillment Queue */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {isAr ? 'إنجاز الشهادات (اتفاقية مستوى الخدمة خلال يومين)' : 'Certificate Fulfillment (2-Day SLA)'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isAr ? 'خطابات رسمية بانتظار التوليد' : 'Official letters awaiting generation'}
                      </p>
                    </div>
                    <Link
                      href="/supplier/certificates"
                      className="text-xs text-[#1D68E2] hover:underline font-bold"
                    >
                      {isAr ? 'عرض الكل ←' : 'View All →'}
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 block font-mono">{cert.requestId}</span>
                          <span className="text-slate-700 font-semibold">
                            {cert.employeeName} &bull;{' '}
                            <strong className="capitalize text-[#1D68E2]">
                              {cert.certificateType === 'salary'
                                ? (isAr ? 'شهادة راتب' : 'Salary Certificate')
                                : (isAr ? 'شهادة عمل' : 'Employment Certificate')}
                            </strong>
                          </span>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">{cert.purpose}</p>
                        </div>
                        <Link
                          href="/supplier/certificates"
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00B3AA] to-[#008F88] hover:from-[#008F88] hover:to-[#00736D] text-white text-xs font-bold shrink-0 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          {isAr ? 'إنجاز الآن' : 'Fulfill Now'}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 30-Day Document Renewal Monitoring */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {isAr ? 'قائمة تجديد الوثائق (بند 3.7 - 6)' : 'Document Renewal Queue (Section 3.7 - 6)'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isAr ? 'مهام فريق العلاقات العامة قبل 30 يوماً من الانتهاء' : 'PRO tasks due 30 days before expiry'}
                      </p>
                    </div>
                    <Link
                      href="/supplier/documents"
                      className="text-xs text-[#1D68E2] hover:underline font-bold"
                    >
                      {isAr ? 'عرض القائمة ←' : 'View Queue →'}
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 block">
                            {isAr ? doc.categoryLabelAr : doc.categoryLabelEn}
                          </span>
                          <span className="text-slate-600 font-mono text-[11px]">{doc.documentNumber}</span>
                          <p className="text-[11px] text-slate-500">
                            {isAr ? `تاريخ الانتهاء: ${doc.expiryDate}` : `Expires: ${doc.expiryDate}`}
                          </p>
                        </div>
                        <div className="text-right rtl:text-left space-y-1 shrink-0">
                          <span className="font-mono font-bold text-xs text-rose-600 block">
                            {isAr ? `${doc.daysUntilExpiry} يوم متبقٍ` : `${doc.daysUntilExpiry} days left`}
                          </span>
                          <Link
                            href="/supplier/documents"
                            className="inline-block text-[11px] text-[#1D68E2] hover:underline font-bold"
                          >
                            {isAr ? 'متابعة التجديد ←' : 'Track Renewal →'}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Director View Sections */}
          {activeView === 'account' && (
            <div className="space-y-6">
              {/* Critical Escalations (4h SLA) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAr
                        ? 'قائمة تصعيدات الحساب (اتفاقية الرد خلال 4 ساعات)'
                        : 'Account Escalations Queue (RFP 4-Hour Response SLA)'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr
                        ? 'استجابة إلزامية خلال 4 ساعات عمل من قبل مدير الحساب لدى المورد.'
                        : 'Mandatory response within 4 working hours by the Supplier Account Director.'}
                    </p>
                  </div>
                  <Link
                    href="/supplier/escalations"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    {isAr ? 'فتح لوحة التصعيدات' : 'Open Escalations Console'}
                  </Link>
                </div>

                <div className="space-y-3">
                  {escalations.map((esc) => (
                    <div
                      key={esc.id}
                      className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-rose-700">{esc.escalationNumber}</span>
                          <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-800 font-bold text-[10px]">
                            {t(esc.priority)}
                          </span>
                          <span className="text-slate-500">&bull; {esc.department}</span>
                        </div>
                        <p className="font-bold text-slate-900">{esc.issueSummary}</p>
                        <p className="text-slate-600 text-[11px]">
                          {isAr
                            ? `المسؤول: ${esc.responsibleOfficer} • تاريخ التصعيد: ${new Date(esc.escalatedAt).toLocaleTimeString(isAr ? 'ar-AE' : 'en-GB')}`
                            : `Responsible Officer: ${esc.responsibleOfficer} • Escalated: ${new Date(esc.escalatedAt).toLocaleTimeString()}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{isAr ? 'هدف 4 ساعات نشط' : '4h Target Active'}</span>
                        </span>
                        <Link
                          href="/supplier/escalations"
                          className="px-3 py-1.5 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-lg font-semibold text-xs cursor-pointer"
                        >
                          {isAr ? 'معالجة ←' : 'Resolve →'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staffing SLAs (15d Nomination / 10d Replacement) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAr
                        ? 'اتفاقيات التوظيف وطلبات الشواغر (بند 3.7 - 1 و 2)'
                        : 'Staffing SLAs & Vacancy Requisitions (Section 3.7 - 1 & 2)'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr
                        ? 'ترشيح المرشحين خلال 15 يوم عمل، واستبدال الموظفين الطارئ خلال 10 أيام عمل.'
                        : 'Candidate nomination within 15 working days; emergency employee replacement within 10 working days.'}
                    </p>
                  </div>
                  <Link
                    href="/supplier/vacancies"
                    className="text-xs text-[#2463A6] hover:underline font-semibold"
                  >
                    {isAr ? 'إدارة الطلبات' : 'Manage Requisitions'}
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'اتفاقية ترشيح المرشحين (15 يوماً)' : 'Candidate Nomination SLA (15 Days)'}
                    </span>
                    <p className="text-2xl font-black text-emerald-700">
                      {isAr ? 'معدل 11.2 يوم' : '11.2 Days Avg'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isAr ? 'نسبة التزام 97.5% عبر 8 ترشيحات في هذا الربع.' : '97.5% compliance across 8 nominations this quarter.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">
                      {isAr ? 'اتفاقية استبدال الموظفين (10 أيام)' : 'Employee Replacement SLA (10 Days)'}
                    </span>
                    <p className="text-2xl font-black text-emerald-700">
                      {isAr ? 'معدل 8.4 يوم' : '8.4 Days Avg'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isAr ? 'نسبة التزام 98.0% مع صفر طلبات استبدال متأخرة.' : '98.0% compliance with zero breached replacement orders.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
