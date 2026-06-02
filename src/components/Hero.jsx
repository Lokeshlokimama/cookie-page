import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Magnetic Button component for high-end micro-interaction
function MagneticButton({ children, href, onClick, className }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = buttonRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Draw button 35% towards the cursor coordinate offset
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const videoRef = useRef(null);
  // Force browser autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log('Autoplay blocked:', err));
    }
  }, []);

  // Parallax Scroll Tracking for background text
  const { scrollY } = useScroll();
  const xText = useTransform(scrollY, [0, 1000], [0, -180]);

  const scrollToProducts = (e) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden premium-gradient-bg">
      {/* Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src="Water_drop_falls_on_powder_202605251914.mp4"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className="opacity-[0.75]"
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Huge horizontal parallax background text banner */}
      <div className="absolute top-[28%] left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: xText }}
          className="font-serif text-[12vw] font-black text-[#2C1A11]/[0.025] uppercase tracking-[0.2em] leading-none"
        >
          LITTLE BAKES
        </motion.h2>
      </div>

      {/* Subtle glowing halo behind where the cookie will sit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-gold-glow/30 blur-3xl -z-10 pointer-events-none" />

      {/* Side Decorative Text (Luxury Editorial Feel) */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#2C1A11]/45 origin-left -rotate-90 pointer-events-none select-none">
        Est. 2026 &mdash; Artisanal Baking Method
      </div>
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#2C1A11]/45 origin-right rotate-90 pointer-events-none select-none">
        100% Organic &amp; Sustainably Sourced
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full flex-1 flex flex-col justify-center items-center text-center relative z-10">
        {/* Eyebrow kicker */}
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-6"
        >
          Artisanal Bakery &bull; Freshly Baked
        </motion.span>

        {/* Heading Split to wrap around the central cookie */}
        <div className="relative w-full max-w-4xl flex flex-col items-center select-none">
          {/* Visually Hidden single semantic H1 for clean SEO indexing */}
          <h1 className="sr-only">Little Bakes - The Gourmet Cookie Revolution</h1>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            className="font-serif text-5xl md:text-8xl font-black text-[#2C1A11] tracking-wide uppercase leading-tight"
          >
            THE GOURMET
          </motion.span>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.25 }}
            className="font-serif text-5xl md:text-8xl font-black text-[#C5A880] tracking-wide uppercase leading-tight mt-2 md:mt-4"
          >
            REVOLUTION
          </motion.span>
        </div>

        {/* Subtitle and Call to action below the cookie space */}
        <div className="max-w-xl mt-8 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className="text-sm md:text-base text-[#4A2E1B]/80 leading-relaxed font-medium"
          >
            Experience the perfect harmony of rich dark chocolate, French churned butter, and flaky sea salt. Freshly baked and shipped in gold-sealed tins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Wrapped in Magnetic buttons for immersive feel */}
            <MagneticButton
              href="#products"
              onClick={scrollToProducts}
              className="rounded-full bg-[#2C1A11] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#FAF6F0] hover:bg-[#C5A880] hover:text-[#2C1A11] hover:shadow-xl transition duration-300 active:scale-95"
            >
              Order Fresh Now
            </MagneticButton>
            <MagneticButton
              href="#ingredients"
              className="rounded-full border border-[#2C1A11]/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#2C1A11] hover:border-[#2C1A11] hover:bg-[#2C1A11]/5 transition duration-300 active:scale-95"
            >
              See Our Ingredients
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center justify-center text-center mt-6 z-10 pointer-events-none select-none">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#2C1A11]/40 mb-2">
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#2C1A11]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
