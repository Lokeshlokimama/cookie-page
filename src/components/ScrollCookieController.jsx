import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const desktopQuery = '(min-width: 768px)';
const reduceQuery = '(prefers-reduced-motion: reduce)';

export default function ScrollCookieController({ triggerRef }) {
  const wrapperRef = useRef(null);
  const cookieRef = useRef(null);
  const tiltWrapperRef = useRef(null);
  const shadowRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cookie = cookieRef.current;
    const shadow = shadowRef.current;
    const trigger = triggerRef.current;

    if (!wrapper || !cookie || !shadow || !trigger) return;

    const reduceMotion = window.matchMedia(reduceQuery);
    const desktop = window.matchMedia(desktopQuery);
    let ctx;
    let resizeTimer;

    const sizeForViewport = () => (desktop.matches ? 260 : 180);

    const getHeroPoint = () => {
      const heroPlaceholder = document.getElementById('hero-muffin-placeholder');
      if (!heroPlaceholder) return null;

      const containerRect = trigger.getBoundingClientRect();
      const heroRect = heroPlaceholder.getBoundingClientRect();
      const size = sizeForViewport();

      return {
        size,
        x: heroRect.left - containerRect.left + heroRect.width / 2 - size / 2,
        y: heroRect.top - containerRect.top + heroRect.height / 2 - size / 2,
      };
    };

    const placeStaticCookie = () => {
      const point = getHeroPoint();
      if (!point) return;

      gsap.set(wrapper, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: point.size,
        height: point.size,
        x: point.x,
        y: point.y,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        rotationZ: 0,
        autoAlpha: 1,
      });
      gsap.set(cookie, { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(shadow, { autoAlpha: 1, scaleX: 1, scaleY: 1, y: 0 });
      setIsReady(true);
    };

    const build = () => {
      ctx?.revert();

      const size = sizeForViewport();
      const isReduced = reduceMotion.matches;

      ctx = gsap.context(() => {
        if (!desktop.matches || isReduced) {
          placeStaticCookie();
          return;
        }

        gsap.set(wrapper, {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: size,
          height: size,
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          rotationZ: 0,
          autoAlpha: 1,
          willChange: 'transform, opacity',
        });

        gsap.set(cookie, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          transformPerspective: 1000,
          transformOrigin: '50% 50%',
          willChange: 'transform',
        });

        gsap.set(shadow, {
          autoAlpha: 0.58,
          scaleX: 1,
          scaleY: 1,
          y: 0,
          willChange: 'transform, opacity',
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: 'bottom center',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        tl
          .to(wrapper, {
            x: -104,
            y: 72,
            scale: 0.96,
            rotationZ: -5,
            duration: 0.26,
            ease: 'sine.inOut',
          })
          .to(
            cookie,
            {
              rotateY: -24,
              rotateX: 5,
              rotateZ: 8,
              duration: 0.26,
              ease: 'sine.inOut',
            },
            0,
          )
          .to(
            shadow,
            {
              scaleX: 0.9,
              scaleY: 0.78,
              autoAlpha: 0.46,
              y: 10,
              duration: 0.26,
              ease: 'sine.inOut',
            },
            0,
          )
          .to(wrapper, {
            x: 96,
            y: 150,
            scale: 0.82,
            rotationZ: 6,
            duration: 0.38,
            ease: 'power1.inOut',
          })
          .to(
            cookie,
            {
              rotateY: 38,
              rotateX: -4,
              rotateZ: -10,
              duration: 0.38,
              ease: 'power1.inOut',
            },
            0.26,
          )
          .to(
            shadow,
            {
              scaleX: 0.76,
              scaleY: 0.62,
              autoAlpha: 0.34,
              y: 18,
              duration: 0.38,
              ease: 'power1.inOut',
            },
            0.26,
          )
          .to(wrapper, {
            x: 0,
            y: 128,
            scale: 0.74,
            rotationZ: 0,
            autoAlpha: 0.9,
            duration: 0.2,
            ease: 'power2.out',
          })
          .to(
            cookie,
            {
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
              duration: 0.2,
              ease: 'power2.out',
            },
            0.64,
          )
          .to(
            shadow,
            {
              scaleX: 0.64,
              scaleY: 0.5,
              autoAlpha: 0.26,
              y: 22,
              duration: 0.2,
              ease: 'power2.out',
            },
            0.64,
          )
          .to(wrapper, {
            autoAlpha: 0,
            scale: 0.58,
            y: 70,
            duration: 0.12,
            ease: 'power1.in',
          });

        setIsReady(true);
      });

      ScrollTrigger.refresh();
    };

    const scheduleBuild = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    };

    const initialTimer = window.setTimeout(build, 180);
    window.addEventListener('resize', scheduleBuild);
    window.addEventListener('load', scheduleBuild);
    reduceMotion.addEventListener('change', scheduleBuild);
    desktop.addEventListener('change', scheduleBuild);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', scheduleBuild);
      window.removeEventListener('load', scheduleBuild);
      reduceMotion.removeEventListener('change', scheduleBuild);
      desktop.removeEventListener('change', scheduleBuild);
      ctx?.revert();
    };
  }, [triggerRef]);

  useEffect(() => {
    const tiltWrapper = tiltWrapperRef.current;
    if (!tiltWrapper || window.innerWidth < 768) return;

    const rotateX = gsap.quickTo(tiltWrapper, 'rotationX', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const rotateY = gsap.quickTo(tiltWrapper, 'rotationY', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const handleMouseMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = (event.clientX - centerX) / centerX;
      const mouseY = (event.clientY - centerY) / centerY;

      rotateX(-mouseY * 8);
      rotateY(mouseX * 8);
    };

    const resetTilt = () => {
      rotateX(0);
      rotateY(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', resetTilt);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', resetTilt);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`absolute z-30 flex flex-col items-center justify-center pointer-events-none ${
        isReady ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      aria-hidden="true"
    >
      <div
        ref={cookieRef}
        className="relative flex items-center justify-center preserve-3d"
        style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
      >
        <div
          ref={tiltWrapperRef}
          className="relative flex items-center justify-center preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src="hero_cookie.png"
            alt=""
            className="w-[180px] h-[180px] md:w-[260px] md:h-[260px] object-contain blend-multiply cursor-grab active:cursor-grabbing pointer-events-auto select-none"
            style={{
              filter: 'drop-shadow(0px 18px 34px rgba(44, 26, 17, 0.22))',
              transformStyle: 'preserve-3d',
            }}
            animate={{ y: [-9, 9, -9] }}
            transition={{
              repeat: Infinity,
              duration: 5.4,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.025 }}
          />
        </div>
      </div>

      <motion.div
        ref={shadowRef}
        className="w-[130px] h-[10px] md:w-[210px] md:h-[14px] bg-[#2C1A11]/16 rounded-full blur-md mt-4"
        animate={{
          scale: [0.9, 1.04, 0.9],
          opacity: [0.34, 0.58, 0.34],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.4,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
