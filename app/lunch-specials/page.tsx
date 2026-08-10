'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function LunchSpecialsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const LUNCH_DISHES = [
    {
      name: 'Soutzoukakia',
      price: '$29',
      desc: 'Home made puffy pita lamb, beef risole with spicy sauce',
    },
    {
      name: 'Peynirli (V)',
      price: '$29',
      desc: 'Beloved boat-shaped Greek pastry with kasseri cheese, capsicum and spinach',
      tag: 'Vegetarian',
    },
    {
      name: 'Pastitsio',
      price: '$29',
      desc: 'Baked pasta with ground meat and bechamel sauce',
    },
    {
      name: 'Chicken Souvlaki Roll',
      price: '$28',
      desc: 'Charcoal grilled chicken, tzatziki, tomato, onions + Greek Draught Beer or Wine',
      tag: 'Includes Beverage',
    },
  ];

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-12">
          
          {/* Main Title Section */}
          <div className="text-center space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-mint tracking-wider uppercase">
              SPECIALS
            </h1>
            <span className="text-3xl sm:text-4xl font-serif italic text-mint font-light tracking-wide block -mt-2 sm:-mt-4">
              Lunch
            </span>

            <div className="pt-4 max-w-sm mx-auto">
              <div className="w-16 h-[2px] bg-[#8b6838] mx-auto rounded-full mb-3" />
              <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest italic">
                Mon–Fri, from 11am–4pm
              </p>
            </div>
          </div>

          {/* Lunch Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-4">
            {LUNCH_DISHES.map((dish, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-mint/30 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-charcoal group-hover:text-mint transition-colors">
                      {dish.name}
                    </h3>
                    {dish.tag && (
                      <span className="text-[10px] uppercase font-bold text-[#8b6838] bg-[#8b6838]/10 border border-[#8b6838]/30 px-2 py-0.5 rounded-md">
                        {dish.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-serif font-bold text-xl sm:text-2xl text-mint shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 2 Images Side-by-Side Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
              <Image
                src="/images/img-3.webp"
                alt="Opa Bar Lunch Special Dish"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
              <Image
                src="/images/img-4.webp"
                alt="Opa Bar Souvlaki Lunch Special"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* BOOK NOW CTA */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-[#8b6838] hover:bg-[#72542c] text-white uppercase text-xs sm:text-sm tracking-widest font-bold px-12 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer inline-block min-h-[44px]"
            >
              Reserve Express Lunch Table
            </button>
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
