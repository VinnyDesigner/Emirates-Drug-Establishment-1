'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/export-utils';
import {
  FolderArchive,
  Download,
  FileCode,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Building2,
  HardDrive,
} from 'lucide-react';

export default function SupplierDataHandoverPage() {
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { employees, leaveRequests, attendanceRecords, documents, payslips } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  const handleExportJSON = () => {
    const fullDataset = {
      establishment: 'Emirates Drug Establishment (EDE)',
      exportTimestamp: new Date().toISOString(),
      governingStandard: 'UAE Federal Law No. 45/2021 & RFP Section 3.5.3',
      contractor: 'Al Tamimi Manpower Services LLC',
      employees,
      leaveRequests,
      attendanceRecords,
      documents,
      payslips,
    };
    const blob = new Blob([JSON.stringify(fullDataset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EDE_Contract_End_Structured_Handover_Archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadMsg('Complete structured JSON handover archive exported successfully!');
    setTimeout(() => setDownloadMsg(''), 4000);
  };

  const handleExportMasterCSV = () => {
    exportToCSV(
      employees.map((e) => ({
        Employee_ID: e.employeeId,
        Full_Name_EN: e.fullNameEn,
        Full_Name_AR: e.fullNameAr,
        Department: e.departmentEn,
        Job_Title: e.jobTitleEn,
        Nationality: e.nationality,
        Joining_Date: e.joiningDate,
        Status: e.employmentStatus,
        Bank_Name: e.bankDetails.bankName,
        IBAN: e.bankDetails.fullIbanForSupplierView || e.bankDetails.maskedIban,
        Email: e.email,
        Mobile: e.mobile,
      })),
      'EDE-Master-Workforce-Handover-Export'
    );
    setDownloadMsg('Master workforce CSV archive generated!');
    setTimeout(() => setDownloadMsg(''), 4000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {isAr
                    ? 'سيادة البيانات وتسليم السجلات عند نهاية العقد (الملحق ب.18)'
                    : 'CONTRACT-END DATA SOVEREIGNTY & HANDOVER (ANNEX B.18)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'حزم تسليم البيانات الإلكترونية المهيكلة' : 'Structured Electronic Data Handover Packages'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'تصدير شامل وقابل للنقل لسجلات الموظفين وأرشيف الإجازات وسجلات البصمة والرواتب دون أي احتكار تقني.'
                  : 'Full portable export of employee master records, leave archives, biometric punch logs, and payroll records without vendor lock-in.'}
              </p>
            </div>
          </div>

          {downloadMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadMsg}</span>
            </div>
          )}

          {/* Handover Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isAr ? 'حزمة التسليم الشاملة بصيغة JSON المترابطة' : 'Comprehensive Relational JSON Handover'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr
                    ? 'تصدير كافة النماذج والعلاقات وأحداث التدقيق وسجلات الحضور والإجازات بتنسيق UTF-8 القياسي المتوافق مع أنظمة الموارد البشرية المستقبلية للمؤسسة.'
                    : 'Exports all schema models, relation keys, timestamped audit events, biometric punches, and leave history in standardized UTF-8 JSON format for automated ingestion into future EDE HRMS.'}
                </p>
              </div>
              <button
                onClick={handleExportJSON}
                className="w-full py-2.5 px-4 bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الأرشيف المهيكل بصيغة JSON' : 'Download Portable JSON Archive'}</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isAr ? 'الأرشيف الرئيسي للكوادر بصيغة جداول CSV' : 'Master Workforce CSV Archive'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr
                    ? 'جدول تفصيلي ثنائي اللغة للكوادر مع أرقام الآيبان غير المحجوبة، وأرقام الهوية، والتوزيع الإداري، وفترات التعاقد بترميز UTF-8 BOM متوافق مع Excel.'
                    : 'Complete bilingual personnel table with unmasked IBAN records, national identity numbers, department allocations, and contract dates with UTF-8 BOM encoding for Microsoft Excel.'}
                </p>
              </div>
              <button
                onClick={handleExportMasterCSV}
                className="w-full py-2.5 px-4 bg-[#008F88] hover:bg-[#007670] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل جدول الكوادر الرئيسي بصيغة CSV' : 'Download Master CSV Spreadsheet'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
