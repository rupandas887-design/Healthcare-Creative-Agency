import React from "react";
import { motion } from "motion/react";

// 1. Patient Acquisition (Moving people icons on a concentric circle)
export function PatientAcquisitionIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Concentric rings */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-40 animate-spin" style={{ animationDuration: "12s" }} />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20" />
        
        {/* Core user */}
        <circle cx="50" cy="42" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 28 72 C 28 58, 72 58, 72 72" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Rotating orbits (people/nodes) */}
        <motion.circle 
          cx="50" 
          cy="10" 
          r="5" 
          fill="currentColor"
          animate={{
            rotate: 360,
            transformOrigin: "50px 50px"
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
        />
        <motion.circle 
          cx="10" 
          cy="50" 
          r="4" 
          fill="#F05A4F"
          animate={{
            rotate: -360,
            transformOrigin: "50px 50px"
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}

// 2. Lead Tracking (Animated location pin with ripple rings)
export function LeadTrackingIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Ripples */}
        <motion.circle
          cx="50"
          cy="75"
          r="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ r: [1, 24], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
        <motion.circle
          cx="50"
          cy="75"
          r="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ r: [1, 24], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.8, ease: "easeOut" }}
        />
        
        {/* Ground ellipse */}
        <ellipse cx="50" cy="75" rx="12" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />

        {/* Pin */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <path
            d="M 50 72 C 34 54, 32 40, 50 20 C 68 40, 66 54, 50 72 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="40" r="6" fill="#F05A4F" />
        </motion.g>
      </svg>
    </div>
  );
}

// 3. OPD Booking (Calendar flip with ping alert)
export function OPDBookingIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Calendar Body */}
        <rect x="25" y="28" width="50" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        
        {/* Top binder bar */}
        <line x1="25" y1="42" x2="75" y2="42" stroke="currentColor" strokeWidth="2" />
        
        {/* Rings */}
        <circle cx="38" cy="24" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="62" cy="24" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="38" y1="20" x2="38" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="62" y1="20" x2="62" y2="28" stroke="currentColor" strokeWidth="2" />

        {/* Flipping Page Effect inside */}
        <motion.path
          d="M 33 48 H 67 V 68 H 33 Z"
          fill="none"
          stroke="#F05A4F"
          strokeWidth="2"
          animate={{
            rotateX: [0, 185, 0],
            transformOrigin: "50% 48%"
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />

        {/* Calendar Grid Dot */}
        <circle cx="50" cy="58" r="4" fill="currentColor" className="animate-pulse" />
      </svg>
    </div>
  );
}

// 4. Consultation (Doctor pulse / EKG heart rhythm)
export function ConsultationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Stethoscope Loop */}
        <path d="M 25 35 Q 25 65 50 65 Q 75 65 75 35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 50 65 V 75 Q 50 85 62 85" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="65" cy="85" r="5" fill="#F05A4F" />

        {/* Dynamic heart pulse trace inside */}
        <motion.path
          d="M 20 40 L 38 40 L 44 20 L 50 60 L 56 35 L 62 45 L 66 40 L 80 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeDasharray: ["0, 200", "200, 0", "0, 200"]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

