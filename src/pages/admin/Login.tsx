import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const isAdmin = localStorage.getItem('opd_admin_authenticated') === 'true';
    if (isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate small latency for realistic premium security feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email.trim().toLowerCase() === 'admin@gmail.com' && password === 'Welcome@123') {
      localStorage.setItem('opd_admin_authenticated', 'true');
      localStorage.setItem('opd_admin_email', email);
      localStorage.setItem('opd_admin_session_time', new Date().toISOString());
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid email or password. Please use correct credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            x: [0, 20, -15, 0],
            y: [0, -30, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-100/40 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1.1, 1],
            x: [0, -20, 15, 0],
            y: [0, 20, -15, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white border border-slate-150 rounded-2xl shadow-sm text-primary-600 mb-4">
            <ShieldCheck size={32} className="stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-display font-black tracking-tight text-slate-900">
            Acquire OPD Admin Portal
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Please log in with your administrative credentials
          </p>
        </div>

        {/* Glassmorphic Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-700 tracking-wide uppercase pl-1">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 tracking-wide uppercase pl-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-800 tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-medium leading-relaxed"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm tracking-wide shadow-md shadow-primary-600/10 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying Security Session...
                </>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Note info */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            Protected area. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
