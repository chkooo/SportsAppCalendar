import { useEffect, useState } from "react";
import LogAdmin from "./DashboardComponents/LogAdmin";

function MantenanceLog() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // IMPORTANTE: Asegúrate de crear este endpoint en tu backend (routes/resources.ts)
    // para que retorne los datos de la tabla ResourceBlock de Prisma.
    fetch("http://localhost:3000/blocks")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        // Validamos que la data sea un array para que .map no falle
        setBlocks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener bloques de mantenimiento:", err);
        setBlocks([]); // Evita que blocks sea null u objeto
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 ">
      <h1 className="text-4xl font-bold uppercase tracking-tighter italic">
        Mantenimiento
      </h1>

      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-800 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight transition-colors">
        + AGREGAR MANTENIMIENTO
      </button>

      <div className="w-full h-auto bg-zinc-800 flex items-center px-4 flex-col gap-1">
        {/* HEADER: Ajustado al grid de LogAdmin */}
        <div className="w-full grid grid-cols-[0.5fr_1.5fr_1.2fr_1fr_1fr_2fr_1.5fr] gap-4 px-4 py-3 bg-zinc-800 border-t-2 border-l-2 border-gray-600 rounded-t-lg shadow-lg">
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
            ID
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
            Cancha
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
            Fecha
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest text-center">
            Inicio
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest text-center">
            Fin
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
            Motivo
          </div>
          <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest text-right">
            Acciones
          </div>
        </div>

        {/* LISTA DE REGISTROS */}
        <div className="w-full">
          {loading ? (
            <div className="text-center py-10 text-zinc-500 animate-pulse font-black uppercase tracking-widest">
              Sincronizando ResourceBlocks...
            </div>
          ) : blocks.length > 0 ? (
            blocks.map((block: any) => (
              <LogAdmin
                key={block.id}
                id={block.id}
                // Usamos los nombres de props que espera tu componente LogAdmin
                resourceName={block.resource?.name || "Cancha"}
                date={new Date(block.date).toLocaleDateString("es-MX")}
                startTime={block.startTime} // String "HH:mm" de tu modelo
                endTime={block.endTime} // String "HH:mm" de tu modelo
                reason={block.reason || "Mantenimiento programado"}
              />
            ))
          ) : (
            <div className="text-center py-10 text-zinc-600 italic font-medium">
              No se encontraron registros de mantenimiento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MantenanceLog;
