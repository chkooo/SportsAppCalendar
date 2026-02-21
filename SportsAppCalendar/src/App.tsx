import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RSCard from "./RSCard";
import Menu from "./Menu";

function App() {
  return (
    <>
      <Menu />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 justify-items-center max-w-6xl mx-auto">
        <RSCard />
        <RSCard />
        <RSCard />
        <RSCard />
      </div>
    </>
  );
}

export default App;
