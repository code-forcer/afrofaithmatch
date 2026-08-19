/**
 * API Client for Afro Faith Match Backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Token Management ─────────────────────────────────────────────

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("afm_token");
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("afm_token", token);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("afm_token");
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("afm_admin_token");
}

export function setAdminToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("afm_admin_token", token);
}

export function removeAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("afm_admin_token");
}

// ─── Base Fetch Wrapper ───────────────────────────────────────────

async function apiFetch(path, options = {}, useAdminToken = false) {
  const token = useAdminToken ? getAdminToken() : getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const error = new Error(data?.error || data || "Something went wrong");
    error.status = res.status;
    throw error;
  }

  return data;
}

// FormData fetch (for file uploads)
async function apiFetchForm(path, formData, method = "POST") {
  const token = getToken() || getAdminToken();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data?.error || "Upload failed");
    error.status = res.status;
    throw error;
  }
  return data;
}

// ─── Auth API ─────────────────────────────────────────────────────

export async function register(name, email, password) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (data.token) setToken(data.token);
  return data;
}

export async function login(email, password) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token) setToken(data.token);
  return data;
}

export async function getMe() {
  return apiFetch("/api/auth/me");
}

export function logout() {
  removeToken();
}

export async function forgotPassword(email) {
  return apiFetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token, password) {
  return apiFetch(`/api/auth/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

// ─── Users / Profiles API ────────────────────────────────────────

export async function getProfiles(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
  const query = params.toString();
  return apiFetch(`/api/users/browse${query ? `?${query}` : ""}`);
}

export async function getUserProfile(id) {
  return apiFetch(`/api/users/${id}`);
}

export async function updateProfile(data) {
  return apiFetch("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function uploadProfilePhoto(file) {
  const formData = new FormData();
  formData.append("photo", file);
  return apiFetchForm("/api/users/profile/photos", formData);
}

export async function deleteProfilePhoto(photoId) {
  return apiFetch(`/api/users/profile/photos/${photoId}`, { method: "DELETE" });
}

export async function setMainPhoto(photoId) {
  return apiFetch(`/api/users/profile/photos/${photoId}/main`, { method: "PUT" });
}

// ─── Interests API ────────────────────────────────────────────────

export async function sendInterest(toUserId, message = "") {
  return apiFetch("/api/interests", {
    method: "POST",
    body: JSON.stringify({ toUserId, message }),
  });
}

export async function getReceivedInterests(status) {
  const query = status ? `?status=${status}` : "";
  return apiFetch(`/api/interests/received${query}`);
}

export async function getSentInterests() {
  return apiFetch("/api/interests/sent");
}

export async function acceptInterest(id) {
  return apiFetch(`/api/interests/${id}/accept`, { method: "PUT" });
}

export async function rejectInterest(id) {
  return apiFetch(`/api/interests/${id}/reject`, { method: "PUT" });
}

// ─── Conversations / Chat API ─────────────────────────────────────

export async function getConversations() {
  return apiFetch("/api/conversations");
}

export async function getMessages(conversationId, page = 1) {
  return apiFetch(`/api/conversations/${conversationId}/messages?page=${page}`);
}

export async function sendMessage(conversationId, text) {
  return apiFetch(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

// ─── Blog API ─────────────────────────────────────────────────────

export async function getBlogs({ category, search, page, limit } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  const query = params.toString();
  return apiFetch(`/api/blog${query ? `?${query}` : ""}`);
}

export async function getBlog(slug) {
  return apiFetch(`/api/blog/${slug}`);
}

// ─── Contact API ──────────────────────────────────────────────────

export async function submitContact(data) {
  return apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Newsletter API ───────────────────────────────────────────────

export async function subscribeNewsletter(email, name = "") {
  return apiFetch("/api/newsletter", {
    method: "POST",
    body: JSON.stringify({ email, name }),
  });
}

// ─── Admin API ────────────────────────────────────────────────────

export async function adminLogin(email, password) {
  const data = await apiFetch("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token) setAdminToken(data.token);
  return data;
}

export async function adminLogout() {
  removeAdminToken();
}

export async function getAdminDashboard() {
  return apiFetch("/api/admin/dashboard", {}, true);
}

export async function adminGetUsers({ search, page, banned } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page) params.set("page", String(page));
  if (banned !== undefined) params.set("banned", String(banned));
  const query = params.toString();
  return apiFetch(`/api/admin/users${query ? `?${query}` : ""}`, {}, true);
}

export async function adminToggleBanUser(id) {
  return apiFetch(`/api/admin/users/${id}/ban`, { method: "PUT" }, true);
}

export async function adminDeleteUser(id) {
  return apiFetch(`/api/admin/users/${id}`, { method: "DELETE" }, true);
}

export async function adminGetContacts({ read, page } = {}) {
  const params = new URLSearchParams();
  if (read !== undefined) params.set("read", String(read));
  if (page) params.set("page", String(page));
  const query = params.toString();
  return apiFetch(`/api/admin/contacts${query ? `?${query}` : ""}`, {}, true);
}

export async function adminMarkContactRead(id) {
  return apiFetch(`/api/admin/contacts/${id}/read`, { method: "PUT" }, true);
}

export async function adminGetSubscribers({ page } = {}) {
  const query = page ? `?page=${page}` : "";
  return apiFetch(`/api/admin/newsletter${query}`, {}, true);
}

export async function adminGetBlogPosts({ page } = {}) {
  const query = page ? `?page=${page}` : "";
  return apiFetch(`/api/admin/blog${query}`, {}, true);
}

export async function adminCreateBlogPost(formData) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/api/admin/blog`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to create post");
  return data;
}

export async function adminUpdateBlogPost(id, formData) {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/api/admin/blog/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to update post");
  return data;
}

export async function adminDeleteBlogPost(id) {
  return apiFetch(`/api/admin/blog/${id}`, { method: "DELETE" }, true);
}

// ─── Stories & Lessons API ──────────────────────────────────────

export async function getStories({ category, page, limit } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  const query = params.toString();
  return apiFetch(`/api/stories${query ? `?${query}` : ""}`);
}

export async function createStory(data) {
  return apiFetch("/api/stories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getLessons({ page, limit } = {}) {
  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  const query = params.toString();
  return apiFetch(`/api/lessons${query ? `?${query}` : ""}`);
}

// ─── Health Check ─────────────────────────────────────────────────
export async function healthCheck() {
  return apiFetch("/api/health");
}
