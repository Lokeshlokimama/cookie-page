import { useRef, useEffect } from 'react';
import { useCart } from './CartContext';

export default function CTA() {
  const { setView } = useCart();
  const videoRef = useRef(null);

  // Force browser autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log('Autoplay blocked:', err));
    }
  }, []);

  const handleOrderNow = (e) => {
    e.preventDefault();
    const target = document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-[#2C1A11] overflow-hidden text-center flex flex-col justify-center items-center">
      {/* Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src="Chef_piping_frosting_on_cupcake_202606011419.mp4"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className="opacity-[0.40]"
          loop
          playsInline
          preload="auto"
        />
        {/* Dark vignette overlay to make text stand out */}
        <div className="absolute inset-0 bg-[#2C1A11]/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-center select-none">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-2 block">
          Taste the Craft
        </span>
        
        <h2 className="font-serif text-3xl md:text-5xl font-black text-[#FAF6F0] tracking-wide uppercase leading-tight">
          Ready to Indulge?
        </h2>
        
        <p className="text-xs md:text-sm text-[#FAF6F0]/80 leading-relaxed max-w-lg mx-auto">
          Every order is baked at dawn, packed in our signature air-tight gold tins, and shipped express. Treat yourself or send a luxury gift box to someone special.
        </p>

        <div className="pt-6 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleOrderNow}
            className="rounded-full bg-[#C5A880] text-[#2C1A11] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition duration-300 active:scale-95 shadow-lg cursor-pointer"
          >
            Order Fresh Now
          </button>
          
          <button
            onClick={() => setView('cart')}
            className="rounded-full border border-white/20 bg-white/5 backdrop-blur-xs text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#2C1A11] transition duration-300 active:scale-95 cursor-pointer"
          >
            View Shopping Box
          </button>
        </div>
      </div>
    </section>
  );
}
