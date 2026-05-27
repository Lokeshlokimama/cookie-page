import { motion } from 'framer-motion';
import { ShieldCheck, HardHat, Calendar, Award, CheckCircle, Percent, Ruler, PenTool } from 'lucide-react';

const REASONS = [
  { title: "Experienced Insulation Team", desc: "Executing complex thermal lagging services across South India since 2009.", icon: Award },
  { title: "Quality Workmanship", desc: "Aesthetically perfect metal cladding finishes matched with structurally sealed insulation.", icon: PenTool },
  { title: "Industrial-Grade Materials", desc: "Procuring only tested LRB blankets, resin slabs, and non-combustible accessory ancillaries.", icon: ShieldCheck },
  { title: "On-Time Completion", desc: "Rigorous planning and timeline charts to execute projects within your scheduled shutdowns.", icon: Calendar },
  { title: "Safety-Focused Execution", desc: "Strict on-site safety protocols (PPE, height clearance, hazard scans) for worry-free delivery.", icon: HardHat },
  { title: "Competitive Pricing", desc: "Direct manufacturer relationships allow us to quote cost-effective material supply rates.", icon: Percent },
  { title: "Site Inspection Support", desc: "Professional engineers deploy to audit, inspect, and draft material specifications.", icon: Ruler },
  { title: "Maintenance Support", desc: "Annual Maintenance Contracts (AMC) to check, repair, and replace damaged insulation cladding.", icon: CheckCircle }
];

export default function WhyChooseUs() {
  return (
    <section className="ind-section ind-surface-dark text-white relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-ind-orange/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] ind-bg-grid pointer-events-none" />

      <div className="ind-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            WHY CHOOSE US
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-wide ind-section-title-center">
            Industrial Trust Factors
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Sri Sai Insulations delivers reliable execution, certified safety compliance, and optimal thermal efficiency metrics.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={idx}
                className="ind-card-dark p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange w-fit mb-4 ring-1 ring-ind-orange/15">
                    <Icon size={18} />
                  </div>
                  
                  <h3 className="font-display text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
