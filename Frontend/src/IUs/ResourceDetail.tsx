import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { apiFetch } from "../api_url";
import { useAuth } from "../context/AuthContext";

interface ResourceSchedule {
  id: string;
  resourceId: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

interface ResourceBlock {
  id: string;
  resourceId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
}

interface Resource {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  schedules: ResourceSchedule[];
  active: boolean;
  clientId: string;
}

function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [resource, setResource] = useState<Resource | null>(null);
  const [blocks, setBlocks] = useState<ResourceBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const prevSessionRef = useRef<typeof session>(session);

  useEffect(() => {
    // Detecta cuando la sesión pasa de null -> authenticated
    if (!prevSessionRef.current && session) {
      setSuccessMessage("Inicio de sesión completado. Redirigiendo...");
      const t = setTimeout(() => navigate("/"), 2500);
      return () => clearTimeout(t);
    }
    prevSessionRef.current = session;
  }, [session, navigate]);

  const imgRoute = "/src/assets/loremCancha.svg";
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const [resourceRes, blocksRes, bookingsRes] = await Promise.all([
          apiFetch(`/resources/${id}`),
          apiFetch(`/blocks`),
          apiFetch(`/bookings`),
        ]);

        const resourceData = await resourceRes.json();
        const blocksData = await blocksRes.json();
        const bookingsData = await bookingsRes.json();

        setResource(resourceData);
        setBlocks(Array.isArray(blocksData) ? blocksData : []);
        setBookings(
          Array.isArray(bookingsData)
            ? bookingsData.filter((b: any) => b.resourceId === id)
            : [],
        );
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const generateTimeSlots = (openTime: string, closeTime: string): string[] => {
    const slots: string[] = [];
    const [openHour, openMin] = openTime.split(":").map(Number);
    const [closeHour, closeMin] = closeTime.split(":").map(Number);

    let currentHour = openHour;
    let currentMin = openMin;

    while (
      currentHour < closeHour ||
      (currentHour === closeHour && currentMin < closeMin)
    ) {
      slots.push(
        `${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`,
      );
      currentMin += 60;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }

    return slots;
  };

