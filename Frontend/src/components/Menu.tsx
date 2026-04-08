import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import AuthContainer from "./AuthConteiner"; // Ajusta la ruta según tu carpeta

function Menu() {
  const imgRoute = "/src/assets/logoSAC.svg";
  const { session } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar el popup de login
  const [showAuth, setShowAuth] = useState(false);

  const userName = session?.user?.user_metadata?.name || "Usuario";
  const userInitial = session ? userName.charAt(0).toUpperCase() : "?";

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault(); // Evita que el Link actúe
      setShowAuth(true); // Abre el popup
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-zinc-800 border-b-2 border-zinc-950 px-4 sm:px-6 py-2 sm:py-3 z-50 flex items-center justify-between font-sans shadow-sm">
        <div className="w-24 sm:w-32 flex items-center">
          <img
            src={imgRoute}
            alt="Logo"
            className="h-12 sm:h-16 w-auto object-contain"
          />
          <h1 className="text-zinc-300 font-black text-xl sm:text-2xl tracking-tighter uppercase">
            Sport-App
          </h1>
        </div>

        <div className="flex-1 text-center hidden sm:block">Links</div>

        <div className="w-auto flex justify-end items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-zinc-500 text-xs font-bold leading-none">
              {session ? userName : "Mi Cuenta"}
            </p>
            <p className="text-zinc-300 text-[10px]">
              {session ? session.user.email : "Inicia Sesión"}
            </p>
          </div>

          {/* Círculo de Inicial / Botón de Acceso */}
          <Link
            to={session ? "/admin" : "#"}
            onClick={handleProfileClick}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full border-2 border-zinc-800 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <span className="text-white font-bold text-sm">{userInitial}</span>
          </Link>

          {session && (
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-tight"
            >
              Salir
            </button>
          )}
        </div>
      </div>

      {/* Popup del AuthContainer */}
      {showAuth && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAuth(false)}
          />
          <div className="relative z-10 w-full flex justify-center">
            <AuthContainer onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
