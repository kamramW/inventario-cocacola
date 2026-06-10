const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DetalleVenta = sequelize.define(
  "DetalleVenta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    venta_id: {
      type: DataTypes.INTEGER,
    },

    producto_id: {
      type: DataTypes.INTEGER,
    },

    cantidad: {
      type: DataTypes.INTEGER,
    },

    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "detalle_venta",
    timestamps: false,
  }
);

module.exports = DetalleVenta;