import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Acquire OPD";
  }, []);

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === 'submitting' || formState === 'success') {
      return;
    }
    setFormState('submitting');
    setErrorMsg(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = {
      name: (formData.get('name') as string || '').trim(),
      hospital: (formData.get('hospital') as string || '').trim(),
      mobile: (formData.get('mobile') as string || '').trim(),
      email: (formData.get('email') as string || '').trim(),
      city: (formData.get('city') as string || '').trim(),
      message: (formData.get('message') as string || '').trim(),
    };

    // Client-side validation
    if (!data.name || !data.hospital || !data.mobile || !data.email || !data.city) {
      setErrorMsg('Please fill out all required fields.');
      setFormState('idle');
      return;
    }

    // 1. Fetch user IP
    let userIp = 'Unknown';
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        userIp = ipData.ip || 'Unknown';
      }
    } catch (e) {
      console.warn('Failed to fetch user IP:', e);
    }

    // 2. Get User Agent
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const createdAt = new Date().toISOString();

    const baseData = {
      name: data.name,
      hospital: data.hospital,
      mobile: data.mobile,
      email: data.email,
      city: data.city,
      message: data.message,
    };

    let savedSuccessfully = false;
    let finalError: any = null;

    if (isSupabaseConfigured && supabase) {
      // Robust multi-schema-supporting cascade insert logic to handle possible schemas automatically
      const attempts = [
        // Attempt 1: All columns lower_snake_case (matching public.submissions schema precisely)
        async () => {
          const { error } = await supabase.from('submissions').insert([{
            ...baseData,
            created_at: createdAt,
            user_ip: userIp,
            user_agent: userAgent
          }]);
          return error;
        },
        // Attempt 2: All columns camelCase
        async () => {
          const { error } = await supabase.from('submissions').insert([{
            ...baseData,
            createdAt: createdAt,
            userIp: userIp,
            userAgent: userAgent
          }]);
          return error;
        },
        // Attempt 3: Alternative snake_case (e.g. browser_user_agent, ip)
        async () => {
          const { error } = await supabase.from('submissions').insert([{
            ...baseData,
            created_at: createdAt,
            ip: userIp,
            browser_user_agent: userAgent
          }]);
          return error;
        },
        // Attempt 4: Base data + created_at
        async () => {
          const { error } = await supabase.from('submissions').insert([{
            ...baseData,
            created_at: createdAt
          }]);
          return error;
        },
        // Attempt 5: Base data only
        async () => {
          const { error } = await supabase.from('submissions').insert([baseData]);
          return error;
        }
      ];

      for (let i = 0; i < attempts.length; i++) {
        try {
          const err = await attempts[i]();
          if (!err) {
            savedSuccessfully = true;
            break;
          }
          finalError = err;
          console.warn(`Supabase insert attempt ${i + 1} failed:`, err);
        } catch (e) {
          finalError = e;
          console.warn(`Supabase insert attempt ${i + 1} threw exception:`, e);
        }
      }

      if (!savedSuccessfully) {
        console.error('All Supabase insert attempts failed. Final error details logged:', finalError);
        setErrorMsg(finalError?.message || finalError?.details || 'Failed to insert submission into Supabase. Please ensure your Supabase database table submissions is set up with public permissions.');
        setFormState('idle');
        return;
      }
    } else {
      // Supabase is not configured yet, prevent silent failure and warn clearly
      console.error('Supabase is not configured. Missing VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY environment variables.');
      setErrorMsg('Database configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables in the Settings panel.');
      setFormState('idle');
      return;
    }

    if (savedSuccessfully) {
      // Clear/reset all form fields upon successful database insertion
      formElement.reset();
      setFormState('success');

      // Construct dynamic pre-filled WhatsApp link with actual values
      const prefilledText = `Hello Acquire OPD Team,

I have submitted the **Request a Free Audit** form.

Here are my details:

👤 Full Name: ${data.name}
🏥 Hospital Name: ${data.hospital}
📱 Mobile Number: ${data.mobile}
📧 Email: ${data.email}
📍 City: ${data.city}

📝 Requirement:
${data.message || 'None'}

Please contact me regarding my free hospital growth audit.

Thank you.`;

      const encodedText = encodeURIComponent(prefilledText);
      const whatsappUrl = `https://wa.me/919429693887?text=${encodedText}`;

      // Automatically redirect to WhatsApp after 2 seconds to let the user see the success message
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 2000);
    }
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-center leading-tight drop-shadow-lg"
          >
            Let's Talk About Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Growth</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 text-center max-w-2xl mx-auto"
          >
            Ready to increase your OPD and surgeries? Schedule a free consultation with our healthcare growth experts.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Contact Information */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Get in Touch</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Have questions about our hospital growth strategies? Contact us directly or fill out the form, and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WhatsApp Us</h3>
                    <p className="text-slate-500 text-sm mb-2">Fastest way to get a response</p>
                    <a href="https://wa.me/919429693887" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                      +91 94296 93887
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-500 text-sm mb-2">
                      Monday to Saturday<br />
                      9:00 AM – 7:00 PM
                    </p>
                    <a href="tel:+919429693887" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                      +91 94296 93887
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-500 text-sm mb-2">For general inquiries</p>
                    <a href="mailto:acquireopd@gmail.com" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                      acquireopd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office</h3>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Acquire+OPD,+1704,+17th+Cross+Rd,+Govindaraja+Nagar+Ward,+MC+Layout,+Vijayanagar,+Bengaluru,+Karnataka+560040"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 text-sm leading-relaxed hover:text-primary-600 transition-colors block"
                    >
                      Acquire OPD <br />
                      1704, 17th Cross Rd, <br />
                      Govindaraja Nagar Ward, <br />
                      MC Layout, <br />
                      Vijayanagar, <br />
                      Bengaluru, <br />
                      Karnataka 560040
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                  <h3 className="text-2xl font-display font-bold text-slate-900">Request a Free Audit</h3>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl">
                    <p className="font-semibold mb-1">Connection Error</p>
                    <p>{errorMsg}</p>
                  </div>
                )}
                
                {formState === 'success' ? (
                  <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-100 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Send size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Thank you! Your request has been submitted successfully.</h4>
                    <p className="text-emerald-700">
                      Your form has been securely recorded. We are redirecting you to WhatsApp shortly to confirm your booking and details...
                    </p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="mt-6 text-emerald-600 font-semibold hover:text-emerald-700 underline text-sm block mx-auto"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="hospital" className="block text-sm font-medium text-slate-700 mb-2">Hospital Name</label>
                        <input 
                          type="text" 
                          id="hospital" 
                          name="hospital"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                          placeholder="City Care Hospital"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
                        <input 
                          type="tel" 
                          id="mobile" 
                          name="mobile"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                          placeholder="+91 94296 93887"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                          placeholder="doctor@hospital.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="Mumbai"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">How can we help you grow?</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                        placeholder="E.g., We want to increase our orthopedic surgery footfall..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={formState === 'submitting'}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-lg py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                      >
                        {formState === 'submitting' ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Book Free Consultation
                            <Send size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Decorative Footer Accent */}
      <div className="h-4 bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600"></div>
    </div>
  );
}
