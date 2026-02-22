import AdminDashboard from "../components/AdminDashboard";
import Example from "./Example";
import UserAdministrator from "../components/UserAdministrator";
import { useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className=" bg-gray-300 text-white flex items-center justify-between w-auto mx-8 rounded-lg h-[80vh] gap-2">
      <div className="bg-gray-100 h-full w-46 inline">
        <button onClick={() => setActiveTab("dashboard")} className="block">
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("userAdministrator")}
          className="block"
        >
          Gestión de Usuarios
        </button>
        <button onClick={() => setActiveTab("example")} className="block">
          Example
        </button>
      </div>
      <div className="bg-gray-100 h-full w-full inline">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "example" && <Example />}
        {activeTab === "userAdministrator" && <UserAdministrator />}
      </div>
    </div>
  );
}

export default Admin;
