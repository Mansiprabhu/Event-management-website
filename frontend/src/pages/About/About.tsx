import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: 'Royal hospitality',
      description: 'We partner only with premium, architecturally exceptional convention centers and luxury banquets.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Secure guarantees',
      description: 'Safe slot locks, transparent pricing in Rupees, and automatic instant digital confirmations.'
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: 'Custom tailoring',
      description: 'From gourmet regional catering spreads to live music, make any standard space truly yours.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Dedicated support',
      description: 'On-site logistical management, valet coordination, and audio-visual expertise.'
    }
  ];

  return (
    <div className="py-12 space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Legacy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Redefining Celebrations & Corporate Alignments
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          At EventEase, we believe that finding the perfect venue should be simple, elegant, and stress-free. We curate South India’s most prestigious event spaces to make your dream gatherings an effortless reality.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm text-center">
        <div>
          <span className="block text-3xl sm:text-4xl font-black text-slate-950 dark:text-amber-400">15+</span>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Major Cities</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-black text-slate-950 dark:text-amber-400">120+</span>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Luxury Halls</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-black text-slate-950 dark:text-amber-400">10,000+</span>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Events Hosted</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-black text-slate-950 dark:text-amber-400">4.9★</span>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Average Rating</span>
        </div>
      </div>

      {/* Grid of Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Our Core Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Every booking is backed by our four promises of premium hospitality and technical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/30 dark:border-slate-800/30 flex flex-col items-start gap-4 hover:shadow-lg transition-all"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{v.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
