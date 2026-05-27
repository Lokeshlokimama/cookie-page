import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { servicesData } from '../data/services';

export default function Services({ onSelectService }) {

  const renderIcon = (iconName) => {
    const IconComp = Icons[iconName] || Icons.Cpu;
    return <IconComp size={22} className="text-ind-orange" />;
  };

  const handleEnquire = (serviceId) => {
    onSelectService(serviceId);
    
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
    <section id="services" className="ind-section ind-surface relative border-y border-slate-200/60">
      <div className="ind-container relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            CONTRACTING CAPABILITIES
          </div>
          <h2 className="ind-h2 ind-section-title-center">
            Our Core Services
          </h2>
          <p className="ind-lead">
            Industrial thermal preservation and mechanical cladding execution, engineered to reduce carbon footprints, retain heat, and ensure environmental health safety.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => (
            <motion.article
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              className="ind-card p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Accent */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-ind-orange/20 group-hover:bg-ind-orange transition-colors" />

              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange shrink-0 ring-1 ring-ind-orange/10 group-hover:ring-ind-orange/20 transition">
                    {renderIcon(service.icon)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm md:text-base font-black text-ind-navy uppercase tracking-wider">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 font-mono text-[10px] text-slate-600">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-ind-orange rounded-full" />
                      <span>{feat.toUpperCase()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleEnquire(service.id)}
                className="mt-6 w-full ind-btn-dark py-3 rounded-lg"
              >
                Enquire Now
              </button>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
