import React from "react";
import { Linkedin, Mail, Shield, Lock, FileText, Globe } from "lucide-react";

interface FooterProps {
  onLogEvent: (action: string, category: string, label: string) => void;
}

export default function Footer({ onLogEvent }: FooterProps) {
  
  const handleWhatappClick = () => {
    onLogEvent("WhatsApp Link Clicked", "Conversion", "Footer Social Contact");
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const message = `Hello Acquire OPD,

I would like to discuss hospital growth, patient acquisition, and surgical optimization.

Please get in touch with me.

Thank you.`;
    const encodedMessage = encodeURIComponent(message);
    const url = isMobile
      ? `https://api.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=919844955100&text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handleLinkedinClick = () => {
    onLogEvent("LinkedIn Link Clicked", "Social Engagement", "Footer Social Contact");
    window.open("https://www.linkedin.com/in/sunilsulegai", "_blank");
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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4.5 w-4.5 text-emerald-500 shrink-0"
              >
                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.7 1.461 5.253L2.04 22l4.89-.1.284-.131A9.923 9.923 0 0012.004 22c5.523 0 10.004-4.48 10.004-10.004C22.008 6.48 17.527 2 12.004 2zm5.795 13.918c-.254.712-1.254 1.3-1.744 1.385-.472.083-.938.165-3.05-.668-2.695-1.06-4.43-3.805-4.562-3.985-.132-.18-1.071-1.425-1.071-2.717s.672-1.92.933-2.186c.26-.266.567-.333.756-.333h.538c.17 0 .398.004.586.417.202.443.689 1.68.747 1.796.058.117.098.253.02.408-.078.156-.117.253-.234.39-.117.137-.253.307-.361.413-.122.12-.25.25-.107.49.142.24.63 1.03 1.353 1.67.933.826 1.718 1.082 1.964 1.205.246.123.388.103.533-.064.145-.167.625-.727.791-.975.166-.248.332-.208.558-.125.226.083 1.432.676 1.678.8.246.124.41.186.47.289.06.103.06.598-.194 1.31z" />
              </svg>
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
              href="mailto:acquireopd@gmail.com"
              onClick={() => onLogEvent("Email Client Opened", "Engagement", "Footer Email Link")}
              className="flex items-center gap-2 hover:text-brand-teal transition-colors text-left"
            >
              <Mail className="h-4.5 w-4.5 text-brand-teal shrink-0" />
              <span>acquireopd@gmail.com</span>
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
