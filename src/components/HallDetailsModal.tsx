import React, { useState } from 'react';
import { 
  X, Star, Users, MapPin, BadgePercent, CheckCircle,
  Wifi, Car, Snowflake, Disc, Presentation, Tv, DoorClosed, 
  Utensils, TreePine, Waves, Sparkles, Camera, Coffee, Accessibility, Zap,
  ChevronLeft, ChevronRight, MessageSquare, CalendarCheck
} from 'lucide-react';
import { Hall } from '../types';
import { REVIEWS } from '../data';

interface HallDetailsModalProps {
  hall: Hall | null;
  onClose: () => void;
  onBook: (hall: Hall) => void;
}

// Map amenities to icons
const AMENITY_ICONS: { [key: string]: React.ComponentType<any> } = {
  'WiFi': Wifi,
  'Parking': Car,
  'Air Conditioning': Snowflake,
  'DJ Setup': Disc,
  'Stage': Presentation,
  'LED Screen': Tv,
  'Bridal Room': DoorClosed,
  'Dining Hall': Utensils,
  'Garden Area': TreePine,
  'Swimming Pool': Waves,
  'Decoration': Sparkles,
  'Photography': Camera,
  'Catering': Coffee,
  'Wheelchair Accessible': Accessibility,
  'Generator Backup': Zap
};

export default function HallDetailsModal({ hall, onClose, onBook }: HallDetailsModalProps) {
  if (!hall) return null;

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const prevImage = () => {
    setActiveImgIdx((prev) => (prev === 0 ? hall.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImgIdx((prev) => (prev === hall.images.length - 1 ? 0 : prev + 1));
  };

  // Filter reviews matching this hall
  const hallReviews = REVIEWS.filter((r) => r.hallId === hall.id);

  // Generate some realistic upcoming available dates for showcase
  const mockDates = [
    { day: 'Mon', date: 'Jul 12', status: 'Available' },
    { day: 'Tue', date: 'Jul 13', status: 'Booked' },
    { day: 'Wed', date: 'Jul 14', status: 'Available' },
    { day: 'Thu', date: 'Jul 15', status: 'Available' },
    { day: 'Fri', date: 'Jul 16', status: 'Booked' },
    { day: 'Sat', date: 'Jul 17', status: 'Available' },
    { day: 'Sun', date: 'Jul 18', status: 'Available' }
  ];

  return (
    <div id="hall-details-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 md:p-10">
      <div 
        id="hall-details-container" 
        className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors duration-300 my-auto"
      >
        {/* Close Button */}
        <button
          id="close-details-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Slider / Carousel */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
          <img
            src={hall.images[activeImgIdx]}
            alt={`${hall.name} - Slide ${activeImgIdx + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

          {/* Left Arrow */}
          <button
            id="prev-slide-btn"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            id="next-slide-btn"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {hall.images.map((_, idx) => (
              <button
                key={idx}
                id={`carousel-dot-${idx}`}
                onClick={() => setActiveImgIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeImgIdx ? 'w-5 bg-amber-500' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Layout Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              {/* Rating and Reviews header count */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>{hall.rating.toFixed(1)}</span>
                </div>
                <span>({hall.reviewsCount} verified bookings)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                {hall.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{hall.cityName}, South India</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                About the Venue
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {hall.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Included Amenities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hall.amenities.map((item) => {
                  const Icon = AMENITY_ICONS[item] || CheckCircle;
                  return (
                    <div
                      key={item}
                      id={`amenity-item-${item.replace(' ', '-').toLowerCase()}`}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-700 dark:text-slate-300"
                    >
                      <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-xs font-medium">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Features/Highlights */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                Standout Highlights
              </h4>
              <ul className="space-y-1.5">
                {hall.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo Gallery Grid */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Photo Gallery
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {hall.images.map((img, index) => (
                  <div
                    key={index}
                    id={`gallery-thumb-${index}`}
                    onClick={() => setActiveImgIdx(index)}
                    className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      index === activeImgIdx ? 'border-amber-500 scale-[0.98]' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Board */}
            <div className="pt-4 border-t border-slate-150 dark:border-slate-800/85">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Guest Experiences ({hallReviews.length})</span>
              </h4>
              <div className="space-y-4">
                {hallReviews.length > 0 ? (
                  hallReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.avatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                        </div>
                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No custom reviews posted for this hall yet. Highly recommended based on brand audits!</p>
                )}
              </div>
            </div>

          </div>

          {/* Sticky Checkout Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md space-y-4 sticky top-24">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Base Package Rate</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  ₹{hall.pricePerDay.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> /day</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Inclusive of basic sound, electricity backup, and cleaning.</p>
              </div>

              {/* Capacities */}
              <div className="py-3 border-y border-slate-100 dark:border-slate-850 grid grid-cols-2 gap-2 text-center">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">Capacity</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">{hall.capacity} Guests</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">Valet Parking</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">Supported</span>
                </div>
              </div>

              {/* Show Calendar availability status */}
              <div>
                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Availability Calendar</span>
                </h5>
                <div className="grid grid-cols-7 gap-1">
                  {mockDates.map((item) => (
                    <div 
                      key={item.date} 
                      className={`text-center p-1 rounded ${
                        item.status === 'Available' 
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-rose-500/10 border border-rose-500/20 text-rose-500/60 line-through'
                      }`}
                      title={item.status}
                    >
                      <span className="block text-[8px] font-semibold uppercase">{item.day}</span>
                      <span className="text-[9px] font-bold">{item.date.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-to-Action Book Button */}
              <button
                id="details-book-now-btn"
                onClick={() => onBook(hall)}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Hall Slot</span>
              </button>

              <p className="text-[9px] text-center text-slate-400">Flexible 8-hour or Full Day reservation multipliers apply.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
