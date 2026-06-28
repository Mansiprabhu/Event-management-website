import { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ChevronRight, ChevronLeft, CalendarDays, Users, Sparkles, MapPin, 
  Building2, DollarSign, Clock, ListPlus, ShieldCheck, HelpCircle, Calendar, AlertCircle
} from 'lucide-react';
import { CITIES, EVENT_CATEGORIES, HALLS, EXTRA_SERVICES, TIME_SLOTS } from '../data';
import { Booking, Hall, TimeSlotType, EventCategory } from '../types';

interface BookingFlowModalProps {
  initialSearch: { categoryId: string; cityId: string; date: string } | null;
  selectedHallFromDetails: Hall | null;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => Promise<{ success: boolean; error?: string }>;
  existingBookings: Booking[];
}

export default function BookingFlowModal({
  initialSearch,
  selectedHallFromDetails,
  onClose,
  onConfirmBooking,
  existingBookings
}: BookingFlowModalProps) {
  
  // 1. Wizard Steps: Category -> Location -> Hall -> Date & Slot -> Guests -> Services -> Pay -> Confirm
  const [step, setStep] = useState(1);

  // 2. Booking State
  const [categoryId, setCategoryId] = useState('');
  const [cityId, setCityId] = useState('bengaluru');
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType>('Morning');
  const [guestCount, setGuestCount] = useState(100);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'Pay Now' | 'Pay at Venue'>('Pay Now');

  // Customer credentials (mock)
  const [customerName, setCustomerName] = useState('Mansi Prabhu');
  const [customerEmail, setCustomerEmail] = useState('mansi@example.com');

  // Confirmed booking summary
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [validationError, setValidationError] = useState('');

  // 3. Populate initial data if present
  useEffect(() => {
    if (selectedHallFromDetails) {
      setSelectedHall(selectedHallFromDetails);
      setCityId(selectedHallFromDetails.cityId);
      setCategoryId('wedding'); // default logic
      setStep(4); // Skip to date and slot directly! Extremely polished ux!
    } else if (initialSearch) {
      if (initialSearch.categoryId) setCategoryId(initialSearch.categoryId);
      if (initialSearch.cityId) setCityId(initialSearch.cityId);
      if (initialSearch.date) setSelectedDate(initialSearch.date);
      setStep(3); // Start at choosing hall!
    }
  }, [initialSearch, selectedHallFromDetails]);

  // Handle Hall change
  const handleHallSelect = (hall: Hall) => {
    setSelectedHall(hall);
    // Reset guest count to fit hall capacity if needed
    if (guestCount > hall.capacity) {
      setGuestCount(hall.capacity);
    }
    setStep(4);
  };

  // 4. Calculations
  const hallBasePrice = selectedHall ? selectedHall.pricePerDay : 0;
  const timeSlotMultiplier = TIME_SLOTS.find(s => s.id === selectedSlot)?.priceMultiplier || 1.0;
  const hallAdjustedPrice = Math.round(hallBasePrice * timeSlotMultiplier);

  // Catering & Welcome drinks are PER GUEST. Others are FLAT.
  let servicesTotal = 0;
  selectedServices.forEach(srvId => {
    const service = EXTRA_SERVICES.find(s => s.id === srvId);
    if (service) {
      if (service.id === 'srv-catering' || service.id === 'srv-welcome-drinks') {
        servicesTotal += service.price * guestCount;
      } else {
        servicesTotal += service.price;
      }
    }
  });

  const totalPrice = hallAdjustedPrice + servicesTotal;

  // Toggle service selection
  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    } else {
      setSelectedServices(prev => [...prev, serviceId]);
    }
  };

  // 5. Submit & Validation Handler
  const handleConfirm = async () => {
    if (!selectedHall || !selectedDate) {
      setValidationError('Please complete all selection steps.');
      return;
    }

    // Prepare booking object
    const newBooking: Booking = {
      id: 'bk-' + Math.floor(100000 + Math.random() * 900000),
      hallId: selectedHall.id,
      hallName: selectedHall.name,
      cityName: CITIES.find(c => c.id === selectedHall.cityId)?.name || 'Unknown',
      eventType: EVENT_CATEGORIES.find(c => c.id === categoryId)?.name || 'Event Celebration',
      date: selectedDate,
      slot: selectedSlot,
      guests: guestCount,
      services: selectedServices,
      totalPrice: totalPrice,
      status: paymentMethod === 'Pay Now' ? 'Confirmed' : 'Pending',
      paymentMethod: paymentMethod,
      userName: customerName,
      userEmail: customerEmail,
      createdAt: new Date().toISOString()
    };

    // Call submit function which runs booking validation
    const result = await onConfirmBooking(newBooking);
    if (result.success) {
      setConfirmedBookingId(newBooking.id);
      setValidationError('');
      setStep(8); // success screen!
    } else {
      setValidationError(result.error || 'Conflict occurred.');
    }
  };

  // Filter halls based on chosen city
  const filteredHalls = HALLS.filter(h => h.cityId === cityId);

  // Selected State
  const activeCity = CITIES.find(c => c.id === cityId);
  const activeCategory = EVENT_CATEGORIES.find(c => c.id === categoryId);

  // Step Indicators
  const stepNames = [
    'Event Type',
    'Location',
    'Choose Hall',
    'Date & Slot',
    'Guest Details',
    'Extra Services',
    'Review & Pay'
  ];

  return (
    <div id="booking-flow-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 md:p-10">
      <div 
        id="booking-flow-modal" 
        className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl border border-slate-150 dark:border-slate-800 flex flex-col h-[90vh] sm:h-auto max-h-[92vh] transition-colors duration-300"
      >
        {/* Header bar */}
        <div className="p-5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>EventSphere Hall Reservation</span>
            </h3>
            {step < 8 && (
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                STEP {step} OF 7 • {stepNames[step - 1]}
              </p>
            )}
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Line */}
        {step < 8 && (
          <div id="booking-progress-bar" className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 shrink-0 flex">
            {stepNames.map((_, index) => (
              <div
                key={index}
                className={`h-full flex-1 transition-all duration-300 ${
                  index + 1 < step 
                    ? 'bg-emerald-500' 
                    : index + 1 === step 
                    ? 'bg-amber-500' 
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        )}

        {/* Scrollable Form Body */}
        <div id="booking-modal-body" className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Validation Error Banner */}
          {validationError && (
            <div id="booking-validation-error" className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex gap-2 items-start text-xs leading-relaxed animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Booking Conflict Detected</p>
                <p className="mt-1">{validationError}</p>
              </div>
            </div>
          )}

          {/* STEP 1: EVENT TYPE */}
          {step === 1 && (
            <div id="booking-step-1" className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">What kind of event are you hosting?</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Formal category */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 bg-slate-50/50 dark:bg-slate-950/25 space-y-3">
                  <span className="text-lg">🎩</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Formal Corporate Affairs</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Conferences, meetings, awards ceremonies, workshops, or academic training.</p>
                  
                  <div className="space-y-1 pt-2">
                    {EVENT_CATEGORIES.filter(c => c.type === 'formal').map(cat => (
                      <button
                        key={cat.id}
                        id={`btn-select-cat-${cat.id}`}
                        onClick={() => { setCategoryId(cat.id); setStep(2); }}
                        className={`w-full text-left text-xs p-2 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          categoryId === cat.id 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                            : 'bg-white border-slate-200/50 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Informal category */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 bg-slate-50/50 dark:bg-slate-950/25 space-y-3">
                  <span className="text-lg">🎉</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Social Celebrations</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Weddings, birthdays, anniversaries, baby showers, music nights, or family get-togethers.</p>
                  
                  <div className="space-y-1 pt-2">
                    {EVENT_CATEGORIES.filter(c => c.type === 'informal').map(cat => (
                      <button
                        key={cat.id}
                        id={`btn-select-cat-${cat.id}`}
                        onClick={() => { setCategoryId(cat.id); setStep(2); }}
                        className={`w-full text-left text-xs p-2 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          categoryId === cat.id 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                            : 'bg-white border-slate-200/50 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {step === 2 && (
            <div id="booking-step-2" className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Where would you like to host your event?</h4>
              
              <div className="space-y-4">
                {/* Visual grouping by state */}
                {['Karnataka', 'Kerala', 'Goa', 'Tamil Nadu'].map(state => {
                  const stateCities = CITIES.filter(c => c.state === state);
                  return (
                    <div key={state} className="space-y-2">
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{state} State</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {stateCities.map(city => (
                          <button
                            key={city.id}
                            id={`btn-select-city-${city.id}`}
                            onClick={() => { setCityId(city.id); setStep(3); }}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              cityId === city.id 
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold shadow-sm' 
                                : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-850 dark:text-slate-300 dark:hover:bg-slate-900'
                            }`}
                          >
                            <MapPin className="w-4 h-4 mx-auto mb-1.5 text-slate-400 shrink-0" />
                            <span className="text-xs font-semibold block truncate">{city.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE HALL */}
          {step === 3 && (
            <div id="booking-step-3" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select a Venue in {activeCity?.name} ({filteredHalls.length})
                </h4>
                <button
                  id="back-to-locations-btn"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                >
                  Change City
                </button>
              </div>

              <div className="space-y-3">
                {filteredHalls.map((hall) => (
                  <div
                    key={hall.id}
                    id={`flow-hall-option-${hall.id}`}
                    onClick={() => handleHallSelect(hall)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <img src={hall.images[0]} alt={hall.name} className="w-20 h-14 rounded-lg object-cover" />
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{hall.name}</h5>
                        <p className="text-[10px] text-slate-400 mt-1">Capacity: up to {hall.capacity} guests • Rating: ⭐ {hall.rating}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Standard Price</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">₹{hall.pricePerDay.toLocaleString()}/day</span>
                    </div>
                  </div>
                ))}

                {filteredHalls.length === 0 && (
                  <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400">No registered halls found in {activeCity?.name} yet.</p>
                    <button
                      id="flow-back-btn-mng"
                      onClick={() => setStep(2)}
                      className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-lg cursor-pointer text-slate-700 dark:text-slate-200"
                    >
                      Return to City List
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: DATE & TIME SLOT */}
          {step === 4 && selectedHall && (
            <div id="booking-step-4" className="space-y-5">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">When is your event scheduled?</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Datepicker */}
                <div className="space-y-2">
                  <label htmlFor="flow-date-input" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Choose Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="flow-date-input"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setValidationError('');
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time Slot Select */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Choose Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      // Check if already booked for validation feedback in UI!
                      const isBooked = existingBookings.some(
                        b => b.hallId === selectedHall.id && b.date === selectedDate && b.slot === slot.id
                      );
                      
                      return (
                        <button
                          key={slot.id}
                          id={`btn-slot-${slot.id}`}
                          type="button"
                          disabled={isBooked}
                          onClick={() => {
                            setSelectedSlot(slot.id);
                            setValidationError('');
                          }}
                          className={`p-2 rounded-xl border text-center relative flex flex-col justify-center transition-all cursor-pointer ${
                            isBooked
                              ? 'bg-rose-500/5 border-rose-500/10 text-rose-500/40 line-through cursor-not-allowed opacity-50'
                              : selectedSlot === slot.id
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 dark:bg-slate-950 dark:border-slate-850 dark:text-slate-300'
                          }`}
                        >
                          <span className="text-[11px] block">{slot.name}</span>
                          <span className="text-[8px] text-slate-400 block mt-0.5">{slot.time}</span>
                          {isBooked && (
                            <span className="absolute -top-1.5 -right-1.5 text-[7px] font-bold uppercase tracking-wider px-1 bg-rose-500 text-white rounded">
                              Booked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Informative block */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800 flex gap-2.5 items-start text-[11px] text-slate-500 leading-relaxed">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Granular Time Slot Optimization</p>
                  <p className="mt-0.5">We allow multiple bookings on the same day if slot and hall are different. Selecting "Morning" (8 AM to 1 PM) lets another user book the "Evening" slot (7 PM to 11 PM) on that same calendar day!</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: GUEST COUNT & DETAILS */}
          {step === 5 && selectedHall && (
            <div id="booking-step-5" className="space-y-5">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Who is hosting, and how many guests?</h4>

              {/* Guest Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Expected Guest Count</span>
                  <span className="font-black text-amber-600 dark:text-amber-400 text-sm bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    {guestCount} Guests
                  </span>
                </div>
                
                <input
                  id="flow-guest-slider"
                  type="range"
                  min="20"
                  max={selectedHall.capacity}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Min: 20 guests</span>
                  <span>Max Capacity for {selectedHall.name}: {selectedHall.capacity} guests</span>
                </div>
              </div>

              {/* Host Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                <div className="space-y-1">
                  <label htmlFor="flow-host-name" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Host Full Name</label>
                  <input
                    id="flow-host-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="flow-host-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Host Email Address</label>
                  <input
                    id="flow-host-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: EXTRA SERVICES */}
          {step === 6 && (
            <div id="booking-step-6" className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Elevate Your Event with Add-on Services</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Customize food spreads, stage themes, audio, MCs, and live music. Pricing updates live!</p>
              </div>

              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {EXTRA_SERVICES.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  const isPerGuest = srv.id === 'srv-catering' || srv.id === 'srv-welcome-drinks';
                  const displayedPrice = isPerGuest ? srv.price * guestCount : srv.price;

                  return (
                    <div
                      key={srv.id}
                      id={`flow-service-card-${srv.id}`}
                      onClick={() => handleToggleService(srv.id)}
                      className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/5 border-amber-500/40 text-slate-900 dark:text-white'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-850 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-lg mt-0.5 ${isSelected ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 dark:bg-slate-800'}`}>
                          <span className="text-xs font-bold font-mono">✔</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">{srv.name}</h5>
                          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{srv.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[11px] font-black">₹{displayedPrice.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">
                          {isPerGuest ? `₹${srv.price} × ${guestCount} gsts` : 'Flat Fee'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW SUMMARY & PAYMENT */}
          {step === 7 && selectedHall && (
            <div id="booking-step-7" className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Confirm Order Breakdown</h4>

              {/* Dynamic Invoice Style Breakdown */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                
                {/* Header info */}
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-850 pb-3">
                  <div>
                    <h5 className="font-black text-sm text-slate-900 dark:text-white">{selectedHall.name}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">Scheduled for: <span className="font-bold text-slate-700 dark:text-slate-200">{selectedDate}</span> • Slot: <span className="font-bold text-slate-700 dark:text-slate-200">{selectedSlot}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      {activeCategory?.name}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{guestCount} Expected Guests</p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  
                  {/* Hall Item */}
                  <div className="flex justify-between items-center">
                    <span>Base Hall Reservation ({selectedSlot} slot multiplier {timeSlotMultiplier}x)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">₹{hallAdjustedPrice.toLocaleString()}</span>
                  </div>

                  {/* Service Items */}
                  {selectedServices.map(srvId => {
                    const srv = EXTRA_SERVICES.find(s => s.id === srvId);
                    if (!srv) return null;
                    const isPerGuest = srv.id === 'srv-catering' || srv.id === 'srv-welcome-drinks';
                    const linePrice = isPerGuest ? srv.price * guestCount : srv.price;

                    return (
                      <div key={srvId} className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
                        <span>✔ {srv.name} {isPerGuest && `(₹${srv.price} × ${guestCount} guests)`}</span>
                        <span>₹{linePrice.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Total grand bar */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-850 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Total Price (GST inclusive)</span>
                  <span className="text-xl font-black text-rose-500 dark:text-rose-400">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Choose Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="pay-now-mode-btn"
                    type="button"
                    onClick={() => setPaymentMethod('Pay Now')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'Pay Now'
                        ? 'bg-amber-500/5 border-amber-500/40 text-slate-900 dark:text-white ring-1 ring-amber-500/20'
                        : 'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-850 text-slate-700'
                    }`}
                  >
                    <span className="text-sm font-semibold">💳 Pay Now</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Instant online confirmation. Secure 10% cashbacks.</span>
                  </button>

                  <button
                    id="pay-at-venue-mode-btn"
                    type="button"
                    onClick={() => setPaymentMethod('Pay at Venue')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'Pay at Venue'
                        ? 'bg-amber-500/5 border-amber-500/40 text-slate-900 dark:text-white ring-1 ring-amber-500/20'
                        : 'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-850 text-slate-700'
                    }`}
                  >
                    <span className="text-sm font-semibold">🏛 Pay at Venue</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Pay flat cash/UPI on-site. Slot blocked for 24 hours.</span>
                  </button>
                </div>
              </div>

              {/* Secure tag */}
              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Secured Checkout Platform. Re-validation checks are automated.</span>
              </p>
            </div>
          )}

          {/* STEP 8: SUCCESS CONFIRMATION */}
          {step === 8 && (
            <div id="booking-step-8" className="py-8 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Booking Confirmed!
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">Your Slot has been Secured!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                  Excellent choice. We have received your booking request under ID <span className="font-bold text-slate-800 dark:text-slate-200">{confirmedBookingId}</span>. A full receipt has been emailed to you.
                </p>
              </div>

              {/* Order breakdown summary card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue Hall:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedHall?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Booking Date:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedSlot} ({TIME_SLOTS.find(s => s.id === selectedSlot)?.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Price:</span>
                  <span className="font-bold text-rose-500">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="font-bold text-emerald-500">{paymentMethod === 'Pay Now' ? 'Paid Online' : 'Pending (Pay on Venue)'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="flow-finish-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 dark:hover:bg-amber-400 active:scale-95 transition-all cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Action Button Footer bar */}
        {step < 8 && (
          <div id="booking-modal-footer" className="p-5 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50 dark:bg-slate-950 shrink-0">
            {/* Back Button */}
            <button
              id="flow-back-btn"
              type="button"
              disabled={step === 1}
              onClick={() => {
                setStep(prev => prev - 1);
                setValidationError('');
              }}
              className={`inline-flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                step === 1
                  ? 'border-slate-100 text-slate-300 dark:border-slate-850 dark:text-slate-700 cursor-not-allowed'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Quick Live Cost Display */}
            {selectedHall && step > 3 && (
              <div className="text-right hidden sm:block">
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Estimated Total</span>
                <span className="text-sm font-black text-rose-500 dark:text-rose-400">₹{totalPrice.toLocaleString()}</span>
              </div>
            )}

            {/* Next / Confirm Button */}
            {step < 7 ? (
              <button
                id="flow-next-btn"
                type="button"
                disabled={
                  (step === 1 && !categoryId) ||
                  (step === 3 && !selectedHall) ||
                  (step === 4 && !selectedDate)
                }
                onClick={() => {
                  setStep(prev => prev + 1);
                  setValidationError('');
                }}
                className={`inline-flex items-center gap-1 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all cursor-pointer shadow-sm ${
                  ((step === 1 && !categoryId) || (step === 3 && !selectedHall) || (step === 4 && !selectedDate))
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800'
                    : ''
                }`}
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="flow-confirm-booking-btn"
                type="button"
                onClick={handleConfirm}
                className="inline-flex items-center gap-1 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Confirm & Pay</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
