'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Users,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Compass,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUEST_OPTIONS = [
  { value: 1, label: '1 Guest' },
  { value: 2, label: '2 Guests' },
  { value: 3, label: '3 Guests' },
  { value: 4, label: '4 Guests' },
  { value: 5, label: '5 Guests' },
  { value: 6, label: '6 Guests' },
  { value: 7, label: '7 Guests' },
  { value: 8, label: '8 Guests' },
  { value: 10, label: '10 Guests' },
  { value: 12, label: '12 Guests' },
  { value: 15, label: '13+ Guests (Group Function)' },
];

const TIME_OPTIONS = [
  { value: '12:00', label: '12:00 PM (Lunch)' },
  { value: '12:30', label: '12:30 PM (Lunch)' },
  { value: '13:00', label: '1:00 PM (Lunch)' },
  { value: '13:30', label: '1:30 PM (Lunch)' },
  { value: '16:00', label: '4:00 PM (Happy Hour)' },
  { value: '17:00', label: '5:00 PM (Early Dinner)' },
  { value: '17:30', label: '5:30 PM (Sunset)' },
  { value: '18:00', label: '6:00 PM (Dinner)' },
  { value: '18:30', label: '6:30 PM (Dinner)' },
  { value: '19:00', label: '7:00 PM (Peak Dinner)' },
  { value: '19:30', label: '7:30 PM (Peak Dinner)' },
  { value: '20:00', label: '8:00 PM (Late Dinner)' },
  { value: '20:30', label: '8:30 PM (Late Dinner)' },
];

