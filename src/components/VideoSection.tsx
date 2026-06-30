import React, { useState } from "react";
import { Play, Tv, ArrowUpRight, Volume2, Calendar, FileText, ChevronRight, X, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoSectionProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function VideoSection({ onLogEvent }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const watchVideoSessions = [
    {
      id: "vid-loss-leads",
      title: "Why Hospitals Lose Surgeries Despite Strong Lead Generation",
      duration: "06:12 Mins",
      category: "Lead Conversion Leakage",
      summary: "Understand why throwing a generic digital marketing budget at uncoordinated reception desks yields zero surgical pipeline growth.",
      slides: [
        {
          heading: "The Speed to Call Barrier",
          metric: "9x Conversion Crash",
          content: "Spoken by Sunil: 'Once a patient inquiries about an orthopedic, plastic, or bariatric procedure, they are in high-anxiety search mode. If your clinic takes 1 hour to callback, show-up drops by over 300%. If you take 4 hours, they are already booked with a corporate hospital.'",
          remedy: "Implement an automated pipeline coordinator workflow to guarantee inquiries receive clinical pre-screening callbacks in under 5 minutes."
        },
        {
          heading: "Marketing Metrics vs Clinic Reality",
          metric: "Disconnected Pipelines",
          content: "Spoken by Sunil: 'Marketing reports say 100 high-income leads generated. Reception says only 5 were real. Why? Because agencies focus entirely on clicks, but fail to support internal diagnostic coordination, leaving qualified patients stranded in spreadsheets.'",
          remedy: "Establish clean daily dashboard tracking to bridge counselor efforts and ad spend on a single shared screen."
        }
      ]
    },
    {
      id: "vid-cost-followup",
      title: "The Financial Drain of Weak Patient counseling Follow-ups",
      duration: "08:45 Mins",
      category: "Counseling Coordination",
      summary: "Explore the operational impact of unmonitored counseling lines, and why lazy one-call responses fail patient trust parameters.",
      slides: [
        {
          heading: "The Counseling Chasm",
          metric: "₹15 Lakhs Leaked / Month",
          content: "Spoken by Sunil: 'Most clinic coordinators are passive call takers. They quote the package pricing tier once, then wait. But clinical patients procrastinate out of medical fear. They require supportive, systematic touchpoints, not pricing negotiations.'",
          remedy: "Deploy Sunil's pre-admission diagnostic scripts, mapping helpful medical follow-ups on Day 2, Day 5, and Day 10."
        },
        {
          heading: "Compounded Pipeline Recovery",
          metric: "+28% Surgeries Sealed",
          content: "Spoken by Sunil: 'Sustained, empathetic callback sequences over 14 days increase patient retention by almost 30%. All that is required is structure and systematic counselor accountability.'",
          remedy: "Set up the visual counselor tracking board to flag and resolve pending approvals instantly."
        }
      ]
    },
    {
      id: "vid-compete-chains",
      title: "How Independent Practices Neutralize Corporate Healthcare Budgets",
      duration: "07:30 Mins",
      category: "Strategic Positioning",
      summary: "How boutique, surgeon-owned practices leverage clinical agility and physician reputation to reclaim local catchment markets.",
      slides: [
        {
          heading: "The Corporate Overhead Bottleneck",
          metric: "Bureaucratic Booking Inertia",
          content: "Spoken by Sunil: 'Corporate hospital networks treat patients like diagnostic numbers, routing them through cold call-centers. A surgeon-owned clinic provides pristine, high-empathy guidance. Leverage this agility as a primary growth tool.'",
          remedy: "Frame your doctor brand around specific clinical mastery and high-end procedural focus rather than generic healthcare pricing."
        },
        {
          heading: "Sustaining organic patient loops",
          metric: "100% Peer-to-Peer Trust",
          content: "Spoken by Sunil: 'Surgical practices thrive on reputation. By coordinating discharge checkups, you transform happy recovery outcomes into structured local review loops that no corporate ad blitz can compete with.'",
          remedy: "Integrate automatic checkup reminders to compile patient experience feedback systematically."
        }
      ]
    }
  ];

  const handleOpenMasterclass = (idx: number) => {
    setActiveVideo(idx);
    setActiveSlide(0);
    onLogEvent(`Video Briefing Opened: ${watchVideoSessions[idx].title}`, "Video Watch", "Insights Video Console Activated");
  };

  const handleNextSlide = () => {
    if (activeVideo === null) return;
    const slidesLen = watchVideoSessions[activeVideo].slides.length;
    setActiveSlide((prev) => (prev + 1) % slidesLen);
    onLogEvent("Video Slide Swapped", "Interaction", "Video Player Console Slide Nav");
  };

  return (
    <section 
      id="insights-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 text-left"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-teal font-mono text-xs uppercase tracking-widest font-extrabold block">
            EDUCATIONAL INTEL
          </span>
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            Surgical growth insights video briefings
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Highly structured operational briefings showing exact leakage checkpoints, recorded for surgical founders who seek real operational systems over marketing reports.
          </p>
        </div>        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchVideoSessions.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.015, borderColor: "rgba(20,184,166,0.4)" }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => handleOpenMasterclass(idx)}
            >
              <div className="space-y-4">
                {/* Visual Video Cover placeholder */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-white/10 flex items-center justify-center group-hover:opacity-95 transition-opacity">
                  {/* Grid decoration overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>

                  <div className="absolute top-3 left-3 text-[8px] font-mono bg-[#09182d] text-brand-teal px-2 py-0.5 rounded border border-white/15 font-bold uppercase">
                    {vid.category}
                  </div>

                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white bg-slate-900/80 px-2 py-0.5 rounded animate-pulse">
                    {vid.duration}
                  </div>

                  <div className="h-11 w-11 rounded-full bg-brand-teal text-brand-navy flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="h-4.5 w-4.5 pl-0.5 fill-brand-navy text-brand-navy" />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-brand-teal transition-colors font-display line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-slate-350 text-xs leading-relaxed line-clamp-2 font-light">
                    {vid.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors select-none">
                <span>View briefing masterclass slides</span>
                <ArrowUpRight className="h-4 w-4 text-brand-teal" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Presentation Player overlay modal on click */}
        <AnimatePresence>
          {activeVideo !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-sans"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative w-full max-w-2xl bg-[#09182d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left"
              >
                {/* Modal header */}
                <div className="p-4 md:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Tv className="h-4 w-4 text-brand-teal animate-pulse" />
                    <span className="font-bold text-white text-xs tracking-wider uppercase font-display">
                      Surgical Growth masterclass slide desk
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveVideo(null);
                      onLogEvent("Video Area Exited", "Engagement", "Masterclass player console closed");
                    }}
                    className="text-slate-400 hover:text-white cursor-pointer px-2.5 py-1 rounded bg-white/5 font-extrabold"
                  >
                    ✕
                  </button>
                </div>

                {/* Dynamic Slides Content */}
                <div className="p-6 md:p-8 space-y-6 flex-1 max-h-[70vh] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase font-extrabold">
                        SLIDE {activeSlide + 1} OF {watchVideoSessions[activeVideo].slides.length} • {watchVideoSessions[activeVideo].title}
                      </span>
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mt-1.5">
                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-white font-display">
                          {watchVideoSessions[activeVideo].slides[activeSlide].heading}
                        </h3>
                        <span className="px-2.5 py-1 text-[9px] rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono font-bold shrink-0">
                          {watchVideoSessions[activeVideo].slides[activeSlide].metric}
                        </span>
                      </div>

                      {/* Simulated Audio text segment */}
                      <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2 mt-4 relative">
                        <div className="absolute right-4 top-4 text-slate-500">
                          <Volume2 className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                          Sunil's Transcription Notes
                        </span>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic font-light font-sans">
                          {watchVideoSessions[activeVideo].slides[activeSlide].content}
                        </p>
                      </div>

                      {/* Custom Action remedy */}
                      <div className="p-4 bg-brand-teal/[0.04] rounded-xl border border-brand-teal/20 space-y-1.5 mt-4">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-brand-teal uppercase font-extrabold tracking-widest">
                          <Sparkles className="h-4 w-4 text-brand-teal" /> 
                          Systematic Framework Cure
                        </div>
                        <p className="text-white text-xs sm:text-xs font-light">
                          {watchVideoSessions[activeVideo].slides[activeSlide].remedy}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider Footer Panel Navigator */}
                <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-2">
                    {watchVideoSessions[activeVideo].slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-1.5 cursor-pointer transition-all duration-300 rounded ${
                          i === activeSlide ? "w-8 bg-brand-teal opacity-100" : "w-2 bg-white/15 hover:bg-white/30"
                        }`}
                      ></button>
                    ))}
                  </div>

                  {watchVideoSessions[activeVideo].slides.length > 1 ? (
                    <button
                      onClick={handleNextSlide}
                      className="flex items-center gap-1.5 bg-brand-teal text-brand-navy hover:bg-brand-teal/90 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>Next Slide</span>
                      <ChevronRight className="h-3.5 w-3.5 text-brand-navy" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="bg-white/10 border border-white/15 text-slate-300 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Dismiss Desk
                    </button>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
