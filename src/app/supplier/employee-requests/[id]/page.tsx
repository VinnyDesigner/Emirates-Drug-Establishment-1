'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  LifeBuoy,
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  Building2,
} from 'lucide-react';

function SupplierTicketResolutionContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { language, t } = useI18n();
  const isAr = language === 'ar';
  const { tickets, addTicketMessage, updateTicketStatus, currentUser } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isResolved, setIsResolved] = useState(false);

  const currentTicket =
    tickets.find((t) => t.id === id || t.ticketNumber === id) || tickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !currentTicket) return;
    addTicketMessage(currentTicket.id, replyMessage.trim());
    setReplyMessage('');
  };

  const handleMarkResolved = () => {
    if (!currentTicket) return;
    updateTicketStatus(currentTicket.id, 'resolved', currentUser.name);
    setIsResolved(true);
    setTimeout(() => {
      router.push('/supplier/employee-requests');
    }, 1500);
  };

  if (!currentTicket) {
    return (
      <div className="flex h-screen bg-[#F5F7FB] items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-xs text-slate-500">Service ticket not found.</p>
          <Link href="/supplier/employee-requests" className="px-4 py-2 bg-[#142B52] text-white text-xs rounded-xl">
            Back to Queue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/supplier/employee-requests"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isAr ? 'العودة إلى مكتب الطلبات' : 'Back to Requests Desk'}</span>
            </Link>

            <div className="flex items-center gap-2">
              <StatusBadge status={currentTicket.status} />
              {currentTicket.status !== 'resolved' && (
                <button
                  onClick={handleMarkResolved}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تحديد كتم الحل والإغلاق' : 'Mark Resolved & Close'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Ticket Header */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#2463A6]">{currentTicket.ticketNumber}</span>
                <h1 className="text-lg font-bold text-slate-900 mt-0.5">{currentTicket.subject}</h1>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                {isAr ? 'مستوى الخدمة: الرد خلال 24 ساعة' : 'SLA: 24h Response Target'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'الموظف' : 'Employee'}
                </span>
                <span className="font-bold text-slate-800">{currentTicket.employeeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'التصنيف' : 'Category'}
                </span>
                <span className="font-semibold text-slate-800">{currentTicket.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'الأولوية' : 'Priority'}
                </span>
                <span className="font-semibold text-slate-800">
                  {isAr
                    ? currentTicket.priority === 'Urgent'
                      ? 'عاجلة جداً'
                      : currentTicket.priority === 'High'
                      ? 'عالية'
                      : currentTicket.priority === 'Medium'
                      ? 'متوسطة'
                      : 'منخفضة'
                    : currentTicket.priority}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">
                  {isAr ? 'الحالة' : 'Status'}
                </span>
                <span className="font-semibold text-slate-800 capitalize">
                  {isAr
                    ? currentTicket.status === 'resolved'
                      ? 'تم الحل'
                      : currentTicket.status === 'in_progress'
                      ? 'قيد المعالجة'
                      : 'مفتوحة'
                    : currentTicket.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Conversation Desk */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[460px]">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {isAr ? 'سجل المحادثة والدعم' : 'Support Dialogue Log'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isAr ? `${currentTicket.messages.length} رسائل` : `${currentTicket.messages.length} messages`}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentTicket.messages.map((msg) => {
                const isSupplier = msg.senderRole !== 'outsourced_employee';
                return (
                  <div key={msg.id} className={`flex flex-col ${isSupplier ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      <span className="font-bold text-slate-700">{msg.senderName} ({msg.senderRole})</span>
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                        isSupplier
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
                placeholder={
                  isAr
                    ? 'اكتب رد الحل الرسمي المعتمد من المزوّد للموظف...'
                    : 'Type official supplier resolution response to employee...'
                }
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? 'إرسال الرد' : 'Reply'}</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SupplierTicketResolutionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F5F7FB]">
          <div className="w-8 h-8 border-4 border-[#142B52] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SupplierTicketResolutionContent />
    </Suspense>
  );
}
