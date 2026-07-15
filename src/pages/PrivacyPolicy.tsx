import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Database, Lock, UserCheck, RefreshCw, HelpCircle, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Acquire OPD";
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "July 13, 2026";

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" 
          />
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" 
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-emerald-500/20"
          >
            <Shield size={16} />
            Data Protection Committed
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-extrabold mb-4 leading-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-base md:text-lg"
          >
            Last Updated: {lastUpdated} • Compliance with Digital Personal Data Protection (DPDP) Guidelines
          </motion.p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-12 text-slate-700 leading-relaxed"
          >
            {/* Introduction block */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 font-medium">
                Welcome to Acquire OPD (referred to as "we", "us", "our", or "Acquire OPD"). We value your trust and are fully committed to protecting your personal information and corporate data. This Privacy Policy describes how we collect, store, process, protect, and use your information when you visit our website, complete our free audit/consultation forms, communicate with us, or engage our professional hospital growth consulting services.
              </p>
              <p className="text-slate-600">
                By accessing our website or providing your details through our services (including submitting form inputs that redirect you to WhatsApp for pre-filled outreach), you consent to the collection and use of your information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                  <Eye size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">1. Information We Collect</h2>
                  <p className="text-slate-500 text-sm mt-1">What personal data is gathered during your interaction with our brand</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  To provide our growth audit services and consult with you effectively, we collect details that you voluntarily submit through our online interface:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Identity Information:</strong> Your full name and credentials.</li>
                  <li><strong>Hospital/Clinic Information:</strong> Name of the hospital, organization, or clinical practice you manage or operate.</li>
                  <li><strong>Contact Details:</strong> Your mobile phone number (with WhatsApp capabilities) and professional email address.</li>
                  <li><strong>Geographical Information:</strong> Your city or state of practice inside India.</li>
                  <li><strong>Professional Message:</strong> Particular growth goals, existing OPD volume bottlenecks, or specific help requested in the message block.</li>
                  <li><strong>Device and Metadata Information:</strong> When you complete our forms, we securely capture your local IP address and browser user-agent to protect our database against malicious submissions and fake robotic activities.</li>
                </ul>
              </div>
            </div>

            {/* 2. How We Use Your Data */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">2. How We Use Your Data</h2>
                  <p className="text-slate-500 text-sm mt-1">Our exact purposes for analyzing and maintaining your information</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  Acquire OPD uses the information we collect to run and scale surgical hospital systems. Specifically, your data is used to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Assess hospital challenges and generate custom professional growth audit blueprints.</li>
                  <li>Contact you directly via mobile voice call, email, or secure WhatsApp channels.</li>
                  <li>Prefill WhatsApp consultation cards to save you time when initializing clinical growth planning with our executive team.</li>
                  <li>Improve our platform design, service flow, and patient-acquisition strategies.</li>
                  <li>Provide customer service, answer inquiries, and manage professional client relationships.</li>
                  <li>Comply with Indian cyber security mandates, anti-spam regulations, and digital records laws.</li>
                </ul>
              </div>
            </div>

            {/* 3. Data Security and Storage */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">3. Data Security & Storage</h2>
                  <p className="text-slate-500 text-sm mt-1">How we secure your hospital growth details against data leaks</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  Your security is our primary focus. We apply robust security frameworks to prevent unauthorized access, manipulation, alteration, or disclosure of data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>SSL Encryption:</strong> All form submission details traveling between your local device and our server are secured with advanced Secure Socket Layer (SSL) encryption protocols.</li>
                  <li><strong>Cloud Database Security:</strong> Your records are securely stored within a protected cloud database hosted on Supabase, with strictly managed database user credentials, active row-level security (RLS), and secure API authorizations.</li>
                  <li><strong>Access Controls:</strong> Only authorized Acquire OPD analysts and technology leads have verified credentials to access client submissions for auditing purposes.</li>
                </ul>
                <p className="text-slate-500 text-sm">
                  Please be aware that although we maintain maximum security precautions, no digital communication channel over the open internet is completely impervious to zero-day security gaps. We encourage you to maintain basic computer and browser security controls locally.
                </p>
              </div>
            </div>

            {/* 4. Cookies & Browser Analytics */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">4. Cookies & Tracking Technologies</h2>
                  <p className="text-slate-500 text-sm mt-1">Our policy on browser cookies and digital metrics</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  We utilize cookies to deliver premium user interactions and evaluate performance metrics. Cookies are miniature text files stored on your device that allow our platform to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Detect custom layout preferences and preserve visual styles.</li>
                  <li>Gather aggregated browser performance data to improve page load speed.</li>
                  <li>Assess user traffic routing paths to ensure stable performance of digital assets.</li>
                </ul>
                <p>
                  You can configure your browser to reject some or all cookies. However, disabling cookies might prevent certain interactive elements of our platform from functioning correctly.
                </p>
              </div>
            </div>

            {/* 5. Third-Party Services */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">5. Third-Party Integrations</h2>
                  <p className="text-slate-500 text-sm mt-1">External services used to safely handle submissions</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  We utilize third-party systems to operate our growth platform safely and send pre-filled booking notifications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Supabase:</strong> For cloud database management under safe enterprise-level physical and logical storage parameters.</li>
                  <li><strong>WhatsApp (Meta Platforms, Inc.):</strong> For directing users to start instant conversations with our executive consulting team.</li>
                  <li><strong>IP Analytics (Ipify):</strong> For validating real, unique user request sources to mitigate database denial-of-service spam.</li>
                </ul>
                <p>
                  We do not sell, rent, or lease our client lists or user data records to third-party commercial marketing directories under any circumstances.
                </p>
              </div>
            </div>

            {/* 6. User Rights & Data Control */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">6. Your Rights & Data Ownership</h2>
                  <p className="text-slate-500 text-sm mt-1">Control your digital footprint and database records</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  In compliance with global data protection protocols and India's Digital Personal Data Protection (DPDP) Act, you have the following rights over your records:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Right to Access:</strong> You can query us to request copies of your registered personal or clinical details saved in our systems.</li>
                  <li><strong>Right to Rectification:</strong> You can ask us to correct or update any outdated or incorrect contact details.</li>
                  <li><strong>Right to Erasure (Right to be Forgotten):</strong> You can request that we permanently delete your name and clinical audit submissions from our database.</li>
                  <li><strong>Withdraw Consent:</strong> You can withdraw consent for any future email newsletters or audit reviews.</li>
                </ul>
                <p>
                  To exercise any of these rights, please draft a request letter to <span className="text-primary-600 font-medium">acquireopd@gmail.com</span>.
                </p>
              </div>
            </div>

            {/* 7. Governing Law and Updates */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">7. Governing Law & Updates</h2>
                  <p className="text-slate-500 text-sm mt-1">Legal jurisdiction and administrative policy modifications</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  This Privacy Policy is governed exclusively by the federal laws of the Republic of India. Any litigation, dispute, or discrepancy arising from this policy shall fall within the exclusive jurisdiction of the competent courts of Bengaluru, Karnataka, India.
                </p>
                <p>
                  We reserve the right to modify or replace this Privacy Policy at any time. When updates are published, we will adjust the "Last Updated" date located at the top of this document. We recommend visiting this page periodically to remain informed about our storage and security practices.
                </p>
              </div>
            </div>

            {/* 8. Contact Information */}
            <div className="border-t border-slate-100 pt-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">8. Privacy Concerns & Inquiries</h2>
                  <p className="text-slate-600 mb-4">
                    If you have questions about how we handle user data or want to request a complete removal of your records, please contact our team:
                  </p>
                  <div className="space-y-2 text-slate-700">
                    <p><strong>Email:</strong> <a href="mailto:acquireopd@gmail.com" className="text-primary-600 hover:underline font-medium">acquireopd@gmail.com</a></p>
                    <p><strong>Phone / WhatsApp:</strong> +91 98449 55100</p>
                    <p><strong>Address:</strong> Acquire OPD, 1704, 17th Cross Rd, Govindaraja Nagar Ward, MC Layout, Vijayanagar, Bengaluru, Karnataka 560040</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
