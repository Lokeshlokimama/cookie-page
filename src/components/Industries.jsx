import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { siteMetadata } from '../data/siteContent';

export default function Industries() {
  const { industries } = siteMetadata;

  const renderIcon = (iconName) => {
    const IconComp = Icons[iconName] || Icons.Factory;
    return <IconComp size={18} className="text-ind-orange" />;
  };

  return (
    <section className="py-20 bg-ind-white ind-surface relative border-b border-slate-200/60">
      <div className="ind-container relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            SECTOR EXPERIENCE
          </div>
          <h2 className="ind-h2 ind-section-title-center">
            Industries We Serve
          </h2>
          <p className="ind-lead">
            Our teams are trained to execute under strict process safety metrics across heavy chemical, thermodynamic power, and commercial installations.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {industries.map((ind, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              key={idx}
              className="ind-card p-4 flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-ind-orange/10 text-ind-orange shrink-0 group-hover:scale-105 transition duration-300 ring-1 ring-ind-orange/10">
                {renderIcon(ind.icon)}
              </div>
              <span className="font-display text-[11px] md:text-xs font-bold text-ind-navy uppercase tracking-wider leading-snug">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
