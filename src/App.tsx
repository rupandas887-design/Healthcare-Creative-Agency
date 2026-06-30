import React, { useState, useEffect } from "react";
import { TrackingEventLog } from "./types";
import TrackingConsole from "./components/TrackingConsole";
import HeroSection from "./components/HeroSection";
import PremiumBanner from "./components/PremiumBanner";
import ProblemSection from "./components/ProblemSection";
import PositioningSection from "./components/PositioningSection";
import FrameworkSection from "./components/FrameworkSection";
import WhoWeWorkWith from "./components/WhoWeWorkWith";
import AboutSection from "./components/AboutSection";
import VideoSection from "./components/VideoSection";
import FAQSection from "./components/FAQSection";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import SurgicalGrowthEstimator from "./components/SurgicalGrowthEstimator";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldCheck, Phone, ChevronRight, Sparkles, Menu, X } from "lucide-react";

export default function App() {
  const [logs, setLogs] = useState<TrackingEventLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing Surgical Diagnostics Portal...");
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic state for URL personalization (City & Specialty contexts)
  const [personalization, setPersonalization] = useState({
    city: "",
    specialty: ""
  });

  // Effect to parse and apply city-aware / specialty-aware parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city") || params.get("utm_city") || "";
    const specialty = params.get("specialty") || params.get("utm_specialty") || "";
    if (city || specialty) {
      setPersonalization({ city, specialty });
      handleLogEvent(
        `Dynamic Context Triggered! City: "${city || "None"}", Specialty: "${specialty || "None"}"`, 
        "Personalization Engine", 
        "URL query parsed successfully"
      );
    }
  }, []);

  // Function to capture conversion events & simulate GA4/GTM dispatch
  const handleLogEvent = (action: string, category: string, label: string) => {
    const newLog: TrackingEventLog = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action,
      category,
      label
    };
    setLogs((prev) => [newLog, ...prev]);

    // Triggers actual browser developer logs for auditing
    console.log(`[GA4 / GTM Triggered] | Action: ${action} | Category: ${category} | Label: ${label}`);
  };

  // Scroll target handler
  const handleScrollToSection = (elementId: string, anchorName: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleLogEvent(`Navigation link click: ${anchorName}`, "Interactions", `Scrolled to #${elementId}`);
    }
  };

  // Loader progress & scroll listener
  useEffect(() => {
    const messages = [
      "Analyzing geographical catchment areas...",
      "Calibrating outpatient check-in touchpoint friction...",
      "Verifying HIPAA-compliant metrics security...",
      "Matching surgical coordinator scripts...",
      "Mapping OPD-to-procedure confirmation math...",
      "Restructuring front-office callback velocity metrics...",
      "Surgical Growth Console ready."
    ];

    let currentMsgIdx = 0;
    let currentPct = 0;

    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 8) + 6;
      if (currentPct >= 100) {
        currentPct = 100;
        setProgress(100);
        setLoadingText(messages[messages.length - 1]);
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          handleLogEvent("Structured JSON-LD SEO schemas initialized", "SEO Schema Engine", "Person, Organization, Video, FAQPage standard markup");
        }, 300);
      } else {
        setProgress(currentPct);
        const msgIdx = Math.floor((currentPct / 100) * (messages.length - 1));
        if (msgIdx !== currentMsgIdx && msgIdx < messages.length - 1) {
          currentMsgIdx = msgIdx;
          setLoadingText(messages[msgIdx]);
        }
      }
    }, 60);

    // Scroll depth listener
    let hasReached25 = false;
    let hasReached50 = false;
    let hasReached75 = false;
    let hasReached95 = false;

    const handleScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPct = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrollPct);

      // Show sticky CTA if scrolled past 450px
      if (window.scrollY > 450) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }

      if (scrollPct >= 25 && !hasReached25) {
        hasReached25 = true;
        handleLogEvent("Scroll Depth reached 25%", "Behavior", "Top Fold Completed");
      }
      if (scrollPct >= 50 && !hasReached50) {
        hasReached50 = true;
        handleLogEvent("Scroll Depth reached 50%", "Behavior", "Framework Fold Explored");
      }
      if (scrollPct >= 75 && !hasReached75) {
        hasReached75 = true;
        handleLogEvent("Scroll Depth reached 75%", "Behavior", "Video and Bio explored");
      }
      if (scrollPct >= 95 && !hasReached95) {
        hasReached95 = true;
        handleLogEvent("Scroll Depth reached 95%", "Behavior", "Consultation Intake Reached");
      }
    };

    window.addEventListener("scroll", handleScrollDepth);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScrollDepth);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-navy text-white flex flex-col selection:bg-brand-teal selection:text-brand-navy font-sans antialiased text-sm md:text-base">
      
      {/* Top scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-teal z-50 transition-all duration-100 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="portal-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-brand-navy z-[99] flex flex-col items-center justify-center p-6 text-white text-left font-sans select-none"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-teal/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-md w-full space-y-8 relative z-10 text-center sm:text-left">
              
              {/* Strategic Logo Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-white/10 pb-5">
                <div className="h-12 w-12 rounded-xl bg-brand-teal text-brand-navy flex items-center justify-center font-display font-black text-lg shadow-xl animate-pulse">
                  SS
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-white font-extrabold text-base tracking-tight leading-tight">Sunil Sulegai</h2>
                  <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase font-bold">
                    Surgical Practice Growth Partner
                  </span>
                </div>
              </div>

              {/* Progress counter & message panel */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Diagnostic Analysis</span>
                  <span className="text-xl font-bold text-brand-teal">{progress}%</span>
                </div>

                {/* Progress track */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-teal transition-all duration-100 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Live System Log */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-brand-gold uppercase tracking-widest font-black block">SYSTEM LOG</span>
                  <p className="text-xs text-slate-300 font-mono font-light leading-relaxed truncate">
                     {loadingText}
                  </p>
                </div>
              </div>

              {/* Integrity footprint Covenantes */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-brand-teal animate-spin-slow" />
                  COGNITIVE OPERATIVE BASE
                </span>
                <span>SECURED V2.66</span>
              </div>

            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* HEADER NAVIGATION (Aesthetic, pristine desktop menu) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#071B34]/95 backdrop-blur-md border-b border-white/10 p-3.5 px-4 md:px-6 lg:px-12 flex items-center justify-between print:hidden shadow-md">
        <div 
          onClick={() => {
            handleScrollToSection("hero-section", "Home");
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Stunning S-Wave Custom Logo like the image */}
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.25)] border border-cyan-400/40">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 C15 3, 9 3, 6 6 C3 9, 3 15, 6 18 C9 21, 15 21, 18 18" />
              <path d="M14 10 C12 8, 10 10, 10 12 C10 14, 14 14, 14 16 C14 18, 12 20, 10 18" />
            </svg>
          </div>
          <span className="font-extrabold text-base md:text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors font-display">
            Sunil Sulegai
          </span>
        </div>

        {/* Links Navigation matching the screenshot perfectly */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black tracking-widest text-slate-300">
          <button 
            onClick={() => handleScrollToSection("hero-section", "Home")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase font-sans"
          >
            HOME
          </button>
          
          <button 
            onClick={() => handleScrollToSection("about-section", "About Sunil")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase font-sans"
          >
            ABOUT
          </button>
          
          <button 
            onClick={() => handleScrollToSection("framework-section", "Solutions")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase flex items-center gap-1 font-sans"
          >
            SOLUTIONS <span className="text-[10px] text-slate-500 font-bold">∨</span>
          </button>
          
          <button 
            onClick={() => handleScrollToSection("positioning-section", "Results")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase font-sans"
          >
            RESULTS
          </button>
          
          <button 
            onClick={() => handleScrollToSection("faq-section", "Resources")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase flex items-center gap-1 font-sans"
          >
            RESOURCES <span className="text-[10px] text-slate-500 font-bold">∨</span>
          </button>

          <button 
            onClick={() => handleScrollToSection("growth-estimator-section", "Estimator")}
            className="text-cyan-400 hover:text-cyan-300 font-extrabold hover:scale-105 transition-all cursor-pointer uppercase flex items-center gap-1.5 font-sans"
          >
            <span>ESTIMATOR</span>
            <span className="text-[8px] bg-cyan-400/20 px-1 py-0.5 rounded text-cyan-300 border border-cyan-400/30 tracking-normal font-mono">NEW</span>
          </button>

          <button 
            onClick={() => handleScrollToSection("booking-section", "Contact")}
            className="hover:text-cyan-400 transition-colors cursor-pointer uppercase font-sans"
          >
            CONTACT
          </button>
        </nav>

        {/* CTA Top Header Button matched to image: pill/rounded-full button with small chevron */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            id="header-cta-booking"
            onClick={() => handleScrollToSection("booking-section", "Discussion Intake Form")}
            className="hidden sm:flex bg-brand-coral hover:bg-brand-coral/90 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_4px_15px_rgba(240,90,79,0.35)] font-sans items-center gap-2 shrink-0"
          >
            <span>GET STARTED</span>
            <span className="text-xs font-bold">➔</span>
          </button>

          {/* Animated Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative h-11 w-11 flex flex-col items-center justify-center text-cyan-400 hover:text-white transition-colors cursor-pointer focus:outline-none z-50"
            aria-label="Toggle navigation menu"
          >
            <div className="space-y-1.5 w-6">
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                }`} 
              />
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`} 
              />
              <span 
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`} 
              />
            </div>
          </button>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAV MENU WITH SLIDE-IN ANIMATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 bottom-0 z-30 bg-[#051325] pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            {/* Nav List */}
            <div className="flex flex-col gap-5 text-left mt-4">
              <span className="text-[10px] font-mono tracking-widest font-black text-cyan-500 uppercase border-b border-cyan-500/10 pb-2">
                NAVIGATION MENU
              </span>
              
              <button 
                onClick={() => {
                  handleScrollToSection("hero-section", "Home");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                HOME
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("about-section", "About Sunil");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                ABOUT
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("framework-section", "Solutions");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                SOLUTIONS
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("positioning-section", "Results");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                RESULTS
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("faq-section", "Resources");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                RESOURCES
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("growth-estimator-section", "Estimator");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 text-left transition-colors font-display py-2 min-h-[48px] flex items-center gap-2"
              >
                <span>ESTIMATOR</span>
                <span className="text-[10px] bg-cyan-400/10 px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-400/20 font-mono">NEW</span>
              </button>

              <button 
                onClick={() => {
                  handleScrollToSection("booking-section", "Contact");
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-bold text-white hover:text-cyan-400 text-left transition-colors font-display py-2 min-h-[48px]"
              >
                CONTACT
              </button>
            </div>

            {/* Bottom Actions and Info */}
            <div className="space-y-5 pt-6 border-t border-cyan-500/10">
              <button
                onClick={() => {
                  handleScrollToSection("booking-section", "Discussion Intake Form");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer text-center font-sans shadow-[0_4px_15px_rgba(240,90,79,0.35)] flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>REQUEST PRIVATE AUDIT</span>
                <span>➔</span>
              </button>

              <div className="flex flex-col gap-1 text-slate-400 text-xs text-center font-mono">
                <span>🔒 No Obligation. 100% Confidential.</span>
                <span className="text-[10px] text-slate-500">Practice Performance Management & Growth Consulting</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE FOLDS MULTI-STAGED SECTION SEQUENCES */}
      <main className="flex-1">
        
        {/* HERO FOLD (SECTION 1) */}
        <ScrollReveal direction="fade" duration={1.0}>
          <HeroSection 
            onScheduleClick={() => handleScrollToSection("booking-section", "Direct CTA From Hero")} 
            onLogEvent={handleLogEvent} 
            city={personalization.city}
            specialty={personalization.specialty}
          />
        </ScrollReveal>

        {/* INTERACTIVE PREMIUM SaaS PIPELINE BANNER */}
        <ScrollReveal direction="up" delay={0.1}>
          <PremiumBanner 
            onScheduleClick={() => handleScrollToSection("booking-section", "CTA From Interactive Premium Banner")}
            onLogEvent={handleLogEvent}
          />
        </ScrollReveal>

        {/* THE PROBLEM SEQUENCE (SECTION 3 - Struggle cards & Leak simulator) */}
        <ScrollReveal direction="up">
          <ProblemSection onLogEvent={handleLogEvent} />
        </ScrollReveal>

        {/* INTERACTIVE PREMIUM ESTIMATOR & REVENUE CALCULATOR */}
        <ScrollReveal direction="up">
          <SurgicalGrowthEstimator onLogEvent={handleLogEvent} />
        </ScrollReveal>

        {/* THE POSITIONING STATEMENT (SECTION 4 - Not an agency comparison matrix) */}
        <ScrollReveal direction="up">
          <PositioningSection 
            onScheduleClick={() => handleScrollToSection("booking-section", "CTA From Positioning Matrix")} 
            onLogEvent={handleLogEvent} 
          />
        </ScrollReveal>

        {/* THE SURGICAL GROWTH FRAMEWORK™ (SECTION 5 - Infographics) */}
        <ScrollReveal direction="up">
          <FrameworkSection onLogEvent={handleLogEvent} />
        </ScrollReveal>

        {/* WHO WE WORK WITH (SECTION 6 & 7 - Ideal profile matchers & Reservation exclusivities) */}
        <ScrollReveal direction="up">
          <WhoWeWorkWith 
            onScheduleClick={() => handleScrollToSection("booking-section", "CTA From Exclusivity Profiles")} 
            onLogEvent={handleLogEvent} 
          />
        </ScrollReveal>

        {/* BIOGRAPHY LETTER (SECTION 8 - Personal values & standards) */}
        <ScrollReveal direction="up">
          <AboutSection />
        </ScrollReveal>

        {/* VIDEO BRIEFS MASTERCLASSES (SECTION 9 - Insights video library lazy-watch) */}
        <ScrollReveal direction="up">
          <VideoSection onLogEvent={handleLogEvent} />
        </ScrollReveal>

        {/* STRATEGIC HOSPITAL FAQ ACCORDIONS (SECTION 10 - Critical structural inquiries) */}
        <ScrollReveal direction="up">
          <FAQSection onLogEvent={handleLogEvent} />
        </ScrollReveal>

        {/* DISCOVERY BOOKING PORTAL (SECTION 11 - Form entry with live Growth Report Builder) */}
        <ScrollReveal direction="up">
          <BookingForm 
            onLogEvent={handleLogEvent} 
            city={personalization.city}
            specialty={personalization.specialty}
          />
        </ScrollReveal>

      </main>

      {/* FOOTER METRICS AND CREDENTIALS LINK CORNERS */}
      <Footer onLogEvent={handleLogEvent} />

      {/* Sticky CTA Floating Button */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 left-4 z-40 print:hidden"
          >
            <motion.button
              onClick={() => handleScrollToSection("booking-section", "Sticky CTA Button")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 bg-brand-coral hover:bg-brand-coral/90 text-white px-5 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-2xl relative overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
              <span>Book Free Growth Audit</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANALYTICS AND SECURITY VALIDATION CONSOLE (Proven conversion event logger overlay) - Set to true to show for development testing */}
      {false && (
        <TrackingConsole logs={logs} onClear={() => setLogs([])} />
      )}

    </div>
  );
}
