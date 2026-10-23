'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { UserRole } from '@/lib/types';
import { ShieldCheck, UserCheck, RefreshCw, FileText } from 'lucide-react';
import Link from 'next/link';

export function DemoRoleBar() {
  const { currentUser, switchUserRole, resetDemoData } = useAppStore();
  const { t } = useI18n();

  const roles: { role: UserRole; nameEn: string; nameAr: string; title: string; route: string }[] = [
    {
      role: 'outsourced_employee',
      nameEn: 'Ahmed Al Mansoori',
      nameAr: 'أحمد المنصوري',
      title: 'Employee (EDE-EMP-1042)',
      route: '/employee/dashboard',
    },
    {
      role: 'line_manager',
      nameEn: 'Dr. Mariam Al Suwaidi',
      nameAr: 'د. مريم السويدي',
      title: 'Line Manager (Drug Reg)',
      route: '/manager/dashboard',
    },
    {
      role: 'ede_hr_admin',
      nameEn: 'Sultan Al Nuaimi',
      nameAr: 'سلطان النعيمي',
      title: 'EDE HR & Support Admin (EDE Gov)',
      route: '/ede/dashboard',
    },
    {
      role: 'supplier_esm',
      nameEn: 'Tariq Al Hashimi',
      nameAr: 'طارق الهاشمي',
      title: 'Supplier ESM (Operations)',
      route: '/supplier/dashboard',
    },
    {
      role: 'supplier_am',
      nameEn: 'Layla Mahmoud',
      nameAr: 'ليلى محمود',
      title: 'Supplier AM (Account & SLA)',
      route: '/supplier/dashboard',
    },
    {
      role: 'supplier_ops_admin',
      nameEn: 'Kareem Haddad',
      nameAr: 'كريم حداد',
      title: 'Supplier Ops Admin (Recruitment & Deploy)',
      route: '/supplier/dashboard',
    },
  ];

  return (
    <div className="bg-[#0E1F3D] text-white border-b border-slate-700/60 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner z-30">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#008F88]/20 text-[#00B3AA] px-2 py-0.5 rounded font-medium border border-[#008F88]/40">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PROTOTYPE TEST BENCH</span>
        </div>
        <span className="hidden md:inline text-slate-400">|</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white">{currentUser.name}</span>
          <span className="text-slate-400">({t(`role.${currentUser.role}`) || currentUser.role})</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-slate-400 hidden lg:inline">Switch Persona:</span>
        <div className="flex items-center gap-1 bg-slate-900/60 p-0.5 rounded-lg border border-slate-700/50">
          {roles.map((item) => {
            const isActive = currentUser.role === item.role || (currentUser.role === 'establishment_admin' && item.role === 'ede_hr_admin');
            return (
              <button
                key={item.role}
                onClick={() => {
                  switchUserRole(item.role);
                  window.location.href = item.route;
                }}
                title={item.title}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-[#2463A6] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.nameEn.split(' ')[0]} ({item.role.replace('supplier_', 'sup_').replace('outsourced_', '').replace('ede_', '').slice(0, 4)})
              </button>
            );
          })}
        </div>

        <Link
          href="/demo/compliance-matrix"
          className="inline-flex items-center gap-1 bg-amber-800/40 hover:bg-amber-700/50 text-amber-300 px-2 py-1 rounded text-[11px] font-medium border border-amber-600/40 transition-colors"
          title="Annex B 21-Item Compliance Matrix"
        >
          <FileText className="w-3 h-3" />
          <span>Annex B Matrix</span>
        </Link>

        <Link
          href="/traceability"
          className="inline-flex items-center gap-1 bg-teal-800/40 hover:bg-teal-700/50 text-teal-300 px-2 py-1 rounded text-[11px] font-medium border border-teal-600/40 transition-colors"
          title="RFP Requirement Traceability Matrix"
        >
          <FileText className="w-3 h-3" />
          <span>RFP Matrix</span>
        </Link>


        <button
          onClick={() => {
            if (confirm('Reset demo state back to seeded baseline?')) {
              resetDemoData();
              window.location.reload();
            }
          }}
          title="Reset demo data to initial fixtures"
          className="p-1 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
