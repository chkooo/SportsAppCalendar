import { useState } from "react";
import UserETB from "../components/editables/UserETB";

function Pg() {
  return (
    <div className="relative bg-fuchsia-500 flex flex-col items-center justify-start h-screen pt-4">
      <UserETB />
    </div>
  );
}

export default Pg;
