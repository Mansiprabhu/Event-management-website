import { Sun, Moon, Sparkles, LayoutDashboard, Ticket, ShieldCheck } from 'lucide-react';

export type AppPages = 'home' | 'my-bookings' | 'admin' | 'categories' | 'why-us' | 'gallery' | 'contact';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentPage: AppPages;
  setCurrentPage: (page: AppPages) => void;
  onOpenBookingFlow: () => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
  onOpenBookingFlow
}: HeaderProps) {
  return (
    <header id="main-header" className="sticky top-0 z-50 w-full border-b border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          id="logo" 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/10 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-amber-600 to-rose-600 dark:from-white dark:via-amber-400 dark:to-rose-400 bg-clip-text text-transparent">
              EventSphere
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
              Hall Bookings & Management
            </p>
          </div>
        </div>

        {/* Navigation / Actions */}
        <div id="nav-actions" className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 mr-2">
            <button 
              id="nav-link-venues"
              onClick={() => setCurrentPage('home')}
              className={`hover:text-amber-500 transition-colors cursor-pointer pb-1 border-b-2 ${
                currentPage === 'home'
                  ? 'text-amber-500 border-amber-500'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Venues
            </button>
            <button 
              id="nav-link-categories"
              onClick={() => setCurrentPage('categories')}
              className={`hover:text-amber-500 transition-colors cursor-pointer pb-1 border-b-2 ${
                currentPage === 'categories'
                  ? 'text-amber-500 border-amber-500'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Categories
            </button>
            <button 
              id="nav-link-why-us"
              onClick={() => setCurrentPage('why-us')}
              className={`hover:text-amber-500 transition-colors cursor-pointer pb-1 border-b-2 ${
                currentPage === 'why-us'
                  ? 'text-amber-500 border-amber-500'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Why Us
            </button>
            <button 
              id="nav-link-gallery"
              onClick={() => setCurrentPage('gallery')}
              className={`hover:text-amber-500 transition-colors cursor-pointer pb-1 border-b-2 ${
                currentPage === 'gallery'
                  ? 'text-amber-500 border-amber-500'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Gallery
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-amber-500 transition-colors cursor-pointer pb-1 border-b-2 ${
                currentPage === 'contact'
                  ? 'text-amber-500 border-amber-500'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* My Tickets Nav Button */}
          <button
            id="my-tickets-btn"
            onClick={() => setCurrentPage('my-bookings')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              currentPage === 'my-bookings'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>My Tickets</span>
          </button>

          {/* Quick Book Button */}
          {['home', 'categories', 'why-us', 'gallery', 'contact'].includes(currentPage) && (
            <button
              id="quick-book-btn"
              onClick={onOpenBookingFlow}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Now
            </button>
          )}

          {/* Dark / Light Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 active:scale-95 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Admin Switch */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
            <button
              id="view-mode-toggle-btn"
              onClick={() => setCurrentPage(currentPage === 'admin' ? 'home' : 'admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer border ${
                currentPage === 'admin' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {currentPage === 'admin' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Go Admin</span>
                </>
              )}
            </button>

            {/* Micro Email Display */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Mansi Prabhu</span>
              <span className="text-[10px] text-slate-400">mansi@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
