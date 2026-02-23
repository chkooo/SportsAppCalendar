import { useState } from "react";

function UsersM({ title, value }: { title?: string; value?: number }) {
  const [isMoney, setIsMoney] = useState(
    title === "Ingresos Mensuales" ? true : false,
  );
  return (
    <div className="h-40 w-72 flex items-center justify-start flex-col gap-6 bg-zinc-700 border border-t-2 border-l-2 border-gray-500 rounded-lg shadow-md p-4 pt-0 font-sans antialiased">
      <h3 className="text-center text-gray-100 text-xl font-bold">
        {title || "Metric"}
      </h3>
      <h2 className="text-center text-blue-400 text-4xl font-black">
        {isMoney ? `$${value || 0}` : value || 0}
      </h2>
    </div>
  );
}

export default UsersM;
