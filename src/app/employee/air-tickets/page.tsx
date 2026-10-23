'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  Plane,
  PlusCircle,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function AirTicketsPage() {
  const { airTickets, submitAirTicketRequest } = useAppStore();
  const { t, language } = useI18n();
  const isAr = language === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [benefitType, setBenefitType] = useState<'Annual Home Leave' | 'Family Vacation' | 'Relocation Flight'>('Annual Home Leave');
  const [origin, setOrigin] = useState('Abu Dhabi (AUH)');
  const [destination, setDestination] = useState('Cairo (CAI)');
  const [departureDate, setDepartureDate] = useState('2026-12-20');
  const [returnDate, setReturnDate] = useState('2027-01-05');
  const [passengersCount, setPassengersCount] = useState(3);
  const [remarks, setRemarks] = useState('Direct Emirates/Etihad routing requested.');
  const [submitted, setSubmitted] = useState(false);

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
    setShowForm(false);
    setSubmitted(true);
  };

  const benefitTypeAr: Record<string, string> = {
    'Annual Home Leave': 'إجازة الوطن السنوية (تعاقدية)',
    'Family Vacation': 'إجازة عائلية',
    'Relocation Flight': 'تذكرة انتقال / استقدام',
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[#F5F7FB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 transition-all">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={isAr ? 'تذاكر السفر ومستحقات الانتقال' : 'Air Tickets & Travel Entitlements'}
          breadcrumbs={[
            { label: isAr ? 'البوابة' : 'Portal', href: '/employee/dashboard' },
            { label: isAr ? 'تذاكر الطيران' : 'Air Tickets' },
          ]}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#142B52]">
                {isAr ? 'مستحقات وحجوزات تذاكر السفر السنوية' : 'Air Travel Entitlements & Bookings'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'مخصصات تذاكر السفر السنوية لقضاء الإجازة، مسارات الرحلات، وتأكيدات الحجز الإلكتروني (PNR).'
                  : 'Annual vacation flight allowances, travel itineraries, and PNR booking confirmations.'}
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2.5 rounded-xl bg-[#142B52] hover:bg-[#0E1F3D] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {showForm
                  ? (isAr ? 'إغلاق النموذج' : 'Close Form')
                  : (isAr ? 'طلب حجز تذكرة سفر' : 'Request Flight Booking')}
              </span>
            </button>
          </div>

          {/* Entitlement Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'مخصص التذاكر السنوي' : 'Annual Ticket Allocation'}
              </span>
              <p className="text-2xl font-black text-[#142B52]">
                {isAr ? 'تذكرة ذهاب وعودة / سنة' : '1 Roundtrip / Year'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'الموظف، الزوجة، وحتى طفلين معالين' : 'Employee, Spouse & up to 2 dependent children'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'درجة السفر المستحقة' : 'Cabin Class Entitlement'}
              </span>
              <p className="text-2xl font-black text-emerald-700">
                {isAr ? 'الدرجة السياحية' : 'Economy Class'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'الشروط التعاقدية الموحدة للتعهيد الحكومي' : 'Standard federal outsourcing contractual terms'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isAr ? 'حالة الدورة الحالية' : 'Current Cycle Status'}
              </span>
              <p className="text-2xl font-black text-amber-600">
                {isAr ? 'الطلب قيد المراجعة' : 'Request In Review'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'طلب حجز معلق لدى مكتب سفر المزوّد' : '1 pending booking with supplier travel desk'}
              </p>
            </div>
          </div>

          {/* Request Form Accordion */}
          {showForm && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-[#142B52]">
                  {isAr ? 'تقديم طلب حجز تذكرة طيران' : 'Submit Flight Booking Request'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? 'حدد بيانات خط السير والمواعيد المطلوبة للتنسيق مع وكالة السفر المعتمدة لدى المزوّد.'
                    : 'Provide itinerary details for coordination with the supplier corporate travel agency.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'فئة الاستحقاق' : 'Benefit Type'}
                    </label>
                    <select
                      value={benefitType}
                      onChange={(e) => setBenefitType(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Annual Home Leave">
                        {isAr ? 'إجازة الوطن السنوية (تعاقدية)' : 'Annual Home Leave (Contractual)'}
                      </option>
                      <option value="Family Vacation">
                        {isAr ? 'إجازة عائلية' : 'Family Vacation'}
                      </option>
                      <option value="Relocation Flight">
                        {isAr ? 'تذكرة انتقال / استقدام' : 'Relocation Flight'}
                      </option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'مدينة / مطار المغادرة' : 'Origin City / Airport'}
                    </label>
                    <input
                      type="text"
                      required
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'مدينة / مطار الوصول' : 'Destination City / Airport'}
                    </label>
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'تاريخ المغادرة المفضل' : 'Preferred Departure Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'تاريخ العودة المفضل' : 'Preferred Return Date'}
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isAr ? 'عدد المسافرين' : 'Passenger Count'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      required
                      value={passengersCount}
                      onChange={(e) => setPassengersCount(parseInt(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    {isAr ? 'تفضيلات الناقل الجوي والمسار' : 'Airline / Route Preferences'}
                  </label>
                  <textarea
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={isAr ? 'مثال: رحلة مباشرة على طيران الإمارات أو الاتحاد...' : 'e.g. Direct Emirates/Etihad routing requested...'}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#142B52] hover:bg-[#0E1F3D] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {isAr ? 'إرسال طلب الحجز' : 'Submit Booking Request'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {isAr ? 'سجل طلبات التذاكر والحجوزات السابقة' : 'Flight Request History & Status'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-3">{isAr ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-3">{isAr ? 'فئة المخصص' : 'Benefit Type'}</th>
                    <th className="py-3">{isAr ? 'خط السير (المغادرة ← الوصول)' : 'Route (Origin → Destination)'}</th>
                    <th className="py-3">{isAr ? 'التواريخ' : 'Dates'}</th>
                    <th className="py-3">{isAr ? 'المسافرين' : 'Passengers'}</th>
                    <th className="py-3">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3">{isAr ? 'رمز الحجز (PNR)' : 'PNR Code'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {airTickets.map((tkt) => (
                    <tr key={tkt.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 font-mono font-bold text-[#142B52]">{tkt.requestId}</td>
                      <td className="py-3.5 font-medium">
                        {isAr ? (benefitTypeAr[tkt.benefitType] || tkt.benefitType) : tkt.benefitType}
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800">
                        {tkt.origin} {isAr ? '←' : '→'} {tkt.destination}
                      </td>
                      <td className="py-3.5 text-slate-600">
                        {tkt.departureDate} {tkt.returnDate && ` ${isAr ? 'إلى' : 'to'} ${tkt.returnDate}`}
                      </td>
                      <td className="py-3.5 font-bold">
                        {tkt.passengersCount} {isAr ? 'ركاب' : 'Pax'}
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={tkt.status} />
                      </td>
                      <td className="py-3.5 font-mono font-bold text-emerald-700">
                        {tkt.pnrCode || (isAr ? 'قيد الإصدار' : 'Pending Issue')}
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
