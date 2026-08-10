'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Loader2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: 'Gastronomy' | 'Atmosphere & Vistas' | 'Cocktails & Bar' | 'Private Dining';
}

const RAW_GALLERY_DATA: GalleryItem[] = [
  { id: 1, src: '/images/gallery/img-1.webp', alt: 'Opa Bar Terrace', title: 'Story Bridge Terrace Dining', category: 'Atmosphere & Vistas' },
  { id: 2, src: '/images/saganaki.jpg', alt: 'Flaming Saganaki Cheese', title: 'Saganaki Pan-Fried Cheese & Thyme Honey', category: 'Gastronomy' },
  { id: 3, src: '/images/gallery/img-2.webp', alt: 'Greek Dining Table', title: 'Greek Banquet Feast', category: 'Gastronomy' },
  { id: 4, src: '/images/cocktails.jpg', alt: 'Mykonos Spritz Cocktail', title: 'Signature Mediterranean Cocktails', category: 'Cocktails & Bar' },
  { id: 5, src: '/images/gallery/img-3.webp', alt: 'Riverside View', title: 'Brisbane Riverfront Promenade', category: 'Atmosphere & Vistas' },
  { id: 6, src: '/images/lamb-shoulder.jpg', alt: 'Slow Roasted Lamb', title: '12-Hour Slow Roasted Lamb Shoulder', category: 'Gastronomy' },
  { id: 7, src: '/images/gallery/img-4.webp', alt: 'Mezze Platters', title: 'House Tzatziki & Warm Pita', category: 'Gastronomy' },
  { id: 8, src: '/images/private.jpg', alt: 'Private Dining Room', title: 'Exclusive Hellenic Pavilion Room', category: 'Private Dining' },
  { id: 9, src: '/images/gallery/img-5.webp', alt: 'Sunset Drinks', title: 'Golden Hour Ouzo & Wine', category: 'Cocktails & Bar' },
  { id: 10, src: '/images/ocean-trout.jpg', alt: 'Crispy Skin Ocean Trout', title: 'Chargrilled Moreton Bay Seafood', category: 'Gastronomy' },
  { id: 11, src: '/images/gallery/img-6.webp', alt: 'Indoor Dining Space', title: 'Marble Hearth Pavilion', category: 'Atmosphere & Vistas' },
  { id: 12, src: '/images/gallery/img-7.webp', alt: 'Wine Cellar Display', title: 'Curated Hellenic & Global Wines', category: 'Cocktails & Bar' },
  { id: 13, src: '/images/keftedes.jpg', alt: 'Chargrilled Keftedes Meatballs', title: 'Greek Keftedes Meatballs', category: 'Gastronomy' },
  { id: 14, src: '/images/gallery/img-8.webp', alt: 'Evening Terrace Light', title: 'Story Bridge Illuminated Night View', category: 'Atmosphere & Vistas' },
  { id: 15, src: '/images/functions.jpg', alt: 'Group Function Celebration', title: 'Riverside Celebration Banquets', category: 'Private Dining' },
  { id: 16, src: '/images/gallery/img-9.webp', alt: 'Authentic Greek Dessert', title: 'Warm Golden Loukoumades Donuts', category: 'Gastronomy' },
  { id: 17, src: '/images/gallery/img-10.webp', alt: 'Outdoor Lounge Seating', title: 'Sunset Cocktail Deck', category: 'Atmosphere & Vistas' },
  { id: 18, src: '/images/greek-feast.jpg', alt: 'Greek Banquet Display', title: 'First In Greek Feast $64 Banquet', category: 'Gastronomy' },
  { id: 19, src: '/images/gallery/img-11.webp', alt: 'Cocktail Mixing', title: 'Artisanal Ouzo & Gin Mixology', category: 'Cocktails & Bar' },
  { id: 20, src: '/images/gallery/img-12.webp', alt: 'Private Dining Table', title: 'Whites & Aegean Blue Interiors', category: 'Private Dining' },
  { id: 21, src: '/images/hero-cocktail.jpg', alt: 'Signature Drinks', title: 'Handcrafted Aegean Spritz', category: 'Cocktails & Bar' },
  { id: 22, src: '/images/gallery/img-13.webp', alt: 'Warm Atmosphere', title: 'Open Kitchen Hearth Dining', category: 'Atmosphere & Vistas' },
  { id: 23, src: '/images/gallery/img-14.webp', alt: 'Fresh Oyster Platter', title: 'Coffin Bay Fresh Oysters', category: 'Gastronomy' },
  { id: 24, src: '/images/gallery/img-15.webp', alt: 'Night Vistas', title: 'Eagle Street Waterfront Vistas', category: 'Atmosphere & Vistas' },
  { id: 25, src: '/images/gallery/img-16.webp', alt: 'Greek Pastry Dolci', title: 'Bougatsa Warm Custard Pastry', category: 'Gastronomy' },
  { id: 26, src: '/images/hero.jpg', alt: 'Panorama View', title: 'Panoramic Riverfront Dining', category: 'Atmosphere & Vistas' },
  { id: 27, src: '/images/gallery/img-17.webp', alt: 'Private Event Setting', title: 'Exclusive Buyout Dining Space', category: 'Private Dining' },
  { id: 28, src: '/images/mezze.jpg', alt: 'Mezze Feast Spread', title: 'Traditional Hellenic Mezze Selection', category: 'Gastronomy' },
  { id: 29, src: '/images/gallery/img-18.webp', alt: 'Sommelier Wine Selection', title: 'Assyrtiko & Santorini Wines', category: 'Cocktails & Bar' },
  { id: 30, src: '/images/gallery/img-19.webp', alt: 'River Sunset View', title: 'Story Bridge Sunset Horizon', category: 'Atmosphere & Vistas' },
  { id: 31, src: '/images/gallery/img-20.webp', alt: 'Celebration Moments', title: 'Opa Celebration Festivities', category: 'Private Dining' },
];

