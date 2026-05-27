import { motion } from 'framer-motion';
import { productsData, additionalCapabilities } from '../data/products';
import { ChevronRight } from 'lucide-react';

export default function Products({ onSelectProduct }) {

  const handleEnquire = (productName) => {
    onSelectProduct(productName);
    
    // Smooth scroll to contact
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
    <section id="products" className="ind-section bg-white relative">
      <div className="ind-container relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            MATERIAL SUPPLY
          </div>
          <h2 className="ind-h2 ind-section-title-center">
            Industrial Materials
          </h2>
          <p className="ind-lead">
            We supply high-temperature resistance hot insulation materials complying with IS and international quality thresholds.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {productsData.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={item.id}
              className="ind-card overflow-hidden flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center h-48">
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent via-transparent to-ind-navy/5" />
                <img 
                  src={item.image} 
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  alt={item.name}
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-ind-navy text-[8px] font-mono text-white rounded-full tracking-wide uppercase shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Product info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-ind-navy tracking-wide uppercase mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-sans mb-4">
                    {item.description}
                  </p>

                  {/* Specs */}
                  <div className="space-y-1 font-mono text-[9px] text-slate-400 bg-slate-50 p-2.5 rounded border border-slate-100 mb-5">
                    {item.specs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-center gap-1.5 uppercase">
                        <span className="w-1 h-1 bg-ind-orange rounded-full" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleEnquire(item.name)}
                  className="w-full ind-btn-primary py-3 rounded-lg flex items-center justify-center gap-1"
                >
                  Enquire Now
                  <ChevronRight size={10} />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Additional Capabilities panel */}
        <div className="ind-surface-dark text-slate-300 p-8 rounded-3xl border border-slate-800/70 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-ind-orange/10 rounded-full blur-3xl pointer-events-none" />
          
          <h4 className="font-display text-base font-extrabold text-white tracking-widest mb-6 uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-ind-orange animate-pulse" />
            Additional Material Capabilities
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {additionalCapabilities.map((item, idx) => (
              <div key={idx} className="bg-black/20 p-4 rounded-2xl border border-slate-800/50 space-y-1.5 hover:border-ind-orange/25 transition-colors">
                <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">{item.name}</h5>
                <p className="text-[11px] leading-relaxed text-slate-450">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
