'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Building2, Users2, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

export default function EstablishmentDepartmentsPage() {
  const { employees } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const departments = [
    {
      nameEn: 'Drug Registration & Licensing',
      nameAr: 'إدارة تسجيل الأدوية والتراخيص',
      headEn: 'Dr. Mariam Al Suwaidi',
      headAr: 'د. مريم السويدي',
      mandateEn: 'Evaluation of chemical dossiers, marketing authorizations, and batch release protocols.',
      mandateAr: 'تقييم ملفات الأدوية الكيميائية، تراخيص التسويق، وبروتوكولات الإفراج عن التشغيلات.',
    },
    {
      nameEn: 'Pharmacovigilance & Drug Safety',
      nameAr: 'إدارة التيقظ الدوائي وسلامة الدواء',
      headEn: 'Dr. Tariq Al Zaabi',
      headAr: 'د. طارق الزعابي',
      mandateEn: 'Post-market surveillance, adverse drug reaction monitoring, and international alert integration.',
      mandateAr: 'الرقابة الدوائية بعد التسويق، ورصد الآثار الجانبية للأدوية، والربط مع شبكات الإنذار الدولية.',
    },
    {
      nameEn: 'Medical Devices Inspection',
      nameAr: 'إدارة التفتيش على الأجهزة الطبية',
      headEn: 'Eng. Khalid Al Mazrouei',
      headAr: 'م. خالد المزروعي',
      mandateEn: 'Conformity assessments, CE/FDA equivalent certification audits, and port-of-entry inspections.',
      mandateAr: 'تقييم المطابقة الفنية، وتدقيق شهادات CE/FDA المعتمدة، والتفتيش في المنافذ الحدودية.',
    },
    {
      nameEn: 'Central Quality Control Laboratories',
      nameAr: 'مختبرات الرقابة وضبط الجودة المركزية',
      headEn: 'Dr. Elena Rostova',
      headAr: 'د. إيلينا روستوفا',
      mandateEn: 'High-precision HPLC, mass spectrometry, microbiological assay, and drug stability testing.',
      mandateAr: 'تحاليل HPLC عالية الدقة، وقياس طيف الكتلة، والفحوصات الميكروبيولوجية، واختبارات الثباتية.',
    },
    {
      nameEn: 'Clinical Trials & Bioequivalence',
      nameAr: 'إدارة الدراسات السريرية والتكافؤ الحيوي',
      headEn: 'Dr. Faisal Al Hammadi',
      headAr: 'د. فيصل الحمادي',
      mandateEn: 'GCP compliance audits, bioequivalence protocol reviews, and investigator site inspections.',
      mandateAr: 'تدقيق ممارسات التجارب السريرية الجيدة (GCP)، ومراجعة دراسات التكافؤ الحيوي، والتفتيش الميداني.',
    },
    {
      nameEn: 'Health Tech & Regulatory IT',
      nameAr: 'إدارة تقنية المعلومات والتنظيم الرقمي',
      headEn: 'Eng. Mona Al Shamsi',
      headAr: 'م. منى الشامسي',
      mandateEn: 'Track & trace serialization (Tatmeen integration), electronic submissions, and portal maintenance.',
      mandateAr: 'التتبع والتسلسل الدوائي (تكامل نظام تطمين)، والبوابة الإلكترونية لتقديم المعاملات.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'التوزيع الإداري لكوادر المنشأة' : 'Establishment Departmental Distribution'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/establishment/dashboard' },
            { label: isAr ? 'الإدارات التخصصية' : 'Departments' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'الإدارات الفنية والعلمية والتنظيمية لمؤسسة الإمارات للدواء' : 'EDE Technical & Scientific Regulatory Directorates'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'توزيع الكوادر الخارجية المؤجرة عبر القطاعات التشغيلية لمؤسسة الإمارات للدواء.'
                : 'Departmental distribution of outsourced personnel across Emirates Drug Establishment operational divisions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => {
              const staff = employees.filter((e) => e.departmentEn === dept.nameEn);
              const tamimiCount = staff.filter((s) => s.supplierEn.includes('Tamimi')).length;
              const apexCount = staff.filter((s) => s.supplierEn.includes('Apex')).length;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#142B52] flex items-center justify-center font-bold text-xs font-mono">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {isAr ? `${staff.length} متخصصاً` : `${staff.length} Specialists`}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {isAr ? dept.nameAr : dept.nameEn}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isAr ? dept.nameEn : dept.nameAr}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isAr ? dept.mandateAr : dept.mandateEn}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{isAr ? 'رئيس الإدارة بالمنشأة:' : 'Establishment Line Head:'}</span>
                      <span className="font-bold text-slate-800">{isAr ? dept.headAr : dept.headEn}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between text-[11px]">
                      <span>{isAr ? 'التميمي:' : 'Al Tamimi:'} <strong className="text-slate-900">{tamimiCount}</strong></span>
                      <span>{isAr ? 'أبكس:' : 'Apex Solutions:'} <strong className="text-slate-900">{apexCount}</strong></span>
                    </div>

                    <Link
                      href={`/establishment/workforce?dept=${encodeURIComponent(dept.nameEn)}`}
                      className="block text-center w-full py-2 bg-slate-100 hover:bg-[#142B52] hover:text-white text-slate-700 font-semibold text-xs rounded-xl transition-colors mt-2 cursor-pointer"
                    >
                      {isAr ? 'عرض الكوادر والأخصائيين' : 'View Assigned Specialists'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
