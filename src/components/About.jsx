import { motion } from 'framer-motion';
import { ShieldCheck, HardHat, Award, Clock, Users, Wrench } from 'lucide-react';
import aboutImg from '../assets/images/image1.jpg';
import { siteMetadata } from '../data/siteContent';

const HIGHLIGHTS = [
  { title: "Skilled Team", desc: "Craftsmen with deep technical training and field experience.", icon: Users },
  { title: "Quality Materials", desc: "Procuring raw materials tested against industrial stress baselines.", icon: Wrench },
  { title: "Timely Execution", desc: "Rigorous milestone tracking to hit deadlines.", icon: Clock },
  { title: "Industrial Standards", desc: "Strict alignment with IS code specifications and mechanical parameters.", icon: Award },
  { title: "Safety Focused Work", desc: "Stringent safety standards on site for hazard-free operations.", icon: HardHat },
  { title: "Customer Support", desc: "Proactive site inspection and layout design support.", icon: ShieldCheck }
];

export default function About() {
  const { profileText } = siteMetadata;

  return (
    <section id="about" className="ind-section bg-white relative">
      <div className="ind-container">
        
        {/* Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: About Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="ind-kicker">
              <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
              COMPANY PROFILE
            </div>

            <h2 className="ind-h2 ind-section-title">
              ESTABLISHED SINCE 2009
            </h2>

            <div className="text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p>{profileText[0]}</p>
              <p>{profileText[1]}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-ind-navy">
                <span className="size-1.5 rounded-full bg-ind-orange" aria-hidden />
                Quality Workmanship
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-ind-navy">
                <span className="size-1.5 rounded-full bg-ind-orange" aria-hidden />
                Timely Execution
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-ind-navy">
                <span className="size-1.5 rounded-full bg-ind-orange" aria-hidden />
                Industrial Standards
              </span>
            </div>
          </div>

          {/* Right: Legacy Image */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 p-2 bg-slate-50 group">
              <img 
                src={aboutImg} 
                className="w-full rounded-2xl object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                alt="Sri Sai Insulations Workplace"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ind-navy/10 via-transparent to-transparent group-hover:from-transparent transition duration-300 pointer-events-none" />
            </div>

            {/* Back decorative geometry */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-40 h-40 bg-ind-orange/5 border border-ind-orange/10 rounded-full blur-2xl" />
          </div>

        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={idx}
                className="ind-card p-5 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange shrink-0 ring-1 ring-ind-orange/10">
                  <Icon size={18} />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-display text-sm font-bold text-ind-navy tracking-wider uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-sans">
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
