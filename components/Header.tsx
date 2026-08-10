'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, X, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onSelectMenuView?: (view: 'restaurant' | 'banquet' | 'lunch') => void;
  darkText?: boolean;
}

export default function Header({ onOpenBooking, onSelectMenuView, darkText = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMenuPath, setIsMenuPath] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/menu')) {
      setIsMenuPath(true);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubMenuClick = (view: 'restaurant' | 'banquet' | 'lunch') => {
    if (onSelectMenuView) {
      onSelectMenuView(view);
    }
    if (view === 'banquet') {
      if (typeof window !== 'undefined') {
        window.location.href = '/greek-feast';
      }
      return;
    }
    if (view === 'lunch') {
      if (typeof window !== 'undefined') {
        window.location.href = '/lunch-specials';
      }
      return;
    }
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/menu')) {
      window.location.href = `/menu?view=${view}`;
    } else {
      const el = document.getElementById('menu');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const useWhiteHeader = scrolled || isMenuPath || darkText;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useWhiteHeader
            ? 'bg-white border-b border-gray-100 shadow-xs py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0 cursor-pointer">
            <Image
              src="/images/logo-bg.png"
              alt="Opa Bar + Mezze"
              width={100}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            
            {/* Menu item with Hover Dropdown */}
            <div className="relative group py-2">
              <span
                className={`text-sm font-semibold tracking-wide flex items-center gap-1 cursor-default select-none transition-colors group-hover:text-mint min-h-[44px] ${
                  useWhiteHeader ? 'text-charcoal' : 'text-white'
                }`}
              >
                Menu
                <ChevronDown className="w-3.5 h-3.5 text-mint opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </span>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50 animate-in fade-in duration-150">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 px-1 min-w-[260px] space-y-1">
                  <button
                    type="button"
                    onClick={() => handleSubMenuClick('restaurant')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer block min-h-[44px]"
                  >
                    Restaurant Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubMenuClick('banquet')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer block min-h-[44px]"
                  >
                    First In Greek Feast Banquet $64
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubMenuClick('lunch')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer block min-h-[44px]"
                  >
                    Lunch Specials
                  </button>
                </div>
              </div>
            </div>

            {/* Other Nav Links */}
            <Link
              href="/private-room"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-mint cursor-pointer flex items-center min-h-[44px] ${
                useWhiteHeader ? 'text-charcoal' : 'text-white'
              }`}
            >
              Private Room
            </Link>
            <Link
              href="/functions"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-mint cursor-pointer flex items-center min-h-[44px] ${
                useWhiteHeader ? 'text-charcoal' : 'text-white'
              }`}
            >
              Functions
            </Link>

            {/* Gift Vouchers hover dropdown */}
            <div className="relative group py-2">
              <span
                className={`text-sm font-semibold tracking-wide flex items-center gap-1 cursor-default select-none transition-colors group-hover:text-mint min-h-[44px] ${
                  useWhiteHeader ? 'text-charcoal' : 'text-white'
                }`}
              >
                Gift Vouchers
                <ChevronDown className="w-3.5 h-3.5 text-mint opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </span>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50 animate-in fade-in duration-150">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 px-1 min-w-[240px] space-y-1">
                  <Link
                    href="/opa-gift-voucher"
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer flex items-center min-h-[44px]"
                  >
                    Opa Gift Voucher
                  </Link>
                  <Link
                    href="/tassis-gift-voucher"
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer flex items-center min-h-[44px]"
                  >
                    Tassis Group Gift Voucher
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/gallery"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-mint cursor-pointer flex items-center min-h-[44px] ${
                useWhiteHeader ? 'text-charcoal' : 'text-white'
              }`}
            >
              Gallery
            </Link>

            {/* Contact hover dropdown */}
            <div className="relative group py-2">
              <span
                className={`text-sm font-semibold tracking-wide flex items-center gap-1 cursor-default select-none transition-colors group-hover:text-mint min-h-[44px] ${
                  useWhiteHeader ? 'text-charcoal' : 'text-white'
                }`}
              >
                Contact
                <ChevronDown className="w-3.5 h-3.5 text-mint opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </span>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full right-0 hidden group-hover:block pt-2 z-50 animate-in fade-in duration-150">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 px-1 min-w-[220px] space-y-1">
                  <Link
                    href="/contact"
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer flex items-center min-h-[44px]"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/careers"
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer flex items-center min-h-[44px]"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/business-opportunities"
                    className="w-full text-left px-4 py-3 text-xs font-semibold text-charcoal hover:bg-mint/10 hover:text-mint rounded-lg transition-colors cursor-pointer flex items-center min-h-[44px]"
                  >
                    Business Opportunities
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Social icons — desktop only (44x44 min touch target) */}
            <div className={`hidden lg:flex items-center gap-1 ${useWhiteHeader ? 'text-charcoal' : 'text-white'}`}>
              <a
                href="https://www.instagram.com/opa_bar_mezze/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 hover:text-mint transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/opabarmezze"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 hover:text-mint transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>

            {/* Bookings Button (High-Contrast text-charcoal on bg-mint & min 44px height) */}
            <button
              onClick={onOpenBooking}
              className="bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-widest min-h-[44px] px-5 sm:px-6 rounded-full shadow-sm hover:shadow transition-all cursor-pointer transform active:scale-95 flex items-center justify-center shrink-0"
            >
              Bookings
            </button>

            {/* Mobile Hamburger Button (44x44 min touch target) */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full cursor-pointer transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 ${
                useWhiteHeader
                  ? 'bg-gray-100 hover:bg-mint/15 text-charcoal hover:text-mint border border-gray-200'
                  : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/logo-bg.png"
                alt="Opa Bar + Mezze"
                width={90}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-charcoal hover:text-mint hover:bg-gray-100 p-2 rounded-full transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col overflow-y-auto px-8 py-6 gap-3">
            <span className="text-xs uppercase font-bold text-[#c5a882] tracking-wider block">Menu Pages</span>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSubMenuClick('restaurant');
              }}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Restaurant Menu
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSubMenuClick('banquet');
              }}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              First In Greek Feast Banquet $64
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSubMenuClick('lunch');
              }}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Lunch Specials
            </button>

            <div className="h-[1px] bg-gray-100 my-1" />

            <span className="text-xs uppercase font-bold text-[#c5a882] tracking-wider block">Venue & Experience</span>
            <Link
              href="/private-room"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Private Room
            </Link>
            <Link
              href="/functions"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Functions
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Gallery
            </Link>

            <div className="h-[1px] bg-gray-100 my-1" />

            <span className="text-xs uppercase font-bold text-[#c5a882] tracking-wider block">Gift Vouchers</span>
            <Link
              href="/opa-gift-voucher"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Opa Gift Voucher
            </Link>
            <Link
              href="/tassis-gift-voucher"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Tassis Group Gift Voucher
            </Link>

            <div className="h-[1px] bg-gray-100 my-1" />

            <span className="text-xs uppercase font-bold text-[#c5a882] tracking-wider block">Contact & Company</span>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Contact
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Careers
            </Link>
            <Link
              href="/business-opportunities"
              onClick={() => setMobileOpen(false)}
              className="text-left text-lg font-serif text-charcoal hover:text-mint transition-colors cursor-pointer"
            >
              Business Opportunities
            </Link>
          </nav>
          <div className="p-6 space-y-4 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-mint text-white font-bold uppercase tracking-widest py-3.5 rounded text-sm hover:bg-mint-dark transition-colors cursor-pointer"
            >
              Book a Table
            </button>
            <a
              href="tel:0730030000"
              className="flex items-center justify-center gap-2 text-sm text-gray font-medium"
            >
              <Phone className="w-4 h-4 text-mint" />
              (07) 3003 0000
            </a>
          </div>
        </div>
      )}
    </>
  );
}
