import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { siteMetadata } from '../data/siteContent';

export default function TopBar() {
  const { contacts } = siteMetadata;

  return (
    <div className="bg-ind-navy text-slate-300 text-[11px] font-mono py-2 border-b border-white/10 hidden sm:block relative z-40">
      <div className="ind-container flex items-center justify-between">
        
        {/* Contact Links Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-ind-orange" />
            <span>Chennai, TN</span>
          </div>

          <a href={`mailto:${contacts.email}`} className="flex items-center gap-1.5 hover:text-white transition">
            <Mail size={12} className="text-ind-orange" />
            <span>{contacts.email}</span>
          </a>

          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-ind-orange" />
            <span>{contacts.phone1} / {contacts.phone2}</span>
          </div>
        </div>

        {/* WhatsApp Chat link */}
        <div className="flex items-center gap-4">
          <span>Mon - Sat: 9:00 AM - 6:30 PM</span>
          <a
            href={contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold px-2 py-0.5 rounded transition text-[10px]"
          >
            <MessageCircle size={10} className="fill-current" />
            <span>WHATSAPP CHAT</span>
          </a>
        </div>

      </div>
    </div>
  );
}
