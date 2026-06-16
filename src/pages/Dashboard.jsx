import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import GraficoVentas from "../components/GraficoVentas";

function Dashboard() {

  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    cargarDatos();

  }, []);

  const cargarDatos = async () => {
    try {

      const [
        resProductos,
        resClientes,
        resVentas,
      ] = await Promise.all([
        api.get("/productos"),
        api.get("/clientes"),
        api.get("/ventas"),
      ]);

      setProductos(resProductos.data);
      setClientes(resClientes.data);
      setVentas(resVentas.data);

    } catch (error) {
      console.log(error);
    }
  };

  const totalProductos = productos.length;

  const totalClientes = clientes.length;

  const totalVentas = ventas.length;

  const totalStock = productos.reduce(
    (acum, p) => acum + Number(p.stock_cajas || 0),
    0
  );

  const valorInventario = productos.reduce(
    (acum, p) =>
      acum +
      Number(p.stock_cajas || 0) *
      Number(p.precio_caja || 0),
    0
  );

  const totalVendido = ventas.reduce(
    (acum, v) => acum + Number(v.total || 0),
    0
  );

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        📊 Dashboard Distribuidora Coca-Cola
      </h1>

      <div className="row">

        <div className="col-md-3">
          <div className="card text-center shadow mb-3 border-primary">
            <div className="card-body">
              <h5>📦 Productos</h5>
              <h2>{totalProductos}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow mb-3 border-success">
            <div className="card-body">
              <h5>🏪 Clientes</h5>
              <h2>{totalClientes}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow mb-3 border-warning">
            <div className="card-body">
              <h5>💰 Ventas</h5>
              <h2>{totalVentas}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow mb-3 border-danger">
            <div className="card-body">
              <h5>💵 Total Vendido</h5>
              <h2>
                Bs. {totalVendido.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        <div className="col-md-6">
          <div className="card shadow mb-3">
            <div className="card-body text-center">
              <h5>📦 Stock Total</h5>
              <h2>{totalStock}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow mb-3">
            <div className="card-body text-center">
              <h5>🏦 Valor Inventario</h5>
              <h2>
                Bs. {valorInventario.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-success text-white">
          Gráfico de Ventas
        </div>

        <div className="card-body">

          <GraficoVentas
            ventas={ventas}
          />

        </div>

      </div>

      <div className="card shadow mt-3">

        <div className="card-header bg-primary text-white">
          Resumen General
        </div>

        <div className="card-body">

          <p>
            Sistema de gestión para
            distribuidora de bebidas.
          </p>

          <ul>
            <li>
              Productos registrados:
              {" "}
              {totalProductos}
            </li>

            <li>
              Clientes registrados:
              {" "}
              {totalClientes}
            </li>

            <li>
              Ventas registradas:
              {" "}
              {totalVentas}
            </li>

            <li>
              Total vendido:
              {" "}
              Bs. {totalVendido.toFixed(2)}
            </li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;