import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    // Interactive credentials checks
    let role: 'admin' | 'customer' = 'customer';
    let name = 'Aditya Rao';

    if (email === 'admin@eventease.in' && password === 'admin123') {
      role = 'admin';
      name = 'Admin Director';
    } else if (email.includes('admin')) {
      role = 'admin';
      name = 'Regional Admin';
    } else {
      // General customer extraction from email prefix
      const prefix = email.split('@')[0];
      name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
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
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-500/20 mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">Welcome Back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log in to manage active reservations or query booking statements.
          </p>
        </div>

        {/* Demo Info Banner */}
        <div className="p-3.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-[11px] leading-relaxed">
          <strong className="block font-bold">💡 Live Sandbox Credentials:</strong>
          <span className="block mt-0.5">Admin access: <code className="font-bold">admin@eventease.in</code> / password: <code className="font-bold">admin123</code></span>
          <span className="block">Customer access: Use any standard email & password.</span>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div>
            <label htmlFor="login-email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="login-email"
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
            <label htmlFor="login-password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-850 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <LogIn className="w-4 h-4" />
            <span>Login Now</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-amber-500 hover:underline">
            Register Here
          </Link>
        </p>

      </div>
    </div>
  );
}
