interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  onToggle: (id: string, currentStatus: string) => void; // 👈 nuevo prop
}

function UserAdminTB({
  id,
  name,
  email,
  phone,
  role,
  status,
  onToggle,
}: UserProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_2fr] gap-4 items-center bg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      <div className="text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate">{name}</div>
      <div className="truncate text-blue-300">{email}</div>
      <div className="font-mono text-xs">{phone || "N/A"}</div>
      <div className="text-center">
        <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-[10px] uppercase font-bold">
          {role}
        </span>
      </div>
      <div
        className={`text-center font-bold ${status === "Activo" ? "text-green-400" : "text-red-400"}`}
      >
        {status}
      </div>
      <div className="flex justify-end items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs font-bold">
          Editar
        </button>
        <button
          onClick={() => onToggle(id, status)} // 👈 conectado
          className={`${
            status === "Activo"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold`}
        >
          {status === "Activo" ? "Desactivar" : "Activar"}
        </button>
      </div>
    </div>
  );
}

export default UserAdminTB;
