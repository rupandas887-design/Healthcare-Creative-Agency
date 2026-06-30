import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  TrendingUp, 
  Layers, 
  Star, 
  Cpu, 
  Filter, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Building, 
  Users, 
  Phone, 
  Mail, 
  User, 
  Globe, 
  ArrowUpRight, 
  DollarSign, 
  Check, 
  FileText, 
  HeartPulse, 
  AlertCircle 
} from "lucide-react";

interface SurgicalGrowthEstimatorProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

// Specialty specific consulting metrics
const SPECIALTY_METRICS: Record<string, {
  leakagePoint: string;
  bestPractice: string;
  catalyst: string;
  avgValue: string;
  label: string;
}> = {
  "Cardiology": {
    leakagePoint: "Lack of sub-12 hour post-diagnostic counseling",
    bestPractice: "55% OPD-to-procedure confirmation rate",
    catalyst: "Direct-to-cardiologist scheduling loops",
    avgValue: "₹2,80,000",
    label: "Cardiovascular Care"
  },
  "Orthopedics": {
    leakagePoint: "Patient drop-off between MRI and surgery scheduling",
    bestPractice: "54% procedure recommendation conversion",
    catalyst: "Dedicated counselor desk trackers",
    avgValue: "₹1,80,000",
    label: "Joints & Spine Care"
  },
  "Dentistry": {
    leakagePoint: "High-value implant/ortho leads failing to book consultations",
    bestPractice: "60% treatment acceptance rate",
    catalyst: "Immediate 5-minute call-back triggers",
    avgValue: "₹45,000",
    label: "Advanced Dental Center"
  },
  "Gastroenterology": {
    leakagePoint: "Endoscopy recommendations delaying surgical follow-ups",
    bestPractice: "50% diagnostic-to-procedure conversion",
    catalyst: "Pre-discharge scheduling protocols",
    avgValue: "₹75,000",
    label: "Digestive & Liver Care"
  },
  "Neurology": {
    leakagePoint: "Complex surgical confirmations delayed by multi-stage approvals",
    bestPractice: "48% surgical confirmation speed",
    catalyst: "Case coordinator multidisciplinary logs",
    avgValue: "₹3,50,000",
    label: "Brain & Spine Surgery"
  },
  "ENT": {
    leakagePoint: "No outbound nurturing of chronic tonsillitis/sinusitis OPDs",
    bestPractice: "42% consultation-to-op conversion",
    catalyst: "Post-consultation package templates",
    avgValue: "₹65,000",
    label: "Otorhinolaryngology Center"
  },
  "Urology": {
    leakagePoint: "Embarrassment-driven patient delay in booking lithotripsy/lasers",
    bestPractice: "52% same-week surgical confirmation rate",
    catalyst: "Discreet patient-navigator check-ins",
    avgValue: "₹1,20,000",
    label: "Renal & Urinary Care"
  },
  "Ophthalmology": {
    leakagePoint: "Cataract diagnostic checkups delaying active surgery scheduling",
    bestPractice: "65% counseling-to-booking rate",
    catalyst: "Same-day cataract package counseling desks",
    avgValue: "₹55,000",
    label: "Precision Eye Care"
  },
  "Oncology": {
    leakagePoint: "Patient anxiety drop-offs during biopsy-to-surgery intervals",
    bestPractice: "70% streamlined clinical pathway speed",
    catalyst: "Compassionate oncology navigator pipelines",
    avgValue: "₹4,20,000",
    label: "Comprehensive Cancer Care"
  },
  "Multi-Specialty": {
    leakagePoint: "Disorganized front-desk with zero coordinator handoffs",
    bestPractice: "54% cross-specialty operational yield",
    catalyst: "Pillar-based unified patient journey tracking CRM",
    avgValue: "₹1,50,000",
    label: "Integrated Hospital Care"
  }
};

