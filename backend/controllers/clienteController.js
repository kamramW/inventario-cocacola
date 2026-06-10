const Cliente = require("../models/Cliente");

const obtenerClientes = async (req, res) => {
  try {

    const clientes = await Cliente.findAll({
      where: { estado: true }
    });

    res.json(clientes);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

const crearCliente = async (req, res) => {
  try {

    const cliente = await Cliente.create(req.body);

    res.status(201).json(cliente);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

const actualizarCliente = async (req, res) => {
  try {

    const { id } = req.params;

    await Cliente.update(req.body, {
      where: { id }
    });

    res.json({
      mensaje: "Cliente actualizado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

const eliminarCliente = async (req, res) => {
  try {

    const { id } = req.params;

    await Cliente.destroy({
      where: { id }
    });

    res.json({
      mensaje: "Cliente eliminado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

module.exports = {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};