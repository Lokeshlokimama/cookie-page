// Import downloaded client logos
import client1 from '../assets/images/clients/1.jpg';
import client2 from '../assets/images/clients/2.jpg';
import client3 from '../assets/images/clients/3.jpg';
import client4 from '../assets/images/clients/4.jpg';
import client5 from '../assets/images/clients/5.jpg';
import client6 from '../assets/images/clients/6.jpg';
import client7 from '../assets/images/clients/7.jpg';
import client8 from '../assets/images/clients/8.jpg';
import client9 from '../assets/images/clients/9.jpg';
import client10 from '../assets/images/clients/10.jpg';
import client11 from '../assets/images/clients/11.jpg';
import client12 from '../assets/images/clients/12.jpg';

const CLIENTS_LIST = [
  client1, client2, client3, client4, client5, client6,
  client7, client8, client9, client10, client11, client12
];

export default function Clients() {
  return (
    <section id="clients" className="py-16 bg-white relative overflow-hidden border-b border-slate-200/60">
      
      <div className="ind-container mb-8 text-center">
        <h3 className="font-display text-xs md:text-sm font-bold text-ind-navy uppercase tracking-widest">
          Trusted by Industrial Leaders
        </h3>
        <p className="text-[10px] sm:text-xs text-slate-450 mt-1 font-mono uppercase">
          PROVIDING THERMAL INSULATION ACROSS CHENNAI AND TAMIL NADU SINCE 2009
        </p>
      </div>

      {/* Infinite scrolling marquee using CSS animations */}
      <div className="relative flex overflow-x-hidden bg-slate-50 border-y border-slate-100 py-6">
        
        {/* First track */}
        <div className="animate-marquee-left flex gap-12 shrink-0 items-center justify-around min-w-full">
          {CLIENTS_LIST.map((img, idx) => (
            <div key={`c1-${idx}`} className="w-24 h-12 flex items-center justify-center filter grayscale hover:grayscale-0 transition duration-300">
              <img 
                src={img} 
                className="max-w-full max-h-full object-contain"
                alt={`Client Logo ${idx + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Second identical track for seamless loop */}
        <div className="absolute top-6 left-0 animate-marquee-left-duplicate flex gap-12 shrink-0 items-center justify-around min-w-full" aria-hidden="true">
          {CLIENTS_LIST.map((img, idx) => (
            <div key={`c2-${idx}`} className="w-24 h-12 flex items-center justify-center filter grayscale hover:grayscale-0 transition duration-300">
              <img 
                src={img} 
                className="max-w-full max-h-full object-contain"
                alt={`Client Logo ${idx + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Adding marquee styles directly */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-left-duplicate {
          animation: marquee-left 35s linear infinite;
          animation-delay: -17.5s;
        }
      `}</style>

    </section>
  );
}
