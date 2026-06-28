import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-450 border-t border-slate-855 dark:bg-slate-950 dark:border-slate-900 pt-16 pb-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <Link id="footer-logo-link" to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Event<span className="text-amber-400">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bringing state-of-the-art reservation mechanisms to South India's grandest halls and premium corporate summits.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link id="footer-link-home" to="/" className="text-slate-400 hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link id="footer-link-formal" to="/formal-events" className="text-slate-400 hover:text-amber-400 transition-colors">Formal Venues</Link>
              </li>
              <li>
                <Link id="footer-link-informal" to="/informal-events" className="text-slate-400 hover:text-amber-400 transition-colors">Informal Venues</Link>
              </li>
              <li>
                <Link id="footer-link-locations" to="/locations" className="text-slate-400 hover:text-amber-400 transition-colors">Locations & Cities</Link>
              </li>
            </ul>
          </div>

          {/* About & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link id="footer-link-about" to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link id="footer-link-contact" to="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">Contact & Callback</Link>
              </li>
              <li>
                <span className="text-slate-500">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-500">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-450">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-400">mansiashwinprabhu@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-400">+91 99028 12352</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-400">Mangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} EventEase Solutions Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>in Mangalore, India</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
