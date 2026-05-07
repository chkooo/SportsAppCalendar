import { useState } from "react";

interface BlockCTBProps {
  resources: { id: string; name: string }[];
  onClose: () => void;
  onSave: (data: {
    resourceId: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }) => void;
}

export default function BlockCTB({
  resources,
  onClose,
  onSave,
}: BlockCTBProps) {
  const [formData, setFormData] = useState({
    resourceId: resources[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "11:00",
    reason: "Mantenimiento general",
  });

  const handleSave = () => {
    if (formData.resourceId && formData.date && formData.startTime && formData.endTime) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Agregar Mantenimiento
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Programa un bloqueo de mantenimiento para una cancha
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Cancha
            </label>
            <select
              value={formData.resourceId}
              onChange={(e) =>
                setFormData({ ...formData, resourceId: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una cancha</option>
              {resources.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Hora de inicio
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Hora fin
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Motivo
            </label>
            <input
              type="text"
              placeholder="Ej. Mantenimiento general, Reparación..."
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
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
            disabled={
              !formData.resourceId ||
              !formData.date ||
              !formData.startTime ||
              !formData.endTime
            }
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Crear bloqueo
          </button>
        </div>
      </div>
    </div>
  );
}