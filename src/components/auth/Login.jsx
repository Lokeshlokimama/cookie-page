import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login({ onSwitchToSignup, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white/70 border border-[#EADEC9]/30 premium-shadow backdrop-blur-md">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-2 block">
          Welcome Back
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2C1A11] uppercase tracking-wide">
          Sign In
        </h2>
        <p className="text-xs text-[#4A2E1B]/70 mt-2">
          Access your sweet box history and profile details.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 text-xs font-semibold border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60 mb-2">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-[#EADEC9]/40 bg-white/50 text-sm text-[#2C1A11] placeholder-[#2C1A11]/30 focus:outline-none focus:border-[#C5A880] transition"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60 mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-[#EADEC9]/40 bg-white/50 text-sm text-[#2C1A11] placeholder-[#2C1A11]/30 focus:outline-none focus:border-[#C5A880] transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#2C1A11] text-[#FAF6F0] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 disabled:opacity-50 active:scale-98 cursor-pointer mt-2"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#EADEC9]/25 text-center">
        <p className="text-xs text-[#4A2E1B]/75">
          New to Little Bakes?{' '}
          <button
            onClick={onSwitchToSignup}
            className="font-bold text-[#C5A880] hover:text-[#2C1A11] transition cursor-pointer underline underline-offset-4"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}
