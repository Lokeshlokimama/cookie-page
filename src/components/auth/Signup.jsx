import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      setSuccess(true);
      // Reset input fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white/70 border border-[#EADEC9]/30 premium-shadow backdrop-blur-md">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-2 block">
          Join the Club
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2C1A11] uppercase tracking-wide">
          Register
        </h2>
        <p className="text-xs text-[#4A2E1B]/70 mt-2">
          Create an account to track orders and save preferences.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 text-xs font-semibold border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-800 text-xs font-semibold border border-green-200">
          Account created successfully! Please check your email inbox to verify your account before logging in.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="signup-email" className="block text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60 mb-2">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-[#EADEC9]/40 bg-white/50 text-sm text-[#2C1A11] placeholder-[#2C1A11]/30 focus:outline-none focus:border-[#C5A880] transition"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60 mb-2">
            Password (min 6 characters)
          </label>
          <input
            id="signup-password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-[#EADEC9]/40 bg-white/50 text-sm text-[#2C1A11] placeholder-[#2C1A11]/30 focus:outline-none focus:border-[#C5A880] transition"
          />
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="block text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60 mb-2">
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl border border-[#EADEC9]/40 bg-white/50 text-sm text-[#2C1A11] placeholder-[#2C1A11]/30 focus:outline-none focus:border-[#C5A880] transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#2C1A11] text-[#FAF6F0] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 disabled:opacity-50 active:scale-98 cursor-pointer mt-2"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#EADEC9]/25 text-center">
        <p className="text-xs text-[#4A2E1B]/75">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-bold text-[#C5A880] hover:text-[#2C1A11] transition cursor-pointer underline underline-offset-4"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
