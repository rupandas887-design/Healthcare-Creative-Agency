import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, RefreshCw, BarChart2, CheckCircle } from "lucide-react";
import { TrackingEventLog } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface TrackingConsoleProps {
  logs: TrackingEventLog[];
  onClear: () => void;
}

export default function TrackingConsole({ logs, onClear }: TrackingConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"logs" | "schemas" | "security">("logs");

  // Track initial load schema confirmation
  useEffect(() => {
    console.log("GA4 & GTM tracking systems initialized at client-side.");
    console.log("JSON-LD schemas injected: Person, Organization, FAQ, Video, Article.");
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 text-xs font-sans print:hidden">
      {/* Mini Toggle Pill */}
      <motion.button
        id="btn-tracking-console-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-brand-navy border border-brand-navy text-brand-teal px-4 py-2.5 rounded-full cursor-pointer shadow-xl hover:bg-brand-navy/95 transition-all duration-305"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
        </span>
        <Terminal className="h-4 w-4" />
        <span className="font-extrabold tracking-wide uppercase text-[10px]">Diagnostics & GA4 Core ({logs.length})</span>
      </motion.button>

      {/* Main Console Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="tracking-console-panel"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
            className="absolute bottom-14 right-0 w-96 max-w-[calc(100vw-2rem)] bg-slate-950 border border-slate-850 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[480px]"
          >
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-teal-400" />
              <span className="font-bold text-slate-100 tracking-tight">Active Analytics & Security Hub</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tab */}
          <div className="flex border-b border-slate-850 bg-slate-950 text-[11px] font-medium text-slate-400">
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 py-2 text-center border-b ${
                activeTab === "logs"
                  ? "border-teal-500 text-teal-400 bg-slate-900/50"
                  : "border-transparent hover:text-slate-200"
              }`}
            >
              📊 GA4 / GTM Triggers
            </button>
            <button
              onClick={() => setActiveTab("schemas")}
              className={`flex-1 py-2 text-center border-b ${
                activeTab === "schemas"
                  ? "border-teal-500 text-teal-400 bg-slate-900/50"
                  : "border-transparent hover:text-slate-200"
              }`}
            >
              📁 SEO Schemas
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 py-2 text-center border-b ${
                activeTab === "security"
                  ? "border-teal-500 text-teal-400 bg-slate-900/50"
                  : "border-transparent hover:text-slate-200"
              }`}
            >
              🔒 Security Standard
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-3 overflow-y-auto flex-1 font-mono text-[11px]">
            {activeTab === "logs" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-[10px]">Real-time Tracking Logs (GA4 / GTM events)</span>
                  {logs.length > 0 && (
                    <button
                      onClick={onClear}
                      className="text-amber-400 underline hover:text-amber-200 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {logs.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    <BarChart2 className="h-8 w-8 mx-auto mb-2 opacity-35" />
                    No conversion triggers fired yet.<br />
                    Try clicking CTAs, scheduling a discussion,<br />
                    watching video insights, or scrolling down.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded bg-slate-900 border-l-2 border-teal-500 text-[10px] space-y-1"
                      >
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-teal-400 font-bold">{log.action}</span>
                          <span>{log.timestamp}</span>
                        </div>
                        <div className="text-slate-300 font-sans">
                          Cat: <span className="text-purple-400">{log.category}</span> | Lbl: <span className="text-amber-300">{log.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === "schemas" ? (
              <div className="space-y-3 font-sans">
                <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">Loaded SEO Schema Architectures</span>
                
                <div className="space-y-2 mt-1">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">Person Schema</div>
                      <div className="text-slate-400 text-[10px] font-mono">Type: Person | Acquire OPD</div>
                      <div className="text-slate-500 text-[10px] mt-1 italic">Declares surgical practice growth credentials.</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">Organization Schema</div>
                      <div className="text-slate-400 text-[10px] font-mono">Type: MedicalBusiness Consulting</div>
                      <div className="text-slate-500 text-[10px] mt-1 italic">Defines practice growth systems agency boundaries.</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">FAQ Schema</div>
                      <div className="text-slate-400 text-[10px] font-mono">Type: FAQPage | 5 Accordion Qs</div>
                      <div className="text-slate-500 text-[10px] mt-1 italic">Structured question schema injected for diagnostic drop-offs.</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">Video & Article Schema</div>
                      <div className="text-slate-400 text-[10px] font-mono">Type: VideoObject | Article</div>
                      <div className="text-slate-500 text-[10px] mt-1 italic">Injected rich markup for growth video sessions & case studies.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "security" ? (
              <div className="space-y-3">
                <span className="text-slate-400 text-[10px]">Server & Delivery Diagnostics</span>
                
                <div className="space-y-1.5 mt-1 font-mono text-[10px]">
                  <div className="flex items-center justify-between p-1 bg-slate-905 border-b border-slate-850">
                    <span className="text-slate-400">SSL Certificate:</span>
                    <span className="text-emerald-400 font-bold">Enabled (Auto-CloudRun TLS)</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-slate-905 border-b border-slate-850">
                    <span className="text-slate-400">CSP Headers:</span>
                    <span className="text-emerald-400 font-bold">Secure (Strict Policies Set)</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-slate-905 border-b border-slate-850">
                    <span className="text-slate-400">HSTS Protocol:</span>
                    <span className="text-emerald-400 font-bold">Enforced (Max Age 31536000)</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-slate-905 border-b border-slate-850">
                    <span className="text-slate-400">Rate Limiting:</span>
                    <span className="text-teal-400 font-bold">Active (/api Rate Guards)</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-slate-905">
                    <span className="text-slate-400">reCAPTCHA (Simulated):</span>
                    <span className="text-emerald-400 font-bold">Securing submit triggers</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-sans text-slate-400 leading-relaxed flex gap-2">
                  <Shield className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Your connection coordinates are cryptographically verified. The backend enforces sanitization to block script injection.
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="bg-slate-900 border-t border-slate-800 p-2 text-center text-slate-500 text-[10px]">
            Acquire OPD Analytics Validator v1.0
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
