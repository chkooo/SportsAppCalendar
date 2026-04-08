import { useState } from "react";
import Login from "./test/Login";
import Register from "./test/Register";

// Definimos los tipos de pestañas permitidas
type AuthTab = "login" | "register";

interface AuthContainerProps {
  onClose?: () => void; // Prop opcional para cerrar el componente
}

const AuthContainer = ({ onClose }: AuthContainerProps) => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md p-6 border border-gray-600 rounded-xl shadow-2xl">
      {/* Selector de pestañas con lógica de estilos activa */}
      <div className="flex w-full mb-6 p-1 bg-zinc-900 rounded-lg gap-1">
        <button
          className={`flex-1 py-2 rounded-md transition-all font-medium ${
            activeTab === "login"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 rounded-md transition-all font-medium ${
            activeTab === "register"
              ? "bg-green-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {/* Renderizado condicional de formularios */}
      <div className="w-full animate-in fade-in duration-300">
        {activeTab === "login" ? <Login /> : <Register />}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Volver atrás
        </button>
      )}
    </div>
  );
};

export default AuthContainer;
