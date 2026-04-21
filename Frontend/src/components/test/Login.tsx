import { supabase } from "../../lib/supabase";
import { useState } from "react";

interface LoginProps {
  onSuccess?: () => void;
}

function Login({ onSuccess }: LoginProps) {
  // ✅ un solo ')' aquí
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setError("El correo es requerido.");
      setLoading(false);
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("El correo no es válido.");
      setLoading(false);
      return;
    }

    if (!cleanPassword) {
      setError("La contraseña es requerida.");
      setLoading(false);
      return;
    }

    if (cleanPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Correo o contraseña incorrectos.");
      } else if (error.message.includes("Email not confirmed")) {
        setError("Debes confirmar tu correo antes de iniciar sesión.");
      } else {
        setError("Error al iniciar sesión, intenta de nuevo.");
      }
      setLoading(false);
      return;
    }

    // ✅ sin duplicados, limpio
    console.log("Login exitoso:", data);
    onSuccess?.();
  };

  return (
    <div className="bg-zinc-800 flex flex-col md:flex-row items-center w-full h-fit overflow-hidden rounded-lg self-start">
      <div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex flex-col items-center justify-center bg-zinc-700/30 border-b md:border-b-0 md:border-r border-gray-700">
        <h2 className="text-white text-xl font-semibold text-center uppercase tracking-widest">
          Bienvenido
        </h2>
        <p className="text-gray-400 text-center mt-2 leading-relaxed">
          Please enter your credentials to access the platform.
        </p>
      </div>

      <div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg font-bold uppercase disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
