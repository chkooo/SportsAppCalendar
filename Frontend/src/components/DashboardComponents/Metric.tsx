// Metric.tsx
interface MetricProps {
  title: string;
  value: number;
}

function Metric({ title, value }: MetricProps) {
  const isMoney = title.toLowerCase().includes("ingresos");

  return (
    <div className="h-40 w-72 flex items-center justify-start flex-col gap-6 bg-white dark:bg-zinc-700 border-2 border-zinc-800 dark:border-gray-500 rounded-lg shadow-md p-4 font-sans antialiased transition-transform hover:scale-105">
      <h3 className="text-center text-zinc-700 dark:text-gray-100 text-lg font-bold uppercase tracking-wider">
        {title}
      </h3>
      <h2 className="text-center text-blue-600 dark:text-blue-400 text-5xl font-black">
        {isMoney ? `$${value.toLocaleString("es-MX")}` : value.toLocaleString()}
      </h2>
    </div>
  );
}

export default Metric;