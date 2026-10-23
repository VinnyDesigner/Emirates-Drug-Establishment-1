'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import { exportToCSV } from '@/lib/export-utils';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Calendar,
  Building2,
  UserCheck,
} from 'lucide-react';

export default function SupplierDeploymentsPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { deployments, updateDeployment } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(
      deployments.map((d) => ({
        Deployment_Ref: d.deploymentNumber,
        Candidate: d.employeeName,
        Position: d.position,
        Department: d.department,
        Supplier: d.supplier,
        Nomination_Approved: d.nominationApprovedDate,
        Visa_Milestone: d.visaStatus,
        Insurance_Status: d.insuranceStatus,
        Target_Start_Date: d.targetStartDate,
        Status: d.status,
      })),
      'EDE-Deployments-Pipeline-Report'
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                <span>
                  {isAr
                    ? 'الاعتماد النظامي ما قبل التوزيع الميداني (كراسة الشروط بند 3.5.2)'
                    : 'PRE-DEPLOYMENT STATUTORY CLEARANCE (RFP SECTION 3.5.2)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'توزيع المرشحين ومراحل الالتزام النظامي' : 'Candidate Deployment & Compliance Milestones'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'متابعة إصدار التأشيرات، الفحص الطبي لوزارة الصحة، البصمة البيومترية للهوية، وجاهزية بطاقة التأمين الصحي.'
                  : 'Monitoring PRO visa processing, MOH medical fitness, Emirates ID biometric enrollment, and Thiqa/Daman insurance readiness.'}
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'تصدير خطط التوزيع' : 'Export Deployments'}</span>
            </button>
          </div>

          {/* Deployments Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'نظام متابعة وتعيين وتوزيع القوى العاملة' : 'Workforce Onboarding & Deployment Tracker'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'معرّف التوزيع' : 'Deployment Ref'}</th>
                    <th className="py-3 px-4">{isAr ? 'الموظف / المسمى' : 'Employee / Position'}</th>
                    <th className="py-3 px-4">{isAr ? 'إدارة المؤسسة' : 'EDE Department'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'حالة التأشيرة والعمل' : 'Visa & Labor Status'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'التأمين' : 'Insurance'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'تاريخ المباشرة' : 'Target Start'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'تحديث المرحلة' : 'Update Milestone'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deployments.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#2463A6]">
                        {d.deploymentNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{d.employeeName}</span>
                        <span className="text-[11px] text-slate-500">{d.position}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {d.department}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {isAr
                            ? d.visaStatus === 'Medical Passed'
                              ? 'اجتاز الفحص الطبي'
                              : d.visaStatus === 'Entry Permit Issued'
                              ? 'إذن الدخول صادر'
                              : d.visaStatus === 'Emirates ID Biometrics Done'
                              ? 'أُنجزت بصمة الهوية'
                              : d.visaStatus === 'Visa Stamped'
                              ? 'الإقامة مثبتة'
                              : d.visaStatus === 'Pending Submission'
                              ? 'بانتظار التقديم'
                              : d.visaStatus
                            : d.visaStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {isAr
                            ? d.insuranceStatus === 'Enrolled'
                              ? 'مدرج بالتأمين'
                              : d.insuranceStatus === 'Card Active'
                              ? 'البطاقة نشطة'
                              : d.insuranceStatus === 'Pending'
                              ? 'قيد الانتظار'
                              : d.insuranceStatus
                            : d.insuranceStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-800">
                        {d.targetStartDate}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge
                          status={d.status === 'Deployed' ? 'approved' : 'pending'}
                          label={isAr ? (d.status === 'Deployed' ? 'موزع ميدانياً' : 'قيد الإجراء') : d.status}
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right rtl:text-left">
                        {d.status !== 'Deployed' ? (
                          <button
                            onClick={() => updateDeployment(d.id, 'Deployed', 'Visa Stamped', 'Card Active')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                          >
                            {isAr ? 'تحديد كمنجز وموزع' : 'Mark Deployed'}
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold">
                            {isAr ? 'نشط في الكادر' : 'Active in Roster'}
                          </span>
                        )}
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
