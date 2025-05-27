import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Estudiantes from "./pages/Estudiantes";
import Salas from "./pages/Salas";
import Prestamos from "./pages/Prestamos";
import Reportes from "./pages/Reportes";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
        <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "200px", padding: "20px" }}>
          <Routes>
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/salas" element={<Salas />} />
            <Route path="/prestamos" element={<Prestamos />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
