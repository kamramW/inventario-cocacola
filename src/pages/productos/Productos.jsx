import { useEffect, useState } from "react";
import api from "../../services/api";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    presentacion: "",
    unidades_caja: "",
    precio_unitario: "",
    precio_caja: "",
    stock_cajas: "",
  });

  const obtenerProductos = async () => {
    const res = await api.get("/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      categoria: "",
      presentacion: "",
      unidades_caja: "",
      precio_unitario: "",
      precio_caja: "",
      stock_cajas: "",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (editando) {
      await api.put(`/productos/${idEditar}`, formulario);
    } else {
      await api.post("/productos", formulario);
    }

    limpiarFormulario();
    obtenerProductos();
  };

  const editarProducto = (producto) => {
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      presentacion: producto.presentacion,
      unidades_caja: producto.unidades_caja,
      precio_unitario: producto.precio_unitario,
      precio_caja: producto.precio_caja,
      stock_cajas: producto.stock_cajas,
    });

    setIdEditar(producto.id);
    setEditando(true);
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) return;

    await api.delete(`/productos/${id}`);
    obtenerProductos();
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Gestión de Productos</h3>
        </div>

        <div className="card-body">

          <form onSubmit={guardarProducto}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del producto"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="categoria"
                  placeholder="Categoría"
                  className="form-control"
                  value={formulario.categoria}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="presentacion"
                  placeholder="Presentación"
                  className="form-control"
                  value={formulario.presentacion}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  name="unidades_caja"
                  placeholder="Unidades por caja"
                  className="form-control"
                  value={formulario.unidades_caja}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  name="precio_unitario"
                  placeholder="Precio unitario"
                  className="form-control"
                  value={formulario.precio_unitario}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  name="precio_caja"
                  placeholder="Precio por caja"
                  className="form-control"
                  value={formulario.precio_caja}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  name="stock_cajas"
                  placeholder="Stock"
                  className="form-control"
                  value={formulario.stock_cajas}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button className="btn btn-success me-2">
              {editando ? "Actualizar" : "Guardar"}
            </button>

            {editando && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>
            )}

          </form>

        </div>
      </div>

      <div className="card mt-4 shadow">
        <div className="card-header bg-dark text-white">
          Lista de Productos
        </div>

        <div className="card-body">

          <table className="table table-hover table-bordered text-center">

            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Presentación</th>
                <th>Unid/Caja</th>
                <th>P. Unitario</th>
                <th>P. Caja</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.unidades_caja}</td>
                  <td>{producto.precio_unitario}</td>
                  <td>{producto.precio_caja}</td>
                  <td>{producto.stock_cajas}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
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

export default Productos;