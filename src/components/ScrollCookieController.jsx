import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollCookieController({ triggerRef }) {
  const wrapperRef = useRef(null);
  const cookieRef = useRef(null);
  const tiltWrapperRef = useRef(null);
  const [positions, setPositions] = useState({ startX: 0, startY: 0, isReady: false });

  // 1. Calculate positions and set up GSAP ScrollTrigger timeline (S-Curve & Spin)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cookie = cookieRef.current;
    const trigger = triggerRef.current;

    if (!wrapper || !cookie || !trigger) return;

    let mm = null;

    const calculatePositions = () => {
      const heroPlaceholder = document.getElementById('hero-muffin-placeholder');
      const ingredientsPlaceholder = document.getElementById('ingredients-muffin-placeholder');

      if (!heroPlaceholder) return null;

      const containerRect = trigger.getBoundingClientRect();
      const heroRect = heroPlaceholder.getBoundingClientRect();

      // Compute starting coordinates relative to the container
      const startX = heroRect.left - containerRect.left + heroRect.width / 2;
      const startY = heroRect.top - containerRect.top + heroRect.height / 2;

      let endX = startX;
      let endY = startY + window.innerHeight; // fallback if second placeholder is hidden (e.g. mobile)

      if (ingredientsPlaceholder && window.innerWidth >= 768) {
        const ingredientsRect = ingredientsPlaceholder.getBoundingClientRect();
        // Check if visible
        if (ingredientsRect.width > 0 && ingredientsRect.height > 0) {
          endX = ingredientsRect.left - containerRect.left + ingredientsRect.width / 2;
          endY = ingredientsRect.top - containerRect.top + ingredientsRect.height / 2;
        }
      }

      return { startX, startY, endX, endY };
    };

    const runSetup = () => {
      // Revert previous matchMedia if it exists
      if (mm) {
        mm.revert();
      }

      const coords = calculatePositions();
      if (!coords) return;

      // Update React state for initial position styling
      setPositions({
        startX: coords.startX,
        startY: coords.startY,
        isReady: true
      });

      // Clear any existing inline styles or GSAP properties from previous executions
      gsap.set(wrapper, { clearProps: 'all' });
      gsap.set(cookie, { clearProps: 'all' });

      // Apply initial styling offsets
      // Set absolute wrapper size center offsets
      const isMobile = window.innerWidth < 768;
      const size = isMobile ? 200 : 300;
      
      gsap.set(wrapper, {
        top: 0,
        left: 0,
        x: coords.startX - size / 2,
        y: coords.startY - size / 2,
      });

      // Setup GSAP MatchMedia for responsive animations
      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Compute translations
        const deltaX = coords.endX - coords.startX;
        const deltaY = coords.endY - coords.startY;

        // Vertical easeInOut: scrolls with section in beginning/end, moves faster in transition zone
        tl.to(wrapper, {
          y: coords.startY - size / 2 + deltaY,
          ease: 'power2.inOut',
        }, 0);

        // Horizontal sweep (X) S-Curve: sways right, then sways left, then lands back
        tl.to(wrapper, {
          x: coords.startX - size / 2 + deltaX,
          keyframes: [
            { x: coords.startX - size / 2 + 60, ease: 'sine.inOut', duration: 0.4 }, // sway right initially
            { x: coords.startX - size / 2 + deltaX - 60, ease: 'sine.inOut', duration: 0.3 }, // sway left in middle
            { x: coords.startX - size / 2 + deltaX, ease: 'sine.inOut', duration: 0.3 } // settle in final center
          ],
          ease: 'none',
        }, 0);

        // Spin the muffin (looks like natural rolling)
        tl.to(cookie, {
          rotation: 720,
          ease: 'none',
        }, 0);
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Animation: no ScrollTrigger is applied.
        // It remains fixed relative to the container at startX, startY.
        // Therefore, it scrolls naturally up with the page content, avoiding overlap with list cards.
      });
    };

    // Run setup with a slight delay to allow layout to settle
    const timer = setTimeout(runSetup, 200);

    // Re-run setup on window resize to ensure responsiveness
    const handleResize = () => {
      runSetup();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (mm) {
        mm.revert();
      }
    };
  }, [triggerRef]);

  // 2. Interactive Cursor 3D Tilt (Only active on desktop to ensure smooth performance)
  useEffect(() => {
    const tiltWrapper = tiltWrapperRef.current;
    if (!tiltWrapper || window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Distance from center (from -1 to 1)
      const mouseX = (e.clientX - centerX) / centerX;
      const mouseY = (e.clientY - centerY) / centerY;

      // Calculate tilt angles (limit to 12 degrees max)
      const tiltX = -mouseY * 12;
      const tiltY = mouseX * 12;

      // Apply transform directly to DOM ref (extremely fast, 60fps)
      tiltWrapper.style.transition = 'transform 0.15s ease-out';
      tiltWrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      // Smooth reset when cursor leaves browser screen
      tiltWrapper.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      tiltWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`absolute z-30 flex flex-col items-center justify-center pointer-events-none ${
        positions.isReady ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
    >
      {/* GSAP Spin Layer */}
      <div
        ref={cookieRef}
        className="relative flex items-center justify-center preserve-3d"
        style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
      >
        {/* Mouse 3D Tilt Layer */}
        <div
          ref={tiltWrapperRef}
          className="relative flex items-center justify-center preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Framer Motion Float Layer */}
          <motion.img
            src="hero_muffin.png"
            alt="Artisanal Gourmet Chocolate Muffin"
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-contain cursor-grab active:cursor-grabbing pointer-events-auto select-none"
            style={{
              filter: 'drop-shadow(0px 16px 32px rgba(44, 26, 17, 0.2))',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [-12, 12, -12], // Floating hover animation
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.03 }}
          />
        </div>
      </div>

      {/* Bounce Shadow */}
      <motion.div
        className="w-[140px] h-[10px] md:w-[220px] md:h-[15px] bg-[#2C1A11]/15 rounded-full blur-md mt-5"
        animate={{
          scale: [0.85, 1.05, 0.85],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
