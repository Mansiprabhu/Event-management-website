import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="bg-rose-500/10 text-rose-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
        <AlertCircle className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight">404 - Page Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The requested URL path is not mapped to any active page inside our EventEase convention portal.
        </p>
      </div>

      <button
        id="not-found-back-home-btn"
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs uppercase bg-slate-950 hover:bg-slate-850 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all shadow-md cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>
    </div>
  );
}
