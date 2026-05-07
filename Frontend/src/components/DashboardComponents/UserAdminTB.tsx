import type { UserRole } from "../../types/user";

interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: "Activo" | "Inactivo";
  onToggle: (id: string, currentStatus: string) => void;
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}

const roleColors: Record<UserRole, string> = {
  SUPERADMIN: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/50",
  ADMIN: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/50",
  STAFF: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/50",
  CUSTOMER: "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/50",
};

const roleLabels: Record<UserRole, string> = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  CUSTOMER: "CLIENTE",
};

function UserAdminTB({
  id,
  name,
  email,
  phone,
  role,
  status,
  onToggle,
  onEdit,
  onDelete,
}: UserProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_2fr] gap-4 items-center bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-700 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-white/20">
      <div className="text-gray-500 dark:text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate text-gray-800 dark:text-white">{name}</div>
      <div className="truncate text-blue-600 dark:text-blue-300">{email}</div>
      <div className="font-mono text-xs text-gray-600 dark:text-gray-400">{phone || "N/A"}</div>
      <div className="text-center">
        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${roleColors[role] || roleColors.CUSTOMER}`}>
          {roleLabels[role] || role}
        </span>
      </div>
      <div
        className={`text-center font-bold ${status === "Activo" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
      >
        {status}
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={() =>
            onEdit({
              id,
              name,
              email,
              phone,
              role,
              status,
              active: status === "Activo",
            })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold"
        >
          Editar
        </button>
        <button
          onClick={() => onToggle(id, status)}
          className={`${
            status === "Activo"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold`}
        >
          {status === "Activo" ? "Desactivar" : "Activar"}
        </button>
        <button
          onClick={() =>
            onDelete({
              id,
              name,
              email,
              phone,
              role,
              status,
              active: status === "Activo",
            })
          }
          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold"
          title="Eliminar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserAdminTB;