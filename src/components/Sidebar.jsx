import { Link } from "react-router-dom";

function Sidebar() {

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

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

        <Link
          to="/dashboard"
          className="btn btn-light"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/productos"
          className="btn btn-light"
        >
          📦 Productos
        </Link>

        <Link
          to="/clientes"
          className="btn btn-light"
        >
          🏪 Clientes
        </Link>

        <Link
          to="/ventas"
          className="btn btn-light"
        >
          💰 Ventas
        </Link>

        <Link
          to="/reportes"
          className="btn btn-light"
        >
          📈 Reportes
        </Link>

        <button
  className="btn btn-danger"
  onClick={async () => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario")
      );

      await fetch(
        "http://localhost:3000/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuario.id,
          }),
        }
      );

    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    window.location.href = "/";
  }}
>
  🚪 Cerrar Sesión
</button>

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
        Sistema Distribuidora v1.0
      </div>

    </div>
  );
}

export default Sidebar;