'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  Users2,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  FileCheck2,
} from 'lucide-react';

export default function SupplierRecruitmentPipelinePage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { candidates, requisitions, updateCandidateScreening } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const steps = isAr
    ? [
        { number: 1, name: 'طلب الاحتياج من المؤسسة', desc: 'استلام أمر التوظيف والمواصفات' },
        { number: 2, name: 'استقطاب المزوّد', desc: 'البحث النشط وفرز السير الذاتية' },
        { number: 3, name: 'الفحص والمطابقة', desc: 'التحقق من المؤهلات والتراخيص' },
        { number: 4, name: 'ترشيح الكوادر', desc: 'مهلة الـ 15 يوماً التعاقدية' },
        { number: 5, name: 'مقابلة المؤسسة', desc: 'التقييم الفني مع لجنة المؤسسة' },
        { number: 6, name: 'الموافقة الخطية', desc: 'الاعتماد الرسمي أو طلب إحلال' },
        { number: 7, name: 'التأشيرة والامتثال', desc: 'الفحص الطبي والهوية وثقة' },
        { number: 8, name: 'التوزيع الميداني', desc: 'بطاقة الدخول والبصمة من اليوم الأول' },
        { number: 9, name: 'تحديث الحالة', desc: 'تفعيل الكادر وإدراجه بنظام الرواتب' },
      ]
    : [
        { number: 1, name: 'EDE Position Request', desc: 'Requisition received with specs' },
        { number: 2, name: 'Supplier Sourcing', desc: 'Active headhunting & CV intake' },
        { number: 3, name: 'Screening & Qualification', desc: 'Credentials & license verification' },
        { number: 4, name: 'Candidate Nomination', desc: '15-day contractual SLA clock' },
        { number: 5, name: 'EDE Interview', desc: 'Technical assessment with EDE panel' },
        { number: 6, name: 'Written EDE Approval', desc: 'Formal approval or replacement notice' },
        { number: 7, name: 'Visa & Compliance Prep', desc: 'PRO medical, Emirates ID, Thiqa' },
        { number: 8, name: 'Deployment', desc: 'First day turnstile entry & badge' },
        { number: 9, name: 'Status Update', desc: 'Roster active & WPS enrolled' },
      ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#142B52] text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5 text-[#008F88]" />
                <span>
                  {isAr
                    ? 'متتبع مهلة ترشيح الكوادر (15 يوماً) وفق كراسة الشروط بند 3.7'
                    : '15-DAY CANDIDATE NOMINATION SLA TRACKER (RFP SECTION 3.7)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'دورة الاستقطاب والتعيين والتوزيع الميداني' : 'Recruitment, Sourcing & Deployment Lifecycle'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'مسار التوظيف التشغيلي الكامل المكون من 9 مراحل من طلب الاحتياج وحتى المباشرة الميدانية.'
                  : 'Full 9-stage operational hiring pipeline from EDE requisition to turnstile deployment.'}
              </p>
            </div>

            <Link
              href="/supplier/candidates"
              className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <Users2 className="w-4 h-4" />
              <span>
                {isAr
                  ? `عرض قاعدة المرشحين (${candidates.length})`
                  : `View Candidate Pool (${candidates.length})`}
              </span>
            </Link>
          </div>

          {/* 9-Stage Workflow Visualization */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              {isAr ? 'مراحل الاستقطاب والتعيين التعاقدية' : 'Contractual Sourcing & Deployment Stages'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 text-xs">
              {steps.map((st) => (
                <div key={st.number} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="w-5 h-5 rounded-full bg-[#142B52] text-white flex items-center justify-center font-bold text-[10px] mb-2">
                      {st.number}
                    </span>
                    <span className="font-bold text-slate-900 block leading-tight text-[11px]">{st.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 block leading-snug">{st.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Pipeline Candidates */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr
                  ? 'المرشحون قيد مسار الاستقطاب والترشيح حالياً'
                  : 'Candidates Currently in Sourcing & Nomination Pipeline'}
              </h3>
              <span className="text-[11px] text-slate-500">
                {isAr
                  ? 'المتابعة وفق الموعد النهائي المحدد بـ 15 يوماً'
                  : 'Tracking against 15-day submission deadline'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">{isAr ? 'رقم المرشح' : 'Candidate Ref'}</th>
                    <th className="py-3 px-4">{isAr ? 'الاسم بالكامل' : 'Full Name'}</th>
                    <th className="py-3 px-4">{isAr ? 'الوظيفة المتقدم لها' : 'Position Applied'}</th>
                    <th className="py-3 px-4">{isAr ? 'الخبرة' : 'Experience'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'نسبة التطابق' : 'Match Score'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'مرحلة المسار' : 'Pipeline Stage'}</th>
                    <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'إجراء سريع' : 'Quick Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#2463A6]">{c.candidateNumber}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{c.fullName}</span>
                        <span className="text-[10px] text-slate-400">{c.nationality}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{c.positionApplied}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {c.yearsOfExperience} {isAr ? 'سنوات' : 'yrs'} ({c.education.split(',')[0]})
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded font-black text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {c.matchScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge
                          status={c.screeningStatus === 'EDE Approved' ? 'approved' : c.screeningStatus === 'EDE Rejected' ? 'rejected' : 'pending'}
                          label={
                            isAr
                              ? c.screeningStatus === 'EDE Approved'
                                ? 'معتمد من المؤسسة'
                                : c.screeningStatus === 'EDE Rejected'
                                ? 'مرفوض من المؤسسة'
                                : c.screeningStatus === 'Interview Scheduled'
                                ? 'تمت جدولة المقابلة'
                                : c.screeningStatus === 'Nominated to EDE'
                                ? 'تم الترشيح للمؤسسة'
                                : 'مفحوص ومؤهل'
                              : c.screeningStatus
                          }
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right rtl:text-left">
                        {c.screeningStatus === 'Screened' && (
                          <button
                            onClick={() => updateCandidateScreening(c.id, 'Nominated to EDE')}
                            className="px-2.5 py-1 rounded bg-[#2463A6] hover:bg-[#142B52] text-white text-[11px] font-semibold transition-colors"
                          >
                            {isAr ? 'ترشيح للمؤسسة' : 'Nominate to EDE'}
                          </button>
                        )}
                        {c.screeningStatus === 'Nominated to EDE' && (
                          <button
                            onClick={() => updateCandidateScreening(c.id, 'Interview Scheduled', '2026-10-28')}
                            className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold transition-colors"
                          >
                            {isAr ? 'جدولة المقابلة' : 'Schedule Interview'}
                          </button>
                        )}
                        {c.screeningStatus === 'Interview Scheduled' && (
                          <button
                            onClick={() => updateCandidateScreening(c.id, 'EDE Approved')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                          >
                            {isAr ? 'تسجيل اعتماد المؤسسة' : 'Record EDE Approval'}
                          </button>
                        )}
                        {(c.screeningStatus === 'EDE Approved' || c.screeningStatus === 'Offer Accepted') && (
                          <Link
                            href="/supplier/deployments"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2463A6] hover:underline"
                          >
                            <span>{isAr ? 'جاهز للتوزيع الميداني ←' : 'Deployment Ready →'}</span>
                          </Link>
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
