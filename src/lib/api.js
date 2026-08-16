/**
 * API Client for LekeTheInfoGuy Backend
 * Handles all HTTP requests to the Go backend API.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Token Management ─────────────────────────────────────────────

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("infoguy_token");
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("infoguy_token", token);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("infoguy_token");
}

// ─── Base Fetch Wrapper ───────────────────────────────────────────

async function apiFetch(path, options = {}) {
  const token = getToken();

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

  // Parse response
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

// ─── Auth API ─────────────────────────────────────────────────────

export async function register(name, email, password) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (data.token) {
    setToken(data.token);
  }
  return data;
}

export async function login(email, password) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setToken(data.token);
  }
  return data;
}

export async function getMe() {
  return apiFetch("/api/auth/me");
}

export function logout() {
  removeToken();
}

// ─── Stories API ──────────────────────────────────────────────────

export async function getStories({ category, search, page, limit } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (search) params.set("search", search);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));

  const query = params.toString();
  return apiFetch(`/api/stories${query ? `?${query}` : ""}`);
}

export async function getStory(id) {
  return apiFetch(`/api/stories/${id}`);
}

export async function createStory({ title, content, category, mood, anonymous }) {
  return apiFetch("/api/stories", {
    method: "POST",
    body: JSON.stringify({ title, content, category, mood, anonymous }),
  });
}

export async function updateStory(id, data) {
  return apiFetch(`/api/stories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteStory(id) {
  return apiFetch(`/api/stories/${id}`, {
    method: "DELETE",
  });
}

// ─── Lessons API ──────────────────────────────────────────────────

export async function getLessons() {
  return apiFetch("/api/lessons");
}

export async function createLesson({ quote, context }) {
  return apiFetch("/api/lessons", {
    method: "POST",
    body: JSON.stringify({ quote, context }),
  });
}

// ─── Health Check ─────────────────────────────────────────────────

export async function healthCheck() {
  return apiFetch("/api/health");
}
