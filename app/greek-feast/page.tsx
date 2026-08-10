'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Sparkles, Utensils, Check } from 'lucide-react';

export default function GreekFeastPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const BANQUET_ITEMS = [
    { name: 'Taramasalata', desc: 'Whipped white cod roe' },
    { name: 'Pita Bread', desc: 'Warm garlic rubbed' },
    { name: 'Kalamari', desc: 'Crispy flash fried' },
    { name: 'Lamb Shoulder', desc: '12-hour slow roasted' },
    { name: 'Greek Salad', desc: 'Dodoni feta & Kalamata' },
    { name: 'Lemon Patatas', desc: 'Oregano pan juices' },
    { name: 'Bougatsa', desc: 'Warm custard phyllo' },
  ];

  const ADD_ONS = [
    { name: 'Oyster', price: '+7pp' },
    { name: 'Baby Yiros', price: '+10pp' },
    { name: 'Octopus', price: '+12pp' },
    { name: 'Saganaki', price: '+14pp' },
    { name: 'Grilled King Prawn', price: '+14pp' },
  ];

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Main Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-charcoal">
              
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-serif italic text-mint font-light tracking-wide block">
                  First in
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-mint tracking-wider uppercase">
                  GREEK FEAST
                </h1>
              </div>

              <div className="space-y-2 leading-relaxed border-b border-gray-100 pb-6">
                <p className="text-base sm:text-xl font-medium text-charcoal">
                  Dine between 11am–6pm and enjoy a 7-piece banquet. Available 7 days – $64pp
                </p>
                <p className="italic text-gray-600 text-sm">Whole table only</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Minimum two people – Max 12 people
                </p>
              </div>

              {/* 7-Piece Inclusions Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#c5a882]/40 pb-2">
                  <Utensils className="w-4 h-4 text-[#c5a882]" />
                  <h3 className="text-xs uppercase font-bold tracking-widest text-[#c5a882]">
                    7-PIECE BANQUET MENU
                  </h3>
                </div>
                
                <div className="space-y-1">
                  {BANQUET_ITEMS.map((dish, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-mint/5 transition-colors border-b border-gray-100/80 group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-mint shrink-0 opacity-70 group-hover:opacity-100" />
                        <span className="font-serif font-bold text-base sm:text-lg text-charcoal group-hover:text-mint transition-colors">
                          {dish.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 font-normal text-right">
                        {dish.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feast Add-ons Section */}
              <div className="space-y-4 bg-gradient-to-br from-mint/10 via-mint/5 to-white p-6 rounded-2xl border border-mint/20 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a882]" />
                  <h4 className="text-xs uppercase font-bold tracking-widest text-mint">
                    FEAST ADD ONS
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {ADD_ONS.map((addon, i) => (
                    <div
                      key={i}
                      className={`bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between gap-2 hover:border-mint/30 transition-colors ${
                        i === 4 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <span className="text-xs font-semibold text-charcoal">{addon.name}</span>
                      <span className="text-xs font-bold text-[#c5a882] bg-[#c5a882]/10 border border-[#c5a882]/30 px-2 py-0.5 rounded-md shrink-0">
                        {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOOK NOW CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="bg-[#c5a882] hover:bg-[#b0936e] text-white uppercase text-xs sm:text-sm tracking-widest font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer inline-block"
                >
                  BOOK NOW
                </button>
              </div>

            </div>

            {/* Right Image Column with img-2.webp and Floating Price Badge */}
            <div className="lg:col-span-6 relative">
              
              {/* Floating $64pp Badge */}
              <div className="absolute -top-6 -left-6 z-20 bg-[#c5a882] text-white rounded-full w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center shadow-2xl border-4 border-white transform -rotate-6">
                <span className="text-3xl sm:text-4xl font-serif font-bold leading-none">
                  $64
                </span>
                <span className="text-xs font-sans font-semibold uppercase tracking-wider mt-0.5">
                  PP
                </span>
              </div>

              <div className="relative h-[480px] sm:h-[620px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image
                  src="/images/img-2.webp"
                  alt="First in Greek Feast $64 Banquet"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

        {/* Disclaimer / Surcharge Banner */}
        <section className="mt-20 bg-mint/15 border-y border-mint/20 py-8 px-6 text-center text-xs sm:text-sm text-charcoal font-light space-y-2 leading-relaxed">
          <p className="font-medium text-charcoal">
            10% Weekend surcharge (20% on public holidays). Card payment surcharge applies.
          </p>
          <p className="text-gray-700">Kids menu available on request.</p>
          <p className="max-w-4xl mx-auto text-gray-600 text-[11px] sm:text-xs">
            Please advise wait staff of any dietary requirements or allergies. Needs are catered for to the best of our ability, but the decision to consume a meal is the responsibility of the diner. Nuts, seafood, shellfish, sesame seeds, wheat, flour, eggs, fungi & dairy products are all handled on this premises.
          </p>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
