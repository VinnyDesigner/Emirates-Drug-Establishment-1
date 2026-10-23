'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HeartPulse, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export default function SupplierInsuranceCoordinationPage() {
  const { medicalClaims, reviewMedicalClaim } = useAppStore();
  const { t } = useI18n();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleVerifyClaim = (claimId: string) => {
    reviewMedicalClaim(claimId, 'insurer_processing');
    setSuccessMsg('Claim dossier verified and transmitted to Daman electronic claims portal.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle="Insurance & Benefits Operations"
          breadcrumbs={[
            { label: 'Portal', href: '/supplier/dashboard' },
            { label: 'Insurance' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              Medical Insurance & Claims Coordination
            </h2>
            <p className="text-xs text-slate-500">
              Verify employee out-of-pocket medical claims and coordinate policy renewals with Daman National Health.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Submitted Claims for Supplier Review</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">Claim ID</th>
                    <th className="py-3">Employee</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Provider Clinic</th>
                    <th className="py-3">Invoice Number</th>
                    <th className="py-3">Claimed Amount</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicalClaims.map((clm) => (
                    <tr key={clm.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 font-mono font-bold text-[#142B52]">{clm.claimId}</td>
                      <td className="py-3.5 font-bold text-slate-900">{clm.employeeName}</td>
                      <td className="py-3.5 font-medium">{clm.claimCategory}</td>
                      <td className="py-3.5 text-slate-700">{clm.providerClinic}</td>
                      <td className="py-3.5 font-mono text-slate-500">{clm.invoiceNumber}</td>
                      <td className="py-3.5 font-mono font-bold text-slate-900">
                        AED {clm.claimedAmountAed.toLocaleString()}
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={clm.status} />
                      </td>
                      <td className="py-3.5 text-right whitespace-nowrap">
                        {clm.status === 'submitted' ? (
                          <button
                            onClick={() => handleVerifyClaim(clm.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold shadow-xs"
                          >
                            Verify & Dispatch to Daman
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">In Insurer Cycle</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
