'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  User,
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  ShieldCheck,
  Clock,
  Briefcase,
  FileText,
} from 'lucide-react';

function TeamMemberDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { employees, attendanceRecords, leaveRequests } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const employee =
    employees.find((e) => e.id === id || e.employeeId === id) || employees[0];

  const employeeAttendance = attendanceRecords.slice(0, 5);
  const employeeLeaves = leaveRequests.filter((l) => l.employeeId === employee.employeeId);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/manager/team"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isAr ? (employee.fullNameAr || employee.fullNameEn) : employee.fullNameEn}
                </h1>
                <StatusBadge status={employee.employmentStatus.toLowerCase().replace(/\s+/g, '_') as any} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? `${employee.jobTitleAr || employee.jobTitleEn} • ${employee.departmentAr || employee.departmentEn}`
                  : `${employee.jobTitleEn} • ${employee.departmentEn}`}
              </p>
            </div>
          </div>

          {/* Dossier Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
                </span>
                <span className="font-mono font-bold text-[#2463A6] mt-0.5 block">{employee.employeeId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'الجنسية' : 'Nationality'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.nationality}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'شركة التزويد المتعاقدة' : 'Contractor / Supplier'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {isAr ? (employee.supplierAr || employee.supplierEn) : employee.supplierEn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {isAr ? 'تاريخ الالتحاق' : 'Joining Date'}
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.joiningDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  {isAr ? 'بيانات الاتصال والتواصل' : 'Contact Information'}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span dir="ltr">{employee.mobile}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  {isAr ? 'الملخص التشغيلي والإجازات' : 'Leave & Operational Overview'}
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {isAr ? 'إجمالي طلبات الإجازات:' : 'Total Leave Requests:'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {isAr ? `${employeeLeaves.length} طلبات` : `${employeeLeaves.length} applications`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {isAr ? 'الحالة الحالية:' : 'Current Status:'}
                  </span>
                  <span className="font-bold text-emerald-700">
                    {isAr ? (employee.employmentStatus === 'Active' ? 'نشط' : employee.employmentStatus) : employee.employmentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendance Logs */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr
                ? 'سجلات الحضور والانصراف الأخيرة (المطابقة للبوابات الإلكترونية)'
                : 'Recent Attendance Records (Turnstile Normalized)'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-3 px-3">{isAr ? 'تسجيل الدخول' : 'Punch In'}</th>
                    <th className="py-3 px-3">{isAr ? 'تسجيل الخروج' : 'Punch Out'}</th>
                    <th className="py-3 px-3">{isAr ? 'ساعات العمل' : 'Working Hours'}</th>
                    <th className="py-3 px-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employeeAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{rec.date}</td>
                      <td className="py-2.5 px-3">{rec.checkIn || '—'}</td>
                      <td className="py-2.5 px-3">{rec.checkOut || '—'}</td>
                      <td className="py-2.5 px-3">{rec.workingHours ? (isAr ? `${rec.workingHours} ساعة` : `${rec.workingHours} hrs`) : '—'}</td>
                      <td className="py-2.5 px-3 text-center">
                        <StatusBadge
                          status={rec.status === 'present' ? 'approved' : rec.status === 'late' ? 'pending' : 'rejected'}
                          label={
                            isAr
                              ? rec.status === 'present'
                                ? 'حضور'
                                : rec.status === 'late'
                                ? 'متأخر'
                                : 'غياب'
                              : rec.status
                          }
                        />
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

export default function TeamMemberDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TeamMemberDetailContent />
    </Suspense>
  );
}
