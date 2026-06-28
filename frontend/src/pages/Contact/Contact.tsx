import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, User as UserIcon } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setFormSubmitted(false);
        alert('Thank you! Your message has been sent to our customer care team.');
      }, 1000);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Get In Touch
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
          Have an upcoming marriage, award ceremony, or corporate summit? Connect with our venue relations team for customized rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contact Information</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Contact Person</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Mansi Prabhu</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Call Us</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 99028 12352</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-rose-500/10 text-rose-600 rounded-lg shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Us</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">mansiashwinprabhu@gmail.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Location</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  Mangalore, Karnataka, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm space-y-4"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send Us a Direct Message</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aditya Sharma"
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@example.com"
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Message Description
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your event requirements, dates, and number of guests..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
