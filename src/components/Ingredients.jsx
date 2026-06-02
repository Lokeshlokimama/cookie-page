import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Ingredients() {
  const sectionRef = useRef(null);
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
  const xText = useTransform(scrollY, [300, 1600], [-150, 150]); // Shifts in opposite direction

  // Mouse Coordinate tracking for interactive 3D sway
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Relative coordinates from screen center
    const x = (e.clientX - window.innerWidth / 2) * 0.08;
    const y = (e.clientY - window.innerHeight / 2) * 0.08;
    
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Details of the ingredients
  const ingredientDetails = [
    {
      title: 'French Churned Butter',
      description: 'Slow-churned in Normandy for rich hazelnut notes and a melting, tender crumb texture.',
      position: 'col-start-1 row-start-1 text-right pr-12 hidden md:block',
      mobilePosition: 'block md:hidden',
    },
    {
      title: 'Madagascar Cocoa',
      description: 'Single-origin 70% dark chocolate chips offering a bold cocoa profile with red fruit undertones.',
      position: 'col-start-3 row-start-1 text-left pl-12 hidden md:block',
      mobilePosition: 'block md:hidden',
    },
    {
      title: 'Organic Grass-Fed Milk',
      description: 'Rich, unpasteurized milk from grass-fed cows giving the dough its creamy, rich consistency.',
      position: 'col-start-1 row-start-2 text-right pr-12 pb-6 hidden md:block',
      mobilePosition: 'block md:hidden',
    },
    {
      title: 'Guérande Sea Salt',
      description: 'Flaky Fleur de Sel harvested by hand in Brittany to balance the sweetness with mineral brightness.',
      position: 'col-start-3 row-start-2 text-left pl-12 pb-6 hidden md:block',
      mobilePosition: 'block md:hidden',
    },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="ingredients"
      className="relative min-h-screen flex flex-col justify-center items-center py-24 overflow-hidden bg-[#FAF6F0]"
    >
      {/* Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src="Baker_dusting_flour_croissants_202606011418.mp4"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className="opacity-[0.70]"
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Huge horizontal parallax background text banner (Counter-Scroll) */}
      <div className="absolute top-[32%] left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none z-0">
        <motion.h2
          style={{ x: xText }}
          className="font-serif text-[12vw] font-black text-[#2C1A11]/[0.025] uppercase tracking-[0.2em] leading-none"
        >
          ARTISANAL CRAFT
        </motion.h2>
      </div>

      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gold-glow/20 blur-3xl -z-10 pointer-events-none" />

      {/* Floating Chocolate Chips around the center with mouse sways */}
      {/* Chip 1: Top Left - Positive X/Y sway */}
      <motion.div
        className="absolute top-1/3 left-1/4 z-20 pointer-events-none hidden sm:block"
        animate={{
          x: mouseOffset.x * 0.6,
          y: mouseOffset.y * 0.6 + [-15, 15, -15][1], // Merge idle bounce and mouse sway
          rotate: [0, 20, 0]
        }}
        transition={{
          x: { type: 'spring', stiffness: 100, damping: 15 },
          y: { type: 'spring', stiffness: 100, damping: 15 },
          rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M22.5 2C27.5 8 36.5 12 40 22C43.5 32 32.5 38 22.5 38C12.5 38 1.5 32 5 22C8.5 12 17.5 8 22.5 2Z" fill="#3A2312" />
          <path d="M25.5 12C26.5 15 28.5 17 30 18" stroke="#5C3E21" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Chip 2: Top Right - Negative X/Y sway (Parallax Depth) */}
      <motion.div
        className="absolute top-1/4 right-1/4 z-20 pointer-events-none hidden sm:block"
        animate={{
          x: mouseOffset.x * -0.5,
          y: mouseOffset.y * -0.5 + [15, -15, 15][1],
          rotate: [15, -15, 15]
        }}
        transition={{
          x: { type: 'spring', stiffness: 100, damping: 15 },
          y: { type: 'spring', stiffness: 100, damping: 15 },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M17.5 1C21.5 6 28.5 9 31 16.5C33.5 24 25.5 28.5 17.5 28.5C9.5 28.5 1.5 24 4 16.5C6.5 9 13.5 6 17.5 1Z" fill="#2C1A11" />
          <path d="M12.5 10C13.5 12 15 13 16 13.5" stroke="#4A2E1B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Chip 3: Bottom Left - Positive X, Negative Y sway */}
      <motion.div
        className="absolute bottom-1/3 left-1/3 z-20 pointer-events-none hidden sm:block"
        animate={{
          x: mouseOffset.x * 0.4,
          y: mouseOffset.y * -0.4 + [-10, 10, -10][1],
          rotate: [-20, 20, -20]
        }}
        transition={{
          x: { type: 'spring', stiffness: 100, damping: 15 },
          y: { type: 'spring', stiffness: 100, damping: 15 },
          rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M19 1.5C23 6.5 30.5 9.5 33 17.5C35.5 25.5 27.5 30.5 19 30.5C10.5 30.5 2.5 25.5 5 17.5C7.5 9.5 15 6.5 19 1.5Z" fill="#4A2E1B" />
        </svg>
      </motion.div>

      {/* Chip 4: Bottom Right - Negative X, Positive Y sway */}
      <motion.div
        className="absolute bottom-1/4 right-1/3 z-20 pointer-events-none hidden sm:block"
        animate={{
          x: mouseOffset.x * -0.6,
          y: mouseOffset.y * 0.6 + [12, -12, 12][1],
          rotate: [-10, 10, -10]
        }}
        transition={{
          x: { type: 'spring', stiffness: 100, damping: 15 },
          y: { type: 'spring', stiffness: 100, damping: 15 },
          rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M21 2C25.5 7.5 34 11 37 19.5C40 28 30 33.5 21 33.5C12 33.5 2 28 5 19.5C8 11 16.5 7.5 21 2Z" fill="#3A2312" />
        </svg>
      </motion.div>

      {/* Drifting Butter Icon (Left) with Mouse sway */}
      <motion.div
        className="absolute left-10 md:left-24 top-1/2 -translate-y-1/2 z-10 p-4 rounded-2xl glass-card text-[#C5A880] border-[#EADEC9] shadow-lg hidden lg:block"
        animate={{
          x: mouseOffset.x * 0.8,
          y: mouseOffset.y * 0.8,
          rotate: [-3, 5, -3],
        }}
        transition={{
          x: { type: 'spring', stiffness: 80, damping: 18 },
          y: { type: 'spring', stiffness: 80, damping: 18 },
          rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Butter SVG */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 14h14" />
            <path d="M3 18h18" />
            <rect x="5" y="6" width="14" height="8" rx="2" />
            <path d="M9 6v8" />
            <path d="M15 6v8" />
          </svg>
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#2C1A11]/60">French Butter</span>
        </div>
      </motion.div>

      {/* Drifting Milk Icon (Right) with Mouse sway */}
      <motion.div
        className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 z-10 p-4 rounded-2xl glass-card text-[#C5A880] border-[#EADEC9] shadow-lg hidden lg:block"
        animate={{
          x: mouseOffset.x * -0.8,
          y: mouseOffset.y * -0.8,
          rotate: [4, -4, 4],
        }}
        transition={{
          x: { type: 'spring', stiffness: 80, damping: 18 },
          y: { type: 'spring', stiffness: 80, damping: 18 },
          rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Milk Bottle/Glass SVG */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2h6" />
            <path d="M9 6h6" />
            <path d="M12 2v4" />
            <path d="M8 6h8a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2z" />
            <path d="M6 13h12" />
            <path d="M9 17h6" />
          </svg>
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#2C1A11]/60">Organic Milk</span>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full flex-1 flex flex-col justify-between items-center relative z-10 h-full">
        {/* Eyebrow & Title */}
        <div className="text-center max-w-2xl mb-12 select-none">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-4 block">
            Pure &amp; Uncompromised
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#2C1A11] tracking-wide uppercase">
            Sourced for Senses
          </h2>
          <p className="text-xs md:text-sm text-[#4A2E1B]/75 mt-3 leading-relaxed">
            We believe that extraordinary cookies require extraordinary components. No artificial flavorings, no preservatives. Just nature’s finest ingredients.
          </p>
        </div>

        {/* 4-Quadrant Symmetrical Layout around the central cookie */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-8 w-full max-w-5xl items-center">
          
          {/* Top Left Ingredient Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={ingredientDetails[0].position}
          >
            <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">{ingredientDetails[0].title}</h3>
            <p className="text-xs text-[#4A2E1B]/80 leading-relaxed">{ingredientDetails[0].description}</p>
          </motion.div>

          {/* Reserved Space for Cookie in Center */}
          <div id="ingredients-muffin-placeholder" className="col-start-2 row-start-1 row-span-2 h-[200px] md:h-[320px] hidden md:block pointer-events-none" />

          {/* Top Right Ingredient Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={ingredientDetails[1].position}
          >
            <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">{ingredientDetails[1].title}</h3>
            <p className="text-xs text-[#4A2E1B]/80 leading-relaxed">{ingredientDetails[1].description}</p>
          </motion.div>

          {/* Bottom Left Ingredient Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={ingredientDetails[2].position}
          >
            <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">{ingredientDetails[2].title}</h3>
            <p className="text-xs text-[#4A2E1B]/80 leading-relaxed">{ingredientDetails[2].description}</p>
          </motion.div>

          {/* Bottom Right Ingredient Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={ingredientDetails[3].position}
          >
            <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">{ingredientDetails[3].title}</h3>
            <p className="text-xs text-[#4A2E1B]/80 leading-relaxed">{ingredientDetails[3].description}</p>
          </motion.div>

          {/* Mobile Only Cards List */}
          <div className="col-span-1 md:hidden space-y-6">
            {ingredientDetails.map((ing, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/50 p-6 rounded-2xl border border-[#EADEC9]/40 backdrop-blur-xs text-center"
              >
                <h3 className="font-serif text-base font-bold text-[#2C1A11] mb-2">{ing.title}</h3>
                <p className="text-xs text-[#4A2E1B]/80 leading-relaxed">{ing.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
