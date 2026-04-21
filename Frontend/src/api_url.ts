const getHost = () => {
  if (typeof window !== "undefined") {
    return window.location.hostname; // Devuelve 'localhost' o '192.168.1.XX'
  }
  return "localhost";
};

export const API_BASE_URL = `http://${getHost()}:3000`;

export const apiFetch = (endpoint: string, options?: RequestInit) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};
