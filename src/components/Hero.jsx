import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Flame, Snowflake, Award, PhoneCall, MessageCircle, FileSpreadsheet } from 'lucide-react';
import { siteMetadata } from '../data/siteContent';

// Import downloaded images for slideshow and marquees
import slider1 from '../assets/images/slider1.jpg';
import slider2 from '../assets/images/slider2.jpg';
import slider3 from '../assets/images/slider3.jpg';
import img1 from '../assets/images/image1.jpg';
import img2 from '../assets/images/image2.jpg';
import img3 from '../assets/images/image3.jpg';

const SLIDES = [slider1, slider2, slider3];

const BADGES = [
  { text: "Hot & Cold Insulation", icon: Flame },
  { text: "Acoustic Insulation", icon: ShieldCheck },
  { text: "Industrial Contractors", icon: Award },
  { text: "Turnkey Project Support", icon: Snowflake }
];

// Left vertical marquee images (UP scrolling)
const SCROLL_IMAGES_LEFT = [slider1, img1, img2, slider1, img1, img2];
// Right vertical marquee images (DOWN scrolling)
const SCROLL_IMAGES_RIGHT = [img3, slider2, slider3, img3, slider2, slider3];
// Mobile horizontal scrolling images
const SCROLL_IMAGES_HORIZONTAL = [slider1, img1, img2, img3, slider2, slider3, slider1, img1, img2, img3, slider2, slider3];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { contacts } = siteMetadata;
  const stats = useMemo(() => siteMetadata.stats || [], []);

  // Auto cycle slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const target = document.querySelector(id);
    if (target) {
      const topBarHeight = 35;
      const navHeight = 70;
      const offset = topBarHeight + navHeight;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen lg:min-h-[92vh] flex items-center justify-center pt-28 pb-28 overflow-hidden bg-ind-navy"
    >
      {/* Background Slideshow (Now brighter with higher opacity and CSS filter) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.72, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-110 contrast-[1.02]"
            style={{ backgroundImage: `url(${SLIDES[activeSlide]})` }}
          />
        </AnimatePresence>
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071827]/92 via-ind-navy/65 to-ind-charcoal/90 z-0" />
        <div className="absolute inset-0 opacity-[0.10] ind-bg-grid" />
      </div>

      <div className="ind-container w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left bg-white/[0.08] backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-black/25">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-ind-orange/35 bg-ind-orange/10 px-3 py-1.5 rounded-full text-ind-orange font-mono text-[10px] tracking-widest uppercase"
          >
            <Award size={12} />
            ESTABLISHED IN 2009 • INDUSTRIAL INSULATION CONTRACTOR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            Reliable Industrial <br />
            <span className="text-ind-orange drop-shadow-[0_2px_15px_rgba(249,115,22,0.2)]">Insulation Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed font-sans"
          >
            {siteMetadata.subheadline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="ind-btn-primary rounded-lg"
            >
              <FileSpreadsheet size={14} />
              Get Quote
            </a>

            <a
              href={`tel:${contacts.phoneClean1}`}
              className="ind-btn-outline rounded-lg bg-white/0 border-white/25 text-white hover:bg-white/5 hover:border-white/40"
              aria-label={`Call now ${contacts.phone1}`}
            >
              <PhoneCall size={14} className="text-ind-orange" />
              Call Now
            </a>

            <a
              href={contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ind-btn-base rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageCircle size={14} />
              WhatsApp Enquiry
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('#services')}
              className="ind-btn-base rounded-lg bg-white/0 border border-white/20 text-white hover:bg-white/5 hover:border-white/35"
            >
              View Services
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-3xl mx-auto lg:mx-0"
          >
            {BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-left justify-center lg:justify-start">
                  <div className="p-1.5 rounded-lg bg-ind-orange/15 text-ind-orange ring-1 ring-ind-orange/15">
                    <Icon size={14} />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-200 leading-tight">
                    {badge.text.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Right Side - Scrolling Images Showcase (New dual vertical scrolling track) */}
        <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 h-[550px] overflow-hidden relative rounded-3xl p-2 border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/20">
          {/* Vertical fading gradients to smooth out start and end points */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-ind-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-ind-navy to-transparent z-10 pointer-events-none" />

          {/* Column A (Scrolls UP) */}
          <div className="flex flex-col gap-4 animate-marquee-up py-4">
            {SCROLL_IMAGES_LEFT.map((src, index) => (
              <div 
                key={`left-${index}`} 
                className="relative rounded-2xl overflow-hidden h-[180px] border border-white/10 group shadow-lg shrink-0 cursor-pointer"
                onClick={() => scrollToSection('#gallery')}
              >
                <img 
                  src={src} 
                  alt="Project photo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 text-left">
                  <span className="text-[9px] font-mono text-ind-orange font-bold uppercase tracking-wider">PROJECT PHOTO</span>
                  <span className="text-[11px] font-display font-bold text-white uppercase tracking-wide">VIEW PORTFOLIO</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column B (Scrolls DOWN) */}
          <div className="flex flex-col gap-4 animate-marquee-down py-4">
            {SCROLL_IMAGES_RIGHT.map((src, index) => (
              <div 
                key={`right-${index}`} 
                className="relative rounded-2xl overflow-hidden h-[180px] border border-white/10 group shadow-lg shrink-0 cursor-pointer"
                onClick={() => scrollToSection('#gallery')}
              >
                <img 
                  src={src} 
                  alt="Project photo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 text-left">
                  <span className="text-[9px] font-mono text-ind-orange font-bold uppercase tracking-wider">CONTRACTING WORK</span>
                  <span className="text-[11px] font-display font-bold text-white uppercase tracking-wide">VIEW DETAILS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Stats strip */}
      {stats.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="ind-container pb-8">
            <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-0 sm:grid-cols-4">
                {stats.slice(0, 4).map((s) => (
                  <div
                    key={s.label}
                    className="px-5 py-4 border-white/10 [&:not(:nth-child(1)):not(:nth-child(2))]:border-t sm:[&:not(:nth-child(1))]:border-l sm:[&:not(:nth-child(1))]:border-t-0"
                  >
                    <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/65">
                      {s.label}
                    </p>
                    <p className="mt-1 font-display text-xl sm:text-2xl font-black tracking-tight text-white">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Horizontal Scrolling Images ticker (Only visible on screens < 1024px) */}
      <div className="absolute bottom-20 inset-x-0 lg:hidden overflow-hidden py-3 bg-black/20 border-y border-white/10 backdrop-blur-sm z-10">
        <div className="flex gap-4 animate-marquee-horizontal w-max">
          {SCROLL_IMAGES_HORIZONTAL.map((src, index) => (
            <div 
              key={`mob-${index}`} 
              className="w-[160px] h-[100px] shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-md cursor-pointer"
              onClick={() => scrollToSection('#gallery')}
            >
              <img 
                src={src} 
                alt="Project photo"
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <button
        type="button"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] font-mono tracking-widest text-slate-300 uppercase group-hover:text-ind-orange transition-colors">
          Scroll Down
        </span>
        <div className="w-[22px] h-[36px] rounded-full border border-white/25 flex justify-center p-1 group-hover:border-ind-orange transition-colors">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-ind-orange"
          />
        </div>
      </button>

    </section>
  );
}
