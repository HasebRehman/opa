'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import CrowdFavourites from '@/components/CrowdFavourites';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Image from 'next/image';

function MenuContent() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view') as 'restaurant' | 'banquet' | 'lunch' | null;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuView, setMenuView] = useState<'restaurant' | 'banquet' | 'lunch'>(viewParam || 'restaurant');

  useEffect(() => {
    if (viewParam) {
      setMenuView(viewParam);
    }
  }, [viewParam]);

  return (
    <>
      <Header
        onOpenBooking={() => setBookingOpen(true)}
        onSelectMenuView={(view) => setMenuView(view)}
      />
      <main>
        {/* Dedicated Menu Page Hero Section */}
        <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden text-center text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-cocktail.jpg"
              alt="Opa Bar Menu"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4 pt-10">
            <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-wide italic text-white">
              Menu & Gastronomy
            </h1>
            <div className="w-16 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-sm sm:text-base font-light text-white/90 max-w-lg mx-auto leading-relaxed">
              Authentic Greek recipes, Moreton Bay fresh seafood, and slow-roasted charcoal meats designed for sharing over the Brisbane River.
            </p>
          </div>
        </section>

        {/* Full Menu Section */}
        <MenuSection
          activeMenuView={menuView}
          onSelectMenuView={(view) => setMenuView(view)}
          onOpenBooking={() => setBookingOpen(true)}
        />

        {/* Crowd Favourites Showcase */}
        <CrowdFavourites />
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-charcoal font-serif">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
