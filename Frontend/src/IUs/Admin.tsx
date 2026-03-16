import AdminDashboard from "../components/AdminDashboard";
import Example from "./Example";
import UserAdministrator from "../components/UserAdministrator";
import ResourceInventory from "../components/ResourceInventory";
import BookingControl from "../components/BookingControl";
import MantenanceLog from "../components/MaintenanceLog";
import { useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="bg-black text-white flex flex-col lg:flex-row w-auto mx-8 rounded-lg h-[80vh] gap-2">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden self-start p-2 text-white"
      >
        ☰
      </button>
      <div
        className={`bg-zinc-800 ${
          sidebarOpen ? "block" : "hidden"
        } lg:block lg:relative lg:h-full lg:w-46 w-full h-auto fixed inset-0 z-[1001] lg:z-auto lg:inset-auto`}
      >
        <button
          onClick={() => handleTabChange("dashboard")}
          className="block p-2"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleTabChange("userAdministrator")}
          className="block p-2"
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => handleTabChange("resourceInventory")}
          className="block p-2"
        >
          Gestión de Recursos
        </button>
        <button
          onClick={() => handleTabChange("bookingControl")}
          className="block p-2"
        >
          Reservaciones
        </button>
        <button
          onClick={() => handleTabChange("maintenanceLog")}
          className="block p-2"
        >
          Mantenimiento
        </button>
        <button
          onClick={() => handleTabChange("example")}
          className="block p-2"
        >
          Salir del CRUD
        </button>
      </div>
      <div className="bg-zinc-900 h-full w-full rounded-lg p-4 lg:flex-1">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "example" && <Example />}
        {activeTab === "userAdministrator" && <UserAdministrator />}
        {activeTab === "resourceInventory" && <ResourceInventory />}
        {activeTab === "bookingControl" && <BookingControl />}
        {activeTab === "maintenanceLog" && <MantenanceLog />}
      </div>
    </div>
  );
}

export default Admin;
