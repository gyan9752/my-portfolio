import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Users,
  Mail,
  Calendar,
  Send,
  LogOut,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Lock,
  MessageSquare,
  Clock,
  Search,
  X,
  Database,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  getAdminToken,
  removeAdminToken,
  adminLogin,
  adminGetMe,
  adminGetStats,
  adminGetVisitors,
  adminGetMessages,
  adminGetBookings,
  adminSendReply,
} from '../../services/api';
import './AdminPortal.css';

export default function AdminPortal() {
  const [token, setToken] = useState(() => getAdminToken());
  const [adminUser, setAdminUser] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data state
  const [activeTab, setActiveTab] = useState('visitors'); // 'visitors' | 'messages' | 'bookings'
  const [stats, setStats] = useState({ totalVisitors: 0, totalMessages: 0, totalBookings: 0, pendingReplies: 0 });
  const [visitors, setVisitors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Reset page when tab, search, or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, pageSize]);

  // Reply Modal state
  const [replyModal, setReplyModal] = useState({
    open: false,
    message: null,
    subject: '',
    replyText: '',
    sending: false,
    error: '',
    success: '',
  });

  // Verify auth on mount if token exists
  useEffect(() => {
    if (token) {
      adminGetMe()
        .then((res) => setAdminUser(res.admin || { email: 'gyanvendram@gmail.com' }))
        .catch(() => {
          removeAdminToken();
          setToken(null);
        });
    }
  }, [token]);

  // Load Dashboard Data
  const loadData = useCallback(async () => {
    if (!token) return;
    setIsLoadingData(true);
    try {
      const [statsRes, visitorsRes, messagesRes, bookingsRes] = await Promise.all([
        adminGetStats().catch(() => ({ totalVisitors: 0, totalMessages: 0, totalBookings: 0, pendingReplies: 0 })),
        adminGetVisitors().catch(() => []),
        adminGetMessages().catch(() => []),
        adminGetBookings().catch(() => []),
      ]);
      setStats(statsRes);
      setVisitors(Array.isArray(visitorsRes) ? visitorsRes : []);
      setMessages(Array.isArray(messagesRes) ? messagesRes : []);
      setBookings(Array.isArray(bookingsRes) ? bookingsRes : []);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, loadData]);

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await adminLogin({ email: loginEmail, password: loginPassword });
      setToken(res.token);
      setAdminUser(res.admin);
    } catch (err) {
      setLoginError(err.message || 'Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    removeAdminToken();
    setToken(null);
    setAdminUser(null);
  };

  // Open Reply Modal
  const openReply = (msg) => {
    setReplyModal({
      open: true,
      message: msg,
      subject: `Regarding your inquiry to Gyanvendra Mishra`,
      replyText: `Hi ${msg.name || 'there'},\n\nThank you for reaching out! I reviewed your message:\n"${msg.message}"\n\n`,
      sending: false,
      error: '',
      success: '',
    });
  };

  // Submit Email Reply
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyModal.replyText.trim()) return;

    setReplyModal((prev) => ({ ...prev, sending: true, error: '', success: '' }));
    try {
      await adminSendReply({
        messageId: replyModal.message?.id || replyModal.message?._id,
        toEmail: replyModal.message.email,
        toName: replyModal.message.name,
        subject: replyModal.subject,
        replyMessage: replyModal.replyText,
      });

      setReplyModal((prev) => ({
        ...prev,
        sending: false,
        success: `Reply email successfully sent to ${replyModal.message.email}!`,
      }));

      // Refresh data to show updated message status
      loadData();

      setTimeout(() => {
        setReplyModal((prev) => ({ ...prev, open: false }));
      }, 1800);
    } catch (err) {
      setReplyModal((prev) => ({
        ...prev,
        sending: false,
        error: err.message || 'Failed to dispatch reply email',
      }));
    }
  };

  // Search Filtered Data
  const filteredVisitors = useMemo(() => {
    if (!searchQuery) return visitors;
    const q = searchQuery.toLowerCase();
    return visitors.filter((v) => (v.name && v.name.toLowerCase().includes(q)) || (v.email && v.email.toLowerCase().includes(q)));
  }, [visitors, searchQuery]);

  const filteredMessages = useMemo(() => {
    if (!searchQuery) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter(
      (m) =>
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))
    );
  }, [messages, searchQuery]);

  const filteredBookings = useMemo(() => {
    if (!searchQuery) return bookings;
    const q = searchQuery.toLowerCase();
    return bookings.filter(
      (b) =>
        (b.name && b.name.toLowerCase().includes(q)) ||
        (b.email && b.email.toLowerCase().includes(q)) ||
        (b.notes && b.notes.toLowerCase().includes(q))
    );
  }, [bookings, searchQuery]);

  // Active list based on selected tab
  const activeList = useMemo(() => {
    if (activeTab === 'visitors') return filteredVisitors;
    if (activeTab === 'messages') return filteredMessages;
    return filteredBookings;
  }, [activeTab, filteredVisitors, filteredMessages, filteredBookings]);

  const totalPages = Math.max(1, Math.ceil(activeList.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedList = useMemo(() => {
    return activeList.slice(startIndex, startIndex + pageSize);
  }, [activeList, startIndex, pageSize]);

  // Date formatter
  const formatDate = (isoStr) => {
    if (!isoStr) return '—';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  // Render Login View if not authenticated
  if (!token) {
    return (
      <div className="admin-viewport">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-brand-icon">
              <ShieldCheck size={32} />
            </div>
            <h2>Admin Control Portal</h2>
            <p className="admin-subtitle">Gyanvendra Mishra • Portfolio & Inquiry Management</p>

            <form onSubmit={handleLogin} className="admin-login-form" autoComplete="off">
              {loginError && (
                <div className="admin-error-box">
                  <AlertCircle size={18} />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="admin-form-group">
                <label>Email Address</label>
                <div className="admin-input-wrap">
                  <Mail size={18} />
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter admin email"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Password</label>
                <div className="admin-input-wrap">
                  <Lock size={18} />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              <button type="submit" disabled={loginLoading} className="admin-submit-btn">
                {loginLoading ? (
                  <>
                    <RefreshCw size={18} className="adm-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In to Dashboard</span>
                )}
              </button>
            </form>

            <a href="/" className="admin-back-link">
              <ArrowLeft size={16} />
              <span>Back to Public Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="admin-viewport">
      <div className="admin-container">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="admin-header-left">
            <div className="admin-brand-icon" style={{ width: 44, height: 44, margin: 0, borderRadius: 12 }}>
              <ShieldCheck size={24} />
            </div>
            <div className="admin-header-title">
              <h1>Admin Dashboard</h1>
              <span>Logged in as {adminUser?.email || 'gyanvendram@gmail.com'}</span>
            </div>
            <span className="admin-status-badge">
              <span className="admin-status-dot" />
              <span>Database Active</span>
            </span>
          </div>

          <div className="admin-header-actions">
            <button onClick={loadData} disabled={isLoadingData} className="admin-btn" title="Refresh Live Data">
              <RefreshCw size={16} className={isLoadingData ? 'adm-spin' : ''} />
              <span>Refresh</span>
            </button>
            <a href="/" className="admin-btn" title="Open Public Portfolio">
              <ExternalLink size={16} />
              <span>View Portfolio</span>
            </a>
            <button onClick={handleLogout} className="admin-btn danger" title="Sign out">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Metric Cards Row */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-info">
              <h3>Total Handshake Visitors</h3>
              <p className="stat-number">{stats.totalVisitors}</p>
            </div>
            <div className="admin-stat-icon blue">
              <Users size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-info">
              <h3>Contact Inquiries</h3>
              <p className="stat-number">{stats.totalMessages}</p>
            </div>
            <div className="admin-stat-icon purple">
              <Mail size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-info">
              <h3>1:1 Booked Calls</h3>
              <p className="stat-number">{stats.totalBookings}</p>
            </div>
            <div className="admin-stat-icon emerald">
              <Calendar size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-info">
              <h3>Pending Inquiries</h3>
              <p className="stat-number">{stats.pendingReplies}</p>
            </div>
            <div className="admin-stat-icon amber">
              <MessageSquare size={24} />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            onClick={() => { setActiveTab('visitors'); setSearchQuery(''); }}
            className={`admin-tab-btn ${activeTab === 'visitors' ? 'active' : ''}`}
          >
            <Users size={16} />
            <span>Visitors</span>
            <span className="admin-tab-count">{visitors.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('messages'); setSearchQuery(''); }}
            className={`admin-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          >
            <Mail size={16} />
            <span>Inquiries & Messages</span>
            <span className="admin-tab-count">{messages.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          >
            <Calendar size={16} />
            <span>1:1 Bookings</span>
            <span className="admin-tab-count">{bookings.length}</span>
          </button>
        </div>

        {/* Tab Content & Table Area */}
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>
                {activeTab === 'visitors' && 'Handshake Visitor Registry (Thank You Mail Sent)'}
                {activeTab === 'messages' && 'Contact Inquiries & Replies'}
                {activeTab === 'bookings' && 'Scheduled 1:1 Discovery Calls'}
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#64748b' }} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
          </div>

          {/* TAB 1: VISITORS */}
          {activeTab === 'visitors' && (
            <>
              {filteredVisitors.length === 0 ? (
                <div className="admin-empty">
                  <Users size={36} />
                  <p>No visitors recorded yet.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Visitor</th>
                      <th>Email Address</th>
                      <th>Welcome Email</th>
                      <th>Visited At</th>
                      <th>Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.map((v, i) => (
                      <tr key={v.id || v._id || i}>
                        <td>
                          <span className="admin-cell-main">{v.name || 'Anonymous'}</span>
                        </td>
                        <td>
                          <span style={{ color: '#93c5fd' }}>{v.email}</span>
                        </td>
                        <td>
                          <span className="admin-pill success">
                            <CheckCircle2 size={12} />
                            <span>Thank-You Sent</span>
                          </span>
                        </td>
                        <td>
                          <span className="admin-cell-sub">{formatDate(v.at || v.createdAt)}</span>
                        </td>
                        <td>
                          <span className="admin-cell-sub">{v.referrer || 'Direct / Organic'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* TAB 2: INQUIRIES & MESSAGES */}
          {activeTab === 'messages' && (
            <>
              {filteredMessages.length === 0 ? (
                <div className="admin-empty">
                  <Mail size={36} />
                  <p>No inquiries received yet.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.map((m, i) => (
                      <tr key={m.id || m._id || i}>
                        <td>
                          <span className="admin-cell-main">{m.name}</span>
                        </td>
                        <td>
                          <span style={{ color: '#93c5fd' }}>{m.email}</span>
                        </td>
                        <td style={{ maxWidth: 320 }}>
                          <span style={{ display: 'block', color: '#cbd5e1', lineHeight: 1.4 }}>
                            {m.message}
                          </span>
                          {m.replies && m.replies.length > 0 && (
                            <span style={{ display: 'block', marginTop: 4, fontSize: 11, color: '#34d399' }}>
                              ✓ Replied {m.replies.length} time(s)
                            </span>
                          )}
                        </td>
                        <td>
                          {m.replied ? (
                            <span className="admin-pill success">
                              <CheckCircle2 size={12} />
                              <span>Replied</span>
                            </span>
                          ) : (
                            <span className="admin-pill warning">
                              <Clock size={12} />
                              <span>Pending Reply</span>
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="admin-cell-sub">{formatDate(m.createdAt)}</span>
                        </td>
                        <td>
                          <button
                            onClick={() => openReply(m)}
                            className="admin-action-btn"
                            title="Send email reply directly to this sender"
                          >
                            <Send size={13} />
                            <span>Reply</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* TAB 3: BOOKED CALLS */}
          {activeTab === 'bookings' && (
            <>
              {filteredBookings.length === 0 ? (
                <div className="admin-empty">
                  <Calendar size={36} />
                  <p>No scheduled calls yet.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Date & Slot</th>
                      <th>Notes / Agenda</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.map((b, i) => (
                      <tr key={b.id || b._id || i}>
                        <td>
                          <span className="admin-cell-main">{b.name}</span>
                        </td>
                        <td>
                          <span style={{ color: '#93c5fd' }}>{b.email}</span>
                        </td>
                        <td>
                          <span className="admin-cell-main" style={{ color: '#60a5fa' }}>
                            {b.date} @ {b.time}
                          </span>
                          <span className="admin-cell-sub">30 Mins Discovery</span>
                        </td>
                        <td style={{ maxWidth: 280 }}>
                          <span style={{ color: '#cbd5e1' }}>{b.notes || '—'}</span>
                        </td>
                        <td>
                          <span className="admin-pill success">
                            <CheckCircle2 size={12} />
                            <span>Confirmed</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Pagination Controls */}
          {activeList.length > 0 && (
            <div className="admin-pagination">
              <div className="admin-pagination-info">
                <span>
                  Showing <strong>{startIndex + 1}</strong> to{' '}
                  <strong>{Math.min(startIndex + pageSize, activeList.length)}</strong> of{' '}
                  <strong>{activeList.length}</strong> {activeTab}
                </span>
              </div>

              <div className="admin-pagination-controls">
                <div className="admin-page-size-wrap">
                  <span>Rows:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="admin-page-size-select"
                  >
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="admin-page-btn"
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                  if (
                    totalPages > 7 &&
                    pg !== 1 &&
                    pg !== totalPages &&
                    Math.abs(pg - currentPage) > 1
                  ) {
                    if (pg === 2 || pg === totalPages - 1) {
                      return <span key={pg} style={{ padding: '0 4px', color: '#64748b' }}>...</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setCurrentPage(pg)}
                      className={`admin-page-btn ${currentPage === pg ? 'active' : ''}`}
                    >
                      {pg}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="admin-page-btn"
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* REPLY MODAL */}
      {replyModal.open && replyModal.message && (
        <div className="admin-modal-backdrop" onClick={() => !replyModal.sending && setReplyModal((p) => ({ ...p, open: false }))}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Reply to {replyModal.message.name}</h3>
              <button
                type="button"
                disabled={replyModal.sending}
                onClick={() => setReplyModal((p) => ({ ...p, open: false }))}
                className="admin-modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-msg-bubble">
              <strong>Inquiry received from {replyModal.message.name} ({replyModal.message.email}):</strong>
              <div>"{replyModal.message.message}"</div>
            </div>

            <form onSubmit={handleSendReply}>
              {replyModal.error && (
                <div className="admin-error-box" style={{ marginBottom: 14 }}>
                  <AlertCircle size={16} />
                  <span>{replyModal.error}</span>
                </div>
              )}

              {replyModal.success && (
                <div className="admin-error-box" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#34d399', marginBottom: 14 }}>
                  <Check size={16} />
                  <span>{replyModal.success}</span>
                </div>
              )}

              <div className="admin-form-group" style={{ marginBottom: 14 }}>
                <label>Email Subject</label>
                <input
                  type="text"
                  required
                  value={replyModal.subject}
                  onChange={(e) => setReplyModal({ ...replyModal, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 13,
                    boxBox: 'border-box',
                  }}
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 14 }}>
                <label>Your Reply (Dispatched via Nodemailer SMTP)</label>
                <textarea
                  rows="6"
                  required
                  value={replyModal.replyText}
                  onChange={(e) => setReplyModal({ ...replyModal, replyText: e.target.value })}
                  className="admin-textarea"
                  placeholder="Type your response to the client here..."
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  disabled={replyModal.sending}
                  onClick={() => setReplyModal((p) => ({ ...p, open: false }))}
                  className="admin-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyModal.sending}
                  className="admin-submit-btn"
                  style={{ marginTop: 0, padding: '9px 18px' }}
                >
                  {replyModal.sending ? (
                    <>
                      <RefreshCw size={16} className="adm-spin" />
                      <span>Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Direct Reply</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
