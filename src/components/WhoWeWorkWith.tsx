import React from "react";
import { 
  Award, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  HeartPulse, 
  Building2, 
  MapPin,
  Lock,
  Compass,
  Star
} from "lucide-react";
import { motion } from "motion/react";

interface WhoWeWorkWithProps {
  onScheduleClick: () => void;
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function WhoWeWorkWith({ onScheduleClick, onLogEvent }: WhoWeWorkWithProps) {
  const partners = [
    {
      id: "profile-hospital",
      icon: HeartPulse,
      title: "Surgeon-Owned Hospitals",
      qualifications: [
        "Growth-focused multi-specialty centers seeking operational pipeline visibility.",
        "Founder-led setups targeting higher monthly cases without adding premium ad spend.",
        "Committed to enforcing front-office counseling accountability rules."
      ],
      description: "Hospitals designed for optimal surgical yield that require standardized coordination and clear pipeline boards."
    },
    {
      id: "profile-clinic",
      icon: Building2,
      title: "Specialty Surgical Clinics",
      qualifications: [
        "Clinics heavily focused on elective joint replacements, plastics, eyes, or cardiac care.",
        "Established consultants aiming to transition from directory portals to true direct patient acquisition.",
        "Ready to implement a structured 4-step counselor follow-up calendar."
      ],
      description: "Boutique specialty practices aiming to secure systematic, dial-speed patient conversions."
    },
    {
      id: "profile-group",
      icon: Award,
      title: "Emerging Practice Groups",
      qualifications: [
        "Independent practice chains expanding tier-2 of tier-3 regional footprint.",
        "Medical partners looking to coordinate patient dispatch algorithms across multiple cities.",
        "Desiring unified pipeline intelligence to validate future valuations."
      ],
      description: "Scaling networks seeking repeatable growth playbooks to automate peer-inspired patient loops."
    }
  ];

  return (
    <section 
      id="who-we-work-with-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 relative text-left"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-teal font-mono text-xs uppercase tracking-widest font-extrabold block">
            PARTNERSHIP PARADIGM
          </span>
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            Ideal Partnership Profiles
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Acquire OPD does not consult with general practitioners or corporate conglomerate hospitals. We work exclusively with surgeon-founders willing to introduce operational rigor.
          </p>
        </div>

        {/* 3 Columns Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partners.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                id={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.015, borderColor: "rgba(20,184,166,0.4)" }}
                className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                {/* Background micro gradient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/[0.01] rounded-full blur-2xl group-hover:bg-brand-teal/[0.03] transition-all duration-500 pointer-events-none"></div>

                <div className="space-y-6 relative z-10">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-xl bg-brand-teal text-brand-navy flex items-center justify-center shadow-md font-bold transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5.5 w-5.5 text-brand-navy" />
                  </div>

                  {/* Header Title */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-brand-teal transition-colors duration-300">{p.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">{p.description}</p>
                  </div>

                  {/* Qualification Criteria Bullets */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-bold">
                      Strict Match Thresholds
                    </span>
                    
                    <ul className="space-y-3">
                      {p.qualifications.map((qual, qIdx) => (
                        <li key={qIdx} className="flex gap-2.5 text-xs text-slate-350 items-start leading-relaxed font-light font-sans">
                          <CheckCircle className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Exclusivity Commitment Grid element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#09182d] border border-white/10 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 text-white relative overflow-hidden shadow-lg"
        >
          {/* Subtle logo background */}
          <div className="absolute right-0 bottom-0 opacity-[0.03] translate-y-8 translate-x-8 pointer-events-none text-brand-gold">
            <Lock className="w-64 h-64" />
          </div>

          <div className="lg:col-span-5 space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 border border-brand-gold/20 rounded font-semibold text-brand-gold">
              <Lock className="h-3.5 w-3.5" />
              <span className="font-mono text-[9px] uppercase tracking-widest leading-none font-bold">
                EXCLUSIVITY COVENANT
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-display">
              Selective Local Strategy Slots
            </h3>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Because I integrate directly with your in-clinic team benchmarks, front-desk coordinates, and recovery programs—I work with a strict, limited quota of active surgeon-owned practices.
            </p>
          </div>

          {/* Core Values description right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white/[0.04] border border-white/10 rounded-2xl relative overflow-hidden z-10">
            <div className="space-y-1">
              <div className="text-brand-gold font-bold font-display text-sm flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-brand-gold font-bold" />
                Focused Executive Care
              </div>
              <p className="text-slate-350 text-xs leading-relaxed font-light font-sans">
                No split attention or standard template agency playbooks. You receive highly tailored coordinates custom designed for your local geography.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-brand-gold font-bold font-display text-sm flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-brand-gold font-bold" />
                Catchment Market Exclusivity
              </div>
              <p className="text-slate-355 text-xs leading-relaxed font-light font-sans">
                I do not onboard competing practices inside the same neighborhood. I focus entirely on positioning your specialty hospital as the gold authority.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-brand-gold font-bold font-display text-sm flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-brand-gold font-bold" />
                In-Clinic Training
              </div>
              <p className="text-slate-355 text-xs leading-relaxed font-light font-sans">
                I teach front office clerks and coordinators exactly how to approach patient anxieties. I do not just report leads, I assist with admissions.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-brand-gold font-bold font-display text-sm flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-brand-gold font-bold" />
                Compound Value Building
              </div>
              <p className="text-slate-355 text-xs leading-relaxed font-light font-sans">
                We build long-term systems to ensure patient flow tracks systematically, securing continuous cashflow and future practice valuations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Call */}
        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onScheduleClick();
              onLogEvent("Schedule Clicked from Partnership Match", "Conversion", "Who We Work With Section CTA");
            }}
            className="inline-flex items-center gap-2.5 bg-brand-teal hover:bg-brand-teal/90 text-brand-navy font-bold px-8 py-4 rounded-xl cursor-pointer shadow-md transition-all uppercase text-xs tracking-wider active:scale-[0.98]"
          >
            <span>Request Partnership Interview</span>
            <ArrowRight className="h-4 w-4 text-brand-navy shrink-0" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