  const isTimeSlotBlocked = (
    date: string,
    startTime: string,
    endTime: string,
  ): boolean => {
    const dateString = date;

    // Verificar ResourceBlocks (mantenimiento)
    const hasBlockConflict = blocks.some((block) => {
      if (block.resourceId !== id) return false;

      const blockDate = new Date(block.date).toISOString().split("T")[0];
      if (blockDate !== dateString) return false;

      const blockStart = parseInt(block.startTime.replace(":", ""));
      const blockEnd = parseInt(block.endTime.replace(":", ""));
      const slotStart = parseInt(startTime.replace(":", ""));
      const slotEnd = parseInt(endTime.replace(":", ""));

      return !(slotEnd <= blockStart || slotStart >= blockEnd);
    });

    // Verificar Bookings (reservas confirmadas o pendientes)
    const hasBookingConflict = bookings.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      if (bookingDate !== dateString) return false;

      if (booking.status === "CANCELLED") return false;

      const bookingStart = parseInt(booking.startTime.replace(":", ""));
      const bookingEnd = parseInt(booking.endTime.replace(":", ""));
      const slotStart = parseInt(startTime.replace(":", ""));
      const slotEnd = parseInt(endTime.replace(":", ""));

      return !(slotEnd <= bookingStart || slotStart >= bookingEnd);
    });

    return hasBlockConflict || hasBookingConflict;
  };

  const getScheduleForDate = (): ResourceSchedule | undefined => {
    if (!resource) return undefined;
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    return resource.schedules.find((s) => s.dayOfWeek === dayOfWeek);
  };

  const handleTimeSlotClick = (startTime: string, endTime: string) => {
    if (!isTimeSlotBlocked(selectedDate, startTime, endTime)) {
      setSelectedTime(`${startTime}-${endTime}`);
      setError(null);
    }
  };

  const handleCreateBooking = async () => {
    if (!session || !session.user || !resource || !selectedTime) {
      setError("Por favor selecciona un horario y asegúrate de estar logueado");
      return;
    }

    const [startTime, endTime] = selectedTime.split("-");

    try {
      setIsCreatingBooking(true);
      setError(null);

      const dateTime = new Date(`${selectedDate}T00:00:00Z`).toISOString();

      const bookingData = {
        clientId: resource.clientId,
        userId: session.user.id,
        resourceId: id,
        date: dateTime,
        startTime,
        endTime,
        totalPrice: parseFloat(resource.pricePerHour.toString()),
        status: "PENDING",
      };

      const response = await apiFetch("/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la reserva");
      }

      setSuccessMessage("¡Reserva creada exitosamente!");
      setSelectedTime(null);

      // Recargar los bookings para actualizar los horarios bloqueados
      setTimeout(async () => {
        try {
          const bookingsRes = await apiFetch(`/bookings`);
          const bookingsData = await bookingsRes.json();
          setBookings(
            Array.isArray(bookingsData)
              ? bookingsData.filter((b: any) => b.resourceId === id)
              : [],
          );
        } catch (err) {
          console.error("Error al recargar bookings:", err);
        }

        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la reserva",
      );
    } finally {
      setIsCreatingBooking(false);
    }
  };

  const schedule = getScheduleForDate();
  const timeSlots = schedule
    ? generateTimeSlots(schedule.openTime, schedule.closeTime)
    : [];

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-white text-2xl mb-4">
            Debes iniciar sesión para hacer una reserva
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Cancha no encontrada</div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen pb-10">
      <button
        onClick={() => navigate("/")}
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ← Volver
      </button>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header con imagen */}
        <div className="relative rounded-lg overflow-hidden mb-8">
          <img
            src={imgRoute}
            alt={resource.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              {resource.name}
            </h1>
            <p className="text-gray-200 text-lg">{resource.description}</p>
          </div>
        </div>

        {/* Info y selector de fecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-800 p-6 rounded-lg">
            <p className="text-gray-400 text-sm">Precio por hora</p>
            <p className="text-3xl font-bold text-emerald-400">
              ${resource.pricePerHour}
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg md:col-span-2">
            <label className="block text-gray-300 text-sm mb-2">
              Selecciona una fecha:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Horarios */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Horarios para {daysOfWeek[new Date(selectedDate).getDay()]}
            </h2>
            {schedule ? (
              <p className="text-gray-400">
                Apertura: {schedule.openTime} - Cierre: {schedule.closeTime}
              </p>
            ) : (
              <p className="text-yellow-400">
                No hay servicio disponible para este día
              </p>
            )}
          </div>

          {schedule && timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {timeSlots.map((startTime, index) => {
                const endTime = timeSlots[index + 1] || startTime;
                const isBlocked = isTimeSlotBlocked(
                  selectedDate,
                  startTime,
                  endTime,
                );
                const isSelected = selectedTime === `${startTime}-${endTime}`;

                return (
                  <button
                    key={startTime}
                    onClick={() => handleTimeSlotClick(startTime, endTime)}
                    disabled={isBlocked}
                    className={`p-4 rounded-lg text-center font-semibold cursor-pointer transition ${
                      isBlocked
                        ? "bg-red-900/50 text-red-300 border border-red-700 cursor-not-allowed"
                        : isSelected
                          ? "bg-blue-600 text-white border border-blue-400"
                          : "bg-emerald-900/50 text-emerald-300 border border-emerald-700 hover:bg-emerald-800 hover:text-emerald-100"
                    }`}
                  >
                    <div className="text-sm">{startTime}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {isBlocked
                        ? "No disponible"
                        : isSelected
                          ? "Seleccionado"
                          : "Disponible"}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No hay horarios para este día</p>
          )}

          {/* Leyenda */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-900/50 border border-emerald-700 rounded"></div>
              <span className="text-gray-300">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900/50 border border-red-700 rounded"></div>
              <span className="text-gray-300">No disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 border border-blue-400 rounded"></div>
              <span className="text-gray-300">Seleccionado</span>
            </div>
          </div>

          {/* Mensajes de error y éxito */}
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded text-red-300">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded text-green-300">
              {successMessage}
            </div>
          )}
        </div>

        {/* Botón de reserva */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold disabled:opacity-50"
            disabled={isCreatingBooking}
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateBooking}
            disabled={!selectedTime || isCreatingBooking}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingBooking ? "Reservando..." : "Reservar Ahora"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetail;
