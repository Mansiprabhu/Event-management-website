import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Sparkles, User, Mail, DollarSign, Clock, 
  Trash2, Printer, Search, ArrowLeft, RefreshCw, CheckCircle, HelpCircle, PhoneCall
} from 'lucide-react';
import { Booking, Hall } from '../types';
import { EXTRA_SERVICES } from '../data';

interface MyBookingsPageProps {
  bookings: Booking[];
  halls: Hall[];
  onDeleteBooking: (bookingId: string) => Promise<boolean>;
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function MyBookingsPage({
  bookings,
  halls,
  onDeleteBooking,
  onNavigateHome,
  onNavigateAdmin,
  darkMode,
  setDarkMode
}: MyBookingsPageProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCancelingId, setIsCancelingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filter bookings based on email input or show all if empty
  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    return b.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(emailInput.trim());
  };

  const handleClearSearch = () => {
    setEmailInput('');
    setSearchQuery('');
  };

  const handleCancelClick = async (id: string) => {
    if (confirm('Are you absolutely sure you want to cancel this reservation? This action is permanent and will free up the slot.')) {
      setIsCancelingId(id);
      const success = await onDeleteBooking(id);
      setIsCancelingId(null);
    }
  };

  const handlePrint = (booking: Booking) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const servicesList = booking.services.map(srvId => {
      const srv = EXTRA_SERVICES.find(s => s.id === srvId);
      return srv ? `<li>${srv.name} (₹${srv.price.toLocaleString()})</li>` : '';
    }).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>EventSphere Booking Pass - ${booking.id}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; }
            .ticket { border: 2px dashed #bbb; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; background: #fff; }
            .header { text-align: center; border-bottom: 2px solid #f1f1f1; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #f59e0b; margin: 0; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
            .badge-confirmed { background: #d1fae5; color: #065f46; }
            .badge-pending { background: #fef3c7; color: #92400e; }
            .details { margin: 25px 0; line-height: 1.6; }
            .details h3 { margin: 0 0 15px 0; color: #111; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .field { font-size: 13px; color: #666; }
            .value { font-size: 15px; font-weight: 600; color: #111; margin-top: 2px; }
            .services { background: #fafafa; padding: 15px; border-radius: 8px; font-size: 13px; }
            .services ul { margin: 5px 0 0 0; padding-left: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
            @media print {
              body { padding: 0; }
              .ticket { border: 2px solid #000; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <p class="logo">EventSphere</p>
              <div class="badge ${booking.status === 'Confirmed' ? 'badge-confirmed' : 'badge-pending'}">${booking.status} Reservation</div>
            </div>
            <div class="details">
              <h3>Reservation Pass #${booking.id}</h3>
              <div class="grid">
                <div>
                  <div class="field">Guest Host</div>
                  <div class="value">${booking.userName}</div>
                </div>
                <div>
                  <div class="field">Registered Email</div>
                  <div class="value">${booking.userEmail}</div>
                </div>
                <div>
                  <div class="field">Venue Name</div>
                  <div class="value">${booking.hallName}</div>
                </div>
                <div>
                  <div class="field">Destination City</div>
                  <div class="value">${booking.cityName}</div>
                </div>
                <div>
                  <div class="field">Scheduled Date</div>
                  <div class="value">${booking.date}</div>
                </div>
                <div>
                  <div class="field">Reserved Time Slot</div>
                  <div class="value">${booking.slot} Slot</div>
                </div>
                <div>
                  <div class="field">Expected Guests</div>
                  <div class="value">${booking.guests} Pax</div>
                </div>
                <div>
                  <div class="field">Payment Method</div>
                  <div class="value">${booking.paymentMethod}</div>
                </div>
              </div>
              
              ${servicesList ? `
                <div class="services">
                  <strong>Requested Extra Concierge Services:</strong>
                  <ul>${servicesList}</ul>
                </div>
              ` : ''}
              
              <div style="margin-top: 25px; text-align: right; border-top: 1px solid #f1f1f1; padding-top: 15px;">
                <span class="field" style="display: block; font-size: 11px;">GRAND TOTAL RESERVATION FEE</span>
                <span class="value" style="font-size: 22px; color: #10b981;">₹${booking.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing EventSphere. Please present a printed or digital copy of this pass at the venue entrance.</p>
              <p>© 2026 EventSphere Hotels & Resorts. Support desk: +91 80 4991 2000</p>
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* ---------------------------------------------------- */}
      {/* PAGE SPECIFIC NAVIGATION BAR */}
      {/* ---------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Back button & Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateHome}
              className="p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 cursor-pointer active:scale-95"
              title="Return to Venue Discovery"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>EventSphere</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] uppercase font-bold tracking-wider">Customer Portal</span>
              </h1>
              <p className="text-[10px] text-slate-400">My Secured Booking Passes</p>
            </div>
          </div>

          {/* Quick Page Navigator Links */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="text-xs font-bold text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Discover Venues
            </button>
            <button 
              onClick={onNavigateAdmin}
              className="text-xs font-bold text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Admin Console
            </button>
            
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 active:scale-95 cursor-pointer"
            >
              {darkMode ? <Sparkles className="w-4 h-4 text-amber-400" /> : <Sparkles className="w-4 h-4 text-slate-400" />}
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Banner Section */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Securely Retrieve & Manage Your Booking Passes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Enter your reservation email to filter and locate your digital entry tickets. You can view payment statuses, print PDF receipts, or request cancellations.
          </p>
        </div>

        {/* Real-time Email Query Module */}
        <div className="mb-10 max-w-xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email"
                placeholder="Enter your booking email (e.g. rajesh@example.com)"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button 
              type="submit"
              className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 rounded-xl shadow cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </form>

          {searchQuery && (
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-800/40">
              <span className="font-medium">
                Filtering by: <strong className="text-amber-500">{searchQuery}</strong> ({filteredBookings.length} found)
              </span>
              <button 
                onClick={handleClearSearch}
                className="text-[10px] uppercase font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Tickets Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBookings.map((b) => {
            const hall = halls.find(h => h.id === b.hallId);
            return (
              <div 
                key={b.id} 
                id={`ticket-${b.id}`}
                className="relative bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                {/* Decorative punched holes to look like a ticket */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 -translate-y-1/2 z-10" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 -translate-y-1/2 z-10" />

                {/* Ticket Top: Venue Info */}
                <div className="p-6 border-b border-dashed border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          {b.eventType}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          ID: #{b.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {b.hallName}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.cityName} Destination</span>
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{b.status}</span>
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1">
                        {b.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Core fields grid */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-900">
                      <span className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Date</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{b.date}</span>
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-900">
                      <span className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Time Slot</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1 mt-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{b.slot}</span>
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-900">
                      <span className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Guests</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1 mt-1">
                        <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{b.guests} Pax</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Bottom: Client & Billing info */}
                <div className="p-6 bg-slate-50/50 dark:bg-slate-900/40 flex-1 flex flex-col justify-between">
                  <div>
                    {/* User info */}
                    <div className="flex flex-col sm:flex-row justify-between text-xs gap-2 mb-4">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Booking Contact:</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{b.userName}</p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Registered Email:</span>
                        <p className="font-mono text-slate-600 dark:text-slate-400">{b.userEmail}</p>
                      </div>
                    </div>

                    {/* Extra services */}
                    {b.services.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Included Add-ons:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {b.services.map(srvId => {
                            const srv = EXTRA_SERVICES.find(s => s.id === srvId);
                            return srv ? (
                              <span key={srvId} className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 text-[10px] text-slate-600 dark:text-slate-350 border border-slate-200/50 dark:border-slate-850">
                                {srv.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action triggers */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Total Cost</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        ₹{b.totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePrint(b)}
                        className="p-2 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer text-xs font-bold flex items-center gap-1"
                        title="Print Entry Pass"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Print Pass</span>
                      </button>
                      <button 
                        onClick={() => handleCancelClick(b.id)}
                        disabled={isCancelingId === b.id}
                        className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30 rounded-xl transition-all cursor-pointer text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

          {filteredBookings.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                No active bookings matching your criteria found.
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                If you just booked a slot, try searching using your reservation email, or view your saved tickets here. You can also view default seeded tickets under <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-amber-500 font-mono">rajesh@example.com</code> or <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-amber-500 font-mono">meera@example.com</code>.
              </p>
            </div>
          )}
        </div>

        {/* Support section */}
        <div className="mt-16 bg-gradient-to-tr from-slate-900 to-slate-950 dark:from-slate-900/50 dark:to-slate-950/50 p-8 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold">Require specialized assistance or modifications?</h4>
            <p className="text-xs text-slate-400 max-w-xl">
              For security, custom floral arrangements, major catering changes, or rescheduling, our dedicated 24/7 support line is available. Please reach out with your Booking ID.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700 shrink-0">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400">Concierge Helpline</span>
              <span className="font-mono text-sm font-bold text-amber-400">+91 80 4991 2000</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
