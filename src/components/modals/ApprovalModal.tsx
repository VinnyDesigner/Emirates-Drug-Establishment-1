'use client';

import React, { useState } from 'react';
import { LeaveRequest } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { CheckCircle2, XCircle, HelpCircle, X, Calendar, User, FileText, AlertCircle } from 'lucide-react';

interface ApprovalModalProps {
  request: LeaveRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApprovalModal({ request, isOpen, onClose }: ApprovalModalProps) {
  const { reviewLeaveRequest } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [decision, setDecision] = useState<'approved' | 'rejected' | 'returned_for_clarification'>('approved');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((decision === 'rejected' || decision === 'returned_for_clarification') && !remarks.trim()) {
      setError(isAr ? 'يرجى كتابة ملاحظات وتوضيح سبب الرفض أو طلب الاستفسار للموظف.' : 'Please provide mandatory remarks explaining the decision to the employee.');
      return;
    }

    reviewLeaveRequest(request.id, decision, remarks.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#0F2342] to-[#1D68E2] text-white flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold">
              {isAr ? 'مراجعة واعتماد طلب الإجازة' : 'Review Leave Request'}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              {isAr ? 'معرّف الطلب:' : 'Request Identifier:'} {request.requestId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* Employee & Request Summary Box */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#1D68E2]" />
                <span className="font-bold text-sm text-slate-900">{request.employeeName}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono text-[11px] font-bold">
                {request.employeeId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-2 border-t border-slate-200/80">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'الإدارة' : 'Department'}
                </span>
                <span className="font-semibold text-slate-800">{request.department}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'نوع الإجازة' : 'Leave Type'}
                </span>
                <span className="font-semibold text-slate-800 capitalize">
                  {t(request.leaveType)} {isAr ? 'إجازة' : 'Leave'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'فترة الإجازة' : 'Duration'}
                </span>
                <span className="font-semibold text-slate-800">
                  {request.startDate} {isAr ? 'إلى' : 'to'} {request.endDate} ({request.days} {isAr ? 'أيام' : 'days'})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {isAr ? 'الخصم من الرصيد' : 'Balance Deducted'}
                </span>
                <span className="font-bold text-emerald-700">
                  {request.days} {isAr ? 'أيام من الرصيد السنوي' : 'days from Annual Pool'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                {isAr ? 'سبب الموظف' : 'Employee Reason'}
              </span>
              <p className="text-slate-700 italic mt-0.5">&ldquo;{request.reason}&rdquo;</p>
            </div>
          </div>

          {/* Decision Selector Buttons */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
              {isAr ? 'القرار الإداري المعتمد' : 'Authorized Decision'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => { setDecision('approved'); setError(''); }}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  decision === 'approved'
                    ? 'border-emerald-500 bg-emerald-50/90 text-emerald-800 shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200/90 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{isAr ? 'موافقة' : t('action.approve')}</span>
              </button>

              <button
                type="button"
                onClick={() => { setDecision('rejected'); setError(''); }}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  decision === 'rejected'
                    ? 'border-rose-500 bg-rose-50/90 text-rose-800 shadow-xs ring-2 ring-rose-500/20'
                    : 'border-slate-200/90 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>{isAr ? 'رفض' : t('action.reject')}</span>
              </button>

              <button
                type="button"
                onClick={() => { setDecision('returned_for_clarification'); setError(''); }}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  decision === 'returned_for_clarification'
                    ? 'border-amber-500 bg-amber-50/90 text-amber-800 shadow-xs ring-2 ring-amber-500/20'
                    : 'border-slate-200/90 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>{isAr ? 'طلب توضيح' : 'Clarification'}</span>
              </button>
            </div>
          </div>

          {/* Manager Remarks */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">
              {isAr ? 'ملاحظات المسؤول' : 'Manager Remarks'} {decision !== 'approved' && <span className="text-rose-500">*</span>}
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => { setRemarks(e.target.value); setError(''); }}
              placeholder={
                decision === 'approved'
                  ? (isAr ? 'ملاحظات اختيارية أو توجيهات تغطية العمل أثناء الإجازة...' : 'Optional approval comments or coverage instructions...')
                  : (isAr ? 'سبب إلزامي يوضح مبررات الرفض أو الاستفسار المطلوب من الموظف...' : 'Mandatory reason explaining rejection or clarification required...')
              }
              className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#1D68E2] focus:ring-4 focus:ring-[#1D68E2]/10 transition-all text-xs"
            />
            {error && (
              <p className="text-rose-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200/90 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer transition-colors"
            >
              {isAr ? 'إلغاء' : t('action.cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F2342] to-[#1D68E2] hover:from-[#09172B] hover:to-[#1555BF] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isAr ? 'تأكيد القرار وإرسال الإشعار' : 'Confirm Decision & Dispatch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
