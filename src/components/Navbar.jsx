import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall, MessageCircle, FileSpreadsheet } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { siteMetadata } from '../data/siteContent';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#gallery' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { contacts } = siteMetadata;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      const topBarHeight = 35; // approximate TopBar height
      const navHeight = scrolled ? 70 : 80;
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
    <header
      className={`fixed top-0 sm:top-9 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md shadow-xl shadow-ind-navy/10 border-b border-slate-200 py-3'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-200/70 py-4'
      }`}
    >
      <div className="ind-container grid grid-cols-12 items-center gap-3">
        
        {/* Brand Logo (Original transparent logo styled dynamically in the UI) */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="col-span-8 sm:col-span-6 lg:col-span-3 flex min-w-0 items-center gap-3 group"
        >
          {!logoError ? (
            <img 
              src={logoImg} 
              onError={() => setLogoError(true)}
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300 filter brightness-[0.96] contrast-[1.06] drop-shadow-[0_1px_2px_rgba(0,0,0,0.14)] group-hover:brightness-110 group-hover:drop-shadow-[0_0_14px_rgba(249,115,22,0.28)]"
              alt={siteMetadata.companyName}
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-display text-base md:text-lg font-black tracking-wider uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400">
                SRI SAI
              </span>
              <span className="font-display text-[10px] md:text-xs font-black text-blue-600 tracking-widest uppercase leading-none mt-1">
                INSULATIONS
              </span>
            </div>
          )}
        </a>



        {/* Desktop Links */}
        <nav className="hidden lg:flex col-span-6 items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-[11px] font-display font-extrabold tracking-[0.16em] text-ind-navy/85 hover:text-ind-orange transition relative py-2 group uppercase"
            >
              {item.label}
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-ind-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex col-span-3 items-center justify-end gap-2">
          <a
            href={`tel:${contacts.phoneClean1}`}
            className="ind-btn-outline px-4 py-2.5 text-[10px] rounded-lg"
            aria-label={`Call now ${contacts.phone1}`}
          >
            <PhoneCall size={14} className="text-ind-orange" />
            Call Now
          </a>
          <a
            href={contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ind-btn-base px-4 py-2.5 text-[10px] rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            aria-label="WhatsApp enquiry"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="ind-btn-primary px-4 py-2.5 text-[10px] rounded-lg"
          >
            <FileSpreadsheet size={14} />
            Get Quote
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="col-span-4 sm:col-span-6 lg:hidden justify-self-end p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-ind-navy hover:text-ind-orange transition"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="ind-container py-5 flex flex-col gap-4 font-display text-xs font-bold">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-ind-navy hover:text-ind-orange py-2 border-b border-slate-100 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="mt-1 grid grid-cols-1 gap-2">
                <a
                  href={`tel:${contacts.phoneClean1}`}
                  className="ind-btn-outline py-3 rounded-lg text-center flex items-center justify-center gap-2"
                >
                  <PhoneCall size={14} className="text-ind-orange" />
                  Call Now
                </a>
                <a
                  href={contacts.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ind-btn-base py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  WhatsApp Enquiry
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="ind-btn-primary py-3 rounded-lg text-center flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet size={14} />
                  Get Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
