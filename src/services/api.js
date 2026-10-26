// Thin client for the Express backend (../../backend).
// In dev, Vite proxies /api → http://localhost:5000. In production set VITE_API_URL.
const BASE = import.meta.env.VITE_API_URL || '';

export async function sendMessage(payload) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

// ---- Bookings -----------------------------------------------------------
export async function sendBooking(payload) {
  const res = await fetch(`${BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to submit booking');
  return data;
}

// ---- Visitor gate (Intro) ----------------------------------------------
// The visitor is saved locally first, so nothing is lost while the backend
// doesn't exist yet. Once POST /api/visitors is live, unsynced visitors are
// sent automatically on their next page load.
const VISITOR_KEY = 'gm_visitor';

export function getVisitor() {
  try {
    return JSON.parse(localStorage.getItem(VISITOR_KEY));
  } catch {
    return null;
  }
}

async function pushVisitor(visitor) {
  try {
    const res = await fetch(`${BASE}/api/visitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: visitor.name, email: visitor.email, referrer: document.referrer, at: visitor.at }),
    });
    if (res.ok) {
      localStorage.setItem(VISITOR_KEY, JSON.stringify({ ...visitor, synced: true }));
    }
  } catch {
    /* backend not reachable yet — stays unsynced and is retried later */
  }
}

export function saveVisitor({ name, email }) {
  const visitor = { name, email, at: new Date().toISOString(), synced: false };
  try {
    localStorage.setItem(VISITOR_KEY, JSON.stringify(visitor));
  } catch {
    /* storage blocked — still try the network */
  }
  pushVisitor(visitor);
}

export function syncPendingVisitor() {
  const v = getVisitor();
  if (v && !v.synced) pushVisitor(v);
}

// ---- Admin Portal Auth & Endpoints -------------------------------------
const ADMIN_TOKEN_KEY = 'gm_admin_token';

export function getAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function removeAdminToken() {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function authFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    removeAdminToken();
    throw new Error('Unauthorized or session expired');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function adminLogin({ email, password }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Login failed');
  if (data.token) {
    setAdminToken(data.token);
  }
  return data;
}

export async function adminGetMe() {
  return authFetch('/api/auth/me');
}

export async function adminGetStats() {
  return authFetch('/api/admin/stats');
}

export async function adminGetVisitors() {
  return authFetch('/api/admin/visitors');
}

export async function adminGetMessages() {
  return authFetch('/api/admin/messages');
}

export async function adminGetBookings() {
  return authFetch('/api/admin/bookings');
}

export async function adminSendReply({ messageId, toEmail, toName, subject, replyMessage }) {
  return authFetch('/api/admin/reply', {
    method: 'POST',
    body: JSON.stringify({ messageId, toEmail, toName, subject, replyMessage }),
  });
}
