'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  UserSquare2,
  Phone,
  Landmark,
  ShieldCheck,
  Building2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Lock,
  Edit3,
} from 'lucide-react';

export default function EmployeeProfilePage() {
  const { profile, requestBankDetailChange } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'personal' | 'contact' | 'banking'>('personal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Bank change form
  const [showBankForm, setShowBankForm] = useState(false);
  const [proposedBank, setProposedBank] = useState('Emirates NBD');
  const [proposedIban, setProposedIban] = useState('AE44 0260 0000 8712 9011 4455');
  const [bankReason, setBankReason] = useState('Salary account transition for preferential mortgage terms.');
  const [bankError, setBankError] = useState('');
  const [bankSuccess, setBankSuccess] = useState(false);

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedIban.startsWith('AE') || proposedIban.replace(/ /g, '').length !== 23) {
      setBankError(isAr ? 'صيغة الآيبان غير صحيحة. يجب أن يبدأ بـ AE ويتكون من 23 خانة.' : 'Invalid UAE IBAN format. Must start with AE and contain 23 characters.');
      return;
    }

    requestBankDetailChange({
      proposedBank,
      proposedIban,
      reason: bankReason,
    });

    setShowBankForm(false);
    setBankSuccess(true);
    setBankError('');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={t('Employee Profile & Banking Details')}
          breadcrumbs={[
            { label: 'Portal', href: '/employee/dashboard' },
            { label: 'My Profile' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header Profile Identity Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#142B52] text-white flex items-center justify-center font-black text-2xl shadow-md uppercase shrink-0">
              {profile.fullNameEn.slice(0, 2)}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left rtl:sm:text-right">
              <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#142B52]">
                  {isAr ? profile.fullNameAr : profile.fullNameEn}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {t(profile.employmentStatus)}
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  {profile.employeeId}
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                {isAr ? (profile.jobTitleAr || profile.jobTitleEn) : profile.jobTitleEn} &bull; <strong className="text-slate-800">{isAr ? (profile.departmentAr || profile.departmentEn) : profile.departmentEn}</strong>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#008F88]" />
                  <span>{t('Contractor')}: {profile.supplierEn}</span>
                </span>
                <span>&bull;</span>
                <span>{t('Nationality')}: {t(profile.nationality)}</span>
                <span>&bull;</span>
                <span>{t('Joining Date')}: {profile.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('personal')}
              className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'personal'
                  ? 'border-[#142B52] text-[#142B52]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserSquare2 className="w-4 h-4" />
              <span>{isAr ? 'المعلومات الشخصية' : 'Personal Information'}</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'border-[#142B52] text-[#142B52]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{isAr ? 'الاتصال والطوارئ' : 'Contact & Emergency'}</span>
            </button>

            <button
              onClick={() => setActiveTab('banking')}
              className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'banking'
                  ? 'border-[#142B52] text-[#142B52]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{isAr ? 'البيانات المصرفية ونظام WPS' : 'Banking & WPS Details'}</span>
              {profile.pendingBankChange && (
                <span className="w-2 h-2 rounded-full bg-amber-500" title="Change pending approval" />
              )}
            </button>
          </div>

          {/* TAB 1: Personal Info */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? 'سجلات العمل والبيانات الثبوتية الرسمية' : 'Official Employment & Identification Records'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'الاسم بالإنجليزية' : 'Full Name (English)'}</span>
                  <span className="font-semibold text-slate-900 text-sm">{profile.fullNameEn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'الاسم بالعربية' : 'الاسم الكامل (باللغة العربية)'}</span>
                  <span className="font-semibold text-slate-900 text-sm font-arabic">{profile.fullNameAr}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'الرقم الوظيفي (بطاقة المؤسسة)' : 'Employee ID (Establishment Badge)'}</span>
                  <span className="font-mono font-bold text-[#142B52]">{profile.employeeId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'المسمى الوظيفي' : 'Job Designation'}</span>
                  <span className="font-semibold text-slate-900">{isAr ? (profile.jobTitleAr || profile.jobTitleEn) : profile.jobTitleEn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'الإدارة المسند إليها' : 'Assigned Department'}</span>
                  <span className="font-semibold text-slate-900">{isAr ? (profile.departmentAr || profile.departmentEn) : profile.departmentEn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'الجهة المزوّدة المتعاقدة' : 'Contracting Supplier Entity'}</span>
                  <span className="font-semibold text-slate-900">{profile.supplierEn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</span>
                  <span className="font-semibold text-slate-900 font-mono">{profile.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'تاريخ بدء العقد' : 'Contractual Joining Date'}</span>
                  <span className="font-semibold text-slate-900 font-mono">{profile.joiningDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Contact Info */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? 'بيانات الاتصال ومقر الإقامة' : 'Contact & Residential Information'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'البريد الرسمي المعتمد' : 'Official Email'}</span>
                  <span className="font-semibold text-slate-900 font-mono">{profile.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'رقم الهاتف المسجل' : 'Registered Mobile Number'}</span>
                  <span className="font-semibold text-slate-900 font-mono" dir="ltr">{profile.mobile}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? 'عنوان الإقامة داخل دولة الإمارات' : 'UAE Residential Address'}</span>
                  <span className="font-semibold text-slate-900">{isAr ? 'برج مكاتب الدواء، الخليج التجاري، دبي، دولة الإمارات' : profile.residentialAddress}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-4 border-t border-slate-100">
                {isAr ? 'جهة الاتصال المعتمدة في حالات الطوارئ' : 'Designated Emergency Contact'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isAr ? 'اسم الشخص' : 'Contact Person'}</span>
                  <span className="font-bold text-slate-900">{profile.emergencyContact.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isAr ? 'صلة القرابة' : 'Relationship'}</span>
                  <span className="font-semibold text-slate-800">{isAr ? 'زوجة / أسرة' : profile.emergencyContact.relationship}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isAr ? 'هاتف الطوارئ' : 'Emergency Phone'}</span>
                  <span className="font-semibold text-slate-800 font-mono" dir="ltr">{profile.emergencyContact.phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Banking & WPS Details with Change Workflow */}
          {activeTab === 'banking' && (
            <div className="space-y-6">
              {/* Active Bank Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isAr ? 'حساب تحويل الراتب المعتمد عبر نظام حماية الأجور (WPS)' : 'WPS Disbursed Salary Bank Account'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr ? 'سجل محمي ومقنع لضمان خصوصية الموظف وفق قانون حماية البيانات الشخصية الإماراتي.' : 'Protected record. Masked to ensure employee privacy under UAE Personal Data Protection Law.'}
                    </p>
                  </div>

                  {!profile.pendingBankChange && (
                    <button
                      onClick={() => setShowBankForm(!showBankForm)}
                      className="px-4 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'طلب تحديث الحساب المصرفي' : 'Request Account Update'}</span>
                    </button>
                  )}
                </div>

                {/* Masked Bank Details Display */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-md max-w-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00B3AA] tracking-wider uppercase">
                      {isAr ? 'حساب تحويل الرواتب WPS' : 'UAE WPS SALARY ACCOUNT'}
                    </span>
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">{isAr ? 'المصرف / المؤسسة المالية' : 'Financial Institution'}</span>
                    <p className="text-base font-bold text-white">{profile.bankDetails.bankName}</p>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">{isAr ? 'رقم الآيبان (المقنّع)' : 'Masked IBAN'}</span>
                    <p className="font-mono text-lg font-black tracking-widest text-emerald-400" dir="ltr">
                      {profile.bankDetails.maskedIban}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{isAr ? 'المستفيد' : 'Beneficiary'}: {isAr ? profile.fullNameAr : profile.bankDetails.accountHolder}</span>
                    <span className="text-emerald-400 font-semibold">{isAr ? '✓ نشط ومعتمد' : '✓ Verified Active'}</span>
                  </div>
                </div>
              </div>

              {/* Pending Change Notice Callout if active */}
              {profile.pendingBankChange && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 text-xs text-amber-900">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm">
                        {isAr ? `طلب معلق لتحديث بيانات الحساب (${profile.pendingBankChange.requestId})` : `Pending Bank Detail Change Request (${profile.pendingBankChange.requestId})`}
                      </p>
                      <p className="text-amber-800 leading-relaxed">
                        {isAr ? (
                          <>قمت بتقديم طلب لتحويل صرف الراتب إلى مصرف <strong>{profile.pendingBankChange.proposedBank}</strong> (الآيبان: <span className="font-mono font-bold" dir="ltr">{profile.pendingBankChange.proposedIban}</span>).</>
                        ) : (
                          <>You submitted a request to transition your salary routing to <strong>{profile.pendingBankChange.proposedBank}</strong> (IBAN: <span className="font-mono font-bold">{profile.pendingBankChange.proposedIban}</span>).</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Detail Change Form */}
              {showBankForm && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-bold text-[#142B52]">
                      {isAr ? 'تقديم طلب تعديل الحساب المصرفي' : 'Request Bank Detail Update'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr ? 'إرسال التعديل يفعّل مسار التحقق لدى إدارة خدمات الموظفين بالمزوّد.' : 'Submitting updates triggers a verification workflow with Supplier Employee Services.'}
                    </p>
                  </div>

                  <form onSubmit={handleBankSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isAr ? 'اسم المصرف المقترح' : 'Proposed Bank Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={proposedBank}
                        onChange={(e) => setProposedBank(e.target.value)}
                        placeholder="e.g. Emirates NBD / Abu Dhabi Commercial Bank (ADCB)"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isAr ? 'رقم الآيبان الجديد (23 خانة تبدأ بـ AE)' : 'Proposed New IBAN (23 Characters starting with AE)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={proposedIban}
                        onChange={(e) => setProposedIban(e.target.value)}
                        placeholder="AE00 0000 0000 0000 0000 000"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isAr ? 'سبب التغيير' : 'Reason for Transition'}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={bankReason}
                        onChange={(e) => setBankReason(e.target.value)}
                        placeholder={isAr ? 'اذكر سبب تغيير الحساب المصرفي لتحويل الراتب...' : 'Provide reason for changing WPS salary disbursement account...'}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>

                    {bankError && (
                      <p className="text-rose-600 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{bankError}</span>
                      </p>
                    )}

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowBankForm(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00B3AA]" />
                        <span>{isAr ? 'إرسال للاعتماد من المزوّد' : 'Submit for Supplier Approval'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
