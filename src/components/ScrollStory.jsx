import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const revealOffsets = {
  up: { x: 0, y: 44 },
  down: { x: 0, y: -32 },
  left: { x: -42, y: 0 },
  right: { x: 42, y: 0 },
};

export default function ScrollStory() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const ctx = gsap.context(() => {
      if (reduceMotion.matches) {
        gsap.set('[data-reveal], [data-stagger] > *', {
          autoAlpha: 1,
          clearProps: 'transform,filter',
        });
        return;
      }

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        const direction = element.getAttribute('data-reveal') || 'up';
        const offset = revealOffsets[direction] || revealOffsets.up;

        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x: offset.x,
            y: offset.y,
            scale: 0.985,
            filter: 'blur(8px)',
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        const children = gsap.utils.toArray(group.children);
        if (!children.length) return;

        gsap.fromTo(
          children,
          {
            autoAlpha: 0,
            y: 34,
            scale: 0.975,
            filter: 'blur(7px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.055,
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray('[data-parallax-video]').forEach((element) => {
        const amount = Number(element.getAttribute('data-parallax-video') || 8);
        const section = element.closest('section') || element.parentElement;

        gsap.to(element, {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 600);

    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
