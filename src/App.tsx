import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Results from './pages/Results';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Assessment from './pages/Assessment';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="results" element={<Results />} />
        <Route path="contact" element={<Contact />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsConditions />} />
      </Route>
      
      {/* Admin Portal Protected Area */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
      <Route path="admin/assessments" element={<AdminDashboard />} />
    </Routes>
  );
}
