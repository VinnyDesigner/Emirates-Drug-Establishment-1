'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  LifeBuoy,
  ArrowLeft,
  Send,
  Clock,
  User,
  ShieldCheck,
  Building2,
} from 'lucide-react';

function DynamicTicketDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const { tickets, addTicketMessage, currentUser } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const currentTicket =
    tickets.find((tkt) => tkt.id === id || tkt.ticketNumber === id) || tickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !currentTicket) return;
    addTicketMessage(currentTicket.id, replyMessage.trim());
    setReplyMessage('');
  };

  if (!currentTicket) {
    return (
      <div className="flex h-screen bg-[#F5F7FB] items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-xs text-slate-500">
            {isAr ? 'لم يتم العثور على تذكرة الخدمة.' : 'Service ticket not found.'}
          </p>
          <Link
            href="/employee/service-requests"
            className="px-4 py-2 bg-[#142B52] text-white text-xs rounded-xl inline-block cursor-pointer"
          >
            {isAr ? 'العودة للتذاكر' : 'Back to Tickets'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'محادثة طلب الخدمة' : 'Service Request Conversation'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'طلبات الخدمة' : 'Service Requests', href: '/employee/service-requests' },
            { label: currentTicket.ticketNumber },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/employee/service-requests"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isAr ? 'العودة لقائمة الطلبات' : 'Back to Requests'}</span>
            </Link>

            <div className="flex items-center gap-2">
              <StatusBadge status={currentTicket.status} />
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 font-semibold">
                {isAr ? 'اتفاقية الخدمة: رد خلال 24 ساعة' : 'SLA: 24h Response'}
              </span>
            </div>
          </div>

          {/* Ticket Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#2463A6]">
                  {currentTicket.ticketNumber}
                </span>
                <h1 className="text-lg font-bold text-slate-900 mt-0.5">
                  {currentTicket.subject}
                </h1>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[11px] text-slate-400 block">
                  {isAr ? 'تاريخ الإنشاء' : 'Created On'}
                </span>
                <span className="text-xs font-semibold text-slate-700 font-mono">
                  {new Date(currentTicket.submittedAt).toLocaleDateString(isAr ? 'ar-AE' : 'en-GB')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'التصنيف' : 'Category'}
                </span>
                <span className="font-semibold text-slate-800">{t(currentTicket.category)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'الأولوية' : 'Priority'}
                </span>
                <span className="font-semibold text-slate-800">{t(currentTicket.priority)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'المسؤول المكلّف' : 'Assigned Team'}
                </span>
                <span className="font-semibold text-slate-800">
                  {currentTicket.assignedOfficerName || (isAr ? 'قائمة انتظار المورد' : 'Supplier ESM Queue')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'الحالة' : 'Status'}
                </span>
                <span className="font-semibold text-slate-800 capitalize">
                  {isAr ? (currentTicket.status === 'resolved' ? 'مكتمل' : 'قيد المعالجة') : currentTicket.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[480px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <span className="text-xs font-bold text-slate-800">
                {isAr ? 'سجل المحادثات والمراسلات المتبادلة' : 'Messages & Communication History'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isAr ? `تم تسجيل ${currentTicket.messages.length} رسائل` : `${currentTicket.messages.length} messages logged`}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentTicket.messages.map((msg) => {
                const isEmployee = msg.senderRole === 'outsourced_employee' || msg.senderRole.includes('Employee');
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isEmployee ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      <span className="font-bold text-slate-700">{msg.senderName}</span>
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isEmployee
                          ? 'bg-[#142B52] text-white rounded-br-xs'
                          : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                required
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder={isAr ? 'اكتب رداً أو استفساراً لفريق دعم المورد...' : 'Type a response or inquiry message...'}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? 'إرسال' : 'Send'}</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DynamicTicketDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DynamicTicketDetailContent />
    </Suspense>
  );
}