const CATEGORIES = ['All', 'Gastronomy', 'Atmosphere & Vistas', 'Cocktails & Bar', 'Private Dining'] as const;

// Individual Pinterest Card with Scroll Reveal Intersection Observer
function PinterestCard({
  img,
  index,
  onClick,
}: {
  img: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '80px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative break-inside-avoid mb-6 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 group cursor-pointer transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Pinterest Pill Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
        <div className="flex justify-end">
          <span className="bg-white/25 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/30 shadow-md">
            {img.category}
          </span>
        </div>
        <div className="flex items-center justify-between text-white">
          <div>
            <h4 className="font-serif text-base font-light tracking-wide text-white drop-shadow-md">
              {img.title}
            </h4>
            <p className="text-[10px] text-white/80 font-light">Opa Bar + Mezze</p>
          </div>
          <div className="bg-mint text-white p-2.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Filtered Images
  const filteredImages =
    activeCategory === 'All'
      ? RAW_GALLERY_DATA
      : RAW_GALLERY_DATA.filter((item) => item.category === activeCategory);

  // Infinite Scroll Pagination State
  const INITIAL_BATCH_SIZE = 12;
  const [displayedCount, setDisplayedCount] = useState(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset count on category change
  useEffect(() => {
    setDisplayedCount(INITIAL_BATCH_SIZE);
  }, [activeCategory]);

  // Infinite Scroll Observer for loading more cards as user scrolls down
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore && displayedCount < filteredImages.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayedCount((prev) => Math.min(prev + 8, filteredImages.length));
            setIsLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [displayedCount, filteredImages.length, isLoadingMore]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1));
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(activeImageIndex === 0 ? filteredImages.length - 1 : activeImageIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(activeImageIndex === filteredImages.length - 1 ? 0 : activeImageIndex + 1);
  };

  const visibleImages = filteredImages.slice(0, displayedCount);

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 space-y-10">
          
          {/* Header Title */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-mint/10 text-mint px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-mint/20">
              <Sparkles className="w-3.5 h-3.5" />
              Pinterest Inspiration Feed
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-charcoal tracking-widest uppercase">
              GALLERY
            </h1>
            <div className="w-20 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 font-light max-w-md mx-auto uppercase tracking-widest">
              Atmosphere &bull; Greek Gastronomy &bull; Riverfront Vistas
            </p>
          </div>

          {/* Category Filter Pills (Single Line Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2 px-1 justify-start sm:justify-center whitespace-nowrap -mx-5 sm:mx-0 px-5 sm:px-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-charcoal text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-mint/15 hover:text-mint'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Pinterest Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {visibleImages.map((img, index) => (
              <PinterestCard
                key={img.id}
                img={img}
                index={index}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>

          {/* Infinite Scroll Sentinel / Loading Trigger */}
          <div ref={sentinelRef} className="py-8 text-center flex items-center justify-center">
            {isLoadingMore && (
              <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-200 text-charcoal text-xs font-semibold shadow-xs animate-pulse">
                <Loader2 className="w-4 h-4 text-mint animate-spin" />
                <span>Loading more Pinterest moments...</span>
              </div>
            )}
            {!isLoadingMore && displayedCount >= filteredImages.length && filteredImages.length > 0 && (
              <p className="text-xs text-gray-400 font-light uppercase tracking-widest">
                You&apos;ve reached the end of the gallery
              </p>
            )}
          </div>

        </div>
      </main>

      {/* Interactive Lightbox Modal */}
      {activeImageIndex !== null && filteredImages[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[activeImageIndex].src}
              alt={filteredImages[activeImageIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            
            <div className="mt-4 text-center space-y-1">
              <h3 className="text-white font-serif text-lg font-light tracking-wide">
                {filteredImages[activeImageIndex].title}
              </h3>
              <p className="text-xs text-white/70 uppercase tracking-widest font-light">
                {filteredImages[activeImageIndex].category} • {activeImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
