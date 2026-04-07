import Login from "../components/test/Login";
import Register from "../components/test/Register";
import { useState } from "react";

function Pg() {
  const [activeTab, setActiveTab] = useState("login");
  const [show, setShow] = useState(false); // Estado para mostrar/ocultar

  return (
    <div className="relative bg-fuchsia-500 flex flex-col items-center justify-start h-screen pt-4">
      {/* Botón simple para activar el popup */}
      <button
        onClick={() => setShow(!show)}
        className="bg-zinc-800 text-white px-6 py-2 rounded-lg font-bold mb-4 z-10"
      >
        {show ? "Cerrar Prueba" : "Abrir Prueba"}
      </button>

      {show && (
        <div className="absolute inset-0 flex flex-col items-center justify-start z-50 p-4 sm:p-8 md:p-16">
          {/* Fondo oscuro opcional para que se note que es un popup */}
          <div
            className="absolute inset-0 bg-black/40 -z-10"
            onClick={() => setShow(false)}
          />

          <div className="bg-zinc-800 flex flex-row items-center justify-around h-fit w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 gap-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="bg-zinc-800 flex flex-col items-center justify-center h-fit w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 border border-gray-600 rounded-lg">
            {activeTab === "login" ? <Login /> : <Register />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pg;
