import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

(function() {
  const stored = localStorage.getItem('theme-preference');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = (stored === 'dark' || stored === 'light') ? stored : (prefersDark ? 'dark' : 'light');
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
})();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);