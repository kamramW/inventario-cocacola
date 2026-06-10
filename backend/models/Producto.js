const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    categoria: {
      type: DataTypes.STRING,
    },

    presentacion: {
      type: DataTypes.STRING,
    },

    unidades_caja: {
      type: DataTypes.INTEGER,
    },

    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
    },

    precio_caja: {
      type: DataTypes.DECIMAL(10, 2),
    },

    stock_cajas: {
      type: DataTypes.INTEGER,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);

module.exports = Producto;