const AREA_OPTIONS = [
  { value: 'Riverside Terrace', label: 'Riverside Terrace (Outdoor)', sub: 'Open-air dining with Story Bridge vistas' },
  { value: 'Main Dining Room', label: 'Main Dining Room (Indoor)', sub: 'Greek island pavilion with hearth views' },
  { value: 'Cocktail Bar Lounge', label: 'Cocktail Bar Lounge', sub: 'Intimate marble bar & lounge seating' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [guests, setGuests] = useState(2);
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('19:00');
  const [area, setArea] = useState('Riverside Terrace');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Dropdowns active state
  const [openDropdown, setOpenDropdown] = useState<'guests' | 'date' | 'time' | 'area' | null>(null);

  // Calendar State
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const modalRef = useRef<HTMLDivElement>(null);

  // Close active dropdown if user clicks outside of dropdown container inside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  // Date Display Formatter
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  // Calendar calculation
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
    setDate(`${calYear}-${mm}-${dd}`);
    setOpenDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDone = () => {
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setOpenDropdown(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl w-full max-w-lg relative shadow-2xl overflow-visible border border-gray-100 my-auto flex flex-col transition-all"
      >
        {/* Header bar */}
        <div className="bg-gradient-to-r from-mint to-[#4fa89a] px-6 py-5 flex items-center justify-between rounded-t-3xl shadow-sm">
          <div>
            <h3 className="text-white font-serif text-2xl tracking-wide font-light">Book a Table</h3>
            <p className="text-xs text-white/85 font-light">Opa Bar + Mezze • Brisbane Riverfront</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* GUESTS & DATE CUSTOM DROPDOWNS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* GUESTS DROPDOWN */}
              <div className="relative space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Users className="w-3.5 h-3.5 text-mint" />
                  Guests
                </label>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
                  className="w-full bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
                >
                  <span>{GUEST_OPTIONS.find((g) => g.value === guests)?.label || `${guests} Guests`}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 ${openDropdown === 'guests' ? 'rotate-180 text-mint' : ''}`} />
                </button>

                {/* Guests Popover */}
                {openDropdown === 'guests' && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-56 overflow-y-auto no-scrollbar">
                    {GUEST_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setGuests(option.value);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer ${
                          guests === option.value ? 'bg-mint/15 text-mint font-bold' : 'text-charcoal'
                        }`}
                      >
                        <span>{option.label}</span>
                        {guests === option.value && <Check className="w-3.5 h-3.5 text-mint" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DATE CALENDAR DROPDOWN */}
              <div className="relative space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <CalendarIcon className="w-3.5 h-3.5 text-mint" />
                  Date
                </label>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                  className="w-full bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
                >
                  <span>{formatDateDisplay(date)}</span>
                  <CalendarIcon className="w-3.5 h-3.5 text-gray" />
                </button>

                {/* Calendar Popover */}
                {openDropdown === 'date' && (
                  <div className="absolute right-0 sm:left-0 top-full mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Month Nav Header */}
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

                    {/* Day Names */}
                    <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray mb-1">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {[...Array(firstDayIndex)].map((_, i) => (
                        <div key={`pad-${i}`} />
                      ))}

                      {[...Array(daysInMonth)].map((_, i) => {
                        const dayNum = i + 1;
                        const mm = String(calMonth + 1).padStart(2, '0');
                        const dd = String(dayNum).padStart(2, '0');
                        const checkStr = `${calYear}-${mm}-${dd}`;
                        const isSelected = date === checkStr;
                        const isToday = todayStr === checkStr;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handleSelectDay(dayNum)}
                            className={`h-7 w-7 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer mx-auto ${
                              isSelected
                                ? 'bg-mint text-white font-bold shadow-md'
                                : isToday
                                ? 'border border-mint text-mint font-bold'
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
            </div>

            {/* TIME & SEATING AREA DROPDOWNS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* TIME DROPDOWN */}
              <div className="relative space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Clock className="w-3.5 h-3.5 text-mint" />
                  Time
                </label>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
                  className="w-full bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
                >
                  <span className="truncate">{TIME_OPTIONS.find((t) => t.value === time)?.label || time}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 shrink-0 ${openDropdown === 'time' ? 'rotate-180 text-mint' : ''}`} />
                </button>

                {/* Time Popover */}
                {openDropdown === 'time' && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-56 overflow-y-auto no-scrollbar">
                    {TIME_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setTime(option.value);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer ${
                          time === option.value ? 'bg-mint/15 text-mint font-bold' : 'text-charcoal'
                        }`}
                      >
                        <span>{option.label}</span>
                        {time === option.value && <Check className="w-3.5 h-3.5 text-mint" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SEATING AREA DROPDOWN */}
              <div className="relative space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Compass className="w-3.5 h-3.5 text-mint" />
                  Seating Area
                </label>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'area' ? null : 'area')}
                  className="w-full bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
                >
                  <span className="truncate">{area}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 shrink-0 ${openDropdown === 'area' ? 'rotate-180 text-mint' : ''}`} />
                </button>

                {/* Seating Area Popover */}
                {openDropdown === 'area' && (
                  <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-56 overflow-y-auto no-scrollbar">
                    {AREA_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setArea(option.value);
                          setOpenDropdown(null);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-start justify-between ${
                          area === option.value
                            ? 'bg-mint/15 border border-mint/30 text-mint font-bold'
                            : 'hover:bg-gray-50 text-charcoal'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{option.label}</span>
                          <span className="text-[10px] text-gray-500 font-normal block mt-0.5">{option.sub}</span>
                        </div>
                        {area === option.value && <Check className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* FULL NAME INPUT */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                <User className="w-3.5 h-3.5 text-mint" />
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:border-mint focus:outline-none transition-colors shadow-xs"
              />
            </div>

            {/* PHONE & EMAIL INPUTS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Phone className="w-3.5 h-3.5 text-mint" />
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="04xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:border-mint focus:outline-none transition-colors shadow-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <Mail className="w-3.5 h-3.5 text-mint" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:border-mint focus:outline-none transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* SPECIAL REQUESTS */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1.5 cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5 text-mint" />
                Special Requests
              </label>
              <textarea
                rows={2}
                placeholder="Dietary requirements, occasion, seating preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:border-mint focus:outline-none transition-colors resize-none shadow-xs"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-mint hover:bg-mint-dark text-white font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-[0.99]"
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-mint/15 text-mint mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9 text-mint" />
            </div>
            <h4 className="text-2xl font-serif text-charcoal font-light">Booking Confirmed</h4>
            <div className="bg-gray-50 p-4 rounded-2xl space-y-1 text-left border border-gray-100 text-xs text-charcoal">
              <p><strong>Guest:</strong> {name}</p>
              <p><strong>Date & Time:</strong> {formatDateDisplay(date)} at {TIME_OPTIONS.find((t) => t.value === time)?.label || time}</p>
              <p><strong>Guests:</strong> {guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
              <p><strong>Area:</strong> {area}</p>
            </div>
            <p className="text-xs text-gray-500">
              A confirmation email has been dispatched to <strong>{email}</strong>.
            </p>
            <button
              onClick={handleDone}
              className="bg-mint hover:bg-mint-dark text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer hover:shadow-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
