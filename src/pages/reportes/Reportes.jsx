import { useEffect, useState } from "react";
import api from "../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reportes() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const res = await api.get("/ventas");
      setVentas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalVentas = ventas.length;

  const totalVendido = ventas.reduce(
    (acum, venta) => acum + Number(venta.total || 0),
    0
  );

  const mayorVenta =
    ventas.length > 0
      ? Math.max(...ventas.map((v) => Number(v.total)))
      : 0;

  // PRODUCTO MÁS VENDIDO
  const productosVendidos = {};

  ventas.forEach((venta) => {
    venta.DetalleVenta?.forEach((detalle) => {
      const nombre = detalle.Producto?.nombre;

      if (!nombre) return;

      productosVendidos[nombre] =
        (productosVendidos[nombre] || 0) +
        Number(detalle.cantidad);
    });
  });

  const productoMasVendido =
    Object.entries(productosVendidos).sort(
      (a, b) => b[1] - a[1]
    )[0];

  // CLIENTE TOP
  const clientesCompras = {};

  ventas.forEach((venta) => {
    const nombre = venta.Cliente?.nombre_tienda;

    if (!nombre) return;

    clientesCompras[nombre] =
      (clientesCompras[nombre] || 0) +
      Number(venta.total);
  });

  const mejorCliente =
    Object.entries(clientesCompras).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setTextColor(220, 0, 0);
    doc.setFontSize(22);

    doc.text(
      "DISTRIBUIDORA COCA-COLA",
      15,
      20
    );

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);

    doc.text(
      "Reporte General de Ventas",
      15,
      35
    );

    doc.setFontSize(11);

    doc.text(
      `Fecha: ${new Date().toLocaleDateString()}`,
      15,
      50
    );

    doc.text(
      `Cantidad de Ventas: ${totalVentas}`,
      15,
      60
    );

    doc.text(
      `Total Vendido: Bs. ${totalVendido.toFixed(2)}`,
      15,
      70
    );

    doc.text(
      `Mayor Venta: Bs. ${mayorVenta.toFixed(2)}`,
      15,
      80
    );

    doc.text(
      `Producto Más Vendido: ${
        productoMasVendido
          ? productoMasVendido[0]
          : "Sin datos"
      }`,
      15,
      90
    );

    doc.text(
      `Mejor Cliente: ${
        mejorCliente
          ? mejorCliente[0]
          : "Sin datos"
      }`,
      15,
      100
    );

    autoTable(doc, {
      startY: 115,

      head: [
        ["ID", "Cliente", "Total"]
      ],

      body: ventas.map((v) => [
        v.id,
        v.Cliente?.nombre_tienda,
        `Bs. ${v.total}`,
      ]),
    });

    doc.save(
      `Reporte_${new Date().getTime()}.pdf`
    );
  };

  return (
    <div className="container-fluid mt-4">

      <div className="mb-4">
        <h1 className="fw-bold">
          📈 Centro de Reportes
        </h1>

        <p className="text-muted">
          Estadísticas y análisis de ventas.
        </p>
      </div>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center mb-3">
            <div className="card-body">
              <h6>Total Ventas</h6>
              <h2>{totalVentas}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center mb-3">
            <div className="card-body">
              <h6>Total Vendido</h6>
              <h2>
                Bs. {totalVendido.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center mb-3">
            <div className="card-body">
              <h6>Mayor Venta</h6>
              <h2>
                Bs. {mayorVenta.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center mb-3">
            <div className="card-body">
              <h6>Cliente Top</h6>

              <strong>
                {mejorCliente
                  ? mejorCliente[0]
                  : "-"}
              </strong>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        <div className="col-md-6">
          <div className="card shadow border-0 mb-3">
            <div className="card-body text-center">
              <h5>
                🏆 Producto Más Vendido
              </h5>

              <h3>
                {productoMasVendido
                  ? productoMasVendido[0]
                  : "Sin datos"}
              </h3>

              <small>
                {productoMasVendido
                  ? `${productoMasVendido[1]} unidades`
                  : ""}
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow border-0 mb-3">
            <div className="card-body text-center">
              <h5>
                👑 Mejor Cliente
              </h5>

              <h3>
                {mejorCliente
                  ? mejorCliente[0]
                  : "Sin datos"}
              </h3>

              <small>
                Bs.
                {mejorCliente
                  ? mejorCliente[1].toFixed(2)
                  : "0"}
              </small>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-header bg-success text-white">
          Historial de Ventas
        </div>

        <div className="card-body">

          <table className="table table-striped table-hover">

            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>

                  <td>
                    {venta.Cliente?.nombre_tienda}
                  </td>

                  <td>
                    Bs. {venta.total}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

          <button
            className="btn btn-danger"
            onClick={generarPDF}
          >
            📥 Descargar Reporte PDF
          </button>

        </div>

      </div>

    </div>
  );
}

export default Reportes;