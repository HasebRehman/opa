'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Minus, Plus, CheckCircle, ShieldCheck, Gift } from 'lucide-react';

const CARD_VALUES = [
  { value: 50, label: 'A$50.00' },
  { value: 100, label: 'A$100.00' },
  { value: 150, label: 'A$150.00' },
  { value: 200, label: 'A$200.00' },
  { value: 250, label: 'A$250.00' },
  { value: 300, label: 'A$300.00' },
  { value: 400, label: 'A$400.00' },
  { value: 500, label: 'A$500.00' },
];

export default function OpaGiftVoucherPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'selection' | 'details' | 'success'>('selection');
  const [showTerms, setShowTerms] = useState(false);

  // Recipient Form State
  const [recipient, setRecipient] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    message: '',
  });

  const handleContinue = () => {
    setStep('details');
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <>
      <Header darkText={true} onOpenBooking={() => setBookingOpen(true)} />

      <main className="bg-white pt-24 sm:pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-12">
          
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Gift Card Preview & Description */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Mint Digital Gift Card Badge */}
              <div className="bg-[#7ec8b5] text-charcoal p-8 rounded-2xl flex flex-col justify-between h-48 sm:h-56 shadow-md border border-mint-dark/10 relative overflow-hidden group transition-transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                    Gift Card
                  </h2>
                  <div className="w-12 h-[2px] bg-charcoal/30 my-2" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-charcoal/90 uppercase tracking-wider">
                    Opa Bar + Mezze
                  </p>
                  <p className="text-xs text-charcoal/70 mt-0.5">
                    Brisbane Riverfront Dining
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Buying gifts can be tricky, but with a Opa Bar + Mezze Gift Card you&apos;re giving your friends and family the opportunity to get something they&apos;ll truly enjoy.
              </p>

              <div className="space-y-2 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-xs font-semibold text-charcoal hover:text-mint underline transition-colors block cursor-pointer"
                >
                  Terms & Conditions
                </button>
                <p className="text-[11px] text-gray-400 font-light">
                  Powered by NowBookIt
                </p>
              </div>

            </div>

            {/* Right Column: Card Value & Details Step */}
            <div className="md:col-span-7 space-y-6">
              
              {step === 'selection' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-serif">
                    Buy a Gift Card
                  </h1>

                  {/* Value Selection Grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                      Select card value
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {CARD_VALUES.map((card) => {
                        const isSelected = selectedValue === card.value;
                        return (
                          <button
                            key={card.value}
                            type="button"
                            onClick={() => setSelectedValue(card.value)}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'border-[#7ec8b5] bg-mint/10 text-mint shadow-sm scale-105'
                                : 'border-gray-200 text-charcoal hover:border-mint/50'
                            }`}
                          >
                            {card.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                      Select quantity
                    </label>
                    <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2.5 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-5 py-2.5 text-sm font-bold text-charcoal min-w-[44px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2.5 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-mint/5 p-4 rounded-2xl border border-mint/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 block font-medium">Total Gift Value</span>
                      <span className="text-xl font-serif font-bold text-charcoal">
                        A${selectedValue * quantity}.00 AUD
                      </span>
                    </div>
                    <Gift className="w-6 h-6 text-mint" />
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="w-full bg-[#7ec8b5] hover:bg-mint-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
                    >
                      Continue to details
                    </button>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <form onSubmit={handlePurchaseSubmit} className="space-y-5 animate-fade-in-up">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-charcoal font-serif">
                      Recipient & Personal Details
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep('selection')}
                      className="text-xs text-mint hover:underline font-semibold cursor-pointer"
                    >
                      ← Back to selection
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Recipient Name <span className="text-mint">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={recipient.recipientName}
                      onChange={(e) => setRecipient({ ...recipient, recipientName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Recipient Email <span className="text-mint">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={recipient.recipientEmail}
                      onChange={(e) => setRecipient({ ...recipient, recipientEmail: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Your Name (Sender) <span className="text-mint">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={recipient.senderName}
                      onChange={(e) => setRecipient({ ...recipient, senderName: e.target.value })}
                      placeholder="e.g. Michael"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Personal Greeting Message
                    </label>
                    <textarea
                      rows={3}
                      value={recipient.message}
                      onChange={(e) => setRecipient({ ...recipient, message: e.target.value })}
                      placeholder="Wishing you a wonderful celebration at Opa Bar!"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-mint focus:ring-1 focus:ring-mint outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#7ec8b5] hover:bg-mint-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Complete Purchase (A${selectedValue * quantity}.00)</span>
                    </button>
                  </div>
                </form>
              )}

              {step === 'success' && (
                <div className="bg-white p-8 rounded-3xl text-center space-y-4 border border-mint/30 animate-fade-in-up">
                  <CheckCircle className="w-12 h-12 text-mint mx-auto" />
                  <h2 className="text-2xl font-serif font-bold text-charcoal">Gift Card Ordered!</h2>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Your Opa Bar + Mezze gift voucher of <strong>A${selectedValue * quantity}.00</strong> has been processed. A confirmation email has been sent to <strong>{recipient.recipientEmail || 'your email'}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('selection');
                      setQuantity(1);
                    }}
                    className="bg-[#c5a882] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#b0936e] transition-colors cursor-pointer"
                  >
                    Buy Another Gift Card
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-serif font-bold text-charcoal">Gift Voucher Terms & Conditions</h3>
            <div className="text-xs text-gray-600 space-y-2 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p>1. Gift Cards are redeemable for food, beverages, and dining services at Opa Bar + Mezze Brisbane.</p>
              <p>2. Vouchers are valid for 3 years from date of issue.</p>
              <p>3. Vouchers cannot be exchanged for cash or refunded.</p>
              <p>4. Please present your digital voucher code upon arrival or when booking your table.</p>
            </div>
            <div className="text-right pt-2">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="bg-mint text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
