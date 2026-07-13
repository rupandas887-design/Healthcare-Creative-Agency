import { motion } from 'motion/react';
import { TrendingUp, Users, Activity, BarChart3, ArrowUpRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Results() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Measurable <span className="text-emerald-400">Growth.</span> Proven Results.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            We don't deal in vanity metrics. We deal in revenue, patient footfall, and surgery bookings.
          </motion.p>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Patients Reached', value: 500, suffix: 'K+', color: 'text-primary-600', bg: 'bg-primary-50' },
              { icon: Activity, label: 'Hospitals Consulted', value: 5, suffix: '', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: TrendingUp, label: 'Average OPD Growth', value: 200, suffix: '%', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: BarChart3, label: 'Surgery Growth', value: 150, suffix: '%', color: 'text-indigo-600', bg: 'bg-indigo-50' }
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                key={i} 
                className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-display font-bold text-slate-900 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Case Studies */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Case Studies</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Hospital Transformations</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Case 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Multispecialty Hospital</h4>
                  <p className="text-slate-500">Tier 2 City, 150 Beds</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <ArrowUpRight size={16} /> 315% ROI
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Before (OPD/Day)</p>
                  <p className="text-2xl font-bold text-slate-400">45</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-primary-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                  <p className="text-sm text-primary-600 font-medium mb-1">After (OPD/Day)</p>
                  <p className="text-3xl font-display font-bold text-slate-900">185</p>
                </div>
              </div>

              <div className="space-y-3 text-slate-600">
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span>Implemented full-funnel Meta Ads strategy for local radius.</span>
                </p>
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span>Integrated CRM to stop lead leakage at the reception desk.</span>
                </p>
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span>Optimized Google My Business for 'best hospital near me'.</span>
                </p>
              </div>
            </motion.div>

            {/* Case 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Orthopedic Center</h4>
                  <p className="text-slate-500">Metro City, 50 Beds</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <ArrowUpRight size={16} /> +120% Rev
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Before (Surgeries/Mo)</p>
                  <p className="text-2xl font-bold text-slate-400">12</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <p className="text-sm text-emerald-600 font-medium mb-1">After (Surgeries/Mo)</p>
                  <p className="text-3xl font-display font-bold text-slate-900">42</p>
                </div>
              </div>

              <div className="space-y-3 text-slate-600">
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span>Launched highly targeted Google Search Ads for joint replacements.</span>
                </p>
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span>Built a patient education funnel to increase consultation conversions.</span>
                </p>
                <p className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span>Trained front-desk staff on patient handling protocols.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview section */}
      <section className="py-20 lg:py-32 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">Data-Driven Hospital Management</h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            We implement custom dashboards to track your leads, conversions, and revenue in real-time. No more guessing.
          </p>

          <div className="relative max-w-5xl mx-auto">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-2xl shadow-slate-200/60"
            >
               {/* Illustrative Dashboard Header with real SaaS feel */}
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 mb-8 border-b border-slate-100">
                 <div className="text-left">
                   <div className="flex items-center gap-2 mb-1.5">
                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live Performance Engine</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900">Hospital Analytics Overview</h3>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 p-1.5 rounded-xl text-xs font-semibold text-slate-600 shadow-sm">
                   <span className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-slate-900">Real-time</span>
                   <span className="px-3 py-1.5">Last 30 days</span>
                 </div>
               </div>

               {/* Illustrative Dashboard UI */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 {[
                   { label: 'Total Revenue Generated', value: '₹4.2Cr', trend: '+15.2%', color: 'text-primary-600', bg: 'bg-primary-50/60' },
                   { label: 'Patient Footfall', value: '3,450', trend: '+22.4%', color: 'text-emerald-600', bg: 'bg-emerald-50/60' },
                   { label: 'Campaign ROI', value: '420%', trend: '+5.1%', color: 'text-indigo-600', bg: 'bg-indigo-50/60' },
                 ].map((stat, i) => (
                   <div 
                     key={i} 
                     className="bg-white rounded-2xl p-6 border border-slate-200/70 text-left transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 shadow-sm group cursor-default"
                   >
                     <p className="text-slate-500 text-xs sm:text-sm font-medium mb-3 uppercase tracking-wider">{stat.label}</p>
                     <div className="flex items-end justify-between">
                       <p className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">{stat.value}</p>
                       <span className={`text-emerald-700 text-xs font-extrabold flex items-center gap-0.5 px-2 py-1 rounded-lg border border-emerald-100 bg-emerald-50 shadow-sm`}>
                         <ArrowUpRight size={14} className="stroke-[3]" /> {stat.trend}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>

               {/* Chart Component with Crisp Elements */}
               <div className="bg-white rounded-2xl border border-slate-200/70 p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
                  <div className="flex justify-between items-center z-10">
                    <div className="text-left">
                      <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Performance Chart</div>
                      <div className="text-slate-900 font-display font-bold text-lg">Monthly Revenue Growth</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-primary-600"></span>
                        <span>OPD Revenue</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                        <span>Surgery Revenue</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Grid Lines behind the Chart */}
                  <div className="absolute inset-x-8 top-28 bottom-16 flex flex-col justify-between pointer-events-none opacity-40">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-full border-t border-dashed border-slate-200 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-slate-400 -mt-3 tracking-wider bg-white pr-2">
                          {n === 4 && '₹50L'}
                          {n === 3 && '₹35L'}
                          {n === 2 && '₹20L'}
                          {n === 1 && '₹5L'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end gap-2 sm:gap-3 w-full h-48 relative z-10 mt-6 px-4">
                    {[35, 50, 42, 65, 58, 80, 72, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                        <motion.div 
                          animate={{ height: [`${Math.max(15, h - 12)}%`, `${h}%`, `${Math.max(15, h - 12)}%`] }}
                          transition={{ duration: 4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          className={`w-full rounded-t-md transition-all duration-300 hover:brightness-105 cursor-pointer ${
                            i === 9 
                              ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                              : 'bg-gradient-to-t from-primary-600 to-primary-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                          }`}
                        />
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-3 tracking-tight">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
