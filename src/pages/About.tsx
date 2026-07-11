import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp, Shield, Users, Award, CheckCircle2, Building2 } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight drop-shadow-lg"
          >
            Transforming Hospitals into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">High-Performing</span> Brands
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
          >
            We are India's leading Hospital Growth Consultancy, dedicated to helping healthcare providers achieve predictable, sustainable growth through strategic business and digital transformation.
          </motion.p>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Approach</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">Why Acquire OPD Exists</h3>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  The healthcare industry is evolving rapidly, but many excellent hospitals struggle with patient acquisition and sustainable growth. They don't need another external service provider or fragmented marketing efforts.
                </p>
                <p>
                  Acquire OPD was founded to become a true growth partner for hospital leadership. We begin by understanding how the hospital operates, identifying bottlenecks, and then designing systems that improve the entire ecosystem—from operations to patient experience and revenue.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-primary-50 rounded-3xl p-8 border border-primary-100"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white mb-6">
                  <Target size={24} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h4>
                <p className="text-slate-600 leading-relaxed">
                  To transform hospitals into high-performing organizations by improving every stage of the patient journey, strengthening internal systems, increasing OPD, improving surgery conversion, and driving long-term revenue growth.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6">
                  <Lightbulb size={24} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h4>
                <p className="text-slate-600 leading-relaxed">
                  To help hospitals become smarter, more efficient, and more sustainable healthcare organizations through operational excellence, digital transformation, and strategic growth.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Principles</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Core Values</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: 'Innovation', desc: 'Constantly adapting to new technologies and marketing trends.' },
              { icon: Shield, title: 'Transparency', desc: 'Clear reporting, honest communication, and no hidden fees.' },
              { icon: TrendingUp, title: 'Growth Focus', desc: 'Every strategy is aligned with increasing your bottom line.' },
              { icon: Award, title: 'Integrity', desc: 'Ethical healthcare marketing adhering to medical guidelines.' },
              { icon: Users, title: 'Partnership', desc: 'We act as an extension of your in-house team.' },
              { icon: Target, title: 'Excellence', desc: 'Delivering the highest quality of service and results.' }
            ].map((value, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white p-8 rounded-2xl shadow-md shadow-slate-200/50"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-primary-600 mb-6">
                  <value.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hospitals Choose Us */}
      <section className="py-20 lg:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Ecosystem Approach</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8">Improving Every Department</h3>
              
              <div className="space-y-6">
                {[
                  { title: 'Hospital Operations', desc: 'Identifying bottlenecks and improving the flow of patients and resources.' },
                  { title: 'Patient Journey', desc: 'Enhancing the experience from first inquiry to post-surgery follow-up.' },
                  { title: 'Digital Hospital Workflows', desc: 'Implementing systems for seamless inter-department coordination.' },
                  { title: 'Hospital Performance', desc: 'Giving leadership clear visibility into operational and financial metrics.' }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex gap-4"
                  >
                    <div className="mt-1">
                      <CheckCircle2 className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {/* Decorative Grid - Premium Animated Medical Elements */}
               <div className="bg-slate-100 rounded-3xl h-48 md:h-64 mt-12 overflow-hidden relative border border-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 mix-blend-multiply"></div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center opacity-40 text-primary-600"
                  >
                    <Building2 size={80} strokeWidth={1} />
                  </motion.div>
               </div>
               <div className="bg-slate-900 rounded-3xl h-48 md:h-64 overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-emerald-900/40 mix-blend-multiply"></div>
                  <motion.div 
                     animate={{ y: [-10, 10, -10] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-20 h-20 rounded-full border-[4px] border-emerald-500/30 flex items-center justify-center relative">
                      <div className="w-full h-full rounded-full border-[4px] border-emerald-500 border-l-transparent absolute inset-0" style={{ animation: 'spin 3s linear infinite' }}></div>
                      <span className="text-white font-bold text-lg"><AnimatedCounter value={85} />%</span>
                    </div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Efficiency</span>
                  </motion.div>
               </div>
               <div className="bg-primary-50 rounded-3xl h-48 md:h-64 col-span-2 p-8 flex flex-col justify-center border border-primary-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Target size={120} />
                  </div>
                  <p className="text-primary-900 text-lg md:text-xl font-medium italic relative z-10 leading-relaxed">
                    "Acquire OPD completely transformed our patient acquisition strategy. Our surgery bookings have doubled in just 6 months."
                  </p>
                  <p className="mt-4 text-primary-700 font-bold relative z-10">- Dr. Sharma, Apex City Hospital</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
