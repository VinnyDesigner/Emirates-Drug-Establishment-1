'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import {
  FileSignature,
  ArrowLeft,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function NewCertificateRequestPage() {
  const router = useRouter();
  const { submitCertificateRequest } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [type, setType] = useState<'salary' | 'employment'>('salary');
  const [certLanguage, setCertLanguage] = useState<'en' | 'ar' | 'both'>('both');
  const [purpose, setPurpose] = useState('');
  const [addressedTo, setAddressedTo] = useState(isAr ? 'بنك أبوظبي التجاري (ADCB)' : 'Abu Dhabi Commercial Bank (ADCB)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCertificateRequest({
      certificateType: type,
      language: certLanguage,
      purpose,
      addressedTo,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/employee/certificates');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'طلب شهادة رسمية جديدة' : 'Request Official Certificate'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الشهادات' : 'Certificates', href: '/employee/certificates' },
            { label: isAr ? 'طلب جديد' : 'New Request' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/employee/certificates"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'طلب إصدار شهادة رسمية إلكترونية' : 'Request Official Certificate'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'تصدر بتوقيع رقمي معتمد وختم المورد مع رمز استجابة سريعة (QR) للتحقق خلال يومي عمل.'
                  : 'Issued with official supplier digital signature and QR verification code (2 Working Days SLA).'}
              </p>
            </div>
          </div>

          {/* 2-Day SLA Banner */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <Clock className="w-5 h-5 text-[#2463A6] shrink-0" />
            <div className="text-xs text-sky-900">
              <span className="font-bold">
                {isAr ? 'التزام اتفاقية مستوى الخدمة التعاقدية (RFP بند 3.7): ' : 'Contractual SLA Commitment: '}
              </span>
              <span>
                {isAr
                  ? 'وفقاً لمؤشر الأداء رقم 4، يتم التحقق من الشهادات الإلكترونية وإصدارها خلال يومي عمل (48 ساعة).'
                  : 'In accordance with EDE RFP Section 3.7 (Indicator 4), electronic certificates are verified and issued within two (2) working days of submission.'}
              </span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم تقديم طلب الشهادة بنجاح' : 'Certificate Request Submitted'}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isAr
                  ? 'تم إرسال طلبك إلى قائمة انتظار خدمات الموظفين لدى المورد. جارٍ توجيهك إلى أرشيف الشهادات...'
                  : 'Your request has been placed in the Supplier Employee Services queue. Redirecting to your certificate archive...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'نوع الشهادة المطلوبة' : 'Certificate Type'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('salary')}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left rtl:text-right transition-all cursor-pointer ${
                      type === 'salary'
                        ? 'border-[#2463A6] bg-blue-50/60 text-[#142B52] shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileSignature className="w-4 h-4 mb-1 text-[#2463A6]" />
                    <span>{isAr ? 'شهادة راتب ومستحقات' : 'Salary Certificate'}</span>
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                      {isAr
                        ? 'تتضمن تفاصيل الراتب الأساسي والبدلات وبيانات التحويل المصرفي بنظام حماية الأجور.'
                        : 'Contains salary breakdown, allowances, and bank transfer routing.'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('employment')}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left rtl:text-right transition-all cursor-pointer ${
                      type === 'employment'
                        ? 'border-[#2463A6] bg-blue-50/60 text-[#142B52] shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-4 h-4 mb-1 text-[#008F88]" />
                    <span>{isAr ? 'شهادة استمرارية عمل' : 'Employment Certificate'}</span>
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                      {isAr
                        ? 'تؤكد المسمى الوظيفي والقسم وتاريخ مباشرة العمل ونوع العقد الساري.'
                        : 'Confirms job title, department, joining date, and contract status.'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'لغة صياغة الشهادة' : 'Language Format'}
                </label>
                <select
                  value={certLanguage}
                  onChange={(e) => setCertLanguage(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                >
                  <option value="both">{isAr ? 'ثنائية اللغة (عربي وإنجليزي) — موصى به' : 'Bilingual (English & Arabic) — Recommended'}</option>
                  <option value="en">{isAr ? 'اللغة الإنجليزية فقط' : 'English Only'}</option>
                  <option value="ar">{isAr ? 'اللغة العربية فقط' : 'Arabic Only'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'الجهة الموجه إليها الخطاب' : 'Addressed Entity / Bank'}
                </label>
                <input
                  type="text"
                  required
                  value={addressedTo}
                  onChange={(e) => setAddressedTo(e.target.value)}
                  placeholder={isAr ? 'مثال: بنك أبوظبي التجاري، بنك دبي الإسلامي، السفارة، إلخ' : 'e.g. Abu Dhabi Commercial Bank, Dubai Islamic Bank, Embassy'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'الغرض من إصدار الشهادة' : 'Purpose / Intended Use'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder={isAr ? 'مثال: تقديم طلب تمويل شخصي، كفالة تأشيرة إقامة، معاملة قرض عقاري' : 'e.g. Auto loan application, visa sponsorship, mortgage verification'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/employee/certificates"
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {isAr ? 'إرسال طلب الشهادة' : 'Submit Certificate Request'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
