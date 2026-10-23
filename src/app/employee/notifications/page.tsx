'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  BellRing,
  CheckCircle2,
  Clock,
  ArrowRight,
  FolderArchive,
  CalendarDays,
  FileSignature,
  Filter,
} from 'lucide-react';

export default function NotificationsCenterPage() {
  const { notifications, markNotificationRead } = useAppStore();
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState('ALL');

  const filtered = notifications.filter((n) => {
    if (filterType === 'UNREAD') return !n.isRead;
    if (filterType !== 'ALL') return n.type === filterType.toLowerCase();
    return true;
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'مركز الإشعارات' : 'Notification Center'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'الإشعارات' : 'Notifications' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'إشعارات النظام وسير العمل' : 'System & Workflow Notifications'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تنبيهات موثقة للاعتمادات، وانتهاء الوثائق، وقسائم الرواتب، وردود التذاكر.'
                  : 'Audited alerts for approvals, document expiries, payroll slips, and ticket replies.'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'تصفية:' : 'Filter:'}</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium shadow-xs focus:outline-hidden"
              >
                <option value="ALL">{isAr ? 'جميع التنبيهات' : 'All Alerts'}</option>
                <option value="UNREAD">{isAr ? 'غير المقروءة فقط' : 'Unread Only'}</option>
                <option value="LEAVE">{isAr ? 'موافقات الإجازات' : 'Leave Approvals'}</option>
                <option value="DOCUMENT">{isAr ? 'انتهاء الوثائق' : 'Document Expiries'}</option>
                <option value="TICKET">{isAr ? 'تحديثات التذاكر' : 'Ticket Updates'}</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {filtered.length === 0 ? (
              <p className="p-12 text-center text-xs text-slate-400">
                {isAr ? 'لا توجد إشعارات تطابق هذا الفلتر.' : 'No notifications matching this filter.'}
              </p>
            ) : (
              filtered.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-5 transition-colors flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 ${
                    !n.isRead
                      ? 'bg-sky-50/40 border-l-4 rtl:border-l-0 rtl:border-r-4 border-l-[#2463A6] rtl:border-r-[#2463A6]'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 mt-0.5 shrink-0">
                      {n.type === 'leave' && <CalendarDays className="w-5 h-5 text-[#2463A6]" />}
                      {n.type === 'document' && <FolderArchive className="w-5 h-5 text-rose-500" />}
                      {n.type === 'certificate' && <FileSignature className="w-5 h-5 text-amber-500" />}
                      {n.type !== 'leave' && n.type !== 'document' && n.type !== 'certificate' && (
                        <BellRing className="w-5 h-5 text-teal-600" />
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {isAr ? n.titleAr : n.titleEn}
                        </span>
                        {!n.isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                            {isAr ? 'جديد' : 'New'}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed max-w-2xl">
                        {isAr ? n.messageAr : n.messageEn}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {new Date(n.timestamp).toLocaleString(isAr ? 'ar-AE' : 'en-GB')}
                      </p>
                    </div>
                  </div>

                  {n.actionUrl && (
                    <Link
                      href={n.actionUrl}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <span>{isAr ? 'فتح السجل' : 'Open Record'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
