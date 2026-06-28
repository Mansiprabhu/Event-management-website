import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, BadgePercent, Award, GlassWater, Clock, PhoneCall, 
  MapPin, Mail, ChevronRight, MessageSquare, ExternalLink, Sparkles
} from 'lucide-react';

// Gallery Images mapping
const GALLERY_ITEMS = [
  { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600', tag: 'Wedding Reception', title: 'Grand Royal Mandap' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', tag: 'Conference', title: 'Acoustic Auditorium' },
  { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600', tag: 'Music Night', title: 'Starlit Rooftop Deck' },
  { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600', tag: 'Engagement', title: 'Chandelier Banquet Room' },
  { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600', tag: 'Anniversary', title: 'Breezy Palms Lawn' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', tag: 'Product Launch', title: 'LED Showcase Studio' }
];

const TESTIMONIALS = [
  {
    quote: "EventSphere completely took the stress out of our corporate launch. We reserved the Skyline Rooftop Hall online, added premium audio and MC services, and had a fully synchronized event with zero issues. Absolutely brilliant service!",
    author: "Prasanna Kumar",
    role: "Director of Product, FinTech Corp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "Booking the Grand Palace Hall for my daughter's wedding reception was seamless. The slot validation assured us no overlap, and the catering addition was incredible. The South Indian feast was highly praised by our 800 guests.",
    author: "Savitha Hegde",
    role: "Mother of the Bride",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "We chose the Whispering Palms Beach Resort Hall in Goa for our sundowner. Direct beach access, crystal acoustics, and custom decoration. EventSphere's dashboard and payment flow is unmatched in efficiency.",
    author: "Ryan D'Souza",
    role: "Co-Founder, WaveTech Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  }
];

export function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Real-Time Slot Validation",
      desc: "Our booking algorithm guarantees no schedule conflicts. Reserve Morning, Afternoon, or Evening slots granularly."
    },
    {
      icon: Award,
      title: "Handpicked Premium Properties",
      desc: "Every listed hall undergoes strict quality audits for central AC, ceiling heights, acoustics, and VIP dressing suites."
    },
    {
      icon: GlassWater,
      title: "End-to-End Customization",
      desc: "Add gourmet multi-cuisine catering, theme florists, professional cinematographers, DJs, or bilingual hosts seamlessly."
    },
    {
      icon: Clock,
      title: "Instant Confirmation & Receipts",
      desc: "Receive immediate receipt downloads, digital entry booking passes, and 24/7 automated dashboard syncs."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left text Block */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The EventSphere Advantage</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Seamless Booking, Unforgettable Moments
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            We bridge the gap between premium properties and event hosts. Explore, inspect, configure, and secure some of the finest properties in Karnataka, Kerala, Goa, and Tamil Nadu.
          </p>
          
          <div className="pt-4 flex gap-6 text-center border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="block text-2xl font-black text-amber-500">12+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Top South Cities</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-amber-500">500k+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Guests Catered</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-amber-500">4.9</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Average Rating</span>
            </div>
          </div>
        </div>

        {/* Right Feature Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title} 
                id={`feature-card-${feat.title.toLowerCase().replace(/ /g, '-')}`}
                className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 w-fit rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/5 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{feat.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Creators & Celebrants
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
            See what wedding planners, event organizers, and families say about our hall standardizations.
          </p>
        </div>

        {/* Grid cards */}
        <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              id={`testimonial-card-${idx}`}
              className="p-6 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Quotes icon */}
                <span className="text-4xl text-rose-500/20 font-serif leading-none block">“</span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              {/* Author profile */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2.5">
                <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover border" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{t.author}</span>
                  <span className="text-[10px] text-slate-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Wedding Reception', 'Conference', 'Music Night', 'Engagement', 'Anniversary', 'Product Launch'];

  const filteredGallery = GALLERY_ITEMS.filter(item => activeFilter === 'All' || item.tag === activeFilter);

  return (
    <section id="gallery-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Property Showcase Gallery
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Take a look at captured raw moments, banquet decorations, lighting setups, and visual layouts.
        </p>

        {/* Gallery Tag Filters */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-6">
          {filters.map(filt => (
            <button
              key={filt}
              id={`gallery-filter-${filt.replace(' ', '-').toLowerCase()}`}
              onClick={() => setActiveFilter(filt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filt
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-black shadow'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-700'
              }`}
            >
              {filt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div id="gallery-image-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => (
          <div
            key={idx}
            id={`gallery-item-${idx}`}
            className="group relative aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-800"
          >
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md mb-1.5">{item.tag}</span>
              <h5 className="font-bold text-xs">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Info Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Need Support?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Have specific constraints, bulk wedding inquiry bookings, custom floral decor requests, or want to audit a venue on-site? Connect with our premium helpdesk concierge.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Customer Support Desk</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">+91 80 4991 2000</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Corporate Sales Support</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">sales@eventsphere.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Corporate HQ Office</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Brigade Road, Bengaluru, KA - 560001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7">
          <form 
            id="contact-form"
            onSubmit={handleSendMessage}
            className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs"
          >
            <h4 className="text-sm font-bold text-slate-900 dark:text-white"> concierge callback request</h4>
            
            {success && (
              <div id="contact-success-banner" className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                ✔ Concierge request logged! We will reach out within 1 business hour.
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Your Email Address</label>
              <input
                id="contact-email"
                type="email"
                placeholder="mansi@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">How can we assist you?</label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Describe your event parameters, custom catering options requested, expected guest volumes, or specific destination queries."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Submit Concierge Request</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
