function LogAdmin({
  id,
  Resource,
  Date,
  TimeS,
  TimeE,
  Reason,
}: {
  id: number;
  Resource: string;
  Date: string;
  TimeS: string;
  TimeE: string;
  Reason: string;
}) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_1.5fr_1.2fr_1fr_1fr_2fr_1.5fr] gap-4 items-center bg-white border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      {/* ID */}
      <div className="text-gray-400 font-mono text-xs">{id}</div>

      {/* Recurso / Cancha */}
      <div className="font-bold truncate">{Resource}</div>

      {/* Fecha */}
      <div className="truncate">{Date}</div>

      {/* Hora Inicio - Separada */}
      <div className="text-center text-blue-300 font-semibold">{TimeS}</div>

      {/* Hora Fin - Separada */}
      <div className="text-center text-orange-300 font-semibold">{TimeE}</div>

      {/* Razón */}
      <div className="text-gray-300 truncate text-xs italic">{Reason}</div>

      {/* Acciones */}
      <div className="flex justify-end items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs">
          Editar
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default LogAdmin;
