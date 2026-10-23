import React from 'react';
import { useI18n } from '@/lib/i18n';

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const { t } = useI18n();

  const normalized = status.toLowerCase().replace(/ /g, '_');

  let style = 'bg-slate-100/90 text-slate-700 border-slate-200/80';
  let dotColor = 'bg-slate-400';
  let isPulsing = false;

  if (['approved', 'active', 'verified', 'paid', 'ticket_issued', 'settled', 'compliant', 'met', 'issued'].includes(normalized)) {
    style = 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (['submitted', 'under_review', 'processing', 'pending', 'pending_verification', 'shortlisting', 'interviewing', 'investigating', 'candidates_submitted'].includes(normalized)) {
    style = 'bg-amber-50/90 text-amber-700 border-amber-200/80';
    dotColor = 'bg-amber-500';
    isPulsing = true;
  } else if (['rejected', 'breached', 'expired', 'closed', 'cancelled'].includes(normalized)) {
    style = 'bg-rose-50/90 text-rose-700 border-rose-200/80';
    dotColor = 'bg-rose-500';
  } else if (['renewal_in_progress', 'returned_for_clarification', 'awaiting_info', 'late', 'warning'].includes(normalized)) {
    style = 'bg-orange-50/90 text-orange-700 border-orange-200/80';
    dotColor = 'bg-orange-500';
    isPulsing = true;
  } else if (['in_progress', 'on_track'].includes(normalized)) {
    style = 'bg-sky-50/90 text-sky-700 border-sky-200/80';
    dotColor = 'bg-sky-500';
    isPulsing = true;
  }

  const displayLabel = label ? t(label) : t(`status.${normalized}`, status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] font-semibold tracking-wide border shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all ${style} ${className}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        {isPulsing && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor}`} />
      </span>
      <span className="truncate">{displayLabel}</span>
    </span>
  );
}


