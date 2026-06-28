import { useState } from 'react';
import { MapPin, Users, Sparkles, Star, ChevronRight, Check } from 'lucide-react';
import { CITIES, HALLS } from '../data';
import { Hall } from '../types';

interface FeaturedVenuesProps {
  onSelectHall: (hall: Hall) => void;
  onBookHall: (hall: Hall) => void;
  halls: Hall[];
}

export default function FeaturedVenues({ onSelectHall, onBookHall, halls }: FeaturedVenuesProps) {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCityId, setSelectedCityId] = useState<string>('bengaluru'); // Default city as per prompt select city first
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'formal' | 'informal'>('all');

  const states = ['All', 'Karnataka', 'Kerala', 'Goa', 'Tamil Nadu'];

  // Filter cities by state
  const filteredCities = CITIES.filter(
    (city) => selectedState === 'All' || city.state === selectedState
  );

  // Filter halls based on selected city and event type compatibility
  const filteredHalls = halls.filter((hall) => {
    // 1. Filter by location (state / city)
    const matchesLocation = selectedCityId === 'all'
      ? (selectedState === 'All' || CITIES.find(c => c.id === hall.cityId)?.state === selectedState)
      : hall.cityId === selectedCityId;

    // 2. Filter by event type
    const matchesEventType = selectedEventType === 'all' || 
      (hall.eventTypes && hall.eventTypes.includes(selectedEventType));

    return matchesLocation && matchesEventType;
  });

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const citiesForState = CITIES.filter((c) => state === 'All' || c.state === state);
    if (citiesForState.length > 0) {
      setSelectedCityId(citiesForState[0].id); // Select first city of that state
    } else {
      setSelectedCityId('all');
    }
  };

  return (
    <section id="featured-venues" className="py-20 bg-slate-50/70 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-Class Halls</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Venues & Banquets
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl">
              Filter by state and select your destination city to explore magnificent properties designed for high-end hospitality.
            </p>
          </div>

          {/* State Select Tabs */}
          <div className="flex flex-wrap gap-2">
            {states.map((state) => (
              <button
                key={state}
                id={`state-tab-${state.replace(' ', '-').toLowerCase()}`}
                onClick={() => handleStateChange(state)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedState === state
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* City & Event Type Filters Selection Grid */}
        <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
              1. Select Location (City):
            </h4>
            
            <div className="flex flex-wrap gap-2">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  id={`city-btn-${city.id}`}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                    selectedCityId === city.id
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-850 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${selectedCityId === city.id ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>{city.name}</span>
                </button>
              ))}
              {filteredCities.length === 0 && (
                <span className="text-xs text-slate-400">No cities configured for this selection.</span>
              )}
            </div>
          </div>

          <div className="lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-6 shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
              2. Event Suitability Filter:
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: '✨ All Gatherings' },
                { id: 'formal', label: '👔 Formal Events' },
                { id: 'informal', label: '🎉 Informal Events' }
              ].map((type) => (
                <button
                  key={type.id}
                  id={`event-type-btn-${type.id}`}
                  onClick={() => setSelectedEventType(type.id as any)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
                    selectedEventType === type.id
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-850 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Halls Grid */}
        <div id="halls-list-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHalls.map((hall) => (
            <div
              key={hall.id}
              id={`hall-card-${hall.id}`}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-2xl dark:shadow-slate-950/20 hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-350"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hall.images[0]}
                  alt={hall.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Rating overlay */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300 stroke-none" />
                  <span>{hall.rating.toFixed(1)}</span>
                </div>

                {/* Capacity badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/50 backdrop-blur-md text-xs font-semibold text-white">
                  <Users className="w-3.5 h-3.5 text-rose-400" />
                  <span>Max {hall.capacity} guests</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{hall.cityName}, {CITIES.find(c => c.id === hall.cityId)?.state}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {hall.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {hall.description}
                  </p>

                  {/* Highlights/Amenities */}
                  <div className="mt-4 flex flex-wrap gap-1.5 h-12 overflow-hidden">
                    {hall.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-150 dark:border-slate-800/85 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Rate</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      ₹{hall.pricePerDay.toLocaleString()}
                      <span className="text-xs font-normal text-slate-400"> /day</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`hall-details-btn-${hall.id}`}
                      onClick={() => onSelectHall(hall)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      id={`hall-book-btn-${hall.id}`}
                      onClick={() => onBookHall(hall)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all cursor-pointer shadow-md"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredHalls.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                No venues registered in {CITIES.find(c => c.id === selectedCityId)?.name || 'this city'} yet.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try selecting Bengaluru, Mangaluru, Kochi, Chennai, or Mysuru to inspect available luxury properties.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
