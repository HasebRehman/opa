'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Clock, Star, Check, ChevronRight } from 'lucide-react';

interface MenuSectionProps {
  activeMenuView?: 'restaurant' | 'banquet' | 'lunch';
  onSelectMenuView?: (view: 'restaurant' | 'banquet' | 'lunch') => void;
  onOpenBooking?: () => void;
  showTabs?: boolean;
}

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

const MENU_CATEGORIES = [
  { id: 'dips', label: 'Snacks & Dips' },
  { id: 'mezze', label: 'Mezze & Souvlaki' },
  { id: 'mains', label: 'Large Plates' },
  { id: 'banquets', label: 'Banquets' },
  { id: 'desserts', label: 'Desserts' },
];

const ALL_MENU_SECTIONS: { id: string; title: string; subtitle: string; items: MenuItem[] }[] = [
  {
    id: 'dips',
    title: 'Snacks & Dips',
    subtitle: 'Served with warm house-made pita bread & Aegean condiments',
    items: [
      { name: 'Taramasalata', desc: 'Whipped white cod roe, warm garlic-rubbed pita', price: '$16', tag: 'House Favorite' },
      { name: 'Tzatziki', desc: 'Greek strained yoghurt, cucumber, garlic, dill & olive oil', price: '$14' },
      { name: 'Fava', desc: 'Yellow split pea dip, caramelized red onions, capers', price: '$15' },
      { name: 'Melitzanosalata', desc: 'Smoked eggplant dip, roasted garlic, lemon & parsley', price: '$15' },
      { name: 'Warm Pita & Kalamata Olives', desc: 'House marinated olives, oregano garlic rub', price: '$12' },
      { name: 'Dolmades', desc: 'Stuffed vine leaves, herb rice, lemon emulsion, tzatziki', price: '$16' },
    ],
  },
  {
    id: 'mezze',
    title: 'Mezze & Souvlaki',
    subtitle: 'Hellenic sharing plates cooked over wood embers',
    items: [
      { name: 'Saganaki Pan-Fried Cheese', desc: 'Kefalotyri cheese, Greek thyme honey, toasted sesame', price: '$22', tag: 'Popular' },
      { name: 'Keftedes Meatballs', desc: 'Traditional beef & pork meatballs, rich tomato sugo, feta cream', price: '$22' },
      { name: 'Char-Grilled Aegean Octopus', desc: 'Chargrilled octopus, caperberries, oregano, lemon oil', price: '$34', tag: 'Signature' },
      { name: 'Moreton Bay Bug Roll', desc: 'Chilled bug tail, tarama mayo, sea fennel, toasted brioche', price: '$26' },
      { name: 'Spanakopita', desc: 'Spinach, Dodoni feta cheese & herb filled crispy phyllo pie', price: '$18' },
      { name: 'Chicken Souvlaki Skewers', desc: 'Charcoal grilled chicken thrakopsomo, tzatziki, pita', price: '$24' },
      { name: 'Crispy Calamari', desc: 'Lightly fried squid, lemon oregano pepper, garlic aioli', price: '$22' },
    ],
  },
  {
    id: 'mains',
    title: 'Large Plates',
    subtitle: 'Wild Moreton Bay seafood & slow-roasted meats designed for the table',
    items: [
      { name: '12-Hour Slow Roasted Lamb Shoulder', desc: 'Slow roasted lamb shoulder, lemon oregano potatoes & pan juices', price: '$58', tag: 'House Specialty' },
      { name: 'Patagonian Toothfish Fillet', desc: 'Charbroiled wild Toothfish, braised wild greens, caper emulsion', price: '$64' },
      { name: 'Pan-Seared Ocean Trout', desc: 'Fresh trout fillet, sea asparagus, lemon caper olive oil', price: '$46' },
      { name: 'Lobster & Prawn Kritharaki', desc: 'Orzo pasta cooked in seafood bisque with Moreton Bay bugs & king prawns', price: '$54' },
      { name: 'Wood-Fired Whole Snapper', desc: 'Grilled local snapper, ladolemono sauce, choriatiki salad', price: '$52' },
    ],
  },
  {
    id: 'banquets',
    title: 'Sharing Banquets',
    subtitle: 'Multi-course feasts for group dining',
    items: [
      { name: 'The Santorini Riverside Banquet', desc: 'Multi-course dining journey: Taramasalata, Saganaki, Octopus, 12hr Lamb Shoulder & Baklava', price: '$95', tag: 'Per Guest' },
      { name: 'The Olympian Feast Experience', desc: 'Ultimate luxury menu: Moreton Bay Bug Rolls, Toothfish Fillet, Lamb Shoulder & Loukoumades', price: '$135', tag: 'Per Guest' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    subtitle: 'Sweet Greek dolci & warm donuts',
    items: [
      { name: 'Warm Loukoumades', desc: 'Golden Greek honey donuts, cinnamon, crushed pistachios', price: '$18', tag: 'Favorite' },
      { name: 'Crispy Baklava Sundae', desc: 'Layers of phyllo, spiced walnuts, pistachios & vanilla bean gelato', price: '$19' },
      { name: 'Greek Yoghurt Panna Cotta', desc: 'Strained yoghurt panna cotta, sour cherry compote, honey crumble', price: '$17' },
    ],
  },
];

const LUNCH_ITEMS: MenuItem[] = [
  { name: 'Chicken Souvlaki Roll & Oregano Chips', desc: 'Charcoal grilled chicken, tzatziki, tomato, onions + Greek Draught Beer or Wine', price: '$28', tag: 'Express Lunch' },
  { name: 'Crispy Calamari & Choriatiki Salad', desc: 'Lightly fried squid, side Greek salad, lemon aioli + Mythos Beer or Soft Drink', price: '$26' },
  { name: 'Wild Mushroom & Feta Risotto', desc: 'Sauteed Aegean mushrooms, Dodoni feta, thyme + House Spritz', price: '$29', tag: 'Chef Choice' },
  { name: '2-Course Express Lunch Banquet', desc: 'Choice of dip & warm pita + 12hr Slow Roasted Lamb Shoulder & Lemon Potatoes', price: '$42', tag: 'Best Value' },
];

export default function MenuSection({
  activeMenuView = 'restaurant',
  onSelectMenuView,
  onOpenBooking,
  showTabs = false,
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState('dips');
  const currentView = activeMenuView;

  const currentTabSection = ALL_MENU_SECTIONS.find((sec) => sec.id === activeTab) || ALL_MENU_SECTIONS[0];

  return (
    <section id="menu" className="bg-white py-12 sm:py-20 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Main Section Header */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-3xl sm:text-5xl font-serif text-charcoal italic font-normal">
            {currentView === 'banquet'
              ? 'First In Greek Feast Banquet $64'
              : currentView === 'lunch'
              ? 'Lunch Specials'
              : 'Our Menu'}
          </h2>

          <div className="w-16 h-[2.5px] bg-[#c5a882] mx-auto rounded-full" />

          <p className="text-gray-600 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
            Fresh Moreton Bay seafood, slow-braised meats, and classic Greek recipes designed for sharing.
          </p>
        </div>

        {/* RESTAURANT MENU VIEW */}
        {currentView === 'restaurant' && (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* IF TABBED MODE (Home Page) */}
            {showTabs ? (
              <div className="space-y-10">
                {/* Category Tabs Bar — Single Scrollable Row on Mobile with Edge Indicators */}
                <div className="relative">
                  <div className="flex flex-nowrap overflow-x-auto no-scrollbar sm:justify-center gap-2.5 sm:gap-3 pb-3 mb-8 -mx-2 px-2 scroll-smooth">
                    {MENU_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`shrink-0 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                          activeTab === cat.id
                            ? 'bg-mint text-charcoal shadow-md scale-105 font-bold'
                            : 'bg-gray-100 text-charcoal hover:bg-mint/15 hover:text-mint'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Tab Dishes List */}
                <div className="space-y-0 divide-y divide-gray-100 border-t border-b border-gray-100">
                  {currentTabSection.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-5 gap-4 sm:gap-6 group hover:bg-mint/5 px-3 sm:px-4 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                    >
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-xl font-serif font-semibold text-charcoal group-hover:text-mint transition-colors">
                            {item.name}
                          </h3>
                          {item.tag && (
                            <span className="text-[10px] uppercase font-bold text-[#8b6838] bg-[#8b6838]/10 border border-[#8b6838]/30 px-2 py-0.5 rounded-md shrink-0 inline-block">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-xl sm:text-2xl font-serif font-bold text-mint block">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Link to Full Menu Page */}
                <div className="text-center pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-mint text-white hover:text-charcoal text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>View Full Restaurant Menu</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* IF FULL STACKED MODE (Dedicated Menu Page) */
              <div className="space-y-16">
                {ALL_MENU_SECTIONS.map((sec) => (
                  <div key={sec.id} className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b border-[#8b6838]/30 pb-3 text-left">
                      <h3 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal tracking-wide">
                        {sec.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                        {sec.subtitle}
                      </p>
                    </div>

                    {/* Section Items List */}
                    <div className="space-y-0 divide-y divide-gray-100">
                      {sec.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-5 gap-6 group hover:bg-mint/5 px-4 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-xl font-serif font-semibold text-charcoal group-hover:text-mint transition-colors">
                                {item.name}
                              </h3>
                              {item.tag && (
                                <span className="text-[10px] uppercase font-bold text-[#8b6838] bg-[#8b6838]/10 border border-[#8b6838]/30 px-2 py-0.5 rounded-md">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="text-xl sm:text-2xl font-serif font-bold text-mint block">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: FIRST IN GREEK FEAST BANQUET $64 SHOWCASE */}
        {currentView === 'banquet' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-gradient-to-br from-mint/10 via-mint/5 to-white rounded-3xl p-8 sm:p-10 border border-mint/20 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-mint/20 pb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-[#8b6838] tracking-widest block mb-1">
                    POPULAR SHARING EXPERIENCE
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal">
                    First In Greek Feast Banquet
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Curated multi-course Hellenic sharing feast for table reservations of 2 or more guests.
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-3xl sm:text-5xl font-serif font-bold text-mint block">
                    $64
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase">per guest</span>
                </div>
              </div>

              {/* Courses Included List */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold text-charcoal tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#8b6838] fill-[#8b6838]" />
                  <span>Banquet Menu Courses Included</span>
                </h4>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-charcoal">
                  <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span><strong>Whipped Taramasalata</strong> — Warm garlic-rubbed pita bread</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span><strong>Saganaki Pan-Fried Cheese</strong> — Thyme honey & toasted sesame</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span><strong>12-Hour Slow Roasted Lamb</strong> — Lemon oregano potatoes & pan juices</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span><strong>Choriatiki Greek Salad</strong> — Tomato, Kalamata olives & Dodoni feta</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm sm:col-span-2">
                    <Check className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span><strong>Golden Loukoumades Donuts</strong> — Warm Greek honey, cinnamon & pistachios</span>
                  </li>
                </ul>
              </div>

              {/* Banquet CTA Button (High Contrast text-charcoal on bg-mint) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Flame className="w-4 h-4 text-charcoal" />
                  <span>Reserve $64 Banquet Table</span>
                </button>
                <span className="text-xs text-gray-500 font-medium">Available 7 days lunch & dinner</span>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: LUNCH SPECIALS SHOWCASE */}
        {currentView === 'lunch' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8b6838]/10 text-[#8b6838] text-xs font-bold uppercase tracking-wider border border-[#8b6838]/20">
                <Clock className="w-3.5 h-3.5" />
                <span>Available Daily 11:30 AM – 3:30 PM</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal">
                Opa Express Lunch Specials
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Quick, fresh Mediterranean lunch specials served with beverage inclusions.
              </p>
            </div>

            {/* Lunch Items Grid */}
            <div className="space-y-0 divide-y divide-gray-100 border-t border-b border-gray-100">
              {LUNCH_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-6 gap-6 group hover:bg-mint/5 px-4 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-xl font-serif font-semibold text-charcoal group-hover:text-mint transition-colors">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="text-[10px] uppercase font-bold text-[#8b6838] bg-[#8b6838]/10 border border-[#8b6838]/30 px-2 py-0.5 rounded-md">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-mint block">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lunch CTA (High contrast text-charcoal on bg-mint & 44px min height) */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 min-h-[44px]"
              >
                <span>Book a Lunch Table</span>
                <ChevronRight className="w-4 h-4 text-charcoal" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-[#1c6b5e] tracking-wider block">
              DIETARY OPTIONS AVAILABLE
            </span>
            <p className="text-xs text-charcoal font-medium">
              Gluten Free (GF), Dairy Free (DF) & Vegetarian (V) dishes clearly catered across all menus.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="bg-mint hover:bg-mint-dark text-charcoal font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md min-h-[44px]"
          >
            <span>Book a Table</span>
            <ChevronRight className="w-4 h-4 text-charcoal" />
          </button>
        </div>

      </div>
    </section>
  );
}