// 5. Procedure Recommendation (AI report scanning / laser beam)
export function ProcedureRecommendationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Report page outline */}
        <rect x="28" y="20" width="44" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        
        {/* Content lines */}
        <line x1="36" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="36" y1="44" x2="64" y2="44" stroke="currentColor" strokeWidth="1.5" />
        <line x1="36" y1="56" x2="55" y2="56" stroke="currentColor" strokeWidth="1.5" />
        <line x1="36" y1="68" x2="60" y2="68" stroke="currentColor" strokeWidth="1.5" />

        {/* Laser scanner line bar */}
        <motion.g
          animate={{ y: [0, 48, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {/* Neon laser line */}
          <line x1="24" y1="26" x2="76" y2="26" stroke="#F05A4F" strokeWidth="3" strokeLinecap="round" className="shadow-[0_0_8px_#F05A4F]" />
          {/* Laser ambient glow */}
          <rect x="25" y="24" width="50" height="4" fill="none" stroke="#F05A4F" strokeWidth="1" className="opacity-30 blur-[2px]" />
        </motion.g>
      </svg>
    </div>
  );
}

// 6. Procedure Confirmation (Shield success checkmark animation)
export function ProcedureConfirmationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Shield body */}
        <path d="M 50 18 Q 78 18 78 45 C 78 68, 50 82, 50 82 C 50 82, 22 68, 22 45 Q 22 18 50 18 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        
        {/* Outer glowing border ring */}
        <circle cx="50" cy="48" r="38" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 4" className="opacity-30 animate-spin" style={{ animationDuration: "10s" }} />

        {/* Animated Checkmark */}
        <motion.path
          d="M 37 48 L 46 57 L 64 36"
          fill="none"
          stroke="#F05A4F"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
      </svg>
    </div>
  );
}

// 7. Surgery (Heartbeat EKG monitor)
export function SurgeryIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Hospital Building Accent */}
        <rect x="20" y="45" width="60" height="35" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 40 45 V 32 H 60 V 45" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* Cross sign */}
        <path d="M 47 38 H 53 M 50 35 V 41" stroke="#F05A4F" strokeWidth="2" strokeLinecap="round" />

        {/* Heartbeat EKG sweep line */}
        <motion.path
          d="M 25 65 L 38 65 L 43 50 L 48 78 L 53 60 L 58 65 L 75 65"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeDashoffset: [400, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear"
          }}
          style={{ strokeDasharray: "200" }}
        />
      </svg>
    </div>
  );
}

// 8. Follow-up (Phone / Bell ringing notification)
export function FollowUpIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Bell Body */}
        <motion.g
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 15%" }}
        >
          <path d="M 50 18 Q 65 18 65 42 C 65 58, 73 64, 73 64 H 27 C 27 64, 35 58, 35 42 Q 35 18 50 18 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          {/* Bell clapper */}
          <circle cx="50" cy="72" r="5" fill="#F05A4F" />
        </motion.g>
        
        {/* Ringing Waves */}
        <motion.path
          d="M 78 30 C 84 38, 84 52, 78 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 22 30 C 16 38, 16 52, 22 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

// 9. Referral (Network growth nodes)
export function ReferralIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Central parent node */}
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="4" fill="#F05A4F" />

        {/* Radiating branches */}
        <line x1="42" y1="42" x2="28" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="58" y1="42" x2="72" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="60" x2="50" y2="76" stroke="currentColor" strokeWidth="2" />

        {/* Outer expanding nodes */}
        <motion.g
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <circle cx="28" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="72" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="76" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          
          <circle cx="28" cy="28" r="2.5" fill="currentColor" />
          <circle cx="72" cy="28" r="2.5" fill="currentColor" />
          <circle cx="50" cy="76" r="2.5" fill="currentColor" />
        </motion.g>

        {/* Radiating ripple rings */}
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-45" />
      </svg>
    </div>
  );
}

// 10. Revenue (Animated upward growth graph)
export function RevenueIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-teal">
        {/* Graph Axes */}
        <line x1="15" y1="80" x2="85" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="15" x2="15" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Bar background elements */}
        <rect x="23" y="55" width="8" height="25" rx="1.5" fill="currentColor" className="opacity-20" />
        <rect x="38" y="42" width="8" height="38" rx="1.5" fill="currentColor" className="opacity-20" />
        <rect x="53" y="30" width="8" height="50" rx="1.5" fill="currentColor" className="opacity-20" />
        <rect x="68" y="18" width="8" height="62" rx="1.5" fill="#F05A4F" className="opacity-30" />

        {/* Upward line graph */}
        <motion.path
          d="M 16 75 L 27 60 L 42 48 L 57 32 L 72 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />

        {/* Glowing peak marker */}
        <motion.circle
          cx="72"
          cy="20"
          r="4.5"
          fill="#F05A4F"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </svg>
    </div>
  );
}
