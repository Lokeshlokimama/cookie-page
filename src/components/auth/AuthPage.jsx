import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import PurchaseHistory from './PurchaseHistory';

export default function AuthPage({ onShopNow }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    // 1. Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (err) {
        console.error('Session retrieve error:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center py-20 px-6">
        <div className="w-10 h-10 rounded-full border-2 border-[#C5A880]/20 border-t-[#C5A880] animate-spin mb-4" />
        <span className="text-xs font-bold tracking-widest text-[#2C1A11]/60 uppercase animate-pulse">
          Syncing box credentials...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-28 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden flex flex-col justify-center">
      {/* Background visual halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-glow/20 blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-4xl w-full">
        {user ? (
          <div className="space-y-8 animate-fadeIn">
            <Profile user={user} onLogout={() => setUser(null)} />
            <PurchaseHistory user={user} onShopNow={onShopNow} />
          </div>
        ) : (
          <div className="max-w-md mx-auto animate-fadeIn">
            {activeTab === 'login' ? (
              <Login 
                onSwitchToSignup={() => setActiveTab('signup')} 
                onSuccess={(u) => setUser(u)}
              />
            ) : (
              <Signup 
                onSwitchToLogin={() => setActiveTab('login')} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
