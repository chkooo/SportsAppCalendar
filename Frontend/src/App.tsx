import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Main from "./IUs/Main";
import Menu from "./components/Menu";
import Pg from "./IUs/Pg";
import Admin from "./IUs/Admin";
import ResourceDetail from "./IUs/ResourceDetail";
import { ToastProvider } from "./components/ui";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="animate-fade-in-up">
      {children}
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Menu />
      <main className="pt-24 bg-zinc-100 dark:bg-zinc-900 min-h-screen transition-colors">
        <Routes>
          <Route path="/" element={<PageTransition><Main /></PageTransition>} />
          <Route path="/resource/:id" element={<PageTransition><ResourceDetail /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
          <Route path="/playground" element={<PageTransition><Pg /></PageTransition>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;