// AdminDashboard.tsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Metric from "./DashboardComponents/Metric";
import DateRangePicker from "./DashboardComponents/DateRangePicker";
import { apiFetch } from "../api_url";

function getDefaultStartDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
}

function getDefaultEndDate() {
  return new Date().toISOString().split("T")[0];
}

function AdminDashboard() {
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [metrics, setMetrics] = useState({
    users: 0,
    resources: 0,
    bookings: 0,
    revenue: 0,
    todayBookings: 0,
  });
  const [revenueByDay, setRevenueByDay] = useState<{ date: string; amount: number }[]>([]);
  const [bookingsByDay, setBookingsByDay] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const [resSummary, resMetrics] = await Promise.all([
        apiFetch("/dashboard/summary"),
        apiFetch(`/dashboard/metrics?startDate=${startDate}&endDate=${endDate}`),
      ]);

      const summaryData = await resSummary.json();
      const metricsData = await resMetrics.json();

      setMetrics({
        users: summaryData.users,
        resources: summaryData.resources,
        bookings: summaryData.bookings,
        revenue: metricsData.revenue,
        todayBookings: summaryData.todayBookings,
      });

      setRevenueByDay(metricsData.revenueByDay || []);
      setBookingsByDay(metricsData.bookingsByDay || []);
    } catch (error) {
      console.error("Error cargando métricas del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleApplyFilter = () => {
    fetchMetrics();
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  };

  return (
    <div className="h-full bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-white flex items-center justify-start flex-col gap-8 p-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-black tracking-tighter text-zinc-800 dark:text-white">DASHBOARD</h1>
        <p className="text-zinc-600 dark:text-gray-400 text-sm uppercase tracking-[0.2em]">
          Resumen general del sistema
        </p>
      </div>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={handleApplyFilter}
      />

      {loading ? (
        <p className="text-zinc-600 dark:text-gray-400">Cargando métricas...</p>
      ) : (
        <>
          <div className="w-full flex flex-wrap justify-center gap-6">
            <Metric title="Usuarios Registrados" value={metrics.users} />
            <Metric title="Canchas Activas" value={metrics.resources} />
            <Metric title="Reservas en el Período" value={metrics.bookings} />
            <Metric title="Ingresos del Período" value={metrics.revenue} />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6">
            <div className="bg-white dark:bg-zinc-700 border-2 border-zinc-800 dark:border-gray-500 rounded-lg p-4 w-full md:w-[48%]">
              <h3 className="text-center text-zinc-700 dark:text-gray-100 text-lg font-bold uppercase tracking-wider mb-4">
                Reservas por Día
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bookingsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#666"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#666" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #666",
                      borderRadius: 4,
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" name="Reservas" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-zinc-700 border-2 border-zinc-800 dark:border-gray-500 rounded-lg p-4 w-full md:w-[48%]">
              <h3 className="text-center text-zinc-700 dark:text-gray-100 text-lg font-bold uppercase tracking-wider mb-4">
                Ingresos por Día
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#666"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#666" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #666",
                      borderRadius: 4,
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString("es-MX")}`, "Ingresos"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e", strokeWidth: 2 }}
                    name="Ingresos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;