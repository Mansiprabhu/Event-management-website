import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Users, Sparkles, CheckCircle2, AlertCircle, Trash2, Mail } from 'lucide-react';
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load logged in user
    const savedUser = localStorage.getItem('eventease_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      fetchUserBookings(parsed.email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserBookings = async (email: string) => {
    try {
      // Fetch bookings from backend
      const res = await axios.get('/api/bookings');
      
      // Filter by user email
      let userBookings = res.data.filter((b: any) => b.userEmail === email);

      // Merge with custom localStore bookings for instant feedback
      const localBookings = JSON.parse(localStorage.getItem('eventease_my_bookings') || '[]');
      const uniqueIds = new Set(userBookings.map((b: any) => b.id));
      
      localBookings.forEach((b: any) => {
        if (b.userEmail === email && !uniqueIds.has(b.id)) {
          userBookings.push(b);
        }
      });

      // Sort by creation or date descending
      userBookings.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setBookings(userBookings);
    } catch (err) {
      console.error('Error fetching user bookings:', err);
      // Fallback local persistence
      const localBookings = JSON.parse(localStorage.getItem('eventease_my_bookings') || '[]');
      const filteredLocal = localBookings.filter((b: any) => b.userEmail === email);
      setBookings(filteredLocal);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to cancel this reservation? This cannot be undone.');
    if (!confirmation) return;

    try {
      // 1. Delete on backend
      await axios.delete(`/api/bookings/${id}`);

      // 2. Delete in localStorage
      const localBookings = JSON.parse(localStorage.getItem('eventease_my_bookings') || '[]');
      const updatedLocal = localBookings.filter((b: any) => b.id !== id);
      localStorage.setItem('eventease_my_bookings', JSON.stringify(updatedLocal));

      // 3. Delete in local state
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert('Booking canceled successfully.');
    } catch (err) {
      console.error('Error canceling booking:', err);
      // Fallback local deletion
      const localBookings = JSON.parse(localStorage.getItem('eventease_my_bookings') || '[]');
      const updatedLocal = localBookings.filter((b: any) => b.id !== id);
      localStorage.setItem('eventease_my_bookings', JSON.stringify(updatedLocal));

      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert('Booking canceled offline successfully.');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-amber-500 rounded-full border-t-transparent" />
        <span>Syncing your profile...</span>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4 animate-fade-in">
        <div className="bg-amber-500/10 text-amber-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Profile Authentication Required</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please log in or register a new customer partner account to view your active bookings.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase bg-amber-500 text-white shadow-md cursor-pointer"
        >
          Login Page
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 animate-fade-in">
      
      {/* Profile Header Block */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-1.5">
              <span>{currentUser.name}</span>
              <span className="inline-flex px-2 py-0.5 text-[9px] font-extrabold uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded-md">
                {currentUser.role}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{currentUser.email}</span>
            </p>
          </div>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Open Admin Dashboard
          </button>
        )}
      </div>

      {/* Booking List Block */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <span>My Reservations ({bookings.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              id={`profile-booking-card-${booking.id}`}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start pb-3.5 border-b border-slate-50 dark:border-slate-800/60">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-widest">Reference Code</span>
                    <h4 className="text-sm font-extrabold text-amber-500">{booking.id}</h4>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-500/15 text-emerald-600'
                      : 'bg-amber-500/15 text-amber-600'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{booking.status}</span>
                  </span>
                </div>

                {/* Main body info */}
                <div className="py-4 space-y-3 text-xs">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{booking.hallName}</h4>

                  <div className="grid grid-cols-2 gap-3 text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      {booking.slot} Slot
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      {booking.guests} Guests
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {booking.cityName}
                    </span>
                  </div>

                  {/* Amenities listed */}
                  {booking.services && booking.services.length > 0 && (
                    <div className="pt-2">
                      <span className="block text-[9px] uppercase text-slate-400 font-extrabold tracking-widest mb-1.5">Add-ons Selected</span>
                      <div className="flex flex-wrap gap-1.5">
                        {booking.services.map((srvId: string) => (
                          <span
                            key={srvId}
                            className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded text-[10px] text-slate-600 dark:text-slate-350"
                          >
                            {srvId.replace('srv-', '').replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and cancellation actions */}
              <div className="pt-3.5 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total Tariff</span>
                  <span className="text-base font-black text-slate-950 dark:text-white">
                    ₹{booking.totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  id={`cancel-booking-btn-${booking.id}`}
                  onClick={() => handleCancelBooking(booking.id)}
                  className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  title="Cancel this slot"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel Booking</span>
                </button>
              </div>

            </div>
          ))}

          {bookings.length === 0 && (
            <div className="md:col-span-2 p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl space-y-3">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">You do not have any active venue bookings yet.</p>
              <button
                onClick={() => navigate('/booking')}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl text-xs font-bold cursor-pointer"
              >
                Book Your First Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
