import UsersM from "./DashboardComponents/Metric";

function AdminDashboard() {
  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="w-full h-48 bg-zinc-800 flex justify-between items-center px-4">
        <UsersM title="Usuarios Registrados" value={0} />
        <UsersM title="Canchas Activas" value={0} />
        <UsersM title="Reservas Hoy" value={0} />
        <UsersM title="Ingresos Mensuales" value={0} />
      </div>
    </div>
  );
}

export default AdminDashboard;
