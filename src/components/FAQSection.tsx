import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQSectionProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function FAQSection({ onLogEvent }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where do traditional hospital growth pipelines leak patients?",
      a: "Based on audits across hundreds of specialty desks, the heaviest leakage occurs at two vital operational stages: first, between initial digital inquiry and first outpatient check-up (often exceeding 45% due to callback delays); and second, between the doctor's procedural advisory and the pre-admission counselor desk (typically around 35% drop-off where patients encounter unaddressed financial or clinical anxieties)."
    },
    {
      q: "Which reference pathways yield predictable completed surgeries?",
      a: "Generic keyword traffic yields massive clicks, but typical procedural show-up Rates represent sub-1% conversions because they attract pricing-deal seekers. Sustaining high-margin case volumes requires targeting intent-rich medical keywords, optimizing your referral infrastructure, and automating post-discharge checkup logs."
    },
    {
      q: "What is the average leakage rate between outpatient recommendation and admission?",
      a: "The average unoptimized surgical center experiences a 35% to 40% patient drop-off after clinical consultation. This happens because counselors lack structured tracking lines, neglecting to follow up on pending insurance approvals, family schedules, or surgical anxieties."
    },
    {
      q: "How can hospital directors trace marketing ROI objectively?",
      a: "By introducing systematic tracking. Under the Surgical Growth Framework, every source of patient interest—be it clinical directories, physician references, or digital portals—is assigned a real-time dispatch code. This code traces the patient from the reception lobby through active consultations, counseling steps, and final discharge, linking ad spend directly to procedural confirmation."
    },
    {
      q: "Is front-office coordination helping or hurting your conversions?",
      a: "Without systematic rules, they are often quiet bottlenecks. Receptionists are trained for billing and routine call-handling—not for patient triage. When forced to handle anxious clinical inquiries, they read off static price sheets or delay callbacks, driving patients directly to competitor groups. Systematic operational training is required to turn receptionist counters into booking anchors."
    }
  ];

  const handleToggle = (idx: number) => {
    if (openIdx === idx) {
      setOpenIdx(null);
    } else {
      setOpenIdx(idx);
      onLogEvent(`FAQ Accordion Toggled: ${faqs[idx].q}`, "Interaction", "FAQ Board Accordion Click");
    }
  };

  return (
    <section 
      id="faq-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 text-left"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-brand-teal font-mono text-xs uppercase tracking-widest font-extrabold block">
            STRATEGIC QUESTIONS
          </span>
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            Questions Every Hospital Owner Must Ask
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Take an analytical look at your clinical pipeline. If your administrative team cannot answer these questions with hard coordinates, your growth is built on accidental goodwill.
          </p>
        </div>

        {/* Accordions list */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#09182d] border-brand-teal shadow-md" 
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer text-white hover:text-brand-teal transition-colors outline-none font-display text-left"
                >
                  <span className="font-display font-medium pr-2 text-sm sm:text-base text-left">
                    {faq.q}
                  </span>
                  
                  <span className="shrink-0">
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-brand-teal" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </span>
                </button>

                {/* Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/10 overflow-hidden"
                    >
                      <div className="p-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light text-left bg-[#09182d]/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
