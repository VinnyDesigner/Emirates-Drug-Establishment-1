'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Save,
  CheckCircle2,
} from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, requestBankDetailChange } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [mobile, setMobile] = useState(profile.mobile);
  const [address, setAddress] = useState(isAr ? 'أبوظبي، شاطئ الراحة، برج البندر، شقة 804' : profile.residentialAddress);
  const [emergencyName, setEmergencyName] = useState(isAr ? 'فاطمة المنصوري' : profile.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContact.phone);
  const [proposedBank, setProposedBank] = useState(profile.bankDetails.bankName);
  const [proposedIban, setProposedIban] = useState(profile.bankDetails.maskedIban);
  const [changeReason, setChangeReason] = useState(isAr ? 'تحديث إلى حساب الراتب الأساسي بدولة الإمارات' : 'Updating to primary UAE payroll account');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proposedIban !== profile.bankDetails.maskedIban) {
      requestBankDetailChange({
        proposedBank,
        proposedIban,
        reason: changeReason,
      });
    }
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/employee/profile');
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تحديث البيانات الشخصية والمصرفية' : 'Edit Personal & Banking Details'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الملف الشخصي' : 'Profile', href: '/employee/profile' },
            { label: isAr ? 'تحديث البيانات' : 'Edit' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/employee/profile"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isAr ? 'تحديث البيانات الشخصية والمصرفية' : 'Edit Personal & Banking Details'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr
                    ? 'تحديث بيانات الاتصال أو تقديم طلب رسمي لتعديل الحساب المصرفي لتحويل الراتب.'
                    : 'Update your contact details or submit an official bank account modification request.'}
                </p>
              </div>
            </div>
          </div>

          {/* Supplier Review Policy Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 space-y-1">
              <span className="font-bold block">
                {isAr ? 'إشعار الحوكمة والامتثال الأمني الهام:' : 'Important Governance & Compliance Notice:'}
              </span>
              <p>
                {isAr
                  ? 'وفقاً للوائح أمن التعهيد لمؤسسة الإمارات للدواء ونظام حماية الأجور (WPS)، فإن تعديل المعلومات المصرفية الحساسة (الآيبان وتفاصيل الحساب) يخضع لتدقيق وتحقق إلزامي من قبل فريق خدمات الموظفين لدى المورد قبل سريانه. تظل بيانات حسابك الحالي نشطة حتى اعتماد الطلب.'
                  : 'In accordance with EDE Outsourcing Security Regulations and the UAE Wage Protection System (WPS), modifications to sensitive banking information (IBAN/Account details) are subject to mandatory verification and approval by the supplier Employee Services team before taking effect. Your existing account details remain active until the request is approved.'}
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم إرسال طلب التعديل بنجاح' : 'Change Request Submitted Successfully'}
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isAr
                  ? 'تم توجيه طلبك إلى قائمة مدير خدمات الموظفين لدى المورد للتحقق من المستندات. سيصلك إشعار فوري عند اكتمال التدقيق. جارٍ تحويلك إلى الملف الشخصي...'
                  : 'Your request has been routed to the Supplier Employee Services Manager queue for document verification. You will be notified via in-app alert once reviewed. Redirecting to profile...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Details Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Phone className="w-4 h-4 text-[#2463A6]" />
                  <h2 className="text-sm font-bold text-slate-800">
                    {isAr ? 'بيانات الاتصال' : 'Contact Details'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'رقم الهاتف المتحرك (الإمارات)' : 'Mobile Number (UAE)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'البريد الإلكتروني الرسمي لمؤسسة الإمارات للدواء (للقراءة فقط)' : 'Official EDE Email (Read-Only)'}
                    </label>
                    <input
                      type="email"
                      disabled
                      value={profile.email}
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'العنوان السكني (الإمارة والمنطقة)' : 'Residential Address (Emirate & Area)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'اسم جهة الاتصال في حالات الطوارئ' : 'Emergency Contact Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'هاتف الطوارئ' : 'Emergency Contact Phone'}
                    </label>
                    <input
                      type="text"
                      required
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Banking Details Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CreditCard className="w-4 h-4 text-[#008F88]" />
                  <h2 className="text-sm font-bold text-slate-800">
                    {isAr ? 'المعلومات المصرفية وحساب راتب نظام حماية الأجور (WPS)' : 'Banking Information & WPS Salary Account'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'اسم المصرف' : 'Bank Name'}
                    </label>
                    <select
                      value={proposedBank}
                      onChange={(e) => setProposedBank(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    >
                      <option value="First Abu Dhabi Bank (FAB)">{isAr ? 'بنك أبوظبي الأول (FAB)' : 'First Abu Dhabi Bank (FAB)'}</option>
                      <option value="Abu Dhabi Commercial Bank (ADCB)">{isAr ? 'بنك أبوظبي التجاري (ADCB)' : 'Abu Dhabi Commercial Bank (ADCB)'}</option>
                      <option value="Emirates NBD">{isAr ? 'بنك الإمارات دبي الوطني' : 'Emirates NBD'}</option>
                      <option value="Dubai Islamic Bank (DIB)">{isAr ? 'بنك دبي الإسلامي (DIB)' : 'Dubai Islamic Bank (DIB)'}</option>
                      <option value="Abu Dhabi Islamic Bank (ADIB)">{isAr ? 'مصرف أبوظبي الإسلامي (ADIB)' : 'Abu Dhabi Islamic Bank (ADIB)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'اسم صاحب الحساب' : 'Account Holder Name'}
                    </label>
                    <input
                      type="text"
                      disabled
                      value={isAr ? (profile.fullNameAr || profile.bankDetails.accountHolder) : profile.bankDetails.accountHolder}
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'رقم الحساب المصرفي الدولي الجديد (IBAN)' : 'New International Bank Account Number (IBAN)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={proposedIban}
                      onChange={(e) => setProposedIban(e.target.value.toUpperCase())}
                      placeholder="AE03 0330 0000 0000 0000 000"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'سبب طلب تغيير الحساب المصرفي' : 'Reason for Bank Account Change'}
                    </label>
                    <input
                      type="text"
                      required
                      value={changeReason}
                      onChange={(e) => setChangeReason(e.target.value)}
                      placeholder={isAr ? 'مثال: تحويل حساب الراتب للمصرف المانح للتمويل العقاري' : 'e.g. Switched salary account to primary mortgage bank'}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href="/employee/profile"
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'إرسال لتدقيق واعتماد المورد' : 'Submit for Supplier Approval'}</span>
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
