import { useEffect, useState } from "react";
import UserAdminTB from "./DashboardComponents/UserAdminTB";

function UserAdministrator() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic">
        GESTIÓN DE USUARIOS
      </h1>

      <button className="mt-3 bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg font-bold py-2 px-6 hover:bg-blue-400 transition-all tracking-tight uppercase text-sm">
        + Registrar Nuevo Usuario
      </button>

      <div className="w-full flex flex-col gap-0 bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-700">
        {/* HEADER DE LA TABLA */}
        <div className="w-full grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_2fr] gap-4 px-4 py-4 bg-zinc-800/50 border-b border-zinc-700">
          {[
            "ID",
            "Nombre",
            "Email",
            "Teléfono",
            "Rol",
            "Estado",
            "Acciones",
          ].map((head, i) => (
            <div
              key={head}
              className={`text-gray-500 font-black text-[10px] uppercase tracking-widest ${
                i === 5 ? "text-center" : i === 6 ? "text-right" : ""
              }`}
            >
              {head}
            </div>
          ))}
        </div>

        {/* CUERPO DE LA TABLA */}
        <div className="w-full max-h-125overflow-y-auto p-4 flex flex-col gap-2 custom-scrollbar">
          {loading ? (
            <div className="py-10 text-center text-zinc-500 animate-pulse font-bold">
              Cargando base de datos de Supabase...
            </div>
          ) : users.length > 0 ? (
            users.map((user: any) => (
              <UserAdminTB
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                role={user.role}
                status={user.status}
              />
            ))
          ) : (
            <div className="py-10 text-center text-zinc-500 italic">
              No hay usuarios registrados en el sistema.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAdministrator;
