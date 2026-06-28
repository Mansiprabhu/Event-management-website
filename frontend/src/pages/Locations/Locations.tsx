import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Building } from 'lucide-react';
import { CITIES, HALLS } from '../../data';

export default function Locations() {
  const navigate = useNavigate();

  // Group cities by state
  const states: { [key: string]: typeof CITIES } = {};
  CITIES.forEach((city) => {
    if (!states[city.state]) {
      states[city.state] = [];
    }
    states[city.state].push(city);
  });

  const getHallsCount = (cityId: string) => {
    return HALLS.filter((h) => h.cityId === cityId).length;
  };

  const handleCityClick = (cityId: string) => {
    // Navigate back to home with the selected city
    navigate('/', { state: { filterCityId: cityId } });
  };

  return (
    <div className="py-12 space-y-12 animate-fade-in">
      <div className="max-w-2xl space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none">
          Explore Our Cities & States
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          We operate inside premier hubs across South India, offering strategic proximity, spectacular architectures, and premium vendor alignments.
        </p>
      </div>

      <div className="space-y-10">
        {Object.keys(states).map((stateName) => (
          <div key={stateName} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              📍 {stateName}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {states[stateName].map((city) => {
                const count = getHallsCount(city.id);
                return (
                  <div
                    key={city.id}
                    id={`location-card-${city.id}`}
                    onClick={() => handleCityClick(city.id)}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-500/20 dark:hover:border-amber-500/20 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                            {city.name}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-1">
                            <Building className="w-3.5 h-3.5" />
                            {count} {count === 1 ? 'Venue' : 'Venues'} listed
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
