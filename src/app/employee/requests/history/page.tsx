'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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

function TicketThreadContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('id');
  const { tickets, addTicketMessage, currentUser } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(
    requestedId || tickets[0]?.id || ''
  );
  const [replyMessage, setReplyMessage] = useState('');

  const currentTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !currentTicket) return;
    addTicketMessage(currentTicket.id, replyMessage.trim());
    setReplyMessage('');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'محادثة وتفاصيل تذكرة الخدمة' : 'Service Request Conversation Thread'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'طلبات الخدمة' : 'Requests', href: '/employee/requests' },
            { label: currentTicket?.ticketNumber || (isAr ? 'المحادثة' : 'Conversation') },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between">
            <Link
              href="/employee/requests"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{isAr ? 'العودة لقائمة التذاكر' : 'Back to Tickets List'}</span>
            </Link>

            <span className="font-mono text-xs font-bold text-[#142B52]">
              {currentTicket?.ticketNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 1 Col: Ticket Metadata */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {isAr ? 'التصنيف' : 'Category'}
                </span>
                <p className="font-bold text-slate-900 text-sm">{t(currentTicket?.category || '')}</p>
                <div className="mt-2">
                  <StatusBadge status={currentTicket?.status || 'submitted'} />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'موضوع التذكرة' : 'Subject'}
                  </span>
                  <p className="font-semibold text-slate-800 leading-snug">{currentTicket?.subject}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'المسؤول المكلّف' : 'Assigned Officer'}
                  </span>
                  <p className="font-medium text-slate-800">
                    {currentTicket?.assignedOfficerName || (isAr ? 'قائمة انتظار المورد' : 'Supplier Queue')}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'التزام اتفاقية الخدمة' : 'SLA Commitment'}
                  </span>
                  <p className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isAr ? 'مستهدف الرد خلال 24 ساعة عمل (نشط)' : '24 Working Hours Target (Active)'}</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'تاريخ الإنشاء' : 'Created On'}
                  </span>
                  <p className="text-slate-500 font-mono text-[11px]">
                    {new Date(currentTicket?.submittedAt || '').toLocaleString(isAr ? 'ar-AE' : 'en-GB')}
                  </p>
                </div>
              </div>

              {/* Selector for other tickets */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">
                  {isAr ? 'التبديل بين التذاكر' : 'Switch Ticket'}
                </span>
                <div className="space-y-1">
                  {tickets.map((tkt) => (
                    <button
                      key={tkt.id}
                      onClick={() => setSelectedTicketId(tkt.id)}
                      className={`w-full p-2.5 rounded-xl text-left rtl:text-right text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedTicketId === tkt.id
                          ? 'bg-[#142B52] text-white font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{tkt.ticketNumber}</span>
                      <span className="text-[10px] opacity-80">{t(tkt.category).split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 2 Cols: Message Feed & Reply */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between space-y-6 min-h-[500px]">
              {/* Message Feed */}
              <div className="space-y-4 overflow-y-auto max-h-[520px] pr-2">
                {currentTicket?.messages.map((msg) => {
                  const isEmp = msg.senderRole.includes('Employee') || msg.senderRole === 'outsourced_employee';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isEmp ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
                        <span className="font-bold text-slate-700">{msg.senderName}</span>
                        <span>&bull;</span>
                        <span>{isAr ? (isEmp ? 'الموظف' : 'مسؤول المورد') : msg.senderRole}</span>
                        <span>&bull;</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                          isEmp
                            ? 'bg-[#142B52] text-white rounded-br-xs'
                            : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/80'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={isAr ? 'اكتب رداً أو استفساراً لفريق دعم المورد...' : 'Type a message or response to the support team...'}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs shadow-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{isAr ? 'إرسال' : 'Send'}</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RequestHistoryThreadPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading conversation thread...</div>}>
      <TicketThreadContent />
    </Suspense>
  );
}
