import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Award, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Lock, 
  User, 
  Building2, 
  Mail, 
  MapPin, 
  BookOpen, 
  Compass, 
  Zap, 
  HeartHandshake,
  CheckCircle2,
  Check,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Target,
  AlertCircle
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

// Core APRA Questionnaire Configuration
export const sections = [
  {
    id: 'A',
    title: 'Practice Profile',
    icon: Building2,
    maxScore: 20,
    description: 'Tell us about your healthcare facility setup and volume.',
    questions: [
      {
        id: 1,
        text: 'What best describes your practice?',
        options: [
          { text: 'Independent Surgeon-owned Hospital', score: 10 },
          { text: 'Independent Specialty Clinic', score: 8 },
          { text: 'Multi-specialty Hospital with ownership stake', score: 6 },
          { text: 'Visiting Consultant only', score: 2 }
        ]
      },
      {
        id: 2,
        text: 'How many years has your practice been operating?',
        options: [
          { text: 'More than 10 years', score: 5 },
          { text: '5–10 years', score: 4 },
          { text: '2–5 years', score: 3 },
          { text: 'Less than 2 years', score: 1 }
        ]
      },
      {
        id: 3,
        text: 'Which best describes your current monthly surgical volume?',
        options: [
          { text: '50+ surgeries', score: 5 },
          { text: '25–49', score: 4 },
          { text: '10–24', score: 3 },
          { text: 'Less than 10', score: 1 }
        ]
      }
    ]
  },
  {
    id: 'B',
    title: 'Growth Mindset',
    icon: TrendingUp,
    maxScore: 25,
    description: 'Your clinical expansion objectives and referral dependency.',
    questions: [
      {
        id: 4,
        text: 'What is your biggest growth objective over the next 12 months?',
        options: [
          { text: 'Increase surgical volume significantly', score: 10 },
          { text: 'Improve OPD footfall', score: 8 },
          { text: 'Build personal brand', score: 6 },
          { text: 'Maintain current practice', score: 0 }
        ]
      },
      {
        id: 5,
        text: 'Which statement best describes your practice today?',
        options: [
          { text: 'We are actively investing for growth', score: 10 },
          { text: 'We are exploring structured growth options', score: 8 },
          { text: 'We only invest when absolutely necessary', score: 3 },
          { text: 'Growth is not a current priority', score: 0 }
        ]
      },
      {
        id: 6,
        text: 'How important is becoming less dependent on referrals?',
        options: [
          { text: 'Extremely important', score: 5 },
          { text: 'Important', score: 4 },
          { text: 'Somewhat important', score: 2 },
          { text: 'Not important', score: 0 }
        ]
      }
    ]
  },
  {
    id: 'C',
    title: 'Operational Readiness',
    icon: ClipboardCheck,
    maxScore: 25,
    description: 'System visibility, conversion metrics, and standard protocols.',
    questions: [
      {
        id: 7,
        text: 'Do you currently track enquiries, OPDs and surgery conversions in a structured system?',
        options: [
          { text: 'Yes, consistently', score: 8 },
          { text: 'Partially', score: 5 },
          { text: 'Basic Excel/manual records', score: 2 },
          { text: 'No tracking', score: 0 }
        ]
      },
      {
        id: 8,
        text: 'Is your front office willing to follow standard operating procedures?',
        options: [
          { text: 'Absolutely', score: 8 },
          { text: 'Mostly yes', score: 6 },
          { text: 'Unsure', score: 2 },
          { text: 'No', score: 0 }
        ]
      },
      {
        id: 9,
        text: 'Are you open to implementing technology and dashboards for better visibility?',
        options: [
          { text: 'Yes', score: 9 },
          { text: 'Maybe', score: 5 },
          { text: 'Not sure', score: 2 },
          { text: 'No', score: 0 }
        ]
      }
    ]
  },
  {
    id: 'D',
    title: 'Marketing Readiness',
    icon: Compass,
    maxScore: 15,
    description: 'Digital presence history and video content creation comfort.',
    questions: [
      {
        id: 10,
        text: 'Have you previously invested in digital marketing?',
        options: [
          { text: 'Successfully and continuously', score: 5 },
          { text: 'Yes, but results were inconsistent', score: 4 },
          { text: 'Tried once', score: 2 },
          { text: 'Never', score: 1 }
        ]
      },
      {
        id: 11,
        text: 'What best describes your online presence?',
        options: [
          { text: 'Strong and active', score: 5 },
          { text: 'Moderate', score: 3 },
          { text: 'Basic website only', score: 2 },
          { text: 'Almost none', score: 1 }
        ]
      },
      {
        id: 12,
        text: 'Are you willing to create educational video content regularly?',
        options: [
          { text: 'Yes', score: 5 },
          { text: 'Occasionally', score: 3 },
          { text: 'Only if convenient', score: 1 },
          { text: 'No', score: 0 }
        ]
      }
    ]
  },
  {
    id: 'E',
    title: 'Partnership Commitment',
    icon: HeartHandshake,
    maxScore: 15,
    description: 'Strategic duration and timeline commitments.',
    questions: [
      {
        id: 13,
        text: 'Which statement best reflects your approach?',
        options: [
          { text: 'I want a long-term strategic partner', score: 10 },
          { text: 'I prefer a structured growth roadmap', score: 8 },
          { text: 'I want to test with a short engagement', score: 5 },
          { text: 'I only need leads', score: 0 }
        ]
      },
      {
        id: 14,
        text: 'If measurable systems improve practice growth, are you willing to commit for at least six months?',
        options: [
          { text: 'Yes', score: 5 },
          { text: 'Possibly', score: 3 },
          { text: 'Not sure', score: 1 },
          { text: 'No', score: 0 }
        ]
      }
    ]
  }
];

// Flatten all core questions for easy step-by-step navigation
const allQuestions = sections.flatMap(sec => 
  sec.questions.map(q => ({
    ...q,
    sectionId: sec.id,
    sectionTitle: sec.title,
    sectionIcon: sec.icon,
    sectionDescription: sec.description
  }))
);

