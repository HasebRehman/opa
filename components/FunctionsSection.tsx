'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Waves, Sparkles, ChevronRight } from 'lucide-react';

export default function FunctionsSection() {
  return (
    <section id="functions" className="bg-white py-20 sm:py-28 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal italic font-normal tracking-wide">
              Functions
            </h2>

            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Celebrate your next event in style — enjoy Greek fare, and fresh air in a relaxing atmosphere by the riverside. We cater for corporate lunches, birthday celebrations, engagement parties, and private buyouts.
            </p>

            {/* Event Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-md">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Users className="w-4 h-4 text-mint shrink-0" />
                <span className="text-xs text-charcoal font-medium">10 to 220 Guests</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Waves className="w-4 h-4 text-mint shrink-0" />
                <span className="text-xs text-charcoal font-medium">Story Bridge Views</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-mint hover:bg-mint-dark text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer hover:shadow-mint/30 active:scale-95"
              >
                <span>View Spaces</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Res Image Card */}
          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
              <Image
                src="/images/img-1.webp"
                alt="Opa Bar Functions & Private Dining Space"
                width={700}
                height={525}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
