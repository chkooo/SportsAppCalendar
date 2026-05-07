import { useState } from "react";
import { apiFetch } from "../../api_url";

interface ProfileETBProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  };
  onClose: () => void;
  onSave: (data: { name: string; phone: string }) => void;
}

export default function ProfileETB({
  user,
  onClose,
  onSave,
}: ProfileETBProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setSaving(true);
    try {
      await apiFetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onSave(formData);
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Editar Perfil</h2>
          <p className="mt-1 text-sm text-zinc-400">Actualiza tu información personal</p>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-zinc-500 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-zinc-500">El email no se puede cambiar</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="55 1234 5678"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-600 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.name.trim() || saving}
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}