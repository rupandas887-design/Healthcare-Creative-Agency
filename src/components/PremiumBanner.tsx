import React, { useState } from "react";
import { motion } from "motion/react";
import SurgicalJourney from "./SurgicalJourney";
import { 
  Phone, 
  Cpu, 
  Headphones, 
  UserRound, 
  ClipboardCopy, 
  CalendarCheck, 
  Activity, 
  Heart, 
  Users, 
  MessageSquare,
  Shield, 
  ArrowRight,
  TrendingUp,
  Brain,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

interface PremiumBannerProps {
  onScheduleClick: () => void;
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function PremiumBanner({ onScheduleClick, onLogEvent }: PremiumBannerProps) {
  // Journey state
  const [activeJourneyStep, setActiveJourneyStep] = useState<number | null>(null);
  
  // LEAKS VS WIN list data
  const leaksList = [
    "Missed Calls & Late Responses",
    "No Follow-up System",
    "Unqualified Enquiries",
    "Poor Patient Experience",
    "Low Conversion & Revenue"
  ];

  const winsList = [
    "95%+ Enquiry Capture Rate",
    "Systematic Counselling Follow-ups",
    "Qualified & Ready-to-Convert Patients",
    "Exceptional Patient Experience",
    "Higher Bookings & Revenue Growth"
  ];

  // Journey Steps mapping exactly to the screenshot path
  const journeySteps = [
    {
      num: "01",
      title: "PATIENT ENQUIRY",
      desc: "Multi-channel capture (Call, WhatsApp, Website, Referrals & Walk-ins)",
      icon: Phone,
      color: "from-cyan-400 to-blue-500",
      details: "Captures patient intent in real-time across channels, feeding instant routing alerts to your team."
    },
    {
      num: "02",
      title: "GROWTH TRIAGE",
      desc: "Instant intent detection & patient prioritization systems",
      icon: Cpu,
      color: "from-cyan-400 to-indigo-500",
      details: "Filters cold leads and elevates high-intent queries immediately to reduce clinical team fatigue."
    },
    {
      num: "03",
      title: "COUNSELLOR FOLLOW-UP",
      desc: "Trained team engages, educates & builds patient confidence",
      icon: Headphones,
      color: "from-blue-500 to-purple-600",
      details: "Standardized empathetic calling frameworks built with pre-admission counseling and trust-building."
    },
    {
      num: "04",
      title: "DOCTOR CONSULTATION",
      desc: "Expert consultation & pre-surgical evaluation (Virtual / In-Person)",
      icon: UserRound,
      color: "from-purple-500 to-indigo-600",
      details: "High-yield consult loops designed to maximize patient clinical understanding and reduce anxiety."
    },
    {
      num: "05",
      title: "PROCEDURE RECOMMENDATION",
      desc: "Personalized treatment plan with transparent costing",
      icon: ClipboardCopy,
      color: "from-indigo-400 to-cyan-500",
      details: "Itemized pre-admission sheets and insurance pre-approvals to clear upfront billing friction."
    },
    {
      num: "06",
      title: "BOOKING CONFIRMATION",
      desc: "Frictionless scheduling & pre-admission activation",
      icon: CalendarCheck,
      color: "from-cyan-500 to-emerald-500",
      details: "WhatsApp automated checklists and directions sent with same-day confirmation calls."
    },
    {
      num: "07",
      title: "SURGERY",
      desc: "Smooth operation with best clinical outcomes",
      icon: Activity,
      color: "from-emerald-400 to-teal-500",
      details: "Turnover-optimized hospital block scheduling to maximize theatre throughput."
    },
    {
      num: "08",
      title: "RECOVERY & FOLLOW-UP",
      desc: "Post-op care, engagement & recovery tracking",
      icon: Heart,
      color: "from-teal-400 to-cyan-400",
      details: "Automated 90-day digital wellness follow-up system keeping patient satisfaction levels stellar."
    },
    {
      num: "09",
      title: "PATIENT REVIEW & REFERRAL",
      desc: "Delighted patients become your best referral partners",
      icon: Users,
      color: "from-cyan-400 to-teal-400",
      details: "Embedded review triggers gathering high-gratitude public feedback and building clinical reputation."
    }
  ];

  // REAL RESULTS numbers
  const metricsData = [
    { label: "ENQUIRES CAPTURED", val: "4.8X", suffix: "Increase", sparkline: [10, 15, 8, 24, 30, 48] },
    { label: "CONVERSION RATE", val: "3.6X", suffix: "Increase", sparkline: [12, 11, 20, 18, 28, 36] },
    { label: "BOOKINGS", val: "4.2X", suffix: "Increase", sparkline: [5, 14, 18, 21, 35, 42] },
    { label: "SURGICAL REVENUE", val: "5.1X", suffix: "Increase", sparkline: [10, 22, 19, 32, 45, 51] }
  ];

  return (
    <section 
      id="measure-seal-scale"
      className="py-20 bg-[#030B17] relative overflow-hidden select-none px-4 md:px-8 xl:px-12 border-b border-white/5"
    >
      {/* Background Cyber Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full filter blur-[140px]" />
        <div className="absolute top-[40%] left-[45%] w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-16">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT: Headline */}
          <div className="lg:col-span-7 space-y-5 text-left pt-2">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              SURGICAL GROWTH SYSTEM
              {/* Pulsing ECG line badge asset */}
              <svg className="w-10 h-3 text-cyan-400 stroke-current fill-none" strokeWidth={1.5} viewBox="0 0 40 10">
                <path d="M0 5 L10 5 L13 2 L16 8 L18 5 L40 5" />
              </svg>
            </div>

            <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight leading-[1.15] font-display">
              We Turn Enquiries Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-black drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]">
                Confirmed Surgeries
              </span>
            </h2>

            <p className="text-slate-350 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans">
              Our proven system captures, nurtures, and converts more surgical patients—
              <span className="text-cyan-300 font-medium font-sans">consistently and predictably.</span>
            </p>
          </div>

          {/* RIGHT CONTENT: Dark Grid Pane */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-cyan-500/15 bg-[#041225]/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(3,11,23,0.8)] space-y-5 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl group-hover:bg-cyan-400/10 transition-all duration-500"></div>
              
              {/* 2x2 grid of benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-cyan-500/10">
                
                {/* Item 1 */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shadow-sm shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white uppercase block tracking-wide">Capture More Enquiries</span>
                    <span className="text-[10px] text-slate-400 block leading-tight font-sans">Never miss a patient</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shadow-sm shrink-0">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white uppercase block tracking-wide">Nurture Better Conversations</span>
                    <span className="text-[10px] text-slate-400 block leading-tight font-sans">Build trust & confidence</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shadow-sm shrink-0">
                    <CalendarCheck className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white uppercase block tracking-wide">Convert Faster Bookings</span>
                    <span className="text-[10px] text-slate-400 block leading-tight font-sans">Increase surgical intake</span>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shadow-sm shrink-0">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white uppercase block tracking-wide">Scale Higher Revenue</span>
                    <span className="text-[10px] text-slate-400 block leading-tight font-sans">Grow your hospital</span>
                  </div>
                </div>

              </div>

              {/* Ticker footer bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[9px] font-mono tracking-wider font-extrabold text-cyan-300">
                <span className="text-slate-500">➔</span>
                <span>END-TO-END SYSTEM</span>
                <span className="text-cyan-500">•</span>
                <span>DATA-DRIVEN</span>
                <span className="text-cyan-500">•</span>
                <span>SYSTEM-DRIVEN</span>
                <span className="text-cyan-500">•</span>
                <span>MEASURABLE RESULTS</span>
                <span className="text-slate-500">➔</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= THE SURGICAL PATIENT JOURNEY ================= */}
        <SurgicalJourney onLogEvent={onLogEvent} />

        {/* ================= 3-COLUMN CORE SYSTEM BLOCK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* COLUMN 1: LOSS VS WIN SPLIT GRID (5 columns) */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/10 bg-[#030F21]/70 p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.01] to-emerald-500/[0.01] pointer-events-none"></div>

            {/* Title headers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-cyan-500/10 text-left relative z-10">
              <div>
                <span className="text-[10px] font-mono font-black text-red-400 uppercase tracking-widest block mb-1">
                  STOP LOSING PATIENTS TO LEAKS
                </span>
                <span className="h-1 w-12 bg-red-500 block rounded-full"></span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest block mb-1">
                  START WINNING MORE SURGICAL PATIENTS
                </span>
                <span className="h-1 w-12 bg-emerald-500 sm:ml-auto block rounded-full"></span>
              </div>
            </div>

            {/* List block split with diagonal visual line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 items-center relative z-10">
              
              {/* Leaks column */}
              <div className="space-y-3.5 text-left">
                {leaksList.map((item, i) => (
                  <div key={i} className="flex gap-2.5 items-center">
                    <span className="h-5 w-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xs shrink-0 font-bold">
                      ×
                    </span>
                    <span className="text-xs text-slate-300 font-sans leading-tight font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* VS Divider Overlay for screens larger than mobile */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-cyan-500/10 border-dashed border-l border-cyan-500/20 hidden sm:block pointer-events-none"></div>
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-950 border border-cyan-500/30 text-[10px] font-bold text-slate-400 tracking-tight flex items-center justify-center hidden sm:flex z-20 shadow-md uppercase">
                Vs
              </div>

              {/* Wins column */}
              <div className="space-y-3.5 text-left sm:pl-4">
                {winsList.map((item, i) => (
                  <div key={i} className="flex gap-2.5 items-center">
                    <span className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <span className="text-xs text-slate-200 font-sans leading-tight font-bold">{item}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Small decorative footer */}
            <div className="pt-3 border-t border-cyan-500/5 text-center text-[9px] font-mono text-slate-500">
              ✦ HARDEN YOUR CLINICAL VALUE CHAIN AGONISTICALLY
            </div>
          </div>

          {/* COLUMN 2: REAL RESULTS, REAL GROWTH GAUGE TILE (4 columns) */}
          <div className="lg:col-span-4 rounded-2xl border border-cyan-500/10 bg-[#030F21]/70 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
              <span className="text-[10px] font-mono font-black text-cyan-400 tracking-wider uppercase block text-left">
                ✦ REAL RESULTS, REAL GROWTH
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 py-5 flex-1 items-center">
              {metricsData.map((metric) => (
                <div 
                  key={metric.label}
                  className="p-3 rounded-xl bg-slate-950/40 border border-cyan-500/5 hover:border-cyan-500/20 transition-all duration-300 text-left relative overflow-hidden group"
                >
                  <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-tight block">
                    {metric.label}
                  </span>
                  
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white font-display leading-none">
                      {metric.val}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono font-bold block uppercase leading-none">
                      {metric.suffix}
                    </span>
                  </div>

                  {/* Sparkline Canvas rendering */}
                  <div className="h-7 w-full mt-3 overflow-hidden">
                    <svg className="w-full h-full text-emerald-400 stroke-current fill-none opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} viewBox="0 0 100 25">
                      <path 
                        d={`M 0,${25 - metric.sparkline[0]} L 20,${25 - metric.sparkline[1]} L 40,${25 - metric.sparkline[2]} L 60,${25 - metric.sparkline[3]} L 80,${25 - metric.sparkline[4]} L 100,${25 - metric.sparkline[5]}`} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer tiny text */}
            <div className="text-[9px] font-mono text-slate-500 leading-tight border-t border-cyan-500/5 pt-3 text-left">
              *Results based on hospitals using our complete growth system
            </div>
          </div>

          {/* COLUMN 3: YOUR HOSPITAL NETWORK HUB (3 columns) */}
          <div className="lg:col-span-3 rounded-2xl border border-cyan-500/10 bg-[#030F21]/70 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
              <span className="text-[10px] font-mono font-black text-cyan-400 tracking-wider uppercase block text-left">
                YOUR HOSPITAL
              </span>
              <span className="text-[8px] font-mono text-slate-500 uppercase">Live Synapse</span>
            </div>

            {/* Core Neural Visualizer */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
              
              {/* SVG connection rays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path d="M 60,40 L 150,110" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 240,40 L 150,110" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 150,110 L 150,185" stroke="rgba(52, 211, 153, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Micro flowing particles */}
                <circle cx="105" cy="75" r="1.5" fill="#22d3ee" className="animate-pulse" />
                <circle cx="195" cy="75" r="1.5" fill="#22d3ee" className="animate-pulse" />
                <circle cx="150" cy="145" r="1.5" fill="#34d399" className="animate-pulse" />
              </svg>

              {/* Central Growth System block */}
              <div className="relative z-10 flex flex-col items-center space-y-5">
                
                {/* Horizontal row for Patients & Doctors nodes */}
                <div className="flex gap-16 items-center">
                  
                  {/* Patients Node */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="h-10 w-10 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                      <Users className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide">Patients</span>
                  </div>

                  {/* Doctors Node */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="h-10 w-10 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                      <UserRound className="h-4.5 w-4.5" strokeWidth={2} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide">Doctors</span>
                  </div>

                </div>

                {/* Central Growth System Hub itself */}
                <div className="h-16 w-16 rounded-full bg-[#031E3E] border-2 border-cyan-400 flex flex-col items-center justify-center text-cyan-300 relative shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <Brain className="h-6 w-6 text-cyan-300 animate-pulse" />
                  <span className="text-[7.5px] font-mono font-black text-cyan-400 tracking-wider block absolute bottom-[-18px] uppercase">
                    GROWTH SYSTEM
                  </span>
                </div>

                {/* Bottom Revenue Growth Node */}
                <div className="flex flex-col items-center space-y-1 pt-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-wide">Revenue Growth</span>
                </div>

              </div>

            </div>

            {/* Small tracking status bar */}
            <div className="pt-2 text-[8px] font-mono text-slate-500 text-center uppercase tracking-wide">
              🔒 Unified Operational Mesh
            </div>
          </div>

        </div>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <div className="rounded-2xl bg-gradient-to-r from-cyan-950/30 via-[#041630] to-indigo-950/35 border border-cyan-500/15 p-6 sm:p-8 flex flex-col xl:flex-row justify-between items-center gap-6 text-left relative overflow-hidden group">
          
          {/* Cyan Giant arrow background overlay */}
          <div className="absolute right-[-40px] top-[10%] bottom-[10%] w-[160px] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none hidden xl:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 fill-none" stroke="currentColor" strokeWidth="8">
              <path d="M10 50 h80 M60 20 l30 30 L60 80" />
            </svg>
          </div>

          {/* Left Block with Shield */}
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Shield className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-350 leading-relaxed font-sans max-w-sm">
                Build a Predictable, Scalable & Profitable Surgical Growth Engine for Your Hospital
              </p>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                Ready to Build Your <span className="text-cyan-400 font-extrabold font-sans">Predictable</span> Surgical Growth System?
              </h4>
            </div>
          </div>

          {/* Right Action Block */}
          <div className="flex flex-col items-center xl:items-end gap-2 shrink-0 w-full xl:w-auto">
            <button
              onClick={onScheduleClick}
              className="w-full xl:w-auto bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-xs tracking-widest uppercase py-4 px-8 rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(239,68,68,0.3)] transition-all hover:scale-102 active:scale-98 inline-flex items-center justify-center gap-2"
            >
              <span>REQUEST PRIVATE GROWTH AUDIT</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-slate-500 flex items-center gap-1 font-sans">
              🔒 No Obligation. 100% Confidential.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
