import LogAdmin from "./DashboardComponents/LogAdmin";

function MantenanceLog() {
  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 ">
      <h1 className="text-4xl font-bold">Mantenimiento</h1>

      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-800 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight">
        +Agregar Mantenimiento
      </button>

      <div className="w-full h-auto bg-zinc-800 flex items-center px-4 flex-col gap-1">
        {/* HEADER: Ajustado exactamente igual que la fila */}
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

        {/* FILA (LogAdmin): Asegúrate que dentro de LogAdmin uses el mismo grid-cols */}
        <LogAdmin
          id={1}
          Resource="Cancha 1"
          Date="2024-05-20"
          TimeS="08:00"
          TimeE="12:00"
          Reason="Mantenimiento preventivo"
        />
      </div>
    </div>
  );
}

export default MantenanceLog;
