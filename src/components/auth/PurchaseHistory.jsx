import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, Clock, CheckCircle2, Truck, AlertTriangle } from 'lucide-react';

export default function PurchaseHistory({ user, onShopNow }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      setIsDemoData(false);

      try {
        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) {
          // If the table orders does not exist or has an issue, fall back to mock data
          console.warn('Orders table fetch error, loading mockup demo data:', fetchError.message);
          loadMockData();
          return;
        }

        setOrders(data || []);
      } catch (err) {
        console.error('Catch error loading orders:', err);
        loadMockData();
      } finally {
        setLoading(false);
      }
    };

    const loadMockData = () => {
      setIsDemoData(true);
      setOrders([
        {
          id: 'ord_demo_01',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          status: 'Completed',
          total_amount: 850.00,
          items: [
            { name: 'Choco Chip Cookie', quantity: 2, price: 250 },
            { name: 'Walnut Brownie', quantity: 1, price: 300 }
          ]
        },
        {
          id: 'ord_demo_02',
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          status: 'Shipped',
          total_amount: 1180.00,
          items: [
            { name: 'Pistachio Cookie', quantity: 3, price: 290 },
            { name: 'Chocolate Brownie Classic Plain', quantity: 1, price: 290 }
          ]
        }
      ]);
    };

    fetchOrders();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const normalized = (status || '').toLowerCase();
    if (normalized === 'completed' || normalized === 'delivered') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-green-200">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </span>
      );
    }
    if (normalized === 'shipped' || normalized === 'transit') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-amber-200">
          <Truck className="h-3 w-3" />
          Shipped
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 text-stone-700 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-stone-200">
        <Clock className="h-3 w-3" />
        Processing
      </span>
    );
  };

  // Safe items parser
  const renderOrderItems = (items) => {
    let parsedItems = [];
    try {
      if (typeof items === 'string') {
        parsedItems = JSON.parse(items);
      } else if (Array.isArray(items)) {
        parsedItems = items;
      }
    } catch (e) {
      console.error('Failed to parse order items:', e);
    }

    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return <span className="text-xs text-[#2C1A11]/60 italic">Custom Box Items</span>;
    }

    return (
      <div className="space-y-1 mt-2">
        {parsedItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs text-[#4A2E1B]/80 font-medium">
            <span>
              {item.name} <span className="text-[10px] text-[#C5A880] font-bold">x{item.quantity}</span>
            </span>
            <span className="text-stone-400 font-normal">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full rounded-3xl bg-white/70 border border-[#EADEC9]/30 p-8 premium-shadow backdrop-blur-md mt-8 space-y-6">
        <div className="h-6 w-48 bg-stone-200 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-stone-200/50 bg-white/40 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-stone-200 animate-pulse rounded" />
                <div className="h-5 w-24 bg-stone-200 animate-pulse rounded-full" />
              </div>
              <div className="h-3 w-48 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-white/70 border border-[#EADEC9]/30 p-8 premium-shadow backdrop-blur-md mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#EADEC9]/25">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-black text-[#2C1A11] uppercase tracking-wide">
            Order History
          </h2>
          <p className="text-xs text-[#4A2E1B]/70 mt-1">
            Review your previous bakes and shipping updates.
          </p>
        </div>

        {isDemoData && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF6F0] text-[#C5A880] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-[#EADEC9]/40">
            <AlertTriangle className="h-3.5 w-3.5" />
            Demo Mode (Orders Table Not Found)
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#FAF6F0] text-[#C5A880] mb-5">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">No Bakes Found</h3>
          <p className="text-xs text-[#4A2E1B]/70 max-w-sm mx-auto mb-8 leading-relaxed">
            You haven't ordered any custom cookie boxes or brownies yet. Our kitchen is ready when you are!
          </p>
          <button
            onClick={onShopNow}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C1A11] text-[#FAF6F0] text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 active:scale-95 cursor-pointer"
          >
            Start Ordering Box
          </button>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group p-6 rounded-2xl border border-[#EADEC9]/20 bg-white/40 hover:border-[#C5A880]/30 transition duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-[#EADEC9]/15">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-[#2C1A11] font-mono uppercase">
                    Order ID: {order.id.replace('ord_demo_', '#')}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    &bull; {formatDate(order.created_at)}
                  </span>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Order Items */}
              <div className="py-4">
                <span className="block text-[8px] font-black uppercase tracking-widest text-[#2C1A11]/50 mb-2">
                  Items Ordered
                </span>
                {renderOrderItems(order.items)}
              </div>

              {/* Order Total */}
              <div className="pt-4 border-t border-[#EADEC9]/15 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2C1A11]/60">
                  Total Paid
                </span>
                <span className="font-serif text-base font-black text-[#2C1A11]">
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
