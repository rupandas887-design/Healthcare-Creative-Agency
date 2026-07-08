import React from "react";
import { 
  User, 
  Award, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Bookmark, 
  UserCheck, 
  Briefcase,
  Users
} from "lucide-react";
import { motion } from "motion/react";

export default function AboutSection() {
  const boundaries = [
    { label: "Practice Focus", value: "Surgeon-Owned Single & Multi-Specialty Clinics" },
    { label: "Systems Standard", value: "The Surgical Growth Framework™" },
    { label: "Operating Thesis", value: "Sealing leaks over increasing advertising budgets" },
    { label: "Engagement Quota", value: "Strict limit of max 3 active partners per city tier" }
  ];

  return (
    <section 
      id="about-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 relative text-left"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: Highly Stylized Executive Portrait & Credential Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            
            <div className="relative rounded-2xl overflow-hidden bg-[#09182d] p-8 text-white shadow-xl flex flex-col justify-between min-h-[380px] border border-white/10 group">
              
              {/* Gold watermark seal decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/[0.04] rounded-full pointer-events-none group-hover:bg-brand-gold/[0.08] transition-all duration-500"></div>

              <div className="space-y-6 relative z-10">
                
                {/* Executive avatar representation */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-brand-navy border-2 border-white/20 shadow-md flex items-center justify-center overflow-hidden p-1.5 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://kgibprahnkpifyzjfzsf.supabase.co/storage/v1/object/public/img/Gemini_Generated_Image_r4scr8r4scr8r4sc-removebg-preview%20(2).png" 
                      alt="Acquire OPD Logo" 
                      className="w-full h-full object-contain block opacity-100" 
                      style={{ imageRendering: 'auto', filter: 'brightness(1.18) contrast(1.12) saturate(1.08)' }}
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Acquire OPD</h3>
                    <div className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-extrabold block">
                      Surgical Practice Growth Partner
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 font-sans text-xs italic leading-relaxed pt-2 border-t border-white/10">
                  "Surgical hospital growth is not a creative marketing exercise. It is a strict discipline of process handoffs, counseling metrics, and micro-conversions."
                </p>

              </div>

              {/* Verified bottom footer inside portrait */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold text-left">Strategic Base</span>
                  <span className="text-white font-mono text-xs font-bold text-left block">OPERATIONS PARTNER</span>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 border border-brand-gold/30 rounded text-brand-gold text-[10px] font-mono font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>VERIFIED PRACTICE ADVISOR</span>
                </div>
              </div>

            </div>

            {/* Strategic Boundaries Quick Catalog */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-xl space-y-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-black text-left">
                ENGAGEMENT PARAMETERS
              </span>
              
              <div className="divide-y divide-white/10 space-y-3">
                {boundaries.map((bound, bIdx) => (
                  <div key={bIdx} className="flex justify-between items-start gap-4 text-xs pt-3 first:pt-0 border-first:none">
                    <span className="text-slate-355 font-bold shrink-0">{bound.label}:</span>
                    <span className="text-white font-extrabold text-right">{bound.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Senior Executive Biography Prose */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            
            <span className="text-brand-teal font-mono text-xs uppercase tracking-widest font-extrabold block">
              FOUNDER COGNITION
            </span>
            
            <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
              A Trusted Partner to Surgeon-Owned Hospitals
            </h2>

            <div className="space-y-4 text-slate-300 font-light text-xs sm:text-sm md:text-base leading-relaxed font-sans">
              <p>
                As a Strategic Growth Consultant, my trajectory diverges completely from standard advertising models.
              </p>
              
              <p>
                Most hospital directors face a chronic loop of frustration. They request growth, hire an advertising agency, configure a standard brand portal, and pay thousands for generic online leads. Those inquiries get dumped as chaotic sheets onto busy clinic desks.
              </p>
              
              <p>
                Then, chaos ensues. Front desk teams are overwhelmed checking bills, leaving serious inquiries uncalled for hours or days. The target candidates search elsewhere, while hard-won marketing capital rot under your reception desk.
              </p>
              
              <p>
                Most initiatives fail because marketing vendors remain disconnected from internal hospital operations. <strong className="text-brand-teal font-extrabold">Growth occurs when counselor handoffs, response speeds, and patient anxiety follow-ups function under structural rhythm.</strong>
              </p>
              
              <p>
                My engagement method is hands-on. Acquire OPD does not sell 'impressions.' We audit clinical callback speeds, restructure pre-admission counselor scripts, and align front-office routines to secure true procedure confirmations.
              </p>
            </div>

            {/* Elite credentials checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium font-sans">No agency commissions. Direct flat-rate senior advice.</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium font-sans">Proprietary clinical pre-qualification screening tools.</span>
              </div>
            </div>

            {/* Strategic signature */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-black text-white font-sans tracking-tight block text-left">Acquire OPD</span>
                <span className="text-[10px] font-mono text-brand-gold uppercase font-bold text-left block">Principal Advisor</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
