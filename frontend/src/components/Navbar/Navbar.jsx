import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Sparkles, LogIn, UserPlus, Menu, X, User as UserIcon, Database } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, user, onLogout, dbConnected }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Formal Events', path: '/formal-events' },
    { label: 'Informal Events', path: '/informal-events' },
    { label: 'Locations', path: '/locations' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-slate-200/40 bg-white/70 backdrop-blur-lg dark:border-slate-800/40 dark:bg-slate-950/70 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Logo, DB Badge and Desktop Navigation grouped together */}
        <div className="flex items-center gap-6 xl:gap-8">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link id="logo-link" to="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-500/20 transition-all group-hover:scale-105">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Event<span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Ease</span>
              </span>
            </Link>

            {/* Database Status Indicator */}
            <div
              id="db-status-badge"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold select-none transition-colors"
              title={dbConnected === null ? "Pinging backend and checking MongoDB connection status" : dbConnected ? "Connected to MongoDB Cloud Atlas successfully" : "Using fast In-Memory Local Database Fallback"}
            >
              <Database className={`w-3 h-3 ${dbConnected === null ? "text-slate-400 animate-spin" : dbConnected ? "text-emerald-500" : "text-amber-500"}`} />
              {dbConnected === null ? (
                <span className="text-slate-500 dark:text-slate-400">Verifying DB...</span>
              ) : dbConnected ? (
                <span className="text-emerald-600 dark:text-emerald-400">MongoDB Connected</span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">Local DB Active</span>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                className={`px-2 py-1.5 md:px-2.5 lg:px-3.5 text-xs lg:text-sm font-semibold rounded-lg transition-all duration-150 ${
                  isActive(item.path)
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-350 dark:hover:bg-slate-900/60 dark:hover:text-white'
                }`}
              >
                {item.label === 'Formal Events' ? (
                  <>
                    <span className="md:inline lg:hidden">Formal</span>
                    <span className="hidden lg:inline">Formal Events</span>
                  </>
                ) : item.label === 'Informal Events' ? (
                  <>
                    <span className="md:inline lg:hidden">Informal</span>
                    <span className="hidden lg:inline">Informal Events</span>
                  </>
                ) : (
                  item.label
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Utility / Auth actions */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-250 cursor-pointer transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* User Section / Auth Links */}
          {user ? (
            <div className="flex items-center gap-2 lg:gap-3">
              {user.role === 'admin' && (
                <Link
                  id="admin-dashboard-link"
                  to="/admin-dashboard"
                  className="px-2.5 py-1.5 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 dark:text-amber-400 rounded-md transition-all"
                >
                  Admin
                </Link>
              )}
              <Link
                id="profile-link"
                to="/profile"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 rounded-lg transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[80px] truncate">{user.name}</span>
              </Link>
              <button
                id="logout-btn"
                onClick={onLogout}
                className="text-xs lg:text-sm font-semibold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Link
                id="login-link"
                to="/login"
                className="flex items-center gap-1 px-2 py-1.5 text-xs lg:text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Login</span>
              </Link>
              <Link
                id="register-link"
                to="/register"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle Mobile */}
          <button
            id="mobile-theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 cursor-pointer transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                id={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-1.5 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</span>
                </div>
                {user.role === 'admin' && (
                  <Link
                    id="mobile-admin-dashboard-link"
                    to="/admin-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-amber-600 dark:text-amber-400"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  id="mobile-profile-link"
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900/60"
                >
                  My Profile
                </Link>
                <button
                  id="mobile-logout-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-2">
                <Link
                  id="mobile-login-link"
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  id="mobile-register-link"
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
