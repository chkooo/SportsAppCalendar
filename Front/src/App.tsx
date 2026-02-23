import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./IUs/Main";
import Menu from "./components/Menu";
import Example from "./IUs/Example"; //Example component for testing routes
import Admin from "./IUs/Admin";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <main className="pt-24 bg-zinc-900 min-h-screen">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
