import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  highlightColor?: 'primary' | 'accent' | 'amber' | 'emerald' | 'rose';
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlightColor = 'primary',
  onClick,
}: MetricCardProps) {
  const { t } = useI18n();
  const topAccentMap = {
    primary: 'from-[#0F2342] via-[#1D68E2] to-[#2563EB]',
    accent: 'from-[#00B3AA] via-[#008F88] to-[#14B8A6]',
    amber: 'from-amber-400 via-amber-500 to-orange-500',
    emerald: 'from-emerald-400 via-emerald-500 to-teal-600',
    rose: 'from-rose-400 via-rose-500 to-pink-600',
  };

  const iconBgMap = {
    primary: 'bg-gradient-to-br from-[#0F2342]/10 to-[#1D68E2]/15 text-[#1D68E2] border border-[#1D68E2]/20',
    accent: 'bg-gradient-to-br from-[#00B3AA]/15 to-[#008F88]/20 text-[#008F88] border border-[#00B3AA]/25',
    amber: 'bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 border border-amber-500/25',
    emerald: 'bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 border border-emerald-500/25',
    rose: 'bg-gradient-to-br from-rose-500/15 to-pink-500/15 text-rose-600 border border-rose-500/25',
  };

  const displayValue = typeof value === 'string' ? t(value) : value;

  return (
    <div
      onClick={onClick}
      className={`relative p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      {/* Top subtle accent gradient bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${topAccentMap[highlightColor]} opacity-90 group-hover:h-[4px] transition-all`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
            {t(title)}
          </p>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">
            {displayValue}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium truncate pt-0.5">
              {t(subtitle)}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`p-3 rounded-2xl shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 ${iconBgMap[highlightColor]}`}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              trend.isPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                : 'bg-rose-50 text-rose-700 border border-rose-200/70'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 text-rose-600 shrink-0" />
            )}
            <span>{t(trend.value)}</span>
          </div>
          {trend.label && (
            <span className="text-slate-500 text-[11px] font-medium truncate">
              {t(trend.label)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

