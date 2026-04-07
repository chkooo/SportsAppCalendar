import Login from "../components/test/Login";
import Register from "../components/test/Register";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

/* Playground component to test components */
function Pg() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="bg-fuchsia-500 flex flex-col items-center justify-start h-screen pt-4">
      <div className="bg-zinc-800 flex flex-row items-center justify-around h-fit max-w-1/2 w-screen p-4 gap-4">
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
      <div className="bg-zinc-800 flex flex-col items-center justify-center max-h-1/2 h-screen max-w-1/2 w-screen p-4 border border-gray-600 rounded-lg">
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Pg;
