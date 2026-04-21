// BookingControl.tsx
import { useEffect, useState } from "react";
import BookingAdminTB from "./DashboardComponents/BookingAdminTB";
import { apiFetch } from "../api_url";

function BookingControl() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    apiFetch("/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error cargando reservas:", err));
  }, []);

  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic">
        RESERVACIONES ACTIVAS
      </h1>

      <div className="w-full flex flex-col bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 px-4 py-4 bg-zinc-800/50 border-b border-zinc-700 text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <div>ID</div>
          <div>Cliente</div>
          <div>Cancha</div>
          <div>Fecha</div>
          <div className="text-center">Hora</div>
          <div className="text-center">Estado</div>
          <div className="text-right">Acciones</div>
        </div>
        <div className="p-4 max-h-125 overflow-y-auto flex flex-col gap-2">
          {bookings.map((b: any) => (
            <BookingAdminTB
              key={b.id}
              id={b.id}
              user={b.user?.name || "Anónimo"} // Prisma relation
              resource={b.resource?.name || "N/A"} // Prisma relation
              date={b.date}
              time={b.time}
              status={b.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingControl;
