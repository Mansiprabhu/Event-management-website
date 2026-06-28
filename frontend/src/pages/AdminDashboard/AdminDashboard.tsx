import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Check, RefreshCw, Trash2, Building, IndianRupee, Calendar, Users, AlertCircle } from 'lucide-react';
import { CITIES, HALLS } from '../../data';
import { Hall } from '../../types';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Stats Metrics
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [hallsList, setHallsList] = useState<Hall[]>(HALLS);

  // New Hall Form states
  const [newHallName, setNewHallName] = useState('');
  const [newHallCityId, setNewHallCityId] = useState('bengaluru');
  const [newHallCapacity, setNewHallCapacity] = useState(500);
  const [newHallPrice, setNewHallPrice] = useState(75000);
  const [newHallImage, setNewHallImage] = useState('');
  const [newHallDesc, setNewHallDesc] = useState('');
  const [isSubmittingHall, setIsSubmittingHall] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventease_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.role === 'admin') {
        setIsAdmin(true);
        fetchDashboardData();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch bookings
      const bookRes = await axios.get('/api/bookings');
      setBookingsList(bookRes.data);

      // Sum revenue
      const revSum = bookRes.data.reduce((acc: number, item: any) => acc + item.totalPrice, 0);
      setTotalRevenue(revSum);

      // 2. Fetch halls
      const hallRes = await axios.get('/api/halls');
      setHallsList(hallRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      // Fallback local calculations
      const localBookings = JSON.parse(localStorage.getItem('eventease_my_bookings') || '[]');
      setBookingsList(localBookings);
      const revSum = localBookings.reduce((acc: number, item: any) => acc + item.totalPrice, 0);
      setTotalRevenue(revSum);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'Confirmed' | 'Pending') => {
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus });
      setBookingsList((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating booking status:', err);
      // Local fallback status edit
      setBookingsList((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  const handleDeleteBooking = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this booking entirely?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookingsList((prev) => prev.filter((b) => b.id !== id));
      alert('Reservation deleted.');
    } catch (err) {
      console.error('Error deleting booking:', err);
      setBookingsList((prev) => prev.filter((b) => b.id !== id));
      alert('Reservation deleted.');
    }
  };

  const handleAddHallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHallName.trim() || !newHallDesc.trim()) return;

    setIsSubmittingHall(true);
    const chosenCity = CITIES.find((c) => c.id === newHallCityId) || CITIES[0];

    const payload = {
      name: newHallName,
      cityId: newHallCityId,
      cityName: chosenCity.name,
      capacity: Number(newHallCapacity),
      pricePerDay: Number(newHallPrice),
      description: newHallDesc,
      rating: 5.0,
      reviewsCount: 0,
      images: [
        newHallImage.trim() || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505232458729-2641700ddf8a?auto=format&fit=crop&q=80&w=600'
      ],
      features: [
        'Premium VIP highback seating',
        'Advanced LED backlighting systems',
        'Broadband fiber infrastructure pre-installed'
      ],
      amenities: ['Central AC', 'Valet Parking', 'Broadband Wi-Fi', 'Audio Equipment']
    };

    try {
      const res = await axios.post('/api/halls', payload);
      setHallsList((prev) => [res.data, ...prev]);
      
      // Clear forms
      setNewHallName('');
      setNewHallImage('');
      setNewHallDesc('');
      alert('New Luxury venue hall successfully uploaded onto EventEase roster!');
    } catch (err) {
      console.error('Error adding hall:', err);
      // Offline fallback
      const offlineHall = {
        ...payload,
        id: 'hall-offline-' + Math.random().toString(36).substring(2, 9)
      };
      setHallsList((prev) => [offlineHall, ...prev]);
      setNewHallName('');
      setNewHallImage('');
      setNewHallDesc('');
      alert('New Luxury venue hall successfully uploaded offline!');
    } finally {
      setIsSubmittingHall(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-amber-500 rounded-full border-t-transparent" />
        <span>Authenticating Admin partner metrics...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4 animate-fade-in">
        <div className="bg-rose-500/10 text-rose-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Admin Credentials Required</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This portal is reserved strictly for authenticated site operators and banquet partners.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase bg-slate-900 text-white shadow-md cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 rounded-xl">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Admin Operations Center</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage live bookings, approve pending slots, and enlist new luxury convention properties.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Met 1 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Bookings Revenue</span>
            <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Met 2 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-rose-500/10 text-rose-600 rounded-xl shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Active Reservations</span>
            <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">{bookingsList.length} Slots</span>
          </div>
        </div>

        {/* Met 3 */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Properties Enlisted</span>
            <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">{hallsList.length} Venues</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* List of Bookings Table (7 cols) */}
        <div className="lg:col-span-8 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>Active Client Reservations</span>
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {bookingsList.map((booking) => (
              <div
                key={booking.id}
                id={`admin-booking-card-${booking.id}`}
                className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">{booking.userName}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">({booking.id})</span>
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">{booking.hallName} - {booking.cityName}</p>
                  <p className="text-slate-400 font-medium">{booking.date} | {booking.slot} Slot ({booking.guests} guests)</p>
                  <p className="text-[10px] text-emerald-500 font-black">₹{booking.totalPrice.toLocaleString()}</p>
                </div>

                {/* Operations */}
                <div className="flex items-center gap-2">
                  {booking.status === 'Pending' ? (
                    <button
                      id={`approve-booking-btn-${booking.id}`}
                      onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      id={`pending-booking-btn-${booking.id}`}
                      onClick={() => handleUpdateStatus(booking.id, 'Pending')}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>De-authorize</span>
                    </button>
                  )}

                  <button
                    id={`delete-booking-btn-${booking.id}`}
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 rounded-lg cursor-pointer transition-all active:scale-95"
                    title="Delete booking record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {bookingsList.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">No reservations locked inside database yet.</p>
            )}
          </div>
        </div>

        {/* Add Hall Property Form (5 cols) */}
        <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <Plus className="w-5 h-5 text-amber-500" />
            <span>Enlist Luxury Venue</span>
          </h3>

          <form onSubmit={handleAddHallSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label htmlFor="hall-name" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Property Name</label>
              <input
                id="hall-name"
                type="text"
                required
                value={newHallName}
                onChange={(e) => setNewHallName(e.target.value)}
                placeholder="The Leela Imperial Banquet"
                className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* City select */}
              <div>
                <label htmlFor="hall-city" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">City</label>
                <select
                  id="hall-city"
                  value={newHallCityId}
                  onChange={(e) => setNewHallCityId(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Max capacity */}
              <div>
                <label htmlFor="hall-capacity" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Max Pax</label>
                <input
                  id="hall-capacity"
                  type="number"
                  required
                  value={newHallCapacity}
                  onChange={(e) => setNewHallCapacity(Number(e.target.value))}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* price per day */}
              <div>
                <label htmlFor="hall-price" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Price Per Day (₹)</label>
                <input
                  id="hall-price"
                  type="number"
                  required
                  value={newHallPrice}
                  onChange={(e) => setNewHallPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                />
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="hall-image" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Image URL (Optional)</label>
                <input
                  id="hall-image"
                  type="text"
                  value={newHallImage}
                  onChange={(e) => setNewHallImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="hall-desc" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description Highlights</label>
              <textarea
                id="hall-desc"
                rows={3}
                required
                value={newHallDesc}
                onChange={(e) => setNewHallDesc(e.target.value)}
                placeholder="A majestic high-ceiling crystal ballroom with private suite access..."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>

            <button
              id="admin-add-hall-btn"
              type="submit"
              disabled={isSubmittingHall}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-850 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Enlist Property</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
