'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { exportToCSV } from '@/lib/export-utils';
import { useI18n } from '@/lib/i18n';

interface TraceabilityItem {
  rfpRef: string;
  category: string;
  requirementTitle: string;
  description: string;
  targetPage: string;
  route: string;
  featureImplemented: string;
  status: 'Implemented' | 'Demo Only' | 'Integration Pending' | 'Requires Development' | 'Not Implemented';
  testScenario: string;
}

export default function TraceabilityMatrixPage() {
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const matrix: TraceabilityItem[] = [
    {
      rfpRef: 'Section 3.5.1 (a)',
      category: 'Functional - ESS',
      requirementTitle: 'Employee Dashboard & Request Overview',
      description: 'Unified employee self-service dashboard showing leave balances, pending requests, notifications, and quick actions.',
      targetPage: 'Employee Dashboard',
      route: '/employee/dashboard',
      featureImplemented: 'Hero greeting, 4 summary metric cards, 6 quick actions, active requests table, upcoming events, and expiry alerts.',
      status: 'Implemented',
      testScenario: 'Scenario A: Verify all summary cards, quick actions, and request table load with live data.',
    },
    {
      rfpRef: 'Section 3.5.1 (b)',
      category: 'Functional - Leave',
      requirementTitle: 'Leave Application & Entitlement Tracking',
      description: 'Apply for leave, dynamic balance deduction, calendar view, manager review, and historical tracking.',
      targetPage: 'Leave Management',
      route: '/employee/leave',
      featureImplemented: 'Apply form with date range calculation, balance verification, manager approval inbox, deduction on approval, and audit logging.',
      status: 'Implemented',
      testScenario: 'Scenario A: Employee submits leave -> Line Manager approves in /manager/approvals -> Balance deducted.',
    },
    {
      rfpRef: 'Section 3.5.1 (c)',
      category: 'Functional - Payroll',
      requirementTitle: 'Electronic Payslips & Official Certificates',
      description: 'Secure view and download of monthly payslips and issuance of Salary/Employment Certificates within 2 working days.',
      targetPage: 'Payroll & Certificates',
      route: '/employee/payroll/payslips',
      featureImplemented: 'Itemized salary breakdown (basic, allowances, net), printable PDF dialog, certificate requests with 48h SLA counter, and supplier issuance queue.',
      status: 'Implemented',
      testScenario: 'Scenario B: Employee requests salary certificate -> Supplier fulfills in /supplier/certificates -> Stamped PDF generated.',
    },
    {
      rfpRef: 'Section 3.5.1 (d)',
      category: 'Functional - Profile & Banking',
      requirementTitle: 'Employee Profile & Masked Banking Updates',
      description: 'Profile management with supplier verification workflow for banking and contact detail updates before record changes.',
      targetPage: 'Profile & Banking',
      route: '/employee/profile',
      featureImplemented: 'Tabbed personal, contact, and banking information, masked IBAN for privacy, change request queue with supplier approval barrier.',
      status: 'Implemented',
      testScenario: 'Scenario D: Employee edits IBAN -> Stored as pending change -> Supplier verifies and approves in /supplier/requests.',
    },
    {
      rfpRef: 'Section 3.5.1 (e)',
      category: 'Functional - Documents',
      requirementTitle: 'Document Repository & 30-Day Expiry Tracking',
      description: 'Electronic archive for Emirates ID, Passport, Residence Visa, and Contracts with 30-day proactive renewal alerts.',
      targetPage: 'Document Vault',
      route: '/employee/documents',
      featureImplemented: 'Document categorization, verified badges, days until expiry countdown, 30-day urgent badge, replacement document upload, and version history.',
      status: 'Implemented',
      testScenario: 'Scenario C: Residence visa expiring in 28 days shows renewal banner -> Supplier queues renewal task.',
    },
    {
      rfpRef: 'Section 3.5.1 (f)',
      category: 'Functional - Benefits',
      requirementTitle: 'Air Tickets & Entitlements Management',
      description: 'Annual home flight bookings, family vacation requests, travel itinerary submission, and status monitoring.',
      targetPage: 'Air Tickets & Benefits',
      route: '/employee/air-tickets',
      featureImplemented: 'Itinerary request form (origin, destination, travel dates, passenger count), benefits overview, and booking status updates.',
      status: 'Implemented',
      testScenario: 'Submit annual flight request -> Verify status in employee view and supplier coordination.',
    },
    {
      rfpRef: 'Section 3.5.1 (g)',
      category: 'Functional - Insurance',
      requirementTitle: 'Medical Insurance Policy & Claims Tracking',
      description: 'Health insurance card information, coverage tier, and out-of-pocket medical claim submissions with supplier verification.',
      targetPage: 'Insurance & Claims',
      route: '/employee/insurance/coverage',
      featureImplemented: 'Policy card view, VIP network details, outpatient co-pay terms, claim submission form, and reimbursement lifecycle.',
      status: 'Implemented',
      testScenario: 'Submit medical claim with invoice -> Supplier inspects and records approval outcome.',
    },
    {
      rfpRef: 'Section 3.5.1 (h)',
      category: 'Functional - Attendance',
      requirementTitle: 'Establishment Attendance System Integration',
      description: 'Biometric gate access and attendance record matching with Establishment time-and-attendance systems.',
      targetPage: 'Attendance & Sync Adapter',
      route: '/employee/attendance',
      featureImplemented: 'Monthly calendar, daily punch logs, working hours, and live Biometric Attendance Integration Adapter with simulated sync and audit logging.',
      status: 'Demo Only',
      testScenario: 'Click "Trigger Live Biometric Sync" -> 57 records processed with 0 dropped punches and audit stamp.',
    },
    {
      rfpRef: 'Section 3.5.1 (i)',
      category: 'Functional - Ticketing',
      requirementTitle: 'Service Requests, Complaints & 24h SLA',
      description: 'Ticketing system for employee inquiries, complaints, and general HR assistance with 24-working-hour first response SLA.',
      targetPage: 'Service Requests',
      route: '/employee/requests',
      featureImplemented: 'Category picker, priority selector, threaded messaging history, assigned officer routing, and 24-hour SLA countdown timer.',
      status: 'Implemented',
      testScenario: 'Scenario E: Submit ticket -> Supplier replies in /supplier/requests -> SLA clock stops with met status.',
    },
    {
      rfpRef: 'Section 3.5.2',
      category: 'Establishment Requirements',
      requirementTitle: 'Multi-Supplier Workforce Governance',
      description: 'Establishment administration of outsourced personnel across multiple contracted suppliers (Al Tamimi & Apex) with supplier data isolation.',
      targetPage: 'Establishment Workforce',
      route: '/establishment/workforce',
      featureImplemented: '57-personnel directory, supplier filters, department breakdown, cost calculations, and supplier access boundaries.',
      status: 'Implemented',
      testScenario: 'Scenario F: Filter workforce by department and supplier -> View isolated cost and headcount reports.',
    },
    {
      rfpRef: 'Section 3.5.3',
      category: 'Security & Access',
      requirementTitle: 'Role-Based Access Control & 2FA Flow',
      description: 'Enforce granular permissions across 5 distinct roles, two-factor authentication (OTP), and immutable audit logging.',
      targetPage: 'Auth & Audit Trail',
      route: '/establishment/audit-trail',
      featureImplemented: 'Dedicated 2FA OTP verification screen, 5 segregated role navigation trees, unauthorized access barrier, and comprehensive audit trail.',
      status: 'Implemented',
      testScenario: 'Log in as employee -> Attempt direct navigation to /establishment/costs -> Render Access Restricted page.',
    },
    {
      rfpRef: 'Section 3.5.4',
      category: 'Quality & Acceptance',
      requirementTitle: 'Bilingual Interface (English & Arabic RTL)',
      description: 'Full bilingual interface with LTR/RTL layout switching, Arabic typography, and localized validation and reporting.',
      targetPage: 'Global App Shell',
      route: '/',
      featureImplemented: 'I18nProvider with persistent language toggle, RTL direction mirroring, Cairo Arabic font, and bilingual mock records.',
      status: 'Implemented',
      testScenario: 'Toggle language to العربية in header -> Interface flips to RTL with Arabic navigation and labels.',
    },
    {
      rfpRef: 'Section 3.7 (1-10)',
      category: 'SLA Monitoring',
      requirementTitle: 'Official Service Level Indicators Matrix',
      description: 'Monitor all 10 SLA targets: candidate nomination (15d), replacement (10d), salary (1st), certificates (2d), requests (24h), renewals (30d), monthly report (5d), availability (99%), turnover (<10%), accuracy (99%).',
      targetPage: 'SLA Dashboard',
      route: '/establishment/performance',
      featureImplemented: 'Interactive SLA scorecard displaying all 10 official indicators with actuals, compliance percentage, target descriptions, and breached transaction counts.',
      status: 'Implemented',
      testScenario: 'Inspect /establishment/performance and /supplier/performance to verify 10 SLA metrics and compliance health.',
    },
    {
      rfpRef: 'Section 3.7 (1 & 2)',
      category: 'Operational Staffing',
      requirementTitle: 'Vacancies & Employee Replacement Tracking',
      description: 'Track staffing requisitions, 15-day candidate nominations, 10-day emergency replacements, and CV evaluations.',
      targetPage: 'Vacancies Module',
      route: '/establishment/vacancies',
      featureImplemented: 'Staffing order creation, candidate nomination queue, interview scheduling, and deployment milestones.',
      status: 'Implemented',
      testScenario: 'View vacancy requisitions -> Nominate candidate in supplier queue -> Update interview status.',
    },
    {
      rfpRef: 'Section 3.7 (4-Hour SLA)',
      category: 'Escalations',
      requirementTitle: 'Supplier Account Escalation Management',
      description: 'Account Director response within 4 working hours for critical operational and employee escalations.',
      targetPage: 'Escalations Queue',
      route: '/supplier/escalations',
      featureImplemented: 'Escalation registry with 4-hour countdown clock, priority tagging, investigation logs, and resolution confirmation.',
      status: 'Implemented',
      testScenario: 'Open escalation -> Log resolution remarks -> Mark closed within 4-hour SLA.',
    },
    {
      rfpRef: 'Annex B Matrix',
      category: 'Compliance Matrix',
      requirementTitle: 'Employee Self Service Compliance Matrix',
      description: 'Fulfill all Annex B matrix line items for leave, payroll, benefits, profile, ticketing, and reporting.',
      targetPage: 'Traceability Matrix',
      route: '/traceability',
      featureImplemented: 'Traceability Matrix page with search, category filtering, status indicators, and CSV export.',
      status: 'Implemented',
      testScenario: 'Search matrix by RFP section or keyword -> Export full traceability matrix to CSV.',
    },
    {
      rfpRef: 'RFP Non-Functional',
      category: 'Native Mobile App',
      requirementTitle: 'Native Mobile Applications (iOS / Android)',
      description: 'Native mobile client apps distributed via Apple App Store and Google Play Store.',
      targetPage: 'Architecture Note',
      route: '/traceability',
      featureImplemented: 'Responsive enterprise web application with mobile-optimized drawer navigation. Native iOS/Android builds require subsequent mobile build phase using the decoupled API layer.',
      status: 'Requires Development',
      testScenario: 'Web application tested in mobile viewports (375px - 768px). Native binary distribution pending.',
    },
    {
      rfpRef: 'RFP Infrastructure',
      category: 'UAE Data Residency',
      requirementTitle: 'UAE In-Country Cloud Hosting & Security',
      description: 'Production hosting exclusively within certified UAE sovereign cloud datacenters (e.g. Injazat, G42, or Azure UAE North/Central).',
      targetPage: 'Architecture Note',
      route: '/traceability',
      featureImplemented: 'Production environment configuration template prepared. Demo running on local development stack with realistic UAE fixture models.',
      status: 'Integration Pending',
      testScenario: 'Configuration placeholders in environment and architecture specifications verified.',
    },
  ];

  const filtered = matrix.filter((item) => {
    const matchesSearch =
      item.rfpRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requirementTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.featureImplemented.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: TraceabilityItem['status']) => {
    switch (status) {
      case 'Implemented':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Demo Only':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Integration Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Requires Development':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Not Implemented':
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  const handleExport = () => {
    exportToCSV('EDE_RFP_Traceability_Matrix', filtered, [
      { key: 'rfpRef', label: 'RFP Reference' },
      { key: 'category', label: 'Category' },
      { key: 'requirementTitle', label: 'Requirement Title' },
      { key: 'description', label: 'Description' },
      { key: 'targetPage', label: 'Target Page' },
      { key: 'route', label: 'Application Route' },
      { key: 'featureImplemented', label: 'Implementation Summary' },
      { key: 'status', label: 'Status' },
      { key: 'testScenario', label: 'Test Scenario' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مصفوفة مطابقة متطلبات كراسة الشروط (RFP)' : 'RFP Requirement Traceability Matrix'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/' },
            { label: isAr ? 'الحوكمة' : 'Governance', href: '/establishment/dashboard' },
            { label: isAr ? 'مصفوفة الامتثال' : 'RFP Compliance Matrix' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Executive Intro Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1E38] via-[#0F2342] to-[#1D68E2] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-white/10">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#008F88]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#1D68E2]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00B3AA] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تقييم كراسة شروط مؤسسة الإمارات للدواء (EDE)' : 'Emirates Drug Establishment (EDE) RFP Evaluation'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {isAr ? 'مصفوفة تتبع ومطابقة متطلبات النظام' : 'RFP Requirement-to-Page Traceability Matrix'}
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  {isAr
                    ? 'ربط وتوثيق كافة المتطلبات الوظيفية، الأمنية، سير العمل، مؤشرات مستوى الخدمة، وإعداد التقارير من الأقسام 3.5.1، 3.5.2، 3.5.3، 3.5.4، 3.7 والملحق ب مباشرة بصفحات النظام العاملة وسيناريوهات الفحص.'
                    : 'Mapping all functional, security, workflow, SLA, and reporting specifications from Sections 3.5.1, 3.5.2, 3.5.3, 3.5.4, 3.7, and Annex B directly to functioning application routes and test scenarios.'}
                </p>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#008F88] to-[#00B3AA] hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-900/30 transition-all shrink-0 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تصدير المصفوفة (CSV)' : 'Export Matrix (CSV)'}</span>
              </button>
            </div>

            {/* Quick Status Tally */}
            <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{isAr ? 'منفذ بالكامل' : 'Implemented'}</span>
                <span className="text-xl font-black text-emerald-400">14</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{isAr ? 'محول تجريبي' : 'Demo Adapter'}</span>
                <span className="text-xl font-black text-sky-400">1</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{isAr ? 'قيد الربط' : 'Integration Pending'}</span>
                <span className="text-xl font-black text-amber-400">1</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{isAr ? 'يتطلب تطوير' : 'Requires Dev'}</span>
                <span className="text-xl font-black text-purple-400">1</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{isAr ? 'غير منفذ' : 'Not Implemented'}</span>
                <span className="text-xl font-black text-slate-300">0</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isAr ? 'ابحث في المتطلبات، الأقسام، المسارات، أو سيناريو الاختبار...' : 'Search requirement, section, route, or test scenario...'}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#1D68E2] focus:ring-3 focus:ring-[#1D68E2]/15 focus:bg-white transition-all text-xs font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 font-semibold focus:outline-hidden focus:border-[#1D68E2] transition-colors cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
                <option value="Implemented">{isAr ? 'منفذ' : 'Implemented'}</option>
                <option value="Demo Only">{isAr ? 'نموذج تجريبي' : 'Demo Only'}</option>
                <option value="Integration Pending">{isAr ? 'قيد التكامل' : 'Integration Pending'}</option>
                <option value="Requires Development">{isAr ? 'يتطلب تطوير' : 'Requires Development'}</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 font-semibold focus:outline-hidden focus:border-[#1D68E2] transition-colors cursor-pointer"
              >
                <option value="ALL">{isAr ? 'جميع الفئات' : 'All Categories'}</option>
                <option value="Functional - ESS">{isAr ? 'وظيفي - خدمات الموظفين' : 'Functional - ESS'}</option>
                <option value="Functional - Leave">{isAr ? 'وظيفي - الإجازات' : 'Functional - Leave'}</option>
                <option value="Functional - Payroll">{isAr ? 'وظيفي - الرواتب' : 'Functional - Payroll'}</option>
                <option value="Functional - Documents">{isAr ? 'وظيفي - الوثائق' : 'Functional - Documents'}</option>
                <option value="SLA Monitoring">{isAr ? 'مراقبة مستوى الخدمة' : 'SLA Monitoring'}</option>
                <option value="Security & Access">{isAr ? 'الأمان والصلاحيات' : 'Security & Access'}</option>
              </select>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'مرجع RFP' : 'RFP Ref'}</th>
                    <th className="py-3">{isAr ? 'المتطلب والنطاق' : 'Requirement & Scope'}</th>
                    <th className="py-3">{isAr ? 'مسار النظام والصفحة' : 'Application Route & Page'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3">{isAr ? 'تفاصيل التنفيذ وسيناريو الفحص' : 'Implementation Details & Test Scenario'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        {isAr ? 'لا توجد متطلبات مطابقة لمعايير البحث.' : 'No matching requirements found.'}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 align-top whitespace-nowrap font-mono font-bold text-[#0B1E38]">
                          {item.rfpRef}
                        </td>
                        <td className="p-4 align-top space-y-1.5 max-w-xs">
                          <p className="font-bold text-slate-900 leading-snug">
                            {item.requirementTitle}
                          </p>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            {item.description}
                          </p>
                          <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap space-y-1.5">
                          <span className="font-bold text-slate-800 block">
                            {item.targetPage}
                          </span>
                          <Link
                            href={item.route}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-[#1D68E2] hover:text-[#0B1E38] font-semibold transition-colors"
                          >
                            <span>{item.route}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${getStatusBadge(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 align-top space-y-2 max-w-sm">
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {item.featureImplemented}
                          </p>
                          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 text-[11px] text-slate-600 shadow-2xs">
                            <span className="font-bold text-[#0B1E38] block mb-0.5">{isAr ? 'سيناريو التحقق والاختبار:' : 'Validation Test Scenario:'}</span>
                            <span className="leading-relaxed">{item.testScenario}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

