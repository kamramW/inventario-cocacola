const Venta = require("../models/Venta");
const Cliente = require("../models/Cliente");
const DetalleVenta = require("../models/DetalleVenta");
const Producto = require("../models/Producto");

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre_tienda"],
        },
        {
          model: DetalleVenta,
          include: [
            {
              model: Producto,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const crearVenta = async (req, res) => {
  try {
    const { cliente_id, producto_id, cantidad } = req.body;

    const producto = await Producto.findByPk(producto_id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    if (producto.stock_cajas < cantidad) {
      return res.status(400).json({
        mensaje: "Stock insuficiente",
      });
    }

    const precio = Number(producto.precio_caja);
    const subtotal = precio * cantidad;

    const venta = await Venta.create({
      cliente_id,
      usuario_id: 1,
      total: subtotal,
      estado: true,
    });

    await DetalleVenta.create({
      venta_id: venta.id,
      producto_id,
      cantidad,
      precio,
      subtotal,
    });

    await Producto.update(
      {
        stock_cajas: producto.stock_cajas - cantidad,
      },
      {
        where: { id: producto_id },
      }
    );

    res.status(201).json({
      mensaje: "Venta registrada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  obtenerVentas,
  crearVenta,
};