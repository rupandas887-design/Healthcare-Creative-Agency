import React from "react";
import { Check, X, ShieldAlert, Award, ChevronRight, Activity, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface PositioningSectionProps {
  onScheduleClick: () => void;
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function PositioningSection({ onScheduleClick, onLogEvent }: PositioningSectionProps) {
  const tableData = [
    {
      parameter: "Core KPI Metric",
      agency: "Traffic, clicks, likes, and impressions",
      sunil: "Completed procedures, OPD conversions, and bottom-line growth",
      isCrucial: true
    },
    {
      parameter: "Pipeline Oversight",
      agency: "Reports cost-per-click; zero visibility into actual patient arrivals",
      sunil: "Bridges the entire journey from first inquiry to case confirmation",
      isCrucial: false
    },
    {
      parameter: "Front Office Triage",
      agency: "None. Expects busy receptionist desks to convert complex surgeries",
      sunil: "Trains medical clerks on clinical qualifiers, scripts, and follow-ups",
      isCrucial: false
    },
    {
      parameter: "Patient Journey Insights",
      agency: "Generic marketing templates used across various B2C websites",
      sunil: "Specialized clinical knowledge of patient anxiety drop-offs by specialty",
      isCrucial: true
    },
    {
      parameter: "Engagement Status",
      agency: "Third-party execution vendor sending passive Excel spreadsheets",
      sunil: "Integrated consulting partner actively adjusting operational handoffs",
      isCrucial: false
    }
  ];

  const focusPoints = [
    "Patient Acquisition Integration",
    "OPD-to-Procedure Conversion Rules",
    "Surgical Pipeline Coordination",
    "Operational Handoff Tracking",
    "Growth Reporting Accountability",
    "Long-Term Multi-Caseload Scalability"
  ];

  return (
    <section 
      id="positioning-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 text-left"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Intro Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-teal font-mono text-xs uppercase tracking-widest font-extrabold block">
              DIAGNOSTIC ADVICE
            </span>
            <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
              I am not a marketing agency.
            </h2>
            <div className="space-y-4 text-slate-300 font-light text-sm md:text-base leading-relaxed font-sans">
              <p>
                Agencies scale generic advertising traffic. They report thousands of raw clicks and claim success, while your frontdesk remains suffocated by cold, unqualified price-shoppers.
              </p>
              <p>
                I function as an active <strong className="text-white font-bold text-sans">Surgical Practice Growth Partner</strong> for surgeon-led hospitals and specialty clinics.
              </p>
              <p>
                My engagement focus is not lead generation alone. I help you align internal administrative workflows, counseling procedures, and patient reassurance loops so that inquiries translate to filled operative beds.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 relative overflow-hidden shadow-xs">
            <div className="absolute right-0 bottom-0 opacity-[0.02] text-brand-teal pointer-events-none">
              <Cpu className="w-48 h-48" />
            </div>
            
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight text-xs md:text-sm">
              Targeted Practice Optimization Areas
            </h3>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {focusPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-sans font-medium">
                  <span className="h-6 w-6 rounded-md bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center text-brand-teal font-extrabold shrink-0">
                    ✕
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="p-4.5 rounded-2xl bg-brand-navy/60 border border-white/10 text-xs text-slate-300 italic font-sans font-light leading-relaxed">
              "We improved our outpatient-to-surgery confirmation rate from 11% to 28% in 4 months without spending an extra rupee on marketing—simply by organizing counselor follow-ups." 
              <br />
              <span className="text-brand-teal font-mono not-italic font-bold text-[10px] block mt-2">
                — SURGEON FOUNDER, ORTHOPEDIC HOSPITAL COHORT
              </span>
            </div>
          </div>
        </div>

        {/* Clear Comparison Matrix */}
        <div className="space-y-6 pt-4">
          <div className="text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold mb-1">
              OPERATIONAL CONTRAST MATRIX
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display">
              The Diagnostic Comparison
            </h3>
            <p className="text-xs text-slate-300 font-sans font-light">
              Understand the fundamental differences: Sunil Sulegai vs. Traditional Ad Agency Retainers.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.01] overflow-hidden shadow-2xl">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-black/40 border-b border-white/10 p-4 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
              <div className="col-span-12 md:col-span-4 text-left">Scope Parameter</div>
              <div className="hidden md:block col-span-4 text-rose-300 text-left">Typical Ad Agency Retainer</div>
              <div className="hidden md:block col-span-4 text-brand-teal text-left">Surgical Growth Framework</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/10">
              {tableData.map((row, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`grid grid-cols-12 p-4 md:p-5 text-xs md:text-sm transition-colors hover:bg-white/[0.03] items-center ${
                    row.isCrucial ? "bg-white/[0.04]" : "bg-transparent"
                  }`}
                >
                  <div className="col-span-12 md:col-span-4 font-bold text-white font-display mb-2 md:mb-0">
                    {row.parameter}
                  </div>
                  
                  {/* Agency scope column */}
                  <div className="col-span-12 md:col-span-4 text-slate-300 md:pr-4 flex items-start gap-2 mb-2 md:mb-0 max-w-[28rem]">
                    <span className="md:hidden text-[9px] uppercase font-mono tracking-wider font-extrabold text-rose-450 block shrink-0 mt-0.5">Agency: </span>
                    <span className="flex items-start gap-2">
                      <X className="h-4.5 w-4.5 text-rose-450 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed font-sans">{row.agency}</span>
                    </span>
                  </div>

                  {/* Sunil scope column */}
                  <div className="col-span-12 md:col-span-4 text-brand-teal md:pl-2 flex items-start gap-2">
                    <span className="md:hidden text-[9px] uppercase font-mono tracking-wider font-extrabold text-brand-teal block shrink-0 mt-0.5">Sulegai: </span>
                    <span className="flex items-start gap-2">
                      <Check className="h-4.5 w-4.5 text-brand-teal shrink-0 mt-0.5" />
                      <span className="text-xs text-brand-teal leading-relaxed font-bold font-sans">{row.sunil}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Drive */}
        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onScheduleClick();
              onLogEvent("CTA Clicked from Positioning", "Conversion", "Positioning Section CTA");
            }}
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-brand-navy font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all"
          >
            <span>Analyze your conversion coordinates</span>
            <ChevronRight className="h-4 w-4 text-brand-navy shrink-0" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
