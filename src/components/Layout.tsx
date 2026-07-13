import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Activity, MessageCircle, ChevronRight, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Results', path: '/results' },
  { name: 'Contact', path: '/contact' },
];

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Sticky Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="https://kgibprahnkpifyzjfzsf.supabase.co/storage/v1/object/public/img/Untitled_design__3_-removebg-preview.png" 
                alt="Acquire OPD" 
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-bold text-2xl text-primary-900 tracking-tight underline decoration-emerald-500 decoration-4 underline-offset-4">
                Acquire OPD
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm transition-colors hover:text-primary-700 ${
                    location.pathname === link.path ? 'text-primary-700 font-bold' : 'text-slate-600 font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary-900/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Growth Audit
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-600 hover:text-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-2xl font-display font-medium py-4 border-b border-slate-100 ${
                    location.pathname === link.path ? 'text-primary-600' : 'text-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-6 bg-primary-600 text-white text-center py-4 rounded-xl text-lg font-medium"
              >
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src="https://kgibprahnkpifyzjfzsf.supabase.co/storage/v1/object/public/img/Untitled_design__3_-removebg-preview.png" 
                  alt="Acquire OPD" 
                  className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
                  referrerPolicy="no-referrer"
                />
                <span className="font-display font-bold text-2xl text-white tracking-tight underline decoration-emerald-500 decoration-4 underline-offset-4">
                  Acquire OPD
                </span>
              </Link>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Transforming surgeon-owned hospitals into high-performing healthcare brands with measurable business results.
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: Facebook },
                  { name: 'Instagram', icon: Instagram },
                  { name: 'LinkedIn', icon: Linkedin },
                  { name: 'YouTube', icon: Youtube },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <div 
                      key={social.name} 
                      className="w-10 h-10 rounded-xl bg-slate-800/80 text-slate-400 flex items-center justify-center hover:scale-105 hover:bg-slate-800 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-slate-700/30 transition-all duration-300 cursor-default"
                      title={`${social.name} (Coming Soon)`}
                    >
                      <span className="sr-only">{social.name}</span>
                      <Icon size={18} className="opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-primary-400 flex items-center gap-2 transition-colors">
                      <ChevronRight size={16} className="text-primary-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-display font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-4">
                {['OPD Growth', 'Surgery Growth', 'Hospital Marketing', 'Digital Transformation', 'CRM Implementation', 'Business Consulting'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-primary-400 flex items-center gap-2 transition-colors">
                      <ChevronRight size={16} className="text-primary-500" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-display font-semibold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={20} className="text-primary-500 shrink-0 mt-1" />
                  <span className="text-slate-400 leading-relaxed">
                    Acquire OPD <br />
                    1704, 17th Cross Rd, <br />
                    Govindaraja Nagar Ward, <br />
                    MC Layout, <br />
                    Vijayanagar, <br />
                    Bengaluru, <br />
                    Karnataka 560040
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone size={20} className="text-primary-500 shrink-0" />
                  <span className="text-slate-400">+91 98449 55100</span>
                </li>
                <li className="flex gap-3">
                  <Mail size={20} className="text-primary-500 shrink-0" />
                  <span className="text-slate-400">acquireopd@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center md:text-left md:flex justify-between items-center">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Acquire OPD. All Rights Reserved.
            </p>
            <div className="mt-4 md:mt-0 flex justify-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919844955100"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-emerald-500/20 hover:bg-emerald-600 hover:scale-110 transition-all cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        {/* Simple tooltip */}
        <span className="absolute right-16 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
}
