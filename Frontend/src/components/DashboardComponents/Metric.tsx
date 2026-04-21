// Metric.tsx
import { useState, useEffect } from "react";

interface MetricProps {
  title: string;
  value: number;
}

function Metric({ title, value }: MetricProps) {
  // Determinamos si es dinero basado en el título para aplicar formato
  const isMoney = title.toLowerCase().includes("ingresos");

  return (
    <div className="h-40 w-72 flex items-center justify-start flex-col gap-6 bg-zinc-700 border border-t-2 border-l-2 border-gray-500 rounded-lg shadow-md p-4 pt-4 font-sans antialiased transition-transform hover:scale-105">
      <h3 className="text-center text-gray-100 text-lg font-bold uppercase tracking-wider">
        {title}
      </h3>
      <h2 className="text-center text-blue-400 text-5xl font-black">
        {isMoney ? `$${value.toLocaleString("es-MX")}` : value.toLocaleString()}
      </h2>
    </div>
  );
}

export default Metric;
