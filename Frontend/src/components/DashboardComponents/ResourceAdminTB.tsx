// ResourceAdminTB.tsx
interface ResourceProps {
  id: string | number;
  name: string;
  type: string;
  price: number;
  active: boolean;
  onEdit: (resource: any) => void;
  onToggle: (id: string, currentActive: boolean) => void;
}

function ResourceAdminTB({
  id,
  name,
  type,
  price,
  active,
  onEdit,
  onToggle,
}: ResourceProps) {
  const status = active ? "Disponible" : "Mantenimiento";

  return (
    <div className="w-full grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_2fr] gap-4 items-center bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-500 rounded-lg p-2 mb-2 font-sans text-sm text-gray-700 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-white/20">
      <div className="text-gray-500 dark:text-gray-500 font-mono text-xs">
        #{id.toString().slice(-4)}
      </div>
      <div className="font-bold truncate text-gray-800 dark:text-white">{name}</div>
      <div className="truncate text-blue-600 dark:text-blue-300">{type}</div>
      <div className="font-mono text-gray-600 dark:text-gray-400">${(typeof price === 'string' ? parseFloat(price) : price || 0).toFixed(2)}/hr</div>
      <div
        className={`text-center font-bold ${active ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-yellow-400"}`}
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
              active,
            })
          }
          className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-600 transition-colors text-xs font-bold uppercase"
        >
          Editar
        </button>
        <button
          onClick={() => onToggle(id.toString(), active)}
          className={`${
            active
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-2 py-1 rounded-lg transition-colors text-xs font-bold uppercase`}
        >
          {active ? "Bajar" : "Alta"}
        </button>
      </div>
    </div>
  );
}

export default ResourceAdminTB;