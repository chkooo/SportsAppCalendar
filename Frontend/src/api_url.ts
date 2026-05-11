const getHost = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("api_host");
    if (stored) return stored;
    return window.location.hostname;
  }
  return "localhost";
};

export const setApiHost = (host: string) => {
  localStorage.setItem("api_host", host);
  console.log(`API host set to: http://${host}:3000`);
  window.location.reload();
};

export const getApiHost = () => {
  const current = getHost();
  console.log(`Current API: http://${current}:3000`);
  return current;
};

export const clearApiHost = () => {
  localStorage.removeItem("api_host");
  window.location.reload();
};

export const API_BASE_URL = `http://${getHost()}:3000`;

export const apiFetch = (endpoint: string, options?: RequestInit) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};
