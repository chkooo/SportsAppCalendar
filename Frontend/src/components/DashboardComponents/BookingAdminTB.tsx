// BookingAdminTB.tsx
import { BookingStatus } from "../types/booking";

interface BookingAdminTBProps {
  id: string | number;
  user: string;
  resource: string;
  date: string;
  time: string;
  status: BookingStatus | string;
  onEdit?: () => void;
  onCancel?: () => void;
}

function BookingAdminTB({
  id,
  user,
  resource,
  date,
  time,
  status,
  onEdit,
  onCancel,
}: BookingAdminTBProps) {
  const isCancellable = status === "PENDING" || status === "CONFIRMED";

  const statusColor = {
    PENDING: "text-amber-600 dark:text-orange-400",
    CONFIRMED: "text-green-600 dark:text-green-400",
    CANCELLED: "text-red-600 dark:text-red-400",
    COMPLETED: "text-blue-600 dark:text-blue-400",
  }[status as BookingStatus] || "text-gray-600 dark:text-gray-400";

  const statusLabel = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmado",
    CANCELLED: "Cancelado",
    COMPLETED: "Completado",
  }[status as BookingStatus] || status;

  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 items-center bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-700 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-white/20">
      <div className="text-gray-500 dark:text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate text-blue-600 dark:text-blue-300">{user}</div>
      <div className="truncate text-gray-700 dark:text-gray-300">{resource}</div>
      <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
        {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-center font-mono text-gray-600 dark:text-gray-400">{time}</div>
      <div className={`text-center font-bold text-xs uppercase ${statusColor}`}>
        {statusLabel}
      </div>

      <div className="flex justify-end items-center">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!onEdit}
        >
          Editar
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!onCancel || !isCancellable}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default BookingAdminTB;