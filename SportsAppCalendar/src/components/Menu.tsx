import { Link } from "react-router-dom";

function Menu() {
  const imgRoute = "/src/assets/logoSAC.svg";

  return (
    <div className="fixed top-0 left-0 w-full bg-zinc-100 border-b-2 border-gray-300 px-6 py-3 z-50 flex items-center justify-between font-sans shadow-sm">
      <div className="w-32 flex items-center">
        <img src={imgRoute} alt="Logo" className="h-16 w-auto object-contain" />
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-zinc-900 font-black text-2xl tracking-tighter uppercase">
          Sport-App
        </h1>
      </div>
      <div className="w-32 flex justify-end items-center gap-3">
        <div className="hidden md:block text-right">
          <p className="text-zinc-800 text-xs font-bold leading-none">
            Mi Cuenta
          </p>
          <p className="text-zinc-500 text-[10px]">Ver Perfil</p>
        </div>
        <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-zinc-800 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
          <Link to="/admin">
            <span className="text-white font-bold text-sm">U</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
