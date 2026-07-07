import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface PositioningSectionProps {
  onScheduleClick: () => void;
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function PositioningSection({ onScheduleClick, onLogEvent }: PositioningSectionProps) {

  return (
    <section 
      id="positioning-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 text-center"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Intro Block */}
        <div className="space-y-6 max-w-3xl mx-auto">
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
