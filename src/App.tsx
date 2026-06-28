import { useState, useEffect } from 'react';
import Header, { AppPages } from './components/Header';
import Hero from './components/Hero';
import FeaturedVenues from './components/FeaturedVenues';
import CategoriesList from './components/CategoriesList';
import { WhyChooseUs, Testimonials, Gallery, Contact } from './components/InfoSections';
import Footer from './components/Footer';
import HallDetailsModal from './components/HallDetailsModal';
import BookingFlowModal from './components/BookingFlowModal';
import AdminDashboard from './components/AdminDashboard';
import MyBookingsPage from './components/MyBookingsPage';
import Toast, { ToastMessage } from './components/Toast';

import { Booking, Hall, Review } from './types';

export default function App() {
  // 1. App Theme and Routing state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('eventsphere_dark_mode') === 'true';
  });
  const [currentPage, setCurrentPage] = useState<AppPages>('home');

  // 2. State Collections synced with MongoDB Atlas
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. Overlay Modals State
  const [selectedHallForDetails, setSelectedHallForDetails] = useState<Hall | null>(null);
  const [showBookingFlow, setShowBookingFlow] = useState<boolean>(false);
  const [searchCriteria, setSearchCriteria] = useState<{ categoryId: string; cityId: string; date: string } | null>(null);

  // 4. Toast Notifications System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 5. REST API Async Synchronization
  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [hallsRes, bookingsRes, reviewsRes] = await Promise.all([
        fetch('/api/halls'),
        fetch('/api/bookings'),
        fetch('/api/reviews')
      ]);

      if (hallsRes.ok) {
        const hallsData = await hallsRes.json();
        setHalls(hallsData);
      }
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      }
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
      addToast('error', 'Connection Error', 'Failed to retrieve real-time records from server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Dark mode class handler
  useEffect(() => {
    localStorage.setItem('eventsphere_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 6. Customer Booking Core Handler
  const handleConfirmBooking = async (newBooking: Booking) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });

      if (res.status === 409) {
        addToast(
          'error',
          'Slot Booked!',
          'This hall is already booked for the selected date and time slot. Please choose another slot or another hall.'
        );
        return {
          success: false,
          error: 'This hall is already booked for the selected date and time slot. Please choose another slot or another hall.'
        };
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to confirm reservation');
      }

      const savedBooking = await res.json();
      setBookings((prev) => [savedBooking, ...prev]);
      addToast(
        'success',
        'Booking Confirmed!',
        `Successfully reserved slot at ${savedBooking.hallName} under ID ${savedBooking.id}.`
      );
      return { success: true };
    } catch (err: any) {
      addToast('error', 'Booking Failed', err.message || 'Server connection error.');
      return { success: false, error: err.message };
    }
  };

  // 7. Admin Dashboard Event Handlers
  const handleAddHall = async (newHall: Hall) => {
    try {
      const res = await fetch('/api/halls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHall)
      });
      if (!res.ok) throw new Error('Could not add venue to MongoDB database.');
      const savedHall = await res.json();
      setHalls((prev) => [savedHall, ...prev]);
      addToast('success', 'Hall Registered!', `Successfully added "${savedHall.name}" into our city registry.`);
    } catch (err: any) {
      addToast('error', 'Registration Failed', err.message);
    }
  };

  const handleUpdateHallPrice = async (hallId: string, newPrice: number) => {
    try {
      const res = await fetch(`/api/halls/${hallId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricePerDay: newPrice })
      });
      if (!res.ok) throw new Error('Could not update pricing records.');
      setHalls((prev) =>
        prev.map((h) => (h.id === hallId ? { ...h, pricePerDay: newPrice } : h))
      );
      addToast('success', 'Pricing Updated!', `Successfully modified base reservation fee.`);
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const handleDeleteHall = async (hallId: string) => {
    try {
      const res = await fetch(`/api/halls/${hallId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Could not remove venue.');
      setHalls((prev) => prev.filter((h) => h.id !== hallId));
      addToast('info', 'Hall Removed', 'The venue property has been archived.');
    } catch (err: any) {
      addToast('error', 'Archiving Failed', err.message);
    }
  };

  const handleDeleteBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Could not clear registration pass.');
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      addToast('info', 'Booking Voided', 'The reservation record was successfully cleared.');
      return true;
    } catch (err: any) {
      addToast('error', 'Cancellation Failed', err.message);
      return false;
    }
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Confirmed' })
      });
      if (!res.ok) throw new Error('Could not modify confirmation status.');
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed' } : b))
      );
      addToast('success', 'Booking Approved!', 'The payment status has been changed to Confirmed.');
    } catch (err: any) {
      addToast('error', 'Approval Failed', err.message);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Could not delete comment.');
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      addToast('info', 'Review Removed', 'The guest experience review was deleted.');
    } catch (err: any) {
      addToast('error', 'Deletion Failed', err.message);
    }
  };

  // 8. Navigation shortcuts from subcomponents
  const handleHeroSearch = (categoryId: string, cityId: string, date: string) => {
    setSearchCriteria({ categoryId, cityId, date });
    setSelectedHallForDetails(null);
    setShowBookingFlow(true);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSearchCriteria({ categoryId, cityId: 'bengaluru', date: '' });
    setSelectedHallForDetails(null);
    setShowBookingFlow(true);
  };

  const handleBookFromCard = (hall: Hall) => {
    setSelectedHallForDetails(null);
    setSearchCriteria({ categoryId: 'wedding', cityId: hall.cityId, date: '' });
    setShowBookingFlow(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      
      {/* Toast Notifications Overlay */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Dynamic Navigation Header based on pages */}
      {currentPage !== 'my-bookings' && (
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onOpenBookingFlow={() => {
            setSearchCriteria(null);
            setSelectedHallForDetails(null);
            setShowBookingFlow(true);
          }}
        />
      )}

      {/* Main Viewport Router */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 animate-spin" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Synchronizing with EventSphere database...
              </p>
            </div>
          </div>
        ) : currentPage === 'admin' ? (
          // Administrative Dashboard Pane
          <AdminDashboard
            bookings={bookings}
            halls={halls}
            reviews={reviews}
            onAddHall={handleAddHall}
            onUpdateHallPrice={handleUpdateHallPrice}
            onDeleteHall={handleDeleteHall}
            onDeleteBooking={handleDeleteBooking}
            onApproveBooking={handleApproveBooking}
            onDeleteReview={handleDeleteReview}
          />
        ) : currentPage === 'my-bookings' ? (
          // Dedicated Customer Tickets Portal
          <MyBookingsPage
            bookings={bookings}
            halls={halls}
            onDeleteBooking={handleDeleteBooking}
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateAdmin={() => setCurrentPage('admin')}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : (
          // Client Landing / Booking Journey
          <div className="animate-fade-in">
            {currentPage === 'home' && (
              <div className="space-y-4 animate-fade-in">
                {/* Hero Section Banner */}
                <Hero onSearchAndBook={handleHeroSearch} />

                {/* Featured Luxury Venues Selection */}
                <FeaturedVenues
                  onSelectHall={(hall) => setSelectedHallForDetails(hall)}
                  onBookHall={handleBookFromCard}
                  halls={halls}
                />
              </div>
            )}

            {currentPage === 'categories' && (
              <div className="animate-fade-in py-10 space-y-8">
                <div className="max-w-4xl mx-auto text-center px-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Event Categories
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
                    Explore specialized packages and professional staging designed for both high-profile business summits and grand private family celebrations.
                  </p>
                </div>
                <CategoriesList onSelectCategory={handleCategorySelect} />
              </div>
            )}

            {currentPage === 'why-us' && (
              <div className="animate-fade-in py-10 space-y-12">
                <div className="max-w-4xl mx-auto text-center px-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Unmatched Staging & Guest Experience
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
                    Learn about our signature hospitality standards, flexible catering choices, and read true verification reviews from our clients.
                  </p>
                </div>
                <WhyChooseUs />
                <Testimonials />
              </div>
            )}

            {currentPage === 'gallery' && (
              <div className="animate-fade-in py-10 space-y-8">
                <div className="max-w-4xl mx-auto text-center px-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Our Premium Property Portfolio
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
                    A collection of beautifully designed grand palaces, soundproof meeting rooms, and beachfront properties.
                  </p>
                </div>
                <Gallery />
              </div>
            )}

            {currentPage === 'contact' && (
              <div className="animate-fade-in py-10 space-y-8">
                <div className="max-w-4xl mx-auto text-center px-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Connect With Our Event Planners
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
                    Have questions about specific pricing or amenities? Request a callback or write to us directly, and our specialists will assist you within an hour.
                  </p>
                </div>
                <Contact />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Branding Footer */}
      {currentPage !== 'my-bookings' && <Footer />}

      {/* Modals Layer */}
      {selectedHallForDetails && (
        <HallDetailsModal
          hall={selectedHallForDetails}
          onClose={() => setSelectedHallForDetails(null)}
          onBook={(hall) => {
            setSelectedHallForDetails(null);
            setSearchCriteria({ categoryId: 'wedding', cityId: hall.cityId, date: '' });
            setShowBookingFlow(true);
          }}
        />
      )}

      {showBookingFlow && (
        <BookingFlowModal
          initialSearch={searchCriteria}
          selectedHallFromDetails={selectedHallForDetails}
          onClose={() => {
            setShowBookingFlow(false);
            setSearchCriteria(null);
          }}
          onConfirmBooking={handleConfirmBooking}
          existingBookings={bookings}
        />
      )}

    </div>
  );
}
