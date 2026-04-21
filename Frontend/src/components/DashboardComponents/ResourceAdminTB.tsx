// ResourceAdminTB.tsx
interface ResourceProps {
  id: string | number;
  name: string;
  type: string;
  price: number;
  status: string;
  onEdit: (resource: any) => void;
  onToggle: (id: string, currentStatus: string) => void;
}

function ResourceAdminTB({
  id,
  name,
  type,
  price,
  status,
  onEdit,
  onToggle,
}: ResourceProps) {
  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 items-center bg-black/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-100 transition-colors hover:bg-white/20">
      <div className="text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate">{name}</div>
      <div className="truncate text-blue-300">{type}</div>
      <div className="font-mono">${(typeof price === 'string' ? parseFloat(price) : price || 0).toFixed(2)}/hr</div>
      <div
        className={`text-center font-bold ${status === "Disponible" ? "text-green-400" : "text-yellow-400"}`}
      >
        {status}
      </div>

      <div className="flex justify-end items-center">
        <button
          onClick={() =>
            onEdit({
              id,
              name,
              type,
              pricePerHour: price,
              status,
            })
          }
          className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs font-bold uppercase"
        >
          Editar
        </button>
        <button
          onClick={() => onToggle(id.toString(), status)}
          className={`${
            status === "Disponible"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold uppercase`}
        >
          {status === "Disponible" ? "Bajar" : "Alta"}
        </button>
      </div>
    </div>
  );
}

export default ResourceAdminTB;
