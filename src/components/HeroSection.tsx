import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  CheckCircle2, 
  Cpu, 
  Calendar, 
  ChevronRight, 
  ArrowRight,
  TrendingDown,
  Clock,
  Filter,
  Layers,
  Heart,
  Star,
  Activity
} from "lucide-react";

interface HeroSectionProps {
  onScheduleClick: () => void;
  onLogEvent: (action: string, category: string, label: string) => void;
  city?: string;
  specialty?: string;
}

interface SpecialtyIconData {
  id: string;
  name: string;
  svg: React.ReactNode;
  x: string; // absolute placement
  y: string; // absolute placement
  align: "left" | "right";
  floatY: number; // custom float offset
}

export default function HeroSection({ onScheduleClick, onLogEvent, city, specialty }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSpecialty, setHoveredSpecialty] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports to optimize performance and prevent overlaps
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse movement for luxury parallax and depth effect
  useEffect(() => {
    if (isMobile) return; // Disable mouse move tracking on mobile for performance
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const handleCtaClick = (action: string) => {
    onScheduleClick();
    onLogEvent(action, "Conversion", "Hero Center CTA");
  };

  const prefixText = city 
    ? `Helping Surgeon-Owned Hospitals in ${city} Build` 
    : "Helping Surgeon-Owned Hospitals Build";

  // List of 15 premium outline SVGs matching the image exactly
  const specialties: SpecialtyIconData[] = [
    // --- LEFT SIDE SPECIALTIES ---
    {
      id: "gastro",
      name: "Gastroenterology",
      x: "4%",
      y: "11%",
      align: "left",
      floatY: -10,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M12 2C9 2 6 4 6 7c0 3 4 5 4 8s-3 4-3 7" strokeLinecap="round" />
          <path d="M12 2c3 0 6 2 6 5c0 3-4 5-4 8s3 4 3 7" strokeLinecap="round" />
          <path d="M8 12c1.5-1 3.5-1 4.5.5s.5 3-1 4" strokeLinecap="round" />
          <circle cx="12" cy="7" r="2" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "cardiology",
      name: "Cardiology",
      x: "16%",
      y: "14%",
      align: "left",
      floatY: 12,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M6 9h3l1.5-2.5L12 12l1.5-3.5L15 9h3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: "dentistry",
      name: "Dentistry",
      x: "3%",
      y: "28%",
      align: "left",
      floatY: -8,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M6 3c0 0 1 1.5 2 1.5s2-1.5 4-1.5 3 1.5 4 1.5 2-1.5 2-1.5v6c0 4.5-3 8-6 10-3-2-6-5.5-6-10V3z" strokeLinejoin="round" />
          <path d="M8 8h8M12 3v15" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "neurology",
      name: "Neurology",
      x: "15%",
      y: "33%",
      align: "left",
      floatY: 15,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.9-.7" />
          <path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.9-.7" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M6 6h2M6 10h2M6 14h2M16 6h2M16 10h2M16 14h2" />
        </svg>
      )
    },
    {
      id: "urology",
      name: "Urology",
      x: "3%",
      y: "48%",
      align: "left",
      floatY: -12,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M12 3a7 7 0 00-7 7c0 3 2.5 6 4 8.5l3 2.5 3-2.5c1.5-2.5 4-5.5 4-8.5a7 7 0 00-7-7z" strokeLinejoin="round" />
          <path d="M9.5 10c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5" strokeLinecap="round" />
          <circle cx="12" cy="7" r="1.5" />
        </svg>
      )
    },
    {
      id: "pulmonology",
      name: "Pulmonology",
      x: "14%",
      y: "53%",
      align: "left",
      floatY: 9,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M11 20c-3 0-5-2-5-6s1.5-6 4-6h1V4h2v4h1c2.5 0 4 2 4 6s-2 6-5 6h-2z" strokeLinejoin="round" />
          <path d="M12 4h-2M14 4h2M12 8v12" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      x: "4%",
      y: "67%",
      align: "left",
      floatY: -14,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M5 4h14v2H5zM5 18h14v2H5z" />
          <path d="M8 6v12M16 6v12" />
          <circle cx="12" cy="12" r="3" className="animate-pulse" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      )
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology",
      x: "15%",
      y: "71%",
      align: "left",
      floatY: 11,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 9a3 3 0 013 3" />
        </svg>
      )
    },

    // --- RIGHT SIDE SPECIALTIES ---
    {
      id: "hepatology",
      name: "Hepatology",
      x: "15%",
      y: "11%",
      align: "right",
      floatY: -11,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M4 14c0-4 4-8 10-8s8 3 8 7c0 4-4 7-9 7s-9-2-9-6z" strokeLinejoin="round" />
          <path d="M10 6c0 3 2 5 5 5" strokeLinecap="round" />
          <circle cx="16" cy="14" r="2.5" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "gynecology",
      name: "Gynecology",
      x: "4%",
      y: "14%",
      align: "right",
      floatY: 13,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <circle cx="12" cy="9" r="6" />
          <path d="M12 15v7M9 19h6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "ent",
      name: "ENT",
      x: "16%",
      y: "29%",
      align: "right",
      floatY: -9,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M16 14c2.5 0 4-1.5 4-4s-1.5-4-4-4H8c-2.5 0-4 1.5-4 4s1.5 4 4 4" strokeLinecap="round" />
          <path d="M12 6v14M8 20h8" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "surgery",
      name: "General Surgery",
      x: "3%",
      y: "32%",
      align: "right",
      floatY: 10,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M14.5 17.5L3 6M10 3h11v2H10z" strokeLinecap="round" />
          <path d="M18 5l-4 4M21 8l-3 3" strokeLinecap="round" />
          <rect x="6" y="14" width="4" height="4" rx="1" />
        </svg>
      )
    },
    {
      id: "oncology",
      name: "Oncology",
      x: "16%",
      y: "49%",
      align: "right",
      floatY: -13,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M6 18c2-2 4-6 4-10a4 4 0 118 0c0 4 2 8 4 10" strokeLinecap="round" />
          <path d="M9 10h6" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "dermatology",
      name: "Dermatology",
      x: "4%",
      y: "52%",
      align: "right",
      floatY: 12,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <path d="M3 10h18M3 14h18" strokeLinecap="round" />
          <path d="M12 4v6M8 4l2 6M16 4l-2 6" strokeLinecap="round" />
          <circle cx="12" cy="17" r="2" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      x: "15%",
      y: "68%",
      align: "right",
      floatY: -10,
      svg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none" strokeWidth="1.5">
          <circle cx="12" cy="10" r="5" />
          <path d="M8 18c0-2.5 2-4 4-4s4 1.5 4 4" strokeLinecap="round" />
          <circle cx="10" cy="9" r="1" fill="currentColor" />
          <circle cx="14" cy="9" r="1" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#071B34] pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden px-6 md:px-12 border-b border-white/10"
    >
      {/* ================= SCI-FI BACKGROUND ENGINE ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        {/* Deep Dark Space Blue */}
        <div className="absolute inset-0 bg-[#071B34]" />

        {/* Blueprintperspective grid floor */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220%] h-[75%] opacity-15 md:opacity-20 perspective-grid" />

        {/* Left Side Electric Nebula Glow */}
        <motion.div 
          animate={isMobile ? {} : { 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[2%] w-[280px] h-[280px] md:w-[700px] md:h-[700px] bg-cyan-500/5 md:bg-cyan-500/10 rounded-full filter blur-[60px] md:blur-[120px]"
        />

        {/* Right Side Medical Blue Nebula Glow */}
        <motion.div 
          animate={isMobile ? {} : { 
            scale: [1, 0.95, 1.1, 1],
            x: [0, -60, 30, 0],
            y: [0, 50, -30, 0]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[2%] w-[320px] h-[320px] md:w-[750px] md:h-[750px] bg-teal-500/5 md:bg-teal-500/10 rounded-full filter blur-[70px] md:blur-[140px]"
        />

        {/* Floating Ambient Stardust (Particles) - Rendered only on Desktop for optimal 60 FPS performance */}
        {!isMobile && Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-30%", "0%"],
              opacity: [0.1, 0.8, 0.1],
              x: ["0%", `${Math.random() * 4 - 2}%`, "0%"]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Center holographic floor rings projection system like the image - hidden on mobile to avoid overlap */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-40 flex items-center justify-center z-0 hidden md:flex">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/20 to-transparent blur-md transform scale-y-50"></div>
          {Array.from({ length: 4 }).map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full border border-cyan-400/30"
              style={{
                width: `${100 + idx * 120}px`,
                height: `${50 + idx * 60}px`,
                transform: "scaleY(0.5)"
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.08, 1],
                borderWidth: ["1px", "1.5px", "1px"]
              }}
              transition={{
                duration: 4 + idx * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          {/* Vertical beam projection line */}
          <div className="absolute bottom-[100px] w-48 h-[600px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-2xl transform -translate-y-1/2"></div>
        </div>

        {/* Background Scanline Screen Sweep */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-35" />
      </div>

      {/* ================= CLINICAL SPECIALTIES HOLOGRAPHIC GRID (LEFT & RIGHT) - Hidden on Mobile ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none hidden md:block">
        {specialties.map((spec) => {
          const styleProps: React.CSSProperties = {};
          if (spec.align === "left") {
            styleProps.left = spec.x;
            styleProps.top = spec.y;
          } else {
            styleProps.right = spec.x;
            styleProps.top = spec.y;
          }

          const isHovered = hoveredSpecialty === spec.id;

          return (
            <motion.div
              key={spec.id}
              className="absolute pointer-events-auto"
              style={styleProps}
              onMouseEnter={() => {
                setHoveredSpecialty(spec.id);
                onLogEvent(`Specialty Diagnostic Node Active: ${spec.name}`, "Interactions", `Hero Specialty Node ${spec.id}`);
              }}
              onMouseLeave={() => setHoveredSpecialty(null)}
              animate={{
                y: [0, spec.floatY, 0],
                scale: isHovered ? 1.05 : 1
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 7 + Math.abs(spec.floatY) * 0.4,
                  ease: "easeInOut"
                },
                scale: { duration: 0.2 }
              }}
            >
              {/* Double Glowing Circle Node Container matching the image perfectly */}
              <div className="flex flex-col items-center">
                <div 
                  className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border transition-all duration-500 ${
                    isHovered 
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)] scale-110" 
                      : "bg-[#091a2e]/60 border-cyan-500/20 text-cyan-400/50 hover:text-cyan-400 hover:border-cyan-400/60"
                  }`}
                  style={{
                    boxShadow: isHovered 
                      ? "0 0 30px rgba(6,182,212,0.4), inset 0 0 15px rgba(6,182,212,0.3)" 
                      : "inset 0 0 10px rgba(6,182,212,0.05)"
                  }}
                >
                  {/* Outer circle layout line */}
                  <div className={`absolute inset-[-4px] rounded-full border border-dashed transition-opacity duration-500 ${isHovered ? "border-cyan-400/40 opacity-100" : "border-cyan-500/10 opacity-60"}`} />

                  {/* Inner SVG body */}
                  <div className={`transition-transform duration-500 ${isHovered ? "scale-110 text-cyan-300" : "text-cyan-400/70"}`}>
                    {spec.svg}
                  </div>

                  {/* Breathing mini-ping beacon indicator */}
                  {isHovered && (
                    <span className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping opacity-75" />
                  )}
                </div>

                {/* All-Caps Label Underneath perfectly styled matching image */}
                <span 
                  className={`text-[9px] sm:text-[10px] font-mono tracking-widest font-black uppercase text-center mt-2.5 transition-colors duration-300 ${
                    isHovered ? "text-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.6)]" : "text-[#557b9e]/80"
                  }`}
                >
                  {spec.name}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Thin elegant grid lines connecting background specialty cells */}
        <svg className="absolute inset-0 w-full h-full opacity-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg">
          {/* Left specialty column network connecting paths */}
          <path d="M 60 110 L 180 140 L 50 280 L 170 330 L 50 480 L 160 530 L 60 670 L 170 710" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          {/* Right specialty column network connecting paths */}
          <path d="M 1380 110 L 1260 140 L 1390 290 L 1260 320 L 1390 490 L 1270 520 L 1380 680" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* ================= CONTENT MAIN WRAPPER ================= */}
      <div className="max-w-[1440px] mx-auto w-full relative z-20 flex flex-col items-center text-center space-y-10 sm:space-y-12">
        
        {/* Center Pitch Stack */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto flex flex-col items-center w-full">
          
          {/* Badge Section with custom heart ECG line expansion */}
          <div className="flex items-center justify-center gap-3 w-full max-w-lg">
            {/* Left heart line */}
            <div className="hidden sm:block flex-1 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-400">
              <svg className="w-full h-4 overflow-visible stroke-cyan-400" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 L70 5 L75 1 L80 9 L85 5 L100 5" fill="none" strokeWidth="1" />
              </svg>
            </div>

            {/* Strategic pill badge matched perfectly to image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#091a2e]/90 border border-cyan-500/40 rounded text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0"
            >
              <span className="font-bold text-xs">+</span>
              <span className="font-mono text-[8px] xs:text-[10px] tracking-widest uppercase font-black">
                OPERATIONAL HEALTHCARE STRATEGIST
              </span>
            </motion.div>

            {/* Right heart line */}
            <div className="hidden sm:block flex-1 h-[2px] bg-gradient-to-l from-transparent via-cyan-500/40 to-cyan-400">
              <svg className="w-full h-4 overflow-visible stroke-cyan-400" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 L15 5 L20 1 L25 9 L30 5 L100 5" fill="none" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Core Stripe/Linear Title matched perfectly */}
          <div className="space-y-4 sm:space-y-5 w-full">
            <motion.h1 
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-fluid-h1 font-extrabold text-white tracking-tight font-display max-w-3xl sm:max-w-4xl text-center leading-[1.15] md:leading-[1.2] mx-auto px-1"
            >
              {prefixText} <br className="hidden sm:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-400 font-black drop-shadow-[0_0_35px_rgba(34,211,238,0.45)] mt-1.5 sm:mt-0">
                Predictable Surgical Growth Systems
              </span>
            </motion.h1>
            
            {/* Elegant luxury subtitle explanation */}
            <motion.p 
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-base md:text-lg font-light max-w-2xl leading-relaxed text-center mx-auto px-1"
            >
              Eliminate critical clinical funnel leaks, establish high-efficiency sub-5-minute intake SLA's, and scale procedural volumes with high-precision operational infrastructure.
            </motion.p>
          </div>

          {/* Double Button CTA Suite matched exactly to the image */}
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-0 z-30 w-full max-w-md mx-auto px-4"
          >
            {/* Bright Solid Cyan Action Button */}
            <motion.button
              onClick={() => handleCtaClick("Request Private Audit Center Button")}
              whileHover={isMobile ? {} : { scale: 1.04, boxShadow: "0 0 30px rgba(6,182,212,0.6)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-md bg-[#00f0ff] text-[#071B34] font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 shrink-0 border border-transparent"
            >
              <span>REQUEST PRIVATE AUDIT</span>
              <span className="text-sm font-bold">➔</span>
            </motion.button>
          </motion.div>

        </div>

        {/* ================= ENTERPRISE HIGH-FIDELITY 6-KPI GLASS PANEL ================= */}
        <div className="w-full pt-4 sm:pt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-7xl mx-auto px-4 sm:px-0">
            
            {/* KPI CARD 1: REVENUE GROWTH */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">REVENUE GROWTH</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">₹18.6 Cr+</div>
              </div>
              
              {/* Micro sparkline SVG - Upward line with smooth gradient area */}
              <div className="h-8 sm:h-10 w-full relative flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-cyan-400 fill-none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-kpi1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,25 C10,23 20,15 30,19 C40,23 50,8 60,12 C70,16 80,4 100,2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M0,25 C10,23 20,15 30,19 C40,23 50,8 60,12 C70,16 80,4 100,2 L100,30 L0,30 Z" fill="url(#gradient-kpi1)" />
                </svg>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Annual Revenue Impact
              </div>
            </motion.div>

            {/* KPI CARD 2: CONFIRMED SURGERIES */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">CONFIRMED SURGERIES</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">1,250+</div>
              </div>
              
              {/* Micro bar chart sparkline representation of surgeries growth */}
              <div className="h-8 sm:h-10 w-full flex items-end justify-between px-1 gap-1">
                <div className="bg-cyan-500/20 h-[30%] w-full rounded-sm"></div>
                <div className="bg-cyan-500/45 h-[45%] w-full rounded-sm"></div>
                <div className="bg-cyan-500/60 h-[60%] w-full rounded-sm animate-pulse"></div>
                <div className="bg-cyan-400/80 h-[80%] w-full rounded-sm"></div>
                <div className="bg-cyan-400 h-full w-full rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Surgeries Optimized
              </div>
            </motion.div>

            {/* KPI CARD 3: PATIENT SATISFACTION */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">PATIENT SATISFACTION</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">96%</div>
              </div>
              
              {/* Radial circle dynamic stroke sparkline indicator matched */}
              <div className="h-8 sm:h-10 w-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 transform -rotate-90">
                  <circle cx="16" cy="16" r="13" className="hidden sm:block" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" fill="transparent" />
                  <circle cx="16" cy="16" r="13" className="hidden sm:block" stroke="#00f0ff" strokeWidth="3" fill="transparent"
                    strokeDasharray={82}
                    strokeDashoffset={3}
                  />
                  <circle cx="20" cy="20" r="16" className="sm:hidden" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2.5" fill="transparent" />
                  <circle cx="20" cy="20" r="16" className="sm:hidden" stroke="#00f0ff" strokeWidth="2.5" fill="transparent"
                    strokeDasharray={100}
                    strokeDashoffset={4}
                  />
                </svg>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-400 ml-2">96% OK</span>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Satisfaction Score
              </div>
            </motion.div>

            {/* KPI CARD 4: HOSPITAL EFFICIENCY */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">HOSPITAL EFFICIENCY</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">91%</div>
              </div>
              
              {/* Radial circle dynamic stroke sparkline indicator */}
              <div className="h-8 sm:h-10 w-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 transform -rotate-90">
                  <circle cx="16" cy="16" r="13" className="hidden sm:block" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" fill="transparent" />
                  <circle cx="16" cy="16" r="13" className="hidden sm:block" stroke="#10b981" strokeWidth="3" fill="transparent"
                    strokeDasharray={82}
                    strokeDashoffset={7}
                  />
                  <circle cx="20" cy="20" r="16" className="sm:hidden" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2.5" fill="transparent" />
                  <circle cx="20" cy="20" r="16" className="sm:hidden" stroke="#10b981" strokeWidth="2.5" fill="transparent"
                    strokeDasharray={100}
                    strokeDashoffset={9}
                  />
                </svg>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 ml-2">91% OP</span>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Operational Efficiency
              </div>
            </motion.div>

            {/* KPI CARD 5: CONVERSION RATE */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">CONVERSION RATE</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">54%</div>
              </div>
              
              {/* Zigzag sparkline chart with orange highlight accent perfectly matched */}
              <div className="h-8 sm:h-10 w-full relative flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-amber-500 fill-none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-kpi5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,28 L20,18 L40,25 L60,10 L80,18 L100,5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0,28 L20,18 L40,25 L60,10 L80,18 L100,5 L100,30 L0,30 Z" fill="url(#gradient-kpi5)" />
                </svg>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Average Improvement
              </div>
            </motion.div>

            {/* KPI CARD 6: AVG. OPD TO SURGERY */}
            <motion.div
              whileHover={isMobile ? {} : { y: -6, borderColor: "rgba(6, 182, 212, 0.5)", boxShadow: "0 10px 30px rgba(0,240,255,0.1)" }}
              className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-left h-[165px] sm:h-[175px] shadow-lg shadow-black/35 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase">AVG. OPD TO SURGERY</span>
                </div>
                <div className="text-xl xs:text-2xl font-black font-display text-white tracking-tight leading-none pt-1.5 sm:pt-2">4.7 Days</div>
              </div>
              
              {/* Smooth wave graph line */}
              <div className="h-8 sm:h-10 w-full relative flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-emerald-400 fill-none" preserveAspectRatio="none">
                  <path d="M0,15 Q25,25 50,15 T100,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="50" cy="15" r="2" fill="currentColor" />
                  <circle cx="100" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>

              <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                Industry Leading
              </div>
            </motion.div>

          </div>
        </div>

      </div>

    </section>
  );
}
