// LogAdmin.tsx
interface LogProps {
  id: string; // cuid()
  resourceName: string; // block.resource.name
  date: string | Date; // DateTime
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  reason: string | null;
}

function LogAdmin({
  id,
  resourceName,
  date,
  startTime,
  endTime,
  reason,
}: LogProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_1.5fr_1.2fr_1fr_1fr_2fr_1.5fr] gap-4 items-center bg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      {/* CUID abreviado */}
      <div className="text-gray-500 font-mono text-[10px]">
        ..{id.slice(-6)}
      </div>

      {/* Recurso */}
      <div className="font-bold truncate text-blue-300">{resourceName}</div>

      {/* Fecha */}
      <div className="truncate text-xs">
        {new Date(date).toLocaleDateString("es-MX")}
      </div>

      {/* Horarios */}
      <div className="text-center text-blue-300 font-semibold font-mono text-xs italic">
        {startTime}
      </div>
      <div className="text-center text-orange-300 font-semibold font-mono text-xs italic">
        {endTime}
      </div>

      {/* Razón / Motivo */}
      <div className="text-gray-400 truncate text-xs italic">
        {reason || "Sin motivo"}
      </div>

      {/* Acciones */}
      <div className="flex justify-end items-center gap-2">
        <button className="bg-zinc-700 text-white px-2 py-1 rounded hover:bg-zinc-600 transition-colors text-[10px] font-bold uppercase">
          Ver
        </button>
        <button className="bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase">
          Borrar
        </button>
      </div>
    </div>
  );
}

export default LogAdmin;
