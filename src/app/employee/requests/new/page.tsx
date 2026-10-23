'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ServiceTicket } from '@/lib/types';
import {
  LifeBuoy,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Upload,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function NewServiceRequestPage() {
  const router = useRouter();
  const { submitServiceTicket } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState<ServiceTicket['category']>('General HR Inquiry');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ServiceTicket['priority']>('Medium');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError(isAr ? 'يرجى إدخال الموضوع والوصف التفصيلي.' : 'Please provide both subject and detailed description.');
      return;
    }

    setIsSubmitting(true);
    submitServiceTicket({
      category,
      subject: subject.trim(),
      description: description.trim(),
      priority,
    });

    setIsSubmitting(false);
    router.push('/employee/requests');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تقديم طلب خدمة أو استفسار' : 'Submit Service Request or Inquiry'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'طلبات الخدمة' : 'Requests', href: '/employee/requests' },
            { label: isAr ? 'طلب جديد' : 'New' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <Link
            href="/employee/requests"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? 'العودة إلى قائمة الدعم' : 'Back to Support Queue'}</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-[#142B52]">
                {isAr ? 'تسجيل استفسار دعم جديد أو شكوى رسمية' : 'Log New Support Inquiry or Formal Complaint'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'يتم تعيين التذاكر لمسؤول خدمات الموظفين لدى المورد مع الالتزام باتفاقية الرد الأولي خلال 24 ساعة عمل.'
                  : 'Tickets are assigned to the responsible Supplier Employee Services Officer with 24-working-hour first response SLA.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'فئة الاستفسار' : 'Inquiry Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                  >
                    <option value="General HR Inquiry">{isAr ? 'استفسار عام بالموارد البشرية' : 'General HR Inquiry'}</option>
                    <option value="Payroll Inquiry">{isAr ? 'استفسار الرواتب ونظام حماية الأجور (WPS)' : 'Payroll & WPS Inquiry'}</option>
                    <option value="Benefits Inquiry">{isAr ? 'استفسار المزايا والبدلات' : 'Benefits & Allowances Inquiry'}</option>
                    <option value="Document Request">{isAr ? 'دعم الوثائق والتأشيرات' : 'Document & Visa Support'}</option>
                    <option value="Insurance Support">{isAr ? 'دعم التأمين الصحي' : 'Medical Insurance Support'}</option>
                    <option value="Attendance Inquiry">{isAr ? 'استفسار الحضور والبصمة' : 'Attendance & Biometrics Inquiry'}</option>
                    <option value="Formal Complaint">{isAr ? 'شكوى رسمية' : 'Formal Complaint'}</option>
                    <option value="Other">{isAr ? 'استفسار تشغيلي آخر' : 'Other Operational Inquiry'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'مستوى الأولوية' : 'Priority Level'}
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                  >
                    <option value="Low">{isAr ? 'منخفض - استفسار عادي' : 'Low - Standard inquiry'}</option>
                    <option value="Medium">{isAr ? 'متوسط - دعم معتاد' : 'Medium - Regular support'}</option>
                    <option value="High">{isAr ? 'مرتفع - يتطلب إجراء عاجلاً' : 'High - Timely action required'}</option>
                    <option value="Urgent">{isAr ? 'طارئ - معوق تشغيلي عاجل' : 'Urgent - Urgent operational blocker'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  {isAr ? 'ملخص الموضوع' : 'Subject Summary'}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isAr ? 'مثال: عدم تطابق ساعات العمل الإضافي المسجلة لعطلة نهاية الأسبوع' : 'e.g. Inconsistency in overtime recorded for weekend deployment'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  {isAr ? 'الوصف التفصيلي' : 'Detailed Description'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isAr ? 'يرجى تقديم التفاصيل الكاملة والتواريخ وسياق الطلب...' : 'Please provide full details, dates, and background context...'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              {error && (
                <p className="text-rose-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </p>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <Link
                  href="/employee/requests"
                  className="px-4 py-2 border rounded-xl font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00B3AA]" />
                  <span>
                    {isSubmitting
                      ? (isAr ? 'جارٍ إنشاء التذكرة...' : 'Creating Ticket...')
                      : (isAr ? 'إرسال تذكرة الدعم' : 'Submit Support Ticket')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
