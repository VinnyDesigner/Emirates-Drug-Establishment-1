'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import {
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function NewAirTicketRequestPage() {
  const router = useRouter();
  const { submitAirTicketRequest } = useAppStore();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [benefitType, setBenefitType] = useState<'Annual Home Leave' | 'Family Vacation' | 'Relocation Flight'>('Annual Home Leave');
  const [origin, setOrigin] = useState('Abu Dhabi (AUH)');
  const [destination, setDestination] = useState('Amman (AMM)');
  const [departureDate, setDepartureDate] = useState('2026-12-15');
  const [returnDate, setReturnDate] = useState('2027-01-05');
  const [passengersCount, setPassengersCount] = useState(1);
  const [remarks, setRemarks] = useState('Direct flight requested.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAirTicketRequest({
      benefitType,
      origin,
      destination,
      departureDate,
      returnDate,
      passengersCount,
      employeeRemarks: remarks,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/employee/air-tickets');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'طلب تذكرة طيران جديدة' : 'New Air Ticket Requisition'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'تذاكر الطيران' : 'Air Tickets', href: '/employee/air-tickets' },
            { label: isAr ? 'طلب جديد' : 'New Request' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/employee/air-tickets"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'طلب إصدار تذكرة طيران جديدة' : 'New Air Ticket Requisition'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'حجز مخصص تذكرة السفر التعاقدية السنوية لقضاء الإجازة أو سفر الانتقال.'
                  : 'Book your contractual annual flight ticket allowance or relocation travel.'}
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isAr ? 'تم إرسال طلب تذكرة السفر بنجاح' : 'Air Ticket Request Submitted'}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isAr
                  ? 'تم توجيه طلبك إلى مكتب سفر المزوّد للحصول على أفضل الأسعار وإصدار التذكرة. جاري تحويلك...'
                  : 'Your flight requisition has been routed to the Supplier Travel Desk for fare quotation and ticket issuance. Redirecting...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'فئة الاستحقاق' : 'Benefit Category'}
                </label>
                <select
                  value={benefitType}
                  onChange={(e) => setBenefitType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                >
                  <option value="Annual Home Leave">
                    {isAr ? 'إجازة الوطن السنوية التعاقدية' : 'Annual Contractual Home Leave Flight'}
                  </option>
                  <option value="Family Vacation">
                    {isAr ? 'إجازة عائلية' : 'Family Vacation Benefit'}
                  </option>
                  <option value="Relocation Flight">
                    {isAr ? 'سفر استقدام / انتقال' : 'Initial Relocation / Repatriation'}
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'مطار المغادرة' : 'Origin Airport'}
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'مطار الوصول' : 'Destination Airport'}
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'تاريخ المغادرة' : 'Departure Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'تاريخ العودة' : 'Return Date'}
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'عدد المسافرين' : 'Passenger Count'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(parseInt(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'ملاحظات وتفضيلات المسار' : 'Route Preferences'}
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#2463A6] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Link
                  href="/employee/air-tickets"
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  {isAr ? 'تأكيد وإرسال الطلب' : 'Submit Requisition'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
