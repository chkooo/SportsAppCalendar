import { useState } from "react";
import { supabase } from "../../lib/supabase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validación y limpieza
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName) {
      setError("El nombre es requerido.");
      setLoading(false);
      return;
    }

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

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
      options: {
        data: {
          name: cleanName,
        },
      },
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        setError("Este correo ya está registrado.");
      } else {
        setError("Error al registrar, intenta de nuevo.");
      }
      setLoading(false);
      return;
    }

    console.log("Registro exitoso:", data);
  };
  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center max-h-1/2 h-screen max-w-1/2 w-screen">
      <div className="mb-6 text-center">
        <h1 className="w-full text-center text-white">Register</h1>
        <p className="text-white">Please enter your details</p>
      </div>
      <form
        className="w-full flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-400 text-sm font-bold w-3/4 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-bold uppercase tracking-tight"
        >
          {loading ? "Cargando..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
