'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  Settings,
  ShieldCheck,
  Globe,
  Bell,
  Lock,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export default function EmployeeSettingsPage() {
  const { currentUser } = useAppStore();
  const { language, setLanguage, t } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'الأمان وتفضيلات الحساب' : 'Security & Preferences'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الإعدادات' : 'Settings' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              {isAr ? 'أمان النظام وتفضيلات المستخدم' : 'System Security & User Preferences'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'إدارة التحقق بخطوتين (2FA)، واجهة اللغة المفضلة، وقنوات تسليم الإشعارات والتنبيهات.'
                : 'Manage your two-factor authentication, preferred language, and notification channels.'}
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* 2FA Security Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-[#008F88]" />
                <h3 className="font-bold text-sm text-slate-900">
                  {isAr ? 'التحقق الثنائي بخطوتين (2FA) وحماية الجلسة' : 'Two-Factor Authentication (2FA) & Session Guard'}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    {isAr ? 'إلزامية رمز التحقق (OTP) عند تسجيل الدخول' : 'Enforce OTP at Sign In'}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {isAr
                      ? `يتطلب إدخال رمز أمان مكوّن من 6 أرقام يتم إرساله إلى هاتف ${currentUser.mobile} أو بريدك الرسمي.`
                      : `Requires a 6-digit verification code dispatched to ${currentUser.mobile} or ${currentUser.email}.`}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-[#142B52] focus:ring-[#142B52]"
                />
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <Globe className="w-5 h-5 text-[#2463A6]" />
                <h3 className="font-bold text-sm text-slate-900">
                  {isAr ? 'لغة الواجهة واتجاه العرض' : 'Display Language & Orientation'}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right space-y-1 transition-all cursor-pointer ${
                    language === 'en'
                      ? 'border-[#2463A6] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block text-slate-900">English (LTR)</span>
                  <span className="text-[11px] text-slate-500">Standard federal government English</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right space-y-1 transition-all cursor-pointer ${
                    language === 'ar'
                      ? 'border-[#2463A6] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block text-slate-900 font-arabic">العربية (RTL)</span>
                  <span className="text-[11px] text-slate-500 font-arabic">اللغة الرسمية لدولة الإمارات العربية المتحدة</span>
                </button>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">
                  {isAr ? 'قنوات استلام التنبيهات والإشعارات (البند 3.5.1)' : 'Notification Delivery Channels (Section 3.5.1)'}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">
                      {isAr ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'استلام تحديثات الموافقات، إشعارات قسائم الرواتب، وتحديثات التذاكر عبر البريد الإلكتروني'
                        : 'Receive approval notifications and payslip alerts via email'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#142B52]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">
                      {isAr ? 'رسائل بوابة الرسائل النصية القصيرة (SMS)' : 'SMS Gateway Alerts'}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {isAr
                        ? 'استلام تنبيهات انتهاء الإقامة والوثائق الحرجة عبر بوابة الرسائل القصيرة الرسمية'
                        : 'Receive high-priority residency expiry alerts via UAE SMS gateway'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#142B52]"
                  />
                </div>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-bold">
                  {isAr ? 'تم حفظ التفضيلات بنجاح.' : 'Preferences saved successfully.'}
                </span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold shadow-xs transition-all cursor-pointer"
              >
                {isAr ? 'حفظ التفضيلات' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
