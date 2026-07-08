import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Eye, 
  MapPin, 
  Gauge, 
  ShieldAlert, 
  Award, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  FileText,
  Bookmark
} from "lucide-react";

interface FrameworkSectionProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function FrameworkSection({ onLogEvent }: FrameworkSectionProps) {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: "visibility",
      index: 1,
      title: "Visibility",
      phrase: "Trace every digital & offline channel source with absolute metric transparency.",
      icon: Eye,
      failure: "Ad agency delivers leads, but hospital management has zero dynamic trace of why patients cancelled bookings. Records are buried inside disorganized reception spreadsheets.",
      optimized: "Enquiries from all sources flow into a centralized secure dispatcher ledger. Every entry is immediately annotated, cataloged, and assigned an administrative owner.",
      kpi: "Lead Trace Rate: 100%",
      metricDesc: "Every inquiry receives categorical triage tagging within the first minutes."
    },
    {
      id: "tracking",
      index: 2,
      title: "Tracking",
      phrase: "Measure and align every micro-handoff along the patient care timeline.",
      icon: MapPin,
      failure: "The critical space between OPD consultation, diagnostic scheduling, counseling advice, and surgery confirmation is unmonitored. Dropoffs go completely unnoticed.",
      optimized: "Continuous flow monitoring assigns automatic alerts when surgical candidates are recommended procedures but are stalled due to admin or pre-admission friction.",
      kpi: "Sequence Continuity: >96%",
      metricDesc: "Active tracing loop coverage spanning OPD consultation checkpoints."
    },
    {
      id: "conversion",
      index: 3,
      title: "Conversion",
      phrase: "Calibrate clinic check-ins and counseling scripts to manage patient anxiety.",
      icon: Gauge,
      failure: "Counselors operate without standard clinical guidelines, emphasizing hard-closing sales cards. Anxious diagnostic candidates drop out to competitive corporate groups.",
      optimized: "Empathetic clinical calibration touchpoints and transparent insurance roadmaps deployed. Leads are systematically guided through emotional pre-surgical anxiety loops.",
      kpi: "OPD to Decision: +35%",
      metricDesc: "Surgical confirmation yield increase triggered by counselor coordination."
    },
    {
      id: "discipline",
      index: 4,
      title: "Discipline",
      phrase: "Inject daily operational rhythm and hard accountability into frontline loops.",
      icon: ShieldAlert,
      failure: "Desk teams, coordinators, and counselors operate inside separate silos. Inbound inquiries are called 24-48 hours later, when their intent has completely cooled off.",
      optimized: "A disciplined 5-minute callback sprint standard enforced. Daily morning huddles trace previous-day referrals instantly to clear administrative blockages.",
      kpi: "Callback Response: <5 Min",
      metricDesc: "Average connection velocity for incoming specialist inquiries."
    },
    {
      id: "growth",
      index: 5,
      title: "Growth",
      phrase: "Compound organic advocacy and referral loops systematically.",
      icon: Award,
      failure: "Discharged cases leave satisfied but are never engaged. Word-of-mouth advocacy is treated as an accidental byproduct rather than an active operational growth engine.",
      optimized: "Post-operative check-in milestones capture structured patient clinical logs, automatically feeding local specialist authority reputation models.",
      kpi: "Referral Compound: +28%",
      metricDesc: "Increase in organic peer recommendations and community trust loops."
    }
  ];

  const handlePillarClick = (idx: number) => {
    setActivePillar(idx);
    onLogEvent(`Proprietary Framework Pillar Chosen: ${pillars[idx].title}`, "Strategic Infographic", `Pillar ${idx + 1}`);
  };

  return (
    <section 
      id="framework-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 relative"
    >
      {/* Decorative vertical blueprint lines for elegant layout */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden xl:block"></div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-white/5 hidden xl:block"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded text-brand-gold">
            <Bookmark className="h-3.5 w-3.5 text-brand-gold fill-brand-gold/20" />
            <span className="font-mono text-[9px] md:text-[11px] font-extrabold tracking-widest uppercase">
              PROPRIETARY INTELLECTUAL FRAMEWORK
            </span>
          </div>
          
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            The Surgical Growth Framework™
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            A battle-tested consulting blueprint designed by Acquire OPD to restructure internal clinic coordination, seal patient conversion leaks, and scale sustainable procedure volume.
          </p>
        </div>

        {/* Infographic Layout: Interactive left column triggers vs detailed right-side board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Proprietary Pillars index triggers */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center text-left">
            
            <div className="pb-2 border-b border-white/10 mb-2 pl-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                SELECT FRAMEWORK SECTOR
              </span>
            </div>

            {pillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handlePillarClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? "bg-brand-teal border-brand-teal text-brand-navy shadow-lg translate-x-2"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Index Circle Indicator */}
                      <span 
                        className={`h-7 w-7 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 border transition-all duration-350 ${
                          isActive
                            ? "bg-brand-navy text-brand-teal border-brand-teal font-black"
                            : "bg-white/5 text-slate-300 border-white/10 group-hover:text-brand-teal"
                        }`}
                      >
                        0{pillar.index}
                      </span>

                      <div>
                        <span className={`font-extrabold text-sm tracking-tight block ${isActive ? "text-brand-navy font-black" : "text-white"}`}>
                          {pillar.title}
                        </span>
                        <span className={`text-[10px] ${isActive ? "text-brand-navy/80 font-medium" : "text-slate-400"} truncate block mt-0.5 max-w-[240px]`}>
                          {pillar.phrase}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
                      isActive ? "text-brand-navy translate-x-1 font-bold" : "text-slate-400 group-hover:text-white"
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Luxurious Executive Briefing Card */}
          <motion.div 
            key={activePillar}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden text-left shadow-xs"
          >
            
            {/* Background design watermark */}
            <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-10 translate-y-10 text-brand-teal">
              <Layers className="w-72 h-72" />
            </div>

            <div className="space-y-6 relative z-10">
              
              {/* Header Grid */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase font-extrabold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping"></span>
                    Operational Pillar 0{pillars[activePillar].index} / 05
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white font-display">
                    {pillars[activePillar].title} Protocol
                  </h3>
                </div>

                <div className="p-3 bg-brand-teal text-brand-navy rounded-xl border border-brand-teal shadow-inner shrink-0 font-extrabold">
                  {React.createElement(pillars[activePillar].icon, { className: "h-5 w-5 text-brand-navy font-bold" })}
                </div>
              </div>

              {/* Phrase quote */}
              <p className="text-slate-300 text-xs sm:text-sm font-medium italic leading-relaxed border-l-2 border-brand-gold pl-3">
                "{pillars[activePillar].phrase}"
              </p>

              {/* Diagnostics Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Legacy Failure Column */}
                <div className="space-y-2 p-5 rounded-xl bg-rose-500/[0.02] border border-rose-500/15 shadow-3xs">
                  <span className="text-[10px] font-mono uppercase text-rose-450 font-extrabold tracking-wider block">
                    ✕ Standard Hospital Leak
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {pillars[activePillar].failure}
                  </p>
                </div>

                {/* Growth Optimized Column */}
                <div className="space-y-2 p-5 rounded-xl bg-brand-teal/[0.02] border border-brand-teal/15 shadow-3xs">
                  <span className="text-[10px] font-mono uppercase text-brand-teal font-extrabold tracking-wider block">
                    ✓ Acquire OPD Standard
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {pillars[activePillar].optimized}
                  </p>
                </div>

              </div>

            </div>

            {/* Target Metric / Key Indicator Foot Block */}
            <div className="mt-8 p-4 rounded-xl bg-brand-navy/60 border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-0.5 text-left">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block">
                  PROPRIETARY BENCHMARK METRIC
                </span>
                <p className="text-slate-300 text-xs font-light max-w-sm">
                  {pillars[activePillar].metricDesc}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/10 text-brand-teal border border-white/15 px-3 py-1.5 rounded-lg shrink-0">
                <TrendingUp className="h-4 w-4 text-brand-teal" />
                <span className="font-mono font-bold text-xs tracking-wide">
                  {pillars[activePillar].kpi}
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
