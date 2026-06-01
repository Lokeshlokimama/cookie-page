import { useCart } from './CartContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { setView } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Little Bakes Journal! Check your inbox for sweet updates.');
    e.target.reset();
  };

  return (
    <footer className="relative bg-[#2C1A11] text-[#FAF6F0] overflow-hidden pt-20 pb-10">
      {/* Absolute graphic background separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Story */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Little Bakes Logo" 
                className="h-12 md:h-14 w-auto object-contain" 
              />
              <span className="font-serif text-xl font-bold tracking-[0.15em] text-[#FAF6F0]">
                LITTLE <span className="text-[#C5A880] font-light">BAKES</span>
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Crafting sensory baking experiences in micro-batches. Hand-rolled, slow-churned in French butter, freshly baked at dawn, and delivered directly to your door in gold-sealed preservation tins.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Pinterest', 'Vimeo'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] hover:text-[#FAF6F0] transition duration-300"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Our Kitchens & Hours */}
          <div className="space-y-5">
            <h4 className="font-serif text-sm font-semibold text-[#C5A880] tracking-wider uppercase">Our Kitchen &amp; Hours</h4>
            <div className="space-y-3 text-xs text-white/60 leading-relaxed">
              <p>
                <strong className="text-[#FAF6F0] block">Artisanal Bakery Facility</strong>
                Unit 4, Somerset Artisan Court, Bath, UK.
              </p>
              <p>
                <strong className="text-[#FAF6F0] block">Baking Schedule</strong>
                Ovens active daily from <span className="text-[#C5A880]">4:00 AM &mdash; 12:00 PM</span> to guarantee peak freshness.
              </p>
              <p>
                <strong className="text-[#FAF6F0] block">Shipping Cutoff</strong>
                Orders placed before <span className="text-[#C5A880]">2:00 PM GMT</span> are shipped same-day via premium express cargo.
              </p>
            </div>
          </div>

          {/* Column 3: Sustainability (Tin Recycling Program) */}
          <div className="space-y-5">
            <h4 className="font-serif text-sm font-semibold text-[#C5A880] tracking-wider uppercase">Tin Recycling Program</h4>
            <div className="space-y-3 text-xs text-white/60 leading-relaxed">
              <p>
                Our signature gold preservation tins are built to last. Participate in our zero-waste initiative to keep baking sustainable.
              </p>
              <p>
                <strong className="text-[#FAF6F0] block">The Return Reward</strong>
                Collect and return <span className="text-[#C5A880] font-bold">5 empty gold tins</span> to our Bath kitchen, and receive a complimentary signature box of 6 warm cookies of your choice.
              </p>
              <p>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] hover:text-[#FAF6F0] transition duration-300">
                  Request Return Label &rarr;
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter Journal */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-[#C5A880] tracking-wider uppercase">The Journal</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Subscribe to receive updates on limited-edition flavor drops, secret recipes, and private sales.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A880] transition"
              />
              <button
                type="submit"
                className="rounded-full bg-[#C5A880] text-[#2C1A11] px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition duration-300 active:scale-95 cursor-pointer"
              >
                Join the Journal
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Credentials */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-10 text-[10px] text-white/30 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} Little Bakes Ltd. Crafted with precision, baked with soul. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setView('landing');
              }}
              className="hover:text-white transition cursor-pointer"
            >
              Bakery Home
            </a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Shipping &amp; Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
