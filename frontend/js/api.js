const API_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
  } catch (err) {
    throw new Error("Network error or server unreachable");
  }

  // Handle auth errors globally
  if (response.status === 401 || response.status === 403) {
    alert("Access denied or session expired");
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  // 🔐 SAFE JSON CHECK (THIS FIXES YOUR ERROR)
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned an invalid response");
  }

  const data = await response.json();

  // Handle backend error messages
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
