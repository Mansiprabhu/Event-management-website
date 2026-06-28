import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">EventSphere</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Design, customize, and reserve premier banquet halls, open-terrace gardens, and palatial convention centers in premium South Indian locations.
            </p>
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-amber-500 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">Locations</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><span className="font-semibold text-slate-700 dark:text-slate-300">Karnataka:</span> Bengaluru, Mysuru, Mangaluru, Udupi</li>
              <li><span className="font-semibold text-slate-700 dark:text-slate-300">Kerala:</span> Kochi, Kozhikode, Thiruvananthapuram</li>
              <li><span className="font-semibold text-slate-700 dark:text-slate-300">Goa:</span> Panaji, Margao</li>
              <li><span className="font-semibold text-slate-700 dark:text-slate-300">Tamil Nadu:</span> Chennai, Coimbatore, Madurai</li>
            </ul>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">Event Types</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>🎩 Conferences & Board Meetings</li>
              <li>🎓 Academic Seminars & Workshops</li>
              <li>🎉 Birthday Bashes & Anniversaries</li>
              <li>💒 Royal Weddings & Receptions</li>
              <li>👶 Theme Baby Showers</li>
              <li>🎵 Concerts & Night Parties</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">Reach Us</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Brigade Road Corporate Hub, Bengaluru, KA - 560001</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+91 80 4991 2000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>support@eventsphere.com</span>
            </div>
            <div className="pt-2 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>Fully offline mockup mode. Storage is managed client-side.</span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 EventSphere Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
