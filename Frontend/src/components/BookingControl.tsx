import BookingAdminTB from "./DashboardComponents/BookingAdminTB";
function BookingControl() {
  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 ">
      <h1 className="text-4xl font-bold">Reservaciones</h1>

      <div className="w-full h-auto bg-zinc-800 flex items-center px-4 flex-col gap-4">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 px-4 py-3 bg-zinc-800 border-t-2 border-l-2 border-gray-600 rounded-t-lg shadow-lg">
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            ID
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Usuario
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Canchas
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Fecha
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest text-center">
            Hora
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest text-center">
            Estado
          </div>
          <div className="text-gray-400 font-black text-xs uppercase tracking-widest text-right">
            Acciones
          </div>
        </div>
        <BookingAdminTB
          id={1}
          user="Juan Pérez"
          resource="Cancha 1"
          date="2024-05-20"
          time="18:00"
          status="Confirmado"
        />
      </div>
    </div>
  );
}

export default BookingControl;
