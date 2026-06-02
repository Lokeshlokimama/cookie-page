import { supabase } from '../../lib/supabase';
import { LogOut, Mail, Calendar, ShieldCheck } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      if (onLogout) onLogout();
    } catch (err) {
      console.error('Error logging out:', err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full rounded-3xl bg-white/70 border border-[#EADEC9]/30 p-8 premium-shadow backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-[#EADEC9]/25">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-2 block">
            Customer Dashboard
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2C1A11] uppercase tracking-wide">
            Your Profile
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-[#2C1A11]/15 text-[#2C1A11] hover:bg-[#2C1A11] hover:text-[#FAF6F0] px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest transition duration-300 active:scale-95 cursor-pointer shadow-sm"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-[#EADEC9]/20">
          <div className="p-3 rounded-xl bg-[#FAF6F0] text-[#C5A880]">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] font-black uppercase tracking-widest text-[#2C1A11]/50 mb-1">
              Email Address
            </span>
            <span className="text-sm font-semibold text-[#2C1A11] break-all">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-[#EADEC9]/20">
          <div className="p-3 rounded-xl bg-[#FAF6F0] text-[#C5A880]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] font-black uppercase tracking-widest text-[#2C1A11]/50 mb-1">
              Last Login
            </span>
            <span className="text-sm font-semibold text-[#2C1A11]">
              {formatDate(user?.last_sign_in_at)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-[#EADEC9]/20">
          <div className="p-3 rounded-xl bg-[#FAF6F0] text-[#C5A880]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[8px] font-black uppercase tracking-widest text-[#2C1A11]/50 mb-1">
              Customer ID
            </span>
            <span className="text-[11px] font-bold text-[#2C1A11] font-mono break-all leading-relaxed block mt-0.5">
              {user?.id?.substring(0, 18)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
