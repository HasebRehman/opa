'use client';

import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDone = () => {
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="bg-mint px-6 py-4 flex items-center justify-between">
          <h3 className="text-white font-serif text-xl">Book a Table</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
              >
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="04xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray font-semibold uppercase tracking-wider mb-1 block">
                Special Requests
              </label>
              <textarea
                rows={2}
                placeholder="Dietary requirements, occasion, seating preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-charcoal focus:border-mint focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-mint hover:bg-mint-dark text-white font-bold uppercase tracking-widest py-3.5 rounded-lg text-sm transition-colors"
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-mint/15 text-mint mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif text-charcoal">Booking Confirmed</h4>
            <p className="text-sm text-gray">
              Thank you, <strong>{name}</strong>! We look forward to welcoming you on{' '}
              <strong>{date}</strong> at <strong>{time}</strong> for <strong>{guests}</strong> guest
              {guests !== 1 ? 's' : ''}.
            </p>
            <p className="text-xs text-gray-light">
              A confirmation will be sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={handleDone}
              className="bg-mint hover:bg-mint-dark text-white font-bold uppercase tracking-widest px-8 py-3 rounded-lg text-xs transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
