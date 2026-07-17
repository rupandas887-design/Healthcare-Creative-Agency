import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, Download, Trash2, Eye, Edit3, Calendar, ChevronDown, ChevronUp,
  CheckCircle2, Clock, TrendingUp, Activity, Building2, ShieldAlert, FileText,
  X, ChevronLeft, ChevronRight, Printer, RefreshCw, AlertTriangle, User, Mail,
  Phone, MapPin, Sparkles, Award, LogOut, ListFilter, CheckSquare, Layers, Settings,
  Save, AlertCircle, Copy, Check
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { sections, knockouts } from '../Assessment';

// Define the submission typescript type
interface Submission {
  id: number;
  created_at: string;
  name: string;
  hospital: string;
  mobile: string;
  email: string;
  city: string;
  message: string;
  total_score: number;
  score: number;
  answers: Record<string | number, number>;
  knockouts: Record<string, string>;
  status?: string;
  review_notes?: string;
  user_ip?: string;
  user_agent?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [scoreRange, setScoreRange] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'highest' | 'lowest'>('latest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Selected Submission for Details Drawer
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('Pending Review');
  const [updatedNotes, setUpdatedNotes] = useState('');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  
  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // SQL script copy helper
  const [copiedSql, setCopiedSql] = useState(false);

  // Verification of admin session
  useEffect(() => {
    const isAdmin = localStorage.getItem('opd_admin_authenticated') === 'true';
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    } else {
      fetchSubmissions();
    }
  }, [navigate]);

  // Fetch submissions from Supabase
  const fetchSubmissions = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error("Supabase client is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your env/settings.");
      }

      // Try main table 'assessment_submissions' first
      let { data, error } = await supabase
        .from('assessment_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      // Fallback to 'submissions' if first one fails/is missing
      if (error && (error.code === 'PGRST205' || error.code === '42P01' || error.message?.includes('cache') || error.message?.includes('not find'))) {
        console.warn("Table 'assessment_submissions' not found, falling back to 'submissions' table...");
        const fallback = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false });
        data = fallback.data;
        error = fallback.error;
      }

      if (error) {
        throw error;
      }

      // Map and normalise the submissions data
      const mapped: Submission[] = (data || []).map(item => ({
        ...item,
        // Fallbacks for scores
        score: item.score !== undefined ? item.score : (item.total_score || 0),
        total_score: item.total_score !== undefined ? item.total_score : (item.score || 0),
        status: item.status || 'Pending Review',
        review_notes: item.review_notes || '',
        answers: item.answers || {},
        knockouts: item.knockouts || {}
      }));

      setSubmissions(mapped);
    } catch (err: any) {
      console.error("Error fetching submissions:", err);
      setErrorMsg(err?.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('opd_admin_authenticated');
    localStorage.removeItem('opd_admin_email');
    localStorage.removeItem('opd_admin_session_time');
    navigate('/admin/login', { replace: true });
  };

  // Score to Readiness Level Mapping
  const getReadinessLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Excellent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Average':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed Review':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Contacted':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Pending Review':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Statistics calculation
  const totalCount = submissions.length;
  
  const todayCount = submissions.filter(s => {
    const today = new Date().toDateString();
    const subDate = new Date(s.created_at).toDateString();
    return today === subDate;
  }).length;

  const avgScore = totalCount > 0 
    ? Math.round(submissions.reduce((sum, s) => sum + (s.score || 0), 0) / totalCount) 
    : 0;

  const maxScore = totalCount > 0 
    ? Math.max(...submissions.map(s => s.score || 0)) 
    : 0;

  const minScore = totalCount > 0 
    ? Math.min(...submissions.map(s => s.score || 0)) 
    : 0;

  const pendingCount = submissions.filter(s => s.status === 'Pending Review' || !s.status).length;
  const completedCount = submissions.filter(s => s.status === 'Completed Review').length;

  // Filter & Sort Logic
  const filteredSubmissions = submissions.filter(s => {
    // 1. Search term (Name, Email, Mobile, Business Name/Hospital)
    const matchesSearch = 
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile?.includes(searchTerm) ||
      s.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city?.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Status Filter
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    // 3. Readiness Level Filter
    const level = getReadinessLevel(s.score || 0);
    const matchesLevel = levelFilter === 'All' || level === levelFilter;

    // 4. Score Range Filter
    let matchesScore = true;
    if (scoreRange === 'High') matchesScore = (s.score || 0) >= 80;
    else if (scoreRange === 'Medium') matchesScore = (s.score || 0) >= 50 && (s.score || 0) < 80;
    else if (scoreRange === 'Low') matchesScore = (s.score || 0) < 50;

    // 5. Date Filter
    let matchesDate = true;
    const subTime = new Date(s.created_at).getTime();
    const nowTime = Date.now();
    if (dateRange === 'Today') {
      matchesDate = new Date(s.created_at).toDateString() === new Date().toDateString();
    } else if (dateRange === '7Days') {
      matchesDate = (nowTime - subTime) <= 7 * 24 * 60 * 60 * 1000;
    } else if (dateRange === '30Days') {
      matchesDate = (nowTime - subTime) <= 30 * 24 * 60 * 60 * 1000;
    }

    return matchesSearch && matchesStatus && matchesLevel && matchesScore && matchesDate;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'highest') {
      return (b.score || 0) - (a.score || 0);
    } else if (sortBy === 'lowest') {
      return (a.score || 0) - (b.score || 0);
    }
    return 0;
  });

  // Pagination Logic
  const totalFiltered = filteredSubmissions.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSubmissions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(totalFiltered / rowsPerPage) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, levelFilter, scoreRange, dateRange, sortBy, rowsPerPage]);

  // Mass selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(currentRows.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete submission function
  const handleDeleteSubmission = async () => {
    if (deleteTarget === null) return;
    setIsDeleting(true);
    try {
      // Delete from both table schema options for certainty
      const { error: errorMain } = await supabase
        .from('assessment_submissions')
        .delete()
        .eq('id', deleteTarget);

      const { error: errorFallback } = await supabase
        .from('submissions')
        .delete()
        .eq('id', deleteTarget);

      // Successfully deleted locally
      setSubmissions(submissions.filter(s => s.id !== deleteTarget));
      setSelectedIds(selectedIds.filter(id => id !== deleteTarget));
      if (activeSubmission?.id === deleteTarget) {
        setIsDrawerOpen(false);
        setActiveSubmission(null);
      }
      setDeleteTarget(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(`Could not delete assessment: ${err?.message || String(err)}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Update Status & Notes in Supabase
  const handleSaveStatusUpdate = async () => {
    if (!activeSubmission) return;
    setIsSavingStatus(true);
    try {
      const updateData = {
        status: updatedStatus,
        review_notes: updatedNotes
      };

      // Update both tables to ensure synch regardless of table configuration
      await supabase
        .from('assessment_submissions')
        .update(updateData)
        .eq('id', activeSubmission.id);

      await supabase
        .from('submissions')
        .update(updateData)
        .eq('id', activeSubmission.id);

      // Update state locally
      const updatedSubmissions = submissions.map(s => {
        if (s.id === activeSubmission.id) {
          return { ...s, ...updateData };
        }
        return s;
      });
      
      setSubmissions(updatedSubmissions);
      setActiveSubmission({ ...activeSubmission, ...updateData });
      setIsEditingStatus(false);
    } catch (err: any) {
      console.error("Save update failed:", err);
      alert(`Could not update status: ${err?.message || String(err)}`);
    } finally {
      setIsSavingStatus(false);
    }
  };

  // CSV Export
  const handleExportCSV = (selectedOnly = false) => {
    const targets = selectedOnly 
      ? submissions.filter(s => selectedIds.includes(s.id))
      : filteredSubmissions;

    if (targets.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = ["Submission ID", "Timestamp", "Doctor Name", "Hospital/Facility Name", "Email", "Mobile", "City", "Total Score", "Readiness Level", "Status", "IP Address", "User Agent"];
    
    const csvRows = [
      headers.join(','),
      ...targets.map(t => [
        t.id,
        `"${new Date(t.created_at).toLocaleString()}"`,
        `"${t.name.replace(/"/g, '""')}"`,
        `"${t.hospital.replace(/"/g, '""')}"`,
        `"${t.email}"`,
        `"${t.mobile}"`,
        `"${t.city.replace(/"/g, '""')}"`,
        t.score,
        `"${getReadinessLevel(t.score)}"`,
        `"${t.status || 'Pending Review'}"`,
        `"${t.user_ip || 'Unknown'}"`,
        `"${(t.user_agent || 'Unknown').replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `acquire_opd_assessments_${selectedOnly ? 'selected' : 'all'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Excel Export (XLS compatible format)
  const handleExportExcel = (selectedOnly = false) => {
    const targets = selectedOnly 
      ? submissions.filter(s => selectedIds.includes(s.id))
      : filteredSubmissions;

    if (targets.length === 0) {
      alert("No records to export.");
      return;
    }

    let excelXML = `
      <xml version="1.0">
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
        <Worksheet ss:Name="Submissions">
          <Table>
            <Row>
              <Cell><Data ss:Type="String">Submission ID</Data></Cell>
              <Cell><Data ss:Type="String">Timestamp</Data></Cell>
              <Cell><Data ss:Type="String">Doctor Name</Data></Cell>
              <Cell><Data ss:Type="String">Hospital Name</Data></Cell>
              <Cell><Data ss:Type="String">Email</Data></Cell>
              <Cell><Data ss:Type="String">Mobile</Data></Cell>
              <Cell><Data ss:Type="String">City</Data></Cell>
              <Cell><Data ss:Type="String">Total Score</Data></Cell>
              <Cell><Data ss:Type="String">Readiness Level</Data></Cell>
              <Cell><Data ss:Type="String">Status</Data></Cell>
            </Row>
    `;

    targets.forEach(t => {
      excelXML += `
        <Row>
          <Cell><Data ss:Type="Number">${t.id}</Data></Cell>
          <Cell><Data ss:Type="String">${new Date(t.created_at).toLocaleString()}</Data></Cell>
          <Cell><Data ss:Type="String">${t.name}</Data></Cell>
          <Cell><Data ss:Type="String">${t.hospital}</Data></Cell>
          <Cell><Data ss:Type="String">${t.email}</Data></Cell>
          <Cell><Data ss:Type="String">${t.mobile}</Data></Cell>
          <Cell><Data ss:Type="String">${t.city}</Data></Cell>
          <Cell><Data ss:Type="Number">${t.score}</Data></Cell>
          <Cell><Data ss:Type="String">${getReadinessLevel(t.score)}</Data></Cell>
          <Cell><Data ss:Type="String">${t.status || 'Pending Review'}</Data></Cell>
        </Row>
      `;
    });

    excelXML += `
          </Table>
        </Worksheet>
      </Workbook>
    `;

    const blob = new Blob([excelXML], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `acquire_opd_assessments_${selectedOnly ? 'selected' : 'all'}_${Date.now()}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export of Submission details or whole Table
  const handleExportPDF = (singleSub?: Submission) => {
    // If printing single assessment
    if (singleSub) {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const score = singleSub.score || 0;
      const level = getReadinessLevel(score);

      let qsHTML = '';
      sections.forEach(sec => {
        qsHTML += `
          <div class="pdf-section">
            <h3 class="sec-title">${sec.title}</h3>
        `;
        sec.questions.forEach(q => {
          const selectedIdx = singleSub.answers[q.id];
          const option = q.options[selectedIdx];
          const optionText = option ? option.text : 'Unanswered / Dropped';
          const points = option ? option.score : 0;
          qsHTML += `
            <div class="question-row">
              <div class="q-text">Q: ${q.text}</div>
              <div class="ans-box">
                <span class="selected-text">Selected Answer: <strong>${optionText}</strong></span>
                <span class="badge font-mono">${points} Points</span>
              </div>
            </div>
          `;
        });
        qsHTML += `</div>`;
      });

      printWindow.document.write(`
        <html>
          <head>
            <title>Acquire OPD - Assessment Report #${singleSub.id}</title>
            <style>
              body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; padding: 40px; line-height: 1.5; }
              .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
              .title { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin: 0; color: #0f172a; }
              .subtitle { font-size: 14px; color: #64748b; margin-top: 4px; }
              .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
              .meta-card { background: #f8fafc; border: 1px solid #f1f5f9; padding: 18px; border-radius: 12px; }
              .meta-card h4 { margin: 0 0 10px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
              .meta-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
              .meta-row span { font-weight: 600; color: #334155; }
              .score-badge { display: inline-block; padding: 16px 24px; border-radius: 16px; font-weight: 800; text-align: center; }
              .score-value { font-size: 32px; color: #0f172a; display: block; margin-bottom: 4px; }
              .score-desc { font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
              .excellent { background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; }
              .good { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }
              .average { background: #fffbeb; border: 1px solid #fde68a; color: #b45309; }
              .needs-improvement { background: #fdf2f8; border: 1px solid #fbcfe8; color: #be185d; }
              .pdf-section { background: #ffffff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; margin-bottom: 25px; page-break-inside: avoid; }
              .sec-title { margin-top: 0; margin-bottom: 15px; font-size: 16px; font-weight: 800; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
              .question-row { padding: 12px 0; border-bottom: 1px solid #f8fafc; }
              .question-row:last-child { border-bottom: none; }
              .q-text { font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
              .ans-box { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; background: #f8fafc; padding: 8px 12px; border-radius: 8px; align-items: center; }
              .badge { padding: 3px 8px; font-size: 11px; font-weight: 700; background: #e2e8f0; color: #334155; border-radius: 6px; }
              .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h1 class="title">Partnership Readiness Report</h1>
                <div class="subtitle">Acquire OPD • Surgical Growth Assessment</div>
              </div>
              <div class="score-badge ${level.toLowerCase().replace(' ', '-')}">
                <span class="score-value">${score} / 100</span>
                <span class="score-desc">${level} Readiness</span>
              </div>
            </div>

            <div class="meta-grid">
              <div class="meta-card">
                <h4>User Details</h4>
                <div class="meta-row">Doctor Name: <span>${singleSub.name}</span></div>
                <div class="meta-row">Hospital/Clinic: <span>${singleSub.hospital}</span></div>
                <div class="meta-row">City: <span>${singleSub.city}</span></div>
                <div class="meta-row">Mobile: <span>${singleSub.mobile}</span></div>
                <div class="meta-row">Email: <span>${singleSub.email}</span></div>
              </div>
              <div class="meta-card">
                <h4>Submission Diagnostics</h4>
                <div class="meta-row">Submission ID: <span>#${singleSub.id}</span></div>
                <div class="meta-row">Date Submitted: <span>${new Date(singleSub.created_at).toLocaleString()}</span></div>
                <div class="meta-row">Status: <span>${singleSub.status || 'Pending Review'}</span></div>
                <div class="meta-row">IP Address: <span>${singleSub.user_ip || 'Unknown'}</span></div>
              </div>
            </div>

            ${qsHTML}

            ${singleSub.review_notes ? `
              <div class="pdf-section" style="page-break-inside: avoid;">
                <h3 class="sec-title">Clinical Review & Partnership Notes</h3>
                <p style="font-size: 13px; margin: 0; color: #334155; font-style: italic; white-space: pre-line;">${singleSub.review_notes}</p>
              </div>
            ` : ''}

            <div class="footer">
              This is a secure system-generated document. Confidentiality guaranteed. Acquire OPD © ${new Date().getFullYear()}
            </div>
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Export multiple rows to PDF
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const targets = selectedIds.length > 0 
        ? submissions.filter(s => selectedIds.includes(s.id))
        : filteredSubmissions;

      let tableRows = '';
      targets.forEach((t, i) => {
        tableRows += `
          <tr>
            <td>#${t.id}</td>
            <td>${new Date(t.created_at).toLocaleDateString()}</td>
            <td><strong>${t.name}</strong></td>
            <td>${t.hospital}</td>
            <td>${t.email}</td>
            <td>${t.mobile}</td>
            <td>${t.city}</td>
            <td><strong>${t.score}</strong></td>
            <td><span class="level-badge ${getReadinessLevel(t.score).toLowerCase().replace(' ', '-')}">${getReadinessLevel(t.score)}</span></td>
            <td>${t.status || 'Pending Review'}</td>
          </tr>
        `;
      });

      printWindow.document.write(`
        <html>
          <head>
            <title>Acquire OPD - Submissions Table PDF</title>
            <style>
              body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; padding: 30px; font-size: 12px; }
              .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; }
              h1 { font-size: 20px; font-weight: 850; margin: 0; color: #0f172a; }
              .date { color: #64748b; font-size: 11px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th { background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left; padding: 10px; font-weight: bold; color: #475569; }
              td { border-bottom: 1px solid #f1f5f9; padding: 10px; color: #334155; }
              .level-badge { padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 10px; }
              .excellent { background: #ecfdf5; color: #047857; }
              .good { background: #eff6ff; color: #1d4ed8; }
              .average { background: #fffbeb; color: #b45309; }
              .needs-improvement { background: #fdf2f8; color: #be185d; }
              .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #94a3b8; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h1>Partnership Readiness Assessments Overview</h1>
                <span class="date">Total Records: ${targets.length}</span>
              </div>
              <div class="date" style="text-align: right">
                Generated: ${new Date().toLocaleString()}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Hospital</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Score</th>
                  <th>Level</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
            <div class="footer">
              Acquire OPD © ${new Date().getFullYear()} • Secure Admin PDF Export
            </div>
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const copySqlToClipboard = () => {
    const sqlText = `CREATE TABLE IF NOT EXISTS public.assessment_submissions (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    hospital text NOT NULL,
    mobile text NOT NULL,
    email text NOT NULL,
    city text NOT NULL,
    message text,
    total_score integer DEFAULT 0,
    score integer DEFAULT 0,
    answers jsonb DEFAULT '{}'::jsonb,
    knockouts jsonb DEFAULT '{}'::jsonb,
    status text DEFAULT 'Pending Review',
    review_notes text,
    user_ip text,
    user_agent text
);

ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insertions" ON public.assessment_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.assessment_submissions
    FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON public.assessment_submissions
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON public.assessment_submissions
    FOR DELETE USING (true);`;
    
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col antialiased text-slate-800">
      
      {/* Top Professional Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-[50] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-xl border border-primary-100 text-primary-600">
            <Award size={22} className="stroke-[1.8]" />
          </div>
          <div>
            <h1 className="text-lg font-display font-black tracking-tight text-slate-900 leading-tight">
              Acquire OPD
            </h1>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Partnership Administration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex px-3 py-1 bg-slate-50 border border-slate-150 rounded-full text-xs font-bold text-slate-600 tracking-wide font-mono">
            {localStorage.getItem('opd_admin_email') || 'admin@gmail.com'}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100/80 text-rose-700 rounded-xl text-xs font-bold border border-rose-100/50 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* SQL Warning Panel (Only shown in dev or if database is empty/unconfigured) */}
        <div className="bg-white border border-indigo-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/[0.01] rounded-full blur-[40px] pointer-events-none" />
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center shrink-0 text-indigo-600">
              <Settings size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Supabase Database Setup Required?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">
                If submissions are not displaying, please make sure you have executed the schema SQL script in your Supabase SQL Editor. This script creates the <strong>assessment_submissions</strong> table and configures the necessary public write/read permissions.
              </p>
            </div>
          </div>
          <button
            onClick={copySqlToClipboard}
            className="w-full md:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-transparent transition-all shrink-0 cursor-pointer"
          >
            {copiedSql ? (
              <>
                <Check size={14} className="text-emerald-400" />
                Copied SQL Schema
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy SQL Setup Schema
              </>
            )}
          </button>
        </div>

        {/* Dashboard Cards Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {[
            { label: 'Total Submissions', value: isLoading ? '-' : totalCount, icon: Layers, color: 'text-blue-600 bg-blue-50 border-blue-100/50' },
            { label: 'New Today', value: isLoading ? '-' : todayCount, icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50' },
            { label: 'Avg Readiness', value: isLoading ? '-' : `${avgScore}%`, icon: Activity, color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50' },
            { label: 'Highest Score', value: isLoading ? '-' : `${maxScore}/100`, icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-100/50' },
            { label: 'Lowest Score', value: isLoading ? '-' : `${minScore}/100`, icon: ShieldAlert, color: 'text-rose-600 bg-rose-50 border-rose-100/50' },
            { label: 'Pending Reviews', value: isLoading ? '-' : pendingCount, icon: Clock, color: 'text-slate-600 bg-slate-100 border-slate-200/50' },
            { label: 'Completed', value: isLoading ? '-' : completedCount, icon: CheckCircle2, color: 'text-sky-600 bg-sky-50 border-sky-100/50' },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200/60 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${card.color}`}>
                  <card.icon size={13} className="stroke-[1.8]" />
                </div>
              </div>
              <div className="mt-2 text-lg sm:text-xl font-display font-black text-slate-900 leading-none">
                {card.value}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Filters and Submissions Table Section */}
        <section className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Filtering Header */}
          <div className="p-5 border-b border-slate-150 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Doctor Name, Hospital, Email, Phone, City..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={fetchSubmissions}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="Refresh data"
                >
                  <RefreshCw size={15} />
                </button>

                {/* Dropdown for Mass Exports */}
                <div className="relative group">
                  <button className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-transparent transition-colors cursor-pointer">
                    <Download size={14} />
                    Export Selected ({selectedIds.length})
                    <ChevronDown size={12} />
                  </button>
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 hidden group-hover:block hover:block z-30">
                    <button
                      onClick={() => handleExportCSV(true)}
                      disabled={selectedIds.length === 0}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-2"
                    >
                      Export to CSV
                    </button>
                    <button
                      onClick={() => handleExportExcel(true)}
                      disabled={selectedIds.length === 0}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-2"
                    >
                      Export to Excel
                    </button>
                    <button
                      onClick={() => handleExportPDF()}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      Export PDF
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <button className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer">
                    <Download size={14} />
                    Export All ({totalFiltered})
                    <ChevronDown size={12} />
                  </button>
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 hidden group-hover:block hover:block z-30">
                    <button
                      onClick={() => handleExportCSV(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      Export All to CSV
                    </button>
                    <button
                      onClick={() => handleExportExcel(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      Export All to Excel
                    </button>
                    <button
                      onClick={() => handleExportPDF()}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      Export Table PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {/* Status Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide uppercase pl-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Completed Review">Completed Review</option>
                </select>
              </div>

              {/* Readiness Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide uppercase pl-1">Readiness Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Levels</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>

              {/* Score Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide uppercase pl-1">Score Range</label>
                <select
                  value={scoreRange}
                  onChange={(e) => setScoreRange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Scores</option>
                  <option value="High">Excellent Score (80+)</option>
                  <option value="Medium">Moderate Score (50-79)</option>
                  <option value="Low">Low Score (&lt;50)</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide uppercase pl-1">Submission Date</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Time</option>
                  <option value="Today">Today Only</option>
                  <option value="7Days">Last 7 Days</option>
                  <option value="30Days">Last 30 Days</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide uppercase pl-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="latest">Latest First</option>
                  <option value="highest">Highest Score</option>
                  <option value="lowest">Lowest Score</option>
                </select>
              </div>
            </div>
          </div>

          {/* Database Errors */}
          {errorMsg && (
            <div className="m-5 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-medium flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Database Error Detected</p>
                <p className="mt-0.5 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto">
            {isLoading ? (
              // Loading Skeletons
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="flex gap-4 items-center animate-pulse">
                    <div className="w-5 h-5 bg-slate-100 rounded" />
                    <div className="h-6 bg-slate-100 rounded flex-1" />
                    <div className="h-6 bg-slate-100 rounded w-24" />
                    <div className="h-6 bg-slate-100 rounded w-32" />
                    <div className="h-6 bg-slate-100 rounded w-16" />
                  </div>
                ))}
              </div>
            ) : totalFiltered === 0 ? (
              // Empty State
              <div className="p-12 text-center">
                <Layers size={40} className="mx-auto text-slate-300 stroke-[1.2] mb-3" />
                <h4 className="font-bold text-slate-800 text-sm">No submissions found</h4>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                  Try clearing your search filters or make sure clinical assessments have been submitted on the front page.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop and Tablet Table View */}
                <table className="w-full text-left border-collapse min-w-[1000px] hidden md:table">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-150">
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === currentRows.length && currentRows.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500/20"
                        />
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-16">ID</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-36">Submitted At</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor Info</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Business / Hospital</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center w-20">Score</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center w-32">Readiness</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center w-36">Status</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentRows.map((row) => {
                      const score = row.score || 0;
                      const level = getReadinessLevel(score);
                      const isSelected = selectedIds.includes(row.id);
                      return (
                        <tr 
                          key={row.id}
                          className={`hover:bg-slate-50/40 transition-colors ${isSelected ? 'bg-primary-50/10' : ''}`}
                        >
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(row.id)}
                              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500/20"
                            />
                          </td>
                          <td className="p-4 font-mono text-xs font-bold text-slate-400">#{row.id}</td>
                          <td className="p-4 text-xs text-slate-500 font-medium">
                            {new Date(row.created_at).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm leading-tight">{row.name}</div>
                            <div className="text-slate-500 text-xs font-medium mt-0.5">{row.email}</div>
                            <div className="text-slate-400 text-[11px] font-medium font-mono mt-0.5">{row.mobile}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-800 text-xs leading-snug">{row.hospital}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-700 text-xs flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" />
                              {row.city}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="font-mono font-black text-sm text-slate-900 bg-slate-50 border border-slate-150 px-2 py-1 rounded-lg">
                              {score}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${getLevelColor(level)}`}>
                              {level}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(row.status || 'Pending Review')}`}>
                              {row.status || 'Pending Review'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setActiveSubmission(row);
                                  setUpdatedStatus(row.status || 'Pending Review');
                                  setUpdatedNotes(row.review_notes || '');
                                  setIsDrawerOpen(true);
                                }}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="View details"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => handleExportPDF(row)}
                                className="p-2 text-indigo-500 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                title="Export single PDF"
                              >
                                <Printer size={15} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(row.id)}
                                className="p-2 text-rose-500 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete record"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Mobile Responsive Card Layout (Instead of wide tables) */}
                <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                  {currentRows.map((row) => {
                    const score = row.score || 0;
                    const level = getReadinessLevel(score);
                    return (
                      <div 
                        key={row.id}
                        className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="font-mono text-xs font-black text-slate-400">ID #{row.id}</span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {new Date(row.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{row.name}</h4>
                          <p className="text-slate-500 text-xs mt-0.5">Facility: <strong className="text-slate-700">{row.hospital}</strong></p>
                          <p className="text-slate-500 text-xs mt-0.5">Area: <strong className="text-slate-700">{row.city}</strong></p>
                          <p className="text-slate-500 text-xs mt-0.5 font-mono">{row.email} • {row.mobile}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-mono font-black text-xs text-slate-900 bg-slate-50 border border-slate-150 px-2 py-1 rounded-lg">
                            Score: {score}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getLevelColor(level)}`}>
                            {level}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(row.status || 'Pending Review')}`}>
                            {row.status || 'Pending Review'}
                          </span>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setActiveSubmission(row);
                              setUpdatedStatus(row.status || 'Pending Review');
                              setUpdatedNotes(row.review_notes || '');
                              setIsDrawerOpen(true);
                            }}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye size={13} />
                            View Detail
                          </button>
                          <button
                            onClick={() => handleExportPDF(row)}
                            className="px-3 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Printer size={13} />
                            Print
                          </button>
                          <button
                            onClick={() => setDeleteTarget(row.id)}
                            className="px-3 py-2 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer animate-none"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Table Footer with Pagination */}
          {!isLoading && totalFiltered > 0 && (
            <div className="p-4 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Show</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700"
                >
                  <option value={10}>10 Rows</option>
                  <option value={25}>25 Rows</option>
                  <option value={50}>50 Rows</option>
                  <option value={100}>100 Rows</option>
                </select>
                <span>of {totalFiltered} entries</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pg = idx + 1;
                  // Only display surrounding pages on lots of pages
                  if (totalPages > 5 && Math.abs(currentPage - pg) > 1 && pg !== 1 && pg !== totalPages) {
                    if (pg === 2 || pg === totalPages - 1) {
                      return <span key={pg} className="px-1 text-slate-400">...</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentPage === pg
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      } cursor-pointer`}
                    >
                      {pg}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </section>
      </main>

      {/* View Details Side Drawer - Premium Panel Overlay */}
      <AnimatePresence>
        {isDrawerOpen && activeSubmission && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsDrawerOpen(false);
                setIsEditingStatus(false);
              }}
              className="fixed inset-0 bg-slate-900 z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl z-[110] flex flex-col h-full border-l border-slate-150"
            >
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-150 bg-slate-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 rounded-lg border border-slate-200 text-slate-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Assessment Submission #{activeSubmission.id}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      Submitted {new Date(activeSubmission.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportPDF(activeSubmission)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                    title="Export PDF Report"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setIsEditingStatus(false);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Score & Level Display Banner */}
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Overall Readiness score</span>
                    <div className="flex items-baseline gap-1 justify-center sm:justify-start">
                      <span className="text-4xl font-display font-black text-slate-900 leading-none">
                        {activeSubmission.score || 0}
                      </span>
                      <span className="text-slate-400 text-sm font-semibold">/100</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Readiness Level</span>
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${getLevelColor(getReadinessLevel(activeSubmission.score || 0))}`}>
                      {getReadinessLevel(activeSubmission.score || 0)}
                    </span>
                  </div>
                </div>

                {/* Status and Notes Review Block */}
                <div className="border border-slate-200/80 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Administrative Status Review</h4>
                    {!isEditingStatus && (
                      <button
                        onClick={() => setIsEditingStatus(true)}
                        className="text-xs font-bold text-primary-600 hover:text-primary-500 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 size={12} />
                        Update Status
                      </button>
                    )}
                  </div>

                  {isEditingStatus ? (
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Pending Review', 'Contacted', 'Completed Review'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setUpdatedStatus(st)}
                            className={`px-3 py-2 border rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                              updatedStatus === st
                                ? 'bg-primary-50 border-primary-300 text-primary-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Internal Notes & Clinical Comments</label>
                        <textarea
                          rows={3}
                          value={updatedNotes}
                          onChange={(e) => setUpdatedNotes(e.target.value)}
                          placeholder="Write review remarks, contact log or custom follow-up points here..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-slate-800"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingStatus(false);
                            setUpdatedStatus(activeSubmission.status || 'Pending Review');
                            setUpdatedNotes(activeSubmission.review_notes || '');
                          }}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveStatusUpdate}
                          disabled={isSavingStatus}
                          className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-300 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {isSavingStatus ? (
                            <>
                              <Clock size={12} className="animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save size={12} />
                              Save Update
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Status:</span>
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(activeSubmission.status || 'Pending Review')}`}>
                          {activeSubmission.status || 'Pending Review'}
                        </span>
                      </div>
                      
                      <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-150">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Administrative notes</span>
                        {activeSubmission.review_notes ? (
                          <p className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                            {activeSubmission.review_notes}
                          </p>
                        ) : (
                          <p className="text-xs text-slate-400 font-medium italic">
                            No reviews logs available. Click 'Update Status' to log calls or write custom follow-up details.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Doctor Demographics */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider pl-1">Doctor & Business Profile</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <User size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">Full Name</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{activeSubmission.name}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <Building2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">Company / Business / Hospital</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{activeSubmission.hospital}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <Mail size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">Email Address</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{activeSubmission.email}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <Phone size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">Contact Number</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block font-mono">{activeSubmission.mobile}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">City / Area</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{activeSubmission.city}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-start gap-2.5">
                      <Activity size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none block">Metadata (IP / Agent)</span>
                        <span className="text-[10px] font-semibold text-slate-500 mt-1 block truncate max-w-xs" title={activeSubmission.user_agent}>
                          IP: {activeSubmission.user_ip || 'Unknown'} <br/> {activeSubmission.user_agent || ''}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Score Recommendation details */}
                <div className="border border-slate-200/80 rounded-3xl p-5 space-y-4 bg-primary-50/5 border-primary-100/50">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Strategic Recommendations</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                        ● Practice Strengths
                      </span>
                      <ul className="text-xs text-slate-600 font-medium pl-3 list-disc space-y-1">
                        {activeSubmission.score >= 60 ? (
                          <>
                            <li>Proven volume and clinical expertise</li>
                            <li>Willingness to establish structured operations</li>
                            <li>Commitment to long-term digital growth</li>
                          </>
                        ) : (
                          <>
                            <li>Good clinical fundamentals</li>
                            <li>Willingness to review operational protocols</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1">
                        ● Improvement Areas
                      </span>
                      <ul className="text-xs text-slate-600 font-medium pl-3 list-disc space-y-1">
                        {activeSubmission.score < 80 ? (
                          <>
                            <li>OPD to surgical conversion optimization</li>
                            <li>Front office standardization required</li>
                            <li>Digital patient acquisition channels can be added</li>
                          </>
                        ) : (
                          <>
                            <li>Maintaining growth scaling and brand dominant status</li>
                            <li>Fine-tuning patient retention metrics</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detailed Questions and Answers Section */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider pl-1">Detailed Question Breakdown</h4>
                  
                  {/* Knockouts status inside details */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide pl-1">Screening Knockouts</div>
                    {knockouts.map((ko) => {
                      const userAns = activeSubmission.knockouts?.[ko.id];
                      const isPassed = userAns === 'Yes';
                      return (
                        <div key={ko.id} className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col gap-1.5">
                          <p className="text-xs font-bold text-slate-800 leading-normal">{ko.text}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-medium">Answer: <strong className="text-slate-800">{userAns || 'Not Answered'}</strong></span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${isPassed ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-150'}`}>
                              {isPassed ? 'Passed' : 'Knocked Out / Failed'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Core Questions */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide pl-1">Survey Score Mapping</div>
                    {sections.map((sec) => (
                      <div key={sec.id} className="space-y-2">
                        <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider pl-1 mt-3 flex items-center gap-1">
                          <Layers size={11} />
                          {sec.title}
                        </div>
                        
                        {sec.questions.map((q) => {
                          const selectedIdx = activeSubmission.answers?.[q.id];
                          const selectedOption = q.options[selectedIdx];
                          const selectedText = selectedOption ? selectedOption.text : 'No selection recorded';
                          const points = selectedOption ? selectedOption.score : 0;
                          
                          return (
                            <div key={q.id} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-2">
                              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                                {q.text}
                              </p>
                              
                              <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs">
                                <div className="text-slate-600 font-medium leading-snug">
                                  Choice: <strong className="text-slate-800">{selectedText}</strong>
                                </div>
                                <span className="shrink-0 font-mono font-bold text-[10px] text-slate-500 bg-white border border-slate-200/60 px-1.5 py-0.5 rounded">
                                  {points} pts
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-slate-150 bg-slate-50/50 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(activeSubmission.id)}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete Submission
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsEditingStatus(false);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Close Panel
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal Popup */}
      <AnimatePresence>
        {deleteTarget !== null && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="fixed inset-0 bg-slate-900 z-[150]"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl border border-slate-150 z-[160] space-y-4"
            >
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 mx-auto">
                <AlertTriangle size={24} />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Delete Assessment?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to delete this assessment? This operation is permanent and cannot be undone.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubmission}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-rose-600 text-white rounded-2xl text-xs font-bold hover:bg-rose-500 disabled:bg-slate-300 transition-colors cursor-pointer"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
