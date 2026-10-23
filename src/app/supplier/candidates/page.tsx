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
  Users2,
  Search,
  Filter,
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';

export default function SupplierCandidatesPoolPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { candidates, addCandidate } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New candidate modal state
  const [fullName, setFullName] = useState('');
  const [positionApplied, setPositionApplied] = useState('Pharmacovigilance Specialist');
  const [nationality, setNationality] = useState('Jordan');
  const [experience, setExperience] = useState(7);
  const [education, setEducation] = useState('PharmD, Clinical Pharmacy');

  const filtered = candidates.filter((c) =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.candidateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.positionApplied.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCandidate({
      fullName,
      positionApplied,
      nationality,
      yearsOfExperience: Number(experience),
      education,
      supplier: 'Al Tamimi Manpower Services',
      screeningStatus: 'Screened',
      matchScore: 92,
    });
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(
      filtered.map((c) => ({
        Candidate_ID: c.candidateNumber,
        Full_Name: c.fullName,
        Position: c.positionApplied,
        Nationality: c.nationality,
        Years_Exp: c.yearsOfExperience,
        Education: c.education,
        Match_Score: `${c.matchScore}%`,
        Status: c.screeningStatus,
        Submission_Date: c.submissionDate,
      })),
      'EDE-Candidates-Sourcing-Pool'
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
                {isAr ? 'قاعدة استقطاب الكوادر ونخبة المرشحين' : 'Candidate Sourcing & Talent Pool'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'كوادر صيدلانية وتنظيمية وتقنية تم فحصها واعتماد كفاءتها جاهزة للترشيح المباشر.'
                  : 'Pre-screened pharmaceutical, regulatory, and technical specialists available for EDE nomination.'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{isAr ? 'تصدير قاعدة الكوادر' : 'Export Pool'}</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Users2 className="w-4 h-4" />
                <span>{isAr ? 'إدخال مرشح جديد' : 'Intake New Candidate'}</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'البحث بالاسم أو الرقم المرجعي أو المسمى الوظيفي...' : 'Search candidates by name, ref, or role...'}
                className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
            </div>
          </div>

          {/* Candidate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#2463A6] block">{c.candidateNumber}</span>
                    <h2 className="text-sm font-bold text-slate-900 mt-0.5">{c.fullName}</h2>
                    <span className="text-xs text-slate-500">{c.positionApplied}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {c.matchScore}% {isAr ? 'تطابق' : 'Match'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.yearsOfExperience} {isAr ? 'سنوات خبرة تخصصية' : 'Years Relevant Experience'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{c.education}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <StatusBadge
                    status={c.screeningStatus === 'EDE Approved' ? 'approved' : c.screeningStatus === 'EDE Rejected' ? 'rejected' : 'pending'}
                    label={
                      isAr
                        ? c.screeningStatus === 'EDE Approved'
                          ? 'معتمد من المؤسسة'
                          : c.screeningStatus === 'EDE Rejected'
                          ? 'مرفوض من المؤسسة'
                          : 'مفحوص ومؤهل'
                        : c.screeningStatus
                    }
                  />
                  <span className="text-[11px] text-slate-400">{c.nationality}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? 'إدخال بيانات مرشح جديد' : 'Intake New Sourced Candidate'}
                </h3>
                <form onSubmit={handleCreate} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'الاسم بالكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAr ? 'مثال: د. ليلى حداد' : 'e.g. Dr. Layla Haddad'}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'الوظيفة المتقدم لها' : 'Position Applied'}
                    </label>
                    <input
                      type="text"
                      required
                      value={positionApplied}
                      onChange={(e) => setPositionApplied(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {isAr ? 'الجنسية' : 'Nationality'}
                      </label>
                      <input
                        type="text"
                        required
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {isAr ? 'سنوات الخبرة' : 'Years Experience'}
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        value={experience}
                        onChange={(e) => setExperience(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isAr ? 'المؤهل التعليمي / الاعتمادات المهنية' : 'Education / Certification'}
                    </label>
                    <input
                      type="text"
                      required
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder={isAr ? 'مثال: دكتور صيدلة، صيدلة إكلينيكية' : 'e.g. MSc Industrial Pharmacy, RAC'}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1.5 rounded-lg border text-slate-600"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#142B52] text-white font-bold rounded-lg"
                    >
                      {isAr ? 'حفظ المرشح' : 'Save Candidate'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
