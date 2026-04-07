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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    //Debugging logs
    console.log("signInWithPassword error:", error);

    if (error) {
      setError("Credenciales incorrectas, intenta de nuevo.");
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
        <button
          type="submit"
          className="w-3/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-bold uppercase tracking-tight"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
