import React, { useState } from 'react';
import { 
  TrendingUp, BarChart3, PieChart, Users, Calendar, DollarSign, Building2, 
  Trash2, Plus, Edit2, ShieldAlert, Star, CheckCircle, Clock, Check, X, Search, MapPin, ChevronRight
} from 'lucide-react';
import { CITIES, EVENT_CATEGORIES, EXTRA_SERVICES, REVIEWS } from '../data';
import { Booking, Hall, Review } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  halls: Hall[];
  reviews: Review[];
  onAddHall: (hall: Hall) => void;
  onUpdateHallPrice: (hallId: string, newPrice: number) => void;
  onDeleteHall: (hallId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
  onApproveBooking: (bookingId: string) => void;
  onDeleteReview: (reviewId: string) => void;
}

export default function AdminDashboard({
  bookings,
  halls,
  reviews,
  onAddHall,
  onUpdateHallPrice,
  onDeleteHall,
  onDeleteBooking,
  onApproveBooking,
  onDeleteReview
}: AdminDashboardProps) {

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'halls' | 'reviews' | 'users' | 'locations'>('overview');

  // Bookings search & filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Confirmed' | 'Pending'>('All');

  // Halls search & Add Hall form state
  const [hallSearch, setHallSearch] = useState('');
  const [showAddHallForm, setShowAddHallForm] = useState(false);
  const [newHallName, setNewHallName] = useState('');
  const [newHallCityId, setNewHallCityId] = useState('bengaluru');
  const [newHallCapacity, setNewHallCapacity] = useState(400);
  const [newHallPrice, setNewHallPrice] = useState(45000);
  const [newHallDesc, setNewHallDesc] = useState('');

  // 1. Calculations & Metrics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalHalls = halls.length;
  
  // Upcoming events are bookings with date >= today
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingEventsCount = bookings.filter(b => b.date >= todayStr).length;

  // Handler to add a new hall
  const handleCreateHall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHallName || !newHallDesc) return;

    const newHall: Hall = {
      id: 'hall-' + Math.floor(1000 + Math.random() * 9000),
      name: newHallName,
      cityId: newHallCityId,
      cityName: CITIES.find(c => c.id === newHallCityId)?.name || 'Unknown',
      capacity: Number(newHallCapacity),
      pricePerDay: Number(newHallPrice),
      amenities: ['Air Conditioning', 'Parking', 'Stage', 'LED Screen', 'WiFi', 'Generator Backup'],
      description: newHallDesc,
      rating: 5.0,
      reviewsCount: 0,
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800'
      ],
      features: ['New Addition', 'Modern Design'],
      eventTypes: ['formal', 'informal']
    };

    onAddHall(newHall);
    
    // Reset form
    setNewHallName('');
    setNewHallCapacity(400);
    setNewHallPrice(45000);
    setNewHallDesc('');
    setShowAddHallForm(false);
  };

  // 2. Booking filtering logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.hallName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.id.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesFilter = bookingFilter === 'All' || b.status === bookingFilter;
    return matchesSearch && matchesFilter;
  });

  // 3. Halls filtering logic
  const filteredHalls = halls.filter(h => 
    h.name.toLowerCase().includes(hallSearch.toLowerCase()) ||
    h.cityName.toLowerCase().includes(hallSearch.toLowerCase())
  );

  // Mock User accounts list for completeness
  const mockUsers = [
    { id: 'usr-1', name: 'Mansi Prabhu', email: 'mansi@example.com', role: 'admin', bookings: 2, registered: '2026-02-14' },
    { id: 'usr-2', name: 'Rajesh Sharma', email: 'rajesh@example.com', role: 'customer', bookings: 1, registered: '2026-05-10' },
    { id: 'usr-3', name: 'Meera Rao', email: 'meera@example.com', role: 'customer', bookings: 1, registered: '2026-06-01' },
    { id: 'usr-4', name: 'Dr. Srinivas Prasad', email: 'srinivas@heritage.org', role: 'customer', bookings: 1, registered: '2026-06-20' },
    { id: 'usr-5', name: 'Ananya Deshmukh', email: 'ananya@example.com', role: 'customer', bookings: 0, registered: '25-06-2026' }
  ];

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-5 mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-amber-500" />
            <span>EventSphere Admin Operations</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time control over events, city databases, hall registers, bookings, reviews, and revenue streams.
          </p>
        </div>
        
        {/* Quick status */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>System Engine Online</span>
        </div>
      </div>

      {/* Main Grid: Sidebar + Pane */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Control Tabs */}
        <div className="space-y-1.5">
          <button
            id="tab-admin-overview"
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Overview Analytics</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="tab-admin-bookings"
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Bookings Ledger</span>
            </span>
            <span className="bg-slate-100 dark:bg-slate-850 dark:text-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
              {bookings.length}
            </span>
          </button>

          <button
            id="tab-admin-halls"
            onClick={() => setActiveTab('halls')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'halls'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Halls Register</span>
            </span>
            <span className="bg-slate-100 dark:bg-slate-850 dark:text-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
              {halls.length}
            </span>
          </button>

          <button
            id="tab-admin-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Reviews Moderation</span>
            </span>
            <span className="bg-slate-100 dark:bg-slate-850 dark:text-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
              {reviews.length}
            </span>
          </button>

          <button
            id="tab-admin-users"
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>User Accounts</span>
            </span>
            <span className="bg-slate-100 dark:bg-slate-850 dark:text-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
              5
            </span>
          </button>

          <button
            id="tab-admin-locations"
            onClick={() => setActiveTab('locations')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'locations'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200/45 dark:border-slate-800/45'
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Database Cities</span>
            </span>
            <span className="bg-slate-100 dark:bg-slate-850 dark:text-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
              {CITIES.length}
            </span>
          </button>
        </div>

        {/* Right Active Pane Content */}
        <div className="md:col-span-3 space-y-6">
          
          {/* OVERVIEW ANALYTICS */}
          {activeTab === 'overview' && (
            <div id="pane-admin-overview" className="space-y-8 animate-fade-in">
              {/* KPI CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Bookings card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">{totalBookings} slots</span>
                  </div>
                </div>

                {/* Revenue card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Revenue</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">₹{totalRevenue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Available halls */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Halls</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">{totalHalls} venues</span>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Events</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">{upcomingEventsCount} slots</span>
                  </div>
                </div>

              </div>

              {/* NATIVE HIGH-FIDELITY SVG CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart 1: Monthly Booking trends */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    <span>Monthly Booking Trends</span>
                  </h4>

                  {/* SVG Bar Chart */}
                  <div className="relative h-48 w-full flex items-end justify-between pt-6 border-b border-l border-slate-100 dark:border-slate-850 px-2">
                    {/* Gridlines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8px] text-slate-400/50">
                      <div className="border-t border-slate-100 dark:border-slate-800/50 w-full" />
                      <div className="border-t border-slate-100 dark:border-slate-800/50 w-full" />
                      <div className="border-t border-slate-100 dark:border-slate-800/50 w-full" />
                    </div>

                    {/* Bars */}
                    {[
                      { m: 'Mar', v: 40, h: '40%' },
                      { m: 'Apr', v: 65, h: '65%' },
                      { m: 'May', v: 85, h: '85%' },
                      { m: 'Jun', v: 95, h: '95%' },
                      { m: 'Jul', v: 120, h: '120%' }, // highest wedding season
                      { m: 'Aug', v: 75, h: '75%' }
                    ].map((bar) => (
                      <div key={bar.m} className="flex-1 flex flex-col items-center group relative z-10">
                        {/* Bar Segment */}
                        <div 
                          style={{ height: bar.h }}
                          className="w-7 sm:w-10 bg-gradient-to-t from-amber-600 to-amber-400 dark:from-amber-500 dark:to-yellow-400 rounded-t-md hover:brightness-110 transition-all cursor-pointer shadow-sm relative"
                        >
                          {/* Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity pointer-events-none">
                            {bar.v} Bookings
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-2">{bar.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Revenue Distribution / Popular Events */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-rose-500" />
                    <span>Popular Event Types Distribution</span>
                  </h4>

                  {/* SVG Donut / Pie representing categories */}
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-4 h-48">
                    
                    {/* Interactive SVG circle */}
                    <div className="relative w-32 h-32 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Underlay */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(226, 232, 240, 0.15)" strokeWidth="4" />
                        
                        {/* Weddings Segment 45% */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f43f5e" strokeWidth="4" 
                          strokeDasharray="45 100" strokeDashoffset="0" />
                        
                        {/* Corporate Conferences 30% */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" 
                          strokeDasharray="30 100" strokeDashoffset="-45" />

                        {/* Birthdays & Socials 15% */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" 
                          strokeDasharray="15 100" strokeDashoffset="-75" />

                        {/* Others 10% */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" 
                          strokeDasharray="10 100" strokeDashoffset="-90" />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">100%</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase">Volume</span>
                      </div>
                    </div>

                    {/* Legends list */}
                    <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Weddings (45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Corporate (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Birthdays (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Social Concerts (10%)</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* RECENT BOOKING TEASER TABLE */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Live Booking Synchronization Feed</span>
                  </h4>
                  <button 
                    id="teaser-view-all-bookings"
                    onClick={() => setActiveTab('bookings')} 
                    className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    Manage Ledgers
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950/40 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-100 dark:border-slate-850">
                        <th className="p-3">ID</th>
                        <th className="p-3">Host Client</th>
                        <th className="p-3">Venue / Hall</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Slot</th>
                        <th className="p-3 text-right">Invoice Sum</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {bookings.slice(0, 4).map((bk) => (
                        <tr key={bk.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-350">
                          <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{bk.id}</td>
                          <td className="p-3 font-semibold">{bk.userName}</td>
                          <td className="p-3">{bk.hallName}</td>
                          <td className="p-3 font-bold">{bk.date}</td>
                          <td className="p-3">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase">
                              {bk.slot}
                            </span>
                          </td>
                          <td className="p-3 text-right font-black">₹{bk.totalPrice.toLocaleString()}</td>
                          <td className="p-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              bk.status === 'Confirmed' 
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            }`}>
                              {bk.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS LEDGER TABLE PANEL */}
          {activeTab === 'bookings' && (
            <div id="pane-admin-bookings" className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-booking-search"
                    type="text"
                    placeholder="Search host email, name, ID..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Filter Selector */}
                <div className="flex gap-1">
                  {(['All', 'Confirmed', 'Pending'] as const).map((mode) => (
                    <button
                      key={mode}
                      id={`booking-filter-tab-${mode.toLowerCase()}`}
                      onClick={() => setBookingFilter(mode)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        bookingFilter === mode
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white hover:bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-350 border border-slate-200/60 dark:border-slate-850'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings listing */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950/40 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-150 dark:border-slate-850">
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Customer Host</th>
                      <th className="p-4">Hall Name</th>
                      <th className="p-4">Reservation Details</th>
                      <th className="p-4 text-right">Sum Invoice</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                    {filteredBookings.map((bk) => (
                      <tr key={bk.id} id={`ledger-row-${bk.id}`} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-350">
                        <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">{bk.id}</td>
                        <td className="p-4">
                          <span className="block font-bold text-slate-900 dark:text-slate-100">{bk.userName}</span>
                          <span className="text-[10px] text-slate-400">{bk.userEmail}</span>
                        </td>
                        <td className="p-4">
                          <span className="block font-bold">{bk.hallName}</span>
                          <span className="text-[10px] text-slate-400">{bk.cityName}</span>
                        </td>
                        <td className="p-4">
                          <span className="block font-semibold">📅 {bk.date}</span>
                          <span className="text-[10px] text-slate-400">Slot: <span className="font-bold text-slate-600 dark:text-slate-300">{bk.slot}</span> ({bk.guests} gsts)</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="block font-black text-slate-900 dark:text-white">₹{bk.totalPrice.toLocaleString()}</span>
                          <span className="text-[9px] text-slate-400">{bk.paymentMethod}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-bold uppercase ${
                            bk.status === 'Confirmed'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            {bk.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {bk.status === 'Pending' && (
                              <button
                                id={`approve-bk-btn-${bk.id}`}
                                onClick={() => onApproveBooking(bk.id)}
                                title="Approve booking payment"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors cursor-pointer"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              id={`delete-bk-btn-${bk.id}`}
                              onClick={() => onDeleteBooking(bk.id)}
                              title="Delete booking reservation"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-400">No synchronized bookings match the filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HALLS REGISTER & CRUD PANEL */}
          {activeTab === 'halls' && (
            <div id="pane-admin-halls" className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-hall-search"
                    type="text"
                    placeholder="Search halls..."
                    value={hallSearch}
                    onChange={(e) => setHallSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  id="add-hall-toggle-btn"
                  onClick={() => setShowAddHallForm(!showAddHallForm)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow hover:shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  {showAddHallForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{showAddHallForm ? 'Close Form' : 'Register Hall'}</span>
                </button>
              </div>

              {/* Add Hall Form */}
              {showAddHallForm && (
                <form 
                  id="add-hall-form" 
                  onSubmit={handleCreateHall}
                  className="p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in"
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span>Register New Luxury Property</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label htmlFor="new-hall-name" className="block text-[10px] font-bold text-slate-400 uppercase">Hall Name</label>
                      <input
                        id="new-hall-name"
                        type="text"
                        placeholder="e.g. Royal Windsor Ballroom"
                        value={newHallName}
                        onChange={(e) => setNewHallName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="new-hall-city" className="block text-[10px] font-bold text-slate-400 uppercase">Destination City</label>
                      <select
                        id="new-hall-city"
                        value={newHallCityId}
                        onChange={(e) => setNewHallCityId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                      >
                        {CITIES.map((c) => (
                          <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="new-hall-capacity" className="block text-[10px] font-bold text-slate-400 uppercase">Max Guest Capacity</label>
                      <input
                        id="new-hall-capacity"
                        type="number"
                        placeholder="e.g. 500"
                        value={newHallCapacity}
                        onChange={(e) => setNewHallCapacity(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="new-hall-price" className="block text-[10px] font-bold text-slate-400 uppercase">Base Rate / Day (₹)</label>
                      <input
                        id="new-hall-price"
                        type="number"
                        placeholder="e.g. 60000"
                        value={newHallPrice}
                        onChange={(e) => setNewHallPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div className="col-span-full space-y-1">
                      <label htmlFor="new-hall-desc" className="block text-[10px] font-bold text-slate-400 uppercase">Property Description</label>
                      <textarea
                        id="new-hall-desc"
                        rows={3}
                        placeholder="Describe architectural features, ceiling height, bridal suites, acoustic treatments, dining room setups, and valet park space."
                        value={newHallDesc}
                        onChange={(e) => setNewHallDesc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      id="reset-hall-form"
                      type="button"
                      onClick={() => setShowAddHallForm(false)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer hover:bg-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      id="submit-hall-form"
                      type="submit"
                      className="px-5 py-2 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold rounded-xl shadow cursor-pointer hover:brightness-115"
                    >
                      Register Venue
                    </button>
                  </div>
                </form>
              )}

              {/* Halls list details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredHalls.map((h) => (
                  <div
                    key={h.id}
                    id={`admin-hall-entry-${h.id}`}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-3 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{h.name}</h5>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{h.cityName}</span>
                        </p>
                      </div>
                      <button
                        id={`delete-hall-btn-${h.id}`}
                        onClick={() => onDeleteHall(h.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 dark:border-slate-800 py-3">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Max Cap</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{h.capacity} guests</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Standard Rate</span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-850 dark:text-slate-200">₹{h.pricePerDay.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick rate modifier inline */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">Modify Rate (₹):</span>
                      <input
                        id={`input-modify-price-${h.id}`}
                        type="number"
                        defaultValue={h.pricePerDay}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (val > 0 && val !== h.pricePerDay) {
                            onUpdateHallPrice(h.id, val);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = Number((e.target as HTMLInputElement).value);
                            if (val > 0 && val !== h.pricePerDay) {
                              onUpdateHallPrice(h.id, val);
                              (e.target as HTMLInputElement).blur();
                            }
                          }
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-1 focus:ring-amber-500 outline-none font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS MODERATION PANEL */}
          {activeTab === 'reviews' && (
            <div id="pane-admin-reviews" className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Moderating Client Feedback ({reviews.length})</h4>
              
              <div className="space-y-3">
                {reviews.map((rev) => {
                  const matchingHall = halls.find(h => h.id === rev.hallId);
                  return (
                    <div key={rev.id} id={`mod-rev-card-${rev.id}`} className="p-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <img src={rev.avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">{rev.userName}</span>
                            <span className="text-[9px] text-slate-400">{rev.date} • Reviewing: <span className="font-bold text-slate-600 dark:text-slate-300">{matchingHall?.name || rev.hallId}</span></span>
                          </div>
                        </div>

                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      <button
                        id={`delete-mod-rev-${rev.id}`}
                        onClick={() => onDeleteReview(rev.id)}
                        className="p-2 self-start rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
                        title="Remove review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* USER ACCOUNTS PANEL */}
          {activeTab === 'users' && (
            <div id="pane-admin-users" className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Authorized Accounts</h4>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950/40 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-150 dark:border-slate-850">
                      <th className="p-3">User ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Assigned Role</th>
                      <th className="p-3 text-center">Active Bookings</th>
                      <th className="p-3">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-350">
                        <td className="p-3 font-mono text-amber-600 dark:text-amber-400">{u.id}</td>
                        <td className="p-3 font-bold">{u.name}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            u.role === 'admin' 
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/30' 
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold">{u.bookings}</td>
                        <td className="p-3 font-medium text-slate-400">{u.registered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LOCATIONS DATABASE */}
          {activeTab === 'locations' && (
            <div id="pane-admin-locations" className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Cities Map</h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CITIES.map((c) => {
                  const stateColor = c.state === 'Karnataka' ? 'bg-amber-500' : c.state === 'Kerala' ? 'bg-emerald-500' : c.state === 'Goa' ? 'bg-blue-500' : 'bg-rose-500';
                  return (
                    <div key={c.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-1 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full ${stateColor}`} />
                      <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">{c.state}</span>
                      <span className="block font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
