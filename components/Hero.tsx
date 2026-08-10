'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Clock, Compass, Star, ArrowRight, ChevronDown, Check, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

const HERO_IMAGES = [
  {
    src: '/images/hero-cocktail.jpg',
    caption: 'Mykonos Sunset Spritz & Artisanal Ouzo Cocktails',
  },
  {
    src: '/images/hero.jpg',
    caption: 'Panoramic Brisbane River & Story Bridge Terrace',
  },
  {
    src: '/images/saganaki.jpg',
    caption: 'Wood-Fired Hellenic Gastronomy & Mezze Feasts',
  },
];

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
  { value: '18:30', label: '6:30 PM (Dinner)' },
  { value: '19:00', label: '7:00 PM (Dinner Peak)' },
  { value: '20:00', label: '8:00 PM (Late Dinner)' },
  { value: '20:30', label: '8:30 PM (Late Dinner)' },
];

const AREA_OPTIONS = [
  {
    value: 'Riverside Terrace',
    label: 'Riverside Terrace (Outdoor)',
    sub: 'Open-air dining with Story Bridge vistas',
  },
  {
    value: 'Main Dining Room',
    label: 'Main Dining Room (Indoor)',
    sub: 'Greek island pavilion with hearth views',
  },
  {
    value: 'Cocktail Bar Lounge',
    label: 'Cocktail Bar Lounge',
    sub: 'Intimate marble bar & lounge seating',
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Active Dropdowns State
  const [openDropdown, setOpenDropdown] = useState<'guests' | 'date' | 'time' | 'area' | null>(null);

  // Booking selections
  const [guests, setGuests] = useState(2);
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);
  const [time, setTime] = useState('19:00');
  const [area, setArea] = useState('Riverside Terrace');

  // Calendar State
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const barRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDropdown(null);
    onOpenBooking();
  };

  // Date Formatting Helper
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  // Calendar Days calculation
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
    setSelectedDateStr(newDateStr);
    setOpenDropdown(null);
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal pt-28 pb-10">
      {/* Background Image Carousel Slider */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {HERO_IMAGES.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050e18] via-[#050e18]/50 to-[#050e18]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050e18]/70 via-transparent to-[#050e18]/50" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-2xl space-y-6 animate-fade-in-up">

          {/* Slide Indicator Control Pill Badge directly above Heading with Top Gap */}
          <div className="inline-flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg mt-6 sm:mt-8">
            {/* Animated Progress Indicators */}
            <div className="flex items-center gap-1.5 px-1">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentSlide ? 'w-6 bg-mint' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Icon Button */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer ml-0.5"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
              )}
            </button>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-0.5 border-l border-white/20 pl-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-7 h-7 rounded-full hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-7 h-7 rounded-full hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimal Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-light tracking-wide">
              Greek Passion Meets{' '}
              <span className="italic text-mint font-serif font-normal block sm:inline">
                Riverside Luxury
              </span>
            </h1>

            <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-lg">
              Authentic Mediterranean gastronomy overlooking the Brisbane River & Story Bridge.
            </p>
          </div>

          {/* Google Reviews Badge Strip */}
          <div className="inline-flex items-center gap-3 bg-[#000000]/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 cursor-default shadow-lg">
            {/* 5 Yellow Stars */}
            <div className="flex items-center text-[#ffab00] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ffab00]" />
              ))}
            </div>

            {/* Rating Number */}
            <span className="font-bold text-white text-sm tracking-tight">4.9</span>

            {/* Google Circled 'G' Badge */}
            <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              G
            </div>

            {/* Review count text */}
            <span className="text-xs text-white/90 font-medium">
              Based on 700+ Google Reviews
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={onOpenBooking}
              className="bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-widest min-h-[44px] px-7 py-3 rounded-full shadow-xl transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Calendar className="w-4 h-4 text-charcoal" />
              <span>Reserve Table</span>
            </button>

            <a
              href="#menu"
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-widest min-h-[44px] px-7 py-3 rounded-full backdrop-blur-md border border-white/30 transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>View Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Floating Quick Reservation Widget Bar with Custom Dropdowns */}
      <div ref={barRef} className="relative z-30 max-w-6xl mx-auto px-5 sm:px-8 w-full mt-6">
        <form
          onSubmit={handleQuickBook}
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end"
        >
          {/* GUESTS CUSTOM DROPDOWN */}
          <div className="relative space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3 text-mint" />
              Guests
            </label>
            
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
              className="w-full min-h-[44px] bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:ring-2 focus:ring-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
            >
              <span>{GUEST_OPTIONS.find((g) => g.value === guests)?.label || `${guests} Guests`}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 ${openDropdown === 'guests' ? 'rotate-180 text-mint' : ''}`} />
            </button>

            {/* Guests Popover (Scrollbar hidden with no-scrollbar class) */}
            {openDropdown === 'guests' && (
              <div className="absolute left-0 bottom-full mb-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 max-h-60 overflow-y-auto no-scrollbar">
                {GUEST_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setGuests(option.value);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-3 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer min-h-[44px] ${
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

          {/* DATE CUSTOM CALENDAR DROPDOWN */}
          <div className="relative space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-mint" />
              Date
            </label>

            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
              className="w-full min-h-[44px] bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:ring-2 focus:ring-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
            >
              <span>{formatDateDisplay(selectedDateStr)}</span>
              <Calendar className="w-3.5 h-3.5 text-gray" />
            </button>

            {/* Calendar Popover */}
            {openDropdown === 'date' && (
              <div className="absolute left-0 bottom-full mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                {/* Month Nav Header */}
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-charcoal">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-charcoal transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
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
                  {/* Empty cells for padding */}
                  {[...Array(firstDayIndex)].map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}

                  {/* Day Buttons */}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const dayNum = i + 1;
                    const mm = String(calMonth + 1).padStart(2, '0');
                    const dd = String(dayNum).padStart(2, '0');
                    const checkStr = `${calYear}-${mm}-${dd}`;
                    const isSelected = selectedDateStr === checkStr;
                    const isToday = todayStr === checkStr;

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => handleSelectDay(dayNum)}
                        className={`h-8 w-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer mx-auto ${
                          isSelected
                            ? 'bg-mint text-charcoal font-bold shadow-md'
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

          {/* TIME CUSTOM DROPDOWN */}
          <div className="relative space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-mint" />
              Time
            </label>

            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
              className="w-full min-h-[44px] bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:ring-2 focus:ring-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
            >
              <span className="truncate">{TIME_OPTIONS.find((t) => t.value === time)?.label || time}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 shrink-0 ${openDropdown === 'time' ? 'rotate-180 text-mint' : ''}`} />
            </button>

            {/* Time Popover (Scrollbar hidden with no-scrollbar class) */}
            {openDropdown === 'time' && (
              <div className="absolute left-0 bottom-full mb-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 max-h-60 overflow-y-auto no-scrollbar">
                {TIME_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTime(option.value);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-3 text-xs text-left font-medium flex items-center justify-between hover:bg-mint/10 hover:text-mint transition-colors cursor-pointer min-h-[44px] ${
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

          {/* SEATING AREA CUSTOM DROPDOWN */}
          <div className="relative space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray tracking-wider flex items-center gap-1">
              <Compass className="w-3 h-3 text-mint" />
              Seating Area
            </label>

            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'area' ? null : 'area')}
              className="w-full min-h-[44px] bg-white text-charcoal rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-gray-200 focus:border-mint focus:ring-2 focus:ring-mint focus:outline-none flex items-center justify-between cursor-pointer hover:border-mint transition-colors shadow-xs"
            >
              <span className="truncate">{area}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray transition-transform duration-200 shrink-0 ${openDropdown === 'area' ? 'rotate-180 text-mint' : ''}`} />
            </button>

            {/* Seating Area Popover (Scrollbar hidden with no-scrollbar class) */}
            {openDropdown === 'area' && (
              <div className="absolute left-0 bottom-full mb-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 max-h-60 overflow-y-auto no-scrollbar">
                {AREA_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setArea(option.value);
                      setOpenDropdown(null);
                    }}
                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer flex items-start justify-between min-h-[44px] ${
                      area === option.value
                        ? 'bg-mint/15 border border-mint/30 text-mint font-bold'
                        : 'hover:bg-gray-50 text-charcoal'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold block">{option.label}</span>
                      <span className="text-[10px] text-gray-500 font-normal block mt-0.5">{option.sub}</span>
                    </div>
                    {area === option.value && <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className="w-full bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] h-11 active:scale-95"
            >
              <span>Find Table</span>
              <ArrowRight className="w-4 h-4 text-charcoal" />
            </button>
          </div>
        </form>
      </div>

    </section>
  );
}
