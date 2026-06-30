import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, MessageSquare, Globe, 
  Cpu, Brain, ListTodo, 
  User, Headphones, Heart, 
  Stethoscope, FileText, 
  Calendar, Check, Hospital, 
  Activity, Star, Users, TrendingUp,
  AlertCircle, CheckCircle, ShieldAlert, Sparkles, ArrowRight,
  ChevronRight, ArrowLeft, ArrowDownLeft, Trophy, DollarSign, Share2
} from "lucide-react";

interface JourneyStep {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  kpi: string;
  kpiLabel: string;
  status: "optimized" | "critical-leak" | "nurtured";
  iconName: string; 
  color: string;
  glowColor: string;
  
  // Expanded details
  problems: string[];
  leakage: string;
  solution: string;
  expectedImprovement: string;
  estimatedConversion: string;
  detailsKpi: {
    label: string;
    value: string;
    sub: string;
  }[];
}

// ------------------------------------------------------------------
// PREMIUM SVG ICON RENDERING HELPERS (PULSING & ANIMATING)
// ------------------------------------------------------------------

function EnquiryIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
        <rect x="20" y="25" width="60" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-80" />
        <motion.path 
          d="M 35 40 Q 42 35 50 43 L 55 38 Q 47 30 40 35 Z" 
          fill="currentColor"
          animate={activeOrHovered ? { scale: [1, 1.2, 1], rotate: [0, -12, 12, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.circle 
          cx="50" cy="50" r="30" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3"
          animate={activeOrHovered ? { r: [15, 38], opacity: [1, 0] } : { opacity: 0.2 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
        />
        <circle cx="40" cy="58" r="2.5" fill="#f05a4f" />
        <circle cx="50" cy="58" r="2.5" fill="#22d3ee" />
        <circle cx="60" cy="58" r="2.5" fill="#34d399" />
      </svg>
    </div>
  );
}

function TriageIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400">
        <path d="M 25 25 H 75 L 58 60 V 80 L 42 75 V 60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <motion.line 
          x1="22" y1="30" x2="78" y2="30" 
          stroke="#f05a4f" strokeWidth="3"
          animate={activeOrHovered ? { y: [5, 28, 5] } : { y: 15 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <circle cx="50" cy="40" r="4.5" fill="#22d3ee" className="animate-pulse" />
        <circle cx="42" cy="48" r="3.5" fill="currentColor" />
        <circle cx="58" cy="48" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}

function CounsellorIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400">
        <circle cx="50" cy="35" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 25 75 Q 25 55 50 55 Q 75 55 75 75" fill="none" stroke="currentColor" strokeWidth="2" />
        <motion.path 
          d="M 50 42 A 4 4 0 0 0 46 38 A 4 4 0 0 0 42 42 Q 42 46 50 50 Q 58 46 58 42 A 4 4 0 0 0 54 38 A 4 4 0 0 0 50 42"
          fill="#f05a4f"
          animate={activeOrHovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 43%" }}
        />
        <motion.path 
          d="M 32 35 C 32 20, 68 20, 68 35" 
          fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"
          animate={activeOrHovered ? { strokeDasharray: ["4 2", "1 4"] } : {}}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      </svg>
    </div>
  );
}

function DoctorIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300">
        <circle cx="50" cy="42" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: "14s" }} />
        <path d="M 30 30 C 30 60, 70 60, 70 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 50 52 V 72 H 64" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="68" cy="72" r="4.5" fill="#f05a4f" />
        <motion.path 
          d="M 45 28 H 55 M 50 23 V 33" 
          stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round"
          animate={activeOrHovered ? { scale: [1, 1.25, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ transformOrigin: "50% 28%" }}
        />
      </svg>
    </div>
  );
}

function RecommendationIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400">
        <rect x="25" y="20" width="50" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="2.5" />
        <line x1="35" y1="48" x2="55" y2="48" stroke="currentColor" strokeWidth="2.5" />
        <line x1="35" y1="60" x2="60" y2="60" stroke="#22d3ee" strokeWidth="2.5" />
        <motion.g
          animate={activeOrHovered ? { scale: [1, 1.35, 1], rotate: [0, 90, 180, 270, 360] } : {}}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          style={{ transformOrigin: "65px 48px" }}
        >
          <path d="M 65 40 L 67 45 L 72 45 L 68 49 L 70 54 L 65 51 L 60 54 L 62 49 L 58 45 L 63 45 Z" fill="#f05a4f" />
        </motion.g>
      </svg>
    </div>
  );
}

function BookingIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400">
        <rect x="22" y="25" width="56" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="36" y1="18" x2="36" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="18" x2="64" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path 
          d="M 38 52 L 47 60 L 64 42" 
          fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={activeOrHovered ? { pathLength: [0, 1] } : { pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <circle cx="75" cy="25" r="4.5" fill="#f05a4f" className="animate-ping" />
      </svg>
    </div>
  );
}

function SurgeryIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
        <rect x="18" y="42" width="64" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 45 62 H 55 M 50 57 V 67" stroke="#f05a4f" strokeWidth="3.5" strokeLinecap="round" />
        <motion.path 
          d="M 22 28 L 38 28 L 44 14 L 50 40 L 56 22 L 62 32 L 66 28 L 78 28"
          fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          animate={activeOrHovered ? { strokeDashoffset: [400, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          style={{ strokeDasharray: "150" }}
        />
      </svg>
    </div>
  );
}

function RecoveryIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-teal-400">
        <path d="M 50 18 C 70 18, 76 25, 76 46 C 76 68, 50 82, 50 82 C 50 82, 24 68, 24 46 C 24 25, 30 18, 50 18 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <motion.g
          animate={activeOrHovered ? { scale: [1, 1.25, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <path d="M 50 38 Q 44 32 38 38 Q 32 44 50 58 Q 68 44 62 38 Q 56 32 50 38" fill="#f05a4f" />
        </motion.g>
        <circle cx="50" cy="48" r="34" fill="none" stroke="#22d3ee" strokeWidth="0.75" strokeDasharray="4 4" className="opacity-40 animate-spin" style={{ animationDuration: "16s" }} />
      </svg>
    </div>
  );
}

function ReferralIcon({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const activeOrHovered = isActive || isHovered;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="40" x2="25" y2="25" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="40" x2="75" y2="25" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="64" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
        <motion.circle 
          cx="25" cy="25" r="6" fill="#f05a4f"
          animate={activeOrHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }}
        />
        <motion.circle 
          cx="75" cy="25" r="6" fill="#22d3ee"
          animate={activeOrHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
        />
        <motion.path 
          d="M 50 82 L 53 77 L 58 77 L 54 74 L 56 69 L 50 72 L 44 69 L 46 74 L 42 77 L 47 77 Z" 
          fill="currentColor"
          animate={activeOrHovered ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{ transformOrigin: "50% 74px" }}
        />
        <Sparkles className="absolute top-0 right-0 h-5 w-5 text-amber-300 animate-bounce" />
      </svg>
    </div>
  );
}

function PremiumIconRenderer({ name, isActive, isHovered }: { name: string; isActive: boolean; isHovered: boolean }) {
  switch (name) {
    case "EnquiryIcon": return <EnquiryIcon isActive={isActive} isHovered={isHovered} />;
    case "TriageIcon": return <TriageIcon isActive={isActive} isHovered={isHovered} />;
    case "CounsellorIcon": return <CounsellorIcon isActive={isActive} isHovered={isHovered} />;
    case "DoctorIcon": return <DoctorIcon isActive={isActive} isHovered={isHovered} />;
    case "RecommendationIcon": return <RecommendationIcon isActive={isActive} isHovered={isHovered} />;
    case "BookingIcon": return <BookingIcon isActive={isActive} isHovered={isHovered} />;
    case "SurgeryIcon": return <SurgeryIcon isActive={isActive} isHovered={isHovered} />;
    case "RecoveryIcon": return <RecoveryIcon isActive={isActive} isHovered={isHovered} />;
    case "ReferralIcon": return <ReferralIcon isActive={isActive} isHovered={isHovered} />;
    default: return <EnquiryIcon isActive={isActive} isHovered={isHovered} />;
  }
}

// ------------------------------------------------------------------
// CONFETTI PARTICLES COMPONENT FOR REFERRAL SUCCESS
// ------------------------------------------------------------------
function ReferralConfetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; delay: number }[]>([]);
  
  useEffect(() => {
    if (active) {
      const colors = ["#22d3ee", "#34d399", "#f05a4f", "#fbbf24", "#a78bfa", "#f43f5e"];
      const generated = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 120 - 60, 
        y: Math.random() * -150 - 30, 
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.8
      }));
      setParticles(generated);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            bottom: "35%",
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: p.x * 4,
            y: p.y * 3,
            scale: [0, 1, 1, 0.5, 0],
            opacity: [1, 1, 0.8, 0.4, 0],
            rotate: [0, Math.random() * 360]
          }}
          transition={{
            duration: 2.2,
            delay: p.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
interface SurgicalJourneyProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function SurgicalJourney({ onLogEvent }: SurgicalJourneyProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState<boolean>(false);
  const [revenueCounter, setRevenueCounter] = useState(124500);

  // Constants matching request specifications
  const cardWidth = 340;
  const gap = 24;

  // Track screen size changes to calculate visible slides
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine Visible Cards dynamically
  let visibleCards = 4;
  if (screenWidth < 768) {
    visibleCards = 1;
  } else if (screenWidth < 1024) {
    visibleCards = 2;
  }

  const maxIndex = Math.max(0, 9 - visibleCards);

  // Auto-scroll every 6 seconds unless hovered
  useEffect(() => {
    if (isHoveringCarousel) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isHoveringCarousel, maxIndex]);

  // Sync active step to current index in carousel to make it feel cohesive,
  // especially for mobile swiping which displays 1 card.
  useEffect(() => {
    if (visibleCards === 1) {
      setActiveStepIdx(currentIndex);
    }
  }, [currentIndex, visibleCards]);

  // Dynamic counter increment loop for Referral step
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStepIdx === 8) {
        setRevenueCounter(prev => prev + Math.floor(Math.random() * 150) + 50);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStepIdx]);

  const journeySteps: JourneyStep[] = [
    {
      id: "enquiry",
      num: "01",
      title: "Patient Enquiry",
      shortDesc: "Omnichannel patient intake across Calls, WhatsApp, Website, and medical referrals.",
      kpi: "2 Min",
      kpiLabel: "Response Time",
      status: "critical-leak",
      iconName: "EnquiryIcon",
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(34,211,238,0.3)",
      problems: [
        "40% of incoming hospital calls left unanswered during peak surgery blocks",
        "Slow WhatsApp responses cause potential patients to book competitor clinics",
        "No structured tracking for offline physician or word-of-mouth patient referrals"
      ],
      leakage: "Roughly 45% of high-yield patient intent evaporates in the first 10 minutes of delayed feedback.",
      solution: "Instant automated lead routing, same-minute trigger alerts to counsellor dashboards, and omnichannel backup queues.",
      expectedImprovement: "+95% lead capture, complete visual tracking across all referral and web pipelines.",
      estimatedConversion: "24%",
      detailsKpi: [
        { label: "Capture Rate", value: "98.2%", sub: "vs 60% industry standard" },
        { label: "Response Velocity", value: "<90s", sub: "automatic routing triggered" },
        { label: "Satisfaction", value: "+46%", sub: "immediate patient delight" }
      ]
    },
    {
      id: "triage",
      num: "02",
      title: "Growth Triage",
      shortDesc: "Automated qualification engine prioritizing emergency cases and surgical candidates.",
      kpi: "95%",
      kpiLabel: "Triage Accuracy",
      status: "critical-leak",
      iconName: "TriageIcon",
      color: "from-indigo-400 to-purple-500",
      glowColor: "rgba(129,140,248,0.3)",
      problems: [
        "Invaluable counsellors wasted handling general pricing spams or non-surgical queries",
        "Clinical coordinators unable to segment high-urgency joint, spine, or cardiac queries instantly",
        "Disorganized triage leads to long hospital waiting lists and lost revenue"
      ],
      leakage: "Surgical coordinator teams waste 15-20 hours weekly filtering out unqualified queries manually.",
      solution: "AI-assisted clinical qualification templates, instant intent scoring, and immediate VIP emergency hotlines.",
      expectedImprovement: "Zero clinical team fatigue, instant classification of surgical intent vs general enquiries.",
      estimatedConversion: "32%",
      detailsKpi: [
        { label: "Lead Qualification", value: "95%", sub: "accuracy score" },
        { label: "Time Saved", value: "32 hrs", sub: "per counselor/month" },
        { label: "Hot Lead Speed", value: "Instant", sub: "high-urgency escalation" }
      ]
    },
    {
      id: "counsellor",
      num: "03",
      title: "Counsellor Desk",
      shortDesc: "Empathetic, structured coordinator touchpoints building clinical confidence.",
      kpi: "92%",
      kpiLabel: "Booking Success",
      status: "nurtured",
      iconName: "CounsellorIcon",
      color: "from-emerald-400 to-teal-500",
      glowColor: "rgba(52,211,153,0.3)",
      problems: [
        "Counsellors lacking standard clinical playbooks, sounding cold or transactional",
        "Failing to address common emotional surgical fears during first interaction",
        "Inefficient follow-ups leaving anxious patients in a cold vacuum before consults"
      ],
      leakage: "Over 35% of pre-consultation leads drop off because they don't receive warm, immediate assurance.",
      solution: "Our proprietary high-conversion Counselling framework, dynamic WhatsApp follow-ups, and trust builders.",
      expectedImprovement: "Establishes immediate personal connection, turning nervous prospects into eager clinical visits.",
      estimatedConversion: "41%",
      detailsKpi: [
        { label: "Pre-Consult Show", value: "91.8%", sub: "attendance adherence" },
        { label: "Counsellor Rating", value: "4.9/5", sub: "average patient score" },
        { label: "Contact Velocity", value: "100%", sub: "automated task routing" }
      ]
    },
    {
      id: "doctor",
      num: "04",
      title: "Doctor Consultation",
      shortDesc: "High-yield clinical evaluations focusing on patient trust and transparent options.",
      kpi: "94%",
      kpiLabel: "Trust Index",
      status: "optimized",
      iconName: "DoctorIcon",
      color: "from-blue-400 to-cyan-500",
      glowColor: "rgba(96,165,250,0.3)",
      problems: [
        "Short, rushed consults that leave patients confused about their surgical path",
        "Surgeons spending limited clinic time repeating generic prep notes instead of bonding",
        "Lack of interactive visual software to explain surgical steps to patients"
      ],
      leakage: "Around 30% of eligible candidates leave the OPD without a clear treatment resolution.",
      solution: "Visual interactive surgical simulators, pre-consult patient briefing binders, and structured trust protocols.",
      expectedImprovement: "Deep patient confidence, optimal clinical time usage, and high consultation-to-recommendation rates.",
      estimatedConversion: "28%",
      detailsKpi: [
        { label: "Consult Conversion", value: "+28%", sub: "with structured trust loops" },
        { label: "OPD Show Rate", value: "94.6%", sub: "system automated reminders" },
        { label: "Surgeon Satisfaction", value: "98%", sub: "clinical time optimized" }
      ]
    },
    {
      id: "recommendation",
      num: "05",
      title: "Procedure Recommendation",
      shortDesc: "Interactive treatment blueprint outlining transparent costs and insurance coverage.",
      kpi: "+35%",
      kpiLabel: "Acceptance Lift",
      status: "critical-leak",
      iconName: "RecommendationIcon",
      color: "from-purple-400 to-indigo-500",
      glowColor: "rgba(167,139,250,0.3)",
      problems: [
        "Opaque or confusing billing packages triggering immense upfront sticker shock",
        "Sluggish manual insurance approval checks that stretch over multiple days",
        "Inadequate options for financing (EMIs, medical loans) explained during recommendation"
      ],
      leakage: "25% of patients with recommended surgeries delay or back out due to billing friction or insurance anxiety.",
      solution: "Visual checkout dashboards, instantaneous digital insurance eligibility, and multi-tier medical EMI offerings.",
      expectedImprovement: "Immediate financial transparency, cutting billing friction and increasing checkout approvals.",
      estimatedConversion: "35%",
      detailsKpi: [
        { label: "Instant Approvals", value: "+35%", sub: "at clinic desk checkout" },
        { label: "Insurance Pre-Auth", value: "45 Min", sub: "average verification time" },
        { label: "No-Friction EMIs", value: "78%", sub: "acceptance rates on plans" }
      ]
    },
    {
      id: "booking",
      num: "06",
      title: "Booking Confirmation",
      shortDesc: "Automated date reservation, digital prep lists, and frictionless deposit collection.",
      kpi: "98%",
      kpiLabel: "Booking Success",
      status: "optimized",
      iconName: "BookingIcon",
      color: "from-pink-400 to-rose-500",
      glowColor: "rgba(244,63,94,0.3)",
      problems: [
        "Failing to collect upfront commitment deposits, leading to volatile schedule rates",
        "Complex pre-op instructions delivered as messy paper stacks that patients lose",
        "Lack of central calendar sync for anesthesiologists, surgeons, and theatre staff"
      ],
      leakage: "No-show rates average 18% when booking confirmation relies on casual verbal callbacks.",
      solution: "Secured instant payment gateways, automated digital prep checksheets on WhatsApp, and real-time scheduling.",
      expectedImprovement: "Stable surgical queue scheduling, complete digital compliance, and eliminated surgery no-shows.",
      estimatedConversion: "22%",
      detailsKpi: [
        { label: "No-Show Drop", value: "-92%", sub: "down to <1.5% average" },
        { label: "Digital Deposits", value: "98%", sub: "completed without issue" },
        { label: "OT Scheduling", value: "100%", sub: "coordinated automatically" }
      ]
    },
    {
      id: "surgery",
      num: "07",
      title: "Surgical Day",
      shortDesc: "Seamless clinical workflow orchestration maximizing theater throughput and family peace of mind.",
      kpi: "100%",
      kpiLabel: "Theater Utility",
      status: "optimized",
      iconName: "SurgeryIcon",
      color: "from-cyan-400 to-teal-400",
      glowColor: "rgba(34,211,238,0.3)",
      problems: [
        "Uncoordinated theatre turnovers wasting valuable clinical operating minutes",
        "Extremely high stress levels for patient families due to zero updates during procedures",
        "Discharge delays because of manual physical billing handoffs and logistics"
      ],
      leakage: "Hospitals lose thousands in hourly operational deficits due to under-utilized operating theatres.",
      solution: "Real-time SMS updates for family members, streamlined clinical flow tracking, and automated discharge workflows.",
      expectedImprovement: "Optimal theatre scheduling utility, world-class hospital branding, and delightful patient care.",
      estimatedConversion: "18%",
      detailsKpi: [
        { label: "Theatre Turnover", value: "22 Mins", sub: "vs 45 mins baseline" },
        { label: "Family Peace Score", value: "99.8%", sub: "with real-time milestones" },
        { label: "Discharge Time", value: "-40%", sub: "cleared in 30 mins" }
      ]
    },
    {
      id: "recovery",
      num: "08",
      title: "Recovery Follow-up",
      shortDesc: "Automated digital recovery monitoring, wellness checks, and medication adherence.",
      kpi: "99%",
      kpiLabel: "Satisfaction Rating",
      status: "nurtured",
      iconName: "RecoveryIcon",
      color: "from-teal-400 to-emerald-400",
      glowColor: "rgba(45,212,191,0.3)",
      problems: [
        "Patients feeling neglected or completely abandoned within 48 hours of surgery discharge",
        "Failing to track patient medication compliance, leading to avoidable readmission cases",
        "Unprompted post-op reviews, letting competitors dominate local map rankings"
      ],
      leakage: "Up to 15% of patients encounter minor recovery complications that go unguided, dropping satisfaction score.",
      solution: "Digital post-surgical wellness monitoring, scheduled recovery task reminders, and automated doctor check-ins.",
      expectedImprovement: "Zero post-op anxiety, minimal readmission rates, and perfect clinical review collection scores.",
      estimatedConversion: "41%",
      detailsKpi: [
        { label: "Readmissions", value: "0.4%", sub: "down from 4.8% average" },
        { label: "Adherence Rate", value: "97.4%", sub: "on medications & exercises" },
        { label: "Patient Care Score", value: "4.94/5", sub: "unmatched trust index" }
      ]
    },
    {
      id: "referral",
      num: "09",
      title: "Referral & Reputation",
      shortDesc: "Nurturing happy advocates to generate organic word-of-mouth patient streams.",
      kpi: "+42%",
      kpiLabel: "Organic Referrals",
      status: "optimized",
      iconName: "ReferralIcon",
      color: "from-amber-400 to-rose-400",
      glowColor: "rgba(251,191,36,0.3)",
      problems: [
        "Failing to capture high-gratitude reviews immediately following successful recoveries",
        "No programmatic way for patients to refer friends or family members to your surgical group",
        "Clinical excellence remaining hidden due to lack of public social proof"
      ],
      leakage: "Hospitals miss out on 50%+ of potential premium referrals by failing to prompt happy patients.",
      solution: "Embedded review collection links, digital patient community referral programs, and automated video case study captures.",
      expectedImprovement: "Surging local reviews, 5-star map scores, and self-sustaining patient referral networks.",
      estimatedConversion: "42%",
      detailsKpi: [
        { label: "New Referrals", value: "+42%", sub: "organic surgeon growth" },
        { label: "5-Star Reviews", value: "240+", sub: "added within 90 days" },
        { label: "Patient Advocates", value: "84%", sub: "actively recommending us" }
      ]
    }
  ];

  const handleStepClick = (idx: number, stepTitle: string) => {
    setActiveStepIdx(idx);
    onLogEvent(`Journey Node Selected: ${stepTitle}`, "Interactions", "Surgical Patient Journey");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    onLogEvent("Carousel Next Slide Clicked", "Interactions", "Surgical Patient Journey");
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    onLogEvent("Carousel Prev Slide Clicked", "Interactions", "Surgical Patient Journey");
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      if (currentIndex < maxIndex) {
        handleNext();
      }
    } else if (info.offset.x > swipeThreshold) {
      if (currentIndex > 0) {
        handlePrev();
      }
    }
  };

  const activeStep = journeySteps[activeStepIdx];

  return (
    <div 
      id="surgical-patient-journey-section" 
      className="space-y-12 relative py-16 px-4 md:px-8 max-w-[1440px] mx-auto overflow-hidden"
      onMouseEnter={() => setIsHoveringCarousel(true)}
      onMouseLeave={() => setIsHoveringCarousel(false)}
    >
      
      {/* ------------------------------------------------------------------
          COMPLEX TECHNICAL BACKGROUND GRAPHIC ELEMENTS (BLUEPRINT STYLE)
          ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        {/* Fine Blueprint grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Connected Medical Network Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,200 C300,100 500,400 900,200 S1200,600 1400,300" fill="none" stroke="rgba(34,211,238,0.04)" strokeWidth="1.5" />
          <path d="M50,400 C400,250 800,150 1100,500 S1300,200 1500,600" fill="none" stroke="rgba(129,140,248,0.03)" strokeWidth="1.5" />
          
          <motion.path 
            d="M 50 150 L 250 150 L 270 120 L 290 190 L 310 140 L 330 160 L 340 150 L 600 150 L 620 120 L 640 190 L 660 140 L 680 160 L 690 150 L 1000 150 L 1020 120 L 1040 190 L 1060 140 L 1080 160 L 1090 150 L 1400 150"
            fill="none" 
            stroke="rgba(6,182,212,0.06)" 
            strokeWidth="1"
            animate={{ strokeDashoffset: [800, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            style={{ strokeDasharray: "400" }}
          />

          <circle cx="150" cy="120" r="1.5" fill="rgba(34,211,238,0.15)" />
          <circle cx="450" cy="380" r="2" fill="rgba(34,211,238,0.15)" className="animate-pulse" />
          <circle cx="850" cy="220" r="1" fill="rgba(129,140,248,0.2)" />
          <circle cx="1200" cy="450" r="2" fill="rgba(34,211,238,0.1)" />
        </svg>

        <div className="absolute top-[20%] left-[8%] text-cyan-500/5 text-4xl font-light font-sans pointer-events-none select-none">+</div>
        <div className="absolute top-[65%] right-[12%] text-cyan-500/4 text-5xl font-light font-sans pointer-events-none select-none">+</div>
        <div className="absolute bottom-[10%] left-[25%] text-indigo-500/5 text-3xl font-light font-sans pointer-events-none select-none">♥</div>
        <div className="absolute top-[40%] right-[30%] text-emerald-500/4 text-4xl font-light font-sans pointer-events-none select-none">✚</div>
      </div>

      {/* ------------------------------------------------------------------
          SECTION TITLE & SUBTITLE
          ------------------------------------------------------------------ */}
      <div className="text-center max-w-4xl mx-auto space-y-4 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
          THE HOSPITALS REVENUE PIPELINE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white uppercase">
          THE SURGICAL PATIENT JOURNEY
        </h2>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto font-sans">
          From the first patient enquiry to long-term referrals, we optimize every stage to increase surgical conversions and hospital revenue.
        </p>
      </div>

      {/* ------------------------------------------------------------------
          PREMIUM SLIDER SHOWCASE VIEWPORT
          ------------------------------------------------------------------ */}
      <div className="relative z-10 mt-12 w-full select-none">
        
        {/* Navigation Arrows (Header Right Aligned or overlay side) */}
        <div className="flex items-center justify-end gap-3 mb-6 mr-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              currentIndex === 0
                ? "border-slate-800 text-slate-600 bg-slate-900/35 cursor-not-allowed"
                : "border-cyan-500/30 text-cyan-400 bg-[#030E1D]/80 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              currentIndex === maxIndex
                ? "border-slate-800 text-slate-600 bg-slate-900/35 cursor-not-allowed"
                : "border-cyan-500/30 text-cyan-400 bg-[#030E1D]/80 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            }`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel mask / container */}
        <div className="overflow-visible w-full px-1 py-4 relative">
          
          {/* Glowing continuous pipeline behind cards */}
          <div className="absolute top-[135px] left-0 right-0 h-1.5 z-0 pointer-events-none hidden md:block">
            {/* Background passive pipe track */}
            <div className="absolute inset-0 bg-[#030B17] border-y border-cyan-500/10 rounded" />
            
            {/* Glowing active line overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 rounded blur-[1px] opacity-40 animate-pulse" />
            
            {/* Travelling glowing light data packet particles */}
            <motion.div 
              className="absolute h-full w-48 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[2px]"
              animate={{ left: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
            />
            <motion.div 
              className="absolute h-full w-32 bg-gradient-to-r from-transparent via-emerald-300 to-transparent blur-[2px]"
              animate={{ left: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 6, delay: 2, ease: "linear" }}
            />
          </div>

          {/* Smooth framer-motion drag track */}
          <motion.div
            drag="x"
            dragConstraints={{
              left: -maxIndex * (cardWidth + gap),
              right: 0
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * (cardWidth + gap) }}
            transition={{ type: "spring", stiffness: 180, damping: 25, mass: 0.8 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing w-max overflow-visible"
          >
            {journeySteps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={step.id}
                  id={`journey-card-${step.id}`}
                  onClick={() => handleStepClick(idx, step.title)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  // Hover Lifts, Scale & Dynamic Float cycle
                  animate={{
                    y: isHovered ? -8 : isActive ? [0, -5, 0] : [0, -6, 0],
                    scale: isHovered ? 1.03 : 1,
                  }}
                  transition={{
                    y: isHovered 
                      ? { duration: 0.25, ease: "easeOut" } 
                      : { repeat: Infinity, duration: 4 + (idx % 3) * 1.5, ease: "easeInOut", delay: idx * 0.3 }
                  }}
                  className={`w-[340px] h-[480px] shrink-0 relative p-6 rounded-[24px] border select-none overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isActive 
                      ? "bg-gradient-to-b from-[#051c3c]/95 to-[#020b17]/95 border-cyan-400/80 shadow-[0_20px_50px_rgba(6,182,212,0.18),0_0_35px_rgba(6,182,212,0.1)] text-white z-20" 
                      : "bg-[#030E1D]/90 backdrop-blur-md border-cyan-500/10 hover:border-cyan-500/30 text-slate-300 shadow-[0_10px_30px_rgba(1,5,12,0.5)]"
                  }`}
                >
                  {/* Dynamic light gradient sweep on active / hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
                    <motion.div 
                      className="absolute -inset-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent skew-x-12"
                      initial={{ x: "-100%" }}
                      animate={isActive || isHovered ? { x: "200%" } : { x: "-100%" }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                    />
                  </div>

                  {/* Confetti element when referral success is active */}
                  {idx === 8 && <ReferralConfetti active={isActive} />}

                  {/* CARD HEADER: Step and Status Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-500/5">
                    {/* Circle Glowing step number */}
                    <div className="flex items-center gap-2">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 ${
                        isActive 
                          ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)] animate-pulse" 
                          : "bg-slate-950/65 border-slate-800 text-slate-500"
                      }`}>
                        {step.num}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 tracking-wider font-extrabold uppercase">
                        STAGE
                      </span>
                    </div>

                    {/* Red Alarm Leak or Green Healthy Status indicator */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/50 border border-slate-800/40">
                      {step.status === "critical-leak" ? (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-[8px] font-mono font-black text-red-400 uppercase tracking-tight">
                            LEAK POINT
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                          </span>
                          <span className="text-[8px] font-mono font-black text-emerald-400 uppercase tracking-tight">
                            NURTURED
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* LARGE ANIMATED ICON SECTION */}
                  <div className="py-6 flex justify-center items-center">
                    <div className={`p-4 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]" 
                        : "text-slate-400 bg-slate-950/30 border border-slate-800/20 group-hover:text-cyan-300"
                    }`}>
                      <PremiumIconRenderer name={step.iconName} isActive={isActive} isHovered={isHovered} />
                    </div>
                  </div>

                  {/* STAGE DETAILS & LABEL */}
                  <div className="space-y-3 text-center">
                    <h3 className={`text-xl font-extrabold tracking-tight uppercase leading-none font-display transition-colors ${
                      isActive ? "text-cyan-300" : "text-white hover:text-cyan-400"
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3 px-2 min-h-[54px]">
                      {step.shortDesc}
                    </p>
                  </div>

                  {/* FOOTER: KPI BADGES & LEARN MORE ACTION BUTTON */}
                  <div className="pt-4 border-t border-cyan-500/5 space-y-4">
                    
                    {/* Primary Stage KPI Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">
                        Stage KPI Target
                      </span>
                      <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border flex items-center gap-1.5 ${
                        isActive 
                          ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.2)] animate-pulse"
                          : "bg-slate-950/60 border-slate-800 text-slate-400"
                      }`}>
                        <span>{idx === 8 && isActive ? `+$${revenueCounter.toLocaleString()}` : step.kpi}</span>
                        <span className="text-[9px] opacity-75 font-sans font-light">{step.kpiLabel}</span>
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStepClick(idx, step.title);
                      }}
                      className={`w-full py-2 rounded-xl text-center font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                        isActive
                          ? "bg-cyan-400 border-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                          : "bg-slate-950/45 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-[#03132B]/30"
                      }`}
                    >
                      <span>{isActive ? "ACTIVE DETAILS" : "LEARN MORE"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Navigation Indicator Dots Below */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === i
                  ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  : "w-2 bg-slate-800 hover:bg-slate-700"
              }`}
            />
          ))}
        </div>

      </div>

      {/* ------------------------------------------------------------------
          EXPANDED DIAGNOSTIC DRAWER PANEL BELOW
          ------------------------------------------------------------------ */}
      <div className="mt-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-[24px] border border-cyan-500/15 bg-gradient-to-b from-[#04142d]/95 to-[#020a16]/98 p-6 sm:p-8 text-left shadow-[0_20px_50px_rgba(2,10,22,0.9)] relative overflow-hidden group"
          >
            {/* Ambient light glow underneath detail drawer */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              
              {/* LEFT COLUMN: Hospital challenge, revenue leakage & operational solution (7 cols) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-mono text-[10px] font-bold">
                      STAGE {activeStep.num}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">•</span>
                    <span className="text-xs font-mono font-extrabold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                      Dynamic Pipeline Diagnostics
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-none uppercase">
                    {activeStep.title} Analysis
                  </h3>
                </div>

                {/* Problems / Leakage Box */}
                <div className="space-y-3.5 p-4 rounded-xl border border-red-500/15 bg-red-950/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/[0.01] rounded-full blur-xl" />
                  <div className="flex items-center gap-2 border-b border-red-500/10 pb-2">
                    <ShieldAlert className="h-4.5 w-4.5 text-red-400 shrink-0" />
                    <span className="text-[10px] font-mono text-red-400 font-extrabold uppercase tracking-wide">
                      COMMON HOSPITAL CHALLENGE & REVENUE LEAKAGE
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                    {activeStep.problems.map((p, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="h-4.5 w-4.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-[10px] shrink-0 font-bold">
                          ×
                        </span>
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[10px] font-mono text-red-300 font-medium pt-2 border-t border-red-500/5 leading-relaxed">
                    ⚠️ <strong className="font-extrabold">FINANCIAL DRAIN:</strong> {activeStep.leakage}
                  </div>
                </div>

                {/* Our Solution Box */}
                <div className="space-y-3.5 p-4 rounded-xl border border-emerald-500/15 bg-emerald-950/10">
                  <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-2">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide">
                      OPERATIONAL RESOLUTION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {activeStep.solution}
                  </p>
                  <div className="text-[10px] font-mono text-emerald-300 font-medium pt-2 border-t border-emerald-500/5 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-emerald-400 animate-spin" style={{ animationDuration: "3s" }} />
                    <span><strong className="font-extrabold">EXPECTED IMPROVEMENT:</strong> {activeStep.expectedImprovement}</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Big conversions lift, stats & benchmarks (5 cols) */}
              <div className="lg:col-span-5 rounded-xl border border-cyan-500/10 bg-[#020a16]/60 p-5 sm:p-6 flex flex-col justify-between space-y-6">
                
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
                  <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest">
                    ✦ Key Performance Indicators
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase animate-pulse">
                    Active Benchmarks
                  </span>
                </div>

                {/* Conversion Boost Big Metric card */}
                <div className="py-2 text-left">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block leading-none">
                    Estimated Conversion Impact
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-4xl sm:text-5xl font-black font-display text-cyan-300 tracking-tight">
                      +{activeStep.estimatedConversion}
                    </span>
                    <span className="text-xs font-mono text-cyan-400/80 uppercase">
                      Conversion Lift
                    </span>
                  </div>
                  
                  {/* Progress visual bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: activeStep.estimatedConversion }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Secondary details statistics layout */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {activeStep.detailsKpi.map((dkpi, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950/80 border border-slate-900 text-left">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block leading-tight truncate">
                        {dkpi.label}
                      </span>
                      <span className="text-sm sm:text-base font-black font-display text-white block mt-1">
                        {dkpi.value}
                      </span>
                      <span className="text-[8px] text-slate-400 leading-none block mt-0.5 truncate">
                        {dkpi.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fine print or security assurance */}
                <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1 pt-3 border-t border-cyan-500/5">
                  <span>🔒 Secure surgical pipeline auditing</span>
                  <span>•</span>
                  <span>HIPAA & GDPR Compliant state tracking</span>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
