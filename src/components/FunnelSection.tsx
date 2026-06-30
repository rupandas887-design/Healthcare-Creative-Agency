import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Layers, 
  Activity, 
  Clock, 
  Cpu, 
  Filter, 
  Star,
  Users,
  Volume2,
  MessageSquare,
  Shield,
  ClipboardList,
  ChevronRight,
  RefreshCw,
  Play,
  Pause,
  Brain,
  ShieldAlert,
  Server,
  Zap,
  Globe,
  Database,
  Search,
  Bell
} from "lucide-react";

interface FunnelSectionProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

interface StageDetail {
  index: number;
  label: string;
  subLabel: string;
  iconName: string;
  leakage: string;
  countermeasure: string;
  outcome: string;
  aiPrediction: number;
  vitals: {
    hr: string;
    load: string;
    flow: string;
  };
  metrics: {
    conv: string;
    convDelta: string;
    flow: string;
    flowDelta: string;
    surgeries: string;
    surgeriesDelta: string;
    noshow: string;
    noshowDelta: string;
  };
  funnelData: {
    visitors: number;
    leads: number;
    consultations: number;
    surgeries: number;
  };
}

export default function FunnelSection({ onLogEvent }: FunnelSectionProps) {
  const [activeIndex, setActiveIndex] = useState(4); // Default to Step 05 "Patient Habits" like screenshot
  const [isPlaying, setIsPlaying] = useState(true);
  const [appliedCountermeasures, setAppliedCountermeasures] = useState<Record<number, boolean>>({});
  const [activeIntegration, setActiveIntegration] = useState<string>("EHR");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // 10 high-fidelity stages of Sunil's Surgical Practice Growth System
  const stages: StageDetail[] = [
    {
      index: 1,
      label: "Patient Acquisition",
      subLabel: "Multi-channel patient acquisition campaigns and outreach.",
      iconName: "users",
      leakage: "Leakage point: Delayed lead attribution resulting in cold clinical sales queues.",
      countermeasure: "Establish automated 5-minute SLAs and rapid inbound patient queue routing.",
      outcome: "Direct Channels: 100% verified qualified patients instantly matched with counselors.",
      aiPrediction: 94,
      vitals: { hr: "88 bpm", load: "24%", flow: "1.2 GB/s" },
      metrics: {
        conv: "62.1%", convDelta: "↑ 8.4%",
        flow: "210", flowDelta: "↑ 5.2%",
        surgeries: "1,110", surgeriesDelta: "↑ 12.5%",
        noshow: "8.4%", noshowDelta: "↓ 10.2%"
      },
      funnelData: { visitors: 14500, leads: 5200, consultations: 2100, surgeries: 1110 }
    },
    {
      index: 2,
      label: "Patient Channels",
      subLabel: "Website, WhatsApp, Call, Referrals and Partner Networks.",
      iconName: "volume2",
      leakage: "High ad spend dependency on generalized, low-intent clinical keywords.",
      countermeasure: "Direct patient intent campaigns mapping precise treatment and procedure searches.",
      outcome: "High-yield landing experience with instant WhatsApp and direct specialist booking lines.",
      aiPrediction: 89,
      vitals: { hr: "91 bpm", load: "28%", flow: "1.5 GB/s" },
      metrics: {
        conv: "65.4%", convDelta: "↑ 9.1%",
        flow: "245", flowDelta: "↑ 6.3%",
        surgeries: "1,132", surgeriesDelta: "↑ 13.1%",
        noshow: "7.9%", noshowDelta: "↓ 11.5%"
      },
      funnelData: { visitors: 13900, leads: 5050, consultations: 2180, surgeries: 1132 }
    },
    {
      index: 3,
      label: "Patient Constants",
      subLabel: "Pre-consultation engagement and patient nurturing.",
      iconName: "messagesquare",
      leakage: "Patient drop-offs between registration and clinical consult due to low trust.",
      countermeasure: "Deploy clinical video micro-briefs and patient transformation proof catalogs.",
      outcome: "Elevated consultation attendance rates and upfront clinical authority.",
      aiPrediction: 91,
      vitals: { hr: "95 bpm", load: "32%", flow: "2.1 GB/s" },
      metrics: {
        conv: "71.2%", convDelta: "↑ 10.5%",
        flow: "280", flowDelta: "↑ 7.4%",
        surgeries: "1,195", surgeriesDelta: "↑ 15.6%",
        noshow: "6.2%", noshowDelta: "↓ 12.1%"
      },
      funnelData: { visitors: 13100, leads: 4990, consultations: 2240, surgeries: 1195 }
    },
    {
      index: 4,
      label: "Patient Growth",
      subLabel: "Increase consultation bookings and patient trust.",
      iconName: "trendingup",
      leakage: "Inefficient front-office dispatching and lack of structured call frameworks.",
      countermeasure: "Centralize the dispatcher system with highly trained surgical coordinator scripts.",
      outcome: "Conversion of casual OPD visitors into booked and pre-cleared surgery prospects.",
      aiPrediction: 88,
      vitals: { hr: "96 bpm", load: "34%", flow: "2.3 GB/s" },
      metrics: {
        conv: "74.8%", convDelta: "↑ 11.9%",
        flow: "298", flowDelta: "↑ 7.9%",
        surgeries: "1,210", surgeriesDelta: "↑ 16.8%",
        noshow: "5.5%", noshowDelta: "↓ 12.4%"
      },
      funnelData: { visitors: 12600, leads: 4985, consultations: 2310, surgeries: 1210 }
    },
    {
      index: 5,
      label: "Patient Habits",
      subLabel: "Pre-surgical preparation, education and compliance tracking.",
      iconName: "activity",
      leakage: "No-shows on scheduled outpatient appointments and reviews.",
      countermeasure: "WhatsApp pre-admission brief with automated directions and checklist.",
      outcome: "Secured clinic attendance and reduced clinic blockages.",
      aiPrediction: 92,
      vitals: { hr: "98 bpm", load: "36%", flow: "2.4 GB/s" },
      metrics: {
        conv: "78.4%", convDelta: "↑ 12.6%",
        flow: "312", flowDelta: "↑ 8.3%",
        surgeries: "1,245", surgeriesDelta: "↑ 18.7%",
        noshow: "4.7%", noshowDelta: "↓ 12.8%"
      },
      funnelData: { visitors: 12450, leads: 4982, consultations: 2341, surgeries: 1245 }
    },
    {
      index: 6,
      label: "Countermeasure",
      subLabel: "Identify risks and implement preventive actions.",
      iconName: "shield",
      leakage: "Insurance clearance and billing friction triggering defensive cancellations.",
      countermeasure: "Provide itemized pre-admission cost calculations and digital pre-auth support.",
      outcome: "Surgical cases locked in with 95% upfront financial transparency.",
      aiPrediction: 95,
      vitals: { hr: "102 bpm", load: "41%", flow: "2.8 GB/s" },
      metrics: {
        conv: "81.0%", convDelta: "↑ 13.4%",
        flow: "320", flowDelta: "↑ 8.8%",
        surgeries: "1,268", surgeriesDelta: "↑ 19.1%",
        noshow: "3.9%", noshowDelta: "↓ 13.5%"
      },
      funnelData: { visitors: 12100, leads: 4950, consultations: 2390, surgeries: 1268 }
    },
    {
      index: 7,
      label: "Registration",
      subLabel: "Streamlined registration and documentation.",
      iconName: "clipboardlist",
      leakage: "Cumbersome hospital admission queues causing same-day surgical friction.",
      countermeasure: "Install fast-track digital registration workflows and pre-admit clearing lanes.",
      outcome: "Zero lobby wait time; direct admission from lobby to preoperative bed.",
      aiPrediction: 97,
      vitals: { hr: "99 bpm", load: "38%", flow: "2.6 GB/s" },
      metrics: {
        conv: "85.3%", convDelta: "↑ 14.2%",
        flow: "335", flowDelta: "↑ 9.2%",
        surgeries: "1,290", surgeriesDelta: "↑ 19.8%",
        noshow: "3.1%", noshowDelta: "↓ 14.1%"
      },
      funnelData: { visitors: 11800, leads: 4920, consultations: 2410, surgeries: 1290 }
    },
    {
      index: 8,
      label: "Term Hurdles",
      subLabel: "Insurance, finance & admin clearance optimisation.",
      iconName: "clock",
      leakage: "Operating theatre delay and inefficient turnover between surgery cases.",
      countermeasure: "Establish lean surgical turnover protocols and real-time anesthesia tracking.",
      outcome: "Maximized theater output with 30-minute block-to-block turnaround.",
      aiPrediction: 90,
      vitals: { hr: "94 bpm", load: "35%", flow: "2.2 GB/s" },
      metrics: {
        conv: "88.1%", convDelta: "↑ 14.9%",
        flow: "348", flowDelta: "↑ 9.5%",
        surgeries: "1,315", surgeriesDelta: "↑ 20.4%",
        noshow: "2.5%", noshowDelta: "↓ 14.8%"
      },
      funnelData: { visitors: 11500, leads: 4890, consultations: 2435, surgeries: 1315 }
    },
    {
      index: 9,
      label: "Patient Development",
      subLabel: "Post-surgery follow-up and recovery tracking.",
      iconName: "activity",
      leakage: "Post-discharge patient abandonment resulting in poor referral reviews.",
      countermeasure: "Deploy an automated 90-day digital wellness follow-up pathway.",
      outcome: "Active patient satisfaction tracking and secondary review triggers.",
      aiPrediction: 93,
      vitals: { hr: "92 bpm", load: "33%", flow: "2.0 GB/s" },
      metrics: {
        conv: "91.2%", convDelta: "↑ 15.5%",
        flow: "352", flowDelta: "↑ 9.8%",
        surgeries: "1,340", surgeriesDelta: "↑ 21.0%",
        noshow: "1.9%", noshowDelta: "↓ 15.2%"
      },
      funnelData: { visitors: 11200, leads: 4850, consultations: 2460, surgeries: 1340 }
    },
    {
      index: 10,
      label: "Patient Acquisition",
      subLabel: "Surgery confirmation & final conversion.",
      iconName: "checkcircle",
      leakage: "Hospitals depending on passive, organic patient recommendations.",
      countermeasure: "Launch Sunil's embedded high-gratitude digital patient review loop.",
      outcome: "Sustained clinical digital authority with 4.9-star public trust rating.",
      aiPrediction: 98,
      vitals: { hr: "90 bpm", load: "30%", flow: "1.8 GB/s" },
      metrics: {
        conv: "94.6%", convDelta: "↑ 16.3%",
        flow: "360", flowDelta: "↑ 10.4%",
        surgeries: "1,380", surgeriesDelta: "↑ 22.1%",
        noshow: "1.2%", noshowDelta: "↓ 15.8%"
      },
      funnelData: { visitors: 11000, leads: 4800, consultations: 2500, surgeries: 1380 }
    }
  ];

  // Auto-simulation step sequence loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = stages[activeIndex];

  const handleStageSelect = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
    onLogEvent(`Simulator Stage Manual Jump: Step ${index + 1} (${stages[index].label})`, "Interactions", `Simulator Console`);
  };

  const handleApplyCountermeasure = (index: number) => {
    setAppliedCountermeasures(prev => ({
      ...prev,
      [index]: true
    }));
    onLogEvent(`Countermeasure Armed: ${stages[index].countermeasure}`, "Simulator Actions", `Armed Countermeasure`);
  };

  const getStageIcon = (name: string, sizeClass = "w-6 h-6", active = false) => {
    const strokeColor = active ? "stroke-cyan-400" : "stroke-slate-500";
    switch (name) {
      case "users":
        return <Users className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "volume2":
        return <Volume2 className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "messagesquare":
        return <MessageSquare className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "trendingup":
        return <TrendingUp className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "activity":
        return <Activity className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "shield":
        return <Shield className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "clipboardlist":
        return <ClipboardList className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "clock":
        return <Clock className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      case "checkcircle":
        return <CheckCircle2 className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
      default:
        return <Activity className={`${sizeClass} ${strokeColor}`} strokeWidth={1.5} />;
    }
  };

  return (
    <section 
      id="funnel-section" 
      className="py-16 bg-[#030B17] border-t border-b border-white/10 px-4 md:px-8 xl:px-12 scroll-mt-24 relative overflow-hidden select-none"
    >
      {/* Background Neon Sci-Fi Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[25%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-[140px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[700px] h-[700px] bg-indigo-500/5 rounded-full filter blur-[160px]" />
        <div className="absolute inset-0 bg-[#030B17]/95" />
      </div>

      <div className="max-w-[1720px] mx-auto relative z-10 space-y-8">
        
        {/* ================= STUNNING FULL-WIDTH CONSOLE GRID ================= */}
        <div className="w-full rounded-2xl border border-cyan-500/15 bg-[#030F21]/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(3,11,23,0.9)] overflow-hidden flex flex-col lg:flex-row min-h-[920px]">
          
          {/* 1. LEFT SIDEBAR PANEL: SYSTEM NAVIGATION */}
          <div className="w-full lg:w-[260px] bg-[#020A16] border-r border-cyan-500/10 p-5 flex flex-col justify-between shrink-0 space-y-8">
            
            <div className="space-y-8">
              {/* Launcher/Branding logo */}
              <div className="flex items-center gap-3 border-b border-cyan-500/10 pb-5">
                <div className="relative h-10 w-10 flex items-center justify-center">
                  {/* Glowing 3D hexagon stack */}
                  <div className="absolute inset-0 rounded bg-cyan-400/10 border border-cyan-400/40 transform rotate-45 animate-spin-slow"></div>
                  <div className="absolute inset-1.5 rounded bg-cyan-500/20 border border-cyan-300/30 transform -rotate-12"></div>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 relative z-10 fill-none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="8.5" x2="22" y2="15.5" />
                    <line x1="2" y1="15.5" x2="22" y2="8.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-[13px] tracking-tight leading-none uppercase">SUNIL&apos;S ORBIT</h4>
                  <span className="text-[9px] font-mono tracking-widest text-cyan-400/60 uppercase font-bold block mt-1">Surgical Console</span>
                </div>
              </div>

              {/* Sidebar Menu options */}
              <div className="space-y-1.5">
                <span className="text-[8px] font-mono font-extrabold tracking-widest text-slate-500 uppercase block px-2.5 mb-2">OPERATIONAL CONSOLE</span>
                
                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold font-sans tracking-wide transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <div className="flex items-center gap-2.5">
                    <Server className="h-4 w-4 stroke-cyan-300" strokeWidth={2} />
                    <span>Simulator</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Analytics", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <TrendingUp className="h-4 w-4 stroke-slate-500" />
                  <span>Analytics</span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Patients", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <Users className="h-4 w-4 stroke-slate-500" />
                  <span>Patients</span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Growth", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <Activity className="h-4 w-4 stroke-slate-500" />
                  <span>Growth</span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Reports", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <ClipboardList className="h-4 w-4 stroke-slate-500" />
                  <span>Reports</span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Settings", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <Filter className="h-4 w-4 stroke-slate-500" />
                  <span>Settings</span>
                </button>

                <button 
                  onClick={() => onLogEvent("Sidebar Click: Integrations", "Navigation", "Simulator Side Rail")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium font-sans tracking-wide transition-all text-left"
                >
                  <Layers className="h-4 w-4 stroke-slate-500" />
                  <span>Integrations</span>
                </button>
              </div>

              {/* Sunil's Brain AI Core Widget */}
              <div className="p-4 rounded-xl border border-cyan-500/10 bg-[#03132B]/60 space-y-3 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl group-hover:bg-cyan-400/10 transition-all duration-500"></div>
                <div className="flex items-center gap-2 border-b border-cyan-500/5 pb-2">
                  <Brain className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-wider font-extrabold text-cyan-300 uppercase">AI INSIGHTS</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-bold text-slate-500 uppercase block">Powered by Sunil&apos;s AI</span>
                  <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                    Surgical coordinator conversion probability optimizes by <strong className="text-emerald-400">+18%</strong> when pre-admission SLAs are strictly kept under 5 minutes.
                  </p>
                </div>
                {/* Visual brain neuron pulsing SVG graphic matching the screenshot */}
                <div className="h-10 w-full flex items-center justify-center opacity-70">
                  <svg className="w-full h-full text-cyan-400/40 fill-none" viewBox="0 0 100 30">
                    <path d="M10,15 C25,5 30,25 50,15 C70,5 75,25 90,15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="10" cy="15" r="3" className="fill-cyan-400 text-cyan-400 animate-ping" />
                    <circle cx="50" cy="15" r="3.5" className="fill-cyan-300" />
                    <circle cx="90" cy="15" r="3" className="fill-cyan-400 text-cyan-400 animate-ping" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sidebar bottom action card */}
            <div className="pt-4 border-t border-cyan-500/10">
              <button 
                onClick={() => {
                  const el = document.getElementById("booking-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  onLogEvent("Private Audit Triggered from Side Menu", "Conversion", "Simulator Sidebar Button");
                }}
                className="w-full py-3 px-4 rounded bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer text-center shadow-[0_4px_15px_rgba(239,68,68,0.25)] flex items-center justify-center gap-2"
              >
                <span>BOOK FREE AUDIT</span>
                <span className="text-xs">➔</span>
              </button>
            </div>

          </div>

          {/* 2. MAIN SIMULATOR INNER WORKSPACE */}
          <div className="flex-1 bg-[#030F21]/30 p-6 flex flex-col justify-between space-y-6">
            
            {/* WORKSPACE HEADER STATS BAR */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-cyan-500/10 pb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none uppercase flex items-center gap-2 font-display">
                  <span>SYSTEM SIMULATOR CONSOLE // INTERACTIVE</span>
                  <span className="text-cyan-400 text-xs font-mono font-bold tracking-widest bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">BETA v3.1</span>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-sans font-light mt-1.5">
                  AI-Powered Surgical Growth System Simulator. Interact with clinical nodes to map active patient flows.
                </p>
              </div>

              {/* Status and integrations */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Live System Status panel */}
                <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-950/50 border border-cyan-500/10 rounded-lg">
                  <div className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold leading-none">LIVE SYSTEM STATUS</span>
                    <span className="text-[10px] font-bold text-slate-300 leading-none block mt-0.5">All Systems Operational</span>
                  </div>
                  {/* Miniature pulse ECG line */}
                  <svg className="w-12 h-6 text-emerald-400 stroke-current fill-none ml-2" strokeWidth={1.5} viewBox="0 0 50 20">
                    <path d="M0 10 L15 10 L18 5 L21 15 L24 10 L50 10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Data Integrations panel */}
                <div className="flex items-center gap-2 bg-slate-950/50 border border-cyan-500/10 p-1.5 rounded-lg">
                  <span className="text-[8px] font-mono text-slate-500 font-extrabold uppercase px-2">DATA INTEGRATIONS:</span>
                  <div className="flex gap-1">
                    {["EHR", "Marketing", "Scheduler"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveIntegration(item);
                          onLogEvent(`Simulator Integration Sync: ${item}`, "Interactions", `Simulator Header Sync`);
                        }}
                        className={`px-3 py-1 text-[9px] font-mono uppercase font-black tracking-wider border rounded transition-all ${
                          activeIntegration === item
                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                            : "bg-black/30 border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* THREE-COLUMN SIMULATOR CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* ================= COLUMN 1 (4 cols): SURGICAL GROWTH FLOW LIST ================= */}
              <div className="lg:col-span-4 space-y-3.5 flex flex-col">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 text-xs font-bold font-mono">⌖</span>
                    <span className="text-[10px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">SURGICAL GROWTH SYSTEM FLOW</span>
                  </div>
                  {/* Play/Pause simulations */}
                  <button 
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      onLogEvent(isPlaying ? "Paused simulator autoplay" : "Started simulator autoplay", "Interactions", "Simulator Autoplay Trigger");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#010915] border border-cyan-500/15 text-cyan-400 hover:text-cyan-300 transition-all text-[9px] font-mono font-bold"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-2.5 w-2.5 text-cyan-400" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-2.5 w-2.5 text-cyan-400 fill-current" />
                        <span>PLAY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 10 Step Stack List with Neon highlights */}
                <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                  {stages.map((stage, idx) => {
                    const isActive = idx === activeIndex;
                    const isCompleted = idx < activeIndex;

                    return (
                      <div
                        key={stage.index}
                        onClick={() => handleStageSelect(idx)}
                        className={`relative flex items-center justify-between p-3.5 rounded-lg border transition-all duration-300 cursor-pointer group ${
                          isActive
                            ? "bg-cyan-500/5 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/20"
                            : "bg-[#020A16]/80 border-cyan-500/5 hover:border-cyan-500/20 hover:bg-cyan-500/[0.01]"
                        }`}
                      >
                        {/* Selected background glow accent line */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-l-lg"></div>
                        )}

                        <div className="flex items-center gap-3.5 text-left pl-1">
                          {/* Checked indicator of completed vs current */}
                          <div>
                            {isCompleted ? (
                              <CheckCircle2 className="h-4.5 w-4.5 stroke-emerald-400 fill-emerald-500/10 shrink-0" strokeWidth={2} />
                            ) : isActive ? (
                              <div className="relative flex items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative h-4.5 w-4.5 rounded-full border border-cyan-400 bg-cyan-950/60 flex items-center justify-center font-mono text-[8px] text-cyan-400 font-bold shrink-0">
                                  ●
                                </span>
                              </div>
                            ) : (
                              <div className="h-4.5 w-4.5 rounded-full border border-slate-700 bg-transparent shrink-0"></div>
                            )}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-mono font-bold ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                                {stage.index.toString().padStart(2, '0')}
                              </span>
                              <span className={`text-xs font-bold font-sans ${isActive ? "text-white" : "text-slate-400"}`}>
                                {stage.label}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-sans leading-tight line-clamp-1 group-hover:text-slate-400 transition-colors">
                              {stage.subLabel}
                            </p>
                          </div>
                        </div>

                        {/* Audio Waveform visual effect inside active step item */}
                        {isActive && (
                          <div className="flex items-end gap-[2px] h-3 ml-2 shrink-0 pr-1">
                            <span className="w-[2px] bg-cyan-400 h-2 rounded-full animate-pulse" style={{ animationDuration: "0.8s" }}></span>
                            <span className="w-[2px] bg-cyan-400 h-3 rounded-full animate-pulse" style={{ animationDuration: "1s" }}></span>
                            <span className="w-[2px] bg-cyan-400 h-1.5 rounded-full animate-pulse" style={{ animationDuration: "0.6s" }}></span>
                            <span className="w-[2px] bg-cyan-400 h-2.5 rounded-full animate-pulse" style={{ animationDuration: "1.2s" }}></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ================= COLUMN 2 (3 cols): THE CENTRAL HOLOGRAPHIC SPINE ================= */}
              <div className="lg:col-span-3 flex flex-col items-center justify-between py-2 relative z-10 border-l border-r border-cyan-500/10 min-h-[600px]">
                
                <div className="text-center w-full">
                  <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-4">HOLOGRAPHIC SPINE</span>
                </div>

                {/* Vertical dash lines with glow effect */}
                <div className="absolute top-12 bottom-44 w-[1px] bg-gradient-to-b from-cyan-500/30 via-cyan-400/10 to-cyan-500/30 border-dashed border-l border-cyan-500/20 z-0"></div>

                {/* Vertical stacked nodes aligned vertically */}
                <div className="flex-1 flex flex-col items-center justify-between py-1.5 w-full relative z-10 space-y-4 mb-6">
                  {stages.map((stage, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={stage.index}
                        onClick={() => handleStageSelect(idx)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300 relative z-10 ${
                          isActive
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-115 ring-2 ring-cyan-400/30"
                            : "bg-[#020A16] border-slate-800 text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400"
                        }`}
                      >
                        {getStageIcon(stage.iconName, "w-4 h-4", isActive)}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping opacity-75"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* AI Prediction Bubble Floating Context widget */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -10, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-[-45px] top-[40%] bg-slate-950/90 border border-cyan-500/20 p-3 rounded-lg shadow-xl z-20 w-[125px] text-left pointer-events-auto"
                  >
                    <div className="flex justify-between items-center border-b border-cyan-500/10 pb-1 mb-1.5">
                      <span className="text-[7.5px] font-mono text-cyan-400 tracking-wider font-extrabold uppercase">AI PREDICTION</span>
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 block leading-tight">SUCCESS PROBABILITY</span>
                    
                    <div className="flex items-center gap-2 mt-1">
                      {/* Radial circular mini loader progress gauge */}
                      <div className="relative h-9 w-9 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="18" cy="18" r="14" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2.5" fill="transparent" />
                          <circle cx="18" cy="18" r="14" stroke="#22d3ee" strokeWidth="2.5" fill="transparent"
                            strokeDasharray={88}
                            strokeDashoffset={88 - (88 * activeStage.aiPrediction) / 100}
                          />
                        </svg>
                        <span className="absolute text-[8px] font-mono font-black text-cyan-400">{activeStage.aiPrediction}%</span>
                      </div>
                      <div className="leading-tight">
                        <span className="text-[10px] font-bold text-slate-200 block">High</span>
                        <span className="text-[7px] font-mono text-slate-500 uppercase block">Probability</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 3D Holographic Projector base with Upward Projection Rings matching screenshot */}
                <div className="w-full relative h-36 flex items-center justify-center select-none overflow-hidden mt-2 z-0">
                  <div className="absolute bottom-1 w-44 h-16 bg-gradient-to-t from-cyan-500/25 to-transparent rounded-full blur-xl transform scale-y-40"></div>
                  {/* Concentric rings scaling/fading */}
                  <div className="absolute bottom-4 flex flex-col items-center justify-center">
                    {Array.from({ length: 4 }).map((_, rIdx) => (
                      <motion.div
                        key={rIdx}
                        className="absolute rounded-full border border-cyan-400/40"
                        style={{
                          width: `${60 + rIdx * 35}px`,
                          height: `${30 + rIdx * 17}px`,
                          transform: "scaleY(0.48)"
                        }}
                        animate={{
                          opacity: [0.15, 0.5, 0.15],
                          scale: [1, 1.05, 1],
                          borderWidth: ["1px", "1.5px", "1px"]
                        }}
                        transition={{
                          duration: 3 + rIdx * 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                    {/* Glowing upwards pillar light */}
                    <div className="absolute bottom-1 w-20 h-44 bg-gradient-to-t from-cyan-400/10 via-cyan-500/[0.02] to-transparent blur-md"></div>
                  </div>
                  <span className="absolute bottom-0 text-[7px] font-mono tracking-widest text-cyan-400/60 uppercase font-bold">HOLOGRAPHIC FIELD PROJECTION</span>
                </div>

              </div>

              {/* ================= COLUMN 3 (5 cols): FLOW ANALYSIS + METRICS ================= */}
              <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
                
                {/* 3A. ACTIVE FLOW ANALYSIS (Drives leakage & Sunil's solutions) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-cyan-400" />
                      <span className="text-[10px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">ACTIVE FLOW ANALYSIS</span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {/* CARD A: CRITICAL COMMON LEAK */}
                      <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/10 backdrop-blur-sm relative overflow-hidden flex items-start gap-4 shadow-md">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-600 rounded-r-xl"></div>
                        <div className="p-2 rounded-lg bg-red-500/15 text-red-400 shrink-0">
                          <AlertTriangle className="h-4.5 w-4.5 stroke-red-400" />
                        </div>
                        <div className="space-y-1.5 text-left flex-1 pr-2">
                          <span className="text-[9px] font-mono font-black tracking-widest text-red-400 uppercase block">CRITICAL COMMON LEAKAGE</span>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans">
                            {activeStage.leakage}
                          </p>
                          <div className="flex items-center justify-between pt-1.5">
                            <span className="text-[9px] text-red-400/70 font-mono">Status: Extreme Leakage</span>
                            {/* Alert sparkline */}
                            <svg viewBox="0 0 100 20" className="w-16 h-5 text-red-400">
                              <path d="M0 15 L20 10 L40 18 L60 5 L80 12 L100 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                              <circle cx="60" cy="5" r="2.5" className="fill-red-500 animate-pulse" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* CARD B: SUNIL'S SYSTEM COUNTERMEASURE */}
                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-sm relative overflow-hidden flex items-start gap-4 shadow-md">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-r-xl"></div>
                        <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 shrink-0">
                          <CheckCircle2 className="h-4.5 w-4.5 stroke-emerald-400" />
                        </div>
                        <div className="space-y-1.5 text-left flex-1 pr-2">
                          <span className="text-[9px] font-mono font-black tracking-widest text-emerald-400 uppercase block">SUNIL&apos;S SYSTEM COUNTERMEASURE</span>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans">
                            {activeStage.countermeasure}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            {appliedCountermeasures[activeIndex] ? (
                              <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-1">
                                ✦ COUNTERMEASURE DEPLOYED
                              </span>
                            ) : (
                              <button
                                onClick={() => handleApplyCountermeasure(activeIndex)}
                                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded transition-all cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                              >
                                APPLY COUNTERMEASURE
                              </button>
                            )}

                            <span className="text-[8px] font-mono text-slate-500 uppercase">Impact: +75% Efficiency</span>
                          </div>
                        </div>
                      </div>

                      {/* CARD C: TARGET OUTCOME */}
                      <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#031D3A]/40 backdrop-blur-sm relative overflow-hidden flex items-start gap-4 shadow-md">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-600 rounded-r-xl"></div>
                        <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 shrink-0">
                          <Target className="h-4.5 w-4.5 stroke-cyan-400" />
                        </div>
                        <div className="space-y-1.5 text-left flex-1 pr-2">
                          <span className="text-[9px] font-mono font-black tracking-widest text-cyan-400 uppercase block">TARGET OUTCOME</span>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans font-bold">
                            {activeStage.outcome}
                          </p>
                          {/* Mini outcome bar graph representation */}
                          <div className="flex items-end justify-between h-4 w-20 pt-1">
                            <div className="w-1.5 bg-cyan-500/30 h-[20%] rounded-xs"></div>
                            <div className="w-1.5 bg-cyan-500/50 h-[40%] rounded-xs"></div>
                            <div className="w-1.5 bg-cyan-500/70 h-[65%] rounded-xs"></div>
                            <div className="w-1.5 bg-cyan-400 h-full rounded-xs"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3B. SYSTEM VITALS */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950/50 border border-cyan-500/10 rounded-lg text-left">
                    <span className="text-[7.5px] font-mono text-slate-500 block uppercase">HEART RATE</span>
                    <span className="text-sm font-black text-cyan-300 font-mono block mt-1">{activeStage.vitals.hr}</span>
                  </div>
                  <div className="p-3 bg-slate-950/50 border border-cyan-500/10 rounded-lg text-left">
                    <span className="text-[7.5px] font-mono text-slate-500 block uppercase">SYSTEM LOAD</span>
                    <span className="text-sm font-black text-cyan-300 font-mono block mt-1">{activeStage.vitals.load}</span>
                  </div>
                  <div className="p-3 bg-slate-950/50 border border-cyan-500/10 rounded-lg text-left">
                    <span className="text-[7.5px] font-mono text-slate-500 block uppercase">DATA FLOW</span>
                    <span className="text-sm font-black text-cyan-300 font-mono block mt-1">{activeStage.vitals.flow}</span>
                  </div>
                </div>

                {/* 3C. REAL-TIME METRICS GRID (4 TILES) */}
                <div className="space-y-3">
                  <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block text-left">✦ REAL-TIME METRICS</span>
                  
                  <div className="grid grid-cols-2 gap-3.5">
                    
                    {/* TILE 1: CONVERSION RATE */}
                    <div className="p-3 rounded-lg border border-cyan-500/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between text-left h-[80px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Conversion Rate</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">{activeStage.metrics.convDelta}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-black font-display text-white">{activeStage.metrics.conv}</span>
                        {/* Micro graph wave */}
                        <svg className="w-12 h-6 text-cyan-400 stroke-current fill-none" strokeWidth={1} viewBox="0 0 50 20">
                          <path d="M0,15 C10,12 20,8 30,12 Q40,16 50,5" />
                        </svg>
                      </div>
                    </div>

                    {/* TILE 2: PATIENT FLOW */}
                    <div className="p-3 rounded-lg border border-cyan-500/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between text-left h-[80px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Patient Flow</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">{activeStage.metrics.flowDelta}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-black font-display text-white">{activeStage.metrics.flow}</span>
                        <svg className="w-12 h-6 text-cyan-400 stroke-current fill-none" strokeWidth={1} viewBox="0 0 50 20">
                          <path d="M0,18 L10,10 L25,14 L35,8 L50,4" />
                        </svg>
                      </div>
                    </div>

                    {/* TILE 3: SURGERIES BOOKED */}
                    <div className="p-3 rounded-lg border border-cyan-500/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between text-left h-[80px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Surgeries Booked</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">{activeStage.metrics.surgeriesDelta}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-black font-display text-white">{activeStage.metrics.surgeries}</span>
                        <svg className="w-12 h-6 text-emerald-400 stroke-current fill-none" strokeWidth={1} viewBox="0 0 50 20">
                          <path d="M0,15 Q15,5 25,12 T50,2" />
                        </svg>
                      </div>
                    </div>

                    {/* TILE 4: NO-SHOW RATE */}
                    <div className="p-3 rounded-lg border border-cyan-500/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between text-left h-[80px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">No-Show Rate</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">{activeStage.metrics.noshowDelta}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-black font-display text-white">{activeStage.metrics.noshow}</span>
                        <svg className="w-12 h-6 text-red-400 stroke-current fill-none" strokeWidth={1} viewBox="0 0 50 20">
                          <path d="M0,4 L15,12 L30,8 L50,18" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* LOWER STATS SUB-GRID (THREE HIGH-FIDELITY PANELS: Pipeline Throughput, Funnel, Diagnostics) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-cyan-500/10">
              
              {/* PANEL 1: PIPELINE THROUGHPUT (Smooth wavy bezier line stream) */}
              <div className="p-4 bg-slate-950/40 border border-cyan-500/10 rounded-xl text-left flex flex-col justify-between min-h-[170px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">PIPELINE THROUGHPUT</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">Live Data Stream</span>
                </div>

                {/* Complex smooth wavy lines */}
                <div className="h-16 w-full relative my-1.5">
                  <svg className="w-full h-full stroke-current fill-none overflow-visible" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Wavy area fill */}
                    <path d="M0,15 C20,5 30,25 50,15 Q70,5 90,18 L100,20 L100,30 L0,30 Z" fill="url(#streamGrad)" stroke="transparent" />
                    {/* Dynamic dual paths */}
                    <path d="M0,15 C20,5 30,25 50,15 Q70,5 90,18 L100,20" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,10 C15,22 35,5 60,18 T100,10" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    {/* Glowing endpoint tracker */}
                    <circle cx="100" cy="20" r="2.5" className="fill-cyan-400 text-cyan-400 animate-ping" />
                  </svg>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">Pipeline Efficiency</span>
                  <span className="text-xl font-black font-display text-white">98%</span>
                </div>
              </div>

              {/* PANEL 2: CONVERSION FUNNEL (Glow 3D Segmented Funnel) */}
              <div className="p-4 bg-slate-950/40 border border-cyan-500/10 rounded-xl text-left flex flex-col justify-between min-h-[170px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">CONVERSION FUNNEL</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">Current Month</span>
                </div>

                {/* 3D Vertical Segmented Funnel trapezoid blocks */}
                <div className="flex flex-col items-center justify-center gap-[2px] w-full px-4 my-2">
                  <div className="w-[85%] bg-gradient-to-r from-cyan-500/20 to-cyan-400/30 border-t border-cyan-400/40 text-[8px] font-mono font-bold text-slate-300 text-center py-0.5 rounded-sm">
                    Visitors: {activeStage.funnelData.visitors.toLocaleString()}
                  </div>
                  <div className="w-[68%] bg-gradient-to-r from-cyan-500/30 to-cyan-400/40 border-t border-cyan-400/50 text-[8px] font-mono font-bold text-slate-300 text-center py-0.5 rounded-sm">
                    Leads: {activeStage.funnelData.leads.toLocaleString()}
                  </div>
                  <div className="w-[48%] bg-gradient-to-r from-cyan-500/40 to-cyan-400/50 border-t border-cyan-400/60 text-[8px] font-mono font-bold text-slate-200 text-center py-0.5 rounded-sm">
                    Consultations: {activeStage.funnelData.consultations.toLocaleString()}
                  </div>
                  <div className="w-[28%] bg-gradient-to-r from-cyan-400/60 to-cyan-300/80 border-t border-cyan-300/90 text-[8px] font-mono font-black text-slate-950 text-center py-0.5 rounded-sm shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    Booked: {activeStage.funnelData.surgeries.toLocaleString()}
                  </div>
                </div>

                <div className="text-[9.5px] text-slate-400 font-mono text-center pt-1 border-t border-cyan-500/5">
                  Audited Conversion Math: <strong className="text-cyan-400">{(activeStage.funnelData.surgeries / activeStage.funnelData.visitors * 100).toFixed(1)}%</strong>
                </div>
              </div>

              {/* PANEL 3: DIAGNOSTICS & G&A CORE (Radar with central pulsing heartrate) */}
              <div className="p-4 bg-slate-950/40 border border-cyan-500/10 rounded-xl text-left flex flex-col justify-between min-h-[170px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">DIAGNOSTICS & G&A CORE</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">System Health</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  {/* Glowing orbital radar scanner graphics */}
                  <div className="relative h-16 w-16 bg-[#010915] border border-cyan-500/15 rounded-full flex items-center justify-center shrink-0">
                    <div className="absolute inset-2 border border-cyan-500/10 rounded-full"></div>
                    <div className="absolute inset-4 border border-cyan-500/20 rounded-full"></div>
                    {/* Rotating scan line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-t from-cyan-400/60 to-transparent transform origin-center animate-spin"></div>
                    {/* Central pulse monitor */}
                    <Activity className="h-4.5 w-4.5 text-cyan-400 animate-pulse relative z-10" />
                  </div>

                  {/* Checklist matching image */}
                  <div className="flex-1 space-y-1 font-mono text-[9px] leading-tight">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>System Integrity</span>
                      <span className="text-cyan-300 font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Data Accuracy</span>
                      <span className="text-cyan-300 font-bold">98.6%</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Integration Health</span>
                      <span className="text-cyan-300 font-bold">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 font-bold">
                      <span>AI Predictive Score</span>
                      <span className="text-cyan-400 font-black">95.8%</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono border-t border-cyan-500/5 pt-1 text-center">
                  Calibration Level: <strong className="text-emerald-400">OPTIMAL HEALTH</strong>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
