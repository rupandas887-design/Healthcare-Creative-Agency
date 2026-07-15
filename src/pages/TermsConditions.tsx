import { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ShieldAlert, Scale, UserCheck, AlertTriangle, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Acquire OPD";
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
            className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary-500/20"
          >
            <FileText size={16} />
            Service Agreement Terms
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-extrabold mb-4 leading-tight"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-base md:text-lg"
          >
            Last Updated: {lastUpdated} • Binding Legal Agreement for Website & Consulting Services
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
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
                Welcome to Acquire OPD. These Terms & Conditions ("Terms", "Agreement") govern your access to and use of the website located at <a href="/" className="text-primary-600 hover:underline">https://acquireopd.com/</a> (the "Site") and any free digital growth audits, analysis, consultation materials, and consulting programs managed by us (the "Services").
              </p>
              <p className="text-slate-600">
                Please read this Agreement carefully. By entering the Site, filling out submission forms, or clicking any booking action that redirects you to WhatsApp, you represent that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must stop using the Site and our Services immediately.
              </p>
            </div>

            {/* 1. Website Usage Terms */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">1. Website Usage & Eligibility</h2>
                  <p className="text-slate-500 text-sm mt-1">Acceptable use policy and criteria for accessing our platform</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  To interact with this Site and request a free hospital growth audit, you must:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Be at least 18 years of age and hold the legal capacity to represent your hospital, medical practice, or healthcare company.</li>
                  <li>Provide precise, authentic, and complete information inside all submission forms.</li>
                  <li>Refrain from attempting to disrupt the website systems, intercept server queries, or upload malicious code scripts.</li>
                  <li>Avoid launching automated script engines or data scraping bots to parse intellectual property or statistics displayed on this Site.</li>
                </ul>
              </div>
            </div>

            {/* 2. User Responsibilities & Content Submissions */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">2. User Responsibilities</h2>
                  <p className="text-slate-500 text-sm mt-1">Rules regarding the submission of clinical and operational details</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  When submitting contact requests or answering diagnostic survey questions regarding your hospital operations, you assume full responsibility for your inputs:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Accuracy:</strong> You confirm that the hospital name, mobile number, email, and description represent a real and active medical facility in India.</li>
                  <li><strong>Authorized Representative:</strong> You warrant that you are a founder, doctor, surgeon, administrative director, or authorized manager empowered to discuss the business metrics of the stated hospital.</li>
                  <li><strong>No Spam:</strong> You agree not to submit fraudulent inputs, unsolicited marketing offers, duplicate testing logs, or defamatory remarks inside our grow-message modules.</li>
                </ul>
              </div>
            </div>

            {/* 3. Intellectual Property Rights */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">3. Intellectual Property Rights</h2>
                  <p className="text-slate-500 text-sm mt-1">Ownership of designs, branding assets, copywriting, and growth methodologies</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  Unless stated otherwise, all assets, graphic materials, visual designs, system models, case study data, video summaries, software source files, and copy text displayed on this Site belong exclusively to Acquire OPD:
                </p>
                <p>
                  You are granted a limited, non-transferable, revocable license to view and share our landing page content purely for educational or clinical planning purposes. You are strictly prohibited from copying, reproducing, republished, translating, or commercially selling our proprietary hospital scaling systems, design mockups, or case files without receiving explicit, written consent from our Board of Directors.
                </p>
              </div>
            </div>

            {/* 4. Limitation of Liability */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">4. Limitation of Liability</h2>
                  <p className="text-slate-500 text-sm mt-1">Provisions defining our financial and consulting boundaries</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  To the maximum extent permitted by applicable Indian laws:
                </p>
                <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600 text-sm">
                  In no event shall Acquire OPD, its strategic advisors, technical partners, or content contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages—including but not limited to loss of hospital profits, patient volume fluctuations, reputational damage, technical downtime, database downtime, or medical practice interruptions—arising from or in connection with your use or inability to use this Site, or reliance on any free audit suggestions received.
                </p>
              </div>
            </div>

            {/* 5. General Disclaimer */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">5. General Disclaimer</h2>
                  <p className="text-slate-500 text-sm mt-1">Clarification on educational vs. professional healthcare representation</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  The marketing growth recommendations, statistics, digital strategies, and case study outcomes presented on this website are for educational and advisory purposes only. Every surgeon-owned hospital operates under distinct state guidelines, localized demographic factors, specific specializations, and unique pricing rules.
                </p>
                <p>
                  Acquire OPD makes no absolute guarantees or mathematical representations that our strategies will yield an identical result for your clinical business. Business progression requires active internal management, operational training, proper execution of advice, and consistent medical care standards.
                </p>
              </div>
            </div>

            {/* 6. Governing Law & Dispute Resolution */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">6. Governing Law (India)</h2>
                  <p className="text-slate-500 text-sm mt-1">Legal jurisdiction and administrative boundaries</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  These Terms & Conditions shall be construed and governed in accordance with the laws of India. Any legal disputes or actions stemming from the use of this website, the digital forms, or our consulting services must be filed exclusively in the courts located in Bengaluru, Karnataka, India.
                </p>
              </div>
            </div>

            {/* 7. Updates and Modifications */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">7. Changes to This Agreement</h2>
                  <p className="text-slate-500 text-sm mt-1">Our authority to edit or replace these terms</p>
                </div>
              </div>
              <div className="pl-14 space-y-4">
                <p>
                  We maintain full authority to update, revise, or modify these Terms & Conditions at any moment. When changes are finalized, we will update the "Last Updated" status at the top of this page. Your continued use of the website or engagement with our consulting systems after updates are posted constitutes complete acceptance of the updated Terms.
                </p>
              </div>
            </div>

            {/* 8. Contact Information */}
            <div className="border-t border-slate-100 pt-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/20">
                  <Scale size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">8. Contact Information</h2>
                  <p className="text-slate-600 mb-4">
                    For clear answers regarding our service conditions, website guidelines, or legal liability policies, reach out directly to our team:
                  </p>
                  <div className="space-y-2 text-slate-700">
                    <p><strong>Email:</strong> <a href="mailto:acquireopd@gmail.com" className="text-primary-600 hover:underline font-medium">acquireopd@gmail.com</a></p>
                    <p><strong>Phone / WhatsApp:</strong> +91 98449 55100</p>
                    <p><strong>Office Address:</strong> Acquire OPD, 1704, 17th Cross Rd, Govindaraja Nagar Ward, MC Layout, Vijayanagar, Bengaluru, Karnataka 560040</p>
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
