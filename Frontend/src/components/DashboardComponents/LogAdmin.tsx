// LogAdmin.tsx
interface LogProps {
  id: string;
  resourceName: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  reason: string | null;
  onDelete?: () => void;
}

function LogAdmin({
  id,
  resourceName,
  date,
  startTime,
  endTime,
  reason,
  onDelete,
}: LogProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_1.5fr_1.2fr_1fr_1fr_2fr_1.5fr] gap-4 items-center bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-700 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-white/20">
      {/* CUID */}
      <div className="text-gray-500 dark:text-gray-500 font-mono text-[10px]">
        ..{id.slice(-6)}
      </div>

      {/* Recurso */}
      <div className="font-bold truncate text-blue-600 dark:text-blue-300">{resourceName}</div>

      {/* Fecha */}
      <div className="truncate text-xs text-gray-500 dark:text-gray-400">
        {new Date(date).toLocaleDateString("es-MX")}
      </div>

      {/* Horarios */}
      <div className="text-center text-blue-600 dark:text-blue-300 font-semibold font-mono text-xs italic">
        {startTime}
      </div>
      <div className="text-center text-amber-600 dark:text-orange-300 font-semibold font-mono text-xs italic">
        {endTime}
      </div>

      {/* Razón */}
      <div className="text-gray-500 dark:text-gray-400 truncate text-xs italic">
        {reason || "Sin motivo"}
      </div>

      {/* Acciones */}
      <div className="flex justify-end items-center gap-2">
        <button className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/50 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase"
          onClick={onDelete}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default LogAdmin;