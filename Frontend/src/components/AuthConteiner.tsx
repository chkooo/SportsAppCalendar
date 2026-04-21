import { useState } from "react";
import Login from "./test/Login";
import Register from "./test/Register";

type AuthTab = "login" | "register";

interface AuthContainerProps {
  onClose?: () => void;
}

const AuthContainer = ({ onClose }: AuthContainerProps) => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      onClose?.();
    }, 2000);
  };

  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md p-6 border border-gray-600 rounded-xl shadow-2xl">
      {success ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="text-green-400 text-5xl">✓</div>
          <p className="text-white font-semibold text-lg">
            {activeTab === "login" ? "¡Sesión iniciada!" : "¡Cuenta creada!"}
          </p>
          <p className="text-gray-400 text-sm">Entrando...</p>
        </div>
      ) : (
        <>
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

          <div className="w-full animate-in fade-in duration-300">
            {activeTab === "login" ? (
              <Login onSuccess={handleSuccess} />
            ) : (
              <Register onSuccess={handleSuccess} />
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Volver atrás
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AuthContainer;
