'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Building2, Send, CheckCircle } from 'lucide-react';

export default function BusinessOpportunitiesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-28 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a882]">
              TASSIS GROUP
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-mint">
              Business Opportunities
            </h1>
            <div className="w-16 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 font-light max-w-xl mx-auto leading-relaxed">
              Explore partnership, leasing, corporate sponsorship, and hospitality growth opportunities with Opa Bar + Mezze and Tassis Group.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-4 bg-mint/5 p-6 rounded-2xl border border-mint/20">
              <Building2 className="w-8 h-8 text-mint shrink-0" />
              <div className="space-y-1">
                <h3 className="font-bold text-charcoal text-base font-serif">Corporate Enquiries</h3>
                <p className="text-xs text-gray-600">
                  For vendor partnerships, supplier proposals, and strategic real estate opportunities.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center space-y-3 py-6">
                <CheckCircle className="w-12 h-12 text-mint mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-charcoal">Enquiry Sent</h3>
                <p className="text-sm text-gray-600">
                  Thank you for reaching out. Our executive team will review your proposal and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-charcoal">Business Contact Form</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Contact Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your proposed business opportunity..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                />
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-[#c5a882] hover:bg-[#b0936e] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg uppercase text-xs tracking-widest cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
