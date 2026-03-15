import { useEffect } from "react";

export function TestConnection() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(
          "🚀 Intentando conectar con el API en http://localhost:3000/users...",
        );

        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();

        console.log("✅ ¡Conexión exitosa! Usuarios traídos de Supabase:");
        console.table(data); // .table lo hace ver súper pro en la consola
      } catch (error) {
        console.error(
          "❌ Error de conexión. Revisa si el backend está corriendo:",
          error,
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg">
      <p>Revisa la consola (F12) para ver los datos de los usuarios. ⚡</p>
    </div>
  );
}
