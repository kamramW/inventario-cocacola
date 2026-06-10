import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "linear-gradient(180deg,#0d6efd,#0b5ed7)",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        boxShadow: "3px 0px 15px rgba(0,0,0,0.2)",
      }}
    >
      <h3 className="text-center mb-4">
        🥤 Distribuidora
      </h3>

      <div className="d-grid gap-3">

        <Link to="/dashboard" className="btn btn-light">
          📊 Dashboard
        </Link>

        <Link to="/productos" className="btn btn-light">
          📦 Productos
        </Link>

        <Link to="/clientes" className="btn btn-light">
          🏪 Clientes
        </Link>

        <Link to="/ventas" className="btn btn-light">
          💰 Ventas
        </Link>

        <Link to="/reportes" className="btn btn-light">
          📈 Reportes
        </Link>

      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          right: "20px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        Sistema de Gestión
      </div>
    </div>
  );
}

export default Sidebar;