'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Calendar, Clock, Users, ChevronDown, ChevronLeft, ChevronRight, Check, CheckCircle } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TIME_SLOTS = [
  '11:30 AM', '12:30 PM', '2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM', '8:30 PM'
];

const GUEST_SLOTS = [
  { value: '15-30 guests', label: '15 – 30 guests (Private Room)' },
  { value: '40-65 guests', label: '40 – 65 guests (Bar Area)' },
  { value: '150-160 guests', label: '150 – 160 guests (Full Restaurant)' },
  { value: 'Bespoke Group', label: 'Other / Bespoke Group Size' },
];

export default function FunctionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: todayStr,
    time: '12:30 PM',
    guests: '15-30 guests',
    budget: '',
    notes: '',
  });

  // Custom Dropdown Popover States
  const [openDropdown, setOpenDropdown] = useState<'date' | 'time' | 'guests' | null>(null);

  // Calendar State
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpaces = () => {
    const el = document.getElementById('function-spaces');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Calendar Helper
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    const mm = String(calMonth + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    const newDateStr = `${calYear}-${mm}-${dd}`;
    setFormData((prev) => ({ ...prev, date: newDateStr }));
    setOpenDropdown(null);
  };

  return (
    <>
      <Header onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white">
        {/* Hero Banner with img-7.webp */}
        <section className="relative h-[65vh] min-h-[500px] sm:min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img-7.webp"
              alt="Opa Bar Function Packages"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-black/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6 pt-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-widest uppercase text-white">
              FUNCTION PACKAGES
            </h1>
            <div className="w-20 h-[2.5px] bg-[#8b6838] mx-auto rounded-full" />
            <p className="text-sm sm:text-lg font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
              Celebrate your next event in style – enjoy greek fare and fresh air in a relaxing atmosphere by the river side.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#enquiry-form"
                className="w-full sm:w-auto bg-mint hover:bg-mint-dark text-charcoal uppercase text-xs tracking-widest font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Inquire Now
              </a>
              <a
                href="#function-spaces"
                className="w-full sm:w-auto bg-[#8b6838] hover:bg-[#72542c] text-white uppercase text-xs tracking-widest font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Explore Venues
              </a>
            </div>
          </div>
        </section>

        {/* Curved Wave Mask Overlay matching bg-[#0b1a28] */}
        <div className="relative z-10 -mt-12 sm:-mt-20 leading-none pointer-events-none">
          <svg
            className="w-full h-12 sm:h-20 text-[#0b1a28] fill-current"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
          </svg>
        </div>

        {/* Intro Section */}
        <section className="bg-[#0b1a28] text-white pt-2 pb-14 sm:pb-20 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base sm:text-xl font-light leading-relaxed text-white">
              At Opa we&apos;re here to serve your needs, whether you&apos;re planning a gathering for a big group, a special event, or a casual get-together. We&apos;re ready to cater to your unique requirements to make your celebration one to remember.
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#7ec8b5]">
              Don&apos;t hesitate to reach out for further details or bespoke requests.
            </p>
          </div>
        </section>

        {/* Function Spaces Section */}
        <section id="function-spaces" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-12 space-y-24">
          
          {/* Space 1: Private Dining Room (CONTENT LEFT, IMAGE RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Column Left */}
            <div className="lg:col-span-6 space-y-6 text-charcoal">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8b6838] block">
                Small Event (15–30 guests)
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mint">
                Private Dining Room
              </h2>
              <p className="text-sm sm:text-base font-light text-gray-700 leading-relaxed">
                Dine with views of the Story Bridge and Brisbane River. Banquet menu, Beverage package, bottle service or bar tab.
              </p>
              <p className="text-xs font-semibold text-gray-500 italic">*Minimum spend applies</p>
              <div>
                <button
                  type="button"
                  onClick={scrollToEnquiry}
                  className="bg-mint hover:bg-mint-dark text-charcoal uppercase text-xs tracking-widest font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  ENQUIRE
                </button>
              </div>
            </div>

            {/* Image Column Right */}
            <div className="lg:col-span-6">
              <div className="relative h-[320px] sm:h-[420px] w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/img-8.webp"
                  alt="Private Dining Room Floor Plan"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-100" />

          {/* Space 2: Bar Area (IMAGE LEFT, CONTENT RIGHT) - EXACT MATCH FOR USER SCREENSHOT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-[320px] sm:h-[420px] w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/img-9.webp"
                  alt="Bar Area Function Floor Plan"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Text Column Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-charcoal">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8b6838] block">
                MAIN DINING ROOM BUYOUT
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                Hellenic Grand Dining Room
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Immerse your guests in authentic Aegean hospitality. Complete indoor dining space with custom layout possibilities, hearth views, and high-capacity staging.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pt-2">
                <li>&bull; Seated Capacity: Up to 120 guests</li>
                <li>&bull; Cocktail Standing: Up to 220 guests</li>
                <li>&bull; Feature: Full private bar access & dedicated floor service</li>
              </ul>
              <div className="pt-2">
                <a
                  href="#enquiry-form"
                  className="bg-mint hover:bg-mint-dark text-charcoal uppercase text-xs tracking-widest font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>Book Grand Room</span>
                  <ChevronRight className="w-4 h-4 text-charcoal" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-100" />

          {/* Space 3: Full Restaurant (CONTENT LEFT, IMAGE RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Column Left */}
            <div className="lg:col-span-6 space-y-6 text-charcoal">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8b6838] block">
                Large Event (150–160 guests)
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mint">
                Full Restaurant
              </h2>
              <p className="text-sm sm:text-base font-light text-gray-700 leading-relaxed">
                Exclusive use of the full venue. Your guests will be seated in groups utilizing our booths and tables. Bespoke furniture layouts available on request. Banquet menu, Beverage package, bottle service or bar tab.
              </p>
              <p className="text-xs font-semibold text-gray-500 italic">*Minimum spend applies</p>
              <div>
                <button
                  type="button"
                  onClick={scrollToEnquiry}
                  className="bg-mint hover:bg-mint-dark text-charcoal uppercase text-xs tracking-widest font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  ENQUIRE
                </button>
              </div>
            </div>

            {/* Image Column Right */}
            <div className="lg:col-span-6">
              <div className="relative h-[320px] sm:h-[420px] w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/img-10.webp"
                  alt="Full Restaurant Function Floor Plan"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>

        </section>

        {/* Special Event Corporate Buyout Banner — Contained Rounded Card */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
          <div className="bg-[#0b1a28] text-white py-12 px-8 sm:px-12 rounded-3xl shadow-2xl border border-gray-800 text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Planning a Special Event or Corporate Buyout?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-light max-w-xl mx-auto leading-relaxed">
              Our dedicated events team handles every detail — from custom banquet menus to audiovisual technology and beverage pairing.
            </p>
          </div>
        </div>

        {/* Booking Enquiries Form Section WITH CUSTOM CALENDAR & POPOVERS */}
        <section id="enquiry-form" className="bg-mint/15 border-t border-b border-mint/20 py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {submitted ? (
              <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-4 border border-mint/30 animate-fade-in-up">
                <CheckCircle className="w-12 h-12 text-mint mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-charcoal">Enquiry Received!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out. Our functions manager will contact you within one business day to confirm your event details.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#8b6838] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#72542c] transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-5 border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      FIRST NAME <span className="text-mint">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. John"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      LAST NAME <span className="text-mint">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Smith"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      PHONE <span className="text-mint">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0400 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      EMAIL <span className="text-mint">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>
                </div>

                {/* 3 CUSTOM POPOVER DROPDOWNS (DATE CALENDAR, TIME, GUESTS) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-30">
                  
                  {/* DATE OF FUNCTION — CUSTOM CALENDAR PICKER */}
                  <div className="relative space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      DATE OF FUNCTION <span className="text-mint">*</span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                      className="w-full bg-white text-charcoal rounded-xl px-4 py-3 text-sm font-medium border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors"
                    >
                      <span>{formatDateDisplay(formData.date)}</span>
                      <Calendar className="w-4 h-4 text-mint" />
                    </button>

                    {/* Calendar Popover */}
                    {openDropdown === 'date' && (
                      <div className="absolute left-0 bottom-full mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1 rounded-lg hover:bg-gray-100 text-charcoal transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-charcoal">
                            {MONTH_NAMES[calMonth]} {calYear}
                          </span>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1 rounded-lg hover:bg-gray-100 text-charcoal transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 mb-1">
                          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {[...Array(firstDayIndex)].map((_, i) => (
                            <div key={`pad-${i}`} />
                          ))}

                          {[...Array(daysInMonth)].map((_, i) => {
                            const dayNum = i + 1;
                            const mm = String(calMonth + 1).padStart(2, '0');
                            const dd = String(dayNum).padStart(2, '0');
                            const checkStr = `${calYear}-${mm}-${dd}`;
                            const isSelected = formData.date === checkStr;

                            return (
                              <button
                                key={dayNum}
                                type="button"
                                onClick={() => handleSelectDay(dayNum)}
                                className={`h-7 w-7 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer mx-auto ${
                                  isSelected
                                    ? 'bg-mint text-white font-bold shadow-md'
                                    : 'text-charcoal hover:bg-mint/15 hover:text-mint'
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TIME OF FUNCTION — CUSTOM POPOVER */}
                  <div className="relative space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      TIME OF FUNCTION
                    </label>

                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
                      className="w-full bg-white text-charcoal rounded-xl px-4 py-3 text-sm font-medium border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors"
                    >
                      <span className="truncate">{formData.time || 'Select time'}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === 'time' ? 'rotate-180 text-mint' : ''}`} />
                    </button>

                    {/* Time Popover */}
                    {openDropdown === 'time' && (
                      <div className="absolute left-0 bottom-full mb-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 max-h-56 overflow-y-auto no-scrollbar">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, time: t });
                              setOpenDropdown(null);
                            }}
                            className={`w-full px-4 py-2 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer ${
                              formData.time === t ? 'bg-mint/15 text-mint font-bold' : 'text-charcoal'
                            }`}
                          >
                            <span>{t}</span>
                            {formData.time === t && <Check className="w-3.5 h-3.5 text-mint" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* GUESTS COUNT — CUSTOM POPOVER */}
                  <div className="relative space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      GUESTS COUNT
                    </label>

                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
                      className="w-full bg-white text-charcoal rounded-xl px-4 py-3 text-sm font-medium border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors"
                    >
                      <span className="truncate">{formData.guests || 'Select count'}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === 'guests' ? 'rotate-180 text-mint' : ''}`} />
                    </button>

                    {/* Guests Popover */}
                    {openDropdown === 'guests' && (
                      <div className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 max-h-60 overflow-y-auto no-scrollbar">
                        {GUEST_SLOTS.map((g) => (
                          <button
                            key={g.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, guests: g.value });
                              setOpenDropdown(null);
                            }}
                            className={`w-full px-4 py-2.5 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer ${
                              formData.guests === g.value ? 'bg-mint/15 text-mint font-bold' : 'text-charcoal'
                            }`}
                          >
                            <span>{g.label}</span>
                            {formData.guests === g.value && <Check className="w-3.5 h-3.5 text-mint shrink-0" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    APPROXIMATE BUDGET
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. $2,000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ANY OTHER NOTES?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us more about your event..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                </div>

                <div className="text-right pt-2">
                  <button
                    type="submit"
                    className="bg-[#8b6838] hover:bg-[#72542c] text-white uppercase text-xs tracking-widest font-bold px-10 py-4 rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px]"
                  >
                    Submit Function Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
