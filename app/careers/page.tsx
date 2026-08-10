'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Mail, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-36 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Information */}
          <div className="lg:col-span-6 space-y-6 text-charcoal">
            
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-mint font-normal tracking-tight">
                Work at Opa
              </h1>
              <div className="w-32 h-[3px] bg-[#8b6838] rounded-full" />
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                Employment
              </h2>
              
              <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed max-w-xl">
                We pride ourselves on the quality of our food and service. If you&apos;re a passionate hospitality professional looking for a new opportunity, please reach out via email with a copy of your CV.
              </p>

              <div className="pt-2 text-sm sm:text-base font-light text-charcoal flex items-center gap-2">
                <span>Email us at</span>
                <a
                  href="mailto:tassisgroupqld@gmail.com"
                  className="text-[#c5a882] hover:text-[#b0936e] font-semibold underline transition-colors cursor-pointer"
                >
                  tassisgroupqld@gmail.com
                </a>
              </div>
            </div>

            {/* Quick Email CTA Button */}
            <div className="pt-4">
              <a
                href="mailto:tassisgroupqld@gmail.com?subject=Careers%20at%20Opa%20Bar%20-%20CV%20Application"
                className="bg-[#8b6838] hover:bg-[#72542c] text-white font-bold py-4 px-8 rounded-xl shadow-lg uppercase text-xs tracking-widest transition-all cursor-pointer inline-flex items-center gap-2 min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>Send Your CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Arched Image Showcase with img-12.webp */}
          <div className="lg:col-span-6">
            <div className="relative h-[480px] sm:h-[620px] w-full max-w-md mx-auto lg:max-w-none rounded-t-[220px] rounded-b-3xl overflow-hidden shadow-2xl border border-gray-100 group">
              <Image
                src="/images/img-12.webp"
                alt="Work at Opa Bar + Mezze"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
