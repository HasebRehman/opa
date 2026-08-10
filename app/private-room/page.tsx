'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Users, Wine, UtensilsCrossed, Calendar } from 'lucide-react';

export default function PrivateRoomPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Header onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white">
        {/* Hero Banner with img-5.webp */}
        <section className="relative h-[60vh] min-h-[480px] sm:min-h-[560px] w-full flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img-5.webp"
              alt="Opa Bar Private Dining Room"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-black/30" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4 pt-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-widest uppercase text-white">
              PRIVATE ROOM
            </h1>
            <div className="w-20 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-sm sm:text-lg font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
              Celebrate your next event in style – enjoy greek fare and fresh air in a relaxing atmosphere by the river side.
            </p>
          </div>

          {/* Bottom Curved Wave Mask */}
          <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
            <svg
              className="w-full h-12 sm:h-20 text-white fill-current"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
            >
              <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
            </svg>
          </div>
        </section>

        {/* Content & Floorplan Section with img-6.webp */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-8 text-charcoal">
              
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a882] block">
                  EXCLUSIVE EVENT SPACE
                </span>
                <p className="text-lg sm:text-2xl font-serif font-light text-charcoal leading-relaxed">
                  The Private Dining Room is an exclusive space set apart from the main restaurant, offering views of the Story Bridge and Brisbane River and a hosting capacity of <strong className="font-semibold text-mint">15–30 guests</strong>.
                </p>
              </div>

              {/* Service Features Grid */}
              <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-gray-100">
                <div className="flex items-center gap-3 p-3 bg-mint/5 rounded-xl border border-mint/20">
                  <UtensilsCrossed className="w-5 h-5 text-mint shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal">Banquet Menus</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-mint/5 rounded-xl border border-mint/20">
                  <Wine className="w-5 h-5 text-mint shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal">Beverage Packages</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-mint/5 rounded-xl border border-mint/20">
                  <Users className="w-5 h-5 text-mint shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal">15 – 30 Capacity</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-mint/5 rounded-xl border border-mint/20">
                  <Calendar className="w-5 h-5 text-mint shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal">7 Days Available</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-500 italic">
                <p>Bottle service or Bar tab options available.</p>
                <p className="font-medium text-gray-600">*Minimum spend applies</p>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="bg-[#c5a882] hover:bg-[#b0936e] text-white uppercase text-xs sm:text-sm tracking-widest font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer inline-block"
                >
                  ENQUIRE
                </button>
              </div>

            </div>

            {/* Right Floor Plan Image Column with img-6.webp */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-2">
                  ROOM LAYOUT & FLOOR PLAN
                </span>
              </div>

              <div className="relative h-[340px] sm:h-[450px] w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/img-6.webp"
                  alt="Opa Bar Private Room Floor Plan"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
