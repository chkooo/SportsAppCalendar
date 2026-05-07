// ResourceInventory.tsx
import { useEffect, useState } from "react";
import ResourceAdminTB from "./DashboardComponents/ResourceAdminTB";
import ResourceETB from "./editables/ResourcsETB";
import ResourceCTB from "./editables/ResourceCTB";
import { apiFetch } from "../api_url";
import type { Resource, ResourceType, ResourceFormData } from "../types/resource";

function ResourceInventory() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [creatingResource, setCreatingResource] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      apiFetch("/resources").then((res) => res.json()),
      apiFetch("/resource-types").then((res) => res.json()),
    ])
      .then(([resourcesData, typesData]) => {
        setResources(resourcesData);
        setResourceTypes(typesData);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
  };

  const handleClose = () => {
    setEditingResource(null);
  };

  const handleCreateClose = () => {
    setCreatingResource(false);
  };

  const handleSave = async (data: {
    name: string;
    description: string;
    pricePerHour: number;
  }) => {
    if (!editingResource) return;
    try {
      await apiFetch(`/resources/${editingResource.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setResources(
        resources.map((r) =>
          r.id === editingResource.id ? { ...r, ...data } : r,
        ),
      );
      setEditingResource(null);
    } catch (err) {
      console.error("Error actualizando recurso:", err);
    }
  };

  const handleCreate = async (data: ResourceFormData) => {
    try {
      const res = await apiFetch("/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newResource = await res.json();
      const type = resourceTypes.find((t) => t.id === data.resourceTypeId);
      setResources([
        ...resources,
        { ...newResource, resourceType: type },
      ]);
      setCreatingResource(false);
    } catch (err) {
      console.error("Error creando recurso:", err);
    }
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    const newActive = !currentActive;

    setResources(
      resources.map((r) =>
        r.id === id ? { ...r, active: newActive } : r,
      ),
    );

    try {
      await apiFetch(`/resources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newActive }),
      });
    } catch (err) {
      console.error("Error actualizando estado:", err);
      setResources(
        resources.map((r) =>
          r.id === id ? { ...r, active: currentActive } : r,
        ),
      );
    }
  };

  const filteredResources = resources.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic text-gray-800 dark:text-white">
        INVENTARIO DE CANCHAS
      </h1>

      <div className="flex w-full gap-4">
        <button
          onClick={() => setCreatingResource(true)}
          className="bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg font-bold py-2 px-6 hover:bg-blue-400 transition-all uppercase text-sm"
        >
          + Agregar Nueva Cancha
        </button>

        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full flex flex-col bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 px-4 py-4 bg-gray-100 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">
          <div>ID</div>
          <div>Nombre</div>
          <div>Tipo</div>
          <div>Precio</div>
          <div className="text-center">Estado</div>
          <div className="text-right">Acciones</div>
        </div>
        <div className="p-4 max-h-[500px] overflow-y-auto flex flex-col gap-2">
          {filteredResources.map((r) => (
            <ResourceAdminTB
              key={r.id}
              id={r.id}
              name={r.name}
              type={r.resourceType?.name || "Sin tipo"}
              price={parseFloat(String(r.pricePerHour)) || 0}
              active={r.active}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {editingResource && (
        <ResourceETB
          resource={editingResource}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}

      {creatingResource && resourceTypes.length > 0 && (
        <ResourceCTB
          resourceTypes={resourceTypes}
          onClose={handleCreateClose}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}

export default ResourceInventory;