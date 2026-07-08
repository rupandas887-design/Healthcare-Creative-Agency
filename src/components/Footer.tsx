import React from "react";
import { Linkedin, Mail, MessageSquare, Shield, Lock, FileText, Globe } from "lucide-react";

interface FooterProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function Footer({ onLogEvent }: FooterProps) {
  
  const handleWhatappClick = () => {
    onLogEvent("WhatsApp Link Clicked", "Conversion", "Footer Social Contact");
    window.open("https://wa.me/919876543210?text=Hello%20Acquire%20OPD,%20I'm%20interested%20in%2520discussing%2520my%2520hospital's%2520surgical%2520growth%2520system.", "_blank");
  };

  const handleLinkedinClick = () => {
    onLogEvent("LinkedIn Link Clicked", "Social Engagement", "Footer Social Contact");
    window.open("https://linkedin.com", "_blank");
  };

  return (
    <footer 
      id="site-footer"
      className="bg-brand-navy text-white border-t-2 border-brand-teal/20 py-16 px-4 text-sans relative overflow-hidden print:hidden"
    >
      {/* Structural background decoration */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-brand-teal/[0.02] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Summary credentials */}
        <div className="md:col-span-6 space-y-4 text-left">
          <div className="space-y-1">
            <h3 className="text-white font-extrabold font-display text-lg tracking-tight">Acquire OPD</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-teal font-extrabold block leading-none">
              Surgical Practice Growth Partner
            </span>
          </div>

          <p className="text-xs text-slate-300 font-light leading-relaxed max-w-md">
            Helping independent, surgeon-owned specialty hospitals build predictable patient flows through systematic counseling follow-ups, speed-to-call accountability, and operational tracking framework integrations.
          </p>

          <p className="text-[10px] font-mono text-slate-400 max-w-sm">
            Not a digital marketing agency. We do not sell cheap clicks or unattended leads. We build pipeline systems that translate consultation decisions into filled surgical lists.
          </p>
        </div>

        {/* Center: Connect Coordinates */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="text-xs font-bold font-mono text-brand-gold uppercase tracking-wider">
            Private Communication Channels
          </h4>

          <div className="space-y-2.5 text-xs text-slate-300">
            {/* WhatsApp */}
            <button
              onClick={handleWhatappClick}
              className="flex items-center gap-2 hover:text-emerald-400 cursor-pointer transition-colors outline-none text-left"
            >
              <MessageSquare className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              <span>Secure WhatsApp Hotline</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={handleLinkedinClick}
              className="flex items-center gap-2 hover:text-cyan-400 cursor-pointer transition-colors outline-none text-left"
            >
              <Linkedin className="h-4.5 w-4.5 text-cyan-500 shrink-0" />
              <span>Verifiable LinkedIn Profile</span>
            </button>

            {/* Email */}
            <a
              href="mailto:hello@acquireopd.com"
              onClick={() => onLogEvent("Email Client Opened", "Engagement", "Footer Email Link")}
              className="flex items-center gap-2 hover:text-brand-teal transition-colors text-left"
            >
              <Mail className="h-4.5 w-4.5 text-brand-teal shrink-0" />
              <span>hello@acquireopd.com</span>
            </a>
          </div>
        </div>

        {/* Right Side: Legal anchors */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="text-xs font-bold font-mono text-brand-gold uppercase tracking-wider">
            Operational Covenants
          </h4>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 select-none">
              <Lock className="h-4 w-4 text-slate-500 shrink-0" />
              <span>Patient Privacy Assurance (HIPAA compliance)</span>
            </div>

            <div className="flex items-center gap-2 select-none">
              <Shield className="h-4 w-4 text-slate-500 shrink-0" />
              <span>Exclusive Neighborhood Non-compete SLA</span>
            </div>

            <div className="flex items-center gap-2 select-none">
              <FileText className="h-4 w-4 text-slate-500 shrink-0" />
              <span>Surgical Growth Framework Licensure</span>
            </div>
          </div>
        </div>

      </div>

      {/* Baseline credits */}
      <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-mono">
        <div>
          © 2026 Acquire OPD. All proprietary frameworks & diagnostic metrics reserved.
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white uppercase">Privacy Principles</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-white uppercase">Engagement Covenants</span>
        </div>
      </div>
    </footer>
  );
}
