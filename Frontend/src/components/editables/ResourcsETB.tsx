import { useState } from "react";

interface ResourceETBProps {
  resource: {
    id: string;
    name: string;
    description?: string;
    pricePerHour: number;
    type: string;
  };
  onClose: () => void;
  onSave: (data: {
    name: string;
    description: string;
    pricePerHour: number;
  }) => void;
}

export default function ResourceETB({
  resource,
  onClose,
  onSave,
}: ResourceETBProps) {
  const [formData, setFormData] = useState({
    name: resource.name || "",
    description: resource.description || "",
    pricePerHour: resource.pricePerHour || 0,
  });

  const handleSave = () => {
    if (formData.name.trim() && formData.pricePerHour > 0) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Editar Recurso</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Actualiza la información del recurso seleccionado
          </p>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Nombre */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Nombre del recurso
            </label>
            <input
              type="text"
              placeholder="Ej. Cancha 1"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Descripción
            </label>
            <textarea
              rows={4}
              placeholder="Describe el recurso..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Precio por hora
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                $
              </span>
              <input
                type="number"
                placeholder="250.00"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerHour: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-8 pr-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-3">
            <p className="text-xs text-zinc-400">
              ID del recurso: {resource.id.slice(-8)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Tipo: {resource.type} (no editable)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-600 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={!formData.name.trim() || formData.pricePerHour <= 0}
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
