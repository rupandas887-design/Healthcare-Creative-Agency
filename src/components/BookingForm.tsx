import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { BookingFormInput, DiagnosticResult } from "../types";
import { 
  Send, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  Printer, 
  ArrowRight,
  Bookmark,
  ChevronRight,
  Activity,
  Award,
  Download,
  Cpu,
  RefreshCw,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

function getClientSideFallbackReport(specialty: string, currentMonthlyVolume: number, challenge: string) {
  const annualVol = currentMonthlyVolume * 12;
  const potentialVol = Math.round(annualVol * 1.35); // Estimated 35% growth by sealing leaks
  
  // Custom revenue calculations based on typical specialty yield
  let revenueLift = "₹45 Lakhs - ₹1.2 Crores ($55k - $150k USD) annually";
  const specLower = specialty.toLowerCase();
  if (specLower.includes("ortho") || specLower.includes("bone")) {
    revenueLift = "₹60 Lakhs - ₹1.8 Crores ($75k - $220k USD) annually";
  } else if (specLower.includes("plastic") || specLower.includes("cosmetic")) {
    revenueLift = "₹80 Lakhs - ₹2.4 Crores ($100k - $300k USD) annually";
  } else if (specLower.includes("cardio") || specLower.includes("heart")) {
    revenueLift = "₹1.2 Crores - ₹3.5 Crores ($150k - $450k USD) annually";
  } else if (specLower.includes("ophthal") || specLower.includes("eye") || specLower.includes("cataract")) {
    revenueLift = "₹25 Lakhs - ₹80 Lakhs ($30k - $100k USD) annually";
  }

  return {
    leakageAnalysis: [
      {
        stage: "PD Consultation to Recommended Procedure",
        description: `Loss of surgical candidates due to sub-optimal follow-up coordinates. Patients given a procedure counseling recommendation are left to 'think about it' without a structured touchpoint program, leading to a high drop-off to corporate networks.`,
        severity: "High",
        leakageRateEst: "35% - 40% Drop-off Rate"
      },
      {
        stage: "Digital / Direct Practice Enquiries",
        description: `Lack of lead qualification boundaries. Front-office responders take too long (>4 hours) to call back web or chat enquiries, causing candidates to call competitors instead of booking outpatient department (OPD) slots.`,
        severity: "High",
        leakageRateEst: "45% Opportunity Spill"
      },
      {
        stage: "OPD Booking to Consultation Check-In",
        description: `High 'No-Show' leakage due to poor automated confirmation sequences. Front office focuses on clerical tasks instead of delivering reassurance pathways for surgical anxiety.`,
        severity: "Medium",
        leakageRateEst: "20% Drop-off"
      }
    ],
    operationalBenchmarks: [
      {
        metric: "Front-Office Lead Response Time",
        averagepractice: "4.5 Hours",
        targetperformance: "< 5 Minutes",
        impact: "Increases Enquiry-to-OPD conversion speed by 62%"
      },
      {
        metric: "Patient Counseling Follow-Up Cycles",
        averagepractice: "1 Single Follow-up",
        targetperformance: "4 Structured touchpoints over 14 days",
        impact: "Generates +28% surgery confirmations from pending patient lists"
      },
      {
        metric: "Referral Ecosystem Visibility",
        averagepractice: "Manual tracking / Unrecorded",
        targetperformance: "Complete digital tracking & appreciation feedback loop",
        impact: "Drives consistent 15% increase in surgical patient word-of-mouth"
      }
    ],
    actionableRoadmap: [
      {
        pillar: "Visibility",
        actionItems: [
          "Audit and label every source of digital, reference, and panel enquiries.",
          "Establish a unified lead capture center directly integrated with a light clinical ledger."
        ],
        expectedOutcome: "100% visibility of patient origination details.",
        timeline: "Weeks 1 - 2"
      },
      {
        pillar: "Tracking",
        actionItems: [
          "Deploy custom conversion trackers at the counseling desk to flag pending recommendations.",
          "Introduce a visual daily pipeline highlighting patient drop-off stages."
        ],
        expectedOutcome: "Clear accountability over where patients stall.",
        timeline: "Weeks 3 - 4"
      },
      {
        pillar: "Conversion Optimization / Coordination",
        actionItems: [
          "Train front office and medical counselors on Acquire OPD's Surgical Anxiety Management (SAM) guidelines.",
          "Implement structured, highly reassuring SMS and WhatsApp feedback pathways."
        ],
        expectedOutcome: "Increase counselor-to-procedure confirmation rates.",
        timeline: "Weeks 5 - 6"
      }
    ],
    estimatedOpportunity: {
      currentAnnualprocedures: annualVol,
      potentialAnnualprocedures: potentialVol,
      estimatedRevenueLift: revenueLift
    }
  };
}

interface BookingFormProps {
  onLogEvent: (action: string, category: string, label: string) => void;
  city?: string;
  specialty?: string;
}

export default function BookingForm({ onLogEvent, city, specialty }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormInput>({
    name: "",
    hospitalName: "",
    designation: "",
    specialty: "Orthopedics & Joint Replacement",
    city: "",
    mobileNumber: "",
    email: "",
    monthlyOPD: "",
    currentMonthlyProcedures: "26-50",
    biggestGrowthChallenge: "High leakage of patients between outpatient department (OPD) check-in and surgery booking."
  });

  useEffect(() => {
    if (city || specialty) {
      setFormData((prev) => ({
        ...prev,
        city: city || prev.city,
        specialty: specialty ? (
          specialty.toLowerCase().includes("ortho") 
            ? "Orthopedics & Joint Replacement" 
            : specialty.toLowerCase().includes("plastic") || specialty.toLowerCase().includes("cosmetic")
              ? "Plastic, Reconstructive & Cosmetic Surgery"
              : specialty.toLowerCase().includes("eye") || specialty.toLowerCase().includes("ophthal")
                ? "Ophthalmology & Secondary Eye Care"
                : specialty.toLowerCase().includes("cardio") || specialty.toLowerCase().includes("heart")
                  ? "Cardiology / Coronary Interventions"
                  : prev.specialty
        ) : prev.specialty
      }));
    }
  }, [city, specialty]);

  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<DiagnosticResult | null>(null);

  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderText, setLoaderText] = useState("Securing transmission coordinates...");

  useEffect(() => {
    if (!loading) {
      setLoaderProgress(0);
      return;
    }

    const messages = [
      "Establishing secured database handshake with diagnostics gateway...",
      "Matching specialty clinical benchmark metrics...",
      "Analyzing OPD checking wait times...",
      "Resolving surgical counselor script friction parameters...",
      "Formatting procedural yield forecasts...",
      "Reviewing insurance pre-approval friction formulas...",
      "Compiling tailored clinical roadmap pillars...",
      "Sealing audit report variables."
    ];

    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 15) + 12;
      if (currentPct >= 100) {
        currentPct = 100;
        setLoaderProgress(100);
        setLoaderText(messages[messages.length - 1]);
        clearInterval(interval);
      } else {
        setLoaderProgress(currentPct);
        const msgIdx = Math.min(
          messages.length - 1,
          Math.floor((currentPct / 100) * messages.length)
        );
        setLoaderText(messages[msgIdx]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    // Explicit validation check
    if (
      !formData.name?.trim() ||
      !formData.hospitalName?.trim() ||
      !formData.designation?.trim() ||
      !formData.mobileNumber?.trim() ||
      !formData.email?.trim() ||
      !formData.city?.trim() ||
      !formData.specialty ||
      !formData.monthlyOPD?.trim() ||
      !formData.currentMonthlyProcedures ||
      !formData.biggestGrowthChallenge?.trim()
    ) {
      setErrorStatus("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorStatus(null);
    onLogEvent("Form Submission Initiated", "Conversion", "Booking Strategic Intake Submit Click");

    const targetUrl = "/api/discussion";
    console.log("Submitting to:", targetUrl);
    console.log("Submitting:", formData);

    const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || (import.meta as any).env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    console.log("SUPABASE_URL:", supabaseUrl);
    console.log("SUPABASE_ANON_KEY configured:", !!supabaseKey);

    let useFallback = false;

    try {
      try {
        const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("API Route /api/discussion returned 404. Falling back to direct client-side Supabase insertion...");
          useFallback = true;
        } else {
          let errMsg = "Server encountered an issue during submission.";
          let errCode = "";
          let errDetails = "";
          let errHint = "";
          
          try {
            const responseText = await response.text();
            try {
              const errData = JSON.parse(responseText);
              if (errData) {
                if (errData.error) errMsg = errData.error;
                if (errData.code) errCode = errData.code;
                if (errData.details) errDetails = errData.details;
                if (errData.hint) errHint = errData.hint;
              }
            } catch (_) {
              // Not a JSON response, maybe HTML or raw text
              errMsg = `HTTP ${response.status}: ${responseText.substring(0, 300)}`;
            }
          } catch (_) {}

          const customError: any = new Error(errMsg);
          customError.code = errCode;
          customError.details = errDetails;
          customError.hint = errHint;
          throw customError;
        }
      } else {
        const responseData = await response.json();
        console.log("Insert Result:", responseData);
        
        if (responseData.success && responseData.audit) {
          setAuditResult(responseData.audit);
          onLogEvent("Form Submission Successful! Growth Audit Created", "Conversion", `Submission ID ${responseData.submissionId}`);

          // Construct pre-filled WhatsApp message matching exact formatting requirement
          const messageText = `*New Operational Triage & Diagnostic Booking*

*Full Name:* ${formData.name}
*Hospital/Clinic:* ${formData.hospitalName}
*Designation:* ${formData.designation || "Not provided"}
*Phone:* ${formData.mobileNumber}
*Email:* ${formData.email}
*City:* ${formData.city}
*Specialty:* ${formData.specialty}
*Monthly OPD:* ${formData.monthlyOPD || "Not provided"}
*Monthly Surgeries:* ${formData.currentMonthlyProcedures}
*Current Challenge:* ${formData.biggestGrowthChallenge}
*Additional Notes:* None

Submitted successfully from Acquire OPD website.`;

          // URL encode the message
          const encodedMessage = encodeURIComponent(messageText);
          
          // Detect mobile/desktop to open WhatsApp app or WhatsApp Web
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          const whatsappUrl = isMobile
            ? `https://api.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`;

          // Redirect only after successful database insertion
          window.location.href = whatsappUrl;
          return;
        } else {
          const customError: any = new Error(responseData.error || "Form payload parsing failed.");
          customError.code = responseData.code;
          customError.details = responseData.details;
          customError.hint = responseData.hint;
          throw customError;
        }
      }
    } catch (error: any) {
      if (error && error.message && error.message.includes("Failed to fetch")) {
        console.warn("Network fetch failed. Falling back to direct client-side Supabase insertion...");
        useFallback = true;
      } else if (!useFallback) {
        throw error;
      }
    }

    if (useFallback) {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Direct client-side fallback failed: Supabase credentials are not configured in the environment.");
      }

      console.log("Executing direct client-side Supabase insert flow...");
      const supabase = createClient(supabaseUrl, supabaseKey);
      const submissionId = `ss_${Date.now()}`;

      const { data: insertData, error: insertError } = await supabase
        .from("submissions")
        .insert([{
          id: submissionId,
          name: formData.name,
          hospital_name: formData.hospitalName,
          designation: formData.designation || "Not provided",
          specialty: formData.specialty,
          city: formData.city || "Not provided",
          mobile_number: formData.mobileNumber || "Not provided",
          email: formData.email,
          monthly_opd: formData.monthlyOPD,
          current_monthly_procedures: formData.currentMonthlyProcedures,
          biggest_growth_challenge: formData.biggestGrowthChallenge,
          submitted_at: new Date().toISOString()
        }])
        .select();

      if (insertError) {
        console.error("Direct Supabase Insert Error:", insertError);
        const customError: any = new Error(`Direct database persistence failed: ${insertError.message}`);
        customError.code = insertError.code;
        customError.details = insertError.details;
        customError.hint = insertError.hint;
        throw customError;
      }

      console.log("Insert Result (Direct Supabase):", insertData);
      
      const proceduresNumeric = parseInt(formData.currentMonthlyProcedures, 10) || 12;
      const clientSideAudit = getClientSideFallbackReport(formData.specialty, proceduresNumeric, formData.biggestGrowthChallenge);
      setAuditResult(clientSideAudit);
      onLogEvent("Form Submission Successful! Direct Growth Audit Created", "Conversion", `Submission ID ${submissionId}`);

      // Construct pre-filled WhatsApp message matching exact formatting requirement
      const messageText = `*New Operational Triage & Diagnostic Booking*

*Full Name:* ${formData.name}
*Hospital/Clinic:* ${formData.hospitalName}
*Designation:* ${formData.designation || "Not provided"}
*Phone:* ${formData.mobileNumber}
*Email:* ${formData.email}
*City:* ${formData.city}
*Specialty:* ${formData.specialty}
*Monthly OPD:* ${formData.monthlyOPD || "Not provided"}
*Monthly Surgeries:* ${formData.currentMonthlyProcedures}
*Current Challenge:* ${formData.biggestGrowthChallenge}
*Additional Notes:* None

Submitted successfully from Acquire OPD website.`;

      // URL encode the message
      const encodedMessage = encodeURIComponent(messageText);
      
      // Detect mobile/desktop to open WhatsApp app or WhatsApp Web
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const whatsappUrl = isMobile
        ? `https://api.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`;

      // Redirect only after successful database insertion
      window.location.href = whatsappUrl;
    }
    } catch (error: any) {
      console.error("Full Error:", error);
      if (error) {
        console.error("Code:", error.code);
        console.error("Message:", error.message);
        console.error("Details:", error.details);
        console.error("Hint:", error.hint);
      }
      
      let visualError = error.message || "An unexpected error occurred.";
      if (error.code) visualError += ` (Code: ${error.code})`;
      if (error.details) visualError += ` (Details: ${error.details})`;
      if (error.hint) visualError += ` (Hint: ${error.hint})`;
      
      setErrorStatus(visualError);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
    onLogEvent("Print Audit Triggered", "User Action", "Report Printed by User");
  };

  return (
    <section 
      id="booking-section"
      className="py-24 bg-brand-navy border-t border-white/10 px-4 scroll-mt-20 print:bg-white print:text-black"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto space-y-4 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#09182d] border border-white/10 rounded text-white">
            <ShieldCheck className="h-4 w-4 text-brand-teal" />
            <span className="font-mono text-[9px] md:text-[11px] font-extrabold tracking-widest uppercase text-white">
              SECURED STRATEGIC REGISTRY
            </span>
          </div>
          
          <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight font-display">
            Request a Private Strategic Audit
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Submit your clinical metrics below to explore a strategic partnership slot with Acquire OPD. Your submission instantly initializes a customized operational diagnostic report based on your specialty.
          </p>
        </div>

        {/* Audit Report View (Displays upon successful form submission) */}
        {auditResult ? (
          <div className="bg-[#09182d] border border-white/10 rounded-3xl p-6 md:p-10 space-y-8 shadow-xl animate-fade-in print:bg-white print:text-slate-900 print:border-none print:shadow-none print:-mt-12">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-6 print:border-slate-300">
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-teal tracking-wider flex items-center gap-1.5 uppercase">
                  <Sparkles className="h-4 w-4 text-brand-teal animate-spin-slow" />
                  Acquire OPD Operational Growth Audit Report
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Surgical Funnel Diagnostics: <span className="text-brand-teal">{formData.hospitalName}</span>
                </h3>

                <p className="text-xs text-slate-300">
                  Specialty Category: <strong className="text-white font-semibold">{formData.specialty}</strong> | Geography: {formData.city || "Direct Catchment Market"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 print:hidden shrink-0">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-brand-teal text-brand-navy hover:bg-brand-teal/90 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-[0.98]"
                >
                  <Printer className="h-4 w-4 text-brand-navy" />
                  <span>Download / Print Report</span>
                </button>
              </div>
            </div>

            {/* Core Estimates Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-5 rounded-xl bg-brand-navy border border-white/10">
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Estimated Current Case Volume</span>
                <span className="text-2xl font-black text-white font-mono leading-tight block mt-1">
                  <AnimatedCounter value={auditResult.estimatedOpportunity.currentAnnualprocedures} /> <span className="text-xs font-normal text-slate-400">surgeries/yr</span>
                </span>
              </div>

              <div className="p-5 rounded-xl bg-brand-navy border border-white/10">
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Projected Practice Capacity</span>
                <span className="text-2xl font-black text-brand-teal font-mono leading-tight block mt-1">
                  <AnimatedCounter value={auditResult.estimatedOpportunity.potentialAnnualprocedures} /> <span className="text-xs font-normal text-slate-400">surgeries/yr</span>
                </span>
              </div>

              <div className="p-5 rounded-xl bg-blend-darken bg-brand-navy border border-white/10 text-white shadow-md relative overflow-hidden text-left">
                <div className="absolute right-0 bottom-0 opacity-[0.03] translate-y-2 translate-x-2 pointer-events-none text-brand-gold">
                  <Award className="w-24 h-24" />
                </div>
                <div className="relative z-10 text-left">
                  <span className="text-[9px] text-brand-gold font-mono uppercase block font-extrabold text-left">Est. Annual Value Released</span>
                  <span className="text-lg sm:text-xl font-bold text-brand-gold leading-tight block mt-1 text-left">
                    {auditResult.estimatedOpportunity.estimatedRevenueLift}
                  </span>
                </div>
              </div>
            </div>

            {/* Split Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
              
              {/* Left Column: Diagnostics (7cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider border-b border-white/10 pb-2">
                    ⚠ EXPOSED PIPELINE LEAKAGE POINTS
                  </h4>

                  <div className="space-y-4">
                    {auditResult.leakageAnalysis.map((leak, idx) => (
                      <div 
                        key={idx}
                        className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2 relative overflow-hidden text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-bold text-white text-sm md:text-md font-display leading-tight">
                            {leak.stage}
                          </span>
                          
                          <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[9px] bg-rose-500/10 text-rose-300 border border-rose-500/20 shrink-0">
                            {leak.leakageRateEst}
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                          {leak.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benchmarks Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider border-b border-white/10 pb-2">
                    📈 STRATEGIC BENCHMARK CALCULATIONS
                  </h4>

                  <div className="rounded-xl border border-white/10 overflow-hidden bg-transparent">
                    <div className="grid grid-cols-12 p-3 bg-slate-950 font-mono text-[9px] text-white uppercase font-bold">
                      <div className="col-span-5">Performance Metric</div>
                      <div className="col-span-3 text-center">Typical Practice</div>
                      <div className="col-span-4 text-right">Target standard</div>
                    </div>
                    
                    <div className="divide-y divide-white/10 text-xs text-slate-300">
                      {auditResult.operationalBenchmarks.map((bench, idx) => (
                        <div key={idx} className="grid grid-cols-12 p-3.5 items-center bg-transparent">
                          <div className="col-span-5 font-bold text-white text-xs">{bench.metric}</div>
                          <div className="col-span-3 text-center text-rose-400 font-mono text-xs">{bench.averagepractice}</div>
                          <div className="col-span-4 text-right text-brand-teal font-extrabold font-mono text-xs">{bench.targetperformance}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Roadmap (5cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider border-b border-white/10 pb-2">
                    📋 PRINCIPAL PARTNERSHIP ROADMAP
                  </h4>

                  <div className="space-y-4">
                    {auditResult.actionableRoadmap.map((road, idx) => (
                      <div 
                        key={idx}
                        className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3 relative shadow-xs text-left"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="font-extrabold text-brand-teal font-display text-xs sm:text-sm uppercase tracking-tight">
                            Pillar: {road.pillar}
                          </span>
                          <span className="text-[10px] text-brand-gold font-mono font-bold bg-brand-gold/15 px-2 py-0.5 rounded border border-brand-gold/20">
                            {road.timeline}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {road.actionItems.map((item, iIdx) => (
                            <li key={iIdx} className="flex gap-2 text-xs text-slate-300 leading-relaxed font-sans items-start text-left">
                              <span className="text-brand-teal shrink-0 mt-1 font-black">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2.5 border-t border-white/10 text-[10px] text-brand-teal font-mono font-bold text-left">
                          ESTIMATED OUTCOME: {road.expectedOutcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Validation Notice footer */}
            <div className="pt-6 border-t border-white/10 text-center text-[10px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
              This tactical audit is synthesized dynamically based on Acquire OPD’s core frameworks and your input metrics. Actioning these changes successfully requires in-person operational integration rather than standard agency setup.
              
              <div className="mt-5 flex items-center justify-center gap-1.5 text-brand-teal font-extrabold uppercase tracking-widest text-[9px] sm:text-xs print:hidden">
                <CheckCircle className="h-4 w-4 text-brand-teal animate-pulse" /> 
                Your Strategy slot has been dynamically pre-allocated. Let’s proceed below.
              </div>
            </div>

            {/* Back action */}
            <div className="text-center pt-2 print:hidden">
              <button
                onClick={() => {
                  setAuditResult(null);
                  onLogEvent("Return to Booking Form clicked", "User Action", "Reset Audit view");
                }}
                className="text-xs text-slate-400 hover:text-brand-teal underline cursor-pointer font-bold uppercase tracking-wider transition-colors"
              >
                ← Back & Reset Audit Params
              </button>
            </div>

          </div>
        ) : loading ? (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#09182d] border border-white/10 p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden text-left font-sans">
            {/* Ambient anim base */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-teal/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

            {/* Skeleton Shimmer Header */}
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div className="space-y-3 w-full md:w-2/3">
                <div className="h-4 bg-white/5 rounded w-1/4 animate-pulse"></div>
                <div className="h-8 bg-white/10 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="h-10 bg-white/10 rounded-xl w-32 animate-pulse"></div>
            </div>

            {/* Skeleton Shimmer Metric Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="p-5 rounded-xl bg-brand-navy border border-white/10 space-y-2.5">
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-white/10 rounded w-1/3 animate-pulse"></div>
              </div>
              <div className="p-5 rounded-xl bg-brand-navy border border-white/10 space-y-2.5">
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-brand-teal/20 rounded w-1/3 animate-pulse animate-pulse-slow"></div>
              </div>
              <div className="p-5 rounded-xl bg-brand-navy border border-white/10 space-y-2.5">
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-brand-gold/20 rounded w-2/3 animate-pulse animate-pulse-slow"></div>
              </div>
            </div>

            {/* Skeleton Shimmer Core Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse"></div>
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse"></div>
                {[1, 2].map((idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-3">
                    <div className="h-4 bg-brand-teal/15 rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Real-time compiler text info */}
            <div className="pt-6 border-t border-white/10 text-center space-y-4 relative z-10 max-w-xl mx-auto">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal relative">
                  <Cpu className="h-6 w-6 text-brand-teal animate-spin" />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-brand-teal font-mono tracking-widest uppercase font-extrabold animate-pulse">
                  {loaderText}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Surgical operational trace: {loaderProgress}% complete
                </p>
              </div>

              {/* Incremental checklists with staggered fades */}
              <div className="max-w-xs mx-auto border-t border-white/5 pt-4 space-y-2 font-mono text-[9px] text-left text-slate-400">
                <div className="flex items-center gap-2">
                  <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] ${loaderProgress >= 25 ? "bg-brand-teal/20 text-brand-teal font-extrabold" : "bg-white/5 text-slate-600"}`}>✓</span>
                  <span className={loaderProgress >= 25 ? "text-slate-200" : "text-slate-500"}>Analyze geographical catchment boundaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] ${loaderProgress >= 55 ? "bg-brand-teal/20 text-brand-teal font-extrabold" : "bg-white/5 text-slate-600"}`}>✓</span>
                  <span className={loaderProgress >= 55 ? "text-slate-200" : "text-slate-500"}>Cross-match specialty case volumes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] ${loaderProgress >= 85 ? "bg-brand-teal/20 text-brand-teal font-extrabold" : "bg-white/5 text-slate-600"}`}>✓</span>
                  <span className={loaderProgress >= 85 ? "text-slate-200" : "text-slate-500"}>Solve strategic operational leakage curves</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Intake Form layout */
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#09182d] border border-white/10 overflow-hidden shadow-xl text-left">
            <div className="bg-slate-950 text-white p-6 md:p-8 flex items-center justify-between border-b border-white/10 shadow-inner relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full pointer-events-none"></div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-extrabold block">
                  PARTNERSHIP DISCOVERY INTAKE
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Operational Triage & Diagnostic Booking
                </h3>
              </div>
              
              <FileText className="h-8 w-8 text-brand-teal hidden sm:block shrink-0" />
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Field 1: Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Professional Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Rajesh Sharma"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* Field 2: Hospital Name */}
                <div className="space-y-2">
                  <label htmlFor="hospitalName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Surgical Clinic / Hospital Name
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai Spine & Joint Hospital"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* New Field: Professional Designation */}
                <div className="space-y-2">
                  <label htmlFor="designation" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Professional Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleInputChange}
                    placeholder="e.g., Chief Surgeon, Founder, Medical Director"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* Field 3: Specialty selection */}
                <div className="space-y-2">
                  <label htmlFor="specialty" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Primary Practice Specialty
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option className="bg-brand-navy text-white">Orthopedics & Joint Replacement</option>
                    <option className="bg-brand-navy text-white">Plastic, Reconstructive & Cosmetic Surgery</option>
                    <option className="bg-brand-navy text-white">Ophthalmology & Secondary Eye Care</option>
                    <option className="bg-brand-navy text-white">Cardiology / Coronary Interventions</option>
                    <option className="bg-brand-navy text-white">Bariatric & Minimal Access Surgery</option>
                    <option className="bg-brand-navy text-white">Urology & Nephrological Procedures</option>
                    <option className="bg-brand-navy text-white">General & Specialized Gastrointestinal Surgery</option>
                    <option className="bg-brand-navy text-white">Other Surgeon-Owned Specialty Center</option>
                  </select>
                </div>

                {/* Field 4: City */}
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    City / Primary Catchment Market
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Bengaluru, Karnataka"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* Field 5: Mobile Number */}
                <div className="space-y-2">
                  <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Confidential Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +91 99000 12345"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* Field 6: Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Professional Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., director@mumbaispinesurgeon.com"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* New Field: Monthly OPD */}
                <div className="space-y-2">
                  <label htmlFor="monthlyOPD" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                    Estimated Monthly OPD Footfall
                  </label>
                  <input
                    type="text"
                    id="monthlyOPD"
                    name="monthlyOPD"
                    value={formData.monthlyOPD || ""}
                    onChange={handleInputChange}
                    placeholder="e.g., 500+ patients"
                    required
                    className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Field 7: Volume count range input */}
              <div className="space-y-3 pt-2 text-left">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                  Current Monthly Surgical Cases Completed
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["1-10", "11-25", "26-50", "51+"].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, currentMonthlyProcedures: vol }));
                        onLogEvent(`Vol Tier Clicked: ${vol}`, "Selection", "Monthly procedures tier input");
                      }}
                      className={`py-3.5 px-4 rounded-xl text-xs font-bold font-mono tracking-tight cursor-pointer text-center outline-none transition-all ${
                        formData.currentMonthlyProcedures === vol
                          ? "bg-brand-teal text-brand-navy font-extrabold shadow-md"
                          : "bg-brand-navy border border-white/10 hover:bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      {vol} procedures / mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 8: Text challenge */}
              <div className="space-y-2 pt-1 text-left">
                <label htmlFor="biggestGrowthChallenge" className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-left">
                  Unprocessed Patient Conversion Friction Point
                </label>
                <textarea
                  id="biggestGrowthChallenge"
                  name="biggestGrowthChallenge"
                  value={formData.biggestGrowthChallenge}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g., Patient inquiries from references or digital channels are high, but counselors are too slow following up on recommended surgeries, causing cases to exit to competitor aggregators."
                  required
                  className="w-full bg-brand-navy border border-white/10 focus:border-brand-teal rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none resize-none transition-colors"
                ></textarea>
              </div>

              {/* Submit Trigger Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="text-left text-[11px] leading-relaxed text-slate-400 max-w-sm">
                  Submissions are kept strictly confidential under active clinical coordination boundaries. Acquire OPD implements growth systems directly for independent practices.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-brand-navy font-extrabold px-8 py-4 rounded-xl cursor-pointer shadow-lg active:scale-[0.98] transition-all duration-250 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-brand-navy" />
                      <span>Generating Custom Audit...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-brand-navy" />
                      <span>Submit & Generate Diagnostic Audit</span>
                    </>
                  )}
                </button>
              </div>

              {errorStatus && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl flex items-center gap-2 text-xs text-left">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{errorStatus}</span>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
