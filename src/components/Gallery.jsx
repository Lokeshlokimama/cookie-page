import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import downloaded assets for showcase
import img1 from '../assets/images/image1.jpg';
import img2 from '../assets/images/image2.jpg';
import img3 from '../assets/images/image3.jpg';
import slide1 from '../assets/images/slider1.jpg';
import slide2 from '../assets/images/slider2.jpg';
import slide3 from '../assets/images/slider3.jpg';

const GALLERY_ITEMS = [
  { id: 1, title: "Pipeline Thermal Cladding", category: "cladding", image: slide1, desc: "High-grade aluminum cladding erection for chemical pipeline." },
  { id: 2, title: "Boiler Hot Insulation", category: "hot", image: img1, desc: "LRB Mattress packing and heat conservation for high-capacity boilers." },
  { id: 3, title: "Chilled Water Pipeline Fitting", category: "cold", image: img2, desc: "Condensation prevention cold lagging for HVAC pipeline." },
  { id: 4, title: "Generator Acoustic soundproofing", category: "acoustic", image: img3, desc: "Acoustic lining using high-density glass wool panels." },
  { id: 5, title: "Thermal Storage Tank Protection", category: "hot", image: slide2, desc: "Multi-layered vessel rockwool slab insulation packing." },
  { id: 6, title: "Flue Gas Duct Wrapping", category: "cladding", image: slide3, desc: "Weatherproof sheet cladding for industrial boiler flue vents." }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'hot', label: 'Hot Insulation' },
  { id: 'cold', label: 'Cold Insulation' },
  { id: 'acoustic', label: 'Acoustic Insulation' },
  { id: 'cladding', label: 'GI & Alu Cladding' }
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [activeImageIdx, setActiveImageIdx] = useState(null); // Index of image in currently filtered list

  const filteredItems = GALLERY_ITEMS.filter(item => 
    filter === 'all' || item.category === filter
  );

  const openLightbox = (index) => {
    setActiveImageIdx(index);
  };

  const closeLightbox = () => {
    setActiveImageIdx(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="ind-section bg-white relative">
      <div className="ind-container relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            PROJECT PORTFOLIO
          </div>
          <h2 className="ind-h2 ind-section-title-center">
            Work Gallery
          </h2>
          <p className="ind-lead">
            Real pictures representing design, fabrication, and mechanical cladding executed on sites across South India.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12 border-b border-slate-100 pb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.id); closeLightbox(); }}
              className={`py-2.5 px-4 rounded-lg font-display text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-ind-navy text-white border-ind-navy shadow-lg shadow-ind-navy/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-ind-orange/30 hover:text-ind-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 cursor-zoom-in bg-slate-50 aspect-[4/3] hover:shadow-lg hover:shadow-ind-navy/10 transition"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-ind-navy/95 via-ind-navy/55 to-ind-navy/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono px-2.5 py-1 border border-white/15 bg-black/35 text-white/85 rounded-full uppercase tracking-wider">
                      {item.category.toUpperCase()}
                    </span>
                    <Eye size={16} className="text-ind-orange animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-xs md:text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                    <p className="text-[10px] text-slate-350 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-default"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Slider Controls */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 p-3 bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 p-3 bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Lightbox image container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-[4/3] max-h-[75vh] flex flex-col justify-between bg-ind-navy/55 border border-slate-800/70 p-3 rounded-2xl"
            >
              <img 
                src={filteredItems[activeImageIdx].image} 
                alt={filteredItems[activeImageIdx].title}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {/* Caption */}
              <div className="p-3 text-center border-t border-slate-900/40 bg-black/10 mt-2 rounded">
                <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest">{filteredItems[activeImageIdx].title}</h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">{filteredItems[activeImageIdx].desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
