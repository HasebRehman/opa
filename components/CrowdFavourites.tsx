'use client';

import React from 'react';
import Image from 'next/image';

const FAVOURITES = [
  {
    name: 'Ocean Trout',
    image: '/images/ocean-trout.jpg',
  },
  {
    name: 'Lamb Shoulder',
    image: '/images/lamb-shoulder.jpg',
  },
  {
    name: 'Keftedes (Beef + Pork Meatballs)',
    image: '/images/keftedes.jpg',
  },
  {
    name: 'Saganaki',
    image: '/images/saganaki.jpg',
  },
];

export default function CrowdFavourites() {
  return (
    <section id="favourites" className="bg-coral-light py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal text-center mb-14 italic font-normal">
          Crowd favourites
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {FAVOURITES.map((item) => (
            <div key={item.name} className="group cursor-pointer">
              <div className="rounded-xl overflow-hidden shadow-md mb-3 aspect-square relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-charcoal font-medium text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
