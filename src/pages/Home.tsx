import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Users, Activity, BarChart3, Stethoscope, 
  Smartphone, Target, ShieldCheck, ArrowRight, Building2,
  CheckCircle2, Search, Laptop, Settings, Heart
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const AnimatedHeroStory = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto z-10">
      
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
        <defs>
           <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
             <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
           </linearGradient>
        </defs>
        
        {/* Connecting Lines */}
        <path d="M 50 50 L 23 23 L 77 23 L 77 77 L 23 77 Z" fill="none" stroke="url(#flow-gradient)" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M 50 50 L 77 23" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        <path d="M 50 50 L 77 77" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        <path d="M 50 50 L 23 77" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Animated glowing path */}
        <motion.path 
          d="M 50 50 L 23 23 L 77 23 L 77 77 L 23 77 Z" 
          fill="none" 
          stroke="url(#flow-gradient)" 
          strokeWidth="1"
          strokeDasharray="10 100"
          animate={{ strokeDashoffset: [110, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Central Hospital */}
      <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-100 flex flex-col items-center justify-center z-30">
        <div className="w-1/2 h-1/2 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl flex items-center justify-center text-primary-600 mb-2 relative overflow-hidden shadow-inner">
           <div className="absolute inset-0 bg-primary-400 opacity-20 animate-pulse" />
           <Building2 className="w-1/2 h-1/2 relative z-10" />
        </div>
        <div className="text-[10px] sm:text-xs font-bold text-slate-800">Acquire OPD</div>
        <div className="text-[8px] sm:text-[10px] text-emerald-500 font-semibold mt-0.5">Growth Partner</div>
      </div>

      {/* Panel 1: Audit & Digitize (Top Left) */}
      <motion.div 
        animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[2%] left-[2%] w-[42%] h-[42%] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-3 flex flex-col z-20"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
             <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[9px] sm:text-xs font-bold leading-tight text-slate-800">Audit &<br/>Digitize</div>
        </div>
        <div className="flex-1 bg-slate-50 rounded-lg p-1.5 sm:p-2 border border-slate-100 flex flex-col justify-center gap-1.5 sm:gap-2">
           <div className="flex items-center gap-2">
             <Laptop className="w-3 h-3 text-slate-400" />
             <div className="flex-1 h-1 sm:h-1.5 bg-slate-200 rounded-full overflow-hidden">
               <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-400" />
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Settings className="w-3 h-3 text-slate-400" />
             <div className="flex-1 h-1 sm:h-1.5 bg-slate-200 rounded-full overflow-hidden">
               <motion.div animate={{ width: ['0%', '80%'] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="h-full bg-indigo-400" />
             </div>
           </div>
        </div>
      </motion.div>

      {/* Panel 2: Patient Journey (Top Right) */}
      <motion.div 
        animate={{ y: [2, -2, 2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[2%] right-[2%] w-[42%] h-[42%] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-3 flex flex-col z-20"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shrink-0">
             <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[9px] sm:text-xs font-bold leading-tight text-slate-800">Patient<br/>Journey</div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2">
           <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-5 sm:w-7 sm:h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
             <Users className="w-3 h-3 sm:w-4 sm:h-4" />
           </motion.div>
           <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-emerald-500">
             <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
           </motion.div>
           <motion.div animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-5 sm:w-7 sm:h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
             <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4" />
           </motion.div>
        </div>
        <div className="text-[7px] sm:text-[9px] text-center text-slate-500 font-medium uppercase tracking-wider">Optimized Flow</div>
      </motion.div>

      {/* Panel 3: Surgery Conversion (Bottom Right) */}
      <motion.div 
        animate={{ y: [2, -2, 2] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] right-[2%] w-[42%] h-[42%] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-3 flex flex-col z-20"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[9px] sm:text-xs font-bold text-slate-800">Growth<br/>Metrics</div>
          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
        </div>
        
        <div className="flex flex-col gap-1 sm:gap-2 flex-1 justify-center">
          <div className="flex justify-between items-end bg-slate-50 p-1 sm:p-1.5 rounded-lg border border-slate-100">
            <div className="text-[8px] sm:text-[10px] text-slate-500 font-medium">Daily OPD</div>
            <div className="text-sm sm:text-base font-bold text-primary-600"><AnimatedCounter value={520} duration={3} />+</div>
          </div>
          <div className="flex justify-between items-end bg-emerald-50 p-1 sm:p-1.5 rounded-lg border border-emerald-100">
            <div className="text-[8px] sm:text-[10px] text-emerald-700 font-medium leading-tight">Surgery<br/>Conversion</div>
            <div className="text-sm sm:text-base font-bold text-emerald-600"><AnimatedCounter value={45} duration={4} suffix="%" /></div>
          </div>
        </div>
      </motion.div>

      {/* Panel 4: Revenue & Growth (Bottom Left) */}
      <motion.div 
        animate={{ y: [-2, 2, -2] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] left-[2%] w-[42%] h-[42%] bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-2 sm:p-3 flex flex-col z-20 text-white"
      >
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div className="text-[9px] sm:text-xs font-bold text-slate-100">Revenue Scale</div>
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
        </div>
        <div className="text-[7px] sm:text-[9px] text-slate-400 mb-2">Continuous Growth</div>
        <div className="flex-1 flex items-end gap-1">
           {[30, 40, 35, 55, 75, 100].map((h, i) => (
             <motion.div 
               key={i}
               animate={{ height: [`${Math.max(10, h - 20)}%`, `${h}%`, `${Math.max(10, h - 20)}%`] }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
               className={`flex-1 rounded-t-sm w-full ${i === 5 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-primary-500/50'}`}
             />
           ))}
        </div>
      </motion.div>

    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Abstract Background with Animated Particles */}
        <div className="absolute inset-0 -z-10 bg-slate-50 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-100 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" 
          />
          {/* Floating Healthcare Particles */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{
                  y: [null, Math.random() * -200 - 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="flex flex-col items-center text-center justify-center">
            
            {/* Centered Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full relative z-10 flex flex-col items-center"
              id="hero-content"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-emerald-200/50 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Hospital Growth Consultancy
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-[32px] sm:text-[44px] lg:text-[54px] font-display font-bold leading-[1.1] mb-4 text-slate-900 drop-shadow-sm max-w-[750px]">
                Helping Surgeon-Owned Hospitals Build <span className="text-primary-600 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Predictable Growth Systems</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-base sm:text-lg lg:text-[20px] font-semibold text-emerald-600 mb-4 max-w-[650px] leading-[1.6] tracking-wide uppercase bg-emerald-50/50 px-4 py-1.5 rounded-full border border-emerald-100/60">
                Increase OPD • Improve Conversions • Maximize Revenue
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-slate-500 mb-8 leading-relaxed max-w-[650px]">
                Hospitals don't need more marketing. They need a complete growth system. We partner with management to build stronger, more profitable, and patient-centered hospitals.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
                <Link to="/contact" className="group h-[52px] w-full sm:w-48 bg-emerald-600 text-white rounded-xl font-bold text-base shadow-lg shadow-emerald-600/15 hover:bg-emerald-700 hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2" id="cta-start">
                  Start Your Journey
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="h-[52px] w-full sm:w-48 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-base hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center" id="cta-expert">
                  Talk to Expert
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive Growth System Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-slate-100" id="interactive-system">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/50 to-white overflow-hidden pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-primary-200/50 shadow-sm"
            >
              Interactive Growth System
            </motion.div>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6"
            >
              Our Dynamic Growth Engine
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-lg text-slate-600"
            >
              Every element of our consultancy works in harmony. Click through the interconnected pillars of our system below to see how we digitize, optimize patient journeys, and scale surgeon-owned hospitals.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center w-full z-10 perspective-1000 max-w-3xl mx-auto"
            id="interactive-growth-container"
          >
            <div className="w-full bg-slate-50/70 backdrop-blur-sm p-6 sm:p-12 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50">
              <AnimatedHeroStory />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 border-y border-slate-200 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm font-semibold text-slate-500 tracking-wider uppercase">Trusted by 100+ Leading Hospitals</p>
        </div>
        <div className="flex whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-16 items-center px-8"
          >
            {/* Generating fake hospital names for demo */}
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex gap-16 items-center">
                {['Apollo Med', 'CareMax', 'City Hospital', 'Metro Health', 'Sunrise Clinics', 'Apex Medical', 'Vitality'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2 text-2xl font-display font-bold text-slate-400">
                    <Building2 size={28} />
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 lg:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">Improving The Entire Ecosystem</h3>
            <p className="text-lg text-slate-600">We don't focus on one department. We identify operational gaps and build systems that improve patient journeys, operations, and revenue.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Increase OPD', desc: 'Identify bottlenecks and improve the consultation experience to drive predictable patient footfall.' },
              { icon: Activity, title: 'Increase Surgeries', desc: 'Improve consultation-to-surgery conversion rates with optimized patient journeys and follow-ups.' },
              { icon: Smartphone, title: 'Digitalization', desc: 'Implement digital hospital workflows, CRM, and performance monitoring dashboards.' },
              { icon: Target, title: 'Operational Efficiency', desc: 'Strengthen management decisions and optimize workflows across every department.' },
              { icon: ShieldCheck, title: 'Patient Experience', desc: 'Build a stronger, more patient-centered hospital that drives loyalty and trust.' },
              { icon: BarChart3, title: 'Revenue Growth', desc: 'Create sustainable revenue growth by improving the entire hospital ecosystem.' }
            ].map((service, i) => (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                key={i} 
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Acquire OPD */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute w-[800px] h-[800px] bg-primary-900/40 rounded-full blur-[100px] -top-1/2 -left-1/4" />
          <div className="absolute w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[100px] bottom-0 right-0 translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">Our Philosophy</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">Not a Service Provider. <br/>Your Growth Partner.</h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We collaborate with hospital leadership to build systems that deliver measurable improvements in operations, patient satisfaction, clinical performance, and financial growth.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  'Hospital Operations',
                  'Patient Journey Optimization',
                  'Leadership Visibility',
                  'Front Office Efficiency',
                  'OPD-to-Surgery Conversion',
                  'Sustainable Revenue Growth'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                    <span className="text-slate-200 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card bg-white/10 border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid gap-6">
                  {/* Stats Cards */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-slate-400 text-sm font-medium mb-1">Average OPD Growth</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-display font-bold text-white"><AnimatedCounter value={200} />%</span>
                      <span className="text-emerald-400 flex items-center text-sm font-medium pb-1"><TrendingUp size={16} className="mr-1" /> within 6 months</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-slate-400 text-sm font-medium mb-1">Hospitals Consulted</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-display font-bold text-white"><AnimatedCounter value={100} />+</span>
                      <span className="text-slate-400 text-sm font-medium pb-1">across India</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary-600 to-emerald-500 rounded-2xl p-6">
                    <p className="text-white/80 text-sm font-medium mb-1">Patient Acquisition</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-display font-bold text-white"><AnimatedCounter value={500} suffix="K+" /></span>
                      <span className="text-white text-sm font-medium pb-1">patients reached</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Growth Process - Animated Infographic */}
      <section className="py-24 lg:py-32 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">The Transformation Journey</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">How We Build High-Growth Hospitals</h3>
            <p className="text-lg text-slate-600">From the initial audit to sustained revenue growth, here is the complete transformation path.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Animated Connecting SVG Path (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-8 right-8 h-[600px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600" fill="none">
                <path 
                  d="M 50,50 C 300,50 400,200 500,200 C 600,200 700,50 950,50 M 950,50 C 950,250 950,250 950,250 C 700,250 600,450 500,450 C 400,450 300,250 50,250 M 50,250 C 50,450 50,450 50,450 C 300,450 400,600 500,600 C 600,600 700,450 950,450" 
                  stroke="#E2E8F0" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <motion.path 
                  d="M 50,50 C 300,50 400,200 500,200 C 600,200 700,50 950,50 M 950,50 C 950,250 950,250 950,250 C 700,250 600,450 500,450 C 400,450 300,250 50,250 M 50,250 C 50,450 50,450 50,450 C 300,450 400,600 500,600 C 600,600 700,450 950,450" 
                  stroke="url(#gradient-path)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[
                { icon: Building2, title: 'Hospital Audit', desc: 'Identifying bottlenecks', color: 'bg-slate-100 text-slate-600' },
                { icon: Smartphone, title: 'Digital Transformation', desc: 'Implementing modern systems', color: 'bg-blue-100 text-blue-600' },
                { icon: Target, title: 'Operational Excellence', desc: 'Streamlining workflows', color: 'bg-indigo-100 text-indigo-600' },
                { icon: ShieldCheck, title: 'Better Patient Exp.', desc: 'Building trust & loyalty', color: 'bg-violet-100 text-violet-600' },
                { icon: Users, title: 'More OPD', desc: 'Increasing patient footfall', color: 'bg-fuchsia-100 text-fuchsia-600' },
                { icon: Stethoscope, title: 'Surgery Conversion', desc: 'Optimizing consultations', color: 'bg-pink-100 text-pink-600' },
                { icon: BarChart3, title: 'Revenue Growth', desc: 'Maximizing profitability', color: 'bg-emerald-100 text-emerald-600' },
                { icon: TrendingUp, title: 'Hospital Success', desc: 'Sustainable leadership', color: 'bg-primary-100 text-primary-600' },
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                  key={i} 
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={32} />
                    {/* Ping effect behind icon */}
                    <div className="absolute inset-0 rounded-2xl opacity-50 animate-ping" style={{ backgroundColor: 'currentColor' }} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
           
           {/* Floating Medical Icons */}
           <motion.div 
             animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/4 left-1/4 opacity-20"
           >
             <Stethoscope size={64} />
           </motion.div>
           <motion.div 
             animate={{ y: [20, -20, 20], x: [10, -10, 10], rotate: [0, -10, 10, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-1/4 right-1/4 opacity-20"
           >
             <Building2 size={80} />
           </motion.div>
           
           {/* Floating Dashboard Elements */}
           <motion.div 
              animate={{ y: [-15, 15, -15], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 right-1/4 w-48 h-32 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-4 hidden lg:block"
           >
              <div className="w-full h-2 bg-white/10 rounded-full mb-3" />
              <div className="flex gap-2 items-end h-16">
                 {[40, 70, 50, 90, 100].map((h, i) => (
                   <div key={i} className="flex-1 bg-emerald-500/30 rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
              </div>
           </motion.div>
           
           <motion.div 
              animate={{ y: [15, -15, 15], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/3 left-1/4 w-48 h-24 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-4 hidden lg:block flex flex-col justify-center gap-3"
           >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-500/30" />
                <div className="w-24 h-2 bg-white/20 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/30" />
                <div className="w-16 h-2 bg-white/20 rounded-full" />
              </div>
           </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight drop-shadow-lg"
          >
            Transform Your Hospital Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">High-Growth</span> Healthcare Organization
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Book a free growth audit today and discover how much revenue you're leaving on the table.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="inline-flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-full text-xl font-bold transition-all shadow-xl shadow-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/50 group border border-emerald-400/50">
              Schedule Free Consultation
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
