import { useState } from "react";

interface UserETBProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  onClose: () => void;
  onSave: (data: { name: string; phone: string; avatarUrl: string }) => void;
}

export default function UserETB({ user, onClose, onSave }: UserETBProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    avatarUrl: user.avatarUrl || "",
  });
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-white text-xl font-semibold">Edit User</h2>
          <p className="text-zinc-400 text-sm mt-1">Update user information</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
              <span className="text-zinc-400 text-sm">IMG</span>
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
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
