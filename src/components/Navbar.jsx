import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartCount, setIsCartOpen, isCartOpen, setView } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleBounce = () => {
      setShouldBounce(true);
      setTimeout(() => setShouldBounce(false), 500);
    };
    window.addEventListener('cart-bounce', handleBounce);
    return () => window.removeEventListener('cart-bounce', handleBounce);
  }, []);

  const navLinks = [
    { name: 'Gourmet Flavors', href: '#products' },
    { name: 'Our Ingredients', href: '#ingredients' },
    { name: 'The Craft', href: '#craft' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-[#FAF6F0]/80 backdrop-blur-md border-b border-[#EADEC9]/30 shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* Branding Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setView('landing');
          }}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="Little Bakes Home"
        >
          <img 
            src="/logo.png" 
            alt="Little Bakes Logo" 
            className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="font-serif text-lg md:text-xl font-bold tracking-[0.15em] text-[#2C1A11] group-hover:text-[#C5A880] transition duration-300">
            LITTLE <span className="text-[#C5A880] font-light">BAKES</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setView('landing')}
              className="text-xs font-bold tracking-widest text-[#2C1A11]/70 hover:text-[#2C1A11] uppercase transition duration-300 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            id="navbar-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-full bg-[#2C1A11] text-[#FAF6F0] hover:bg-[#FAF6F0] hover:text-[#2C1A11] hover:shadow-lg border border-[#2C1A11] transition duration-300 active:scale-95 cursor-pointer"
            aria-label={`Open shopping box drawer, contains ${cartCount} items`}
            aria-expanded={isCartOpen}
            animate={shouldBounce ? { scale: [1, 1.25, 0.92, 1.08, 1] } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880] text-[9px] font-black text-[#2C1A11] shadow-md border border-[#FAF6F0]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-[#EADEC9]/25 text-[#2C1A11] transition cursor-pointer"
            aria-label="Open mobile navigation menu"
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#FAF6F0] px-8 py-6 shadow-2xl flex flex-col md:hidden border-l border-[#EADEC9]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img 
                    src="/logo.png" 
                    alt="Little Bakes Logo" 
                    className="h-8 w-auto object-contain" 
                  />
                  <span className="font-serif text-base font-bold tracking-wider text-[#2C1A11]">
                    LITTLE BAKES
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-1.5 text-[#2C1A11]/60 hover:bg-[#EADEC9]/25 hover:text-[#2C1A11]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setView('landing');
                    }}
                    className="text-sm font-bold tracking-widest text-[#2C1A11]/80 hover:text-[#2C1A11] uppercase border-b border-[#EADEC9]/40 pb-2 transition"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-6 text-[10px] text-[#2C1A11]/40 border-t border-[#EADEC9]/40">
                Freshly baked premium cookies shipped worldwide.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
