import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, GraduationCap, Trophy, Tv, Share2, ArrowRight } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../data';

export default function FormalEvents() {
  const navigate = useNavigate();
  const formalEvents = EVENT_CATEGORIES.filter((c) => c.type === 'formal');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-500" />;
      case 'Users': return <Users className="w-6 h-6 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'Tv': return <Tv className="w-6 h-6 text-amber-500" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-amber-500" />;
      default: return <Briefcase className="w-6 h-6 text-amber-500" />;
    }
  };

  const handleBook = (categoryId: string) => {
    navigate('/booking', { state: { categoryId } });
  };

  return (
    <div className="py-12 space-y-12 animate-fade-in">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none">
          Professional Formal Events
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Host high-stakes board alignments, world-class educational seminars, grand product launches, and gala award nights. Equipped with high-speed fiber Wi-Fi, premium acoustic panels, and club-grade projection screens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formalEvents.map((event) => (
          <div
            key={event.id}
            id={`formal-event-card-${event.id}`}
            className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            {/* Image header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-xl shadow-md">
                {getIcon(event.icon)}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-amber-500 transition-colors">
                  {event.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Info Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-b border-slate-100 dark:border-slate-800/60 py-3 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Capacity</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Up to {event.capacity} pax</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Duration</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{event.duration} Included</span>
                  </div>
                </div>
              </div>

              {/* Price and Action */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Rate</span>
                  <span className="text-base font-extrabold text-slate-950 dark:text-white">
                    ₹{event.startingPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  id={`book-formal-event-${event.id}`}
                  onClick={() => handleBook(event.id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Select Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
