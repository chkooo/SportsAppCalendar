import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./IUs/Main";
import Menu from "./components/Menu";
import Example from "./IUs/Example"; //Example component for testing routes
import Pg from "./IUs/Pg"; //PlayGround component for testing components
import Admin from "./IUs/Admin";
import ResourceDetail from "./IUs/ResourceDetail";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <main className="pt-24 bg-zinc-900 min-h-screen">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/resource/:id" element={<ResourceDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/playground" element={<Pg />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
