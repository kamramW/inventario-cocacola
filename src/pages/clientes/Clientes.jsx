import { useEffect, useState } from "react";
import api from "../../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre_tienda: "",
    propietario: "",
    telefono: "",
    direccion: "",
  });

  const obtenerClientes = async () => {
    const res = await api.get("/clientes");
    setClientes(res.data);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre_tienda: "",
      propietario: "",
      telefono: "",
      direccion: "",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardarCliente = async (e) => {
    e.preventDefault();

    if (editando) {
      await api.put(`/clientes/${idEditar}`, formulario);
    } else {
      await api.post("/clientes", formulario);
    }

    limpiarFormulario();
    obtenerClientes();
  };

  const editarCliente = (cliente) => {
    setFormulario({
      nombre_tienda: cliente.nombre_tienda,
      propietario: cliente.propietario,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });

    setIdEditar(cliente.id);
    setEditando(true);
  };

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este cliente?"
    );

    if (!confirmar) return;

    await api.delete(`/clientes/${id}`);
    obtenerClientes();
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Gestión de Clientes</h3>
        </div>

        <div className="card-body">

          <form onSubmit={guardarCliente}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="nombre_tienda"
                  placeholder="Nombre de la tienda"
                  className="form-control"
                  value={formulario.nombre_tienda}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="propietario"
                  placeholder="Propietario"
                  className="form-control"
                  value={formulario.propietario}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  className="form-control"
                  value={formulario.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  className="form-control"
                  value={formulario.direccion}
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
          Lista de Clientes
        </div>

        <div className="card-body">

          <table className="table table-hover table-bordered text-center">

            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Tienda</th>
                <th>Propietario</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {clientes.map((cliente) => (
                <tr key={cliente.id}>

                  <td>{cliente.id}</td>
                  <td>{cliente.nombre_tienda}</td>
                  <td>{cliente.propietario}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editarCliente(cliente)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCliente(cliente.id)}
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

export default Clientes;