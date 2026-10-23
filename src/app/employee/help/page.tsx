'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import {
  HelpCircle,
  Phone,
  Mail,
  Clock,
  FileQuestion,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';

export default function HelpAndSupportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, t } = useI18n();
  const { currentUser } = useAppStore();
  const isAr = language === 'ar';

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = isAr
    ? [
        {
          q: 'كيف أقدم على إجازة سنوية أو مرضية؟',
          a: 'انتقل إلى قسم "الإجازات" من الشريط الجانبي. انقر على "تقديم طلب إجازة"، واختر فئة الإجازة والتواريخ والسبب، وأرفق التقرير الطبي في حال الإجازة المرضية. يتم توجيه الطلب تلقائياً إلى مديرك المباشر في مؤسسة الإمارات للدواء للاعتماد.',
        },
        {
          q: 'كم يستغرق إصدار شهادة الراتب أو شهادة استمرارية العمل؟',
          a: 'بموجب اتفاقية مستوى الخدمة RFP بند 3.7، يتم إصدار ومعالجة الشهادات الرسمية من قبل المورد خلال يومي عمل (48 ساعة). بمجرد صدورها، يمكنك معاينة وتنزيل ملف PDF المعتمد والمختوم مباشرة من تبويب "الشهادات".',
        },
        {
          q: 'كيف أقوم بتحديث حسابي المصرفي (IBAN) لصرف الرواتب؟',
          a: 'انتقل إلى "ملفي الشخصي"، واختر تبويب "البيانات المصرفية"، ثم انقر على "طلب تحديث الحساب البنكي". أدخل رقم الآيبان الإماراتي الجديد وأرفق شهادة الحساب أو الخطاب الرسمي من البنك. لضمان الأمان، يظل الآيبان النشط سارياً حتى يقوم مسؤول المورد بالتحقق من الإثبات واعتماده.',
        },
        {
          q: 'كيف أقدم مطالبة استرداد مالي لمصاريف العلاج في العيادات الخارجية؟',
          a: 'انتقل إلى "التأمين الصحي"، وانقر على "تقديم مطالبة استرداد مالي"، وأدخل تاريخ العلاج واسم العيادة ورقم الفاتورة والمبلغ بالدرهم. أرفق الفاتورة التفصيلية والوصفة الطبية. تتم مراجعة المطالبة من قبل المورد وتحويلها لشركة التأمين.',
        },
        {
          q: 'ماذا أفعل في حال اقتراب انتهاء تأشيرة الإقامة أو الهوية الإماراتية؟',
          a: 'يقوم النظام تلقائياً بإرسال تنبيهات استباقية قبل 30 يوماً من تاريخ انتهاء الصلاحية. في قسم "الوثائق"، يمكنك مراجعة الوثائق المنتهية وتحميل النسخ المجددة أو متابعة سير التجديد لدى فريق العلاقات العامة للمورد.',
        },
        {
          q: 'كيف يتم احتساب مكافأة نهاية الخدمة (EOSB)؟',
          a: 'وفقاً للمرسوم بقانون اتحادي رقم (33) لسنة 2021، تحتسب المكافأة على أساس أجر 21 يوماً أساسي عن كل سنة من السنوات الخمس الأولى، وأجر 30 يوماً أساسي عن كل سنة إضافية تليها. يمكنك استخدام الحاسبة التفاعلية تحت تبويب "المستحقات".',
        },
      ]
    : [
        {
          q: 'How do I apply for annual or sick leave?',
          a: 'Navigate to the "Leave" section from the left navigation. Click "Apply for Leave", select the leave category, choose your dates, enter the reason, and attach supporting medical documents if applying for sick leave. Your request is automatically routed to your EDE Line Manager for approval.',
        },
        {
          q: 'How long does it take to issue a Salary or Employment Certificate?',
          a: 'Under RFP Section 3.7 SLA requirements, official salary and employment certificates are processed and issued by the supplier within 2 working days (48 hours). Once issued, you can preview and download the stamped PDF directly from the "Certificates" tab.',
        },
        {
          q: 'How do I update my bank account (IBAN) for payroll?',
          a: 'Go to "My Profile", select the "Banking Details" tab, and click "Submit Bank Account Change Request". Enter your new UAE IBAN and upload an official bank letter or stamped certificate. For security compliance, your active IBAN remains unchanged until the supplier authorized officer verifies the proof.',
        },
        {
          q: 'How do I submit an outpatient medical reimbursement claim?',
          a: 'Access "Medical Insurance", click "Submit Reimbursement Claim", enter the treatment date, provider clinic, invoice number, and claimed amount in AED. Attach the itemized medical invoice and prescription. The claim will be reviewed by the supplier and forwarded to the insurer.',
        },
        {
          q: 'What should I do if my UAE Residence Visa or Emirates ID is expiring?',
          a: 'The system automatically triggers alerts 30 days prior to document expiration. In the "Documents" section, you can review expiring documents and upload renewed copies or follow up on ongoing supplier renewal processing.',
        },
        {
          q: 'How is End of Service Gratuity (EOSB) calculated?',
          a: 'In accordance with UAE Federal Decree-Law No. (33) of 2021, severance is calculated at 21 days basic salary for each of the first 5 years of service, and 30 days basic salary for each subsequent year. You can use the interactive gratuity calculator under "Entitlements".',
        },
      ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مركز المساعدة والدعم' : 'Help & Support Center'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'المساعدة والدعم' : 'Help & Support' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#142B52] to-[#2463A6] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold mb-3 border border-white/20">
                <HelpCircle className="w-3.5 h-3.5 text-teal-300" />
                <span>{isAr ? 'مركز مساعدة موظفي مؤسسة الإمارات للدواء' : 'EDE Employee Assistance Center'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {isAr ? 'مركز المساعدة والدعم' : 'Help & Support Center'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                {isAr
                  ? 'احصل على دعم فوري لسجلاتك الوظيفية، والرواتب، والمستحقات القانونية، والاستفسارات الفنية، وتذاكر الخدمة.'
                  : 'Get immediate assistance with your employment records, payroll, statutory benefits, technical inquiries, and service tickets.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/employee/service-requests/new"
                  className="px-4 py-2.5 rounded-xl bg-white text-[#142B52] hover:bg-slate-100 font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <LifeBuoy className="w-4 h-4 text-[#2463A6]" />
                  <span>{isAr ? 'تقديم تذكرة خدمة' : 'Submit Service Ticket'}</span>
                </Link>
                <Link
                  href="/employee/service-requests"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>{isAr ? 'عرض سجل التذاكر' : 'View Ticket History'}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2463A6] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'مكتب خدمات المورد' : 'Supplier Services Desk'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentUser.supplier || (isAr ? 'جهة توريد القوى العاملة' : 'Manpower Supplier Entity')}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono" dir="ltr">800-TAMIMI (826464)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">support@altamimi.ae</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008F88] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'خدمات دعم مؤسسة الإمارات للدواء' : 'EDE Support Services'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isAr ? 'مؤسسة الإمارات للدواء' : 'Emirates Drug Establishment'}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono" dir="ltr">+971 2 600 5000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">support@ede.gov.ae</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'ساعات العمل الرسمية' : 'Official Operating Hours'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isAr ? 'ساعات العمل الرسمية الاتحادية' : 'Federal UAE Working Hours'}
                </p>
              </div>
              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <p className="font-semibold text-slate-800">
                  {isAr ? 'الاثنين – الخميس: 7:30 ص – 3:30 م' : 'Mon – Thu: 7:30 AM – 3:30 PM'}
                </p>
                <p className="font-semibold text-slate-800">
                  {isAr ? 'الجمعة: 7:30 ص – 12:00 م' : 'Friday: 7:30 AM – 12:00 PM'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isAr ? 'خطوط الطوارئ متوفرة على مدار الساعة 24/7' : 'Emergency lines available 24/7'}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <FileQuestion className="w-5 h-5 text-[#2463A6]" />
              <h2 className="text-base font-bold text-slate-900">
                {isAr ? 'الأسئلة الشائعة (FAQs)' : 'Frequently Asked Questions (FAQs)'}
              </h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/70 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left rtl:text-right p-4 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
