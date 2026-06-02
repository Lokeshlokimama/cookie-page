import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    updateQuantity,
    removeFromCart,
    setView
  } = useCart();


  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-40 bg-coco-dark/30 backdrop-blur-sm bg-black/40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col bg-[#2C1A11]/95 text-[#FAF6F0] shadow-2xl backdrop-blur-md border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#C5A880]" />
                <h2 className="font-serif text-xl font-semibold tracking-wide">Your Cookie Box</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-4 opacity-75">
                  <div className="rounded-full bg-white/5 p-6 border border-white/5">
                    <ShoppingBag className="h-10 w-10 text-[#C5A880]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">Your box is empty</h3>
                    <p className="text-sm text-white/50 mt-1 max-w-xs">
                      Add some gourmet cookies to begin your sensory journey.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 rounded-full border border-[#C5A880] px-6 py-2 text-xs font-semibold tracking-wider text-[#C5A880] hover:bg-[#C5A880] hover:text-[#2C1A11] transition"
                  >
                    Browse Cookies
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 rounded-xl bg-white/5 p-3 border border-white/5 items-center"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain blend-multiply"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold truncate text-[#FAF6F0]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#C5A880] mt-0.5">₹{item.price.toFixed(2)} each</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-white/5 rounded-full px-2.5 py-1 border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-400 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6 bg-black/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/60">Subtotal</span>
                  <span className="font-serif text-lg font-bold text-[#FAF6F0]">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 mb-4">
                  Tax and flat-rate premium shipping calculated at checkout.
                </p>
                <button
                  onClick={() => {
                    setView('cart');
                    setIsCartOpen(false);
                  }}
                  className="w-full rounded-full bg-[#C5A880] py-3.5 text-center text-xs font-bold uppercase tracking-widest text-[#2C1A11] hover:bg-[#FAF6F0] transition active:scale-[0.98] cursor-pointer"
                >
                  View Bag &amp; Checkout
                </button>
              </div>
            )}
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );
}
