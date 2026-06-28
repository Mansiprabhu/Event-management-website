import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Heart, Gem, Sparkles, Baby, Music, ArrowRight } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../data';

export default function InformalEvents() {
  const navigate = useNavigate();
  const informalEvents = EVENT_CATEGORIES.filter((c) => c.type === 'informal');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake': return <Cake className="w-6 h-6 text-rose-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Gem': return <Gem className="w-6 h-6 text-rose-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-rose-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-rose-500" />;
      case 'Music': return <Music className="w-6 h-6 text-rose-500" />;
      default: return <Cake className="w-6 h-6 text-rose-500" />;
    }
  };

  const handleBook = (categoryId: string) => {
    navigate('/booking', { state: { categoryId } });
  };

  return (
    <div className="py-12 space-y-12 animate-fade-in">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none">
          Social & Informal Celebrations
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Create timeless family memories! Whether it is a traditional wedding reception, a whimsical pastel baby shower, or an electrifying rooftop acoustic music night, our venues support customizable layouts and spectacular food setups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {informalEvents.map((event) => (
          <div
            key={event.id}
            id={`informal-event-card-${event.id}`}
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
                <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-rose-500 transition-colors">
                  {event.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Info Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-b border-slate-100 dark:border-slate-800/60 py-3 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Capacity</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Up to {event.capacity} guests</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Duration</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{event.duration} Slot</span>
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
                  id={`book-informal-event-${event.id}`}
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
