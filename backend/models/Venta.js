const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venta = sequelize.define(
  "Venta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cliente_id: {
      type: DataTypes.INTEGER,
    },

    usuario_id: {
      type: DataTypes.INTEGER,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "ventas",
    timestamps: false,
  }
);

module.exports = Venta;