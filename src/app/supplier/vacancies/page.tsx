'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  UserPlus,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  PlusCircle,
  FileText,
  Upload,
} from 'lucide-react';

export default function SupplierVacanciesPage() {
  const { requisitions, nominateCandidate, updateCandidateStatus } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReqId, setSelectedReqId] = useState(requisitions[0]?.id || '');
  const [showNominateModal, setShowNominateModal] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateNationality, setCandidateNationality] = useState(isAr ? 'الأردن' : 'Jordan');
  const [candidateQual, setCandidateQual] = useState(isAr ? 'ماجستير صيدلة سريرية، خبرة 8 سنوات' : 'MSc Clinical Pharmacy, 8 years exp');
  const [candidateExp, setCandidateExp] = useState(8);
  const [successMsg, setSuccessMsg] = useState('');

  const currentReq = requisitions.find((r) => r.id === selectedReqId) || requisitions[0];

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReq) return;

    nominateCandidate(currentReq.id, {
      name: candidateName,
      nationality: candidateNationality,
      qualification: candidateQual,
      yearsOfExperience: candidateExp,
      cvFileName: `CV_${candidateName.replace(/ /g, '_')}.pdf`,
    });

    setShowNominateModal(false);
    setCandidateName('');
    setSuccessMsg(
      isAr
        ? `تم ترشيح الكادر للوظيفة ${currentReq.positionTitle} بنجاح ضمن مهلة 15 يوماً.`
        : `Candidate nominated for ${currentReq.positionTitle} within 15-day SLA.`
    );
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'طلبات التوظيف وترشيح الكوادر للمنشأة' : 'Staffing Requisitions & Candidate Nominations'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/supplier/dashboard' },
            { label: isAr ? 'الشواغر والإحلال' : 'Vacancies & Replacements' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'إدارة طلبات التوظيف وعمليات الإحلال التعاقدية' : 'Staffing Requisitions & Replacement Management'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'متابعة مؤشرات كراسة الشروط (بند 3.7): ترشيح الكوادر خلال 15 يوم عمل؛ والإحلال الطارئ للبديل خلال 10 أيام عمل.'
                : 'Tracking Section 3.7 SLAs: Candidate nomination within 15 working days; emergency replacement within 10 working days.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          {/* SLA Tracking Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'مستهدف ترشيح الكوادر (بند 3.7 - مؤشر 1)' : 'Candidate Nomination SLA (RFP 3.7 - 1)'}
              </span>
              <p className="text-xl font-black text-emerald-700">
                {isAr ? '15 يوم عمل كحد أقصى' : '15 Working Days Target'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'المتوسط الحالي للمورد: 11.2 يوماً • نسبة الامتثال 97.5%' : 'Current Average: 11.2 Days • 97.5% Compliance'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'مستهدف إحلال البديل (بند 3.7 - مؤشر 2)' : 'Employee Replacement SLA (RFP 3.7 - 2)'}
              </span>
              <p className="text-xl font-black text-emerald-700">
                {isAr ? '10 أيام عمل كحد أقصى' : '10 Working Days Target'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'المتوسط الحالي للمورد: 8.4 يوماً • نسبة الامتثال 98.0%' : 'Current Average: 8.4 Days • 98.0% Compliance'}
              </p>
            </div>
          </div>

          {/* Requisitions List & Candidate Nominees */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Requisition Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'طلبات التوظيف النشطة' : 'Active Staffing Requisitions'}
              </h3>

              <div className="space-y-3">
                {requisitions.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => setSelectedReqId(req.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedReqId === req.id
                        ? 'bg-white border-[#2463A6] shadow-md ring-2 ring-[#2463A6]/20'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#142B52]">{req.requisitionId}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-bold uppercase text-slate-700">
                        {isAr ? (req.type === 'New Vacancy' ? 'شاغر جديد' : 'استبدال طارئ') : req.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-1">{t(req.positionTitle)}</h4>
                    <p className="text-[11px] text-slate-500">{t(req.department)}</p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">
                        {isAr ? `المهلة: ${req.slaDaysAllowed} يوم` : `SLA Allowed: ${req.slaDaysAllowed}d`}
                      </span>
                      <span className="font-bold text-emerald-700">
                        {req.nominatedCandidates.length} {isAr ? 'مرشحين' : 'Nominees'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 2 Cols: Requisition Details & Nominated Candidates */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">
                    {currentReq?.requisitionId} &bull; {isAr ? (currentReq?.type === 'New Vacancy' ? 'شاغر جديد' : 'استبدال طارئ') : currentReq?.type}
                  </span>
                  <h3 className="text-base font-bold text-[#142B52]">{t(currentReq?.positionTitle || '')}</h3>
                  <p className="text-xs text-slate-500">{t(currentReq?.department || '')}</p>
                </div>

                <button
                  onClick={() => setShowNominateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isAr ? 'ترشيح كادر مؤهل جديد' : 'Nominate Qualified Candidate'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">
                  {isAr ? 'المواصفات والمؤهلات المطلوبة:' : 'Required Qualification Profile:'}
                </span>
                <p>{currentReq?.requiredQualifications}</p>
              </div>

              {/* Candidates Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {isAr ? `قائمة المرشحين المقدمين (${currentReq?.nominatedCandidates.length})` : `Nominated Candidate Roster (${currentReq?.nominatedCandidates.length})`}
                </h4>

                {currentReq?.nominatedCandidates.length === 0 ? (
                  <p className="p-8 text-center text-xs text-slate-400">
                    {isAr ? 'لم يتم تقديم أي مرشحين حتى الآن. انقر على "ترشيح كادر مؤهل جديد" لإضافة السير الذاتية.' : 'No candidates submitted yet. Click "Nominate Qualified Candidate" to add evaluated profiles.'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {currentReq?.nominatedCandidates.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                            <span className="text-slate-400">&bull;</span>
                            <span className="text-slate-600">{c.nationality}</span>
                            <span className="text-slate-400">&bull;</span>
                            <span className="font-bold text-emerald-700">
                              {c.yearsOfExperience} {isAr ? 'سنوات خبرة' : 'yrs exp'}
                            </span>
                          </div>
                          <p className="text-slate-600">{c.qualification}</p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {isAr ? 'السيرة الذاتية: ' : 'CV: '} {c.cvFileName} &bull; {isAr ? 'تاريخ الترشيح: ' : 'Nominated: '} {c.nominatedDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={c.status} />
                          {c.status === 'nominated' && (
                            <button
                              onClick={() => updateCandidateStatus(currentReq.id, c.id, 'interview_scheduled')}
                              className="px-3 py-1.5 rounded-lg bg-[#142B52] hover:bg-[#0E1F3D] text-white font-semibold text-xs cursor-pointer"
                            >
                              {isAr ? 'جدولة المقابلة' : 'Schedule Interview'}
                            </button>
                          )}
                          {c.status === 'interview_scheduled' && (
                            <button
                              onClick={() => updateCandidateStatus(currentReq.id, c.id, 'approved')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer"
                            >
                              {isAr ? 'تسجيل اعتماد المنشأة' : 'Mark Client Approved'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Nominate Candidate Modal */}
      {showNominateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in duration-150 text-xs">
            <h3 className="font-bold text-sm text-[#142B52] border-b border-slate-100 pb-2">
              {isAr ? `ترشيح كادر لوظيفة: ${currentReq?.positionTitle}` : `Nominate Candidate for ${currentReq?.positionTitle}`}
            </h3>

            <form onSubmit={handleNominateSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {isAr ? 'الاسم الكامل للمرشح' : 'Candidate Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder={isAr ? 'مثال: د. زيد الراوي' : 'e.g. Dr. Zaid Al Rawi'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'الجنسية' : 'Nationality'}
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateNationality}
                    onChange={(e) => setCandidateNationality(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'سنوات الخبرة' : 'Years Experience'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={candidateExp}
                    onChange={(e) => setCandidateExp(parseInt(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {isAr ? 'المؤهل العلمي والاعتماد التخصصي' : 'Highest Qualification & Accreditation'}
                </label>
                <input
                  type="text"
                  required
                  value={candidateQual}
                  onChange={(e) => setCandidateQual(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNominateModal(false)}
                  className="px-4 py-2 border rounded-xl cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#008F88] hover:bg-[#00736D] text-white font-bold rounded-xl cursor-pointer"
                >
                  {isAr ? 'تأكيد الترشيح' : 'Commit Nomination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
