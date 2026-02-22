import ResourceAdminTB from "./DashboardComponents/ResourceAdminTB";

function ResourceInventory() {
  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 ">
      <h1 className="text-4xl font-bold">Gestión de Recursos</h1>
      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-800 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight">
        +Agregar Recurso
      </button>
      <div className="w-full h-48 bg-zinc-800 flex items-center px-4 flex-col gap-4">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 px-4 py-3 bg-zinc-800 border-t-2 border-l-2 border-gray-600 rounded-t-lg shadow-lg">
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            ID
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Nombre
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Tipo
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Precio/Hora
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest text-center">
            Estado
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest text-right">
            Acciones
          </div>
        </div>

        <ResourceAdminTB
          id={1}
          name="Cancha de Fútbol"
          price={200}
          type="Deporte"
          status="Disponible"
        />
      </div>
    </div>
  );
}

export default ResourceInventory;
