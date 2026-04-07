import { supabase } from "../../lib/supabase";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validación y limpieza
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

    console.log("Login exitoso:", data);
  };

  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center max-h-1/2 h-screen max-w-1/2 w-screen">
      <div className="mb-6 text-center">
        <h1 className="w-full text-center text-white">Login</h1>
        <p className="text-white">Please enter your credentials</p>
      </div>
      <form
        className="w-full flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-3/4 p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-3/4 p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {error && (
          <p className="text-red-400 text-sm font-bold w-3/4 text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-3/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-bold uppercase tracking-tight disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
