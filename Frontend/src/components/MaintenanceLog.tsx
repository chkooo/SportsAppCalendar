import { useEffect, useState } from "react";
import LogAdmin from "./DashboardComponents/LogAdmin";
import BlockCTB from "./editables/BlockCTB";
import { ConfirmModal } from "./ui/Modal";
import { apiFetch } from "../api_url";

function MantenanceLog() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [resources, setResources] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBlock, setDeletingBlock] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    Promise.all([
      apiFetch("/blocks").then((res) => res.json()),
      apiFetch("/resources").then((res) => res.json()),
    ])
      .then(([blocksData, resourcesData]) => {
        setBlocks(Array.isArray(blocksData) ? blocksData : []);
        setResources(Array.isArray(resourcesData) ? resourcesData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setLoading(false);
      });
  }, []);

  const handleCreate = async (data: {
    resourceId: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }) => {
    try {
      const res = await apiFetch("/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear");
      
      const newBlock = await res.json();
      const resource = resources.find((r) => r.id === data.resourceId);
      setBlocks([{ ...newBlock, resource: { name: resource?.name || "Cancha" } }, ...blocks]);
      setShowCreateModal(false);
      showToast("Mantenimiento registrado", "success");
    } catch (err) {
      showToast("Error al crear bloqueo", "error");
    }
  };

  const handleDeleteClick = (block: any) => {
    setDeletingBlock(block);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deletingBlock) return;
    setDeleting(true);
    try {
      await apiFetch(`/blocks/${deletingBlock.id}`, { method: "DELETE" });
      setBlocks(blocks.filter((b) => b.id !== deletingBlock.id));
      showToast("Mantenimiento eliminado", "success");
    } catch (err) {
      showToast("Error al eliminar", "error");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeletingBlock(null);
    }
  };

  return (
    <div className="h-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-white flex items-center justify-start flex-col gap-6">
      <h1 className="text-4xl font-bold uppercase tracking-tighter italic text-gray-800 dark:text-white">
        Mantenimiento
      </h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="mt-3 bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg font-bold py-2 px-4 hover:bg-blue-400 transition-colors"
      >
        + AGREGAR MANTENIMIENTO
      </button>

      <div className="w-full h-auto bg-gray-50 dark:bg-zinc-800 flex items-center px-4 flex-col gap-1">
        <div className="w-full grid grid-cols-[0.5fr_1.5fr_1.2fr_1fr_1fr_2fr_1.5fr] gap-4 px-4 py-3 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-t-lg shadow-lg">
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">ID</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Cancha</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Fecha</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest text-center">Inicio</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest text-center">Fin</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Motivo</div>
          <div className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest text-right">Acciones</div>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="text-center py-10 text-gray-400 dark:text-zinc-500 animate-pulse font-black uppercase tracking-widest">
              Sincronizando...
            </div>
          ) : blocks.length > 0 ? (
            blocks.map((block: any) => (
              <LogAdmin
                key={block.id}
                id={block.id}
                resourceName={block.resource?.name || "Cancha"}
                date={block.date}
                startTime={block.startTime}
                endTime={block.endTime}
                reason={block.reason || "Mantenimiento programado"}
                onDelete={() => handleDeleteClick(block)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 dark:text-zinc-600 italic font-medium">
              No se encontraron registros de mantenimiento.
            </div>
          )}
        </div>
      </div>

      {showCreateModal && resources.length > 0 && (
        <BlockCTB
          resources={resources}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingBlock(null);
        }}
        onConfirm={handleDelete}
        title="Eliminar Mantenimiento"
        message={`¿Eliminar el bloqueo del ${deletingBlock ? new Date(deletingBlock.date).toLocaleDateString("es-MX") : ""}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        loading={deleting}
      />

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default MantenanceLog;