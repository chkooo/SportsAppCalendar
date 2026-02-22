function ResourceAdminTB({
  id,
  name,
  type,
  price,
  status,
}: {
  id: number;
  name: string;
  price: number;
  type: string;
  status: string;
}) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 items-center bg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      <div>{id}</div>
      <div className="font-bold truncate">{name}</div>
      <div className="truncate">{type}</div>
      <div>{price !== undefined ? `$${price.toFixed(2)}/Hora` : "N/A"}</div>
      <div className="text-center">{status}</div>

      <div className="flex justify-end items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors">
          Editar
        </button>
        <button
          className={`${status === "Disponible" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-2 py-1 rounded-lg transition-colors`}
        >
          {status === "Disponible" ? "Desactivar" : "Activar"}
        </button>
      </div>
    </div>
  );
}

export default ResourceAdminTB;
