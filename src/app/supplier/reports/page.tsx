'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  Building2,
  Clock,
} from 'lucide-react';
import { exportToCSV, printFormattedReport } from '@/lib/export-utils';

export default function SupplierReportsPage() {
  const { employees, slaMetrics, documents } = useAppStore();
  const { t } = useI18n();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  // Supplier A: Al Tamimi Manpower Services (34 employees)
  const supplierStaff = employees.filter((e) => e.supplierEn.includes('Tamimi'));

  const handleExportWorkforce = () => {
    exportToCSV('Al_Tamimi_Monthly_Workforce_Report', supplierStaff, [
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'fullNameEn', label: 'Full Name' },
      { key: 'jobTitleEn', label: 'Job Title' },
      { key: 'departmentEn', label: 'Department' },
      { key: 'joiningDate', label: 'Joining Date' },
      { key: 'employmentStatus', label: 'Status' },
    ]);
  };

  const handlePrintWorkforce = () => {
    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${supplierStaff
            .map(
              (s) => `
            <tr>
              <td><strong>${s.employeeId}</strong></td>
              <td>${s.fullNameEn}</td>
              <td>${s.jobTitleEn}</td>
              <td>${s.departmentEn}</td>
              <td>${s.joiningDate}</td>
              <td>${s.employmentStatus}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    printFormattedReport(
      'Monthly Workforce Information Report',
      `Period: ${selectedMonth} | Al Tamimi Manpower Services`,
      tableHtml
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle="Monthly Operational Reports & Exports"
          breadcrumbs={[
            { label: 'Portal', href: '/supplier/dashboard' },
            { label: 'Reports' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h2 className="text-xl font-bold text-[#142B52]">
              Supplier Monthly Operational Reporting Center
            </h2>
            <p className="text-xs text-slate-500">
              Deliver monthly workforce, performance, and compliance packages within 5 working days of calendar month end (RFP Section 3.7 SLA 7).
            </p>
          </div>

          {/* SLA Tracking Bar */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4 text-xs text-emerald-900">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">RFP Section 3.7 - 7 SLA Target: </span>
                <span>Delivery within 5 working days after month end. Delivered in <strong>3.5 working days (100% compliance)</strong>.</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[11px] shrink-0">
              Delivered On-Time
            </span>
          </div>

          {/* Month Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Select Reporting Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-hidden"
            >
              <option value="September 2026">September 2026 (Submitted)</option>
              <option value="August 2026">August 2026 (Archived)</option>
              <option value="July 2026">July 2026 (Archived)</option>
            </select>
          </div>

          {/* 4 Report Packages Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Monthly Workforce */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <FileSpreadsheet className="w-6 h-6 text-[#142B52]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Monthly Workforce Information</h3>
                  <p className="text-[11px] text-slate-500">34 active outsourced personnel across 6 departments</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Roster breakdown, headcount stability, deployment dates, and job classification details for Establishment audit.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleExportWorkforce}
                  className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Excel (CSV)</span>
                </button>
                <button
                  onClick={handlePrintWorkforce}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Card 2: Service Level Performance */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <FileSpreadsheet className="w-6 h-6 text-[#008F88]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Service Performance Evaluation</h3>
                  <p className="text-[11px] text-slate-500">10 Section 3.7 indicators & compliance rates</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turnaround metrics on candidate nominations, emergency replacements, 4-hour escalations, and 48-hour certificates.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Link
                  href="/supplier/performance"
                  className="px-4 py-2 bg-[#008F88] hover:bg-[#00736D] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Inspect & Export Scorecard</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Document Expiry Compliance */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <FileSpreadsheet className="w-6 h-6 text-amber-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Document & Visa Renewal Audit</h3>
                  <p className="text-[11px] text-slate-500">30-day proactive expiry tracking log</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compliance report for UAE residence visas, Emirates IDs, labor contracts, and medical fitness renewals.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Link
                  href="/supplier/documents"
                  className="px-4 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Open Renewal Registry</span>
                </Link>
              </div>
            </div>

            {/* Card 4: Cost & Invoicing Summary */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Monthly Outsourcing Invoicing</h3>
                  <p className="text-[11px] text-slate-500">Contractual billing for 34 specialists</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Itemized monthly remuneration, management fee rate breakdown, and WPS compliance confirmation hash.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => alert('Exporting WPS Invoicing Breakdown for September 2026 (AED 1,275,000)')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoicing Summary</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
