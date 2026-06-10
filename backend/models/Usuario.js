const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: DataTypes.STRING,

    correo: DataTypes.STRING,

    password: DataTypes.STRING,

    rol: DataTypes.STRING,

    estado: DataTypes.BOOLEAN,

    created_at: DataTypes.DATE,
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuario;