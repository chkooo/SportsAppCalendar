import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface RegisterProps {
  onSuccess?: () => void;
}

function Register({ onSuccess }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    const cleanPhone = phone.trim();

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

    if (!cleanPhone) {
      setError("El teléfono es requerido.");
      setLoading(false);
      return;
    }

    if (!/^\d{7,15}$/.test(cleanPhone)) {
      setError(
        "El teléfono debe contener solo números y tener entre 7 y 15 dígitos.",
      );
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
          phone: cleanPhone,
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
    onSuccess?.();
  };
  return (
    <div className="bg-zinc-800 flex flex-col md:flex-row items-center w-full h-fit overflow-hidden rounded-lg self-start">
      {/* IZQUIERDA (desktop) / ARRIBA (mobile): Formulario */}
      <div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-6">Register</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            placeholder="Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white py-2 rounded-lg font-bold uppercase disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Registrar"}
          </button>
        </form>
      </div>

      {/* DERECHA (desktop) / ABAJO (mobile): Texto Informativo */}
      <div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex flex-col items-center justify-center bg-zinc-700/30 border-t md:border-t-0 md:border-l border-gray-700">
        <h2 className="text-white text-xl font-semibold text-center uppercase tracking-widest">
          Únete
        </h2>
        <p className="text-gray-400 text-center mt-2 leading-relaxed">
          Ingresa tus datos para registrarte y comenzar a jugar.
        </p>
      </div>
    </div>
  );
}

export default Register;
