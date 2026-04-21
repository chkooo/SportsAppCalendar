// AdminDashboard.tsx
import { useState, useEffect } from "react";
import Metric from "./DashboardComponents/Metric";
import { apiFetch } from "../api_url";

function AdminDashboard() {
  // Estado para las métricas reales del sistema
  const [metrics, setMetrics] = useState({
    users: 0,
    resources: 0,
    bookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // En una arquitectura profesional, podrías tener un endpoint /api/dashboard/stats
        // O hacer múltiples fetch paralelos
        const [resUsers, resResources, resBookings] = await Promise.all([
          apiFetch("/users"),
          apiFetch("/resources"),
          apiFetch("/bookings"),
        ]);

        const usersData = await resUsers.json();
        const resourcesData = await resResources.json();
        const bookingsData = await resBookings.json();

        setMetrics({
          users: usersData.length,
          resources: resourcesData.length,
          bookings: bookingsData.length, // Por ahora filtramos en frontend o traemos el count
          revenue: 15400, // Este lo calcularemos después con la tabla de payments
        });
      } catch (error) {
        console.error("Error cargando métricas del dashboard:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-8 p-6 animate-fade-up animate-once animate-duration-[1000ms] animate-ease-out">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-black tracking-tighter">DASHBOARD</h1>
        <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
          Resumen general del sistema
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-6">
        <Metric title="Usuarios Registrados" value={metrics.users} />
        <Metric title="Canchas Activas" value={metrics.resources} />
        <Metric title="Reservas Totales" value={metrics.bookings} />
        <Metric title="Ingresos Mensuales" value={metrics.revenue} />
      </div>
    </div>
  );
}

export default AdminDashboard;
