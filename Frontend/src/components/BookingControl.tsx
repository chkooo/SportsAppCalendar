// BookingControl.tsx
import { useEffect, useState } from "react";
import BookingAdminTB from "./DashboardComponents/BookingAdminTB";
import { apiFetch } from "../api_url";
import { Booking, BookingStatus } from "../types/booking";

function BookingControl() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);

      const query = params.toString();
      const res = await apiFetch(`/bookings${query ? `?${query}` : ""}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error cargando reservas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFilterChange = () => {
    fetchBookings();
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm("¿Estás seguro de cancelar esta reserva?")) return;

    try {
      const res = await apiFetch(`/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (res.ok) {
        fetchBookings();
      } else {
        const data = await res.json();
        alert(data.error || "Error al cancelar");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="h-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic text-gray-800 dark:text-white">
        RESERVACIONES ACTIVAS
      </h1>

      <div className="w-full flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Estado
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            onBlur={handleFilterChange}
            className="px-3 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm"
          >
            <option value="">Todos</option>
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="CANCELLED">Cancelado</option>
            <option value="COMPLETED">Completado</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Desde
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            onBlur={handleFilterChange}
            className="px-3 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            onBlur={handleFilterChange}
            className="px-3 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm"
          />
        </div>

        <button
          onClick={() => {
            setStatusFilter("");
            setFromDate("");
            setToDate("");
            fetchBookings();
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-zinc-600"
        >
          Limpiar
        </button>
      </div>

      <div className="w-full flex flex-col bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 px-4 py-4 bg-gray-100 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">
          <div>ID</div>
          <div>Cliente</div>
          <div>Cancha</div>
          <div>Fecha</div>
          <div className="text-center">Hora</div>
          <div className="text-center">Estado</div>
          <div className="text-right">Acciones</div>
        </div>
        <div className="p-4 max-h-[500px] overflow-y-auto flex flex-col gap-2">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Cargando...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay reservas con los filtros seleccionados
            </div>
          ) : (
            bookings.map((booking: Booking) => (
              <BookingAdminTB
                key={booking.id}
                id={booking.id}
                user={booking.user?.name || "Anónimo"}
                resource={booking.resource?.name || "N/A"}
                date={booking.date}
                time={`${booking.startTime} - ${booking.endTime}`}
                status={booking.status}
                onCancel={() => handleCancelBooking(booking.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingControl;