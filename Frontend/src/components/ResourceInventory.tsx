// ResourceInventory.tsx
import { useEffect, useState } from "react";
import ResourceAdminTB from "./DashboardComponents/ResourceAdminTB";

function ResourceInventory() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/resources")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error("Error cargando canchas:", err));
  }, []);

  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic">
        INVENTARIO DE CANCHAS
      </h1>
      <button className="bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg font-bold py-2 px-6 hover:bg-blue-400 transition-all uppercase text-sm">
        + Agregar Nueva Cancha
      </button>

      <div className="w-full flex flex-col bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 px-4 py-4 bg-zinc-800/50 border-b border-zinc-700 text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <div>ID</div>
          <div>Nombre</div>
          <div>Tipo</div>
          <div>Precio</div>
          <div className="text-center">Estado</div>
          <div className="text-right">Acciones</div>
        </div>
        <div className="p-4 max-h-125 overflow-y-auto flex flex-col gap-2">
          {resources.map((r: any) => (
            <ResourceAdminTB key={r.id} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourceInventory;
