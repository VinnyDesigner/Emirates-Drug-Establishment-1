'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import {
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Calendar,
  CreditCard,
  FileCheck2,
  Save,
  ShieldCheck,
} from 'lucide-react';

export default function SupplierEmployeeOnboardingPage() {
  const router = useRouter();
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { currentUser } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states
  const [fullNameEn, setFullNameEn] = useState('');
  const [fullNameAr, setFullNameAr] = useState('');
  const [nationality, setNationality] = useState('United Arab Emirates');
  const [dob, setDob] = useState('1992-05-14');
  const [department, setDepartment] = useState('Drug Registration & Licensing');
  const [jobTitle, setJobTitle] = useState('Regulatory Affairs Specialist');
  const [joiningDate, setJoiningDate] = useState('2026-11-01');
  const [mobile, setMobile] = useState('+971 50 123 4567');
  const [email, setEmail] = useState('');
  const [bankName, setBankName] = useState('First Abu Dhabi Bank (FAB)');
  const [iban, setIban] = useState('AE030330000000000000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
    setTimeout(() => {
      router.push('/supplier/employees');
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/supplier/employees"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'تعيين وتسجيل كادر خارجي جديد' : 'New Outsourced Personnel Onboarding'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? `تسجيل الكادر المرشح والمعتمد ضمن قوة العمل بالمؤسسة تحت شركة ${currentUser.supplier}.`
                  : `Onboard approved candidate into EDE roster under ${currentUser.supplier}.`}
              </p>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
            <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-[#2463A6]' : 'text-slate-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-[#142B52] text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <span>{isAr ? 'البيانات الشخصية' : 'Personal Details'}</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-[#2463A6]' : 'text-slate-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-[#142B52] text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <span>{isAr ? 'التوزيع والوظيفة' : 'Deployment & Position'}</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-2 font-bold ${step >= 3 ? 'text-[#2463A6]' : 'text-slate-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-[#142B52] text-white' : 'bg-slate-200 text-slate-600'}`}>3</div>
              <span>{isAr ? 'الحساب المصرفي (حماية الأجور)' : 'WPS Banking Setup'}</span>
            </div>
          </div>

          {isCompleted ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم تسجيل الموظف بنجاح' : 'Personnel Onboarded Successfully'}
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isAr
                  ? 'تم إنشاء ملف الموظف برقم EDE-EMP-1058، وجدولة مهام إرفاق الوثائق الثبوتية لفريق العلاقات العامة (PRO). جارٍ التحويل للسجل...'
                  : 'Employee record created with ID EDE-EMP-1058. Statutory document upload tasks scheduled for PRO team. Redirecting to registry...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                    {isAr ? 'الخطوة 1: البيانات الشخصية والتعريفية' : 'Step 1: Personal & Identification Information'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'الاسم بالكامل (بالإنجليزية)' : 'Full Name (English)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullNameEn}
                        onChange={(e) => setFullNameEn(e.target.value)}
                        placeholder="e.g. Dr. Hisham Al Zaabi"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'الاسم بالكامل (بالعربية)' : 'Full Name (Arabic)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullNameAr}
                        onChange={(e) => setFullNameAr(e.target.value)}
                        placeholder="د. هشام الزعابي"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'الجنسية' : 'Nationality'}
                      </label>
                      <input
                        type="text"
                        required
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
                      </label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all"
                    >
                      {isAr ? 'التالي: الوظيفة والإدارة ←' : 'Next: Position & Department →'}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                    {isAr ? 'الخطوة 2: التخصيص الإداري والوظيفة' : 'Step 2: Department Allocation & Role'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'الإدارة المسند إليها بالمؤسسة' : 'EDE Department Assignment'}
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                      >
                        <option value="Drug Registration & Licensing">{isAr ? 'إدارة التسجيل والترخيص الدوائي' : 'Drug Registration & Licensing'}</option>
                        <option value="Pharmacovigilance & Drug Safety">{isAr ? 'إدارة اليقظة الدوائية وسلامة الدواء' : 'Pharmacovigilance & Drug Safety'}</option>
                        <option value="Clinical Trials & Research">{isAr ? 'إدارة الدراسات السريرية والبحوث' : 'Clinical Trials & Research'}</option>
                        <option value="Medical Devices & IVDs">{isAr ? 'إدارة المستلزمات الطبية والأجهزة التشخيصية' : 'Medical Devices & IVDs'}</option>
                        <option value="Good Practice Inspection (GxP)">{isAr ? 'إدارة الرقابة والتفتيش على ممارسات التصنيع (GxP)' : 'Good Practice Inspection (GxP)'}</option>
                        <option value="Supply Chain & Strategic Drug Stockpile">{isAr ? 'إدارة سلاسل الإمداد والمخزون الدوائي الاستراتيجي' : 'Supply Chain & Strategic Drug Stockpile'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'المسمى الوظيفي التعاقدي' : 'Contractual Designation'}
                      </label>
                      <input
                        type="text"
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'تاريخ المباشرة المستهدف' : 'Target Start Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'رقم الهاتف المتحرك (الإمارات)' : 'Primary Mobile (UAE)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {isAr ? '→ السابق' : '← Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all"
                    >
                      {isAr ? 'التالي: الحساب المصرفي ←' : 'Next: Banking Details →'}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                    {isAr ? 'الخطوة 3: إعداد حساب الراتب (نظام حماية الأجور)' : 'Step 3: WPS Salary Account Setup'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'اسم البنك' : 'Bank Name'}
                      </label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6]"
                      >
                        <option value="First Abu Dhabi Bank (FAB)">{isAr ? 'بنك أبوظبي الأول (FAB)' : 'First Abu Dhabi Bank (FAB)'}</option>
                        <option value="Abu Dhabi Commercial Bank (ADCB)">{isAr ? 'بنك أبوظبي التجاري (ADCB)' : 'Abu Dhabi Commercial Bank (ADCB)'}</option>
                        <option value="Emirates NBD">{isAr ? 'بنك الإمارات دبي الوطني (Emirates NBD)' : 'Emirates NBD'}</option>
                        <option value="Dubai Islamic Bank (DIB)">{isAr ? 'بنك دبي الإسلامي (DIB)' : 'Dubai Islamic Bank (DIB)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'رقم الحساب المصرفي الدولي (IBAN)' : 'IBAN Account Number'}
                      </label>
                      <input
                        type="text"
                        required
                        value={iban}
                        onChange={(e) => setIban(e.target.value.toUpperCase())}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-[#2463A6]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {isAr ? '→ السابق' : '← Back'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isAr ? 'إتمام التسجيل والتوزيع الميداني' : 'Complete Onboarding & Deploy'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
