const Producto = require("../models/Producto");

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { estado: true }
    });

    res.json(productos);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const crearProducto = async (req, res) => {
  try {

    const producto = await Producto.create(req.body);

    res.status(201).json(producto);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {

    const { id } = req.params;

    await Producto.update(req.body, {
      where: { id }
    });

    res.json({
      mensaje: "Producto actualizado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {

    const { id } = req.params;

    await Producto.destroy({
      where: { id }
    });

    res.json({
      mensaje: "Producto eliminado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};