function BookingAdminTB({
  id,
  user,
  resource,
  date,
  time,
  status,
}: {
  id: number;
  user: string;
  resource: string;
  date: string;
  time: string;
  status: string;
}) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 items-center bbg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      {/* ID */}
      <div>{id}</div>

      {/* Usuario */}
      <div className="font-bold truncate">{user}</div>

      {/* Recurso (Cancha) */}
      <div className="truncate">{resource}</div>

      {/* Fecha */}
      <div>{date}</div>

      {/* Hora */}
      <div className="text-center">{time}</div>

      {/* Estado */}
      <div className="text-center">{status}</div>

      {/* TUS BOTONES ORIGINALES */}
      <div className="flex justify-end items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors">
          Editar
        </button>
        <button
          className={`${
            status === "Activo" || status === "Completado"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-2 py-1 rounded-lg transition-colors`}
        >
          {status === "Activo" || status === "Completado"
            ? "Desactivar"
            : "Activar"}
        </button>
      </div>
    </div>
  );
}

export default BookingAdminTB;
