import AdminDashboard from "../components/AdminDashboard";
import Example from "./Example";
import UserAdministrator from "../components/UserAdministrator";
import ResourceInventory from "../components/ResourceInventory";
import BookingControl from "../components/BookingControl";
import MantenanceLog from "../components/MaintenanceLog";
import { useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className=" bg-black text-white flex items-center justify-between w-auto mx-8 rounded-lg h-[80vh] gap-2">
      <div className="bg-zinc-800 h-full w-46 inline">
        <button onClick={() => setActiveTab("dashboard")} className="block">
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("userAdministrator")}
          className="block"
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => setActiveTab("resourceInventory")}
          className="block"
        >
          Gestión de Recursos
        </button>
        <button
          onClick={() => setActiveTab("bookingControl")}
          className="block"
        >
          Reservaciones
        </button>
        <button
          onClick={() => setActiveTab("maintenanceLog")}
          className="block"
        >
          Mantenimiento
        </button>
        <button onClick={() => setActiveTab("example")} className="block">
          Salir del CRUD
        </button>
      </div>
      <div className="bg-zinc-900 h-full w-full inline rounded-lg p-4 ">
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
