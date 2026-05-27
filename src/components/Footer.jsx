import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { siteMetadata } from '../data/siteContent';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const { contacts } = siteMetadata;

  const scrollToSection = (e, id) => {
    e.preventDefault();
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
    <footer className="bg-ind-navy text-slate-300 border-t border-white/10 pt-16 pb-8 relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-ind-orange/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] ind-bg-grid pointer-events-none" />

      <div className="ind-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* About Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center">
            <img 
              src={logoImg} 
              className="h-10 md:h-12 w-auto object-contain filter brightness-[1.15] contrast-[1.05] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]"
              alt={siteMetadata.companyName}
            />
          </div>

          <p className="text-sm leading-relaxed text-slate-300/85 max-w-sm">
            We are hot, cold, and acoustic insulation specialists contracting since 2009. We believe in technically correct performance, solid craftsmanship, and aesthetically perfect finishing.
          </p>

          <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-300 border border-emerald-500/15 bg-emerald-500/5 py-1 px-3 rounded w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CONTRACTOR STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-3 font-mono text-[10px] uppercase">
          <h4 className="text-white font-bold tracking-wider">NAVIGATION</h4>
          <ul className="space-y-2 text-slate-300/80">
            <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-ind-orange transition">HOME BASE</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-ind-orange transition">ABOUT US</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">SERVICES</a></li>
            <li><a href="#products" onClick={(e) => scrollToSection(e, '#products')} className="hover:text-ind-orange transition">PRODUCTS</a></li>
            <li><a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="hover:text-ind-orange transition">GALLERY</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-ind-orange transition">RFQ PORTAL</a></li>
          </ul>
        </div>

        {/* Services / Products index */}
        <div className="lg:col-span-3 space-y-3 font-mono text-[10px] uppercase">
          <h4 className="text-white font-bold tracking-wider">CAPABILITIES</h4>
          <ul className="space-y-2 text-slate-300/80">
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">HOT INSULATION LAGGING</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">COLD DUCTING LAGGING</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">ACOUSTIC BAFFLES & FOAMS</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">ALU & GI CLADDING</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-ind-orange transition">TURNKEY ERECTION CONTRACTS</a></li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="lg:col-span-3 space-y-3 font-mono text-[10px] uppercase">
          <h4 className="text-white font-bold tracking-wider">OFFICE NODE</h4>
          <ul className="space-y-2 text-slate-300/80 font-sans">
            <li className="flex items-start gap-2 text-[11px] normal-case leading-relaxed">
              <MapPin size={12} className="text-ind-orange shrink-0 mt-0.5" />
              <span>{contacts.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={12} className="text-ind-orange" />
              <a className="font-mono text-[10px] hover:text-white transition" href={`tel:${contacts.phoneClean1}`}>
                {contacts.phone1}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={12} className="text-ind-orange" />
              <a className="font-mono text-[10px] lowercase hover:text-white transition" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={12} className="text-ind-orange" />
              <span className="font-mono text-[10px] lowercase">{contacts.website}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright row */}
      <div className="ind-container border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-slate-400/80 relative z-10">
        <div>
          © {new Date().getFullYear()} SRI SAI INSULATIONS. ALL RIGHTS RESERVED.
        </div>

        {/* Social link */}
        <div className="flex items-center gap-3">
          <a
            href={contacts.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-505 hover:text-white transition flex items-center justify-center"
            aria-label="Facebook"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
        </div>
      </div>

    </footer>
  );
}
