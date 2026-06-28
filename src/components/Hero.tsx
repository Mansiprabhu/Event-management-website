import React, { useState, useEffect } from 'react';
import { Search, CalendarDays, MapPin, Sparkles, Building2 } from 'lucide-react';
import { CITIES, EVENT_CATEGORIES } from '../data';

interface HeroProps {
  onSearchAndBook: (categoryId: string, cityId: string, date: string) => void;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600', // Royal wedding
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600', // Corporate seminar
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1600', // Rooftop social night
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1600'  // Elegant dinner
];

export default function Hero({ onSearchAndBook }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchAndBook(selectedCategory, selectedCity, selectedDate);
  };

  // Group cities by state
  const states: { [key: string]: typeof CITIES } = {};
  CITIES.forEach((city) => {
    if (!states[city.state]) {
      states[city.state] = [];
    }
    states[city.state].push(city);
  });

  return (
    <div id="hero-section" className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Slideshow */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img}
          id={`hero-slide-${idx}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt="Venue luxury showcase"
            className="w-full h-full object-cover scale-105 filter brightness-[0.45] transition-all"
          />
        </div>
      ))}

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        
        {/* Animated tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curators of Extraordinary Hall Bookings</span>
        </div>

        {/* Display Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Book Your <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Dream Event</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mb-10 leading-relaxed font-normal">
          Explore majestic convention halls, crystal banquets, and starlit open-air terraces in South India. Filter, customize, and secure your slot with instant live confirmation.
        </p>

        {/* Search Bar - Glassmorphism */}
        <form
          id="hero-search-form"
          onSubmit={handleSubmit}
          className="w-full max-w-3xl p-3 sm:p-4 rounded-2xl bg-white/15 dark:bg-slate-900/40 backdrop-blur-lg border border-white/25 dark:border-slate-800/50 shadow-2xl flex flex-col md:flex-row gap-3"
        >
          {/* Event Type */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 dark:bg-slate-950/40 border border-white/10 text-left">
            <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="flex-1">
              <label htmlFor="hero-search-category" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">Event Type</label>
              <select
                id="hero-search-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:ring-0 focus:outline-none focus:bg-slate-900 cursor-pointer"
              >
                <option value="" className="text-slate-800">Choose category...</option>
                <optgroup label="🎩 Formal Events" className="text-slate-800">
                  {EVENT_CATEGORIES.filter(c => c.type === 'formal').map(c => (
                    <option key={c.id} value={c.id} className="text-slate-800">{c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🎉 Informal Events" className="text-slate-800">
                  {EVENT_CATEGORIES.filter(c => c.type === 'informal').map(c => (
                    <option key={c.id} value={c.id} className="text-slate-800">{c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 dark:bg-slate-950/40 border border-white/10 text-left">
            <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="flex-1">
              <label htmlFor="hero-search-city" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">Location</label>
              <select
                id="hero-search-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="block w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:ring-0 focus:outline-none focus:bg-slate-900 cursor-pointer"
              >
                <option value="" className="text-slate-800">Choose city...</option>
                {Object.keys(states).map((state) => (
                  <optgroup key={state} label={state} className="text-slate-800">
                    {states[state].map((city) => (
                      <option key={city.id} value={city.id} className="text-slate-800">{city.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 dark:bg-slate-950/40 border border-white/10 text-left">
            <CalendarDays className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="flex-1">
              <label htmlFor="hero-search-date" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">Date</label>
              <input
                id="hero-search-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="block w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:ring-0 focus:outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>
          </div>

          {/* Search Action Button */}
          <button
            id="hero-search-submit-btn"
            type="submit"
            className="px-6 py-3 md:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search & Book</span>
          </button>
        </form>

      </div>
    </div>
  );
}
