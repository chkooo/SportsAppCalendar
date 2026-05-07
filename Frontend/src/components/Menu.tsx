import { useState, useEffect, type React } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import AuthContainer from "./AuthConteiner";
import { ThemeToggle } from "./ui/ThemeToggle";
import { apiFetch } from "../api_url";
import ProfileETB from "./editables/ProfileETB";

function Menu() {
  const imgRoute = "/src/assets/logoSAC.svg";
  const { session } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ id: string; name: string; email: string; phone?: string | null } | null>(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const userName = session?.user?.user_metadata?.name || "Usuario";
  const userInitial = session ? userName.charAt(0).toUpperCase() : "?";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPERADMIN";

  useEffect(() => {
    if (!session?.user?.id) {
      setUserRole(null);
      setUserData(null);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await apiFetch(`/users/${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          const role = data.memberships?.[0]?.role || data.role || null;
          setUserRole(role);
          setUserData({
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserData();
  }, [session?.user?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    setUserRole(null);
    setUserData(null);
  };

  const handleProfileClick = () => {
    if (session) {
      setShowProfileEdit(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    if (!session || !isAdmin) {
      e.preventDefault();
      if (!session) setShowAuth(true);
    }
  };

  const handleProfileSave = (data: { name: string; phone: string }) => {
    setShowProfileEdit(false);
    setUserData((prev) => prev ? { ...prev, ...data } : null);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img src={imgRoute} alt="Logo" className="h-10 sm:h-14 w-auto object-contain" />
          <div className="hidden sm:block">
            <h1 className="text-zinc-800 dark:text-zinc-300 font-black text-xl sm:text-2xl tracking-tighter uppercase">
              <span className="text-blue-500">Sport</span><span className="text-zinc-800 dark:text-zinc-300">App</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-500 text-[8px] -mt-1 uppercase tracking-[0.2em]">Calendar</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          
          <button
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                onClick={handleAdminClick}
                className="px-3 py-1.5 bg-zinc-800 dark:bg-zinc-700 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
              >
                Admin
              </Link>
            )}
            <div className="text-right">
              <p className="text-zinc-900 dark:text-zinc-500 text-xs font-bold leading-none">
                {session ? userName : "Mi Cuenta"}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 text-[10px]">
                {session ? session.user.email : "Inicia Sesión"}
              </p>
            </div>
            <Link
              to="#"
              onClick={(e) => { e.preventDefault(); handleProfileClick(); }}
              className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <span className="text-white font-bold">{userInitial}</span>
            </Link>
            {session && (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Salir
              </button>
            )}
          </div>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); handleProfileClick(); }}
            className="md:hidden w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold">{userInitial}</span>
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 z-40 animate-fade-in">
          <div className="p-4 space-y-3">
            <div className="text-right">
              <p className="text-zinc-900 dark:text-zinc-500 text-sm">{session ? userName : "MiCuenta"}</p>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                {session ? session.user.email : "Inicia Sesión"}
              </p>
            </div>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={handleAdminClick}
                className="block w-full text-left px-3 py-2 bg-zinc-800 dark:bg-zinc-700 text-white text-sm font-medium rounded-lg"
              >
                Panel de Admin
              </Link>
            )}
            {session && (
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}

      {showAuth && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuth(false)} />
          <div className="relative z-10 w-full flex justify-center max-w-md">
            <AuthContainer onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}

      {showProfileEdit && userData && (
        <ProfileETB
          user={userData}
          onClose={() => setShowProfileEdit(false)}
          onSave={handleProfileSave}
        />
      )}
    </>
  );
}

export default Menu;