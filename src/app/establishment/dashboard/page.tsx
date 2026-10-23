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
  Building2,
  Users2,
  CalendarDays,
  FolderArchive,
  BarChart3,
  DollarSign,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
} from 'lucide-react';

export default function EstablishmentDashboardPage() {
  const { employees, leaveRequests, documents, slaMetrics, currentUser } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.employmentStatus === 'Active').length;
  const onLeaveEmployees = employees.filter((e) => e.employmentStatus === 'On Leave').length;
  const pendingApprovals = leaveRequests.filter((r) => r.status === 'under_review').length;
  const expiringDocs = documents.filter((d) => d.renewalUrgent || d.daysUntilExpiry <= 30).length;

  const overallSla = (
    slaMetrics.reduce((acc, m) => acc + m.complianceRate, 0) / slaMetrics.length
  ).toFixed(1);

  // Department distribution
  const deptCounts: Record<string, number> = {};
  employees.forEach((e) => {
    const key = isAr ? e.departmentAr || e.departmentEn : e.departmentEn;
    deptCounts[key] = (deptCounts[key] || 0) + 1;
  });

  // Supplier allocation (Al Tamimi vs Apex)
  const supplierCounts = {
    tamimi: employees.filter((e) => e.supplierEn.includes('Tamimi')).length,
    apex: employees.filter((e) => e.supplierEn.includes('Apex')).length,
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مركز قيادة حوكمة المنشأة' : 'Establishment Governance Command Center'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/' },
            { label: isAr ? 'لوحة القيادة التنفيذية للمنشأة' : 'Establishment Executive Dashboard' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Executive Header Banner */}
          <div className="bg-gradient-to-r from-[#0B1E38] via-[#0E2447] to-[#008F88] text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00B3AA]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-xs text-[#00B3AA]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 font-semibold border border-white/15 backdrop-blur-xs text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? 'مؤسسة الإمارات للدواء • إدارة حوكمة القوى العاملة'
                      : 'Emirates Drug Establishment • Directorate of Workforce Governance'}
                  </span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {isAr ? `مرحباً سعادة ${currentUser.nameAr || currentUser.name}` : `Welcome, Director ${currentUser.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
                {isAr
                  ? 'إشراف استراتيجي على القوى العاملة، وتوزيع الموردين، ومؤشرات الإنفاق، والامتثال لاتفاقيات مستوى الخدمة.'
                  : 'High-level workforce oversight, multi-contractor allocation, expenditure trends, and contractual SLA fulfillment.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <Link
                href="/establishment/workforce"
                className="px-4.5 py-3 rounded-xl bg-white text-[#0B1E38] hover:bg-slate-100 font-bold text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Users2 className="w-4 h-4 text-[#008F88]" />
                <span>{isAr ? `دليل القوى العاملة (${totalEmployees})` : `Workforce Directory (${totalEmployees})`}</span>
              </Link>
              <Link
                href="/establishment/reports"
                className="px-4.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-teal-300" />
                <span>{isAr ? 'التحليلات والتقارير' : 'Analytics & Reports'}</span>
              </Link>
            </div>
          </div>

          {/* Top 8 Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <MetricCard
              title={isAr ? 'إجمالي القوى العاملة الخارجية' : 'Total Outsourced Workforce'}
              value={isAr ? `${totalEmployees} موظفاً` : `${totalEmployees} Personnel`}
              subtitle={isAr ? 'موزعون على شركتي توريد متعاقد معهما' : 'Distributed across 2 contracted suppliers'}
              highlightColor="primary"
              icon={<Users2 className="w-5 h-5" />}
              trend={{ value: isAr ? '100% مكتمل التعيين' : '100% Deployed', isPositive: true, label: isAr ? 'حسب الحصة المعتمدة' : 'Full Authorized Allocation' }}
            />
            <MetricCard
              title={isAr ? 'على رأس العمل حالياً' : 'Active on Duty'}
              value={isAr ? `${activeEmployees} أخصائياً` : `${activeEmployees} Specialists`}
              subtitle={isAr ? `${onLeaveEmployees} حالياً في إجازة معتمدة` : `${onLeaveEmployees} currently on approved leave`}
              highlightColor="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
              trend={{ value: isAr ? '98.2% نسبة الحضور' : '98.2% Presence', isPositive: true, label: isAr ? 'تغطية الوردية' : 'Shift Roster Cover' }}
            />
            <MetricCard
              title={isAr ? 'الامتثال العام لمستوى الخدمة' : 'Overall SLA Compliance'}
              value={`${overallSla}%`}
              subtitle={isAr ? 'الأداء التعاقدي عبر 10 مؤشرات أداء رئيسية' : 'Contractual performance across 10 KPIs'}
              highlightColor="accent"
              icon={<ShieldCheck className="w-5 h-5" />}
              trend={{ value: isAr ? 'مستوفى بند 3.7' : 'Section 3.7 Met', isPositive: true, label: isAr ? 'صفر خصومات' : 'Zero Breached Deduction' }}
            />
            <MetricCard
              title={isAr ? 'الإنفاق الشهري على التعهيد' : 'Monthly Outsourcing Outlay'}
              value={isAr ? '2.14 مليون درهم' : 'AED 2.14M'}
              subtitle={isAr ? 'رواتب 57 موظفاً بالإضافة لرسوم الموردين' : 'All 57 personnel salary + contractor fee'}
              highlightColor="primary"
              icon={<DollarSign className="w-5 h-5" />}
              trend={{ value: isAr ? 'ضمن الميزانية' : 'On Budget', isPositive: true, label: isAr ? 'عقد السنة المالية 2026' : 'Contract FY2026' }}
            />
            <MetricCard
              title={isAr ? 'الموردون المتعاقد معهم' : 'Contracted Suppliers'}
              value={isAr ? 'شركتان' : '2 Providers'}
              subtitle={isAr ? 'التميمي (34) / أبكس (23)' : 'Al Tamimi (34) / Apex (23)'}
              highlightColor="primary"
              icon={<Building2 className="w-5 h-5" />}
              trend={{ value: isAr ? 'تعدد الموردين' : 'Dual Sourcing', isPositive: true, label: isAr ? 'مطابق للبند 3.5.2' : 'Section 3.5.2 Compliant' }}
            />
            <MetricCard
              title={isAr ? 'أوامر التوظيف المفتوحة' : 'Open Staffing Orders'}
              value={isAr ? 'طلبان' : '2 Requisitions'}
              subtitle={isAr ? '1 شاغر جديد / 1 استبدال طارئ' : '1 New Vacancy / 1 Emergency Replacement'}
              highlightColor="amber"
              icon={<UserPlus className="w-5 h-5" />}
              trend={{ value: isAr ? 'ترشيح خلال 15 يوماً' : '15d Nomination', isPositive: true, label: isAr ? 'توظيف نشط' : 'Active Recruitment' }}
            />
            <MetricCard
              title={isAr ? 'الاعتمادات المتدرجة المعلقة' : 'Pending Tiered Approvals'}
              value={pendingApprovals}
              subtitle={isAr ? 'موافقات إشرافية مطلوبة من المنشأة' : 'Establishment supervisory sign-offs'}
              highlightColor={pendingApprovals > 0 ? 'amber' : 'emerald'}
              icon={<Clock className="w-5 h-5" />}
              trend={{ value: isAr ? `${pendingApprovals} في الانتظار` : `${pendingApprovals} In Queue`, isPositive: pendingApprovals === 0, label: isAr ? 'الموافقة التنفيذية' : 'Executive Gate' }}
            />
            <MetricCard
              title={isAr ? 'وثائق مستحقة للتجديد' : 'Documents Due for Renewal'}
              value={isAr ? `${expiringDocs} عاجلة` : `${expiringDocs} Urgent`}
              subtitle={isAr ? 'مراقبة استباقية لمهلة 30 يوماً' : '30-day proactive threshold monitoring'}
              highlightColor={expiringDocs > 0 ? 'rose' : 'emerald'}
              icon={<FolderArchive className="w-5 h-5" />}
              trend={{ value: expiringDocs > 0 ? (isAr ? 'متابعة الإجراء' : 'Action Track') : (isAr ? 'لا توجد متأخرات' : 'All Clear'), isPositive: expiringDocs === 0, label: isAr ? 'فريق العلاقات العامة' : 'PRO Escort' }}
            />
          </div>

          {/* Interactive Visual Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Department Distribution */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr
                      ? 'توزيع القوى العاملة حسب الإدارة (6 أقسام تخصصية)'
                      : 'Workforce Allocation by Department (6 Specialized Divisions)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr
                      ? 'توزيع العلماء والمفتشين وكوادر تقنية المعلومات الخارجية'
                      : 'Distribution of external scientists, inspectors, and IT personnel'}
                  </p>
                </div>
                <Link href="/establishment/departments" className="text-xs text-[#1D68E2] hover:underline font-bold">
                  {isAr ? 'التفاصيل ←' : 'Details →'}
                </Link>
              </div>

              <div className="space-y-4 pt-1">
                {Object.entries(deptCounts).map(([dept, count]) => {
                  const pct = Math.round((count / totalEmployees) * 100);
                  return (
                    <div key={dept} className="space-y-1.5 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-800">{dept}</span>
                        <span className="font-bold text-[#0F2342] font-mono">
                          {isAr ? `${count} موظفاً ` : `${count} Staff `}
                          <span className="text-slate-400 font-normal">({pct}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#1D68E2] to-[#00B3AA] h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(pct * 2.8, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Contractor Allocation Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  {isAr ? 'توزيع الموردين المتعددين (بند 3.5.2)' : 'Multi-Supplier Allocation (Section 3.5.2)'}
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  {isAr
                    ? 'إجمالي 57 وظيفة خارجية موزعة بين الشركات المعتمدة.'
                    : 'Total of 57 outsourced roles partitioned between contracted manpower providers.'}
                </p>

                <div className="space-y-4 mt-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/40 border border-blue-200/80 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#0F2342]">
                        {isAr ? 'التميمي لخدمات القوى العاملة' : 'Al Tamimi Manpower Services'}
                      </span>
                      <span className="font-bold font-mono text-[#1D68E2]">
                        {isAr ? `${supplierCounts.tamimi} موظفاً` : `${supplierCounts.tamimi} Personnel`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr ? '60% من حصة القوى العاملة الخارجية' : '60% of total outsourced manpower quota'}
                    </p>
                    <div className="w-full bg-blue-200/60 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#1D68E2] h-full w-[60%] rounded-full" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 to-teal-100/40 border border-teal-200/80 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#008F88]">
                        {isAr ? 'أبكس لحلول التعهيد' : 'Apex Outsourcing Solutions'}
                      </span>
                      <span className="font-bold font-mono text-[#008F88]">
                        {isAr ? `${supplierCounts.apex} موظفاً` : `${supplierCounts.apex} Personnel`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr ? '40% من حصة القوى العاملة الخارجية' : '40% of total outsourced manpower quota'}
                    </p>
                    <div className="w-full bg-teal-200/60 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#008F88] h-full w-[40%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="font-medium">{isAr ? 'العزل التعاقدي للبيانات:' : 'Contractual Isolation:'}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? 'مطبق بالكامل' : 'Enforced'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Workforce Audit Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'سجل نشر القوى العاملة والحالات الأخيرة' : 'Recent Workforce Deployment & Status Log'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'السجل الموحد لجميع الموردين' : 'Global cross-contractor registry'}
                </p>
              </div>
              <Link
                href="/establishment/workforce"
                className="text-xs text-[#1D68E2] hover:underline font-bold flex items-center gap-1 group"
              >
                <span>{isAr ? 'عرض السجل الكامل لـ 57 موظفاً' : 'View Full 57-Personnel Directory'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">{isAr ? 'الرقم الوظيفي' : 'Employee ID'}</th>
                    <th className="py-3 px-2">{isAr ? 'الاسم' : 'Name'}</th>
                    <th className="py-3 px-2">{isAr ? 'المسمى الوظيفي' : 'Job Title'}</th>
                    <th className="py-3 px-2">{isAr ? 'الإدارة' : 'Department'}</th>
                    <th className="py-3 px-2">{isAr ? 'جهة التوريد' : 'Supplier Entity'}</th>
                    <th className="py-3 px-2">{isAr ? 'تاريخ الالتحاق' : 'Joining Date'}</th>
                    <th className="py-3 px-2 text-right rtl:text-left">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.slice(0, 5).map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-[#142B52]">{emp.employeeId}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900">
                        {isAr ? emp.fullNameAr || emp.fullNameEn : emp.fullNameEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-700 font-medium">
                        {isAr ? emp.jobTitleAr || emp.jobTitleEn : emp.jobTitleEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-600">
                        {isAr ? emp.departmentAr || emp.departmentEn : emp.departmentEn}
                      </td>
                      <td className="py-3.5 px-2 font-semibold text-slate-800">
                        {isAr ? emp.supplierAr || emp.supplierEn : emp.supplierEn}
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 font-mono">{emp.joiningDate}</td>
                      <td className="py-3.5 px-2 text-right rtl:text-left">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.employmentStatus === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full ${emp.employmentStatus === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {isAr ? (emp.employmentStatus === 'Active' ? 'على رأس العمل' : 'في إجازة') : emp.employmentStatus}
                        </span>
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
