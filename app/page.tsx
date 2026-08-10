'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import FunctionsSection from '@/components/FunctionsSection';
import CrowdFavourites from '@/components/CrowdFavourites';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuView, setMenuView] = useState<'restaurant' | 'banquet' | 'lunch'>('restaurant');

  return (
    <>
      <Header
        onOpenBooking={() => setBookingOpen(true)}
        onSelectMenuView={(view) => setMenuView(view)}
      />
      <main>
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <AboutSection />
        <MenuSection
          showTabs={true}
          activeMenuView={menuView}
          onSelectMenuView={(view) => setMenuView(view)}
          onOpenBooking={() => setBookingOpen(true)}
        />
        <FunctionsSection />
        <CrowdFavourites />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
