'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-28 sm:pt-36 pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
          
          {/* Header */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-mint transition-colors cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-serif text-charcoal font-bold tracking-wide">
              Privacy Policy
            </h1>

            <div className="w-20 h-[2.5px] bg-[#8b6838] rounded-full" />

            <p className="text-xs sm:text-sm text-gray-500 font-light uppercase tracking-widest">
              Last updated: August 2026 &bull; Opa Bar + Mezze (Tassis Group)
            </p>
          </div>

          {/* Privacy Content Sections */}
          <div className="prose prose-gray max-w-none space-y-8 text-charcoal text-sm sm:text-base leading-relaxed">
            
            <section className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-mint font-bold text-base sm:text-lg">
                <ShieldCheck className="w-6 h-6 shrink-0 text-mint" />
                <span>Our Commitment to Privacy</span>
              </div>
              <p className="text-gray-600 font-light">
                At Opa Bar + Mezze (operated by the Tassis Group), we respect your personal information and privacy. This Privacy Policy outlines how we collect, handle, protect, and use your personal data when you visit our venue, make table reservations, purchase gift vouchers, or interact with our digital services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#8b6838]" />
                1. Information We Collect
              </h2>
              <p className="text-gray-600 font-light">
                We collect personal information necessary to deliver seamless hospitality and dining experiences. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <td><strong>Contact Details:</strong> Your full name, phone number, and email address when making table reservations or function inquiries.</td>
                <td><strong>Booking Preferences:</strong> Special dietary requirements, seating choices, and celebratory occasion details provided during reservation.</td>
                <td><strong>Transaction Data:</strong> Payment card details processed securely through compliant third-party payment gateways for gift vouchers or deposits.</td>
                <td><strong>Digital Analytics:</strong> Non-identifiable IP address, browser type, and page interaction data to optimize website performance.</td>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8b6838]" />
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 font-light">
                Your information is strictly used for the following operational purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-light">
                <td>Confirming, managing, and sending automated SMS or email reminders for your table bookings.</td>
                <td>Fulfilling orders for digital or physical Opa Gift Vouchers and Tassis Group Gift Certificates.</td>
                <td>Responding to function venue hire inquiries, private dining requests, and guest feedback.</td>
                <td>Improving our culinary menus, service standards, and digital accessibility experience.</td>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#8b6838]" />
                3. Data Security & Third-Party Sharing
              </h2>
              <p className="text-gray-600 font-light">
                We implement industry-standard encryption and security protocols. We never sell or rent your personal data to third-party marketing companies. Information is shared only with verified service partners strictly required for operational delivery (e.g. reservation platforms and payment processors under confidentiality agreements).
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-gray-100">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal">
                4. Contact Privacy Officer
              </h2>
              <p className="text-gray-600 font-light">
                If you have questions regarding this Privacy Policy or wish to access or correct your stored information, please contact our Guest Services team:
              </p>
              <div className="bg-mint/10 p-5 rounded-xl border border-mint/20 space-y-1 text-xs sm:text-sm text-charcoal">
                <p><strong>Opa Bar + Mezze Privacy Desk</strong></p>
                <p>Riverside Centre, 123 Eagle Street, Brisbane QLD 4000</p>
                <p>Email: <a href="mailto:privacy@opabar.com.au" className="text-mint font-bold hover:underline">privacy@opabar.com.au</a></p>
                <p>Phone: (07) 3003 0000</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
