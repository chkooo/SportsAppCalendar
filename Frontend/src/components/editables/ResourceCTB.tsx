import { useState } from "react";
import type { ResourceType, ResourceFormData } from "../../types/resource";

interface ResourceCTBProps {
  resourceTypes: ResourceType[];
  onClose: () => void;
  onSave: (data: ResourceFormData) => void;
}

export default function ResourceCTB({
  resourceTypes: types,
  onClose,
  onSave,
}: ResourceCTBProps) {
  const [formData, setFormData] = useState<ResourceFormData>({
    name: "",
    description: "",
    pricePerHour: 0,
    resourceTypeId: types[0]?.id || "",
  });

  const handleSave = () => {
    if (formData.name.trim() && formData.pricePerHour > 0 && formData.resourceTypeId) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Agregar Nueva Cancha
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Completa los datos del nuevo recurso
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Tipo de recurso
            </label>
            <select
              value={formData.resourceTypeId}
              onChange={(e) =>
                setFormData({ ...formData, resourceTypeId: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un tipo</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

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
            disabled={
              !formData.name.trim() ||
              formData.pricePerHour <= 0 ||
              !formData.resourceTypeId
            }
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Crear recurso
          </button>
        </div>
      </div>
    </div>
  );
}