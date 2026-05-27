import { Phone, MessageCircle, FileSpreadsheet } from 'lucide-react';
import { siteMetadata } from '../data/siteContent';

export default function CTA() {
  const { contacts } = siteMetadata;

  const scrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
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
    <section className="py-16 text-white relative overflow-hidden bg-gradient-to-r from-ind-orange via-ind-orange to-[#ff8a34]">
      
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.10] ind-bg-grid pointer-events-none" />

      <div className="ind-container relative z-10 text-center space-y-6">
        
        <h2 className="text-xl sm:text-3xl font-display font-black tracking-wider uppercase">
          Need Industrial Insulation Support?
        </h2>
        
        <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed font-sans">
          Contact Sri Sai Insulations today to schedule a site inspection, get material pricing slabs, or align turnkey contracting support for your facility.
        </p>

        {/* Dynamic Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          
          {/* Call button */}
          <a
            href={`tel:${contacts.phoneClean1}`}
            className="ind-btn-outline bg-white hover:bg-slate-50 border-transparent text-ind-navy shadow-lg shadow-black/10"
          >
            <Phone size={12} className="fill-current text-ind-orange" />
            Call: {contacts.phone1}
          </a>

          {/* WhatsApp */}
          <a
            href={contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ind-btn-base bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-black/10"
          >
            <MessageCircle size={12} className="fill-current" />
            WhatsApp Inquiry
          </a>

          {/* Request Quote */}
          <a
            href="#contact"
            onClick={scrollToContact}
            className="ind-btn-base bg-ind-navy hover:bg-[#071827] text-white border border-white/15 hover:border-transparent shadow-lg shadow-black/10"
          >
            <FileSpreadsheet size={12} />
            Request Quote Form
          </a>

        </div>

      </div>
    </section>
  );
}