// Mandatory Knockout Validation Configuration
export const knockouts = [
  {
    id: 'ko1',
    text: 'Are you willing to invest consistently in practice growth rather than expecting immediate results?',
    options: [
      { text: 'Yes, I understand compounding results take time', value: 'Yes' },
      { text: 'No, I expect immediate overnight leads only', value: 'No' }
    ],
    errorMsg: 'Not Ready: Sustainable growth requires consistent, medium-to-long-term practice investment. We focus on compounding returns rather than quick, short-lived tricks.'
  },
  {
    id: 'ko2',
    text: 'Are you willing to work with Acquire OPD as your exclusive Surgical Practice Growth Partner for your specialty within the agreed geography during the contract period?',
    options: [
      { text: 'Yes, exclusivity is critical for a dominant brand presence', value: 'Yes' },
      { text: 'No, I prefer hiring multiple general agencies at the same time', value: 'No' }
    ],
    errorMsg: 'Model Mismatch: Our Surgical Practice Growth Partnership relies on strict geographic and specialty exclusivity to ensure we only scale one dominant brand per market. If exclusivity is not possible, we cannot deploy our full growth playbook.'
  }
];

const backgroundIcons = [
  { Icon: TrendingUp, top: '15%', left: '10%', delay: 0 },
  { Icon: Activity, top: '25%', right: '12%', delay: 1.5 },
  { Icon: Building2, bottom: '20%', left: '8%', delay: 3 },
  { Icon: ShieldCheck, bottom: '15%', right: '15%', delay: 0.8 },
  { Icon: Zap, top: '45%', right: '8%', delay: 2.2 },
  { Icon: HeartHandshake, bottom: '45%', left: '12%', delay: 4 }
];

const GlowingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none bg-white">
      {/* Soft Moving light blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 0.95, 1],
          x: [0, 15, -10, 0],
          y: [0, -20, 15, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-indigo-50/40 rounded-full blur-[130px]"
      />
      <motion.div
        animate={{
          scale: [1, 0.95, 1.05, 1],
          x: [0, -15, 10, 0],
          y: [0, 15, -15, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-blue-50/30 rounded-full blur-[110px]"
      />

      {/* Floating Glowing Circles / Light Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/10 blur-[1px]"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 16 - 8, 0],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Parallax Floating Icons */}
      {backgroundIcons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={index}
            className="absolute text-slate-400/5 hidden md:block"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
          >
            <IconComponent size={24} className="stroke-[1.5]" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function Assessment() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContainer = () => {
    if (!containerRef.current) return;
    const offset = 90; // comfortable spacing from fixed top navbar
    const targetY = window.pageYOffset + containerRef.current.getBoundingClientRect().top - offset;
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 10) return; // already close enough

    const duration = 600; // 600ms within 500-700ms requirement
    let startTime: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // EaseInOutQuad transition formula
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distance * ease);

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    document.title = "Partnership Readiness Assessment (APRA) | Acquire OPD";
    window.scrollTo(0, 0);
  }, []);

  // Track cursor coordinates for the mouse-follow spot glow effect
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // New multi-step design:
  // step === 0: Lead Form
  // step >= 1 && step <= 14: Individual questions
  // step === 15: Knockout 1
  // step === 16: Knockout 2
  // step === 17: Analyzing consulting transition (automated loading)
  // step === 18: Personalized Insights & Prescribed Recommendation Report
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    // Only scroll if we are actively moving between steps
    if (step >= 0 && step <= 17) {
      const timer = setTimeout(() => {
        scrollToContainer();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // User Contact Lead Info
  const [lead, setLead] = useState({
    name: '',
    hospital: '',
    mobile: '',
    email: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const getInputClassName = (fieldName: keyof typeof lead, value: string, hasError: boolean) => {
    const isFilled = value && value.trim() !== "";
    const borderClass = hasError
      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/15 focus:shadow-[0_0_12px_rgba(244,63,94,0.15)]"
      : isFilled
        ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/15 focus:shadow-[0_0_12px_rgba(16,185,129,0.15)]"
        : "border-gray-300 hover:border-primary-500 focus:border-primary-500 focus:ring-primary-500/15 focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]";

    return `w-full h-[52px] min-h-[52px] px-5 py-3.5 rounded-[14px] border-[1.5px] ${borderClass} focus:ring-2 focus:outline-none bg-white transition-all duration-300 font-medium text-slate-900 placeholder-gray-400 text-base shadow-sm`;
  };

  // Answers State: maps question ID to index of the chosen option
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // Knockout choices State: maps knockout ID to value chosen ('Yes' or 'No')
  const [koAnswers, setKoAnswers] = useState<Record<string, string>>({});

  // Submission / Database state
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [submittedResults, setSubmittedResults] = useState<{
    leadName: string;
    leadHospital: string;
    leadMobile: string;
    leadCity: string;
    finalScore: number;
    hasFailedKnockouts: boolean;
    failedKnockout1: boolean;
    failedKnockout2: boolean;
    insights: {
      strengths: { title: string; desc: string }[];
      opportunities: { title: string; desc: string }[];
    };
    recommendedPackage: {
      title: string;
      price: string;
      description: string;
      bullets: string[];
    };
    compatibilityTier: string;
  } | null>(null);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Consultant dynamic status text for Step 17 analysis simulation
  const [analysisProgressText, setAnalysisProgressText] = useState('Synthesizing operational protocols...');

  // Step 17 simulation timer
  useEffect(() => {
    if (step === 17) {
      const stage1 = setTimeout(() => {
        setAnalysisProgressText('Analyzing local geographic catchment constraints...');
      }, 1500);

      const stage2 = setTimeout(() => {
        setAnalysisProgressText('Mapping clinical growth & exclusivity synergy...');
      }, 3000);

      const stage3 = setTimeout(() => {
        handleAssessmentSubmit();
      }, 4500);

      return () => {
        clearTimeout(stage1);
        clearTimeout(stage2);
        clearTimeout(stage3);
      };
    }
  }, [step]);

  // Validation functions
  const validateLeadForm = () => {
    const errors: Record<string, string> = {};
    if (!lead.name.trim()) errors.name = 'Full Name is required';
    if (!lead.hospital.trim()) errors.hospital = 'Hospital / Clinic name is required';
    if (!lead.mobile.trim()) {
      errors.mobile = 'WhatsApp mobile number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(lead.mobile.replace(/\s+/g, ''))) {
      errors.mobile = 'Please enter a valid mobile number';
    }
    if (!lead.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(lead.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!lead.city.trim()) errors.city = 'City of practice is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromLead = () => {
    if (validateLeadForm()) {
      setDirection(1);
      setStep(1);
    }
  };

  const handleOptionSelect = (qId: number, index: number) => {
    setAnswers(prev => ({ ...prev, [qId]: index }));
    // Premium auto-advance transition for sleek micro-interaction
    setTimeout(() => {
      setDirection(1);
      setStep(prev => prev + 1);
    }, 400);
  };

  const handleKoSelect = (koId: string, val: string) => {
    setKoAnswers(prev => ({ ...prev, [koId]: val }));
    // Premium auto-advance transition for sleek micro-interaction
    setTimeout(() => {
      setDirection(1);
      setStep(prev => prev + 1);
    }, 400);
  };

  const goToNextStep = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const isCurrentQuestionAnswered = () => {
    if (step >= 1 && step <= 14) {
      const q = allQuestions[step - 1];
      return answers[q.id] !== undefined;
    }
    if (step === 15) return koAnswers['ko1'] !== undefined;
    if (step === 16) return koAnswers['ko2'] !== undefined;
    return false;
  };

  const calculateScores = () => {
    let total = 0;
    const breakdown: Record<string, { earned: number; max: number }> = {};

    sections.forEach(sec => {
      let secScore = 0;
      sec.questions.forEach(q => {
        const selectedOptIdx = answers[q.id];
        if (selectedOptIdx !== undefined) {
          secScore += q.options[selectedOptIdx].score;
        }
      });
      total += secScore;
      breakdown[sec.title] = { earned: secScore, max: sec.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0) };
    });

    return { total, breakdown };
  };

  const handleAssessmentSubmit = async () => {
    // 1. Prevent duplicate submissions
    if (formState === 'submitting') {
      return;
    }

    setFormState('submitting');
    setErrorMsg(null);

    const isDev = typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV;

    // 2. Validate required fields
    if (!lead.name.trim() || !lead.hospital.trim() || !lead.mobile.trim() || !lead.email.trim() || !lead.city.trim()) {
      const errorText = 'Please fill in all required fields on the contact form.';
      if (isDev) {
        console.error("Validation failed: some contact details are empty.", lead);
      }
      setErrorMsg(errorText);
      setToast({ message: errorText, type: 'error' });
      setFormState('error');
      return;
    }

    const { total, breakdown } = calculateScores();
    const passedKnockouts = koAnswers['ko1'] === 'Yes' && koAnswers['ko2'] === 'Yes';
    
    // Build a clean string report representing their choices (retained for database integrity)
    let messageReport = `[APRA Partnership Readiness Assessment Completed]\n`;
    messageReport += `Total Assessment Score: ${total}/100\n`;
    messageReport += `Knockouts Met: ${passedKnockouts ? 'PASSED' : 'FAILED'}\n\n`;
    messageReport += `--- Category Breakdown ---\n`;
    Object.entries(breakdown).forEach(([category, stats]) => {
      messageReport += `• ${category}: ${stats.earned}/${stats.max} Marks\n`;
    });
    messageReport += `\n--- Knockout Answers ---\n`;
    knockouts.forEach(ko => {
      messageReport += `• ${ko.text}\n  Answer: ${koAnswers[ko.id]}\n`;
    });
    messageReport += `\n--- All Survey Selection Data ---\n`;
    sections.forEach(sec => {
      sec.questions.forEach(q => {
        const chosenOpt = q.options[answers[q.id]];
        messageReport += `Q: ${q.text}\nChoice: ${chosenOpt?.text || 'Unanswered'} (${chosenOpt?.score || 0} pts)\n`;
      });
    });

    // Capture user IP address
    let userIp = 'Unknown';
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        userIp = ipData.ip || 'Unknown';
      }
    } catch (e) {
      if (isDev) {
        console.warn('Failed to fetch user IP:', e);
      }
    }
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const createdAt = new Date().toISOString();

    const formData = {
      name: lead.name,
      hospital: lead.hospital,
      mobile: lead.mobile,
      email: lead.email,
      city: lead.city,
      message: messageReport,
      total_score: total,
      score: total,
      answers: answers,
      knockouts: koAnswers,
      status: 'Pending Review',
      review_notes: '',
      user_ip: userIp,
      user_agent: userAgent,
      created_at: createdAt
    };

    if (isDev) {
      console.log("Submitting Assessment", formData);
    } else {
      console.log("Submitting Assessment:", { name: formData.name, hospital: formData.hospital });
    }

    // Check if Supabase client is configured
    if (!isSupabaseConfigured || !supabase) {
      const dbError = 'Supabase client is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your settings.';
      console.error("Supabase Error:", dbError);
      setErrorMsg(dbError);
      setToast({ message: dbError, type: 'error' });
      setFormState('error');
      return;
    }

    try {
      // 3. Submit data to Supabase
      let result = await supabase
        .from('assessment_submissions')
        .insert([formData])
        .select();

      let error = result.error;
      let data = result.data;

      // Handle missing table error (PGRST205 or similar table-not-found codes like 42P01)
      if (error && (error.code === 'PGRST205' || error.code === '42P01' || error.message?.includes('cache') || error.message?.includes('not find'))) {
        console.warn("Table 'assessment_submissions' not found. Falling back to 'submissions' table...");
        const fallbackResult = await supabase
          .from('submissions')
          .insert([formData])
          .select();
        
        error = fallbackResult.error;
        data = fallbackResult.data;
      }

      console.log("Supabase Response:", { data, error });

      if (error) {
        console.error("Detailed Supabase Database Error:", error);
        
        let finalErrorMsg = `Supabase Error: ${error.message} (Code: ${error.code || 'unknown'})`;
        
        if (error.code === '42501' || error.message?.toLowerCase().includes('security policy') || error.message?.toLowerCase().includes('policy')) {
          finalErrorMsg += " - This is a Row-Level Security (RLS) issue. Please copy the SQL statements in 'supabase_schema.sql' and run them inside your Supabase SQL Editor to grant public write permissions.";
        } else if (error.code === 'PGRST205' || error.code === '42P01' || error.message?.toLowerCase().includes('cache') || error.message?.toLowerCase().includes('not find')) {
          finalErrorMsg += " - The required table does not exist. Please run the table creation script in 'supabase_schema.sql' inside your Supabase SQL Editor.";
        }
        
        setErrorMsg(finalErrorMsg);
        setToast({ message: finalErrorMsg, type: 'error' });
        setFormState('error');
        return;
      }

      // 4. Handle success
      setToast({ message: "Assessment submitted successfully.", type: 'success' });
      
      // Save current assessment results snapshot before resetting local state
      setSubmittedResults({
        leadName: lead.name,
        leadHospital: lead.hospital,
        leadMobile: lead.mobile,
        leadCity: lead.city,
        finalScore: total,
        hasFailedKnockouts: !passedKnockouts,
        failedKnockout1: koAnswers['ko1'] === 'No',
        failedKnockout2: koAnswers['ko2'] === 'No',
        insights: {
          strengths: [...insights.strengths],
          opportunities: [...insights.opportunities]
        },
        recommendedPackage: { ...recommendedPackage },
        compatibilityTier: compatibilityTier
      });

      // Reset the active form fields
      setLead({
        name: '',
        hospital: '',
        mobile: '',
        email: '',
        city: ''
      });
      setAnswers({});
      setKoAnswers({});
      setFormErrors({});

      setFormState('success');
      setStep(18); // Go to Diagnostic Blueprint report screen
    } catch (err: any) {
      console.error("Submission failed with exception:", err);
      const errMessage = err?.message || String(err);
      const displayError = `Unexpected Error: ${errMessage}`;
      setErrorMsg(displayError);
      setToast({ message: displayError, type: 'error' });
      setFormState('error');
    }
  };

  const handleReset = () => {
    setLead({
      name: '',
      hospital: '',
      mobile: '',
      email: '',
      city: ''
    });
    setAnswers({});
    setKoAnswers({});
    setFormErrors({});
    setSubmittedResults(null);
    setStep(0);
    setFormState('idle');
  };

  // Determine scoring level and recommended package based on diagnostic blueprint recommendation
  const { total: finalScore, breakdown: finalBreakdown } = calculateScores();
  const failedKnockout1 = koAnswers['ko1'] === 'No';
  const failedKnockout2 = koAnswers['ko2'] === 'No';
  const hasFailedKnockouts = failedKnockout1 || failedKnockout2;

  // Personalized insights generation based on section answers
  const insights = {
    strengths: [] as { title: string; desc: string }[],
    opportunities: [] as { title: string; desc: string }[]
  };

  // Populate dynamic Strengths and Opportunities strictly based on sections' answers
  sections.forEach(sec => {
    let earned = 0;
    sec.questions.forEach(q => {
      const idx = answers[q.id];
      if (idx !== undefined) earned += q.options[idx].score;
    });
    const percentage = (earned / sec.maxScore) * 100;

    if (sec.id === 'A') {
      if (percentage >= 70) {
        insights.strengths.push({
          title: "Established Clinical Infrastructure",
          desc: "Your hospital or specialty clinic's operating age and existing surgical volume create an optimal, solid launchpad for high-volume local positioning."
        });
      } else {
        insights.opportunities.push({
          title: "Surgical Case-Mix Optimization",
          desc: "We recommend focusing your online visibility strictly on high-value surgical categories to optimize your current clinical footprint and case-mix value."
        });
      }
    } else if (sec.id === 'B') {
      if (percentage >= 75) {
        insights.strengths.push({
          title: "Direct Growth Acceleration Intent",
          desc: "Your strong focus on surgical volume growth and building a commanding personal brand will help bypass traditional, passive doctor-referral dependency."
        });
      } else {
        insights.opportunities.push({
          title: "Bypassing Referral Dependency",
          desc: "Transitioning your practice from a passive medical network referral model into a structured, direct-to-patient digital channel will offer long-term commercial predictability."
        });
      }
    } else if (sec.id === 'C') {
      if (percentage >= 75) {
        insights.strengths.push({
          title: "High Operational SOP Readiness",
          desc: "Your front office's willingness to follow standard protocols and adopt digital dashboards ensures high lead-to-OPD conversion with minimal inquiry waste."
        });
      } else {
        insights.opportunities.push({
          title: "Front-Office Lead Conversion Protocols",
          desc: "Implementing clean, standardized booking scripts and structured tracking systems for your administrative team will prevent patient loss between initial inquiry and actual OPD visit."
        });
      }
    } else if (sec.id === 'D') {
      if (percentage >= 70) {
        insights.strengths.push({
          title: "Advanced Local Digital Mindset",
          desc: "Your openness to regular video content and history of marketing channels will shorten patient consideration cycles, setting you up as a clear regional authority."
        });
      } else {
        insights.opportunities.push({
          title: "Educational Video Content Playbook",
          desc: "We can guide and direct script templates for you to easily capture short, patient-friendly medical videos, drastically accelerating patient trust and local prominence."
        });
      }
    } else if (sec.id === 'E') {
      if (percentage >= 70) {
        insights.strengths.push({
          title: "Strategic Growth Alignment",
          desc: "You prioritize solid, compounding system partnerships over low-trust temporary lead-buying. This matches our exclusive surgical growth playbook."
        });
      } else {
        insights.opportunities.push({
          title: "Structured Strategic Roadmap Phase",
          desc: "Establishing a pilot phase with clear, milestones before expanding into comprehensive, multi-channel growth systems will lower your operational friction."
        });
      }
    }
  });

  // If we don't have enough strengths/opportunities, provide robust default ones
  if (insights.strengths.length === 0) {
    insights.strengths.push({
      title: "Strong Clinical Passion",
      desc: "Your clinical intent and interest in patient-centric growth offer a strong baseline for deploying professional brand playbooks."
    });
  }
  if (insights.opportunities.length === 0) {
    insights.opportunities.push({
      title: "Geographical Prominence Capture",
      desc: "Deploying high-impact SEO and localized search funnels to capture patients within a 15km catchment area before competitors take dominance."
    });
  }

  // Recommended Prescribed package according to the Diagnosis-Before-Prescribing Strategy
  let recommendedPackage = {
    title: '',
    price: '',
    description: '',
    bullets: [] as string[]
  };

  let compatibilityTier = '';
  let compatibilityColor = '';
  let compatibilityDesc = '';

  if (finalScore >= 85) {
    compatibilityTier = 'Strategic Alignment Index: Elite Level';
    compatibilityColor = 'from-emerald-500 to-teal-400 text-slate-900 border-emerald-300';
    compatibilityDesc = 'Highly Compatible. Your clinic setup, growth objectives, and team alignment match our high-performance Surgical Growth Partnership system.';
    recommendedPackage = {
      title: 'Package C – Custom Growth System',
      price: '₹2,00,000/month',
      description: 'Comprehensive, multi-channel branding, high-intent performance marketing, active OPD funnels, and standard operating procedures designed for massive, predictable surgical scale.',
      bullets: [
        'Advanced Surgeon Personal Branding & Medical Video Production Program',
        'Omni-channel local surgical performance campaigns (Google, Meta, Local SEO)',
        'Comprehensive clinical OPD flow and front-office SOP training modules',
        'Direct CRM systems with real-time growth analytics and dashboard visibility',
        'Strict regional specialty exclusivity to lock out local clinical competitors'
      ]
    };
  } else if (finalScore >= 70) {
    compatibilityTier = 'Strategic Alignment Index: Accelerated Level';
    compatibilityColor = 'from-blue-500 to-indigo-400 text-slate-900 border-blue-300';
    compatibilityDesc = 'Strong Compatibility. Your practice has excellent core components ready to expand with structured direct-to-patient OPD generation models.';
    recommendedPackage = {
      title: 'Package B – Surgical Growth Program',
      price: '₹1,50,000/month',
      description: 'Localized performance marketing and systematic patient acquisition channels paired with custom branding strategies.',
      bullets: [
        'Professional Specialty Video and trust copy production templates',
        'Targeted performance campaigns in local catchment zones to lift OPD volume',
        'Patient conversion scripts and intake forms for your administrative staff',
        'Core performance dashboards to track daily enquiries, OPDs, and scheduled surgeries'
      ]
    };
  } else {
    compatibilityTier = 'Strategic Alignment Index: Foundational Level';
    compatibilityColor = 'from-slate-400 to-slate-300 text-slate-900 border-slate-200';
    compatibilityDesc = 'Nurture Compatibility. Your clinic requires baseline digital authority setup, website SEO optimization, and introductory content assets before executing high-volume patient lead acquisition campaigns.';
    recommendedPackage = {
      title: 'Package A – Brand Foundation Program',
      price: '₹50,000/month',
      description: 'Establishing your digital footprint, local search indexing, and core clinical authority structures.',
      bullets: [
        'High-converting, responsive clinical web assets with Search Engine Optimization',
        'Monthly Surgeon content blueprints and professional content outlines',
        'Patient review collection setups and automated local directory mapping',
        'Introductory leads tracking structures and inquiry intake guidance'
      ]
    };
  }

  // Display helper variables (resolves reset form clearing active report views)
  const displayLeadName = submittedResults ? submittedResults.leadName : lead.name;
  const displayLeadHospital = submittedResults ? submittedResults.leadHospital : lead.hospital;
  const displayLeadCity = submittedResults ? submittedResults.leadCity : lead.city;
  const displayLeadMobile = submittedResults ? submittedResults.leadMobile : lead.mobile;
  const displayHasFailedKnockouts = submittedResults ? submittedResults.hasFailedKnockouts : hasFailedKnockouts;
  const displayFailedKnockout1 = submittedResults ? submittedResults.failedKnockout1 : failedKnockout1;
  const displayFailedKnockout2 = submittedResults ? submittedResults.failedKnockout2 : failedKnockout2;
  const displayInsights = submittedResults ? submittedResults.insights : insights;
  const displayRecommendedPackage = submittedResults ? submittedResults.recommendedPackage : recommendedPackage;
  const displayCompatibilityTier = submittedResults ? submittedResults.compatibilityTier : compatibilityTier;

  // Construct dynamic pre-filled WhatsApp link with APRA results
  const getWhatsAppLink = () => {
    const prefilledText = `Hello Acquire OPD Team,

I have completed the **Partnership Readiness Assessment (APRA)** on your platform.

My Diagnostic Blueprint Results:
👤 Name: ${displayLeadName}
🏥 Hospital: ${displayLeadHospital}
📍 City: ${displayLeadCity}
📱 Mobile: ${displayLeadMobile}

📊 APRA Compatibility Level: ${displayCompatibilityTier}
📋 Exclusivity & Growth Alignment: ${displayHasFailedKnockouts ? 'Needs Discussion' : 'Aligned'}
📦 Prescribed Roadmap: ${displayRecommendedPackage.title} (${displayRecommendedPackage.price})

Please contact me to review my custom Diagnostic Blueprint and schedule our 30-45 min consultation.

Thank you!`;

    return `https://wa.me/919844955100?text=${encodeURIComponent(prefilledText)}`;
  };

  // Helper for progress calculation
  // We have 14 core questions + 2 knockouts = 16 total questions
  const totalQuestions = 16;
  const currentProgressPercent = step >= 1 && step <= 16 ? Math.round(((step - 1) / totalQuestions) * 100) : 0;

  return (
    <div className="pt-20 bg-white min-h-screen text-slate-800 relative overflow-hidden flex flex-col justify-center">
      
      {/* Premium Ambient Floating Background Elements */}
      <GlowingBackground />

      {/* Floating Toast Notification Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3.5 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/10'
                : 'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/10'
            }`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                toast.type === 'success'
                  ? 'bg-emerald-100 border-emerald-200 text-emerald-600'
                  : 'bg-rose-100 border-rose-200 text-rose-600'
              }`}>
                {toast.type === 'success' ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm tracking-tight text-slate-900">
                  {toast.type === 'success' ? 'Success' : 'Error'}
                </p>
                <p className="text-xs font-medium text-slate-600 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Close notification"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl lg:max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        
        {/* Diagnostic Page Header */}
        {step < 18 && (
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-4xl font-display font-extrabold leading-tight tracking-tight text-slate-900"
            >
              Partnership Readiness Assessment
            </motion.h1>
          </div>
        )}

        {/* Main premium animated-border glass-white card container */}
        <div ref={containerRef} className="relative p-[1px] rounded-[24px] overflow-hidden bg-slate-200/60 shadow-2xl shadow-slate-200/50 transition-all duration-300">
          
          <div 
            onMouseMove={handleMouseMove}
            className="relative bg-white/95 backdrop-blur-3xl rounded-[23px] overflow-hidden"
            style={{
              '--x': `${coords.x}px`,
              '--y': `${coords.y}px`,
            } as React.CSSProperties}
          >
            {/* Spotlight glow following pointer */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(16,185,129,0.03),transparent_60%)] -z-10" />
            
            {/* Progress Timeline Indicator (Shown only on Questions steps 1 to 16) */}
            {step >= 1 && step <= 16 && (
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 sm:px-8 py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md border border-emerald-100">
                    Question {step} of 16
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{currentProgressPercent}% Complete</span>
                </div>
                {/* Premium Horizontal Segments Timeline */}
                <div className="flex gap-1.5 w-full items-center justify-between">
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const isCompleted = idx + 1 < step;
                    const isActive = idx + 1 === step;
                    return (
                      <div
                        key={idx}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.15)]' 
                            : isActive 
                              ? 'bg-primary-500 shadow-[0_0_8px_rgba(99,102,241,0.25)] scale-y-110' 
                              : 'bg-gray-200'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Card Body Container */}
            <div className="p-5 sm:p-10">
              <AnimatePresence mode="wait">
              
              {/* STEP 0: Lead Form */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-xl mx-auto mb-8">
                    <div className="w-14 h-14 bg-gradient-to-tr from-primary-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/20 shadow-md shadow-primary-500/10">
                      <Activity size={24} className="animate-pulse" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2">Practice Profile Setup</h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                      Enter your clinical registration details to configure the geographic criteria of our diagnostic algorithm.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User size={15} className="text-primary-500 shrink-0" />
                        <span>Full Name <span className="text-rose-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={lead.name}
                          onChange={(e) => {
                            setLead({ ...lead, name: e.target.value });
                            if (formErrors.name) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy.name;
                                return copy;
                              });
                            }
                          }}
                          placeholder="Dr. Rajesh Kumar"
                          className={getInputClassName('name', lead.name, !!formErrors.name)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {formErrors.name ? (
                            <AlertCircle size={18} className="text-rose-500" />
                          ) : lead.name.trim() !== '' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : null}
                        </div>
                      </div>
                      {formErrors.name && (
                        <p className="text-xs text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Building2 size={15} className="text-primary-500 shrink-0" />
                        <span>Hospital / Clinic Name <span className="text-rose-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={lead.hospital}
                          onChange={(e) => {
                            setLead({ ...lead, hospital: e.target.value });
                            if (formErrors.hospital) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy.hospital;
                                return copy;
                              });
                            }
                          }}
                          placeholder="Arogya Surgical Hospital"
                          className={getInputClassName('hospital', lead.hospital, !!formErrors.hospital)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {formErrors.hospital ? (
                            <AlertCircle size={18} className="text-rose-500" />
                          ) : lead.hospital.trim() !== '' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : null}
                        </div>
                      </div>
                      {formErrors.hospital && (
                        <p className="text-xs text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.hospital}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Phone size={15} className="text-primary-500 shrink-0" />
                        <span>WhatsApp Mobile Number <span className="text-rose-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={lead.mobile}
                          onChange={(e) => {
                            setLead({ ...lead, mobile: e.target.value });
                            if (formErrors.mobile) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy.mobile;
                                return copy;
                              });
                            }
                          }}
                          placeholder="+91 98449 55100"
                          className={getInputClassName('mobile', lead.mobile, !!formErrors.mobile)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {formErrors.mobile ? (
                            <AlertCircle size={18} className="text-rose-500" />
                          ) : lead.mobile.trim() !== '' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : null}
                        </div>
                      </div>
                      {formErrors.mobile && (
                        <p className="text-xs text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.mobile}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Mail size={15} className="text-primary-500 shrink-0" />
                        <span>Email Address <span className="text-rose-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={lead.email}
                          onChange={(e) => {
                            setLead({ ...lead, email: e.target.value });
                            if (formErrors.email) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy.email;
                                return copy;
                              });
                            }
                          }}
                          placeholder="drrajesh@gmail.com"
                          className={getInputClassName('email', lead.email, !!formErrors.email)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {formErrors.email ? (
                            <AlertCircle size={18} className="text-rose-500" />
                          ) : lead.email.trim() !== '' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : null}
                        </div>
                      </div>
                      {formErrors.email && (
                        <p className="text-xs text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <MapPin size={15} className="text-primary-500 shrink-0" />
                        <span>City of Practice <span className="text-rose-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={lead.city}
                          onChange={(e) => {
                            setLead({ ...lead, city: e.target.value });
                            if (formErrors.city) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy.city;
                                return copy;
                              });
                            }
                          }}
                          placeholder="Bengaluru"
                          className={getInputClassName('city', lead.city, !!formErrors.city)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {formErrors.city ? (
                            <AlertCircle size={18} className="text-rose-500" />
                          ) : lead.city.trim() !== '' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : null}
                        </div>
                      </div>
                      {formErrors.city && (
                        <p className="text-xs text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-slate-400 text-[10px] font-medium">
                    <Lock size={12} className="text-emerald-500" />
                    <span>HIPAA and DPDP Patient Data Privacy Security Protection Assured.</span>
                  </div>

                  <button
                    onClick={handleNextFromLead}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-primary-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Start Growth Assessment
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* STEPS 1 TO 14: Core Questions (One at a time with slide-in/out animations) */}
              {step >= 1 && step <= 14 && (
                <motion.div
                  key={`step-${step}`}
                  variants={{
                    enter: { y: 15, opacity: 0 },
                    center: { y: 0, opacity: 1 },
                    exit: { y: -15, opacity: 0 }
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Question Header */}
                  {(() => {
                    const q = allQuestions[step - 1];
                    return (
                      <div className="space-y-4">
                        <span className="inline-flex text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
                          Practice Audit Question
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                          {q.text}
                        </h3>
                      </div>
                    );
                  })()}

                  {/* Options List with Premium Interactive Cards */}
                  <div className="grid grid-cols-1 gap-5">
                    {allQuestions[step - 1].options.map((opt, oIdx) => {
                      const q = allQuestions[step - 1];
                      const isSelected = answers[q.id] === oIdx;
                      return (
                        <motion.button
                          key={oIdx}
                          whileHover={{ scale: 1.015, y: -2 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => handleOptionSelect(q.id, oIdx)}
                          className={`text-left p-6 sm:p-7 rounded-[14px] border-[1.5px] transition-all duration-300 relative overflow-hidden flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                            isSelected 
                              ? 'bg-primary-50/40 border-2 border-primary-500 text-slate-900 shadow-[0_4px_20px_rgba(37,99,235,0.15)]' 
                              : 'bg-white hover:bg-slate-50 border-gray-300 hover:border-primary-500 text-slate-800 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 w-full mr-4">
                            {/* Premium Square-Check Indicator */}
                            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0 ${
                              isSelected 
                                ? 'border-primary-500 bg-primary-500 text-white scale-110 shadow-[0_0_8px_rgba(37,99,235,0.3)]' 
                                : 'border-gray-300 bg-gray-50'
                            }`}>
                              <motion.div
                                initial={false}
                                animate={isSelected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              >
                                <Check size={14} strokeWidth={3} />
                              </motion.div>
                            </div>
                            <span className="font-bold text-base sm:text-lg text-slate-900 leading-relaxed break-words">{opt.text}</span>
                          </div>

                          {/* Selected inner background pulse */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary-500/[0.02] pointer-events-none" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button
                      onClick={goToPrevStep}
                      className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-slate-600 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm transform hover:-translate-y-0.5"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      disabled={!isCurrentQuestionAnswered()}
                      onClick={goToNextStep}
                      className={`flex-1 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 text-sm transform ${
                        isCurrentQuestionAnswered()
                          ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/10 cursor-pointer hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Next Question
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 15: Knockout Question 1 */}
              {step === 15 && (
                <motion.div
                  key="step-15"
                  variants={{
                    enter: { y: 15, opacity: 0 },
                    center: { y: 0, opacity: 1 },
                    exit: { y: -15, opacity: 0 }
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {knockouts[0].text}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {knockouts[0].options.map((opt) => {
                      const isSelected = koAnswers['ko1'] === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.015, y: -2 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => handleKoSelect('ko1', opt.value)}
                          className={`text-left p-6 sm:p-7 rounded-[14px] border-[1.5px] transition-all duration-300 relative overflow-hidden flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                            isSelected 
                              ? 'bg-primary-50/40 border-2 border-primary-500 text-slate-900 shadow-[0_4px_20px_rgba(37,99,235,0.15)]' 
                              : 'bg-white hover:bg-slate-50 border-gray-300 hover:border-primary-500 text-slate-800 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 w-full mr-4">
                            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0 ${
                              isSelected 
                                ? 'border-primary-500 bg-primary-500 text-white scale-110 shadow-[0_0_8px_rgba(37,99,235,0.3)]' 
                                : 'border-gray-300 bg-gray-50'
                            }`}>
                              <motion.div
                                initial={false}
                                animate={isSelected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              >
                                <Check size={14} strokeWidth={3} />
                              </motion.div>
                            </div>
                            <span className="font-bold text-base sm:text-lg text-slate-900 leading-relaxed break-words">{opt.text}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button
                      onClick={goToPrevStep}
                      className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-slate-600 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm transform hover:-translate-y-0.5"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      disabled={!isCurrentQuestionAnswered()}
                      onClick={goToNextStep}
                      className={`flex-1 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 text-sm transform ${
                        isCurrentQuestionAnswered()
                          ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/10 cursor-pointer hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Next Filter
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 16: Knockout Question 2 */}
              {step === 16 && (
                <motion.div
                  key="step-16"
                  variants={{
                    enter: { y: 15, opacity: 0 },
                    center: { y: 0, opacity: 1 },
                    exit: { y: -15, opacity: 0 }
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {knockouts[1].text}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {knockouts[1].options.map((opt) => {
                      const isSelected = koAnswers['ko2'] === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.015, y: -2 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => handleKoSelect('ko2', opt.value)}
                          className={`text-left p-6 sm:p-7 rounded-[14px] border-[1.5px] transition-all duration-300 relative overflow-hidden flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                            isSelected 
                              ? 'bg-primary-50/40 border-2 border-primary-500 text-slate-900 shadow-[0_4px_20px_rgba(37,99,235,0.15)]' 
                              : 'bg-white hover:bg-slate-50 border-gray-300 hover:border-primary-500 text-slate-800 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 w-full mr-4">
                            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 shrink-0 ${
                              isSelected 
                                ? 'border-primary-500 bg-primary-500 text-white scale-110 shadow-[0_0_8px_rgba(37,99,235,0.3)]' 
                                : 'border-gray-300 bg-gray-50'
                            }`}>
                              <motion.div
                                initial={false}
                                animate={isSelected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              >
                                <Check size={14} strokeWidth={3} />
                              </motion.div>
                            </div>
                            <span className="font-bold text-base sm:text-lg text-slate-900 leading-relaxed break-words">{opt.text}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button
                      onClick={goToPrevStep}
                      className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-slate-600 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm transform hover:-translate-y-0.5"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      disabled={!isCurrentQuestionAnswered()}
                      onClick={goToNextStep}
                      className={`flex-1 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-1.5 text-sm transform ${
                        isCurrentQuestionAnswered()
                          ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/10 cursor-pointer hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Process Analysis
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 17: Consulting Analysis Processing State */}
              {step === 17 && (
                <motion.div
                  key="step-17"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 flex flex-col items-center text-center space-y-8"
                >
                  <div className="relative flex items-center justify-center w-24 h-24">
                    {/* Glowing outer rotating gauge rings */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 rounded-full border border-dashed border-primary-500/40"
                    />
                    
                    {/* Glowing circular loading core */}
                    <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-md shadow-emerald-500/5 border border-gray-150">
                      <Activity size={32} className="text-emerald-500 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                      Synthesizing Diagnostic Blueprint
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                      Please wait while our algorithms process your operational metrics, geographic catchment parameters, and regional exclusivity compatibility.
                    </p>
                  </div>

                  {/* Elegant dynamic console feed or Error message */}
                  {formState === 'error' ? (
                    <div className="space-y-4 max-w-sm w-full">
                      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-sm flex items-start gap-3 text-left shadow-sm">
                        <AlertCircle size={20} className="text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Submission Failed</p>
                          <p className="text-xs mt-0.5 text-rose-600 leading-relaxed">{errorMsg || "An unexpected error occurred. Please try again."}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleAssessmentSubmit}
                        disabled={formState === 'submitting'}
                        className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-primary-600/10 cursor-pointer"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Retrying...
                          </>
                        ) : (
                          "Retry Submission"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200/80 p-4 rounded-2xl inline-flex items-center gap-3.5 max-w-sm w-full shadow-sm">
                      <Loader2 size={16} className="animate-spin text-emerald-500 shrink-0" />
                      <span className="text-xs text-slate-600 font-mono text-left truncate">{analysisProgressText}</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 18: Personalized Insights & Prescribed Recommendation Report */}
              {step === 18 && (
                <motion.div
                  key="step-18"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-10"
                >
                  
                  {/* Knockout Failure / Screening Path */}
                  {displayHasFailedKnockouts ? (
                    <div className="space-y-6">
                      <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-rose-500/[0.02] rounded-full blur-[50px]" />
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
                          <ShieldAlert size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-rose-800 mb-2">Model Mismatch Detected</h3>
                        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
                          Our Surgical Practice Growth Partnership relies on consistent long-term investment models and strict geographic exclusivity. Your selected parameters suggest we may not be the optimal fit at this stage.
                        </p>
                      </div>

                      <div className="space-y-4 pl-4 border-l-2 border-rose-400">
                        {displayFailedKnockout1 && (
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Consistent Investment Filter</h4>
                            <p className="text-slate-600 text-xs font-light">{knockouts[0].errorMsg}</p>
                          </div>
                        )}
                        {displayFailedKnockout2 && (
                          <div className="space-y-1 pt-2">
                            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Specialty Exclusivity Filter</h4>
                            <p className="text-slate-600 text-xs font-light">{knockouts[1].errorMsg}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mt-6">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-2">Would you like to discuss custom alternative strategies?</h4>
                        <p className="text-slate-600 text-xs leading-relaxed mb-4 font-light">
                          For high-volume centers, we sometimes construct customized pilot models to help align internal leadership prior to deploying the full exclusivity package.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-xs sm:text-sm shadow-sm cursor-pointer"
                          >
                            <MessageSquare size={16} />
                            Schedule Partnership Discussion
                          </a>
                          <Link
                            to="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 font-semibold py-3.5 px-6 rounded-2xl transition-all text-xs sm:text-sm cursor-pointer"
                          >
                            Return to Dashboard
                          </Link>
                        </div>
                      </div>

                      <button
                        onClick={handleReset}
                        className="text-slate-400 hover:text-slate-600 text-xs font-semibold block mx-auto underline mt-4 cursor-pointer"
                      >
                        Restart Diagnostic Audit
                      </button>
                    </div>
                  ) : (
                    
                    // Successful Insights Report Presentation (Completely Hides Scores!)
                    <div className="space-y-10">
                      
                      {/* Breathtaking Success Header with check badge */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-50 text-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                              <ShieldCheck size={14} className="shrink-0 animate-pulse text-emerald-500" />
                              Alignment Approved
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900">
                              {displayLeadName}
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-medium">
                              Facility: <span className="text-slate-800 font-semibold">{displayLeadHospital}</span> • Area: <span className="text-slate-800 font-semibold">{displayLeadCity}</span>
                            </p>
                          </div>

                          {/* Premium Success Scale animation Check Badge */}
                          <motion.div 
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                            className="bg-white border border-gray-200 p-4.5 rounded-2xl shrink-0 flex items-center gap-3.5 shadow-sm"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 border border-emerald-400/20 shadow-sm shadow-emerald-500/10">
                              <motion.svg
                                className="w-6 h-6 stroke-[3]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </motion.svg>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">STATUS COMPATIBILITY</span>
                              <span className="text-sm font-extrabold text-emerald-600">
                                Approved Partner Match
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        <div className="h-[1px] bg-gray-200 my-5" />
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-light">
                          "Based on your operational readiness audit and geographic practice inputs, we have verified high strategic alignment with our Surgical Practice Growth playbook."
                        </p>
                      </div>

                      {/* Strengths & Opportunities (Personalized Insights replace the score numbers!) */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2.5">
                          <Activity size={18} className="text-emerald-500" />
                          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                            Custom Strategic Insights Summary
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Strengths Column */}
                          <div className="space-y-4">
                            <h5 className="text-xs font-bold uppercase text-emerald-600 tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                              Practice Core Strengths
                            </h5>
                            <div className="space-y-3.5">
                              {displayInsights.strengths.map((str, sIdx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: sIdx * 0.1 }}
                                  key={sIdx} 
                                  className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1.5 hover:border-gray-300 transition-colors shadow-sm"
                                >
                                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                    <span>{str.title}</span>
                                  </div>
                                  <p className="text-slate-600 text-xs leading-relaxed font-light pl-6">
                                    {str.desc}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Opportunities Column */}
                          <div className="space-y-4">
                            <h5 className="text-xs font-bold uppercase text-primary-600 tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
                              Growth Acceleration Levers
                            </h5>
                            <div className="space-y-3.5">
                              {displayInsights.opportunities.map((opp, oIdx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: oIdx * 0.1 }}
                                  key={oIdx} 
                                  className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1.5 hover:border-gray-300 transition-colors shadow-sm"
                                >
                                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                                    <Zap size={16} className="text-primary-500 shrink-0 animate-pulse" />
                                    <span>{opp.title}</span>
                                  </div>
                                  <p className="text-slate-600 text-xs leading-relaxed font-light pl-6">
                                    {opp.desc}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Concept Message */}
                      <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-slate-600 text-xs sm:text-sm space-y-2 leading-relaxed font-light">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs mb-1">
                          <BookOpen size={14} className="text-primary-500" />
                          <span>Professional Partnership Code</span>
                        </div>
                        Just like complex surgical procedures require an accurate diagnostic baseline, our partnership models do not deploy general marketing campaigns. Your diagnostic inputs verify eligibility for our full geographic exclusivity expansion roadmap.
                      </div>

                      {/* Prescribed Growth Package Recommendation */}
                      <div className="bg-white border-2 border-primary-500 p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary-500 text-white text-[9px] uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-bl-xl">
                          RECOMMENDED ACTION ROADMAP
                        </div>

                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-100">
                          PRESCRIBED SYSTEM
                        </span>

                        <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-4">
                          {displayRecommendedPackage.title}
                        </h3>
                        
                        <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                          {displayRecommendedPackage.description}
                        </p>

                        <div className="h-[1px] bg-gray-150 my-5" />

                        <ul className="space-y-3">
                          {displayRecommendedPackage.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                              <span className="w-5 h-5 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0 border border-primary-100 mt-0.5">
                                <Zap size={10} />
                              </span>
                              <span className="font-light leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Call to Claim the Consultation with required CTAs */}
                      <div className="bg-gradient-to-r from-slate-50 via-primary-50/20 to-slate-50 text-slate-900 p-6 sm:p-8 rounded-3xl text-center space-y-6 border border-gray-200 shadow-sm">
                        <div className="max-w-md mx-auto space-y-2">
                          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">Lock in your Custom Strategy Consultation</h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                            Claim your detailed 30–45 minute surgical catchment diagnostic meeting. We will map demographic patient volumes and evaluate exclusivity eligibility for your zip codes.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-8 rounded-2xl transition-all text-sm shadow-md shadow-primary-600/10 cursor-pointer"
                          >
                            <MessageSquare size={18} />
                            Schedule Partnership Discussion
                          </a>
                          <Link
                            to="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-slate-700 font-semibold py-4 px-8 rounded-2xl transition-all text-sm cursor-pointer border border-gray-200"
                          >
                            Return to Dashboard
                          </Link>
                        </div>
                      </div>

                    </div>
                  )}

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
