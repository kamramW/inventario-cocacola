import { useEffect, useState } from "react";
import api from "../../services/api";

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [formulario, setFormulario] = useState({
    cliente_id: "",
    producto_id: "",
    cantidad: "",
  });

  const obtenerVentas = async () => {
    const res = await api.get("/ventas");
    setVentas(res.data);
  };

  const obtenerClientes = async () => {
    const res = await api.get("/clientes");
    setClientes(res.data);
  };

  const obtenerProductos = async () => {
    const res = await api.get("/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    obtenerVentas();
    obtenerClientes();
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const registrarVenta = async (e) => {
    e.preventDefault();

    try {
      await api.post("/ventas", formulario);

      alert("Venta registrada correctamente");

      setFormulario({
        cliente_id: "",
        producto_id: "",
        cantidad: "",
      });

      obtenerVentas();
      obtenerProductos();

    } catch (error) {
      alert(
        error.response?.data?.mensaje ||
        "Error al registrar venta"
      );
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Registrar Venta</h3>
        </div>

        <div className="card-body">

          <form onSubmit={registrarVenta}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <select
                  name="cliente_id"
                  className="form-select"
                  value={formulario.cliente_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Seleccione cliente
                  </option>

                  {clientes.map((cliente) => (
                    <option
                      key={cliente.id}
                      value={cliente.id}
                    >
                      {cliente.nombre_tienda}
                    </option>
                  ))}
                </select>

              </div>

              <div className="col-md-4 mb-3">

                <select
                  name="producto_id"
                  className="form-select"
                  value={formulario.producto_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Seleccione producto
                  </option>

                  {productos.map((producto) => (
                    <option
                      key={producto.id}
                      value={producto.id}
                    >
                      {producto.nombre}
                      {" | Stock: "}
                      {producto.stock_cajas}
                    </option>
                  ))}
                </select>

              </div>

              <div className="col-md-2 mb-3">

                <input
                  type="number"
                  name="cantidad"
                  className="form-control"
                  placeholder="Cantidad"
                  value={formulario.cantidad}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-2 mb-3">

                <button
                  className="btn btn-success w-100"
                >
                  Guardar
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Historial de Ventas</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover text-center">

            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Productos</th>
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

                  <td>
                    {venta.DetalleVenta?.map(
                      (detalle) => (
                        <div key={detalle.id}>
                          {detalle.Producto?.nombre}
                          {" x "}
                          {detalle.cantidad}
                        </div>
                      )
                    )}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Ventas;