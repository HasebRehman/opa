'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100">
      {/* Main 3-Column Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-left">
          
          {/* COLUMN 1: Logo & Brand Text */}
          <div className="space-y-5">
            <a href="#" className="inline-block shrink-0 cursor-pointer">
              <Image
                src="/images/logo-bg.png"
                alt="Opa Bar + Mezze Logo"
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-sm">
              Brisbane&apos;s Premier Greek Riverside Destination. Overlooking the Brisbane River and Story Bridge, Opa Bar + Mezze offers authentic Hellenic gastronomy in a beautiful waterfront setting.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/opa_bar_mezze/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-mint text-white flex items-center justify-center hover:bg-mint-dark transition-all hover:scale-110 shadow-md cursor-pointer"
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
                className="w-9 h-9 rounded-full bg-mint text-white flex items-center justify-center hover:bg-mint-dark transition-all hover:scale-110 shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Navigation & Website Content */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base uppercase font-bold text-[#c5a882] tracking-wider block">
              Navigation & Content
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-light">
              <li>
                <a href="#about" className="hover:text-mint transition-colors cursor-pointer block">Our Hellenic Story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-mint transition-colors cursor-pointer block">Mezze & Banquets Menu</a>
              </li>
              <li>
                <a href="#functions" className="hover:text-mint transition-colors cursor-pointer block">Functions & Private Dining</a>
              </li>
              <li>
                <a href="#favourites" className="hover:text-mint transition-colors cursor-pointer block">Crowd Favourites</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-mint transition-colors cursor-pointer block">Reserve a Table</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-mint transition-colors cursor-pointer block">Gift Vouchers</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Location & Trading Hours */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base uppercase font-bold text-[#c5a882] tracking-wider block">
              Location & Hours
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal block">123 Eagle Street, Brisbane Q 4000</span>
                  <span className="text-gray-500 text-xs">Riverside Centre</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-mint shrink-0" />
                <span>Ph: </span>
                <a href="tel:0730030000" className="font-semibold text-charcoal hover:text-mint transition-colors underline underline-offset-2 cursor-pointer">
                  (07) 3003 0000
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal block uppercase text-xs">Open 7 Days</span>
                  <span className="text-gray-600 text-xs">All Day Dining, 11:00am – late</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100">
                <a href="#contact" className="hover:text-mint transition-colors cursor-pointer">Careers</a>
                <span>•</span>
                <a href="#contact" className="hover:text-mint transition-colors cursor-pointer">Business Enquiries</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-6 px-6 sm:px-8 text-center text-[11px] text-gray-500 space-y-2">
        <p>
          10% Weekend surcharge (15% on Public Holidays). Card payment is accepted — no cash.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
          <p>© {new Date().getFullYear()} Opa Bar + Mezze. All rights reserved.</p>
          <span>•</span>
          <a href="#" className="hover:text-mint transition-colors cursor-pointer">Privacy Policy</a>
          <span>•</span>
          <p>Branding & Design by Alto Creative</p>
        </div>
      </div>
    </footer>
  );
}
