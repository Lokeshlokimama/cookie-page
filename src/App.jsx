import { useRef, useState, useEffect } from 'react';
import { CartProvider, useCart } from './components/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Ingredients from './components/Ingredients';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CTA from './components/CTA';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Flying cookie particle overlay component
function FlyingCookies() {
  const { flyingParticles } = useCart();
  const [cartCoords, setCartCoords] = useState({ x: 0, y: 0 });

  // Compute the target cart navbar icon coordinates dynamically
  useEffect(() => {
    const updateCoords = () => {
      const btn = document.getElementById('navbar-cart-btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setCartCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };
    updateCoords();
    window.addEventListener('resize', updateCoords);
    const timer = setTimeout(updateCoords, 500); // delay to let styles settle
    return () => {
      window.removeEventListener('resize', updateCoords);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {flyingParticles.map((p) => {
          // Parabolic height calculation (peak is 180px higher than highest point)
          const peakY = Math.min(p.startY, cartCoords.y) - 180;
          
          return (
            <motion.div
              key={p.id}
              initial={{
                x: p.startX - 15,
                y: p.startY - 15,
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                // Parabolic trajectory (bezier coordinates)
                x: [p.startX - 15, (p.startX + cartCoords.x) / 2 - 15, cartCoords.x - 15],
                y: [p.startY - 15, peakY, cartCoords.y - 15],
                scale: [1, 1.4, 0.45], // expands slightly in mid-air, shrinks into the box
                rotate: 360, // spins clockwise
                opacity: [1, 1, 0.9],
              }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                // Dispatch event when particle lands to trigger cart icon bounce!
                window.dispatchEvent(new CustomEvent('cart-bounce'));
              }}
              transition={{
                duration: 0.85,
                ease: 'easeInOut',
              }}
              className="absolute w-[30px] h-[30px] bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url("${p.image}")`,
                filter: 'drop-shadow(0px 4px 8px rgba(44, 26, 17, 0.25))',
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function MainApp() {

  const { view } = useCart();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAF6F0] selection:bg-[#2C1A11] selection:text-[#FAF6F0]">
      {/* Dynamic flying cookies micro-particles */}
      <FlyingCookies />

      {/* Optimized subtle ambient golden particles */}
      <ParticleBackground />

      {/* Premium sticky Header */}
      <Navbar />

      {/* Conditionally render Landing view or Cart page view */}
      {view === 'landing' ? (
        <>
          <Hero />
          <Ingredients />

          {/* Products selection section */}
          <Products />

          {/* New Rebranded CTA Section */}
          <CTA />
        </>
      ) : (
        <CartPage />
      )}

      {/* Sliding Side-Cart drawer */}
      <CartDrawer />

      {/* Premium brand credentials footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

export default App;
