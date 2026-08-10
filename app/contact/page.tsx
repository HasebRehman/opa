'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Phone, MapPin, CheckCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white">
        {/* Hero Section with img-11.webp */}
        <section className="relative h-[55vh] min-h-[440px] sm:min-h-[520px] w-full flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img-11.webp"
              alt="Contact Opa Bar + Mezze"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-black/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4 pt-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-widest uppercase text-white">
              CONTACT OPA
            </h1>
            <div className="w-20 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-sm sm:text-base font-light text-white/90 max-w-xl mx-auto leading-relaxed">
              We&apos;re here to assist with general enquiries, private dining bookings, and event planning.
            </p>
          </div>

          {/* Bottom Curved Wave Mask */}
          <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
            <svg
              className="w-full h-12 sm:h-20 text-white fill-current"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
            >
              <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
            </svg>
          </div>
        </section>

        {/* Content Section (Matching Image 2) */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Info & Map Column */}
            <div className="lg:col-span-5 space-y-6 text-charcoal">
              
              <div className="space-y-3">
                <a
                  href="tel:0721115155"
                  className="text-lg font-semibold text-charcoal hover:text-mint transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-mint" />
                  (07) 2111 5155
                </a>

                <div className="flex items-center gap-3 text-mint pt-1">
                  <a
                    href="https://www.instagram.com/opa_bar_mezze/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="hover:scale-110 transition-transform p-2 bg-mint/10 rounded-full text-mint"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/opabarmezze"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="hover:scale-110 transition-transform p-2 bg-mint/10 rounded-full text-mint"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                    </svg>
                  </a>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-700 font-light pt-2">
                  <MapPin className="w-4 h-4 text-mint shrink-0 mt-1" />
                  <p>123 Eagle Street, Brisbane, Q. 4000</p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-[300px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <iframe
                  title="Opa Bar Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.067406213795!2d153.0287513!3d-27.4690748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a05b382d61d%3A0xb35a74e50882e30!2s123%20Eagle%20St%2C%20Brisbane%20City%20QLD%204000!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

            </div>

            {/* Right General Enquiries Form Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mint">
                  General enquiries only
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  For bookings, please use our booking page or phone the restaurant. Looking for functions? Please{' '}
                  <Link href="/functions" className="text-[#c5a882] underline font-semibold hover:text-[#b0936e]">
                    click here
                  </Link>
                  .
                </p>
              </div>

              {submitted ? (
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-4 border border-mint/30 animate-fade-in-up">
                  <CheckCircle className="w-12 h-12 text-mint mx-auto" />
                  <h3 className="text-2xl font-serif font-bold text-charcoal">Message Sent!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you for contacting Opa Bar + Mezze. Our management team will respond to your enquiry within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="bg-[#c5a882] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#b0936e] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-5 border border-gray-100">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      Name
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First Name (required)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last Name (required)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      Phone <span className="text-gray-400 font-normal">(required)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      Email <span className="text-gray-400 font-normal">(required)</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      Message <span className="text-gray-400 font-normal">(required)</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="General enquiries only - please use our Functions Page or Bookings Page if you're looking to secure a table."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#c5a882] hover:bg-[#b0936e] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg uppercase text-xs tracking-widest cursor-pointer transition-all inline-flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
