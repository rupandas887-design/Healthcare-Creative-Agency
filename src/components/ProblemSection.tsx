import React, { useState } from "react";
import { 
  EyeOff, 
  PhoneOff, 
  Users, 
  ShieldAlert, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Info,
  ArrowUpRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

interface ProblemSectionProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function ProblemSection({ onLogEvent }: ProblemSectionProps) {
  // Leakage calculator default inputs matching executive case numbers
  const [inquiries, setInquiries] = useState<number>(100);
  const [surgeries, setSurgeries] = useState<number>(34);
  const [avgRev, setAvgRev] = useState<number>(150000); // 1.5 Lakhs custom ticket

  const conversionRate = inquiries > 0 ? (surgeries / inquiries) * 100 : 0;
  const benchmarkRate = 54; // Elite baseline: 54% Inquiry-to-surgery conversion under Acquire OPD's operations
  
  const potentialSurgeries = Math.round(inquiries * (benchmarkRate / 100));
  const lostSurgeries = Math.max(0, potentialSurgeries - surgeries);
  const lostRevenue = lostSurgeries * avgRev;
  const leakagePercentage = Math.max(0, 100 - (conversionRate / benchmarkRate) * 100);

  const handleCalculatorChange = (type: string, value: number) => {
    if (type === "inquiries") setInquiries(value);
    if (type === "surgeries") {
      // Keep surgeries bounded to inquiries
      setSurgeries(Math.min(value, inquiries));
    }
    if (type === "avgRev") setAvgRev(value);
    onLogEvent(`Leakage Simulator Adjusted: ${type} to ${value}`, "Operations Calculator", "Dashboard Interaction");
  };

  const criticalIssues = [
    {
      icon: EyeOff,
      title: "Complete Handoff Blindness",
      desc: "Hospital boards track total advertising spend and general OPD counts, but remain entirely blind to where actual patient journeys break. Lead records evaporate inside chaotic paper schedules or unlogged reception lists.",
      metric: "ZERO METRIC TRACE",
      accent: "border-brand-teal"
    },
    {
      icon: PhoneOff,
      title: "The Diluted Counselor Syndrome",
      desc: "Patient counselors are loaded with administrative checkout paperwork, insurance claim compliance, and ward admissions. High-intensity patient callback workflows take a secondary priority.",
      metric: "72% PATIENT EXIT",
      accent: "border-brand-gold"
    },
    {
      icon: ShieldAlert,
      title: "Marketing Without Accountability",
      desc: "Traditional marketing vendors are structured around 'cost per lead' optimization. They consider their job complete when an inquiry form is sent, passing unvetted lists down to overstretched, non-salaried medical staffs.",
      metric: "RAW LIST CLUTTER",
      accent: "border-brand-navy"
    },
    {
      icon: Users,
      title: "Clinical & Frontdesk Silos",
      desc: "Clinical advisors, registration desks, and operative surgeons reside in split, disconnected functional orbits. Leads given by doctors do not link back to prompt pre-emptive booking sequences.",
      metric: "SILOED SYSTEMS",
      accent: "border-slate-300"
    }
  ];

  return (
    <section 
      id="problem-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Title / Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-teal font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold block">
            THE CHRONIC DIAGNOSIS
          </span>
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            The Silent Leaks Within Surgical Hospital Operations
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Many surgeon-owned clinics believe their core challenge is lack of patient inquiries. In reality, their marketing spend is being dumped into a leaky container. True practices do not grow by buying more leads, but by sealing the operational loops.
          </p>
        </div>

        {/* 4 Premium Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {criticalIssues.map((issue, idx) => {
            const Icon = issue.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.015, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-sm relative group overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Accent Gold top bar on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-brand-teal transition-all"></div>
                
                {/* Floating Metric tag */}
                <span className="absolute top-6 right-6 font-mono text-[9px] font-extrabold text-slate-350 bg-white/5 border border-white/15 px-2.5 py-1 rounded group-hover:border-brand-teal/30 group-hover:text-brand-teal transition-colors">
                  {issue.metric}
                </span>

                <div className="space-y-4 text-left">
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="h-11 w-11 rounded-xl bg-brand-teal flex items-center justify-center text-brand-navy border border-brand-teal"
                  >
                    <Icon className="h-5 w-5 text-brand-navy font-bold" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-brand-teal transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High-End Diagnostic Calculator Widget (Main Interactive Module) */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 shadow-xl p-6 md:p-10 space-y-8 relative overflow-hidden" id="leakage-calculator">
          
          {/* Subtle gold decoration logo background */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-gold/[0.03] rounded-full pointer-events-none"></div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-extrabold flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5 text-brand-gold animate-spin-slow" />
                Hospital Practice Math Sandbox
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white font-display">
                Interactive Case Leakage Estimator
              </h3>
              <p className="text-slate-350 font-light text-xs max-w-xl">
                Slide the operational meters below to diagnose how many surgery admissions are slipping past your administrative queue, and uncover the financial margins at stake.
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-mono inline-flex items-center gap-1.5 shrink-0 self-start md:self-center">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping"></span>
              <span>CALCULATION ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* LEFT SIDE: Active Sliders Controls */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Input Item 1 */}
              <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-brand-teal rounded-full shrink-0"></span>
                    Monthly Inquiries
                  </span>
                  <span className="font-mono text-brand-teal font-extrabold text-xs px-2.5 py-0.5 rounded bg-brand-navy shadow-xs border border-white/10">
                    {inquiries} leads
                  </span>
                </div>
                
                <input
                  type="range"
                  min="30"
                  max="1200"
                  step="10"
                  value={inquiries}
                  onChange={(e) => handleCalculatorChange("inquiries", parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                
                <p className="text-[10px] text-slate-300 leading-normal">
                  Total online forms, clinical walk-ins, phone callbacks, and referral drop-ins.
                </p>
              </div>

              {/* Input Item 2 */}
              <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-brand-teal rounded-full shrink-0"></span>
                    Realized Procedures
                  </span>
                  <span className="font-mono text-white font-extrabold text-xs px-2.5 py-0.5 rounded bg-brand-navy shadow-xs border border-white/10">
                    {surgeries} surgeries
                  </span>
                </div>
                
                <input
                  type="range"
                  min="2"
                  max={Math.min(250, inquiries)}
                  step="1"
                  value={surgeries}
                  onChange={(e) => handleCalculatorChange("surgeries", parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                />
                
                <p className="text-[10px] text-slate-300 leading-normal">
                  Actual completed procedures that reached the OT (Operating Theater) inside 30 days.
                </p>
              </div>

              {/* Input Item 3 */}
              <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-brand-teal rounded-full shrink-0"></span>
                    Avg Procedure Ticket
                  </span>
                  <span className="font-mono text-brand-gold font-extrabold text-xs px-2.5 py-0.5 rounded bg-brand-navy shadow-xs border border-white/10">
                    ₹{(avgRev / 1000).toFixed(0)}K Lakhs
                  </span>
                </div>
                
                <input
                  type="range"
                  min="40000"
                  max="450000"
                  step="5000"
                  value={avgRev}
                  onChange={(e) => handleCalculatorChange("avgRev", parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                
                <p className="text-[10px] text-slate-300 leading-normal">
                  Average surgical billing package (Consultation, OT charges, ward stay, materials).
                </p>
              </div>

            </div>

            {/* RIGHT SIDE: High-Impact Medical Accounting Panel */}
            <div className="lg:col-span-7 rounded-2xl bg-white/[0.03] text-white p-6 sm:p-8 flex flex-col justify-between relative shadow-inner overflow-hidden border border-white/10">
              
              {/* Subtle visual grid inside output */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase font-bold">
                    PREIMIUM METRICS DASHBOARD
                  </span>
                  
                  <span className="text-[9px] font-mono bg-white/10 text-white border border-white/15 px-2.5 py-0.5 rounded">
                    Audit Baseline: 54.0% Yield
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current yield */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">
                      Practice Conversion Yield
                    </span>
                    <div className="text-2xl font-black text-brand-teal mt-1">
                      <AnimatedCounter value={conversionRate} formatter={(v) => `${v.toFixed(1)}%`} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">
                      General sector baseline sits at 8% – 12%
                    </span>
                  </div>

                  {/* Leaked Admissions */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">
                      Leaked Surgical Admissions
                    </span>
                    <div className="text-2xl font-black text-brand-gold mt-1">
                      -<AnimatedCounter value={lostSurgeries} /> <span className="text-xs font-normal text-slate-300">lost / mo</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">
                      Compared to Acquire OPD's optimized standard blueprint
                    </span>
                  </div>
                </div>

                {/* Primary Financial Leak Calculation Box */}
                <div className="p-5 rounded-xl bg-slate-950/40 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-brand-teal uppercase font-bold tracking-wider flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-rose-400" />
                      Monthly Capital Leakage Loss
                    </span>
                    <span className="text-brand-gold font-extrabold uppercase">
                      CRITICAL METRIC HIGH
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-1 text-left">
                    <div className="text-3xl font-bold font-mono tracking-tight text-white">
                      ₹<AnimatedCounter value={lostRevenue} formatter={(v) => Math.round(v).toLocaleString("en-IN")} />
                    </div>
                    <div className="text-xs font-mono text-brand-gold font-bold">
                      ₹<AnimatedCounter value={lostRevenue * 12 / 10000000} duration={600} formatter={(v) => v.toFixed(2)} /> Crores / Year
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 pt-2 border-t border-white/10 mt-2 leading-relaxed">
                    This silent leak represents cash flow already generated by your prestige, but thrown away due to front-desk response slips, lack of counseling follow-up, and absent metric accountability.
                  </p>
                </div>

              </div>

              {/* Action and feedback footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/10 relative z-10">
                <div className="text-[10px] text-slate-400 leading-tight">
                  Let’s deploy Acquire OPD's operational audit frameworks to recover this margin.
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById("booking-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    onLogEvent("Calculator Diagnostic Callout Triggered", "Surgical Math", "Booking Navigation");
                  }}
                  className="bg-brand-teal hover:bg-brand-teal/95 text-brand-navy text-[10px] font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all self-start cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>Request Full Pipeline Diagnostic</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
