import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Check, Calendar, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import { HALLS } from '../../data';
import { Hall, Review } from '../../types';
import axios from 'axios';

export default function HallDetails() {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const hallId = routerLocation.state?.hallId || 'bng-grand-palace';
  const [hall, setHall] = useState<Hall | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // New review form states
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // Load hall details
    const selectedHall = HALLS.find((h) => h.id === hallId);
    if (selectedHall) {
      setHall(selectedHall);
    }

    // Fetch reviews from API
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews');
        // Filter reviews matching this hall ID
        const hallReviews = res.data.filter((r: any) => r.hallId === hallId);
        setReviews(hallReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        // Fallback reviews
        const fallback = [
          {
            id: 'rev-fall-1',
            hallId,
            userName: 'Anonymous Patron',
            rating: 5,
            comment: 'Stunning property with flawless hospitality! Excellent air conditioning and parking space.',
            date: '2026-06-01',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
          }
        ];
        setReviews(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hallId]);

  const handleBookNow = () => {
    navigate('/booking', { state: { hallId: hall?.id, cityId: hall?.cityId } });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !newComment.trim() || !hall) return;

    setIsSubmittingReview(true);
    const reviewPayload = {
      hallId: hall.id,
      userName: reviewerName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' // Default user avatar
    };

    try {
      const res = await axios.post('/api/reviews', reviewPayload);
      // Add the new review to local list
      setReviews((prev) => [res.data, ...prev]);
      
      // Update reviewsCount on the displayed hall
      if (hall) {
        setHall((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            reviewsCount: (prev.reviewsCount || 0) + 1
          };
        });
      }

      setReviewerName('');
      setNewComment('');
      setNewRating(5);
      alert('Review posted successfully! Thank you for your feedback.');
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Could not submit review. Switched to fallback offline storage.');
      
      // Fallback submission locally
      const mockReview = {
        ...reviewPayload,
        id: 'rev-offline-' + Math.random().toString(36).substring(2, 9)
      };
      setReviews((prev) => [mockReview, ...prev]);
      setReviewerName('');
      setNewComment('');
      setNewRating(5);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!hall) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-500">Venue information could not be retrieved.</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-slate-900 text-white rounded-xl">
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10 animate-fade-in">
      {/* Back navigation bar */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Go Back</span>
      </button>

      {/* Main Grid: Info & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery and Reviews (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main big image and thumbs */}
          <div className="space-y-4">
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-md">
              <img
                src={hall.images[0]}
                alt={hall.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-amber-300 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-300 stroke-none" />
                <span>{hall.rating.toFixed(1)}</span>
                <span className="text-slate-300 font-normal">({hall.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Thumbnail preview list */}
            <div className="grid grid-cols-3 gap-3">
              {hall.images.map((img, i) => (
                <div key={i} className="h-28 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:opacity-90 cursor-pointer">
                  <img src={img} alt="Thumbnail venue preview" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Detailed description */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Venue Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {hall.description}
            </p>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-4">Exclusive Features & Architecture</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hall.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <div className="p-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Amenities & Conveniences</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hall.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850"
                >
                  <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Reviews Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>Customer Reviews ({reviews.length})</span>
            </h3>

            {/* List Reviews */}
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  id={`review-card-${r.id}`}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                        alt={r.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{r.userName}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                      <span>{r.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                    "{r.comment}"
                  </p>
                </div>
              ))}

              {reviews.length === 0 && (
                <p className="text-xs text-slate-400 italic">No reviews recorded yet. Be the first to leave a review!</p>
              )}
            </div>

            {/* Post a Review Form */}
            <form
              onSubmit={handleReviewSubmit}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl space-y-4 shadow-sm"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Write a Review
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Aditya Sen"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Star Rating
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Comments & Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your booking and culinary service experience..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Pricing & Quick Booking Action Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg space-y-6">
            
            <div>
              <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">Property Tariff</span>
              <span className="text-3xl font-black text-slate-950 dark:text-white">
                ₹{hall.pricePerDay.toLocaleString()}
                <span className="text-sm font-normal text-slate-400"> /day</span>
              </span>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-3.5 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  Max Capacity
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{hall.capacity} Guests</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Location City
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{hall.cityName}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Slot Availability
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Open for Reservations</span>
              </div>
            </div>

            <button
              id="hall-details-book-now-btn"
              onClick={handleBookNow}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-500/10 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book this Venue</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed font-medium">
              *Secure lock-in with 100% money-back cancellation guarantee up to 48 hours prior to the slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
