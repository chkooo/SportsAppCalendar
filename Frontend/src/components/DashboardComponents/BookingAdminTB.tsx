// BookingAdminTB.tsx
interface BookingProps {
  id: string | number;
  user: string;
  resource: string;
  date: string;
  time: string;
  status: string;
}

function BookingAdminTB({
  id,
  user,
  resource,
  date,
  time,
  status,
}: BookingProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr_2fr] gap-4 items-center bg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      <div className="text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate text-blue-300">{user}</div>
      <div className="truncate">{resource}</div>
      <div className="font-mono text-xs">
        {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-center font-mono">{time}</div>
      <div
        className={`text-center font-bold text-xs uppercase ${status === "Confirmado" ? "text-green-400" : "text-orange-400"}`}
      >
        {status}
      </div>

      <div className="flex justify-end items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs font-bold">
          Editar
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs font-bold">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default BookingAdminTB;
