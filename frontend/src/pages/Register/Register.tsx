import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User as UserIcon, ShieldAlert, Sparkles } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all requested fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const userData = {
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name,
      email,
      role
    };

    // Save to localStorage
    localStorage.setItem('eventease_user', JSON.stringify(userData));

    // Dispatch custom event to notify App state
    window.dispatchEvent(new Event('auth-change'));

    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="py-12 max-w-md mx-auto animate-fade-in">
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20 mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">Create Account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign up to custom tailor banquets, log slot selections, and write reviews.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name input */}
          <div>
            <label htmlFor="reg-name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <UserIcon className="w-4 h-4" />
              </span>
              <input
                id="reg-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aditya Rao"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="reg-email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="reg-password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="reg-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Select Account Role</label>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  role === 'customer'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-850 text-slate-500'
                }`}
              >
                Customer Account
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  role === 'admin'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-850 text-slate-500'
                }`}
              >
                Admin Partner
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-850 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Account</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-amber-500 hover:underline">
            Login Here
          </Link>
        </p>

      </div>
    </div>
  );
}
