const Venta = require("./Venta");
const Cliente = require("./Cliente");
const Producto = require("./Producto");
const DetalleVenta = require("./DetalleVenta");

// Venta -> Cliente
Venta.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

Cliente.hasMany(Venta, {
  foreignKey: "cliente_id",
});

// Detalle -> Venta
DetalleVenta.belongsTo(Venta, {
  foreignKey: "venta_id",
});

Venta.hasMany(DetalleVenta, {
  foreignKey: "venta_id",
});

// Detalle -> Producto
DetalleVenta.belongsTo(Producto, {
  foreignKey: "producto_id",
});

Producto.hasMany(DetalleVenta, {
  foreignKey: "producto_id",
});

module.exports = {
  Venta,
  Cliente,
  Producto,
  DetalleVenta,
};