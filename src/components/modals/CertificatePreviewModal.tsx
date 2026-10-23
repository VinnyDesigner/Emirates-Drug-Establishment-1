'use client';

import React from 'react';
import { CertificateRequest } from '@/lib/types';
import { X, Printer, Building2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface CertificatePreviewModalProps {
  certificate: CertificateRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificatePreviewModal({
  certificate,
  isOpen,
  onClose,
}: CertificatePreviewModalProps) {
  const { language } = useI18n();
  const isAr = language === 'ar';

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const isSalary = certificate.certificateType === 'salary';
  const isBilingualOrAr = certificate.language === 'both' || isAr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Modal Controls */}
        <div className="no-print px-6 py-4.5 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/10 text-[#00B3AA]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block">
                {isAr
                  ? (isSalary ? 'شهادة الراتب الرسمية' : 'شهادة استمرار عمل رسمية')
                  : `Official ${isSalary ? 'Salary' : 'Employment'} Certificate`}
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                {certificate.requestId} &bull; {isAr ? 'موقعة ومختومة إلكترونياً' : 'Digitally Signed'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#00B3AA] to-[#008F88] hover:from-[#008F88] hover:to-[#00736D] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة المستند الرسمي PDF' : 'Print Official PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Document */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-slate-800 text-xs bg-white">
          {/* Official Letterhead */}
          <div className="border-b-2 border-[#142B52] pb-6 flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-black text-[#142B52] uppercase tracking-wider">
                {isAr ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
              </h2>
              <p className="text-xs text-slate-600 font-semibold">مؤسسة الإمارات للدواء — الخدمات المشتركة</p>
              <p className="text-[10px] text-slate-400">
                {isAr ? 'الهيئة الاتحادية لتنظيم المنتجات الطبية والرعاية الصحية' : 'Federal Authority for Healthcare Products Regulation'}
              </p>
            </div>
            <div className="text-right rtl:text-left space-y-1">
              <p className="text-[11px] font-bold text-slate-700">
                {isAr ? 'المرجع:' : 'Ref:'} {certificate.requestId}
              </p>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'التاريخ:' : 'Date:'} {new Date().toLocaleDateString(isAr ? 'ar-AE' : 'en-GB')}
              </p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                {isAr ? '✓ معتمد ومختوم إلكترونياً' : '✓ Digitally Signed & Stamped'}
              </p>
            </div>
          </div>

          {/* Addressed To */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-800">
              {isAr ? 'إلى الجهة المعنية:' : 'TO:'} {certificate.addressedTo || (isAr ? 'إلى من يهمه الأمر' : 'To Whom It May Concern')}
            </p>
          </div>

          {/* Title */}
          <div className="text-center py-2 border-y border-slate-200">
            <h3 className="text-sm font-black text-[#142B52] uppercase tracking-widest">
              {isSalary ? 'CERTIFICATE OF EMPLOYMENT AND SALARY DETAILS' : 'CERTIFICATE OF EMPLOYMENT'}
            </h3>
            <p className="text-xs font-bold text-slate-600 font-arabic mt-0.5">
              {isSalary ? 'شهادة إثبات عمل وتفاصيل الراتب الشهري' : 'شهادة لمن يهمه الأمر - إثبات استمرار عمل'}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-xs leading-relaxed text-slate-700">
            <p>
              {isAr
                ? <>تشهد مؤسسة الإمارات للدواء بأن السيد / <strong>أحمد المنصوري</strong> (الرقم الوظيفي: <strong className="font-mono" dir="ltr">EDE-EMP-1042</strong>) يعمل حالياً لدى المؤسسة ككادر خارجي متعاقد بموجب اتفاقية التعهيد المبرمة مع <strong>شركة التميمي لخدمات التعهيد والقوى العاملة</strong>.</>
                : <>This is to formally certify that <strong>Mr. Ahmed Al Mansoori</strong> (Employee ID: <strong>EDE-EMP-1042</strong>) is currently engaged as an outsourced personnel at the Emirates Drug Establishment under the contractual manpower framework with <strong>Al Tamimi Manpower Services</strong>.</>}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'المسمى الوظيفي' : 'Designation'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? 'أخصائي أول شؤون تنظيمية وترخيص' : 'Senior Regulatory Affairs Specialist'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'الإدارة' : 'Department'}
                </span>
                <span className="font-semibold text-slate-900">
                  {isAr ? 'تسجيل وترخيص الأدوية' : 'Drug Registration & Licensing'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'تاريخ التعيين' : 'Date of Joining'}
                </span>
                <span className="font-semibold text-slate-900">10 January 2023</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'حالة التوظيف' : 'Employment Status'}
                </span>
                <span className="font-semibold text-emerald-700">
                  {isAr ? 'على رأس العمل وبسجل منتظم' : 'Active & In Good Standing'}
                </span>
              </div>
            </div>

            {isSalary && (
              <div className="space-y-2">
                <p className="font-bold text-slate-800">
                  {isAr ? 'جدول مفردات الراتب والمستحقات الشهرية (درهم إماراتي):' : 'Monthly Compensation Schedule (AED):'}
                </p>
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      {isAr ? 'الراتب الأساسي' : 'Basic Salary'}
                    </span>
                    <span className="font-bold text-slate-900">22,000 {isAr ? 'د.إ' : 'AED'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      {isAr ? 'البدلات الثابتة' : 'Fixed Allowances'}
                    </span>
                    <span className="font-bold text-slate-900">15,500 {isAr ? 'د.إ' : 'AED'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      {isAr ? 'إجمالي الراتب الشهري' : 'Gross Monthly'}
                    </span>
                    <span className="font-bold text-emerald-700">37,500 {isAr ? 'د.إ' : 'AED'}</span>
                  </div>
                </div>
              </div>
            )}

            <p>
              {isAr
                ? <>أعطيت هذه الشهادة بناءً على طلب الموظف لاستخدامها في <strong>{certificate.purpose}</strong> دون أدنى مسؤولية مالية أو التزام كفالة على عاتق مؤسسة الإمارات للدواء.</>
                : <>This official certificate is issued upon the employee&apos;s request for <strong>{certificate.purpose}</strong> without any financial liability or third-party guarantee on the part of the Emirates Drug Establishment.</>}
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 grid grid-cols-2 gap-8 items-end">
            <div className="space-y-3">
              <div className="w-20 h-20 border-2 border-dashed border-[#142B52]/40 rounded-full flex items-center justify-center text-center p-2 text-[9px] text-[#142B52] font-black uppercase rotate-6">
                EDE HRMS OFFICIAL ELECTRONIC SEAL
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {isAr ? 'رمز التحقق: EDE-VALID-9901-2026' : 'Verification Hash: EDE-VALID-9901-2026'}
              </p>
            </div>

            <div className="text-right rtl:text-left space-y-1">
              <div className="h-10 border-b border-slate-300 w-44 ml-auto rtl:ml-0 rtl:mr-auto" />
              <p className="font-bold text-slate-900">
                {isAr ? 'مدير إدارة رأس المال البشري' : 'Director of Human Capital'}
              </p>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
