import { useMemo, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, PhoneCall } from 'lucide-react';
import { siteMetadata } from '../data/siteContent';

export default function Contact({ selectedService, selectedProduct, onResetPresets }) {
  const { contacts } = siteMetadata;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const presetMessage = useMemo(() => {
    if (!selectedProduct) return '';
    return `Dear Sri Sai Insulations Team,\n\nI would like to request pricing, technical specifications, and delivery timelines for the product: "${selectedProduct}".\n\nPlease contact me regarding our requirements.\n\nBest regards,\n[Your Name]`
  }, [selectedProduct])

  const effectiveService = selectedService || service
  const effectiveMessage = selectedProduct ? presetMessage : message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !effectiveMessage) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    setSubmitting(true);
    
    // Simulate API transport
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Clear inputs
      setName('');
      setCompany('');
      setPhone('');
      setEmail('');
      setMessage('');
      onResetPresets();
    }, 1500);
  };

  return (
    <section id="contact" className="ind-section ind-surface relative">
      <div className="ind-container">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="ind-kicker">
            <span className="w-1.5 h-1.5 rounded-full bg-ind-orange" />
            COMMUNICATION GATEWAY
          </div>
          <h2 className="ind-h2 ind-section-title-center">
            Request a Quote
          </h2>
          <p className="ind-lead">
            Submit your project parameters to receive a custom insulation audit proposal, technical material data sheets, and competitive B2B cost estimates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href={`tel:${contacts.phoneClean1}`}
              className="ind-btn-outline px-4 py-2.5 rounded-lg text-[10px]"
            >
              <PhoneCall size={14} className="text-ind-orange" />
              Call Now
            </a>
            <a
              href={contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ind-btn-base px-4 py-2.5 rounded-lg text-[10px] bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageCircle size={14} />
              WhatsApp Enquiry
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Cards Info */}
            <div className="grid gap-4">
              <div className="ind-card p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange ring-1 ring-ind-orange/10">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-ind-navy">
                      Address
                    </p>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                      {contacts.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ind-card p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange ring-1 ring-ind-orange/10">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-ind-navy">
                      Phone
                    </p>
                    <div className="mt-1 space-y-1 text-sm font-mono">
                      <a href={`tel:${contacts.phoneClean1}`} className="block text-slate-700 hover:text-ind-orange">
                        {contacts.phone1}
                      </a>
                      <a href={`tel:${contacts.phoneClean2}`} className="block text-slate-700 hover:text-ind-orange">
                        {contacts.phone2}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ind-card p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2.5 rounded-xl bg-ind-orange/10 text-ind-orange ring-1 ring-ind-orange/10">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-ind-navy">
                      Email
                    </p>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="mt-1 block text-sm font-mono text-slate-700 hover:text-ind-orange break-words"
                    >
                      {contacts.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="ind-card p-2 h-56 overflow-hidden relative">
              <iframe
                title="Sri Sai Insulations Location Map"
                src="https://maps.google.com/maps?q=Sri%20Sai%20Insulations%20Zamin%20Pallavaram%20Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 rounded-lg"
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>

          {/* Right panel: RFQ Form */}
          <div className="lg:col-span-7 ind-card p-6 sm:p-8 flex flex-col justify-between relative">
            
            {success ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-4 py-12">
                <CheckCircle2 size={48} className="text-green-500 animate-pulse" />
                <h4 className="font-display text-base font-bold text-ind-navy uppercase tracking-wider">Transmission Acknowledged</h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">
                  Your request for quotation has been submitted. Our engineering team will review the parameters and contact you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-4 ind-btn-dark rounded-lg"
                >
                  Submit Another RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-display text-sm font-bold text-ind-navy uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                  Request for Quote (RFQ)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-2.5 text-xs text-ind-navy focus:outline-none focus:ring-2 focus:ring-ind-orange/15 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Company Name</label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Refineries"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-2.5 text-xs text-ind-navy focus:outline-none focus:ring-2 focus:ring-ind-orange/15 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Telephone Port *</label>
                    <input 
                      type="text" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-2.5 text-xs text-ind-navy focus:outline-none focus:ring-2 focus:ring-ind-orange/15 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. purchasing@refinery.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-2.5 text-xs text-ind-navy focus:outline-none focus:ring-2 focus:ring-ind-orange/15 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Service Category Required</label>
                  <select 
                    value={effectiveService}
                    onChange={(e) => {
                      if (selectedService) onResetPresets()
                      setService(e.target.value)
                    }}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-2.5 text-xs text-ind-navy focus:outline-none focus:ring-2 focus:ring-ind-orange/15 transition"
                  >
                    <option value="general">General Material Inquiry / AMC Support</option>
                    <option value="hot">Hot Insulation Contracting</option>
                    <option value="cold">Cold Insulation Contracting</option>
                    <option value="acoustic">Acoustic Insulation / Soundproofing</option>
                    <option value="covering">GI / Aluminum Cladding</option>
                    <option value="turnkey">Turnkey Insulation Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-500 mb-1.5 uppercase">Project Parameters & Messages *</label>
                  <textarea 
                    required
                    value={effectiveMessage}
                    onChange={(e) => {
                      if (selectedProduct) onResetPresets()
                      setMessage(e.target.value)
                    }}
                    placeholder="Describe your piping, vessel, or boiler dimensions, target temperature boundaries, and installation locations..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-ind-orange rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-ind-orange/15 min-h-[120px] text-ind-navy transition font-sans leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-ind-orange/25 bg-ind-orange/10 px-3 py-2 text-xs text-ind-navy">
                    {error}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full ind-btn-dark rounded-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Send size={12} />
                  {submitting ? 'SENDING PROTOCOL...' : 'SUBMIT RFQ'}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
