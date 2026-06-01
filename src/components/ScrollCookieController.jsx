import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollCookieController({ triggerRef }) {
  const wrapperRef = useRef(null);
  const cookieRef = useRef(null);
  const tiltWrapperRef = useRef(null);

  // 1. GSAP ScrollTrigger timeline (S-Curve & Spin)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cookie = cookieRef.current;
    const trigger = triggerRef.current;

    if (!wrapper || !cookie || !trigger) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // increased scrub for silkier scroll response
          invalidateOnRefresh: true,
        },
      });

      // Animate vertical translation (Y) linearly
      tl.to(wrapper, {
        y: '100vh',
        ease: 'none',
      }, 0);

      // Animate horizontal sweep (X) to create S-Curve path
      tl.to(wrapper, {
        x: '18vw', // sway right in Hero scroll
        ease: 'sine.inOut',
        duration: 0.5,
      }, 0);

      tl.to(wrapper, {
        x: '-12vw', // sway left entering transition zone
        ease: 'sine.inOut',
        duration: 0.3,
      }, 0.5);

      tl.to(wrapper, {
        x: '0vw', // return to center to land in Ingredients
        ease: 'sine.inOut',
        duration: 0.2,
      }, 0.8);

      // Animate the cookie rotation matching the roll movement
      tl.to(cookie, {
        rotation: 720,
        ease: 'none',
      }, 0);
    });

    return () => {
      ctx.revert();
    };
  }, [triggerRef]);

  // 2. Interactive Cursor 3D Tilt
  useEffect(() => {
    const tiltWrapper = tiltWrapperRef.current;
    if (!tiltWrapper) return;

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
      className="absolute left-1/2 z-30 flex flex-col items-center justify-center pointer-events-none transform -translate-x-1/2"
      style={{
        top: '50vh',
        marginTop: '-140px', // Adjusted to match the new 300px height for perfect centering
      }}
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
            src="hero_cookie.png"
            alt="Artisanal Chocolate Chip Cookie"
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-contain cursor-grab active:cursor-grabbing pointer-events-auto select-none"
            style={{
              filter: 'drop-shadow(0px 12px 24px rgba(44, 26, 17, 0.15))',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [-10, 10, -10], // Slightly reduced float travel for tighter visual control
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.02 }}
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