const CITIES = ["Mumbai", "Delhi NCR", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Other"];
const SPECIALTIES = Object.keys(SPECIALTY_METRICS);

const JOURNEY_STEPS = [
  "Patient Enquiry",
  "Call Validation",
  "Appointment Scheduled",
  "OPD Arrival",
  "Consultation",
  "Counselling Desk",
  "Procedure Recommended",
  "Booking Confirmation",
  "Surgery Conducted",
  "Recovery Tracking",
  "Post-Op Review",
  "Referral Generation"
];

export default function SurgicalGrowthEstimator({ onLogEvent }: SurgicalGrowthEstimatorProps) {
  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState(1);
  const [isReportUnlocked, setIsReportUnlocked] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // STEP 1 State: Hospital Information
  const [hospitalName, setHospitalName] = useState("Apex Surgical Hospital");
  const [specialty, setSpecialty] = useState("Multi-Specialty");
  const [surgeonsCount, setSurgeonsCount] = useState(6);
  const [opdDoctorsCount, setOpdDoctorsCount] = useState(10);
  const [bedsCount, setBedsCount] = useState(45);
  const [city, setCity] = useState("Mumbai");

  // STEP 2 State: Current Performance
  const [monthlyEnquiries, setMonthlyEnquiries] = useState(240);
  const [monthlyOPD, setMonthlyOPD] = useState(180);
  const [currentConversion, setCurrentConversion] = useState(8); // %
  const [avgRevenuePerSurgery, setAvgRevenuePerSurgery] = useState(150000); // ₹
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState(75000); // ₹
  const [avgFollowUpTime, setAvgFollowUpTime] = useState("48 Hours");
  const [missedAppointments, setMissedAppointments] = useState(35);

  // STEP 3 State: Interactive Sliders
  const [simCurrentConversion, setSimCurrentConversion] = useState(8);
  const [simCurrentFollowUp, setSimCurrentFollowUp] = useState(30);
  const [simPatientLeakage, setSimPatientLeakage] = useState(62);
  const [simTargetConversion, setSimTargetConversion] = useState(54);
  const [simTargetFollowUp, setSimTargetFollowUp] = useState(90);

  // STEP 4 Lead Capture fields
  const [leadContact, setLeadContact] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadWebsite, setLeadWebsite] = useState("");
  const [formError, setFormError] = useState("");

  // Keep sliders synchronized when current conversion changes in Step 2
  useEffect(() => {
    setSimCurrentConversion(currentConversion);
    setSimPatientLeakage(100 - currentConversion);
  }, [currentConversion]);

  // Handle specialty changes to update defaults sensibly
  const handleSpecialtyChange = (selected: string) => {
    setSpecialty(selected);
    const metric = SPECIALTY_METRICS[selected];
    if (metric) {
      // Set reasonable ticket sizes based on specialty
      const numericVal = parseInt(metric.avgValue.replace(/[^0-9]/g, ""));
      if (!isNaN(numericVal)) {
        setAvgRevenuePerSurgery(numericVal);
      }
    }
    onLogEvent(`Specialty Selected in Estimator`, "Estimator", `Specialty: ${selected}`);
  };

  // Calculations
  const currentSurgeriesCount = Math.round(monthlyOPD * (simCurrentConversion / 100));
  const targetSurgeriesCount = Math.round(monthlyOPD * (simTargetConversion / 100));
  const additionalSurgeries = Math.max(0, targetSurgeriesCount - currentSurgeriesCount);

  const currentMonthlyRevenue = currentSurgeriesCount * avgRevenuePerSurgery;
  const potentialMonthlyRevenue = targetSurgeriesCount * avgRevenuePerSurgery;
  const additionalMonthlyRevenue = potentialMonthlyRevenue - currentMonthlyRevenue;
  const potentialAnnualRevenue = potentialMonthlyRevenue * 12;

  const estimatedRevenueLeakage = additionalMonthlyRevenue;
  const potentialRevenueRecovery = additionalMonthlyRevenue * 12;

  // Growth Score Model
  const leakageRatio = simPatientLeakage / 100;
  const conversionGrowthDelta = simTargetConversion - simCurrentConversion;
  const followUpDelta = simTargetFollowUp - simCurrentFollowUp;
  const growthScore = Math.min(98, Math.max(12, Math.round(
    (leakageRatio * 40) + 
    ((conversionGrowthDelta / (simTargetConversion || 1)) * 40) + 
    ((followUpDelta / 100) * 20)
  )));

  // Synchronous journey glow based on conversion progress
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleStepNext = () => {
    if (currentStep < 3) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onLogEvent(`Completed Estimator Step ${currentStep}`, "Estimator", `Moving to Step ${next}`);
    } else {
      // Analyze Click - Show locked report
      setCurrentStep(4);
      onLogEvent("Estimator Analytics Completed", "Estimator", "Showing locked diagnostic dashboard");
      // Scroll smoothly to results dashboard block
      setTimeout(() => {
        const el = document.getElementById("estimator-diagnostic-dashboard");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!leadContact.trim() || !leadEmail.trim() || !leadPhone.trim()) {
      setFormError("Please fill in all required fields (Contact Person, Email, and Phone Number).");
      return;
    }

    setIsSubmittingLead(true);
    onLogEvent("Hospital Growth Estimator Unlock Initiated", "Lead Capture", hospitalName);

    // Simulate premium API call
    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setIsReportUnlocked(true);
      onLogEvent("Hospital Growth Estimator Report Unlocked Successfully", "Lead Capture", `Hospital: ${hospitalName} | Contact: ${leadContact}`);
      
      // Scroll to dashboard
      setTimeout(() => {
        const el = document.getElementById("estimator-results-content");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1500);
  };

  // Custom Formatter
  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    } else {
      return `₹${val.toLocaleString("en-IN")}`;
    }
  };

  return (
    <section 
      id="growth-estimator-section" 
      className="relative py-20 bg-[#041225] border-b border-white/10 overflow-hidden text-white"
    >
      {/* Sci-Fi Ambient Decors */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full filter blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-400/25 rounded-full text-cyan-300 text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            Interactive Operational Audit
          </div>
          <h2 id="estimator-title" className="text-3xl md:text-5xl font-black font-display tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
            Hospital Surgical Growth & <br className="hidden sm:block" /> Revenue Estimator
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
            Discover your hospital's potential growth in less than 2 minutes. Enter a few operational details to estimate your OPD growth, surgery conversion, revenue opportunity, and structural performance improvements.
          </p>
        </div>

        {/* ================= STEPPER PROGRESS BAR ================= */}
        <div className="max-w-xl mx-auto mb-12 relative px-4">
          <div className="flex items-center justify-between relative z-10">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border ${
                    currentStep === stepNumber
                      ? "bg-[#00f0ff] border-transparent text-[#041225] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                      : currentStep > stepNumber
                      ? "bg-emerald-500 border-transparent text-white"
                      : "bg-[#071B34] border-white/10 text-slate-400"
                  }`}
                >
                  {currentStep > stepNumber ? <Check className="h-4 w-4 stroke-[3px]" /> : stepNumber}
                </div>
                <span className="text-[9px] font-mono mt-2 uppercase tracking-wider text-slate-400 font-bold">
                  {stepNumber === 1 && "Hospital Profile"}
                  {stepNumber === 2 && "Performance"}
                  {stepNumber === 3 && "Simulators"}
                  {stepNumber === 4 && "Report"}
                </span>
              </div>
            ))}
          </div>
          {/* Connector Line */}
          <div className="absolute top-4 left-10 right-10 h-[2px] bg-white/10 -z-0">
            <div 
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${((Math.min(currentStep, 4) - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* ================= MAIN INTERACTIVE HUB ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: THE STEP-BY-STEP DIALOG WIZARD */}
          <div className="lg:col-span-7 bg-[#051830]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
            <div className="space-y-6">
              
              <AnimatePresence mode="wait">
                
                {/* STEP 1: HOSPITAL INFORMATION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">STEP 1 OF 3</span>
                      <h3 className="text-xl font-bold font-display text-white mt-1">Hospital Demographics Profile</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Hospital Name</label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="e.g. Apollo / Apex Surgical"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Specialty Branch</label>
                        <select 
                          value={specialty}
                          onChange={(e) => handleSpecialtyChange(e.target.value)}
                          className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 px-3 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          {SPECIALTIES.map((spec) => (
                            <option key={spec} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Surgeons On Duty</label>
                        <div className="grid grid-cols-5 items-center bg-[#031327] border border-white/10 rounded-lg overflow-hidden">
                          <button 
                            type="button"
                            onClick={() => setSurgeonsCount(Math.max(1, surgeonsCount - 1))}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            -
                          </button>
                          <span className="col-span-3 text-center text-xs font-mono font-bold">{surgeonsCount}</span>
                          <button 
                            type="button"
                            onClick={() => setSurgeonsCount(surgeonsCount + 1)}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">OPD Practising Doctors</label>
                        <div className="grid grid-cols-5 items-center bg-[#031327] border border-white/10 rounded-lg overflow-hidden">
                          <button 
                            type="button"
                            onClick={() => setOpdDoctorsCount(Math.max(1, opdDoctorsCount - 1))}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            -
                          </button>
                          <span className="col-span-3 text-center text-xs font-mono font-bold">{opdDoctorsCount}</span>
                          <button 
                            type="button"
                            onClick={() => setOpdDoctorsCount(opdDoctorsCount + 1)}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Inpatient Bed Count</label>
                        <div className="grid grid-cols-5 items-center bg-[#031327] border border-white/10 rounded-lg overflow-hidden">
                          <button 
                            type="button"
                            onClick={() => setBedsCount(Math.max(1, bedsCount - 1))}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            -
                          </button>
                          <span className="col-span-3 text-center text-xs font-mono font-bold">{bedsCount}</span>
                          <button 
                            type="button"
                            onClick={() => setBedsCount(bedsCount + 1)}
                            className="col-span-1 py-2.5 text-slate-400 hover:text-white transition-colors bg-white/5 cursor-pointer font-bold text-xs text-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">City Location</label>
                        <select 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 px-3 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          {CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CURRENT PERFORMANCE METRICS */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">STEP 2 OF 3</span>
                      <h3 className="text-xl font-bold font-display text-white mt-1">Current Baseline Performance</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex justify-between">
                          <span>Monthly Enquiries</span>
                          <span className="text-cyan-400 font-bold">{monthlyEnquiries}</span>
                        </label>
                        <input 
                          type="range"
                          min="10"
                          max="1500"
                          step="10"
                          value={monthlyEnquiries}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setMonthlyEnquiries(val);
                            // Keep OPD scaled roughly to enquiries (e.g. 75% conversion)
                            setMonthlyOPD(Math.round(val * 0.75));
                          }}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex justify-between">
                          <span>Monthly OPD Patients</span>
                          <span className="text-cyan-400 font-bold">{monthlyOPD}</span>
                        </label>
                        <input 
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          value={monthlyOPD}
                          onChange={(e) => setMonthlyOPD(parseInt(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex justify-between">
                          <span>OPD-to-Surgery %</span>
                          <span className="text-amber-400 font-bold">{currentConversion}%</span>
                        </label>
                        <input 
                          type="range"
                          min="2"
                          max="30"
                          step="1"
                          value={currentConversion}
                          onChange={(e) => setCurrentConversion(parseInt(e.target.value))}
                          className="w-full accent-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Avg Rev Per Surgery (₹)</label>
                        <input 
                          type="number"
                          value={avgRevenuePerSurgery}
                          onChange={(e) => setAvgRevenuePerSurgery(parseInt(e.target.value) || 0)}
                          className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 px-3.5 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Monthly Marketing Budget (₹)</label>
                        <input 
                          type="number"
                          value={monthlyMarketingSpend}
                          onChange={(e) => setMonthlyMarketingSpend(parseInt(e.target.value) || 0)}
                          className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 px-3.5 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Avg Counselor Follow-up</label>
                        <select 
                          value={avgFollowUpTime}
                          onChange={(e) => setAvgFollowUpTime(e.target.value)}
                          className="w-full bg-[#031327] border border-white/10 rounded-lg py-2.5 px-3 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          <option value="72 Hours+">72 Hours+ (Critical Leakage)</option>
                          <option value="48 Hours">48 Hours (Standard)</option>
                          <option value="24 Hours">24 Hours (Moderate)</option>
                          <option value="Sub-2 Hours">Sub-2 Hours (Highly Efficient)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex justify-between">
                          <span>Missed / No-Show OPD Appointments per month</span>
                          <span className="text-rose-400 font-bold">{missedAppointments}</span>
                        </label>
                        <input 
                          type="range"
                          min="0"
                          max="150"
                          step="5"
                          value={missedAppointments}
                          onChange={(e) => setMissedAppointments(parseInt(e.target.value))}
                          className="w-full accent-rose-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: INTERACTIVE SIMULATION SLIDERS */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">STEP 3 OF 3</span>
                      <h3 className="text-xl font-bold font-display text-white mt-1">Simulate Target Operational Standards</h3>
                    </div>

                    <div className="space-y-4">
                      
                      {/* SLIDER 1: CURRENT VS TARGET CONVERSION */}
                      <div className="space-y-1 bg-[#031225]/60 border border-white/5 rounded-xl p-3 text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">Target Surgery Conversion</span>
                          <span className="text-brand-teal font-black text-sm">{simTargetConversion}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans mb-2 leading-relaxed">
                          By streamlining post-OPD counseling, we establish a target standard matching Sunil's elite baseline (typically 54%).
                        </p>
                        <input 
                          type="range"
                          min={Math.max(2, simCurrentConversion + 1)}
                          max="85"
                          step="1"
                          value={simTargetConversion}
                          onChange={(e) => setSimTargetConversion(parseInt(e.target.value))}
                          className="w-full accent-[#00f0ff]"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                          <span>Current: {simCurrentConversion}%</span>
                          <span>Sunil's System Standard: 54% - 65%</span>
                        </div>
                      </div>

                      {/* SLIDER 2: COUNSELOR FOLLOW-UP RATE */}
                      <div className="space-y-1 bg-[#031225]/60 border border-white/5 rounded-xl p-3 text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">Target Patient Follow-up Rate</span>
                          <span className="text-brand-teal font-black text-sm">{simTargetFollowUp}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans mb-2 leading-relaxed">
                          Outbound lead tracking and diagnostic follow-up percentage within 24 hours.
                        </p>
                        <input 
                          type="range"
                          min={Math.max(10, simCurrentFollowUp + 5)}
                          max="98"
                          step="2"
                          value={simTargetFollowUp}
                          onChange={(e) => setSimTargetFollowUp(parseInt(e.target.value))}
                          className="w-full accent-[#00f0ff]"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                          <span>Current: {simCurrentFollowUp}%</span>
                          <span>Industry Elite Standard: 90%+</span>
                        </div>
                      </div>

                      {/* SLIDER 3: PATIENT LEAKAGE PERCENTAGE */}
                      <div className="space-y-1 bg-[#031225]/60 border border-white/5 rounded-xl p-3 text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">Simulated Patient Leakage</span>
                          <span className="text-rose-400 font-black text-sm">{simPatientLeakage}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans mb-2 leading-relaxed">
                          Unprocessed friction points, missed calls, and lack of accountability leakage.
                        </p>
                        <input 
                          type="range"
                          min="5"
                          max="95"
                          step="1"
                          value={simPatientLeakage}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setSimPatientLeakage(val);
                            // Also adjust target conversion down or current conversion up slightly to correlate logically
                          }}
                          className="w-full accent-rose-500"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                          <span>Target Goal: Sub-20% Leakage</span>
                          <span>Highly Leaky: 60%+</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REDIRECT / LEAD CAPTURE EXPLAINER PANEL */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-white/10 pb-4 text-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">DATA GENERATED</span>
                      <h3 className="text-2xl font-bold font-display text-white mt-1">Audit Model Calibrated</h3>
                    </div>

                    <div className="bg-[#031225]/60 border border-white/5 rounded-xl p-4 space-y-3.5 text-center text-sm">
                      <p className="text-slate-300 leading-relaxed">
                        We have parsed the demographics and performance statistics of <strong>{hospitalName}</strong> located in <strong>{city}</strong>.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
                        <div className="bg-[#031327] p-3 rounded border border-white/5">
                          <span className="block text-[8px] font-mono text-slate-500 uppercase">Growth Multiplier</span>
                          <span className="block text-lg font-black text-cyan-400 font-display">{(simTargetConversion / (simCurrentConversion || 1)).toFixed(1)}X</span>
                        </div>
                        <div className="bg-[#031327] p-3 rounded border border-white/5">
                          <span className="block text-[8px] font-mono text-slate-500 uppercase">Additional Cases</span>
                          <span className="block text-lg font-black text-emerald-400 font-display">+{additionalSurgeries}/mo</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                        Click the button below to review the custom interactive Results Dashboard, dynamic charts, Before vs. After matrix, and unlock your complete diagnostic report.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* BUTTON NAVIGATION COMPONENT */}
            <div className="flex gap-4 pt-6 border-t border-white/10 mt-8">
              {currentStep > 1 && currentStep <= 3 && (
                <button
                  type="button"
                  onClick={handleStepBack}
                  className="flex-1 bg-[#071B34] hover:bg-[#0d2747] border border-white/10 text-slate-300 hover:text-white py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              )}
              
              {currentStep <= 3 ? (
                <button
                  type="button"
                  onClick={handleStepNext}
                  className="flex-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-[#041225] py-3 px-6 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 font-mono"
                >
                  <span>{currentStep === 3 ? "Generate Audit Model" : "Next Step"}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("estimator-diagnostic-dashboard");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="flex-1 bg-brand-coral hover:bg-brand-coral/90 text-white py-3.5 px-6 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(240,90,79,0.35)]"
                >
                  <span>GO TO RESULTS DASHBOARD</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: DYNAMIC LIVE PREVIEW RESULTS PANEL */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#061830] to-[#030e1c] border border-[#00f0ff]/15 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 text-left relative overflow-hidden group">
            {/* Holographic Glowing grid line in back */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#00f0ff]/5 rounded-full filter blur-[50px] -z-10" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-emerald-500/5 rounded-full filter blur-[40px] -z-10" />

            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Live Performance Preview</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
            </div>

            {/* Opportunity score dial & title */}
            <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-xl p-4 relative">
              <div className="relative h-20 w-20 flex items-center justify-center shrink-0">
                {/* SVG circular progress */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                  <motion.circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    stroke="#00f0ff" 
                    strokeWidth="5" 
                    fill="transparent"
                    strokeDasharray={201}
                    initial={{ strokeDashoffset: 201 }}
                    animate={{ strokeDashoffset: 201 - (201 * (growthScore / 100)) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-lg font-black font-display text-white">{growthScore}</span>
                  <span className="text-[6px] font-mono text-slate-400 uppercase font-black">SCORE</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold font-display text-white">Growth Opportunity Score</h4>
                <p className="text-slate-400 text-[10px] font-sans leading-relaxed">
                  Based on current leakage ratios and simulated target operational improvements.
                </p>
                <div className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-400 font-bold uppercase">
                  <AlertCircle className="h-3 w-3" />
                  {growthScore >= 70 ? "HIGH LEAKAGE FOUND" : growthScore >= 45 ? "MODERATE OPPORTUNITY" : "STABLE OPERATIONS"}
                </div>
              </div>
            </div>

            {/* Simulated Value Calculations Cards */}
            <div className="space-y-3.5 pt-2">
              
              <div className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">Monthly OPD Patients</span>
                <span className="font-mono text-white font-bold">{monthlyOPD}</span>
              </div>

              <div className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">Current Monthly Surgeries</span>
                <span className="font-mono text-rose-400 font-bold">{currentSurgeriesCount} <span className="text-[10px]">({simCurrentConversion}%)</span></span>
              </div>

              <div className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">Target Monthly Surgeries</span>
                <span className="font-mono text-emerald-400 font-bold">{targetSurgeriesCount} <span className="text-[10px]">({simTargetConversion}%)</span></span>
              </div>

              <div className="flex justify-between items-center text-xs py-1 border-b border-white/5 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Additional Surgeries
                </span>
                <span className="font-mono text-emerald-400 font-extrabold text-sm">+{additionalSurgeries} / mo</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="bg-[#031327] p-3 rounded-lg border border-white/5 text-left">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">Current Rev.</span>
                  <span className="block text-sm font-bold font-mono text-slate-300 mt-1">{formatCurrency(currentMonthlyRevenue)}</span>
                </div>
                <div className="bg-[#031327] p-3 rounded-lg border border-cyan-400/20 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#00f0ff]/10 text-[#00f0ff] text-[6px] font-mono px-1 py-0.5 uppercase tracking-widest font-black">TARGET</div>
                  <span className="block text-[8px] font-mono text-slate-400 uppercase">Potential Rev.</span>
                  <span className="block text-sm font-bold font-mono text-cyan-400 mt-1">{formatCurrency(potentialMonthlyRevenue)}</span>
                </div>
              </div>

              <div className="bg-[#06241a] p-4 rounded-lg border border-emerald-500/20 text-left relative overflow-hidden mt-2">
                <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-300 text-[6px] font-mono px-1.5 py-0.5 uppercase tracking-widest font-black">RECOVERY</div>
                <span className="block text-[9px] font-mono text-emerald-400 uppercase font-black">Estimated Annual Revenue Leakage Recovery</span>
                <span className="block text-xl font-black font-display text-emerald-300 mt-1.5">{formatCurrency(potentialRevenueRecovery)}</span>
                <span className="block text-[8px] text-slate-400 font-sans mt-1 leading-relaxed">
                  Calculated by closing critical theater scheduling friction and counseling pipelines.
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* ================= PATIENT JOURNEY (GLOWING FLOW) ================= */}
        <div className="bg-[#051830]/60 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl mb-16 relative overflow-hidden">
          <div className="text-left border-b border-white/10 pb-4 mb-6">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">CRITICAL DISCIPLINE SYSTEM</span>
            <h3 className="text-xl font-bold font-display text-white mt-1">Multi-Stage Surgical Patient Journey</h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
               Sunils trademark operational pipeline mapping. The 12 stages must flow seamlessly with zero leakage. Each step lights up as calculations run.
            </p>
          </div>

          {/* Grid Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 relative">
            {JOURNEY_STEPS.map((step, idx) => {
              const isGlowing = idx === activeJourneyStep;
              const isPassed = idx < activeJourneyStep;
              return (
                <motion.div
                  key={step}
                  animate={{ 
                    borderColor: isGlowing ? "rgba(6,182,212,0.6)" : "rgba(255,255,255,0.08)",
                    scale: isGlowing ? 1.03 : 1
                  }}
                  className={`p-3.5 rounded-lg border text-left flex flex-col justify-between h-[100px] transition-all duration-300 relative overflow-hidden ${
                    isGlowing 
                      ? "bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                      : isPassed 
                      ? "bg-[#041d37]/40 border-[#00f0ff]/10" 
                      : "bg-slate-950/20"
                  }`}
                >
                  {/* Step index */}
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-slate-500 font-bold">STAGE {idx + 1}</span>
                    {isPassed ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : isGlowing ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                    ) : null}
                  </div>

                  <span className={`text-[10px] font-bold font-display mt-2 leading-tight ${
                    isGlowing ? "text-cyan-400" : isPassed ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {step}
                  </span>

                  {/* Connecting beam on glow */}
                  {isGlowing && (
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BEFORE vs AFTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* CURRENT CLINIC / HOSPITAL COVENANTES */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-red-950/10 border border-red-500/15 rounded-2xl p-6 md:p-8 shadow-xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-24 w-24 bg-red-500/5 rounded-full filter blur-xl" />
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-4 mb-5">
              <div className="h-10 w-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-display text-white">Current Leaky Hospital Operations</h4>
                <span className="text-[9px] font-mono text-red-400/80 uppercase">Severe Revenue & Patient Bleeding</span>
              </div>
            </div>

            <ul className="space-y-4 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">❌</span>
                <div>
                  <strong className="text-white block">Missed Enquiries & Delayed Callbacks</strong>
                  Front desk takes over 12-24 hours to callback new patient enquiries, causing immediate attrition to rival clinics.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">❌</span>
                <div>
                  <strong className="text-white block">Low OPD-to-Surgery Conversion</strong>
                  Lack of systematic surgical counselors and counselor logs results in sub-10% booking ratios.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">❌</span>
                <div>
                  <strong className="text-white block">Weak Outbound Patient Nurturing</strong>
                  No professional outbound checkup follow-ups for diagnostic recommendations, leading to delayed recoveries.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">❌</span>
                <div>
                  <strong className="text-white block">Poor Front-Office Accountability</strong>
                  Front-desk staffs have no logs, SLA compliance tracking, or counseling desks metrics to seal dropoffs.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">❌</span>
                <div>
                  <strong className="text-white block">Unoptimized Revenue Yield</strong>
                  Heavy marketing spends on generic ads that attract low-intent clicks with zero bottomline yield.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* OPTIMIZED SYSTEM COVENANTES */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-emerald-950/10 border border-emerald-500/15 rounded-2xl p-6 md:p-8 shadow-xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full filter blur-xl" />
            <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4 mb-5">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold font-display text-white">Optimized Surgical Growth System</h4>
                <span className="text-[9px] font-mono text-emerald-400/80 uppercase">Continuous Intake and Counseling Desk</span>
              </div>
            </div>

            <ul className="space-y-4 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✅</span>
                <div>
                  <strong className="text-white block">Sub-5-Minute Intake Callback SLAs</strong>
                  Enquiries are validated and answered instantly by trained clinical agents, increasing booking probabilities.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✅</span>
                <div>
                  <strong className="text-white block">Specialized Surgical Counseling Desks</strong>
                  Equip coordinators with conversion trackers to explain procedures, manage insurance, and schedule surgical cases.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✅</span>
                <div>
                  <strong className="text-white block">Outbound Nurturing & Follow-up Protocols</strong>
                  Automated checkup logs ensure diagnostic checkups remain connected, boosting booking ratios up to 54%.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✅</span>
                <div>
                  <strong className="text-white block">Unified Operational CRM Tracking</strong>
                  Full accountability with front-office counselor desks metrics to seal leaks throughout the 12-stage journey.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✅</span>
                <div>
                  <strong className="text-white block">High-Yield Referral Generation</strong>
                  Integrated follow-up triggers and premium patient feedback loops convert discharges into natural referral pathways.
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* ================= SPECIALTY PERFORMANCE METRICS ================= */}
        <div className="bg-[#051830]/80 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl mb-16 text-left">
          <div className="border-b border-white/10 pb-4 mb-6">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">SPECIALTY SPECIFIC CONSULTING BASES</span>
            <h3 className="text-xl font-bold font-display text-white mt-1">Specialty Practice Benchmarks</h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Currently display typical leaks, target rates, and catalysts specifically designed for <strong>{specialty}</strong> operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-950/40 p-4 border border-white/5 rounded-xl space-y-2">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Specialty Node</span>
              <span className="text-xs font-mono text-cyan-300 font-extrabold flex items-center gap-1">
                <HeartPulse className="h-4 w-4 text-cyan-400" />
                {SPECIALTY_METRICS[specialty]?.label || "General Care"}
              </span>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Selected category is monitored by specialized growth playbook parameters.
              </p>
            </div>

            <div className="bg-slate-950/40 p-4 border border-rose-500/10 rounded-xl space-y-2">
              <span className="text-[8px] font-mono text-rose-400 uppercase block font-bold">Critical Leakage Point</span>
              <span className="text-xs font-sans text-rose-300 font-bold block leading-snug">
                {SPECIALTY_METRICS[specialty]?.leakagePoint}
              </span>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Primary point of drop-off in typical clinic counseling.
              </p>
            </div>

            <div className="bg-slate-950/40 p-4 border border-cyan-500/10 rounded-xl space-y-2">
              <span className="text-[8px] font-mono text-cyan-400 uppercase block font-bold">Elite Best Practice</span>
              <span className="text-xs font-sans text-emerald-300 font-bold block leading-snug">
                {SPECIALTY_METRICS[specialty]?.bestPractice}
              </span>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Target performance standard established under Sunil's operations.
              </p>
            </div>

            <div className="bg-slate-950/40 p-4 border border-emerald-500/10 rounded-xl space-y-2">
              <span className="text-[8px] font-mono text-emerald-400 uppercase block font-bold">Growth Catalyst</span>
              <span className="text-xs font-sans text-cyan-300 font-bold block leading-snug">
                {SPECIALTY_METRICS[specialty]?.catalyst}
              </span>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Strategic action recommended to seal leaks.
              </p>
            </div>

          </div>
        </div>

        {/* ================= DIAGNOSTIC REPORT BLOCKED / UNLOCKED AREA ================= */}
        <div id="estimator-diagnostic-dashboard" className="relative border border-white/10 rounded-3xl bg-[#030e1c] p-6 md:p-8 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Holographic Glowing Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />

          {/* Locked Overlay Backdrop Blur */}
          <AnimatePresence>
            {!isReportUnlocked && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 backdrop-blur-md bg-slate-950/80 flex items-center justify-center p-6 text-center"
              >
                <div className="max-w-xl w-full bg-[#051830] border border-cyan-500/25 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                  {/* Glowing border accent */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-[#00f0ff] to-cyan-500" />
                  
                  <div className="h-14 w-14 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <Lock className="h-6 w-6 text-cyan-400 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-black font-display text-white">Unlock Your Complete Hospital Growth Report</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Calibrated metrics show an annual growth potential of <strong className="text-emerald-300">{formatCurrency(potentialRevenueRecovery)}</strong>. Register to unlock the interactive diagnostic dashboard and custom charts.
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-md mx-auto text-[10px] text-slate-300 font-sans bg-slate-950/40 p-3 rounded-lg border border-white/5">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>Complete Growth Analysis</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>Revenue Opportunity Report</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>Patient Leakage Report</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>Operational Improvements</span>
                    </li>
                    <li className="flex items-center gap-1.5 sm:col-span-2">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>Personalized Growth Strategy Guide</span>
                    </li>
                  </ul>

                  {/* FORM FIELD INTEGRATION */}
                  <form onSubmit={handleUnlockSubmit} className="space-y-4 text-left pt-2">
                    {formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-[11px] text-red-400 text-center flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block">Contact Person *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <input 
                            type="text"
                            required
                            value={leadContact}
                            onChange={(e) => setLeadContact(e.target.value)}
                            className="w-full bg-[#031327] border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="e.g. Dr. Rupandas / Administrator"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <input 
                            type="email"
                            required
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="w-full bg-[#031327] border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="e.g. contact@hospital.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <input 
                            type="tel"
                            required
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="w-full bg-[#031327] border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="e.g. +91 99000 12345"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block">Hospital Website (Optional)</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <input 
                            type="url"
                            value={leadWebsite}
                            onChange={(e) => setLeadWebsite(e.target.value)}
                            className="w-full bg-[#031327] border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="e.g. www.hospital.com"
                          />
                        </div>
                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-[0_4px_15px_rgba(240,90,79,0.35)] flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      {isSubmittingLead ? (
                        <>
                          <Activity className="h-4 w-4 animate-spin text-white" />
                          <span>SECURELY GENERATING REPORT CARD...</span>
                        </>
                      ) : (
                        <>
                          <span>GET MY FREE GROWTH AUDIT</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                    🔒 Protected under HIPAA compliance. Your metrics will never be shared with third parties.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= DETAILED REPORT BLURRED VIEWPORT ================= */}
          <div 
            id="estimator-results-content"
            className={`space-y-12 transition-all duration-500 select-none pointer-events-none ${
              isReportUnlocked ? "opacity-100 select-auto pointer-events-auto blur-none" : "opacity-30 blur-md pointer-events-none"
            }`}
          >
            {/* Header statement for unlocked view */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
              <div className="text-left">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-black tracking-widest">Report Calibrated Successfully</span>
                <h3 className="text-2xl font-black font-display text-white mt-1">Surgical Growth Audit: {hospitalName}</h3>
                <span className="text-xs text-slate-400 font-sans">Playbook customized for {surgeonsCount} surgeons, {bedsCount} beds, located in {city}.</span>
              </div>
              <div className="flex gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#031327] border border-[#00f0ff]/20 rounded-md text-[#00f0ff] font-mono text-[10px] font-bold">
                  <Activity className="h-3.5 w-3.5" />
                  ONLINE
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#031327] border border-emerald-500/20 rounded-md text-emerald-400 font-mono text-[10px] font-bold">
                  <Check className="h-3.5 w-3.5" />
                  VERIFIED AUDIT
                </div>
              </div>
            </div>

            {/* RESULTS DASHBOARD (Beautiful KPI cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {/* Card 1 */}
              <div className="bg-[#051830] border border-white/5 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Current Monthly Revenue</span>
                <span className="text-base sm:text-lg font-black font-mono text-white block mt-1.5">{formatCurrency(currentMonthlyRevenue)}</span>
                <div className="text-[9px] text-slate-500 font-mono mt-2 flex justify-between">
                  <span>Based on {currentSurgeriesCount} surgeries</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#051830] border border-cyan-400/20 rounded-xl p-4 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#00f0ff]/10 text-[#00f0ff] text-[6px] font-mono px-1 py-0.5 font-bold uppercase tracking-widest">POTENTIAL</div>
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Potential Monthly Revenue</span>
                <span className="text-base sm:text-lg font-black font-mono text-cyan-400 block mt-1.5">{formatCurrency(potentialMonthlyRevenue)}</span>
                <div className="text-[9px] text-slate-400 font-mono mt-2 flex justify-between">
                  <span>Based on {targetSurgeriesCount} surgeries</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#051830] border border-emerald-500/20 rounded-xl p-4 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-300 text-[6px] font-mono px-1 py-0.5 font-bold uppercase tracking-widest">RECOVERY</div>
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Monthly Revenue Increase</span>
                <span className="text-base sm:text-lg font-black font-mono text-emerald-400 block mt-1.5">{formatCurrency(additionalMonthlyRevenue)}</span>
                <div className="text-[9px] text-emerald-400 font-mono mt-2">
                  <span>+{additionalSurgeries} additional surgeries /mo</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#051830] border border-white/5 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Current Monthly Surgeries</span>
                <span className="text-base sm:text-lg font-black font-mono text-white block mt-1.5">{currentSurgeriesCount}</span>
                <div className="text-[9px] text-slate-500 font-mono mt-2">
                  <span>Yield: {simCurrentConversion}% of OPD</span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-[#051830] border border-cyan-400/20 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Potential Monthly Surgeries</span>
                <span className="text-base sm:text-lg font-black font-mono text-cyan-300 block mt-1.5">{targetSurgeriesCount}</span>
                <div className="text-[9px] text-cyan-400 font-mono mt-2">
                  <span>Yield Goal: {simTargetConversion}% of OPD</span>
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-[#051830] border border-emerald-500/20 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-emerald-400 uppercase block font-bold">Growth Percentage</span>
                <span className="text-base sm:text-lg font-black font-mono text-emerald-300 block mt-1.5">
                  +{(((targetSurgeriesCount - currentSurgeriesCount) / (currentSurgeriesCount || 1)) * 100).toFixed(0)}%
                </span>
                <div className="text-[9px] text-slate-400 font-mono mt-2">
                  <span>Target multiplier yield</span>
                </div>
              </div>

              {/* Card 7 */}
              <div className="bg-[#051830] border border-rose-500/20 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-rose-400 uppercase block font-bold">Monthly Revenue Leakage</span>
                <span className="text-base sm:text-lg font-black font-mono text-rose-400 block mt-1.5">{formatCurrency(estimatedRevenueLeakage)}</span>
                <div className="text-[9px] text-rose-400/80 font-mono mt-2">
                  <span>Left on counseling tables</span>
                </div>
              </div>

              {/* Card 8 */}
              <div className="bg-gradient-to-r from-emerald-950/20 to-[#051830] border border-emerald-400/20 rounded-xl p-4 text-left relative overflow-hidden">
                <span className="text-[8px] font-mono text-emerald-400 uppercase block font-bold">Annual Recovery Potential</span>
                <span className="text-base sm:text-lg font-black font-mono text-emerald-300 block mt-1.5">{formatCurrency(potentialRevenueRecovery)}</span>
                <div className="text-[9px] text-emerald-300 font-mono mt-2">
                  <span>Sealing intake loop leakages</span>
                </div>
              </div>

            </div>

            {/* VISUAL CHARTS (Custom glowing SVGs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Chart 1: Revenue Growth Curve */}
              <div className="bg-[#051830] border border-white/5 rounded-2xl p-5 text-left space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">MONTHLY REVENUE GROWTH PROJECTION</span>
                
                {/* SVG Curve */}
                <div className="h-44 w-full relative">
                  <svg viewBox="0 0 300 120" className="w-full h-full text-cyan-400" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.03)" />
                    
                    {/* Shaded Area */}
                    <path d="M 0,110 L 60,95 L 120,90 L 180,60 L 240,40 L 300,15 L 300,120 L 0,120 Z" fill="url(#curve-grad)" />
                    {/* Curve Line */}
                    <path d="M 0,110 Q 75,90 150,75 T 300,15" stroke="#00f0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    
                    {/* Current point */}
                    <circle cx="50" cy="98" r="4.5" fill="#f05a4f" />
                    {/* Target point */}
                    <circle cx="270" cy="25" r="5.5" fill="#10b981" className="animate-pulse" />
                  </svg>
                  <div className="absolute top-1 right-2 text-[8px] font-mono bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded">
                    Target Standard
                  </div>
                  <div className="absolute bottom-1 left-2 text-[8px] font-mono bg-red-500/15 border border-red-500/20 text-rose-400 px-1 py-0.5 rounded">
                    Current Baseline
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/5 pt-3">
                  <span>Current: {formatCurrency(currentMonthlyRevenue)}</span>
                  <span>Target Goal: {formatCurrency(potentialMonthlyRevenue)}</span>
                </div>
              </div>

              {/* Chart 2: Patient Conversion Funnel */}
              <div className="bg-[#051830] border border-white/5 rounded-2xl p-5 text-left space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">OPD-TO-SURGERY CONVERSION FUNNEL</span>

                <div className="space-y-3 pt-2">
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-300">Total Monthly Enquiries</span>
                      <span className="text-white font-bold">{monthlyEnquiries} (100%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500/80 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-300">OPD Arrivals</span>
                      <span className="text-white font-bold">{monthlyOPD} ({Math.round((monthlyOPD / (monthlyEnquiries || 1)) * 100)}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400/80 rounded-full" style={{ width: `${(monthlyOPD / (monthlyEnquiries || 1)) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-rose-400 font-bold">Current Surgery Bookings (Baseline)</span>
                      <span className="text-rose-400 font-bold">{currentSurgeriesCount} ({simCurrentConversion}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500/80 rounded-full" style={{ width: `${simCurrentConversion}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">Optimized Surgery Bookings (Target)</span>
                      <span className="text-emerald-400 font-bold">{targetSurgeriesCount} ({simTargetConversion}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400/80 rounded-full" style={{ width: `${simTargetConversion}%` }} />
                    </div>
                  </div>

                </div>

                <p className="text-[10px] text-slate-500 font-sans leading-relaxed pt-2 border-t border-white/5">
                  The target conversion models an additional <strong className="text-emerald-400">+{additionalSurgeries} surgeries</strong> per month by closing intake loopholes.
                </p>
              </div>

              {/* Chart 3: Growth Opportunity Gauge */}
              <div className="bg-[#051830] border border-white/5 rounded-2xl p-5 text-left space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">HOSPITAL CAPACITY UTILIZATION GAUGE</span>

                {/* Dial Gauge */}
                <div className="h-40 w-full relative flex items-center justify-center">
                  <div className="relative w-36 h-28 flex items-center justify-center overflow-hidden">
                    {/* Semisphere SVG */}
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <defs>
                        <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#f05a4f" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      {/* Arc background */}
                      <path d="M 10,50 A 40,40 0 0,1 90,50" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" strokeLinecap="round" />
                      {/* Colored arc */}
                      <path d="M 10,50 A 40,40 0 0,1 90,50" stroke="url(#gauge-grad)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="0" opacity="0.3" />
                      
                      {/* Current vs Target indicator tickmarks */}
                      <line x1="10" y1="45" x2="15" y2="45" stroke="#f05a4f" strokeWidth="2" />
                      <line x1="90" y1="45" x2="85" y2="45" stroke="#10b981" strokeWidth="2" />
                    </svg>

                    {/* Centered Dial needle */}
                    <div 
                      className="absolute bottom-0 h-1 bg-white origin-left rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      style={{ 
                        width: "55px", 
                        left: "50%", 
                        transform: `rotate(${180 + (simTargetConversion * 1.8)}deg)` 
                      }} 
                    />
                    
                    <div className="absolute bottom-0 flex flex-col items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Target Efficiency</span>
                      <span className="text-xl font-black font-display text-white">{simTargetConversion}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono border-t border-white/5 pt-3">
                  <div className="bg-[#031327] p-1.5 rounded">
                    <span className="block text-slate-500 uppercase">Current</span>
                    <span className="block text-rose-400 font-extrabold">{simCurrentConversion}%</span>
                  </div>
                  <div className="bg-[#031327] p-1.5 rounded">
                    <span className="block text-slate-400 uppercase">Target</span>
                    <span className="block text-emerald-400 font-extrabold">{simTargetConversion}%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION FOOTER */}
            <div className="bg-[#06241a]/40 border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-black uppercase tracking-wider">Congratulations, {leadContact}!</span>
                <h4 className="text-lg font-bold font-display text-white">Your Hospital Growth Report is Ready for Dispatch</h4>
                <p className="text-xs text-slate-300 max-w-xl font-sans leading-relaxed">
                  Sunil Sulegai's operational consulting desk has received your benchmark calibrations. We will compile a comprehensive 12-page operational diagnostic audit PDF and send it to <strong>{leadEmail}</strong> within 12 business hours.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-brand-coral hover:bg-brand-coral/90 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shrink-0 cursor-pointer shadow-[0_4px_15px_rgba(240,90,79,0.35)] min-h-[48px]"
              >
                REQUEST DISPATCH CALL NOW
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
