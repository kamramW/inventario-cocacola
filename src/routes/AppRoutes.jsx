import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/productos/Productos";
import Clientes from "../pages/clientes/Clientes";
import Ventas from "../pages/ventas/Ventas";
import Reportes from "../pages/reportes/Reportes";

import Sidebar from "../components/Sidebar";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default AppRoutes;