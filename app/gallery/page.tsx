'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/img-${i + 1}.webp`,
  alt: `Opa Bar + Mezze Gallery Photo ${i + 1}`,
}));

export default function GalleryPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(activeImageIndex === 0 ? GALLERY_IMAGES.length - 1 : activeImageIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(activeImageIndex === GALLERY_IMAGES.length - 1 ? 0 : activeImageIndex + 1);
  };

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          
          {/* Header Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-charcoal tracking-widest uppercase">
              GALLERY
            </h1>
            <div className="w-20 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-gray-500 font-light max-w-md mx-auto uppercase tracking-widest">
              Atmosphere &bull; Greek Gastronomy &bull; Riverfront Vistas
            </p>
          </div>

          {/* Responsive Masonry Grid Showcase */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setActiveImageIndex(index)}
                className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 bg-gray-50"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Interactive Lightbox Modal */}
      {activeImageIndex !== null && (
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
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[activeImageIndex].src}
              alt={GALLERY_IMAGES[activeImageIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wider">
              {activeImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
