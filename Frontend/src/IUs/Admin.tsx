import AdminDashboard from "../components/AdminDashboard";
import UserAdministrator from "../components/UserAdministrator";
import ResourceInventory from "../components/ResourceInventory";
import BookingControl from "../components/BookingControl";
import MantenanceLog from "../components/MaintenanceLog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="bg-zinc-100 dark:bg-black text-zinc-800 dark:text-white flex flex-col lg:flex-row w-auto mx-8 rounded-lg h-[80vh] gap-2">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden self-start p-2 text-zinc-800 dark:text-white"
      >
        ☰
      </button>
      <div
        className={`bg-zinc-200 dark:bg-zinc-800 ${
          sidebarOpen ? "block" : "hidden"
        } lg:block lg:relative lg:h-full lg:w-46 w-full h-auto fixed inset-0 z-[1001] lg:z-auto lg:inset-auto`}
      >
        <button
          onClick={() => handleTabChange("dashboard")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleTabChange("userAdministrator")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => handleTabChange("resourceInventory")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Gestión de Recursos
        </button>
        <button
          onClick={() => handleTabChange("bookingControl")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Reservaciones
        </button>
        <button
          onClick={() => handleTabChange("maintenanceLog")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Mantenimiento
        </button>
        <button
          onClick={() => navigate("/")}
          className="block p-2 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Salir
        </button>
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-900 h-full w-full rounded-lg p-4 lg:flex-1">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "userAdministrator" && <UserAdministrator />}
        {activeTab === "resourceInventory" && <ResourceInventory />}
        {activeTab === "bookingControl" && <BookingControl />}
        {activeTab === "maintenanceLog" && <MantenanceLog />}
      </div>
    </div>
  );
}

export default Admin;
