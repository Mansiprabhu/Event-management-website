import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, DollarSign, Users, Clock, MapPin, Search } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data';
import { EventCategory } from '../types';

interface CategoriesListProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoriesList({ onSelectCategory }: CategoriesListProps) {
  const [activeTab, setActiveTab] = useState<'formal' | 'informal'>('formal');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine static and other event names to show a complete, robust listing
  const formalList = [
    'Business Conference', 'Corporate Meeting', 'Seminar & Workshop', 
    'Award Ceremony', 'Product Launch', 'Networking Event', 'Training Program'
  ];

  const informalList = [
    'Birthday Party', 'Wedding Reception', 'Engagement Ceremony', 
    'Anniversary Party', 'Baby Shower', 'Graduation Party', 
    'Farewell Event', 'College Fest', 'Music Night & Concert', 'Family Gathering'
  ];

  const filteredCategories = EVENT_CATEGORIES.filter((cat) => {
    const matchesTab = cat.type === activeTab;
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="event-categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Specialized Services</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tailored For Every Occasion
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Whether organizing a high-profile corporate product release or a royal wedding banquet, explore our purpose-built halls and tailor-made packages.
        </p>
      </div>

      {/* Tabs, Search & Control Panel */}
      <div id="categories-controls" className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        {/* Tab Buttons */}
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 w-full sm:w-auto">
          <button
            id="tab-formal-events"
            onClick={() => { setActiveTab('formal'); setSearchQuery(''); }}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'formal'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            🎩 Formal Events
          </button>
          <button
            id="tab-informal-events"
            onClick={() => { setActiveTab('informal'); setSearchQuery(''); }}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'informal'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            🎉 Informal Events
          </button>
        </div>

        {/* Live Filter Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            id="categories-search-input"
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main Grid View */}
      <div id="categories-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl dark:shadow-slate-950/20 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Duration Badge */}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {cat.duration}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{cat.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed h-12 overflow-hidden">
                    {cat.description}
                  </p>

                  {/* Amenities / Specs Row */}
                  <div className="grid grid-cols-2 gap-3 mt-4 border-t border-slate-100 dark:border-slate-800/85 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <Users className="w-4 h-4 text-rose-500 shrink-0" />
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wider font-bold">Max Cap</span>
                        <span className="font-semibold">{cat.capacity} Guests</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase tracking-wider font-bold">Starts At</span>
                        <span className="font-semibold">₹{cat.startingPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Available Cities */}
                  <div className="mt-4 flex flex-wrap gap-1 items-center">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-400 mr-1 uppercase">Locations:</span>
                    {cat.locations.slice(0, 3).map((city) => (
                      <span key={city} className="inline-flex text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {city}
                      </span>
                    ))}
                    {cat.locations.length > 3 && (
                      <span className="text-[9px] text-slate-400">+{cat.locations.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Book Trigger Button */}
                <button
                  id={`cat-book-btn-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 hover:border-amber-500 dark:border-slate-800 hover:dark:border-amber-500 text-xs font-bold tracking-wider text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white hover:bg-slate-900 dark:hover:bg-amber-500 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
            <p className="text-sm text-slate-500 dark:text-slate-400">No categories match your current filter.</p>
          </div>
        )}
      </div>

      {/* Mini Grid showing all unlisted categories for completeness as requested in prompt */}
      <div id="unlisted-categories-preview" className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>Full Event Suite Availability</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(activeTab === 'formal' ? formalList : informalList).map((evtName) => {
            const hasDetail = EVENT_CATEGORIES.some(c => c.name.toLowerCase().includes(evtName.split(' ')[0].toLowerCase()));
            return (
              <div
                key={evtName}
                onClick={() => {
                  const match = EVENT_CATEGORIES.find(c => c.name.toLowerCase().includes(evtName.split(' ')[0].toLowerCase()));
                  if (match) {
                    onSelectCategory(match.id);
                  } else {
                    onSelectCategory(activeTab === 'formal' ? 'conference' : 'birthday');
                  }
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  hasDetail
                    ? 'bg-amber-500/5 border-amber-500/25 text-slate-800 dark:text-slate-200 hover:bg-amber-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800/70 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-semibold block truncate">{evtName}</span>
                <span className="text-[9px] text-slate-400 mt-1 block">
                  {hasDetail ? 'Premium Package' : 'Custom Request'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
