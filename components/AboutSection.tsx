'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#7ec8b5] py-20 sm:py-28 text-white relative overflow-hidden">
      {/* Background Decorative Pattern Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/5 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight tracking-wide">
          Brisbane&apos;s Best Greek Restaurant
        </h2>

        {/* Tan/Gold divider line matching logo 'Bar + Mezze' color */}
        <div className="w-16 h-[2.5px] bg-[#c5a882] mx-auto rounded-full shadow-sm" />

        <p className="text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto text-white/95">
          Shouted with passion at Greek celebrations, Opa is an expression of joy, often paired
          with dancing, laughter and the occasional smashed plate. At Opa, we invite you to
          celebrate with us, whether it&apos;s a special occasion or simply the end of the day.
        </p>

        <p className="text-base sm:text-lg font-serif italic text-white/90">
          Just go easy on the crockery.
        </p>
      </div>
    </section>
  );
}
