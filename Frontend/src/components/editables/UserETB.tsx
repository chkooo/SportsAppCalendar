import { useState } from "react";
import type { UserRole } from "../../types/user";

interface UserETBProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatarUrl?: string | null;
    role?: UserRole;
    active?: boolean;
  };
  onClose: () => void;
  onSave: (data: { name: string; phone: string; avatarUrl: string }) => Promise<void>;
  onDelete?: () => void;
}

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "ADMIN", label: "Administrador" },
  { value: "STAFF", label: "Staff" },
  { value: "CUSTOMER", label: "Cliente" },
];

export default function UserETB({ user, onClose, onSave, onDelete }: UserETBProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    avatarUrl: user.avatarUrl || "",
    role: user.role || "CUSTOMER" as UserRole,
  });
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="border-b border-zinc-700 px-6 py-4 flex justify-between items-start">
          <div>
            <h2 className="text-white text-xl font-semibold">Editar Usuario</h2>
            <p className="text-zinc-400 text-sm mt-1">Actualizar información del usuario</p>
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Eliminar usuario"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-zinc-400 text-sm">IMG</span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm text-zinc-300 mb-2">
                Avatar URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatarUrl}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Numero Telefonico
            </label>
            <input
              type="text"
              placeholder="+52 656 123 4567"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Rol</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Read only info */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
            <p className="text-zinc-400 text-xs">
              User ID: {user.id.slice(-8)}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Email: {user.email} (cannot be modified)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-700 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-50"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
