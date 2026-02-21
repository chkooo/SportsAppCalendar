import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./IUs/Main";
import Menu from "./components/Menu";
import Example from "./IUs/Example";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Example />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
